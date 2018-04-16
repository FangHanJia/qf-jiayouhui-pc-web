/*
Navicat MySQL Data Transfer

Source Server         : html5
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : jiayouhui

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-04-16 18:58:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `imgurl` varchar(255) NOT NULL,
  `saleprice` decimal(10,2) NOT NULL,
  `ourprice` decimal(10,2) NOT NULL,
  `des` varchar(255) NOT NULL,
  `salecount` int(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('1', '../img/goods_img1.jpg', '588.00', '118.00', '珍真羊 春装新款短外套 时尚休闲棒球服针织开衫H8...', '378', '2018-04-08 21:02:09');
INSERT INTO `goodslist` VALUES ('2', '../img/goods_img2.jpg', '1599.00', '499.00', '今升大飘带蝴蝶结长袖桑蚕丝女衬衫', '378', '2018-04-08 21:10:56');
INSERT INTO `goodslist` VALUES ('3', '../img/goods_img3.jpg', '798.00', '298.00', '家居服舒暖女士鹅绒裤反季清仓', '378', '2018-04-09 20:54:40');
INSERT INTO `goodslist` VALUES ('4', '../img/goods_img4.jpg', '508.00', '259.00', '百依恋歌 秋冬中长款加厚口袋拉链连帽棉衣棉服外套 ...', '378', '2018-04-10 17:32:59');
INSERT INTO `goodslist` VALUES ('5', '../img/goods_img5.jpg', '199.00', '188.00', '寻蔻年华丝绒中袖印花复古改良礼服旗袍【颜色可选】', '378', '2018-04-08 21:11:31');
INSERT INTO `goodslist` VALUES ('6', '../img/goods_img6.jpg', '588.00', '88.00', '珍真羊一字领蝙蝠袖打底衫女春装长袖T恤针织衫毛衣短...', '378', '2018-04-08 21:11:40');
INSERT INTO `goodslist` VALUES ('7', '../img/goods_img7.jpg', '299.00', '139.00', '寻蔻年华2018春款绣花双面穿长袖短夹克外套【颜色可选】', '378', '2018-04-08 21:11:50');
INSERT INTO `goodslist` VALUES ('8', '../img/goods_img8.jpg', '269.00', '149.00', '童装新款春款流苏开衫外套【颜色可选】', '378', '2018-04-09 20:54:55');
INSERT INTO `goodslist` VALUES ('9', '../img/goods_img9.jpg', '199.00', '109.00', '创业家居新款女士连衣裙/妈妈装打底裙【颜色可选】', '378', '2018-04-09 20:55:11');
INSERT INTO `goodslist` VALUES ('10', '../img/goods_img10.jpg', '199.00', '98.00', '珍真羊妈妈装两件套印花针织开衫外套短袖T恤套装LY...', '378', '2018-04-08 21:12:22');
INSERT INTO `goodslist` VALUES ('11', '../img/goods_img11.jpg', '508.00', '376.00', '茗婉依格新品花蝶恋舞刺绣连衣裙【颜色可选】', '118', '2018-04-08 21:12:22');
INSERT INTO `goodslist` VALUES ('12', '../img/goods_img12.jpg', '597.00', '498.00', '极脉英伦风范女士户外风衣套组', '260', '2018-04-08 21:02:09');
INSERT INTO `goodslist` VALUES ('13', '../img/goods_img13.jpg', '323.00', '200.00', '法米姿 秋装新品拼接蕾丝衬衫衬衣（颜色可选）', '12', '2018-04-09 09:58:33');
INSERT INTO `goodslist` VALUES ('14', '../img/goods_img14.jpg', '333.00', '222.00', '法米姿 秋装新品拼接蕾丝衬衫衬衣（颜色可选）', '12', '2018-04-09 09:58:36');
INSERT INTO `goodslist` VALUES ('15', '../img/goods_img15.jpg', '328.00', '333.00', '法米姿 秋装新品拼接蕾丝衬衫衬衣（颜色可选）', '12', '2018-04-09 09:58:39');
INSERT INTO `goodslist` VALUES ('16', '../img/goods_img16.jpg', '328.00', '111.00', '户外用品 秋装新品拼接蕾丝衬衫衬衣（颜色可选）', '12', '2018-04-09 21:02:34');
INSERT INTO `goodslist` VALUES ('17', '../img/goods_img18.jpg', '328.00', '110.00', '户外用品 秋装新品拼接蕾丝衬衫衬衣（颜色可选）', '12', '2018-04-09 21:02:47');
INSERT INTO `goodslist` VALUES ('18', '../img/goods_img18.jpg', '328.00', '300.00', '法米姿 秋装新品拼接蕾丝衬衫衬衣（颜色可选）', '12', '2018-04-09 09:58:53');
INSERT INTO `goodslist` VALUES ('19', '../img/goods_img19.jpg', '328.00', '120.00', '美妆个护秋装新品拼接蕾丝衬衫衬衣（颜色可选）', '12', '2018-04-09 21:06:24');
INSERT INTO `goodslist` VALUES ('20', '../img/goods_img20.jpg', '328.00', '180.00', '法米姿 秋装新品拼接蕾丝衬衫衬衣（颜色可选）', '12', '2018-04-09 09:44:50');
INSERT INTO `goodslist` VALUES ('21', '../img/goods_img21.jpg', '399.00', '199.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:01:50');
INSERT INTO `goodslist` VALUES ('22', '../img/goods_img22.jpg', '399.00', '200.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:01:55');
INSERT INTO `goodslist` VALUES ('23', '../img/goods_img23.jpg', '399.00', '90.00', '男装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 19:16:24');
INSERT INTO `goodslist` VALUES ('24', '../img/goods_img24.jpg', '399.00', '80.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:01:58');
INSERT INTO `goodslist` VALUES ('25', '../img/goods_img25.jpg', '399.00', '89.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:01');
INSERT INTO `goodslist` VALUES ('26', '../img/goods_img26.jpg', '399.00', '78.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:02');
INSERT INTO `goodslist` VALUES ('27', '../img/goods_img27.jpg', '399.00', '68.00', '男装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 19:14:28');
INSERT INTO `goodslist` VALUES ('28', '../img/goods_img28.jpg', '399.00', '60.00', '男装新款短外时尚休闲棒球服针织开衫H8..', '900', '2018-04-09 19:14:34');
INSERT INTO `goodslist` VALUES ('29', '../img/goods_img29.jpg', '1000.00', '999.00', '内衣新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 19:15:19');
INSERT INTO `goodslist` VALUES ('30', '../img/goods_img30.jpg', '1000.00', '998.00', '女鞋新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 19:16:49');
INSERT INTO `goodslist` VALUES ('31', '../img/goods_img31.jpg', '1000.00', '899.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:14');
INSERT INTO `goodslist` VALUES ('32', '../img/goods_img32.jpg', '1000.00', '799.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:16');
INSERT INTO `goodslist` VALUES ('33', '../img/goods_img33.jpg', '1000.00', '788.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:18');
INSERT INTO `goodslist` VALUES ('34', '../img/goods_img34.jpg', '1000.00', '699.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:19');
INSERT INTO `goodslist` VALUES ('35', '../img/goods_img35.jpg', '1000.00', '1000.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:21');
INSERT INTO `goodslist` VALUES ('36', '../img/goods_img36.jpg', '1000.00', '20.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:23');
INSERT INTO `goodslist` VALUES ('37', '../img/goods_img37.jpg', '1000.00', '800.00', '珍真春装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 10:02:25');
INSERT INTO `goodslist` VALUES ('38', '../img/goods_img38.jpg', '1000.00', '40.00', '女装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 19:14:06');
INSERT INTO `goodslist` VALUES ('39', '../img/goods_img39.jpg', '1000.00', '499.00', '女装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 19:14:11');
INSERT INTO `goodslist` VALUES ('40', '../img/goods_img40.jpg', '1000.00', '599.00', '女装新款短外时尚休闲棒球服针织开衫H8...', '900', '2018-04-09 19:14:17');

-- ----------------------------
-- Table structure for index_countdown
-- ----------------------------
DROP TABLE IF EXISTS `index_countdown`;
CREATE TABLE `index_countdown` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `imgurl` varchar(255) NOT NULL,
  `off` decimal(10,2) NOT NULL,
  `des` varchar(255) NOT NULL,
  `saleprice` decimal(10,2) NOT NULL,
  `salecount` varchar(255) DEFAULT NULL,
  `ourprice` decimal(10,2) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of index_countdown
-- ----------------------------
INSERT INTO `index_countdown` VALUES ('1', '../img/count-down-img1.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '2999', '299.00', '2018-04-11 22:58:09');
INSERT INTO `index_countdown` VALUES ('2', '../img/count-down-img2.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '222', '299.00', '2018-04-11 22:58:13');
INSERT INTO `index_countdown` VALUES ('3', '../img/count-down-img3.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '222', '299.00', '2018-04-11 22:58:46');
INSERT INTO `index_countdown` VALUES ('4', '../img/count-down-img4.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '88', '299.00', '2018-04-11 22:58:17');
INSERT INTO `index_countdown` VALUES ('5', '../img/count-down-img5.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '999', '299.00', '2018-04-11 22:58:19');
INSERT INTO `index_countdown` VALUES ('6', '../img/count-down-img6.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '123', '299.00', '2018-04-11 22:58:21');
INSERT INTO `index_countdown` VALUES ('7', '../img/count-down-img7.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '234', '299.00', '2018-04-11 22:58:26');
INSERT INTO `index_countdown` VALUES ('8', '../img/count-down-img8.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '234', '299.00', '2018-04-11 22:58:28');
INSERT INTO `index_countdown` VALUES ('9', '../img/count-down-img9.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '234', '299.00', '2018-04-11 22:58:30');
INSERT INTO `index_countdown` VALUES ('10', '../img/count-down-img10.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '456', '299.00', '2018-04-11 22:58:36');
INSERT INTO `index_countdown` VALUES ('11', '../img/count-down-img11.jpg', '5.60', '玛品 2017女装夏季新款棉上衣T恤（颜色可选）', '699.00', '234', '299.00', '2018-04-11 22:58:39');

-- ----------------------------
-- Table structure for index_floor
-- ----------------------------
DROP TABLE IF EXISTS `index_floor`;
CREATE TABLE `index_floor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bigimg` varchar(255) NOT NULL,
  `icon1` varchar(255) NOT NULL,
  `icon2` varchar(255) NOT NULL,
  `icon3` varchar(255) NOT NULL,
  `icon4` varchar(255) NOT NULL,
  `icon5` varchar(255) NOT NULL,
  `icon6` varchar(255) NOT NULL,
  `banner1` varchar(255) NOT NULL,
  `banner2` varchar(255) NOT NULL,
  `ad1` varchar(255) NOT NULL,
  `ad2` varchar(255) NOT NULL,
  `ad3` varchar(255) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of index_floor
-- ----------------------------
INSERT INTO `index_floor` VALUES ('1', '../img/floor_1_img1.jpg', 'img/floor_1_icon_1.jpg', 'img/floor_1_icon_2.jpg', 'img/floor_1_icon_3.jpg', 'img/floor_1_icon_4.jpg', 'img/floor_1_icon_5.jpg', 'img/floor_1_icon_6.jpg', '../img/floor_1_banner_img1.jpg', '../img/banner_img3.jpg', 'img/floor_1_ad_img1.jpg', 'img/floor_1_ad_img2.jpg', 'img/floor_1_ad_img3.jpg', '2018-04-07 14:58:51');
INSERT INTO `index_floor` VALUES ('2', 'img/floor_2_img1.jpg', 'img/floor_1_icon_1.jpg', 'img/floor_1_icon_2.jpg', 'img/floor_1_icon_3.jpg', 'img/floor_1_icon_4.jpg', 'img/floor_1_icon_5.jpg', 'img/floor_1_icon_6.jpg', '../img/floor_2_banner_img1.jpg', '../img/banner_img3.jpg', 'img/floor_1_ad_img1.jpg', 'img/floor_1_ad_img2.jpg', 'img/floor_1_ad_img3.jpg', '2018-04-07 22:18:02');
INSERT INTO `index_floor` VALUES ('3', 'img/floor_1_img1.jpg', 'img/floor_1_icon_1.jpg', 'img/floor_1_icon_2.jpg', 'img/floor_1_icon_3.jpg', 'img/floor_1_icon_4.jpg', 'img/floor_1_icon_5.jpg', 'img/floor_1_icon_6.jpg', '../img/floor_1_banner_img1.jpg', '../img/banner_img3.jpg', 'img/floor_1_ad_img1.jpg', 'img/floor_1_ad_img2.jpg', 'img/floor_1_ad_img3.jpg', '2018-04-07 15:53:52');
INSERT INTO `index_floor` VALUES ('4', 'img/floor_1_img1.jpg', 'img/floor_1_icon_1.jpg', 'img/floor_1_icon_2.jpg', 'img/floor_1_icon_3.jpg', 'img/floor_1_icon_4.jpg', 'img/floor_1_icon_5.jpg', 'img/floor_1_icon_6.jpg', '../img/floor_1_banner_img1.jpg', '../img/banner_img3.jpg', 'img/floor_1_ad_img1.jpg', 'img/floor_1_ad_img2.jpg', 'img/floor_1_ad_img3.jpg', '2018-04-07 15:57:17');
INSERT INTO `index_floor` VALUES ('5', 'img/floor_5_img1.jpg', 'img/floor_1_icon_1.jpg', 'img/floor_1_icon_2.jpg', 'img/floor_1_icon_3.jpg', 'img/floor_1_icon_4.jpg', 'img/floor_1_icon_5.jpg', 'img/floor_1_icon_6.jpg', '../img/floor_1_banner_img1.jpg', '../img/banner_img3.jpg', 'img/floor_1_ad_img1.jpg', 'img/floor_1_ad_img2.jpg', 'img/floor_1_ad_img3.jpg', '2018-04-07 22:19:47');

-- ----------------------------
-- Table structure for index_hot
-- ----------------------------
DROP TABLE IF EXISTS `index_hot`;
CREATE TABLE `index_hot` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rank` int(11) NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  `des` varchar(255) NOT NULL,
  `salecount` varchar(255) DEFAULT NULL,
  `ourprice` decimal(10,2) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of index_hot
-- ----------------------------
INSERT INTO `index_hot` VALUES ('1', '1', '../img/hot-1-img1.jpg', '索能厨卫能量泡泡清洁套组', '33', '298.00', '2018-04-11 22:59:40');
INSERT INTO `index_hot` VALUES ('2', '1', '../img/hot-1-img2.jpg', '索能厨卫能量泡泡清洁套组', '444', '298.00', '2018-04-11 22:59:42');
INSERT INTO `index_hot` VALUES ('3', '1', '../img/hot-1-img3.jpg', '索能厨卫能量泡泡清洁套组', '555', '298.00', '2018-04-11 22:59:44');
INSERT INTO `index_hot` VALUES ('4', '1', '../img/hot-1-img4.jpg', '索能厨卫能量泡泡清洁套组', '2222', '298.00', '2018-04-11 22:59:45');
INSERT INTO `index_hot` VALUES ('5', '1', '../img/hot-1-img5.jpg', '索能厨卫能量泡泡清洁套组', '222', '298.00', '2018-04-11 22:59:47');
INSERT INTO `index_hot` VALUES ('6', '1', '../img/hot-1-img6.jpg', '索能厨卫能量泡泡清洁套组', '66', '298.00', '2018-04-11 22:59:49');
INSERT INTO `index_hot` VALUES ('7', '1', '../img/hot-1-img7.jpg', '索能厨卫能量泡泡清洁套组', '777', '298.00', '2018-04-11 22:59:50');
INSERT INTO `index_hot` VALUES ('8', '1', '../img/hot-1-img8.jpg', '索能厨卫能量泡泡清洁套组', '8888', '298.00', '2018-04-11 22:59:51');
INSERT INTO `index_hot` VALUES ('9', '1', '../img/hot-1-img9.jpg', '索能厨卫能量泡泡清洁套组', '444', '298.00', '2018-04-11 22:59:53');
INSERT INTO `index_hot` VALUES ('10', '1', '../img/hot-1-img10.jpg', '索能厨卫能量泡泡清洁套组', '555', '298.00', '2018-04-11 22:59:54');
INSERT INTO `index_hot` VALUES ('11', '1', '../img/hot-1-img11.jpg', '索能厨卫能量泡泡清洁套组', '63', '298.00', '2018-04-11 22:59:57');
INSERT INTO `index_hot` VALUES ('12', '1', '../img/hot-1-img12.jpg', '索能厨卫能量泡泡清洁套组', '235', '298.00', '2018-04-11 22:59:59');
INSERT INTO `index_hot` VALUES ('13', '1', '../img/hot-1-img13.jpg', '索能厨卫能量泡泡清洁套组', '345', '298.00', '2018-04-11 23:00:00');
INSERT INTO `index_hot` VALUES ('14', '1', '../img/hot-1-img14.jpg', '索能厨卫能量泡泡清洁套组', '24', '298.00', '2018-04-11 23:00:02');
INSERT INTO `index_hot` VALUES ('15', '1', '../img/hot-1-img15.jpg', '索能厨卫能量泡泡清洁套组', '789', '298.00', '2018-04-11 23:00:05');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `loginstatus` varchar(255) NOT NULL,
  `timestamep` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '13925650272', '96e79218965eb72c92a549dd5a330112', 'online', '2018-04-15 12:38:48');
INSERT INTO `user` VALUES ('2', '13925650273', '96e79218965eb72c92a549dd5a330112', 'offline', '2018-04-15 12:34:12');

-- ----------------------------
-- Table structure for user_13925650272
-- ----------------------------
DROP TABLE IF EXISTS `user_13925650272`;
CREATE TABLE `user_13925650272` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `guid` varchar(20) NOT NULL,
  `imgurl` varchar(30) NOT NULL,
  `ourprice` varchar(10) DEFAULT NULL,
  `des` varchar(30) NOT NULL,
  `qty` varchar(20) DEFAULT NULL,
  `reg_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_13925650272
-- ----------------------------
INSERT INTO `user_13925650272` VALUES ('1', '6', '../img/goods_img6.jpg', '88.00', '珍真羊一字领蝙蝠袖打底衫女春装长袖T恤针织衫毛衣短...', '12', null);

-- ----------------------------
-- Table structure for user_13925650273
-- ----------------------------
DROP TABLE IF EXISTS `user_13925650273`;
CREATE TABLE `user_13925650273` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `guid` varchar(20) NOT NULL,
  `imgurl` varchar(30) NOT NULL,
  `ourprice` varchar(10) DEFAULT NULL,
  `des` varchar(30) NOT NULL,
  `qty` varchar(20) DEFAULT NULL,
  `reg_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_13925650273
-- ----------------------------
INSERT INTO `user_13925650273` VALUES ('1', '3', '../img/goods_img3.jpg', '298.00', '家居服舒暖女士鹅绒裤反季清仓', '4', null);
INSERT INTO `user_13925650273` VALUES ('2', '5', '../img/goods_img5.jpg', '188.00', '寻蔻年华丝绒中袖印花复古改良礼服旗袍【颜色可选】', '3', null);
