CREATE TABLE IF NOT EXISTS my_product;
CREATE TABLE my_product  (
   id int(11) NOT NULL AUTO_INCREMENT,
   name varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
   description varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
   category int(11) NULL DEFAULT NULL,
   active tinyint(1) NULL DEFAULT 1,
   created datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
   deleted datetime(0) NULL DEFAULT NULL,
   user_created int(11) NULL DEFAULT NULL,
   user_updated int(11) NULL DEFAULT NULL,
   user_deleted int(11) NULL DEFAULT NULL,
   PRIMARY KEY (id) USING BTREE
 )