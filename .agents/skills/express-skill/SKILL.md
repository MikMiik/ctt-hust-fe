---
name: express-skill
description: Express.js backend project structure and implementation guidance based on a layered CommonJS Express 5, Sequelize, MySQL, Redis, EJS, and module-alias setup. Use when creating or organizing an Express API project, defining folders, wiring server.js, routes, controllers, services, validators, models, migrations, middleware, response helpers, uploads, jobs, workers, and shared utilities. Ask whether authentication is needed before scaffolding auth-related folders, and use rbac-skill when authorization or RBAC is required.
---

# Express Skill

Use this skill to create or reorganize a backend Express API project. The reference pattern is JavaScript: Express 5, CommonJS, Sequelize CLI, MySQL, Redis, `module-alias`, `express-validator`, EJS email templates, centralized response helpers, and route-controller-service layering.

Before applying code examples, ask the user whether the backend should use JavaScript or TypeScript. If the user chooses TypeScript, translate all file extensions, imports/exports, request/response typing, service signatures, model typings, middleware typings, config files, and examples to TypeScript. Do not mix JavaScript and TypeScript in the same generated project unless the existing project already does so.

## Application Order

1. Ask whether the backend should use JavaScript or TypeScript.
2. Inspect the existing project first: `package.json`, `server.js`/`server.ts`, `.sequelizerc`, `jsconfig.json`/`tsconfig.json`, `src/routes`, `src/controllers`, `src/services`, `src/models`, `src/middlewares`, `src/validators`, and `src/configs`.
3. Before creating the folder structure, ask the user whether the backend needs authentication.
4. If authentication is needed, do not design auth directly in this skill. Apply `rbac-skill` for authorization/RBAC design, then create auth files only after the user confirms the auth model.
5. If authentication is not needed, omit auth routes/controllers/services/middlewares, token utilities, roles, user-role tables, and auth email templates.
6. Create the base Express structure first, then implement domain modules one feature at a time.

## Standard Folder Structure

Use this as the general backend structure. Keep auth-related entries conditional and excluded by default.

```text
project-root/
├── public/
│   └── uploads/
├── src/
│   ├── configs/
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── mail.js
│   │   ├── mailer.js
│   │   ├── pusher.js
│   │   └── publicPaths.js
│   ├── controllers/
│   │   └── api/
│   │       └── <resource>.controller.js
│   ├── db/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── jobs/
│   │   └── <job>.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── notFoundHandler.js
│   │   ├── responseEnhancer.js
│   │   ├── handlePagination.js
│   │   ├── handleUpload.js
│   │   └── setContext.js
│   ├── models/
│   │   ├── index.js
│   │   └── <resource>.js
│   ├── routes/
│   │   ├── index.js
│   │   └── <resource>.route.js
│   ├── services/
│   │   └── <resource>.service.js
│   ├── utils/
│   │   ├── response.js
│   │   ├── throwError.js
│   │   ├── cache.js
│   │   ├── queue.js
│   │   └── <domain-helper>.js
│   ├── validators/
│   │   ├── handleValidationErrors.js
│   │   └── <resource>.validator.js
│   ├── views/
│   │   ├── emails/
│   │   └── layouts/
│   └── workers/
│       └── queueWorker.js
├── .env
├── .sequelizerc
├── Dockerfile
├── jsconfig.json
├── package.json
└── server.js
```

## Auth Boundary

Do not include these in the default structure unless the user confirms auth is needed:

- `src/controllers/api/auth.controller.js`
- `src/routes/auth.route.js`
- `src/services/auth.service.js`, `jwt.service.js`, `refreshToken.service.js`, `user.service.js`
- `src/middlewares/checkAuth.js`, `authorize.js`
- token/password/cookie helpers in `src/utils`
- user, role, permission, refresh-token, or user-role migrations/models
- verification and forgot-password email templates

When auth is confirmed, ask what kind of auth is required, then apply `rbac-skill` for roles, permissions, authorization checks, audit logging, and frontend permission contract.

## Project Conventions

Use CommonJS consistently unless the project already uses ESM. Prefer `require`/`module.exports` with `"use strict"` in source modules.

The examples in this skill are JavaScript because the reference backend was written in JavaScript. If the selected stack is TypeScript:

