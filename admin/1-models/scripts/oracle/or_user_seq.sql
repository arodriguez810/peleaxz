BEGIN EXECUTE IMMEDIATE 'CREATE SEQUENCE "oc_user_seq" START WITH 1'; EXCEPTION WHEN OTHERS THEN NULL; END;