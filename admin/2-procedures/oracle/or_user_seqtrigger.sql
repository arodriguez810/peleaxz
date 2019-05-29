create or replace TRIGGER oc_user_trigger
BEFORE INSERT ON "oc_user"
FOR EACH ROW

BEGIN
  SELECT "oc_user_seq".NEXTVAL
  INTO   :new."id"
  FROM   dual;
END;