- Use `.ts` files throughout `src` and for `server.ts`.
- Use `import`/`export` consistently, or follow the existing TS module style if the project already has one.
- Add/maintain `tsconfig.json`; do not rely on `jsconfig.json`.
- Type Express handlers with `Request`, `Response`, and `NextFunction`.
- Add local request augmentation for fields added by middleware, such as `req.userId`, `req.page`, and `req.limit`.
- Type service input objects and DTO return values instead of passing untyped `body` objects around.
- Type Sequelize models according to the project's Sequelize TS pattern before adding associations or service queries.
- Convert all snippets in this skill mentally to TS before writing files; never paste CommonJS JS examples into a TS project unchanged.

Use `module-alias/register` and map `@` to `src` in `package.json`:

```json
{
  "_moduleAliases": {
    "@": "src"
  }
}
```

Use `jsconfig.json` for editor path support:

```json
{
  "compilerOptions": {
    "paths": {
      "*": ["./src/*"]
    }
  }
}
```

Use `.sequelizerc` to keep Sequelize generated files inside `src`:

```js
const path = require("path");

module.exports = {
  config: path.resolve("src", "configs", "database.js"),
  "models-path": path.resolve("src", "models"),
  "seeders-path": path.resolve("src", "db", "seeders"),
  "migrations-path": path.resolve("src", "db", "migrations"),
};
```

## server.js Pattern

Wire the app in this order:

1. Load `module-alias/register` and `dotenv`.
2. Create Express app and import database/Redis clients.
3. Configure CORS from `CLIENT_URL`, `credentials: true`, and `trust proxy` when cookies/proxies are used.
4. Register static files, JSON/body parsers, cookie parser when needed, method override when needed, response enhancer, and pagination middleware.
5. Configure EJS only when the project renders emails or server views.
6. Mount the API router at a versioned prefix such as `/api/v1`.
7. Register `notFoundHandler` and `errorHandler` after routes.
8. Authenticate database and optional Redis before listening.
9. Add graceful shutdown for Redis and Sequelize.

Keep server startup thin. Do not place business logic in `server.js`.

## Backend Request Flow

Design and implement each backend feature through this flow:

```text
server.js
  -> global middleware
  -> /api/v1 router middleware
  -> routes/<resource>.route.js
  -> validators/<resource>.validator.js
  -> controllers/api/<resource>.controller.js
  -> services/<resource>.service.js
  -> models/index.js + models/<resource>.js
  -> utils/* when behavior is shared
```

`server.js` owns process setup only: env loading, alias registration, Express app, CORS, static files, parsers, shared middleware, router mounting, error handlers, database/Redis connection startup, and graceful shutdown.

Use this middleware order:

1. `cors`, `trust proxy`, `express.static("public")`, `express.json`, `express.urlencoded`, `cookieParser`, `methodOverride` when needed.
2. `responseEnhancer` so all downstream handlers can use `res.success` and `res.error`.
3. `handlePagination` so list endpoints get `req.page`, `req.limit`, and `res.paginate`.
4. Versioned router such as `/api/v1`; if auth exists, mount `checkAuth` then `setContext` before `routes/index.js`.
5. `notFoundHandler`, then 4-argument `errorHandler`.

Routes compose middleware only. Put path decisions and validator/controller wiring in route files; do not put business rules in routes.

Validators normalize and reject invalid input before controllers. Use `checkSchema`, put rules in `validators/<resource>.validator.js`, and end each validator array with `handleValidationErrors`.

Controllers are thin HTTP adapters. They should:

- Read params from `req.params`, query filters from `req.query`, body from `req.body`, uploaded files from `req.files`, and authenticated user id from `req.userId` when auth is enabled.
- Convert simple route params only when needed before passing to services; keep deep normalization in services when it is domain logic.
- Call exactly one main service method for the request.
- Return with `res.success(status, data)`, `res.paginate({ items, total })`, or `res.error(status, message)`.
- Catch errors and return `res.error(error.statusCode ?? error.status ?? 500, error.message)`.

Services own business logic. They should:

