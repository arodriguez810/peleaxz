CREATE TABLE IF NOT EXISTS my_user (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(15) NOT NULL,
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(51) NULL,
  password VARCHAR(200) NULL,
  category int NOT NULL,
  active tinyint NOT NULL,
  created DATETIME NOT NULL DEFAULT NOW(),
  updated DATETIME NOT NULL DEFAULT NOW(),
  deleted DATETIME NULL,
  user_created INT NULL,
  user_updated INT NULL,
  user_deleted INT NULL,
   PRIMARY KEY (id)
)