Project ctt_fe {
  database_type: 'PostgreSQL'
}

Enum user_status {
  active
  inactive
  graduated
  suspended
}

Enum user_role {
  student
  admin
}

Enum registration_status {
  pending
  successful
  failed
  cancelled
}

Enum course_registration_status {
  selected
  registered
  dropped
}

Enum grade_status {
  passed
  failed
  in_progress
  withdrawn
}

Table users {
  id uuid [pk]
  student_id varchar(20) [unique]
  username varchar(100) [not null, unique]
  email varchar(255) [not null, unique]
  password_hash varchar(255) [not null]
  full_name varchar(255) [not null]
  major_id uuid
  cohort_id uuid
  enrollment_year smallint
  status user_status [not null, default: 'active']
  role user_role [not null, default: 'student']
  created_at timestamptz [not null]
  updated_at timestamptz [not null]
}

Table majors {
  id uuid [pk]
  major_code varchar(30) [not null, unique]
  name varchar(255) [not null]
}

Table cohorts {
  id uuid [pk]
  cohort_code varchar(30) [not null, unique]
  enrollment_year smallint [not null]
}

Table curricula {
  id uuid [pk]
  curriculum_code varchar(50) [not null, unique]
  name varchar(255) [not null]
  major_id uuid [not null]
  cohort_id uuid
  total_required_credits smallint
  is_active boolean [not null, default: true]
}

Table curriculum_categories {
  id uuid [pk]
  curriculum_id uuid [not null]
  category_code varchar(30) [not null]
  name varchar(255) [not null]
  required_credits smallint [not null]
  sort_order smallint [not null]

  Indexes {
    (curriculum_id, category_code) [unique]
  }
}

Table curriculum_subgroups {
  id uuid [pk]
  category_id uuid [not null]
  group_label varchar(255) [not null]
  sort_order smallint [not null]
}

Table courses {
  id uuid [pk]
  course_code varchar(30) [not null, unique]
  name varchar(255) [not null]
  training_credits smallint [not null]
  tuition_credits smallint [not null]
}

Table curriculum_courses {
  id uuid [pk]
  subgroup_id uuid [not null]
  course_id uuid [not null]
  index_number smallint [not null]
  semester_term varchar(30)
  recommended_semester smallint
  is_required boolean [not null]
  sort_order smallint [not null]

  Indexes {
    (subgroup_id, course_id) [unique]
    (subgroup_id, index_number) [unique]
  }
}

Table course_prerequisites {
  course_id uuid [not null]
  prerequisite_course_id uuid [not null]

  Indexes {
    (course_id, prerequisite_course_id) [pk]
  }
}

Table registration_periods {
  id uuid [pk]
  curriculum_id uuid [not null]
  name varchar(100) [not null]
  starts_at timestamptz [not null]
  ends_at timestamptz [not null]
  max_credits smallint [not null]
  is_open boolean [not null]
}

Table course_classes {
  id uuid [pk]
  course_id uuid [not null]
  period_id uuid [not null]
  class_code varchar(50) [not null]
  class_name varchar(255) [not null]
  capacity integer
  enrolled_count integer [not null]

  Indexes {
    (period_id, class_code) [unique]
  }
}

Table registrations {
  id uuid [pk]
  user_id uuid [not null]
  period_id uuid [not null]
  status registration_status [not null]
  submitted_at timestamptz
  created_at timestamptz [not null]
  updated_at timestamptz [not null]

  Indexes {
    (user_id, period_id) [unique]
  }
}

Table registration_items {
  id uuid [pk]
  registration_id uuid [not null]
  class_id uuid [not null]
  status course_registration_status [not null]
  registered_at timestamptz

  Indexes {
    (registration_id, class_id) [unique]
  }
}

Table student_course_results {
  id uuid [pk]
  user_id uuid [not null]
  course_id uuid [not null]
  grade varchar(5)
  grade_status grade_status [not null]
  completed_at date
  attempt_number smallint [not null]

  Indexes {
    (user_id, course_id, attempt_number) [unique]
  }
}

Table graduation_requirements {
  id uuid [pk]
  curriculum_id uuid [not null]
  category_id uuid [not null]
  required_credits smallint [not null]
  name_override varchar(255)
  short_name varchar(50)

  Indexes {
    (curriculum_id, category_id) [unique]
  }
}

Table graduation_requirement_courses {
  requirement_id uuid [not null]
  course_id uuid [not null]
  is_required boolean [not null]
  credits_applied smallint [not null]

  Indexes {
    (requirement_id, course_id) [pk]
  }
}

Ref: users.major_id > majors.id
Ref: users.cohort_id > cohorts.id
Ref: curricula.major_id > majors.id
Ref: curricula.cohort_id > cohorts.id
Ref: curriculum_categories.curriculum_id > curricula.id
Ref: curriculum_subgroups.category_id > curriculum_categories.id
Ref: curriculum_courses.subgroup_id > curriculum_subgroups.id
Ref: curriculum_courses.course_id > courses.id
Ref: course_prerequisites.course_id > courses.id
Ref: course_prerequisites.prerequisite_course_id > courses.id
Ref: registration_periods.curriculum_id > curricula.id
Ref: course_classes.course_id > courses.id
Ref: course_classes.period_id > registration_periods.id
Ref: registrations.user_id > users.id
Ref: registrations.period_id > registration_periods.id
Ref: registration_items.registration_id > registrations.id
Ref: registration_items.class_id > course_classes.id
Ref: student_course_results.user_id > users.id
Ref: student_course_results.course_id > courses.id
Ref: graduation_requirements.curriculum_id > curricula.id
Ref: graduation_requirements.category_id > curriculum_categories.id
Ref: graduation_requirement_courses.requirement_id > graduation_requirements.id
Ref: graduation_requirement_courses.course_id > courses.id