- Normalize user input: trim strings, convert ids with `Number(...)` when numeric, coerce optional empty strings to `null`, dedupe arrays with `Set`, cap field lengths before writes, and build stable DTOs.
- Query Sequelize models from `@/models`, not through controllers.
- Use transactions for multi-table writes, counters, toggles, and aggregate recomputation.
- Use shared utilities for repeated behavior: `utils/response`, `utils/cache`, `utils/queue`, `utils/asyncHooks`, `utils/ddragon`, formatting helpers, token helpers, mail helpers.
- Return plain objects/DTOs, not raw complex Sequelize rows, when responses include relations or computed fields.

Models own schema mapping and associations. Migrations own real database schema. If a feature needs a new table, update migrations and model definitions together. For detailed model writing, use `sequelize-skill` and `sequelize-models`.

## Route, Controller, Service Flow

Use one route file per resource. Route files only compose middleware and call controllers.

```js
"use strict";

const express = require("express");
const resourceController = require("@/controllers/api/resource.controller");
const resourceValidator = require("@/validators/resource.validator");

const router = express.Router();

router.get("/", resourceController.list);
router.get("/:id", resourceController.getById);
router.post("/", resourceValidator.create, resourceController.create);

module.exports = router;
```

Controllers should parse request input, call services, and return a response. Keep querying and business rules in services.

```js
"use strict";

const resourceService = require("@/services/resource.service");

exports.list = async (req, res) => {
  try {
    const { q } = req.query;
    const { items, total } = await resourceService.list({
      q,
      page: req.page,
      limit: req.limit,
    });
    return res.paginate({ items, total });
  } catch (error) {
    return res.error(error.statusCode ?? error.status ?? 500, error.message);
  }
};
```

Services own database access, DTO shaping, cache keys, external API calls, and domain decisions. Return plain data for controllers to serialize.

Service style:

```js
"use strict";

const { Op } = require("sequelize");
const { Resource, User, sequelize } = require("@/models");

function formatResource(row) {
  return {
    id: row.id,
    title: row.title,
    author: row.user
      ? { id: row.user.id, username: row.user.username }
      : null,
    createdAt: row.createdAt,
  };
}

class ResourceService {
  async list({ q, page, limit }) {
    const offset = (page - 1) * limit;
    const where = {};
    if (q && String(q).trim()) {
      where.title = { [Op.like]: `%${String(q).trim()}%` };
    }

    const { count, rows } = await Resource.findAndCountAll({
      where,
      include: [{ model: User, as: "user", attributes: ["id", "username"] }],
      distinct: true,
      subQuery: false,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return { items: rows.map(formatResource), total: count };
  }

  async create(userId, body) {
    const title = String(body.title || "").trim().slice(0, 255);
    return sequelize.transaction(async (t) => {
      const row = await Resource.create({ userId, title }, { transaction: t });
      return formatResource(row);
    });
  }
}

module.exports = new ResourceService();
```

## Responses and Errors

Use a shared `src/utils/response.js` helper and attach convenience methods with `responseEnhancer`:

- `res.success(status, data)` for success responses.
- `res.error(status, message)` for errors.
- `res.paginate({ items, total })` for list endpoints after `handlePagination` sets `req.page` and `req.limit`.

Use a final `errorHandler` for thrown errors and `notFoundHandler` for unmatched routes. Prefer a `throwError(status, message, errors?)` helper when service code needs to fail intentionally.

Response contract:

- Success: `{ success: true, data, message }`; status `204` sends no body.
- Error: `{ success: false, message, errors }`.
- Pagination: `{ success: true, data: { items, pagination: { page, limit, total, pages } } }`.
- Validation errors should return the first meaningful message through `res.error(400, message)`.

## Validation

Use `express-validator` for request validation. Put schemas in `src/validators/<resource>.validator.js`, then append `handleValidationErrors` as the last middleware in each validator array.

```js
"use strict";

const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.create = [
  checkSchema({
    name: {
      in: ["body"],
      trim: true,
      isString: true,
      notEmpty: true,
      isLength: { options: { max: 120 } },
    },
  }),
  handleValidationErrors,
];
```

## Data Layer

Use Sequelize models in `src/models` and migrations in `src/db/migrations`. Keep schema changes in migrations; do not rely on runtime sync for production.

Use `models/index.js` to dynamically load model files and run `associate(db)` when present. Define associations inside each model file so relation ownership stays near the model.

