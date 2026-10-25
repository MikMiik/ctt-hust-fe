---
name: sequelize-skill
description: Sequelize ORM setup and usage guidance for Express/Node.js projects using sequelize-cli, CommonJS, module-alias, MySQL, migrations, seeders, models, services, queries, and transactions. Use when configuring Sequelize, creating database config, wiring models/index.js, writing migrations/seeders, using Sequelize in services, or designing transaction-safe data mutations. For detailed model-definition patterns, reference sequelize-models.
---

# Sequelize Skill

Use this skill to configure and use Sequelize consistently across Express/Node.js backend projects. The reference pattern comes from `lolmatrix_be`: CommonJS, `sequelize` v6, `sequelize-cli`, MySQL via `mysql2`, `module-alias`, migrations under `src/db/migrations`, models under `src/models`, and service-layer database access.

For detailed model definitions, fields, validations, and associations, reference `sequelize-models`. This skill owns project setup, CLI wiring, migrations, service usage, and transaction rules.

## Application Order

1. Inspect `package.json`, `.sequelizerc`, `server.js`, `src/configs/database.js`, `src/models/index.js`, `src/db`, `src/models`, and representative `src/services`.
2. Confirm the dialect before writing config. The reference project uses MySQL; adapt types/options when the target project uses PostgreSQL or another dialect.
3. Configure Sequelize CLI paths before generating models, migrations, or seeders.
4. Create migrations first, then models, then service queries.
5. For model field/association details, load `sequelize-models` instead of duplicating large model guidance here.
6. Use transactions for any mutation that writes multiple tables, updates counters, toggles like/vote state, or needs read-modify-write consistency.

## Dependencies and Scripts

Use these packages for the reference stack:

```json
{
  "dependencies": {
    "mysql2": "^3.14.3",
    "sequelize": "^6.37.7",
    "sequelize-cli": "^6.6.3",
    "module-alias": "^2.2.3",
    "dotenv": "^17.2.1"
  }
}
```

Keep Sequelize CLI commands in `package.json`:

```json
{
  "scripts": {
    "migration:create": "npx sequelize-cli migration:create",
    "db:migrate": "npx sequelize-cli db:migrate",
    "db:migrate:undo": "npx sequelize-cli db:migrate:undo",
    "db:migrate:undo:all": "npx sequelize-cli db:migrate:undo:all",
    "db:seed": "npx sequelize-cli db:seed",
    "db:seed:all": "npx sequelize-cli db:seed:all",
    "db:seed:undo": "npx sequelize-cli db:seed:undo",
    "db:seed:undo:all": "npx sequelize-cli db:seed:undo:all",
    "model:generate": "npx sequelize-cli model:generate",
    "model:create": "npx sequelize-cli model:create",
    "seed:generate": "npx sequelize-cli seed:generate",
    "seed:create": "npx sequelize-cli seed:create"
  },
  "_moduleAliases": {
    "@": "src"
  }
}
```

Use `model:create`/`migration:create`/`seed:create` for manual names. Use `model:generate` only when the generated output will be reviewed and corrected to match project conventions.

## CLI Paths

Create `.sequelizerc` at project root so generated files stay inside `src`:

```js
const path = require("path");

module.exports = {
  config: path.resolve("src", "configs", "database.js"),
  "models-path": path.resolve("src", "models"),
  "seeders-path": path.resolve("src", "db", "seeders"),
  "migrations-path": path.resolve("src", "db", "migrations"),
};
```

Keep folder names aligned with `.sequelizerc`. If the project has `src/db/seeds` but `.sequelizerc` points to `src/db/seeders`, rename one side before creating new seeders.

Recommended database folders:

```text
src/
├── configs/
│   └── database.js
├── db/
│   ├── migrations/
│   └── seeders/
└── models/
    ├── index.js
    └── <resource>.js
```

## Database Config

Use `src/configs/database.js` for all environments. Load `module-alias/register` and `dotenv` because Sequelize CLI reads this file outside `server.js`.

```js
require("module-alias/register");
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
    timezone: "+07:00",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true
    },
  },
};
```

