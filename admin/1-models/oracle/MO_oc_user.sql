BEGIN EXECUTE IMMEDIATE 'Create table "oc_user" (
  "id" NUMBER NOT NULL,
  "username" VARCHAR2(15) NOT NULL,
  "name" VARCHAR2(50) NOT NULL,
  "lastname" VARCHAR2(50) NOT NULL,
  "email" VARCHAR2(40) NULL,
  "password" VARCHAR2(200) NULL,
  "active" NUMBER NOT NULL,
  "created" DATE NOT NULL,
  "updated" DATE NULL,
  "deleted" DATE NULL,
  "user_created" NUMBER NULL,
  "user_updated" NUMBER NULL,
  "user_deleted" NUMBER NULL,
  CONSTRAINT OR_USER_PK PRIMARY KEY("id") ENABLE
)';
EXCEPTION WHEN OTHERS THEN NULL; END;