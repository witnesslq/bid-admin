/**
 * Created by Nathan on 15/9/7.
 */
var func=require('./support/shiro/function');
var functionForm=require('./support/shiro/functionForm');
var permission=require('./support/shiro/permission');
var userList=require('./support/shiro/userList');
var userForm=require('./support/shiro/userForm');
var roleList=require('./support/shiro/roleList');
var roleForm=require('./support/shiro/roleForm');

var header = require('./common/components/header');

var userInfo = require('./support/user/info');
var userAdd = require('./support/user/add');
var userAddCompany = require('./support/user/add_company');

var feedbackList = require('./support/feedback/list');

var announcementlist = require('./support/announcement/list');

var announcementcreate = require('./support/announcement/create');

var announcementgzbstatuscreate = require('./support/announcement/gzbstatus/create');

var announcementgzbstatuslist = require('./support/announcement/gzbstatus/list');

var apibannerlist = require('./support/apibanner/list');

var apibannercreate = require('./support/apibanner/create');

var webbannerlist = require('./support/webbanner/createAndUpdate');

var fipList = require('./support/fip/list');

var fipOperation = require('./support/fip/operation');

var fipInfo = require('./support/fip/info');

var fipRule = require('./support/fip/rule');

var vacationInsert = require('./support/vacation/insert');

var vacationList = require('./support/vacation/list');

var importantInsert = require('./support/important/insert');

var tagAdd = require('./support/tag/add');

var tagList = require('./support/tag/list');

var fipTagManage = require('./support/fip/tag_manage');

var fipcreate = require('./support/fip/create');

var smsChannel = require('./support/sms/channel');

var smsTemplate = require('./support/sms/template');

var couponIndex = require('./support/coupon/index');

var couponGrant = require('./support/coupon/grant');

var couponList = require('./support/coupon/list');

var appreleaselist = require('./support/apprelease/list');

var appreleasecreate = require('./support/apprelease/create');

var sendSms = require('./support/message/send_sms');

var pushMessage = require('./support/message/push_message');

var fipbuy = require('./support/fip/buy');

var fipredeem = require('./support/fip/redeem');

var ritpcreate = require('./support/fip/ritp/create');

var ritpconfirm = require('./support/fip/ritp/confirm');

var ritpedit = require('./support/fip/ritp/edit');

var ritpbuy = require('./support/fip/ritp/buy');

var ritpmore = require('./support/fip/ritp/more');