Do not hardcode credentials. Keep SSL settings production-only and explicit when required by the host.

## Model Loader

Use `src/models/index.js` as the single Sequelize entry point. It should create the Sequelize instance, dynamically load model files, call `associate(db)`, and export both `sequelize` and `Sequelize`.

```js
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../configs/database.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.slice(-3) === ".js" &&
    file.indexOf(".test.js") === -1
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

In `server.js`, import `{ sequelize }` from `@/models`, call `sequelize.authenticate()` before listening, and call `sequelize.close()` during graceful shutdown. Do not use `sequelize.sync()` in production workflows; schema changes belong in migrations.

## Migrations

Use migration files as the source of truth for schema. Keep table and column names in snake_case, while models expose camelCase fields using `field`.

Create table pattern:

```js
"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("feedback_messages", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      message: {
        type: Sequelize.STRING(280),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("feedback_messages");
  },
};
```

Use explicit indexes for uniqueness and common filters:

```js
await queryInterface.addIndex("likes", ["user_id", "likable_type", "likable_id"], {
  unique: true,
  name: "likes_user_target_unique",
});
```

When modifying existing columns, make the down migration safe:

```js
async up(queryInterface, Sequelize) {
  await queryInterface.changeColumn("community_posts", "title", {
    type: Sequelize.STRING(255),
    allowNull: true,
  });
}

async down(queryInterface, Sequelize) {
  await queryInterface.sequelize.query(
    "UPDATE community_posts SET title = '' WHERE title IS NULL"
  );
  await queryInterface.changeColumn("community_posts", "title", {
    type: Sequelize.STRING(255),
    allowNull: false,
  });
}
```

For data cleanup or multi-step schema/data changes, wrap raw queries in a migration transaction:

```js
async up(queryInterface) {
  const { sequelize } = queryInterface;
  await sequelize.transaction(async (transaction) => {
    await sequelize.query("DELETE FROM `some_table` WHERE invalid = 1", {
      transaction,
    });
  });
}
```

Migration rules:

- Create parent tables before child tables.
- Drop child tables before parent tables in `down`.
- Use `onDelete: "CASCADE"` for owned child rows, `"SET NULL"` for optional history, and `"RESTRICT"` for catalog/reference rows.
- Include `created_at`, `updated_at`, and `deleted_at` when the model uses `timestamps` or `paranoid`.
- Seed stable lookup data through migrations or seeders, not manual SQL.

## Models

For detailed model patterns, use `sequelize-models`.

Apply these project-level rules when writing models:

- Export model factory functions: `module.exports = (sequelize, DataTypes) => { ... return ModelName; }`.
- Use `class ModelName extends Model` with a static `associate(models)` method.
- Set `modelName`, `tableName`, `underscored: true`, and explicit `timestamps`/`paranoid`.
- Map custom snake_case columns with `field`, such as `passwordHash` -> `password_hash`.
- Keep association aliases stable because services use them in `include`.
- For computed request-context fields, use `DataTypes.VIRTUAL` and hooks/utilities only when the behavior is shared and tested.
- For UUID/string IDs, generate them in model hooks only when the database does not own ID generation.

Example model skeleton:

```js
"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    static associate(models) {
      Resource.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }

  Resource.init(
    {
      userId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "user_id",
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Resource",
      tableName: "resources",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );

  return Resource;
};
```

## Service Usage

Services import models from `@/models` and own all database reads/writes. Controllers should not query Sequelize directly.

```js
"use strict";

const { Op } = require("sequelize");
const { Resource, User, sequelize } = require("@/models");