Database config should read from env vars and define development, test, and production environments. Keep timezone and dialect options explicit when the app depends on them.

## Cache, Jobs, and Workers

Use `src/configs/redis.js` for Redis connection setup and `src/utils/cache.js` for cache helpers such as key building and TTL constants. Services should call cache helpers, not Redis directly.

Place one-off domain jobs in `src/jobs` and long-running queue consumers in `src/workers`. Keep queue setup in `src/utils/queue.js` or a dedicated config file. Start workers with a separate npm script such as `npm run queue`.

## Uploads and Public Files

Put public files under `public`. Serve them with `app.use(express.static("public"))`. For uploads, use `src/middlewares/handleUpload.js` and route all upload handling through a controller. Store only normalized paths/metadata in database rows.

Reference upload pattern:

- Use Multer disk storage with destination `public/uploads`.
- Create the upload directory if missing.
- Export upload constants for reuse: `MAX_FILES = 20`, `MAX_FILE_SIZE_MB = 8`, `MAX_FILE_SIZE_BYTES`, and `ALLOWED_IMAGE_MIMES`.
- Allow only `image/jpeg`, `image/png`, `image/webp`, and `image/gif`.
- For batch image upload, use `handleUpload.array("files", 20)`.
- Wrap Multer with `ensureAsyncContext(handleUpload.array(...))` if the project uses CLS/async context middleware.
- Keep upload endpoints private unless the user explicitly says public uploads are allowed.
- Return a stable array shape even for one file: `{ files: [...], count }`.
- Build public URLs from `PUBLIC_BASE_URL` when set, otherwise `${req.protocol}://${req.get("host")}`.
- On validation or controller errors after files are written, delete all written files before returning the error.

Example route:

```js
"use strict";

const express = require("express");
const handleUpload = require("@/middlewares/handleUpload");
const ensureAsyncContext = require("@/utils/asyncHooks");
const uploadController = require("@/controllers/api/upload.controller");

const router = express.Router();

router.post(
  "/",
  ensureAsyncContext(handleUpload.array("files", 20)),
  uploadController.upload
);

module.exports = router;
```

Example upload response item:

```js
{
  url: `${base}/uploads/${filename}`,
  filePath: `uploads/${filename}`,
  filename,
  originalName: file.originalname,
  size: file.size,
  mimetype: file.mimetype
}
```

## Domain Module Checklist

For each new resource, create only the files the feature needs:

- `src/routes/<resource>.route.js`
- `src/controllers/api/<resource>.controller.js`
- `src/services/<resource>.service.js`
- `src/validators/<resource>.validator.js` when input validation is needed
- `src/models/<resource>.js` and migration when the resource is persisted
- `src/utils/<resource-helper>.js` only when helper logic is reused

Register the route in `src/routes/index.js` and keep the mounted path plural and stable.

## Package Scripts

Use scripts aligned with Sequelize CLI and separate workers:

```json
{
  "scripts": {
    "start": "node --watch server.js",
    "db:migrate": "npx sequelize-cli db:migrate",
    "db:migrate:undo": "npx sequelize-cli db:migrate:undo",
    "db:seed:all": "npx sequelize-cli db:seed:all",
    "model:create": "npx sequelize-cli model:create",
    "seed:create": "npx sequelize-cli seed:create",
    "queue": "node --watch ./src/workers/queueWorker.js"
  }
}
```

## Implementation Rules

- Keep controllers thin and services testable.
- Keep validators separate from controllers.
- Keep middleware generic; feature-specific checks belong in route middleware or services.
- Do not hardcode environment-specific origins, database credentials, or external URLs.
- Do not put auth/RBAC into the base structure unless the user confirms it.
- Do not mix frontend files into the Express backend except server-rendered EJS templates for backend-owned emails/views.
- Prefer explicit DTO mapping in services instead of returning raw Sequelize instances from complex queries.
- Use pagination middleware for list endpoints and enforce a maximum `limit`.
- Prefer clear code over comments; add comments only for non-obvious domain decisions or concurrency behavior.
- Register every new route in `src/routes/index.js` with a stable plural mount path.
- When auth exists, update public-path config only for endpoints that truly do not require Bearer tokens.
- Use `req.userId` as the authenticated actor when the auth middleware follows the reference project pattern.
