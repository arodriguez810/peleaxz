
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` varchar(800) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `created` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime(0) NULL DEFAULT NULL,
  `user_created` int(11) NULL DEFAULT NULL,
  `user_updated` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Category 1', 'Category 1', '2019-06-27 14:19:39', NULL, NULL, NULL);
INSERT INTO `category` VALUES (2, 'Category 2', 'Category 2', '2019-06-27 14:21:27', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for child
-- ----------------------------
DROP TABLE IF EXISTS `child`;
CREATE TABLE `child`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` varchar(800) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `parent` int(11) NULL DEFAULT NULL,
  `created` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime(0) NULL DEFAULT NULL,
  `user_created` int(11) NULL DEFAULT NULL,
  `user_updated` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of child
-- ----------------------------
INSERT INTO `child` VALUES (1, 'Child 1', 'Child 1', 1, '2019-06-27 14:19:55', NULL, NULL, NULL);
INSERT INTO `child` VALUES (2, 'Child 2', 'Child 2', 1, '2019-06-27 14:20:05', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for dates
-- ----------------------------
DROP TABLE IF EXISTS `dates`;
CREATE TABLE `dates`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` datetime(0) NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `datetime` datetime(0) NULL DEFAULT NULL,
  `range_from` date NULL DEFAULT NULL,
  `range_to` date NULL DEFAULT NULL,
  `rangetime_from` datetime(0) NULL DEFAULT NULL,
  `rangetime_to` datetime(0) NULL DEFAULT NULL,
  `timerange_from` datetime(0) NULL DEFAULT NULL,
  `timerange_to` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of dates
-- ----------------------------
INSERT INTO `dates` VALUES (1, '2019-06-27 14:16:00', '2019-06-27', '2019-06-27 14:16:00', '2019-06-27', '2019-07-10', '2019-06-27 14:16:00', '2019-07-17 14:16:00', '2019-06-27 14:16:00', '2019-06-27 14:16:00');
INSERT INTO `dates` VALUES (2, '2019-06-27 14:16:00', '2019-06-27', '2019-06-27 14:16:00', '2019-06-27', '2019-07-04', '2019-06-13 14:16:00', '2019-07-26 14:16:00', '2019-06-27 14:16:00', '2019-06-27 14:16:00');

-- ----------------------------
-- Table structure for lists
-- ----------------------------
DROP TABLE IF EXISTS `lists`;
CREATE TABLE `lists`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent` int(11) NULL DEFAULT NULL,
  `child` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lists
-- ----------------------------
INSERT INTO `lists` VALUES (1, 1, 1, 'List 1');

-- ----------------------------
-- Table structure for lists_category
-- ----------------------------
DROP TABLE IF EXISTS `lists_category`;
CREATE TABLE `lists_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` int(11) NULL DEFAULT NULL,
  `lists` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of lists_category
-- ----------------------------
INSERT INTO `lists_category` VALUES (1, 1, 1);
INSERT INTO `lists_category` VALUES (2, 2, 1);

-- ----------------------------
-- Table structure for parent
-- ----------------------------
DROP TABLE IF EXISTS `parent`;
CREATE TABLE `parent`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` varchar(800) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `created` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime(0) NULL DEFAULT NULL,
  `user_created` int(11) NULL DEFAULT NULL,
  `user_updated` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of parent
-- ----------------------------
INSERT INTO `parent` VALUES (1, 'Parent 1', 'Parent 1', '2019-06-27 14:19:54', NULL, 1, NULL);

-- ----------------------------
-- Table structure for relation
-- ----------------------------
DROP TABLE IF EXISTS `relation`;
CREATE TABLE `relation`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `description` varchar(800) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `tempid` varchar(800) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `list` int(255) NULL DEFAULT NULL,
  `created` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime(0) NULL DEFAULT NULL,
  `user_created` int(11) NULL DEFAULT NULL,
  `user_updated` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of relation
-- ----------------------------
INSERT INTO `relation` VALUES (1, 'Relation 1', 'Relation 1', NULL, 1, '2019-06-27 14:21:40', NULL, 1, NULL);

-- ----------------------------
-- Table structure for special
-- ----------------------------
DROP TABLE IF EXISTS `special`;
CREATE TABLE `special`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `location` varchar(300) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `bit` tinyint(11) NULL DEFAULT NULL,
  `tags` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `html` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of special
-- ----------------------------
INSERT INTO `special` VALUES (1, 'rgb(224, 102, 102)', '18.483060805024085;-69.92166957672117', 1, 'hello,world,other,more', '<p><b>Test</b></p><p><span style=\"background-color: rgb(255, 255, 0);\"><b>Test</b></span></p><ul><li><span style=\"background-color: rgb(255, 255, 0);\"><b>1</b></span></li><li><span style=\"background-color: rgb(255, 255, 0);\"><b>2</b></span></li><li><span style=\"background-color: rgb(255, 255, 0);\"><b>3<br></b></span><b><br></b><br></li></ul>');
INSERT INTO `special` VALUES (2, 'rgb(241, 194, 50)', '18.483060805024085;-69.92166957672117', 1, 'hello,world,other,more', '<ul><li>1</li><li>2</li><li>3</li><li>4<br></li></ul>');

-- ----------------------------
-- Table structure for texts
-- ----------------------------
DROP TABLE IF EXISTS `texts`;
CREATE TABLE `texts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `basic` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `money` decimal(11, 2) NULL DEFAULT NULL,
  `percentage` int(3) NULL DEFAULT NULL,
  `normalpassword` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `passwordplus` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `textarea` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `cellphone` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `integer` int(11) NULL DEFAULT NULL,
  `decimal` decimal(18, 2) NULL DEFAULT NULL,
  `hour` varchar(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `year` int(11) NULL DEFAULT NULL,
  `indentification` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `creditcard` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `basic`(`basic`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of texts
-- ----------------------------
INSERT INTO `texts` VALUES (1, 'Text 1', 2000.00, 50, '5a884bcb8db9e6aa7189a7a0abe05fd8', '5a884bcb8db9e6aa7189a7a0abe05fd8', '123123', 1, '(800) 980-9999', '(809) 809-8099', 300, 25.30, '12:12', 2019, '001-1868331-5', '3265-9946-1259-5461');
INSERT INTO `texts` VALUES (2, 'Text 2', 321691.60, 20, '5a884bcb8db9e6aa7189a7a0abe05fd8', '5a884bcb8db9e6aa7189a7a0abe05fd8', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not onl', 2, '(809) 809-8090', '(809) 090-8923', 43, 326.20, '12:12', 2019, '265-9108551-4', '2584-0649-4194-3066');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `name` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `lastname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` varchar(51) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `password` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `confirmpassword` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `created` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` datetime(0) NULL DEFAULT NULL,
  `user_created` int(11) NULL DEFAULT NULL,
  `user_updated` int(11) NULL DEFAULT NULL,
  `user_deleted` int(11) NULL DEFAULT NULL,
  `profile` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', 'Adminis', 'Trator', 'admin@dragon.com', '9ccc9c1af553d8dfeb5a2da859f60292', '9ccc9c1af553d8dfeb5a2da859f60292', '2019-02-27 21:06:46', '2019-02-27 21:06:46', NULL, 3, NULL, NULL, 1);
INSERT INTO `users` VALUES (2, 'agent', 'Agent', 'Agent', 'agent@dragon.com', '9ccc9c1af553d8dfeb5a2da859f60292', '9ccc9c1af553d8dfeb5a2da859f60292', '2019-06-20 19:12:15', '2019-06-20 19:12:15', NULL, 1, 1, NULL, 2);
INSERT INTO `users` VALUES (3, 'client', 'Client', 'client', 'client@dragon.com', '9ccc9c1af553d8dfeb5a2da859f60292', '9ccc9c1af553d8dfeb5a2da859f60292', '2019-06-20 19:13:53', '2019-06-20 19:13:53', NULL, 1, NULL, NULL, NULL);

-- ----------------------------
-- View structure for view_report
-- ----------------------------
DROP VIEW IF EXISTS `view_report`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_report` AS select `texts`.`id` AS `id`,`texts`.`basic` AS `basic`,`texts`.`money` AS `money`,`texts`.`percentage` AS `percentage`,`texts`.`normalpassword` AS `normalpassword`,`texts`.`passwordplus` AS `passwordplus`,`texts`.`textarea` AS `textarea`,`texts`.`num` AS `num`,`texts`.`phone` AS `phone`,`texts`.`cellphone` AS `cellphone`,`texts`.`integer` AS `integer`,`texts`.`decimal` AS `decimal`,`texts`.`hour` AS `hour`,`texts`.`year` AS `year`,`texts`.`indentification` AS `indentification`,`texts`.`creditcard` AS `creditcard` from `texts`;

SET FOREIGN_KEY_CHECKS = 1;