class ResourceService {
  async list({ q, page, limit }) {
    const offset = (page - 1) * limit;
    const where = {};

    if (q && String(q).trim()) {
      const like = `%${String(q).trim()}%`;
      where[Op.or] = [
        { title: { [Op.like]: like } },
        { description: { [Op.like]: like } },
      ];
    }

    const { count, rows } = await Resource.findAndCountAll({
      where,
      include: [
        { model: User, as: "user", attributes: ["id", "username"] },
      ],
      distinct: true,
      subQuery: false,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return { items: rows.map(formatResource), total: count };
  }
}

module.exports = new ResourceService();
```

Query rules:

- Use `findAndCountAll` for paginated lists.
- Use `distinct: true` when `include` can duplicate parent rows.
- Use `subQuery: false` when includes and pagination need predictable SQL; verify count/results after changing includes.
- Use `attributes` to limit nested user/profile payloads.
- Use `required: Boolean(filter)` on includes that should filter parent rows only when a filter is present.
- Map Sequelize rows to DTOs in services before returning data to controllers.

## Transactions

Use managed transactions by default:

```js
return sequelize.transaction(async (t) => {
  const row = await Resource.create(
    { userId, title },
    { transaction: t }
  );

  await ResourceChild.bulkCreate(
    children.map((child) => ({ resourceId: row.id, ...child })),
    { transaction: t }
  );

  return row;
});
```

Use unmanaged transactions only when the code needs an explicit commit point before a follow-up query outside the transaction:

```js
const transaction = await sequelize.transaction();
try {
  const post = await CommunityPost.create(data, { transaction });
  await CommunityPostTag.bulkCreate(tags, { transaction });
  await transaction.commit();
  return post;
} catch (error) {
  await transaction.rollback();
  throw error;
}
```

Always pass the same `transaction` option to every query inside the unit of work: `create`, `update`, `destroy`, `bulkCreate`, `findOne`, `findByPk`, `reload`, `increment`, `decrement`, and raw queries.

Use row locks for toggle/update races:

```js
return sequelize.transaction(async (t) => {
  const existing = await Like.findOne({
    where: { userId, likableType: "Comment", likableId: commentId },
    transaction: t,
    lock: t.LOCK.UPDATE,
  });

  if (existing) {
    await existing.destroy({ transaction: t });
    await comment.decrement("likesCount", { by: 1, transaction: t });
  } else {
    await Like.create(
      { userId, likableType: "Comment", likableId: commentId },
      { transaction: t }
    );
    await comment.increment("likesCount", { by: 1, transaction: t });
  }

  await comment.reload({ transaction: t });
  return comment;
});
```

Transaction rules:

- Wrap multi-table creates, parent + children writes, votes/likes, counter updates, and aggregate recomputes.
- Keep external API calls, emails, queue dispatches, and cache invalidation outside transactions when possible.
- If a helper receives a transaction, make it optional but pass it through to every nested query.
- Re-read/reload rows inside the same transaction when returning state affected by increments/decrements.
- After decrementing counters, clamp negative values inside the transaction if old data may be inconsistent.

## Seeds

Use seeders or migrations for stable lookup data such as roles, feature items, catalog rows, or initial configuration.

Seeder/migration seed pattern:

```js
await queryInterface.bulkInsert("feature_items", [
  {
    title: "New feature",
    description: "Description",
    likes: 0,
    dislikes: 0,
    status: "planned",
    created_at: new Date(),
    updated_at: new Date(),
  },
]);
```

Use `bulkDelete` in `down` only when rollback is safe for that table. Do not delete user-created production data in down migrations unless the migration is explicitly destructive and reviewed.

## Validation Checklist

Before finishing Sequelize setup or a database change:

- `package.json` includes Sequelize CLI scripts.
- `.sequelizerc` points to real `src/configs/database.js`, `src/models`, `src/db/migrations`, and `src/db/seeders` paths.
- `src/configs/database.js` loads env variables and has development/test/production configs.
- `server.js` authenticates Sequelize before listen and closes it during shutdown.
- Every new table has a migration with reversible `down`.
- Foreign keys specify `references`, `onUpdate`, and `onDelete`.
- Unique constraints and common filter indexes are explicit and named.
- Model `tableName`, `field`, timestamps, paranoid, and aliases match the migration.
- Services use DTO mapping and do not leak raw complex Sequelize instances to controllers.
- Multi-write service methods use transactions and pass the transaction to every query.
- Generated model/migration files have been reviewed instead of accepted blindly.
