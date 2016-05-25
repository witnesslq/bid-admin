(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Nathan on 15/9/9.
 */
var header = {};

header.content = '我是页头';
header.init = function(){
    $('#header').append('<p>'+this.content+'</p>');
};

module.exports = header;
},{}],2:[function(require,module,exports){
var helpers = {};

helpers.formValidateSuccessTips = function($inputObject, $msg) {
    $inputObject.removeClass('invalid').addClass('valid');
    $inputObject.next('label').attr('data-success', $msg);
}

helpers.formValidateErrorTips = function($inputObject, $msg) {
    $inputObject.removeClass('valid').addClass('invalid');
    $inputObject.next('label').attr('data-error', $msg);
}

module.exports = helpers;
},{}],3:[function(require,module,exports){
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
},{"./common/components/header":1,"./support/announcement/create":4,"./support/announcement/gzbstatus/create":5,"./support/announcement/gzbstatus/list":6,"./support/announcement/list":7,"./support/apibanner/create":8,"./support/apibanner/list":9,"./support/apprelease/create":10,"./support/apprelease/list":11,"./support/coupon/grant":12,"./support/coupon/index":13,"./support/coupon/list":14,"./support/feedback/list":15,"./support/fip/buy":16,"./support/fip/create":17,"./support/fip/info":18,"./support/fip/list":19,"./support/fip/operation":20,"./support/fip/redeem":21,"./support/fip/ritp/buy":22,"./support/fip/ritp/confirm":23,"./support/fip/ritp/create":24,"./support/fip/ritp/edit":25,"./support/fip/ritp/more":26,"./support/fip/rule":27,"./support/fip/tag_manage":28,"./support/important/insert":29,"./support/message/push_message":30,"./support/message/send_sms":31,"./support/shiro/function":32,"./support/shiro/functionForm":33,"./support/shiro/permission":34,"./support/shiro/roleForm":35,"./support/shiro/roleList":36,"./support/shiro/userForm":37,"./support/shiro/userList":38,"./support/sms/channel":39,"./support/sms/template":40,"./support/tag/add":41,"./support/tag/list":42,"./support/user/add":43,"./support/user/add_company":44,"./support/user/info":45,"./support/vacation/insert":46,"./support/vacation/list":47,"./support/webbanner/createAndUpdate":48}],4:[function(require,module,exports){
var announcementcreate = {};

announcementcreate.init = function () {
    var $wrapPage = $('.announcement-create');

    $wrapPage.find('input[name="startTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $wrapPage.find('input[name="endTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    var handle = function (postData) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/announcement/handle",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function () {
                $(".announcement-create #announcement_addBtn").attr('disabled', 'disabled');
            },
            complete: function () {
                $(".announcement-create #announcement_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    if (postData.id == "0") {
                        alert("添加成功！");
                    } else {
                        alert("修改成功！");
                    }
                    window.location.href = "/support/announcement/list";
                } else {
                    if (postData.id == "0") {
                        alert("添加失败，原因：" + data.errMsg);
                    } else {
                        alert("修改失败，原因：" + data.errMsg);
                    }
                }
            }
        });
    };

    var preCheck = function (postData) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/announcement/checkCreate",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function () {
                $(".announcement-create #announcement_addBtn").attr('disabled', 'disabled');
            },
            complete: function () {
                $(".announcement-create #announcement_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    handle(postData);
                } else {
                    alert("相同银行，相同时间区间内的公告已存在，请重新确认！");
                }
            }

        });
    };

    $(".announcement-create #announcement_addBtn").click(function () {
        var aid = $(".announcement-create input[name='id']").val();
        if (aid == "") aid = "0";

        var channels = new Array();
        $(".announcement-create [name='channels']:checked").each(function () {
            channels.push($(this).val());
            if(channels.length==0){
                alert("请选择影响银行！");
            }
        });
        var content= $(".announcement-create [name='content']").val();
        if(content==null||content==""){
            alert("请填写内容！")
        }

        var postData = {
            startTime: $(".announcement-create [name='startTime']").val() + ":00.0",
            endTime: $(".announcement-create [name='endTime']").val() + ":00.0",
            seeBeforeLogin: $(".announcement-create [name='seeBeforeLogin']").prop("checked") ? "true" : "false",
            canClose: $(".announcement-create input[name='canClose']").prop("checked") ? "true" : "false",
            channels: channels,
            content: $(".announcement-create [name='content']").val(),
            id: aid
        };

        preCheck(postData);
    });

};
announcementcreate.init();
module.exports = announcementcreate;
},{}],5:[function(require,module,exports){
/**
 * Created by marksu on 15/9/22.
 */
var announcementGzbStatusCreate = {};
var wrap = $('.announcement-gzbstatus-create');

announcementGzbStatusCreate.init = function () {
    $(function () {
        wrap.find("input[name='startTime']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
        wrap.find("input[name='endTime']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});


        var preCheck = function (postData) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/support/announcement/gzb/status/checkGzbStatus",
                method: "post",
                dataType: "json",
                data: JSON.stringify(postData),
                beforeSend: function () {
                    wrap.find("#gzbStatus_addBtn").attr('disabled', 'disabled');
                },
                complete: function () {
                    wrap.find("#gzbStatus_addBtn").removeAttr('disabled');
                },
                success: function (data) {
                    if (data.errCode == "00000") {
                        handle(postData);
                    } else {
                        alert("相同银行，相同时间区间内的公告已存在，请重新确认！");
                    }
                }
            });
        };

        var handle = function (postData) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/support/announcement/gzb/status/handle",
                method: "post",
                dataType: "json",
                data: JSON.stringify(postData),
                beforeSend: function () {
                    wrap.find("#gzbStatus_addBtn").attr('disabled', 'disabled');
                },
                complete: function () {
                    wrap.find("#gzbStatus_addBtn").removeAttr('disabled');
                },
                success: function (data) {
                    if (data.errCode == "00000") {
                        if (postData.id == "0") {
                            alert("添加成功！");
                        } else {
                            alert("修改成功！");
                        }
                        window.location.href = "/support/announcement/gzb/status/list";
                    } else {
                        if (postData.id == "0") {
                            alert("添加失败，原因：" + data.errMsg);
                        } else {
                            alert("修改失败，原因：" + data.errMsg);
                        }
                    }
                }
            });
        };

        wrap.find('#gzbStatus_addBtn').click(function () {
            var aid = $(".announcement-gzbstatus-create input[name='id']").val();
            if (aid == "") aid = "0";

            var channels = {};
            wrap.find("[name='channels']:checked").each(function () {
                var channelId = $(this).val();
                channels[channelId] = wrap.find("input[name='tipMsg_" + channelId + "']").val();
            });
            var postData = {
                startTime: wrap.find("[name='startTime']").val() + ":00.0",
                endTime: wrap.find("[name='endTime']").val() + ":00.0",
                closeSign: wrap.find("input[name='closeSign']").prop("checked") ? "true" : "false",
                closePurchase: wrap.find("input[name='closePurchase']").prop("checked") ? "true" : "false",
                closeRegularRedeem: wrap.find("input[name='closeRegularRedeem']").prop("checked") ? "true" : "false",
                closeRealtimeRedeem: wrap.find("input[name='closeRealtimeRedeem']").prop("checked") ? "true" : "false",
                channels: channels,
                id: aid
            };

            preCheck(postData);
        });
    });
};

announcementGzbStatusCreate.init();
module.exports = announcementGzbStatusCreate;
},{}],6:[function(require,module,exports){
/**
 * Created by Nathan on 15/9/9.
 */
var announcementgzbstatuslist = {};
var wrap = $('.announcement-gzbstatus-list');

announcementgzbstatuslist.init = function(){
    $(function(){
        var delButton = wrap.find('.del');
        var confirmModal = wrap.find('#gzb_status_confirm_delete_modal');

        delButton.each(function() {
            $(this).unbind("click").bind("click", function() {
                var id = $(this).attr("data-id");
                confirmModal.modal();
                confirmModal.find('#confirm_btn').bind("click", function() {
                    $.ajax({
                        url: "/support/announcement/gzb/status/delete",
                        data: "id=" + id,
                        dataType:"json",
                        method: "post",
                        success:function(data) {
                            if (data.errCode != "00000") {
                                confirmModal.find('.modal-body').html("删除失败，原因：" + data.errMsg);
                            } else {
                                confirmModal.modal('hide');
                                window.location.reload();
                            }
                        }
                    });
                });
            });
        });
    })
}
announcementgzbstatuslist.init();
module.exports = announcementgzbstatuslist;
},{}],7:[function(require,module,exports){
/**
 * Created by Nathan on 15/9/9.
 */
var announcementlist = {};
var wrap = $('.announcement-list');

announcementlist.init = function(){
    $(function(){
        var delButton = wrap.find('.del');
        var confirmModal = wrap.find('#confirm_delete_modal');

        delButton.each(function() {
            $(this).unbind("click").bind("click", function() {
                var id = $(this).attr("data-id");
                confirmModal.modal();
                confirmModal.find('#confirm_btn').bind("click", function() {
                    $.ajax({
                        url: "/support/announcement/delete",
                        data: "id=" + id,
                        dataType:"json",
                        method: "post",
                        success:function(data) {
                            if (data.errCode != "00000") {
                                confirmModal.find('.modal-body').html("删除失败，原因：" + data.errMsg);
                            } else {
                                confirmModal.modal('hide');
                                window.location.reload();
                            }
                        }
                    });
                });
            });
        });
    })
}
announcementlist.init();
module.exports = announcementlist;
},{}],8:[function(require,module,exports){
var apibannercreate = {};
var wrap = $('.support-apibanner-create');

apibannercreate.create = function() {
    var disabledSubmitButton = function() {
        wrap.find('#btn-submit').attr('disabled', true).addClass('disabled');
    };
    var enabledSubmitButton = function() {
        wrap.find('#btn-submit').removeAttr('disabled').removeClass('disabled');
    };

    wrap.find('#add-api-banner-form').on('submit', function() {
        disabledSubmitButton();

        var $test = wrap.find('#file');
        if ($test.val() == '') {
            alert('请先提交图片');
            enabledSubmitButton();
            return false;
        }

        $test = wrap.find('#beginDate');
        if ($test.val() == null || $test.val() == '') {
            alert("开始时间不能为空");
            enabledSubmitButton();
            return false;
        }

        $test = wrap.find('#endDate');
        if ($test.val() == null || $test.val() == '') {
            alert("结束时间不能为空");
            enabledSubmitButton();
            return false;
        }

        $test = wrap.find('#actionType');
        if ($test.val() == null || $test.val() == '') {
            alert("执行动作不能为空");
            enabledSubmitButton();
            return false;
        }

        $test = wrap.find('#actionValue');
        if ($test.val() == null || $test.val() == '') {
            alert("内容不能为空");
            enabledSubmitButton();
            return false;
        }
    });

    wrap.find('#actionType').on('change', function() {
        var selectEm = $(this);
        var tips = (selectEm.find('option:selected').data('tips'));
        wrap.find('#actionValue').attr('placeholder', tips).val('');
        if ($(this).val() == 'embed') {
            wrap.find('#nativePages').parent().removeClass('hide');
            wrap.find('#actionValue').attr('readonly', true);
        } else {
            wrap.find('#nativePages').parent().addClass('hide');
            wrap.find('#actionValue').removeAttr('readonly');
        }

    }).change();

    wrap.find('#nativePages').on('change', function() {
        var selectEm = $(this);
        var tips = (selectEm.find('option:selected').data('tips'));
        wrap.find('#actionValue').val(tips);
    })
};


apibannercreate.init = function () {
    wrap.find('input[name="beginDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="endDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    apibannercreate.create();
};

apibannercreate.init();

module.exports = apibannercreate;
},{}],9:[function(require,module,exports){
/**
 * Created by Nathan on 15/9/9.
 */
var apibannerlist = {};
var wrap = $('.apibanner-list');

apibannerlist.init = function(){
    $(function(){
        var delButton = wrap.find('.del');
        var confirmModal = wrap.find('#confirm_delete_modal');

        delButton.each(function() {
            $(this).unbind("click").bind("click", function() {
                var id = $(this).attr("data-id");
                confirmModal.modal();
                confirmModal.find('#confirm_btn').bind("click", function() {
                    $.ajax({
                        url: "/support/api/banner/delete",
                        data: "id=" + id,
                        dataType:"json",
                        method: "post",
                        success:function(data) {
                            if (data.errCode != "00000") {
                                confirmModal.find('.modal-body').html("删除失败，原因：" + data.errMsg);
                            } else {
                                confirmModal.modal('hide');
                                window.location.reload();
                            }
                        }
                    });
                });
            });
        });
    })
}
apibannerlist.init();
module.exports = apibannerlist;
},{}],10:[function(require,module,exports){
var appreleasecreate = {};

appreleasecreate.init = function () {
    var $wrapPage = $('.support-apprelease-create');

    $wrapPage.find('input[name="releaseDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    var $model = $(".announcement-create input[name='model']").val();

    var handle = function (postData) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/app/release/create",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function () {
                $(".support-apprelease-create #apprelease_addBtn").attr('disabled', 'disabled');
            },
            complete: function () {
                $(".support-apprelease-create #apprelease_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    if (postData.id == null) {
                        alert("添加成功！");
                    } else {
                        alert("修改成功！");
                    }
                    if (postData.model == "Android") {
                        window.location.href = "/support/app/release/Android/latest";
                    } else if (postData.model == "iPhone") {
                        window.location.href = "/support/app/release/iPhone/latest";
                    }

                } else {
                    if (postData.id == "0") {
                        alert("添加失败，原因：" + data.errMsg);
                    } else {
                        alert("修改失败，原因：" + data.errMsg);
                    }
                }
            }
        });
    };

    $(".support-apprelease-create #apprelease_addBtn").click(function () {
        var postData = {
            url: $(".support-apprelease-create [name='url']").val(),
            md5: $(".support-apprelease-create [name='md5']").val(),
            releaseDate: $(".support-apprelease-create [name='releaseDate']").val(),
            forceUpdate: $(".support-apprelease-create [name='forceUpdate']").prop("checked") ? "1" : "0",
            title: $(".support-apprelease-create [name='title']").val(),
            version: $(".support-apprelease-create [name='version']").val(),
            versionCode: $(".support-apprelease-create [name='versionCode']").val(),
            content: $(".support-apprelease-create [name='content']").val(),
            id: $(".support-apprelease-create input[name='id']").val(),
            model: $(".support-apprelease-create input[name='model']").val()
        };

        handle(postData);
    });

};
appreleasecreate.init();
module.exports = appreleasecreate;
},{}],11:[function(require,module,exports){
/**
 * Created by Nathan on 15/9/9.
 */
var appreleaselist = {};
var wrap = $('.apprelease-list');

appreleaselist.init = function(){
    $(function(){
        var delButton = wrap.find('.del');
        var confirmModal = wrap.find('#confirm_delete_modal');

        delButton.each(function() {
            $(this).unbind("click").bind("click", function() {
                var id = $(this).attr("data-id");
                confirmModal.modal();
                confirmModal.find('#confirm_btn').bind("click", function() {
                    $.ajax({
                        url: "/support/app/release/delete",
                        data: "id=" + id,
                        dataType:"json",
                        method: "post",
                        success:function(data) {
                            if (data.errCode != "00000") {
                                confirmModal.find('.modal-body').html("删除失败，原因：" + data.errMsg);
                            } else {
                                confirmModal.modal('hide');
                                window.location.reload();
                            }
                        }
                    });
                });
            });
        });
    })
}
appreleaselist.init();
module.exports = appreleaselist;
},{}],12:[function(require,module,exports){
var couponGrant = {};

couponGrant.selectTags = {};
couponGrant.tags = []

couponGrant.refreshSelectTag = function() {
    var $divSelectedTag = $(".coupon-grant #div-selected-tag");
    $divSelectedTag.html("");
    couponGrant.tags = []
    for(var key in couponGrant.selectTags) {
        couponGrant.tags.push(parseInt(key));
        var $div = $("<tr><td></td></tr>");
        $div.html(couponGrant.selectTags[key]+"<i class='fa fa-times close-tag'></i>");
        $div.attr("data-tag-id", key);
        $div.attr("data-tag-name", couponGrant.selectTags[key]);
        $div.appendTo($divSelectedTag);
    }
    $(".coupon-grant .close-tag").click(function(){
        delete couponGrant.selectTags[$(this).parent().attr("data-tag-id")];
        couponGrant.refreshSelectTag();
    });
};



couponGrant.init = function() {
    $(".coupon-grant #show-time").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".coupon-grant #begin-time").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".coupon-grant #end-time").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".coupon-grant #btn-add-tag").click(function(){
        couponGrant.selectTags[$(".coupon-grant #select-tag").val()] = $(".coupon-grant #select-tag").find("option:selected").text();
        couponGrant.refreshSelectTag();
    });

    $(".coupon-grant #btn-grant").click(function(){
        $(".coupon-grant #btn-grant").attr("disabled", true).addClass('disabled');
        var couponName = $(".coupon-grant #coupon-name").val();
        var couponAmount = $(".coupon-grant #coupon-amount").val();
        var couponDescription = $(".coupon-grant #coupon-description").val();
        var showTime = $(".coupon-grant #show-time").val();
        var beginTime = $(".coupon-grant #begin-time").val();
        var endTime = $(".coupon-grant #end-time").val();
        var fipId = $(".coupon-grant #coupon-fip-id").val();

        var postData =  {
            name: couponName,
            amount: Number(couponAmount),
            description: couponDescription,
            showTime: new Date(showTime+":00".replace(/-/,"/")).getTime(),
            beginTime: new Date(beginTime+":00".replace(/-/,"/")).getTime(),
            endTime:  new Date(endTime+":00".replace(/-/,"/")).getTime(),
            fipId: parseInt(fipId),
            tags: couponGrant.tags
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/coupon",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            success: function(data) {
                if(data.errCode == '00000') {
                    alert("发放成功");
                    location.reload();
                } else {
                    alert(data.errMsg);
                }
                $(".coupon-grant #btn-grant").removeAttr('disabled').removeClass('disabled');
            }
        });
    });
};

couponGrant.init();
module.exports = couponGrant;

},{}],13:[function(require,module,exports){
var couponIndex = {};

couponIndex.init = function(){
    $(".coupon-index #btn-search").click(function(){
        var number = $(".coupon-index #input-number").val();
        if(number == "") {
            alert("请输入粮票编号");
        } else {
            location.href="/support/coupon?number="+number;
        }
    });
};

couponIndex.init();
module.exports = couponIndex;
},{}],14:[function(require,module,exports){
var couponList = {};

couponList.init = function() {
    $(".coupon-list #btn-cancel-grant").click(function(){
        if(confirm("你确信要取消["+$(this).attr("data-batch-name")+"]粮票？")){
            $.ajax({
                headers: {
                    'Accept': 'application/json'
                },
                url: "/support/coupon?batchId="+$(this).attr("data-batch-id"),
                type: "delete",
                dataType: "json",
                success:function(data){
                    location.reload();
                }
            });
        }
    });

};

couponList.init();
module.exports = couponList;
},{}],15:[function(require,module,exports){
var feedbackList = {};

feedbackList.getStatusHtml = function(status) {
    var html = "";
    if (status == "1") {
        html = '<i class="icon fa fa-warning text-red"></i>';
    }
    if (status == "2") {
        html = '<i class="glyphicon glyphicon-time text-yellow"></i>';
    }
    if (status == "3") {
        html = '<i class="glyphicon glyphicon-ok-circle text-green"></i>';
    }
    return html;
}
feedbackList.formatDate = function(timestamp) {
    var fdate = new Date(timestamp);
    return fdate.toLocaleString();
}
feedbackList.init = function() {
    var disabledCleanButton = function() {
        $('.feedback-list #clean').attr('disabled', true).addClass('disabled');
    };
    var enabledCleanButton = function() {
        $('.feedback-list #clean').removeAttr('disabled').removeClass('disabled');
    };
    $('.feedback-list #clean').on('click', function () {
        disabledCleanButton();
        $.ajax({
            type: 'POST',
            url: '/support/feedback/clean',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            dataType: "json",
            success: function (data) {
                enabledCleanButton();
                alert(data.errMsg);
                if(data.errCode == "00000") {
                    location.reload();
                }
            },
            error: function (data) {
                enabledCleanButton();
                alert("异常！"+data);
            }
        })

    });
    var $nameLinkList = $('.feedback-list .name');
    var $contentLinkList = $('.feedback-list .cnt');
    var $phoneLinkList = $('.feedback-list .phone');

    var $feedbackModal = $('div.feedback-modal');
    var $feedbackModalTitle = $feedbackModal.find('.modal-title');
    var $feedbackModalBody = $feedbackModal.find('.modal-body');
    var $feedbackModalFooter = $feedbackModal.find('.modal-footer');

    $nameLinkList.each(function(){
        $(this).unbind("click").bind("click", function(){
            var url = "/support/feedback/user?uid=" + $(this).attr("id");
            var userName = $(this).text();

            $feedbackModalFooter.html('');
            $feedbackModalTitle.text(userName);
            $feedbackModalBody.html('');

            $.ajax({
                url: url,
                dataType:"json",
                method: "get",
                success:function(data) {
                    if (data.errCode == "00000") {
                        var html="<div class='table-responsive no-padding'><table class='table table-bordered table-hover'>";
                        html += '<thead><tr><th>内容</th><th width="175px;">日期</th></tr></thead><tbody>';
                        var num = data.data.length;
                        for(var i = 0; i < num; i++) {
                            html += '<tr>';
                            html += '<td>' + feedbackList.getStatusHtml(data.data[i].status) + '<span style="word-wrap:break-word; word-break:break-all;">' + data.data[i].content + '</span></td><td>' + feedbackList.formatDate(data.data[i].createdTime) + '</td>';
                            html += '</tr>';
                        }
                        html += "</tbody></table></div>";
                        $feedbackModalBody.html(html);
                    } else {
                        $feedbackModalBody.text("获取数据失败！失败原因：" + data.errMsg);
                    }
                }
            });
            $feedbackModal.modal();
        });
    });

    $phoneLinkList.each(function(){
        $(this).unbind("click").bind("click", function(){
            var feedbackId = $(this).attr("data-id");

            var listenSubmit = function(data, $sendButton) {
                $sendButton.unbind("click").bind("click", function() {
                    var postData = {
                        feedbackId: data.data.id,
                        phone: data.data.phone,
                        msg: $("#reply_content").val()
                    };

                    $.ajax({
                        jsonp: false,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        url: "/support/feedback/send_msg",
                        method: "post",
                        dataType: "json",
                        data: JSON.stringify(postData),
                        beforeSend: function() {
                            $("#send").attr('disabled', 'disabled');
                        },
                        complete: function() {
                            $("#send").removeAttr('disabled');
                        },
                        success:function(data) {
                            if (data.errCode == "00000") {
                                //$feedbackModal.modal('hide');
                                requestContent();
                                console.log($feedbackModal.find('i').attr('class'));
                            } else {
                                alert("发送短信失败，原因：" + data.errorMsg);
                            }
                        }
                    });
                });
            };

            var writeContent = function (data) {
                $feedbackModalTitle.text("短信回复 " + ((data.data.userName==null) ? " " : data.data.userName + "(" + data.data.phone + ")"));
                var html = "";
                html += '<div style="word-wrap:break-word; word-break:break-all;"><blockquote>' + feedbackList.getStatusHtml(data.data.status) + " <span>" + data.data.content + '</span></blockquote></div>';
                html += "<div class='table-responsive no-padding'><table class='table table-bordered table-hover' >";
                html += '<thead><tr><td>内容</td><td width="175px;">日期</td></tr></thead><tbody>';
                var num = data.data.replies.length;
                for(var i = 0; i < num; i++) {
                    html += '<tr>';
                    html += '<td style="word-wrap:break-word; word-break:break-all;">' + data.data.replies[i].content + '</td><td>' + feedbackList.formatDate(data.data.replies[i].createTime) + '</td>';
                    html += '</tr>';
                }
                html += "</tbody></table></div>";
                html += '<div class="form-group"><textarea class="form-control" id="reply_content" rows="5" placeholder="请输入短信内容"></textarea></div>';

                $feedbackModalBody.html(html);

                var $sendButton = $('<button id="send" type="button" class="btn btn-success">发送</button>');
                $feedbackModalFooter.html($sendButton);
                listenSubmit(data, $sendButton);
            };

            var requestContent = function() {
                var url = "/support/feedback/reply_detail?id=" + feedbackId;

                $feedbackModalTitle.text('');
                $feedbackModalBody.html('');

                $.ajax({
                    url: url,
                    dataType:"json",
                    method: "get",
                    success:function(data) {
                        if (data.errCode == "00000") {
                            writeContent(data);
                        } else {
                            $feedbackModalBody.text("获取数据失败！失败原因：" + data.errMsg);
                        }
                    }
                });
            };

            $feedbackModal.modal();
            requestContent();
        });
    });

    $contentLinkList.each(function(){
        $(this).unbind("click").bind("click", function(){
            var url = "/support/feedback/detail?id=" + $(this).attr("id");

            $feedbackModalFooter.html('');
            $feedbackModalTitle.text("详情");
            $feedbackModalBody.html("");

            $.ajax({
                url: url,
                dataType:"json",
                method: "get",
                success:function(data) {
                    if (data.errCode == "00000") {
                        var html="<div class='table-responsive no-padding'><table class='table table table-bordered table-hover' style='word-wrap:break-word; word-break:break-all;'>";
                        html += "<tr><td  style='width:80px;'>姓名:</td><td>" + data.data.userName + "</td></tr>";
                        html += "<tr><td>公司:</td><td>" + data.data.userCompany + "</td></tr>";
                        html += "<tr><td>手机:</td><td><a href='/support/user/info?phone="+ data.data.phone+"' >" + data.data.phone + "</a></td></tr>";
                        html += "<tr><td>内容:</td><td style='word-wrap:break-word; word-break:break-all;'>" + data.data.content + "</td></tr>";
                        html += "<tr><td>用户信息:</td><td>" + data.data.userEnv + "</td></tr>";
                        html += "<tr><td>解决状态:</td><td id='status'>" + feedbackList.getStatusHtml(data.data.status) + "</td></tr>";
                        html += "<tr><tdcolspan='2'></td></tr>";
                        html += "</table></div>";

                        $feedbackModalBody.html(html);

                        var listenBtn = false;
                        if (data.data.status == 1) {
                            var btnClass = "btn-warning";
                            var btnText = "开始解决";
                            listenBtn = true;
                        }
                        if (data.data.status == 2) {
                            var btnClass = "btn-success";
                            var btnText = "已经解决";
                            listenBtn = true;
                        }
                        if (listenBtn) {
                            var $htmlFooterButtonUndo = $('<button class="btn" type="button" />').addClass(btnClass)
                                .attr('data-id', data.data.id).attr('data-status', data.data.status).text(btnText);
                            $feedbackModalFooter.html($htmlFooterButtonUndo);

                            $htmlFooterButtonUndo.bind('click', function() {
                                var id = $(this).attr("data-id");
                                var status = $(this).attr("data-status");
                                var changeStatus = parseInt(status) + 1;
                                $.ajax({
                                    url: "/support/feedback/change_status?fbid=" + id + "&status=" + changeStatus,
                                    dataType:"json",
                                    method:"get",
                                    success:function(data) {
                                        if (data.errCode == "00000") {

                                            if (status == 1) {
                                                //修改为已将解决
                                                $('button[class="btn btn-warning"]').removeClass(btnClass).addClass('btn-success').attr('data-id', id).attr('data-status', '2').text('已经解决');
                                            }
                                            if (status == 2) {
                                                window.location.reload();
                                            }
                                            //window.location.reload();
                                        } else {
                                            alert("更改状态失败。原因：" + data.errMsg);
                                        }
                                    }
                                });
                            });
                        }

                    } else {
                        $feedbackModalBody.text("获取数据失败！失败原因：" + data.errMsg);
                    }
                }
            });

            $feedbackModal.modal();
        });
    });
};
feedbackList.init();
module.exports = feedbackList;
},{}],16:[function(require,module,exports){

var fipbuy = {};
var wrap = $('.buyClass');
fipbuy.init = function() {
//通知
    $('.buyClass #inform').on('click', function () {

        $('.buyClass #inform').attr('disabled', 'disabled');
        $('.buyClass #informStatus').html('<span style="color:red;">正在处理请稍后...</span>');

        var fipId = $('.buyClass #fipId').val();
        var fipInfoStatus = $('.buyClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败:" + data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })

    });

    //发起非交易过户
    $('.buyClass #payId').on('click', function () {
        $('.buyClass #payId').attr('disabled', 'disabled');
        $('.buyClass #payIdStatus').html('<span style="color:red;">正在处理请稍后...</span>');

        var fipId = $('.buyClass #fipId').val();
        var fipInfoStatus = $('.buyClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    //发送购买成功短信
    $('.buyClass #smsId').on('click', function () {
        $('.buyClass #smsId').attr('disabled', 'disabled');
        $('.buyClass #smsIdStatus').html('<span style="color:red;">正在处理请稍后...</span>');

        var fipId = $('.buyClass #fipId').val();
        var fipInfoStatus = $('.buyClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    //生成销售明细表
    $('.buyClass #generatorId').on('click', function () {

        $('.buyClass #generatorId').attr('disabled', 'disabled');
        $('.buyClass #generatorIdStatus').html('<span style="color:red;">正在处理请稍后...</span>');

        var fipId = $('.buyClass #fipId').val();
        var fipInfoStatus = $('.buyClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })

    });

    //核对并通知粤交所
    $('.buyClass #checkId').on('click', function () {
        $('.buyClass #checkId').attr('disabled', 'disabled');
        $('.buyClass #checkIdStatus').html('<span style="color:red;">正在处理请稍后...</span>');

        var fipId = $('.buyClass #fipId').val();
        var fipInfoStatus = $('.buyClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })

    })

    $('.buyClass #uploadFileId').on('click', function () {
        var formData = new FormData($('.buyClass #uploadDetailForm')[0]);
        var fipId = $('.buyClass #fipId').val();
        var url = "/support/fip/"+fipId+"/detailFile";
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                    location.reload();
                } else{
                    alert("上传失败"+ data.errMsg);
                }
            },
            error: function (data) {
                alert("执行失败，原因：" + data);
            }
        });

    })
}
fipbuy.init();
module.exports = fipbuy;
},{}],17:[function(require,module,exports){

/**
 * Created by hnzb on 16/1/26.
 */

var fipcreate = {};
var wrap = $('.fip-create');
fipcreate.init = function() {

    wrap.find('input[name="buyEndTimeStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="buyBeginTimeStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="showTimeStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="endDateStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="beginDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="beginDateStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    $('.fip-create #beginBannerBtn').on('click', function () {
        var formData = new FormData($('.fip-create #formBegin')[0]);
        $.ajax({
            url: '/support/fip/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.fip-create #beginBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })

    $('.fip-create #endBannerBtn').on('click', function () {
        var formData = new FormData($('.fip-create #formEnd')[0]);
        $.ajax({
            url: '/support/fip/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.fip-create #endBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })
    $(".fip-create #beginDate").change(function () {
        var beginDate = $(".fip-create #beginDate").val();
        var endDateStr = $(".fip-create #endDateStr").val();
        var annualIncome = $(".fip-create #annualIncome").val();
        if(beginDate.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDate, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/fip/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                dataType: "json",
                data: {beginDateStr: beginDate,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    $('.fip-create #dueDesc').val(data.data.dueDesc);
                    $('.fip-create #incomeRate').val(data.data.incomeRate);
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })
    $(".fip-create #endDateStr").change(function () {
        var beginDate = $(".fip-create #beginDate").val();
        var endDateStr = $(".fip-create #endDateStr").val();
        var annualIncome = $(".fip-create #annualIncome").val();
        if(beginDate.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDate, endDateStr, annualIncome);
            $.ajax({
                method: 'GET',
                url: '/support/fip/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                data: {beginDateStr: beginDate,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    $('.fip-create #dueDesc').val(data.data.dueDesc);
                    $('.fip-create #incomeRate').val(data.data.incomeRate);
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })
    $(".fip-create #annualIncome").change(function () {
        var beginDate = $(".fip-create #beginDate").val();
        var endDateStr = $(".fip-create #endDateStr").val();
        var annualIncome = $(".fip-create #annualIncome").val();
        if(beginDate.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            var formdata = {};
            formdata.beginDateStr = beginDate;
            formdata.endDateStr = endDateStr;
            formdata.annualIncome = annualIncome;

            console.log(beginDate, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/fip/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                dataType: "json",
                data:formdata,
                success: function (data) {
                    $('.fip-create #dueDesc').val(data.data.dueDesc);
                    $('.fip-create #incomeRate').val(data.data.incomeRate);
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    var DateDiff = function (sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
        var aDate, oDate1, oDate2, iDays
        aDate = sDate1.split("-")
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-18-2006格式
        aDate = sDate2.split("-")
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数
        return iDays
    }

    $('.fip-create #submitForm').on('click', function () {
        alert("提交");
        var product = {};
        product.name = $(".fip-create #name").val();
        product.contractNo = $(".fip-create #contractNo").val();
        product.categoryDesc = $(".fip-create #categoryDesc").val();
        product.refundType = $(".fip-create #refundType").val();
        product.introduction = $(".fip-create #introduction").val();
        product.description = $(".fip-create #description").val();
        product.buyHint = $(".fip-create #buyHint").val();
        product.beginBanner = $(".fip-create #beginBanner").val();
        product.endBanner = $(".fip-create #endBanner").val();
        product.minBuyAmount = $(".fip-create #minBuyAmount").val();
        product.maxBuyAmount = $(".fip-create #maxBuyAmount").val();
        product.buyStepAmount = $(".fip-create #buyStepAmount").val();
        product.beginDateStr = $(".fip-create #beginDate").val();
        product.endDateStr = $(".fip-create #endDateStr").val();
        product.dueDesc = $(".fip-create #dueDesc").val();
        product.basicNo = $(".fip-create #basicNo").val();
        product.annualIncome = $(".fip-create #annualIncome").val();
        product.incomeRate = $(".fip-create #incomeRate").val();
        $('.fip-create input[name="riskInvestType"]:checked').each(function () {
            product.riskInvestType = $(this).val();
        });
        product.groupLimit = $(".fip-create #groupLimit").val();
        product.amount = $(".fip-create #amount").val();
        product.showTimeStr = $(".fip-create #showTimeStr").val();
        product.buyBeginTimeStr = $(".fip-create #buyBeginTimeStr").val();
        product.buyEndTimeStr = $(".fip-create #buyEndTimeStr").val();
        product.ruleList = [];
        $('.fip-create #muji .post').each(function (item) {
            var item = {};
            item.beginDateStr = $(this).find("[name='beginDateStr']").val();
            item.currentAmount = $(this).find("[name='currentAmount']").val();
            item.isAppOpen = $(this).find("[name='openway2']").prop("checked") ? "true" : "false";
            item.isWebOpen = $(this).find("[name='openway1']").prop("checked") ? "true" : "false";
            product.ruleList.push(item);
        })

        $.ajax({
            type: 'POST',
            url: '/support/fip/create',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify(product),
            success: function (data) {
                console.log(data);
                if(data.errCode === "00000") {
                    alert("上传成功");
                    location.href = "/support/fip/list";
                } else {
                    alert("上传失败: "+data.errMsg);
                }

            },
            error: function (data) {
                alert("异常！"+data.errMsg);
            }
        })
    })

    $('.fip-create #submitUpdateForm').on('click', function () {
        alert("提交修改");
        var product = {};
        product.id= $(".fip-create #fipId").val();
        product.name = $(".fip-create #name").val();
        product.contractNo = $(".fip-create #contractNo").val();
        product.categoryDesc = $(".fip-create #categoryDesc").val();
        product.refundType = $(".fip-create #refundType").val();
        product.introduction = $(".fip-create #introduction").val();
        product.description = $(".fip-create #description").val();
        product.buyHint = $(".fip-create #buyHint").val();
        product.beginBanner = $(".fip-create #beginBanner").val();
        product.endBanner = $(".fip-create #endBanner").val();
        product.minBuyAmount = $(".fip-create #minBuyAmount").val();
        product.maxBuyAmount = $(".fip-create #maxBuyAmount").val();
        product.buyStepAmount = $(".fip-create #buyStepAmount").val();
        product.beginDateStr = $(".fip-create #beginDate").val();
        product.endDateStr = $(".fip-create #endDateStr").val();
        product.dueDesc = $(".fip-create #dueDesc").val();
        product.basicNo = $(".fip-create #basicNo").val();
        product.annualIncome = $(".fip-create #annualIncome").val();
        product.incomeRate = $(".fip-create #incomeRate").val();
        $('.fip-create input[name="riskInvestType"]:checked').each(function () {
            product.riskInvestType = $(this).val();
        });
        product.groupLimit = $(".fip-create #groupLimit").val();
        product.amount = $(".fip-create #amount").val();
        product.showTimeStr = $(".fip-create #showTimeStr").val();
        product.buyBeginTimeStr = $(".fip-create #buyBeginTimeStr").val();
        product.buyEndTimeStr = $(".fip-create #buyEndTimeStr").val();
        product.ruleList = [];
        $('.fip-create #muji .post').each(function (item) {
            var item = {};
            item.beginDateStr = $(this).find("[name='beginDateStr']").val();
            item.currentAmount = $(this).find("[name='currentAmount']").val();
            item.isAppOpen = $(this).find("[name='openway2']").prop("checked") ? "true" : "false";
            item.isWebOpen = $(this).find("[name='openway1']").prop("checked") ? "true" : "false";
            product.ruleList.push(item);
        })

        $.ajax({
            type: 'POST',
            url: '/support/fip/edit',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify(product),
            success: function (data) {
                console.log(data);
                if(data.errCode === "00000") {
                    alert("上传成功");
                    location.href = "/support/fip/list";
                } else {
                    alert("上传失败: "+data.errMsg);
                }
            },
            error: function (data) {
                alert("异常！"+data.errMsg);
            }
        })
    })
    $('.fip-create #nextOne').on('click', function () {
        $('.fip-create #tab1').attr("class", "");
        $('.fip-create #baseinfo').attr("class", "tab-pane") ;

        $('.fip-create #tab2').attr("class",  "active");
        $('.fip-create #sendinfo').attr("class", "tab-pane active");

        $('.fip-create #tab3').attr("class", "");
        $('.fip-create #mujiinfo').attr("class", "tab-pane") ;
    })


    $('.fip-create #nextTwo').on('click', function () {
        $('.fip-create #tab1').attr("class", "");
        $('.fip-create #baseinfo').attr("class", "tab-pane") ;

        $('.fip-create #tab2').attr("class",  "");
        $('.fip-create #sendinfo').attr("class", "tab-pane");

        $('.fip-create #tab3').attr("class",  "active");
        $('.fip-create #mujiinfo').attr("class", "tab-pane active");

    })

    var n = 1;
    $('.fip-create #addFipBtn').click(function () {
        $(".fip-create #muji").append('<div class="post" id="post' + n + '"><div id="addFipTime">' +
            '<p><span class="badge" contenteditable="true">' + n + '</span></p>' +
            '<div class="form-group ">' +
            '<div class="row">' +
            '<div class="col-xs-6">' +
            '<label for="sale_time" class="col-xs-3 control-label">开售时间</label>' +
            '<div class="col-sm-8">' +
            '<input type="datetime" class="form-control date-picker"  id="beginDateStr" name="beginDateStr" >' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-6">' +
            '<label for="sale_money" class="col-xs-3 control-label">开放金额</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="sale_money" name="currentAmount">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            '<div class="row">' +
            '<div class="col-xs-6">' +
            '<label class="col-sm-2 control-label">开放渠道</label>' +
            '<div class="col-sm-10">' +
            '<label class="checkbox-inline">' +
            '<input type="checkbox" name="openway1" value="web"> Web </label>' +
            '<label class="checkbox-inline">' +
            '<input type="checkbox" name="openway2" value="app"> App ' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="col-lg-offset-10 col-xs-1" name="' + n + '">' +
            '<input type="button" class="btn btn-danger" id="deleteFip" name="post' + n + '" value="删除">'+
            '</div>' +
            '</div>' +
            '</div></div></div>');
        n++;
        $('.date-picker').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    })

    $('.fip-create').delegate('#deleteFip', "click", function () {
        var id = $(this).attr("name");
        $("#"+id).remove();
    })

    $('.fip-create').delegate('#deleteFip', "click", function () {
        var id = $(this).attr("name");
        $("#"+id).remove();
    });



//    修改产品权限
    $(".fip-create #btn-add-tag").click(function() {
        console.log("添加按钮");
        var tagId = $(this).attr("data-tag-id");
        var fipId = $(".fip-create #input-fip-id").val();
        var data = {tagId: tagId};
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url:"/support/fip/"+fipId+"/tag",
            data: JSON.stringify(data),
            type: "post",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });

    $(".fip-create #btn-delete-tag").click(function() {
        var tagId = $(this).attr("data-tag-id");
        var fipId = $(".fip-create #input-fip-id").val();
        $.ajax({
            headers: {
                'Accept': 'application/json'
            },
            url:"/support/fip/"+fipId+"/tag/"+tagId,
            type: "delete",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });

    $(".fip-create #btn-confirm").click(function(){
        var fipId = $(".fip-create #input-fip-id").val();
        var phoneErrorMsg = $(".fip-create #phone-error-msg").val();
        var webErrorMsg = $(".fip-create #web-error-msg").val();

        var data = {phoneErrorMsg: phoneErrorMsg, webErrorMsg:webErrorMsg};
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(data),
            url:"/support/fip/"+fipId+"/errorMsg",
            type: "put",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });

}
fipcreate.init();
module.exports = fipcreate;
},{}],18:[function(require,module,exports){
/**
 * Created by marksu on 15/9/25.
 */
var fipInfo = {};
fipInfo.init = function(){
    $(".fip-info [name='begin_date']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".fip-info [name='end_date']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".fip-info [name='buy_begin_time']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".fip-info [name='buy_end_time']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    //$("[name='buyEndTimeStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //$("[name='buyBeginTimeStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //$(" [name='showTimeStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //$(" [name='endDateStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //$(" [name='beginDateStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //

    $(".fip-info #fip-info-submit").click(function(){
        var postData = {
            id: $(".fip-info input[name='id']").val(),
            name: $(".fip-info [name='name']").val(),
            minBuyAmount: $(".fip-info [name='min_buy_amount']").val(),
            maxBuyAmount: $(".fip-info [name='max_buy_amount']").val(),
            buyStepAmount: $(".fip-info [name='buy_step_amount']").val(),
            amount: $(".fip-info [name='amount']").val(),
            beginDateStr: $(".fip-info [name='begin_date']").val() + ":00",
            endDateStr: $(".fip-info [name='end_date']").val() + ":00",
            appId: $(".fip-info [name='app_id']").val(),
            signType: $(".fip-info [name='sign_type']").val(),
            groupLimit: $(".fip-info [name='group_limit']").val(),
            annualIncome: $(".fip-info [name='annual_income']").val(),
            incomeRate: $(".fip-info [name='income_rate']").val(),
            dueDesc: $(".fip-info [name='due_desc']").val(),
            dueDescUnit: $(".fip-info [name='due_desc_unit']").val(),
            keyword: $(".fip-info [name='keyword']").val(),
            charge: $(".fip-info [name='charge']").val(),
            riskInvestType: $(".fip-info [name='risk_invest_type']:checked").val(),
            description: $(".fip-info [name='description']").val(),
            refundType: $(".fip-info [name='refund_type']").val(),
            amountDesc: $(".fip-info [name='amount_desc']").val(),
            phase: $(".fip-info [name='phase']").val(),
            categoryDesc: $(".fip-info [name='category_desc']").val(),
            introduction: $(".fip-info [name='introduction']").val(),
            buyHint: $(".fip-info [name='buy_hint']").val(),
            qa: $(".fip-info [name='qa']").val(),
            totalAmount: $(".fip-info [name='total_amount']").val(),
            buyBeginTimeStr: $(".fip-info [name='buy_begin_time']").val() + ":00",
            buyEndTimeStr: $(".fip-info [name='buy_end_time']").val() + ":00"
        };

        $.ajax({
            jsonp: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/fip/handle_info",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $(".fip-info #fip-info-submit").attr('disabled', 'disabled');
            },
            complete: function() {
                $(".fip-info #fip-info-submit").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    alert("修改成功！");
                    location.reload();
                } else {
                    alert("修改失败，原因：" + data.errMsg);
                }
            }

        });
    });
};
fipInfo.init();
module.exports = fipInfo;
},{}],19:[function(require,module,exports){
/**
 * Created by marksu on 15/9/23.
 */
var fipList = {};
fipList.init = function() {};
fipList.init();
module.exports = fipList;
},{}],20:[function(require,module,exports){
var fipOperation = {};
fipOperation.init = function(){
    $('.fip-operation #opt_submit_btn').on('click', function(){
        $(this).attr('disabled', true);

        var postData = {
            fipId: $(".fip-operation input[name='fip_id']").val(),
            typeId: $(".fip-operation [name='type_id']").val()
        };

        $.ajax({
            jsonp: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/fip/operation",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $('.fip-operation #opt_submit_btn').attr('disabled', 'disabled');
            },
            complete: function() {
                $('.fip-operation #opt_submit_btn').removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    window.location.reload();
                    alert("执行成功！");
                } else {
                    alert("执行失败，原因：" + data.errMsg);
                    $('#opt_submit_btn').attr('disabled', false);
                }
            }
        });
    });
}
fipOperation.init();
module.exports = fipOperation;
},{}],21:[function(require,module,exports){

var fipredeem = {};
var wrap = $('.redeemClass');
fipredeem.init = function() {
//发送短信提醒
    $('.redeemClass #remindSms').on('click', function () {

        $('.redeemClass #remindSms').attr('disabled', 'disabled');
        $('.redeemClass #remindSmsStatus').html('<span style="color: red">正在处理请稍后...</span>');

        var fipId = $('.redeemClass #fipId').val();
        var fipInfoStatus = $('.redeemClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert("上传成功");
                } else{
                    alert("上传失败");
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data.errMsg);
            }
        })

    });

    //确认钱到账时间
    $('.redeemClass #confirmReceiveMoney').on('click', function () {

        $('.redeemClass #confirmReceiveMoney').attr('disabled', 'disabled');
        $('.redeemClass #confirmReceiveMoneyStatus').html('<span style="color: red">正在处理请稍后...</span>');

        var fipId = $('.redeemClass #fipId').val();
        var fipInfoStatus = $('.redeemClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert("成功");
                } else{
                    alert("失败"+data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data.errMsg);
            }
        })
    });

    //通知长城基金
    $('.redeemClass #informFund').on('click', function () {
        $('.redeemClass #informFund').attr('disabled', 'disabled');
        $('.redeemClass #informFundStatus').html('<span style="color: red">正在处理请稍后...</span>');

        var fipId = $('.redeemClass #fipId').val();
        var fipInfoStatus = $('.redeemClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert("成功");
                } else{
                    alert("失败"+data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data.errMsg);
            }
        })

    });

    //发起代客户购买
    $('.redeemClass #refund').on('click', function () {
        $('.redeemClass #refund').attr('disabled', 'disabled');
        $('.redeemClass #refundStatus').html('<span style="color: red">正在处理请稍后...</span>');


        var fipId = $('.redeemClass #fipId').val();
        var fipInfoStatus = $('.redeemClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert("成功");
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data.errMsg);
            }
        })
    })
    //发送到账短信
    $('.redeemClass #finalSms').on('click', function () {
        $('.redeemClass #finalSms').attr('disabled', 'disabled');
        $('.redeemClass #finalSmsStatus').html('<span style="color: red">正在处理请稍后...</span>');



        var fipId = $('.redeemClass #fipId').val();
        var fipInfoStatus = $('.redeemClass #fipInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/fip/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({fipId: fipId, fipInfoStatus: fipInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert("成功");
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    })

    $('.redeemClass #uploadFileId').on('click', function () {

        var formData = new FormData($('.redeemClass #uploadDetailForm')[0]);
        var fipId = $('.redeemClass #fipId').val();
        var url = "/support/fip/"+fipId+"/refundDetailFile";
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if(data.errCode == "00000") {
                    alert("上传成功");
                } else{
                    alert("上传失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("执行失败，原因：" + data.errMsg);
            }
        });
    })
}
fipredeem.init();
module.exports = fipredeem;

},{}],22:[function(require,module,exports){
/**
 * Created by hnzb on 16/3/18.
 */

var ritpbuy = {};
var wrap = $('.trust-buy');
ritpbuy.init = function() {
    wrap.find('input[name="syncTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
//通知
    $('.trust-buy #inform').on('click', function () {
        $('.trust-buy #inform').attr('disabled', 'disabled');
        $('.trust-buy #informStatus').html('<span >正在处理请稍后...</span>');

        var ritpId = $('.trust-buy #ritpId').val();
        var ritpInfoStatus = $('.trust-buy #ritpInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    //发起非交易过户
    $('.trust-buy #payId').on('click', function () {
        $('.trust-buy #payId').attr('disabled', 'disabled');
        $('.trust-buy #payIdStatus').html('<span >正在处理请稍后...</span>');

        var ritpId = $('.trust-buy #ritpId').val();
        var ritpInfoStatus = $('.trust-buy #ritpInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    $('.trust-buy #certification').on('click', function () {
        $('.trust-buy #certification').attr('disabled', 'disabled');
        $('.trust-buy #certificationStatus').html('<span >正在处理请稍后...</span>');

        var ritpId = $('.trust-buy #ritpId').val();
        var ritpInfoStatus = $('.trust-buy #ritpInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    //发送购买成功短信
    $('.trust-buy #smsId').on('click', function () {
        $('.trust-buy #smsId').attr('disabled', 'disabled');
        $('.trust-buy #smsIdStatus').html('<span >正在处理请稍后...</span>');

        var ritpId = $('.trust-buy #ritpId').val();
        var ritpInfoStatus = $('.trust-buy #ritpInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    $('.trust-buy #generatorId').on('click', function () {

        $('.trust-buy #generatorId').attr('disabled', 'disabled');
        $('.trust-buy #generatorIdStatus').html('<span >正在处理请稍后...</span>');

        var ritpId = $('.trust-buy #ritpId').val();
        var ritpInfoStatus = $('.trust-buy #ritpInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });
    $('.trust-buy #syncFile').on('click', function () {
        var syncTime = $('.trust-buy #syncTime').val();
        if(syncTime=="" || syncTime.length ==0) {
            alert("同步时间不能为空");
            return;
        }
        $('.trust-buy #syncFile').attr('disabled', 'disabled');
        $('.trust-buy #syncFileStatus').html('<span >正在处理请稍后...</span>');

        var ritpId = $('.trust-buy #ritpId').val();
        var ritpInfoStatus = $('.trust-buy #ritpInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpInfoStatus ,syncTime:syncTime}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败:"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });
    $('.trust-buy #sendFile').on('click', function () {

        $('.trust-buy #sendFile').attr('disabled', 'disabled');
        $('.trust-buy #sendFileStatus').html('<span >正在处理请稍后...</span>');

        var ritpId = $('.trust-buy #ritpId').val();
        var ritpInfoStatus = $('.trust-buy #ritpInfoStatus').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/operation',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpInfoStatus}),
            success: function (data) {
                if(data.errCode == "00000") {
                    alert(data.errMsg);
                } else{
                    alert("失败:"+ data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });
}
ritpbuy.init();
module.exports = ritpbuy;
},{}],23:[function(require,module,exports){
/**
 * Created by hnzb on 16/3/4.
 */

var ritpConfirm = {};
var wrap = $('.ritp-confirm');
ritpConfirm.init = function() {
    $('.ritp-confirm #del').click(function () {
        var id = $(this).attr("name");
        var name = $('.ritp-confirm #'+id).attr("name");
        if(confirm("您正在删除客户"+name+"的预约,删除预约之后,用户该笔预约将失效,可能导致产品不能达到募集金额,请您再次确认")){
            $.ajax({
                type: 'GET',
                url: '/support/ritp/deleteAppointment?transactionalId='+id,
            }).done(function (response) {
                location.reload();
            })

        }
    })
}
ritpConfirm.init();
module.exports = ritpConfirm;

},{}],24:[function(require,module,exports){
var ritpcreate = {};
var wrap = $('.ritp-create');
ritpcreate.init = function() {

    wrap.find('input[name="expectBeginDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="expectEndDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="displayTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="raiseBeginTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="raiseEndTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    $('.ritp-create #nextOne').on('click', function () {
        $('.ritp-create #tab1').attr("class", "");
        $('.ritp-create #baseinfo').attr("class", "tab-pane") ;

        $('.ritp-create #tab2').attr("class",  "active");
        $('.ritp-create #sendinfo').attr("class", "tab-pane active");

    })

    $('.ritp-create #totalAmount').on('change',  function () {
        var totalAmount = $('.ritp-create #totalAmount').val();
        if(totalAmount%3000000 == 1000000) {
            if((totalAmount - 1*4000000)/3000000 < 0) {
                alert("请检查总金额是否正确")
            } else {
                $('.ritp-create #threeAmount').val((totalAmount - 1*4000000)/3000000);
                $('.ritp-create #fourAmount').val(1);
            }
        } else if(totalAmount%3000000 == 2000000){
            $('.ritp-create #threeAmount').val((totalAmount - 2*4000000)/3000000);
            $('.ritp-create #fourAmount').val(2);
        } else if(totalAmount%3000000 == 0){
            $('.ritp-create #threeAmount').val(totalAmount/3000000);
            $('.ritp-create #fourAmount').val(0);
        } else {
            alert('请检查总金额是否正确');
        }
    })

    //上传及下载banner图
    $('.ritp-create #beginBannerBtn').on('click', function () {
        var formData = new FormData($('.ritp-create #formBegin')[0]);
        $.ajax({
            url: '/support/ritp/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.ritp-create #beginBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })
    $('.ritp-create #endBannerBtn').on('click', function () {
        var formData = new FormData($('.ritp-create #formEnd')[0]);
        $.ajax({
            url: '/support/ritp/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.ritp-create #endBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })

//计算时长和年化收益率
    $(".ritp-create #expectBeginDate").change(function () {
        var beginDateStr = $(".ritp-create #expectBeginDate").val();
        var endDateStr = $(".ritp-create #expectEndDate").val();
        var annualIncome = $(".ritp-create #expectedAnnualYield").val();
        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-create #ritpOften').val(data.data.dueDesc);
                        $('.ritp-create #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    $(".ritp-create #expectEndDate").change(function () {
        var beginDateStr = $(".ritp-create #expectBeginDate").val();
        var endDateStr = $(".ritp-create #expectEndDate").val();
        var annualIncome = $(".ritp-create #expectedAnnualYield").val();

        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-create #ritpOften').val(data.data.dueDesc);
                        $('.ritp-create #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    $(".ritp-create #expectedAnnualYield").change(function () {
        var beginDateStr = $(".ritp-create #expectBeginDate").val();
        var endDateStr = $(".ritp-create #expectEndDate").val();
        var annualIncome = $(".ritp-create #expectedAnnualYield").val();

        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-create #ritpOften').val(data.data.dueDesc);
                        $('.ritp-create #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    //提交数据
    $('.ritp-create #submitData').on('click', function () {
        alert("提交数据");
        var ritp = {};
        var bool = true;
        ritp.ritpSummaryList = [];
        ritp.ritpSplitList = [];
        ritp.name = $('.ritp-create #name').val();
        ritp.fundCode = $('.ritp-create #fundCode').val();
        ritp.unit = $('.ritp-create #ritpUnit').val();
        ritp.beginDate = $('.ritp-create #expectBeginDate').val();
        ritp.endDate = $('.ritp-create #expectEndDate').val();
        ritp.annualIncome = $('.ritp-create #expectedAnnualYield').val();
        ritp.incomeRate = $('.ritp-create #effectiveYield').val();
        ritp.amount = $('.ritp-create #totalAmount').val();
        ritp.showTime = $('.ritp-create #displayTime').val();
        ritp.buyBeginTime = $('.ritp-create #raiseBeginTime').val();
        ritp.buyEndTime = $('.ritp-create #raiseEndTime').val();
        ritp.refundType = $('.ritp-create #ritpRefundType').val();
        ritp.beginBanner = $('.ritp-create #beginBanner').val();
        ritp.duraDays = $('.ritp-create #ritpOften').val();
        ritp.due = $('.ritp-create #showTime').val();
        ritp.dueUnit = $('.ritp-create #due_unit').val();
        ritp.dueHint = $('.ritp-create #showTimeIndroduction').val();
        ritp.referralNumber =$('.ritp-create #ritpRecommendNo').val();
        ritp.endBanner = $('.ritp-create #endBanner').val();
        ritp.referralTitle = $('.ritp-create #ritpReferralTitle').val();

        var threeSplit = {};
        var fourSplit = {};
        threeSplit.num = $('.ritp-create #threeAmount').val();
        threeSplit.amount = 3000000;
        fourSplit.num = $('.ritp-create #fourAmount').val();
        fourSplit.amount = 4000000;
        ritp.ritpSplitList.push(threeSplit);
        ritp.ritpSplitList.push(fourSplit);
        $('.ritp-create table tbody tr').each(function (item) {
            var eachSummary = {};
            eachSummary.title = $(this).find("input").val();
            eachSummary.content = $(this).find("textarea").val();
            ritp.ritpSummaryList.push(eachSummary);
        })

        for(var key in ritp) {
            if(key != "endBanner") {
                if(ritp[key] == null || ritp[key] == "" ||ritp[key].length == 0) {
                    bool = false;
                    break;
                }
            }
        }

        if(!bool) {
            alert("所有字段不能为空,请检查是否有没填字段");
        } else {
            $.ajax({
                type: 'POST',
                url: '/support/ritp/create',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: JSON.stringify(ritp),
                success: function (data) {
                    if(data.errCode === "00000") {
                        alert("创建成功");
                        location.href = "/support/ritp/list";
                    } else {
                        alert("创建失败: 请检查所填写的参数是否有误");
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }

    })

    var i = 1;
    $('.ritp-create #addTr').click(function () {

        var html = '<tr id="del'+i+'">' +
            ' <td><input type="text" class="title"  id="title" name="title"></td>'+
            ' <td> <textarea rows="5" id="content" name="content" class="form-control" ></textarea></td>'+
            '<td style="text-align:center;"><button type="button" class="btn btn-danger btn-xs" id="delete" name="del'+i+'">删除</button></td>'+
            '</tr>';
        $('.ritp-create .canAddTr').append(html);
        i++;
    })

    $('.ritp-create').delegate('#delete', "click", function () {
        var id = $(this).attr("name");
        $("#"+id).remove();
    })


}
ritpcreate.init();
module.exports = ritpcreate;

},{}],25:[function(require,module,exports){
var riptedit = {};
var wrap = $('.ritp-edit');
riptedit.init = function() {

    wrap.find('input[name="expectBeginDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="expectEndDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="displayTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="raiseBeginTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="raiseEndTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    $('.ritp-edit #nextOne').on('click', function () {
        $('.ritp-edit #tab1').attr("class", "");
        $('.ritp-edit #baseinfo').attr("class", "tab-pane") ;

        $('.ritp-edit #tab2').attr("class",  "active");
        $('.ritp-edit #sendinfo').attr("class", "tab-pane active");

    })

    $('.ritp-edit #totalAmount').on('change',  function () {
        var totalAmount = $('.ritp-edit #totalAmount').val();
        var threeAmount = $('.ritp-edit #three').text();
        var fourAmount = $('.ritp-edit #four').text();
        if((totalAmount%threeAmount) == (threeAmount/3)) {
            $('.ritp-edit #threeAmount').val((totalAmount - 1*fourAmount)/threeAmount);
            $('.ritp-edit #fourAmount').val(1);
        } else if(totalAmount%threeAmount == (threeAmount/3*2)){
            $('.ritp-edit #threeAmount').val((totalAmount - 2*fourAmount)/threeAmount);
            $('.ritp-edit #fourAmount').val(2);
        } else if(totalAmount%threeAmount == 0){
            $('.ritp-edit #threeAmount').val(totalAmount/threeAmount);
            $('.ritp-edit #fourAmount').val(0);
        } else {
            alert('请检查总金额是否正确');
        }
    })

    //上传及下载banner图
    $('.ritp-edit #beginBannerBtn').on('click', function () {
        var formData = new FormData($('.ritp-edit #formBegin')[0]);
        $.ajax({
            url: '/support/ritp/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.ritp-edit #beginBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })
    $('.ritp-edit #endBannerBtn').on('click', function () {
        var formData = new FormData($('.ritp-edit #formEnd')[0]);
        $.ajax({
            url: '/support/ritp/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.ritp-edit #endBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })

//计算时长和年化收益率
    $(".ritp-edit #expectBeginDate").change(function () {
        var beginDateStr = $(".ritp-edit #expectBeginDate").val();
        var endDateStr = $(".ritp-edit #expectEndDate").val();
        var annualIncome = $(".ritp-edit #expectedAnnualYield").val();
        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-edit #ritpOften').val(data.data.dueDesc);
                        $('.ritp-edit #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    $(".ritp-edit #expectEndDate").change(function () {
        var beginDateStr = $(".ritp-edit #expectBeginDate").val();
        var endDateStr = $(".ritp-edit #expectEndDate").val();
        var annualIncome = $(".ritp-edit #expectedAnnualYield").val();

        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-edit #ritpOften').val(data.data.dueDesc);
                        $('.ritp-edit #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    $(".ritp-edit #expectedAnnualYield").change(function () {
        var beginDateStr = $(".ritp-edit #expectBeginDate").val();
        var endDateStr = $(".ritp-edit #expectEndDate").val();
        var annualIncome = $(".ritp-edit #expectedAnnualYield").val();

        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-edit #ritpOften').val(data.data.dueDesc);
                        $('.ritp-edit #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })
    //提交数据
    $('.ritp-edit #submitData').on('click', function () {
        alert("提交数据");
        var ritp = {};
        var bool = true;
        ritp.ritpSummaryList = [];
        ritp.ritpSplitList = [];
        ritp.id = $('.ritp-edit #ritpId').val();
        ritp.name = $('.ritp-edit #name').val();
        ritp.fundCode = $('.ritp-edit #fundCode').val();
        ritp.unit = $('.ritp-edit #ritpUnit').val();
        ritp.beginDate = $('.ritp-edit #expectBeginDate').val();
        ritp.endDate = $('.ritp-edit #expectEndDate').val();
        ritp.annualIncome = $('.ritp-edit #expectedAnnualYield').val();
        ritp.incomeRate = $('.ritp-edit #effectiveYield').val();
        ritp.amount = $('.ritp-edit #totalAmount').val();
        ritp.showTime = $('.ritp-edit #displayTime').val();
        ritp.buyBeginTime = $('.ritp-edit #raiseBeginTime').val();
        ritp.buyEndTime = $('.ritp-edit #raiseEndTime').val();
        ritp.refundType = $('.ritp-edit #ritpRefundType').val();
        ritp.beginBanner = $('.ritp-edit #beginBanner').val();
        ritp.endBanner = $('.ritp-edit #endBanner').val();
        ritp.duraDays = $('.ritp-edit #ritpOften').val();
        ritp.due = $('.ritp-edit #showTime').val();
        ritp.dueUnit = $('.ritp-edit #due_unit').val();
        ritp.dueHint = $('.ritp-edit #showTimeIndroduction').val();
        ritp.referralNumber =$('.ritp-edit #ritpRecommendNo').val();
        ritp.referralTitle = $('.ritp-edit #ritpReferralTitle').val();


        var threeSplit = {};
        var fourSplit = {};
        threeSplit.num = $('.ritp-edit #threeAmount').val();
        threeSplit.amount = $('.ritp-edit #three').text();
        fourSplit.num = $('.ritp-edit #fourAmount').val();
        fourSplit.amount =  $('.ritp-edit #four').text();
        ritp.ritpSplitList.push(threeSplit);
        ritp.ritpSplitList.push(fourSplit);
        $('.ritp-edit table tbody tr').each(function (item) {
            var eachSummary = {};
            eachSummary.title = $(this).find("input").val();
            eachSummary.content = $(this).find("textarea").val();
            ritp.ritpSummaryList.push(eachSummary);
        })
        for(var key in ritp) {
            if(key != "endBanner") {
                if(ritp[key] == null || ritp[key] == "" ||ritp[key].length == 0) {
                    bool = false;
                    break;
                }
            }
        }

        if(!bool) {
            alert("所有字段不能为空,请检查是否有没填字段");
        } else {
            $.ajax({
                type: 'POST',
                url: '/support/ritp/edit',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: JSON.stringify(ritp),
                success: function (data) {
                    if(data.errCode === "00000") {
                        alert("修改成功");
                        location.href = "/support/ritp/list";
                    } else {
                        alert("修改失败: 请检查所填写的参数是否有误");
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    var i = 1;
    $('.ritp-edit #addTr').click(function () {
        var html = '<tr id="del'+i+'">' +
            ' <td><input type="text" class="title"  id="title" name="title"></td>'+
            ' <td> <textarea rows="5" id="content" name="content" class="form-control" ></textarea></td>'+
            '<td style="text-align:center;"><button type="button" class="btn btn-danger btn-xs" id="delete" name="del'+i+'">删除</button></td>'+
            '</tr>';
        $('.ritp-edit .canAddTr').append(html);
        i++;
    })

    $('.ritp-edit').delegate('#delete', "click", function () {
        var id = $(this).attr("name");
        $("#"+id).remove();
    })
}
riptedit.init();
module.exports = riptedit;

},{}],26:[function(require,module,exports){
/**
 * Created by hnzb on 16/3/23.
 */
var ritpMore = {};
var wrap = $('.ritp-more');
ritpMore.init = function() {
    wrap.find('input[name="flashTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //刷新
    $('.ritp-more #flash').click(function () {

        var flashTime =  $('.ritp-more #flashTime').val();
        if(flashTime == "" || flashTime.length == 0) {
            alert("时间不能为空");
            return;
        }
        var ritpId = $('.ritp-more #ritpId').val();
        $.ajax({
            type: 'GET',
            url: '/support/ritp/more/flash?id='+ritpId+'&date='+flashTime,
            success: function (data) {
                if(data.errCode == "00000") {
                    alert("成功");
                    location.reload();
                } else{
                    alert(data.errorMsg);
                }
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    })
    
    //每步具体操作
    $('.ritp-more #smsRemind').on('click', function () {
        $('.ritp-more #smsRemind').attr('disabled', 'disabled');
        $('.ritp-more #smsRemindStatus').html('<span>正在处理...</span>');

        var ritpId = $('.ritp-more #ritpId').val();
        var ritpStatus = $('.ritp-more #ritpStatus').val();
        var operationId = $('.ritp-more #operationId').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/dividentOrRedeem',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpStatus, operationId: operationId}),
            success: function (data) {
                if(data.errCode == "00000") {
                } else{
                    alert("失败:" + data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    $('.ritp-more #confirm').on('click', function () {
        $('.ritp-more #confirm').attr('disabled', 'disabled');
        $('.ritp-more #confirmStatus').html('<span>正在处理...</span>');

        var ritpId = $('.ritp-more #ritpId').val();
        var ritpStatus = $('.ritp-more #ritpStatus').val();
        var operationId = $('.ritp-more #operationId').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/dividentOrRedeem',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpStatus, operationId: operationId}),
            success: function (data) {
                if(data.errCode == "00000") {
                } else{
                    alert("失败:" + data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    $('.ritp-more #inform').on('click', function () {
        $('.ritp-more #inform').attr('disabled', 'disabled');
        $('.ritp-more #infromStatus').html('<span>正在处理...</span>');

        var ritpId = $('.ritp-more #ritpId').val();
        var ritpStatus = $('.ritp-more #ritpStatus').val();
        var operationId = $('.ritp-more #operationId').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/dividentOrRedeem',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpStatus, operationId: operationId}),
            success: function (data) {
                if(data.errCode == "00000") {
                } else{
                    alert("失败:" + data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });

    $('.ritp-more #buy').on('click', function () {
        $('.ritp-more #buy').attr('disabled', 'disabled');
        $('.ritp-more #buyStatus').html('<span>正在处理...</span>');

        var ritpId = $('.ritp-more #ritpId').val();
        var ritpStatus = $('.ritp-more #ritpStatus').val();
        var operationId = $('.ritp-more #operationId').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/dividentOrRedeem',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpStatus, operationId: operationId}),
            success: function (data) {
                if(data.errCode == "00000") {
                } else{
                    alert("失败:" + data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });


    $('.ritp-more #smsSuccess').on('click', function () {
        $('.ritp-more #smsSuccess').attr('disabled', 'disabled');
        $('.ritp-more #smsSuccessStatus').html('<span>正在处理...</span>');

        var ritpId = $('.ritp-more #ritpId').val();
        var ritpStatus = $('.ritp-more #ritpStatus').val();
        var operationId = $('.ritp-more #operationId').val();

        $.ajax({
            type: 'POST',
            url: '/support/ritp/dividentOrRedeem',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify({ritpId: ritpId, ritpInfoStatus: ritpStatus, operationId: operationId}),
            success: function (data) {
                if(data.errCode == "00000") {
                } else{
                    alert("失败:" + data.errMsg);
                }
                location.reload();
            },
            error: function (data) {
                alert("异常！"+data);
            }
        })
    });
}
ritpMore.init();
module.exports = ritpMore;

},{}],27:[function(require,module,exports){
/**
 * Created by marksu on 15/9/25.
 */
var fipRule = {};
fipRule.init = function(){
    $('.fip-rule input.date-picker').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $('.fip-rule .btn-submit').on('click', function() {
        var currentIndex = $(this).attr('data-index');
        var bDate = $(".fip-rule input[name='beginDate_" + currentIndex + "']").val() + ":00.0";
        var eDate = $(".fip-rule input[name='endDate_" + currentIndex + "']").val() + ":00.0";
        var amountValue = $(".fip-rule input[name='amount_" + currentIndex + "']").val();
        var totalAmountValue = $(".fip-rule input[name='totalAmount_" + currentIndex + "']").val();
        var typeValue = $(".fip-rule input[name='type_" + currentIndex + "']").val();
        var fipIdValue = $(".fip-rule input[name='fipId_" + currentIndex + "']").val();

        var postData = {
            beginDate: bDate,
            endDate: eDate,
            amount: amountValue,
            totalAmount: totalAmountValue,
            id: currentIndex,
            type: typeValue,
            fipId: fipIdValue
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/fip/handle_rule",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $('.fip-rule .btn-submit').attr('disabled', 'disabled');
            },
            complete: function() {
                $('.fip-rule .btn-submit').removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    alert("修改成功！");
                    location.reload();
                } else {
                    alert("修改失败，原因：" + data.errMsg);
                }
            }

        });
    });
};
fipRule.init();
module.exports = fipRule;
},{}],28:[function(require,module,exports){
var tagManage = {}

tagManage.init = function() {
    $(".czb-fip-tag-manage #btn-add-tag").click(function() {
        var tagId = $(this).attr("data-tag-id");
        var fipId = $(".czb-fip-tag-manage #input-fip-id").val();
        var data = {tagId: tagId};
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url:"/support/fip/"+fipId+"/tag",
            data: JSON.stringify(data),
            type: "post",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });

    $(".czb-fip-tag-manage #btn-delete-tag").click(function() {
        var tagId = $(this).attr("data-tag-id");
        var fipId = $(".czb-fip-tag-manage #input-fip-id").val();
        $.ajax({
            headers: {
                'Accept': 'application/json'
            },
            url:"/support/fip/"+fipId+"/tag/"+tagId,
            type: "delete",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });

    $(".czb-fip-tag-manage #btn-confirm").click(function(){
        var fipId = $(".czb-fip-tag-manage #input-fip-id").val();
        var phoneErrorMsg = $(".czb-fip-tag-manage #phone-error-msg").val();
        var webErrorMsg = $(".czb-fip-tag-manage #web-error-msg").val();

        var data = {phoneErrorMsg: phoneErrorMsg, webErrorMsg:webErrorMsg};
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(data),
            url:"/support/fip/"+fipId+"/errorMsg",
            type: "put",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });
};

tagManage.init();
module.exports = tagManage;
},{}],29:[function(require,module,exports){
/**
 * Created by marksu on 15/9/28.
 */
var importantInsert = {};
importantInsert.init = function(){
    $(".support-important [name='date']").datetimepicker({format: 'Y-m-d', autoclose: true,timepicker:false,});
    $(".support-important #important_addBtn").click(function () {
        var postData = {
            date: $(".support-important [name='date']").val(),
            type: 0 + parseInt($(".support-important [name='type']").val()),
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/important_date/insert",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $(".support-important #important_addBtn").attr('disabled', 'disabled');
            },
            complete: function() {
                $(".support-important #important_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    alert("添加成功！");
                    window.location.reload();
                } else {
                    alert("添加失败，原因：" + data.errMsg);
                }
            }

        });
    });
};
importantInsert.init();

module.exports = importantInsert;
},{}],30:[function(require,module,exports){
var pushMessage = {};
var wrap = $('.message-push');

pushMessage.init = function(){

    //是否可以取消判断
    //获取当前
    var nowTime=new Date().getTime();
    //获取发送时间
    $(".pullTime").each(function(){
        var sendDate=$(this).val();
        //获取发送时间
        var sendTime=new Date(sendDate).getTime();
        if(sendTime<=nowTime){
            //取消按钮不可用
            $(this).parent('td').parent('tr').find('.pullCancel').attr('disabled','disabled');
        }else{
            $(this).parent('td').parent('tr').find('.pullCancel').removeAttr('disabled');
        }
    });

    $(".message-push #message-send-time").datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    wrap.find('#actionType').on('change', function() {
        var selectEm = $(this);
        var tips = '';
        wrap.find('#actionValue').attr('placeholder', tips).val('');
        if ($(this).val() == 'embed') {
            wrap.find('#nativePages').parent().removeClass('hide');
            wrap.find('#actionValue').attr('readonly', true);
        } else if ($(this).val() == 'none') {
            wrap.find('#nativePages').parent().addClass('hide');
            wrap.find('#actionValue').attr('readonly', true);
        } else {
            wrap.find('#nativePages').parent().addClass('hide');
            wrap.find('#actionValue').removeAttr('readonly');
        }

    }).change();

    wrap.find('#nativePages').on('change', function() {
        var selectEm = $(this);
        var tips = (selectEm.find('option:selected').data('tips'));
        wrap.find('#actionValue').val(tips);
    })

    $(".message-push #push-form").validate({
        rules: {
            title: {
                required: true
            },
            content: {
                required: true
            },
            sendTime: {
                required: true
            },
            schema: {
                required: true
            },
            tagId: {
                required: true
            }
        }
        //submitHandler: function(form) {
        //    $(form).find("#pullSms").attr("disabled", true).text("提交中...");
        //    form.submit();
        //}
    });
};

pushMessage.subchange=function(){
    $('.message-push #push-form').submit(function() {
        $(":submit",this).attr("disabled","disabled").text("提交中...");
    });
}
pushMessage.messagePull = function(){
    $('#messagePull').on('click', function () {
        var $messageModal = $('div.messagePull-modal');
        $messageModal.modal();
    });

};
//取消
pushMessage.pullCancel=function(){
    $('.pullCancel').on('click', function () {
        //获取id
        var id=$('.pullId').val();
        //获取当前
        var nowTime=new Date().getTime();
        var flg=0;
        //获取发送时间
        var sendDate=$(this).parent('td').parent('tr').find('.pullTime').val();
        //获取发送时间
        var sendTime=new Date(sendDate).getTime();
        if(sendTime<=nowTime){
            //取消按钮不可用
            $(this).parent('td').parent('tr').find('.pullCancel').attr('disabled','disabled');
            alert("推送消息已发送，无法取消！");
        }else{
            $(this).parent('td').parent('tr').find('.pullCancel').removeAttr('disabled');
            flg=1;
        }
        if(flg){
            $.ajax({
                jsonp: false,
                url: "/support/message/pullCancel?id="+id,
                method: "post",
                dataType: "json",
                success:function(data) {
                    if (data.errCode == "00000") {
                        window.location.reload();
                    } else {
                        alert("取消操作失败，原因：" + data.errorMsg);
                    }
                }
            });
        }

    });
}
pushMessage.init();
pushMessage.messagePull();
pushMessage.subchange();
pushMessage.pullCancel();
module.exports = pushMessage;
},{}],31:[function(require,module,exports){
var sendSms = {};

sendSms.init = function(){
    //是否可以取消判断
    //获取当前
    var nowTime=new Date().getTime();
    //获取发送时间
    $(".smsTime").each(function(){
        var sendDate=$(this).val();
        //获取发送时间
        var sendTime=new Date(sendDate).getTime();
        if(sendTime<=nowTime){
            //取消按钮不可用
            $(this).parent('td').parent('tr').find('.smsCancel').attr('disabled','disabled');
        }else{
            $(this).parent('td').parent('tr').find('.smsCancel').removeAttr('disabled');
        }
    });

    //获取相差毫秒数

    $(".message-sms #message-send-time").datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    $(".message-sms #sms-form").validate({
        rules: {
            title: {
                required: true
            },
            content: {
                required: true
            },
            sendTime: {
                required: true
            },
            tagId: {
                required: true
            }
        }
        //submitHandler: function(form) {
        //    $(form).find("#messageSms").attr("disabled", true).text("提交中...");
        //    form.submit();
        //}
    });
};
var time = 2000;

function fun(){
    $(":submit").removeAttr("disabled").text("提交");
}
function run(){
    setTimeout(fun,time);
}
sendSms.subchange=function(){
    $('.message-sms #sms-form').submit(function() {
        var tagId=$('#message-sms-tag-id').val();
        var groupId=$('#message-group-id').val();
        if(groupId=='1'&&(tagId==null||tagId=='')){
            alert("请选择群组！！");
        }else{

            //半小时时间限制
            //发送时间
            var sendDate=$("#message-send-time").val();
            var sendTime=new Date(sendDate).getTime();
            //当前时间
            var nowTime=new Date().getTime();
            var time=(sendTime-nowTime);
            //获取相差的0.5小时数
            var h=parseInt(time/(1000*60*30));
            if(h<1){
                alert("发送时间,需设置为是当前时间30分钟以后！！");
                return false;
            }else{
                $(":submit",this).attr("disabled","disabled").text("提交中...");
                run();
            }

        }


    });
}
sendSms.messageCreate = function(){
    $('#messageCreate').on('click', function () {
        var $messageModal = $('div.message-modal');
        $messageModal.modal();
    });

};
sendSms.groupChange=function(){
    $('#message-group-id').change(function(){
        var group=$(this).children('option:selected').val();
        check(group);

    });
    }
sendSms.groupload=function(){
    var group=$('#message-group-id').children('option:selected').val();
    check(group);
}

function check(group){
    if(group==1){
        $('#message-sms-tag-id').show();
        $('#message-phone').hide();
    }else{
        $('#message-sms-tag-id').hide();
        $('#message-phone').show();
    }
}
//取消
sendSms.smsCancel=function(){
    $('.smsCancel').on('click', function () {
        //获取当前
        var nowTime=new Date().getTime();
        var flg=0;
        //获取发送时间
            var sendDate=$(this).parent('td').parent('tr').find('.smsTime').val();
            //获取发送时间
            var sendTime=new Date(sendDate).getTime();
            if(sendTime<=nowTime){
                //取消按钮不可用
                $(this).parent('td').parent('tr').find('.smsCancel').attr('disabled','disabled');
                alert("短信已发送，无法取消！");
            }else{
                $(this).parent('td').parent('tr').find('.smsCancel').removeAttr('disabled');
                flg=1;
            }

        if(flg){
            //获取id
            var id=$('.smsId').val();

            $.ajax({
                jsonp: false,
                url: "/support/message/smsCancel?id="+id,
                method: "post",
                dataType: "json",
                success:function(data) {
                    if (data.errCode == "00000") {
                        window.location.reload();
                    } else {
                        alert("取消操作失败，原因：" + data.errorMsg);
                    }
                }
            });
        }
});
}
sendSms.init();
sendSms.messageCreate();
sendSms.subchange();
sendSms.groupChange();
sendSms.groupload();
sendSms.smsCancel();
module.exports = sendSms;
},{}],32:[function(require,module,exports){
if ($('#funcTree').length > 0) {
    var func = {};

    /*
     * 调整包含树的容器的高度.
     */
    func.adjustHeight = function () {
        var ph = document.body.clientHeight;

        var $tc = $('.tree-container');
        var $footer = $('.page-footer');
        var fh = 0;
        if ($footer.length) {
            fh = $footer.outerHeight();
        }
        //if($('#form1').length>0){
            //if ($tc.size() > 0) {
            //    var th = ph - $tc.offset().top - fh - 38;
            //    $tc.height(th);
            //}
            $tc.height(2000);
        //}else{
        //    if ($tc.size() > 0) {
        //        var th = ph - $tc.offset().top +50;
        //        $tc.height(th);
        //    }
        //}

    };
    //func.message=function(){
    //    var message=$('.shiro_function #message').val();
    //    if(message!=null&&message!="undefined"&&message!=""){
    //        $('#content').append('<p>'+message+'</p>');
    //        $('#modal1').openModal();
    //    }
    //}

    /*
     * 初始化zTree.
     * @tid zTree的实例容器#id
     * @opt Ztree设置项.
     */
    func.initTree = function (tid, opt) {
        //$.fn.zTree.destroy(tid);
        return $.fn.zTree.init($('#' + tid), opt);
    };

    func.delFunction = function (id, name) {
        $('#content').children('p').remove();
        var $form = $('#delAgree');
        $form.attr('href', '/support/shiro/func/delete/' + id);
        $('#content').append('<p>你确定要删除此功能吗?</p>');

        $('#modal1').openModal();
    };

    func.init = function () {
        //左侧菜单高亮显示

        func.adjustHeight();

        /************************ 配置功能树 ************************/
        var settings = new TreeSetting('/support/shiro/func/tree');
        $.extend(true, settings, {
            view: {
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
            edit: {
                enable: true,
                editNameSelectAll: true,
                removeTitle: '删除',
                renameTitle: '编辑',
                showRemoveBtn: function (treeId, treeNode) {
                    return !treeNode.isParent;
                },
                showRenameBtn: function (treeId, treeNode) {
                    return false;
                },
                drag: {
                    isCopy: false
                }
            },

            async: {
                dataFilter: dataFilter
                , autoParam: ["id=pid"]
            },

            callback: {
                onAsyncSuccess: onAsyncSuccess
                , onClick: onClick
                , beforeRemove: beforeRemove
                , onDrop: onDrop
            }
        });


        function dataFilter(treeId, parentNode, childNodes) {

            if (!childNodes) return null;
            for (var i = 0, l = childNodes.length; i < l; i++) {
                if (childNodes[i].id == '0') {
                    //修改根节点的样式
                    childNodes[i].iconSkin = 'root';
                }
            }
            return childNodes;


        }

        var asynCount = 0, asyncRoot = true;

        function onAsyncSuccess(event, treeId, treeNode, msg) {
            if (asyncRoot) {
                asyncRoot = false;
            } else {
                asynCount--;
            }
            if (!!treeNode) {
                asyncNodes(treeNode.children);
            } else {
                asyncNodes(funcTree.getNodes());
            }
        }

        function onClick(event, treeId, treeNode, clickFlag) {
            loadForm(treeNode, false);
        }

        function beforeRemove(treeId, treeNode) {
            func.delFunction(treeNode.id, treeNode.name);
            return false;
        }

        function loadForm(treeNode, addFlag) {
            $('#func-form').empty();

            var url = '/support/shiro/func/form?plain';
            if (addFlag)
                $('#func-form').load(url, {pId: treeNode.id});
            else
                $('#func-form').load(url, {id: treeNode.id});
        }

        function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
            var node = treeNodes[0];
            var pId = node.pId;
            var seqNum = node.data.seqNum;

            if (moveType == 'inner') {
                pId = targetNode.id;
            } else if (moveType == 'prev' || moveType == 'next') {
                pId = targetNode.pId;
                seqNum = moveType == 'prev' ? targetNode.data.seqNum - 1 : targetNode.data.seqNum + 1;
            }

            if (pId != node.pId || seqNum != node.seqNum) {
                $.post("/support/shiro/func/change", {id: node.id, pId: pId, seqNum: seqNum}, function (data) {
                    common.log(data);
                });
            }
        }

        /*
         * 异步加载并展开子节点.
         */
        function asyncNodes(nodes) {
            if (!nodes) return;
            var zTree = funcTree;
            for (var i = 0, l = nodes.length; i < l; i++) {
                if (nodes[i].isParent && nodes[i].zAsync) {
                    asyncNodes(nodes[i].children);
                } else {
                    if (nodes[i].level < 99 && nodes[i].isParent) {
                        asynCount++;
                        zTree.reAsyncChildNodes(nodes[i], "refresh", false);
                    }
                }
            }
        }

        //----------- 添加自定义的编辑按钮 ----------
        function addHoverDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
            var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                + "' title='添加' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_" + treeNode.tId);
            if (btn) btn.bind("click", function () {
                loadForm(treeNode, true);
                return false;
            });
        };

        function removeHoverDom(treeId, treeNode) {
            $("#addBtn_" + treeNode.tId).unbind().remove();
        };
        //----------- /添加自定义的编辑按钮 ----------

        /************************ 配置功能树 end ************************/

        //初始化zTree
        var funcTree = func.initTree('funcTree', settings);

    }
    $('.tree-container').ready(function(){
        func.init();
    });
    //func.message();

    module.exports = func;
}
},{}],33:[function(require,module,exports){
var functionForm = {};

functionForm.validate = function () {
    $('.shiro_funcForm #form1').validate({
        rules: {
            funcName: {
                required: true
                , rangelength: [3, 20]
                , remote: {
                    url: "/support/shiro/func/checkName?oldName="+$('#funcName').val(),     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式
                    data: {                     //要传递的数据
                        pId: function () {
                            return $('#parentId').val();
                        }

                    }
                }
            },
            action: {
                required: true
                , rangelength: [2, 100]
            },
            permission: {
                required: true
                , rangelength: [2, 50]
            },
            seqNum: {
                required: true,
                digits: true
            }
        },
        messages: {
            funcName: {
                remote: '功能名称已经存在，请重新输入！'
            }
        }
    });
}

functionForm.delete=function(id){
    $('#content').children('p').remove();
    var $form = $('#delAgree');
    $form.attr('href', '/support/shiro/func/delete/' + id);
    $('#content').append('<p>你确定要删除此功能吗?</p>');

    $('#modal1').modal();
}

var time = 2000;

function fun(){
    $(":submit").removeAttr("disabled");
}
function run(){
    setTimeout(fun,time);
}

functionForm.subchange=function(){
    $('.shiro_funcForm #form1').submit(function() {
        $(":submit",this).attr("disabled","disabled");
        run();
    });
}


functionForm.validate();

$('.shiro_funcForm #del_btn').on('click', function () {
    functionForm.delete($(this).attr('data_id'));
});

functionForm.subchange();
module.exports = functionForm;
},{}],34:[function(require,module,exports){
if ($('#pemissionTree').length > 0) {
    var permission = {};

    /*
     * 调整包含树的容器的高度.
     */
    permission.adjustHeight = function () {
        var ph = document.body.clientHeight;

        var $tc = $('.tree-container');
        var $footer = $('.page-footer');
        var fh = 0;
        if ($footer.length) {
            fh = $footer.outerHeight();
        }
        if ($tc.size() > 0) {
            var th = ph - $tc.offset().top - fh - 38;
            $tc.height(2000);
        }
    }

    /*
     * 初始化zTree.
     * @tid zTree的实例容器#id
     * @opt Ztree设置项.
     */
    permission.initTree = function (tid, opt) {
        //$.fn.zTree.destroy(tid);
        return $.fn.zTree.init($('#' + tid), opt);
    }

    permission.init = function () {
        //左侧菜单高亮显示

        permission.adjustHeight();

        /************************ 配置功能树 ************************/
        var settings = new TreeSetting('/support/shiro/func/tree');
        $.extend(true, settings, {
            check: {
                enable: true
                , chkboxType: {"Y": "ps", "N": "ps"}
            },

            async: {
                dataFilter: dataFilter
                , autoParam: ["id=pid"]
            },

            callback: {
                onAsyncSuccess: onAsyncSuccess
                , onAsyncError: onAsyncError
                , onClick: onClick
            }
        });


        function dataFilter(treeId, parentNode, childNodes) {
            if (!childNodes) return null;
            for (var i = 0, l = childNodes.length; i < l; i++) {
                if (childNodes[i].id == '0') {
                    //修改根节点的样式
                    childNodes[i].iconSkin = 'root';
                    childNodes[i].nocheck = true;
                }

                if ($.inArray(childNodes[i].id, rfids) != -1) {
                    childNodes[i].checked = true;
                }
            }
            return childNodes;
        }


        function onClick(event, treeId, treeNode, clickFlag) {
            funcTree.checkNode(treeNode, !treeNode.checked, true, true);
        }


        var asynCount = 0, asyncRoot = true;

        function onAsyncSuccess(event, treeId, treeNode, msg) {
            if (asyncRoot) {
                asyncRoot = false;
            } else {
                asynCount--;
            }

            if (!!treeNode) {
                asyncNodes(treeNode.children);
            } else {
                asyncNodes(funcTree.getNodes());
            }

            //common.log('onAsyncSuccess : asynCount = ' + asynCount);
        }

        function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
            //asynCount--;
            //common.log('onAsyncError : asynCount = ' + asynCount);
        }

        /*
         * 异步加载并展开子节点.
         */
        function asyncNodes(nodes) {
            if (!nodes)
                return;

            var zTree = funcTree;
            for (var i = 0, l = nodes.length; i < l; i++) {
                if (nodes[i].isParent && nodes[i].zAsync) {
                    asyncNodes(nodes[i].children);
                } else {
                    if (nodes[i].level < 99 && nodes[i].isParent) {
                        asynCount++;
                        zTree.reAsyncChildNodes(nodes[i], "refresh", false);
                    }
                }
            }
        }

        /************************ 配置功能树 end ************************/

        //加载角色的权限id
        var rfids = [];
        $.ajax('/support/shiro/role/perms/' + $('.roleId').val() + '/json', {
            async: false
            , dataType: 'json'
            , success: function (data, textStatus, jqXHR) {
                rfids = data;
            }
        });

        //初始化zTree
        var funcTree = permission.initTree('pemissionTree', settings);

        $('#submit_btn').on('click', function () {
            var fids = [];
            var nodes = funcTree.getCheckedNodes(true);
            $.each(nodes, function () {
                fids.push(this.id);
            });

            $('#funcIds').val(fids.join());
            $('#fids').val(fids.join());
            var url = '/support/shiro/role/perms/' + $('.roleId').val();
            $('#permissionForm').attr('action', url)[0].submit();
        });

    }
    permission.init();

    module.exports = permission;
}


},{}],35:[function(require,module,exports){
var roleForm = {};

//为表单注册validate函数
roleForm.validate = function () {
    $(".shiro_roleForm #roleForm").validate({
        submitHandler: function (form) {
            form.submit();
        },
        rules: {
            roleCode: {
                required: true,
                rangelength: [2, 20],
                remote: {
                    url: "/support/shiro/role/checkRoleCode?oldCode=" + encodeURIComponent($('#roleCode').val()),     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json"          //接受数据格式
                    //data: {                     //要传递的数据
                    //    oldCode: function () {
                    //        return encodeURIComponent($('#roleCode').val());
                    //    }
                    //}
                }
            },
            roleName: {
                required: true,
                rangelength: [2, 20],
                remote: {
                    url: "/support/shiro/role/checkRoleName?oldName=" + $('#roleName').val(),     //后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json"           //接受数据格式
                    //data: {                     //要传递的数据
                    //    oldName: function () {
                    //        return $('#roleName').val();
                    //    }
                    //}
                }
            }
        },
        messages: {
            roleCode: {
                remote: "角色编码已经存在"
            },
            roleName: {
                remote: "角色名已存在"
            }
        }
    });
}

var time = 2000;

function fun(){
    $(":submit").removeAttr("disabled");
}
function run(){
    setTimeout(fun,time);
}

roleForm.subchange=function(){
    $('.shiro_roleForm #roleForm').submit(function() {
        $(":submit",this).attr("disabled","disabled");
        run();
    });
}
roleForm.validate();
roleForm.subchange();

module.exports = roleForm;
},{}],36:[function(require,module,exports){
var roleList = {};

roleList.deleteById = function (rid) {
    $('#content').children('p').remove();
    var $form = $('#delAgree');
    $form.attr('href', '/support/shiro/role/delete/' + rid);
    $('#content').append('<p>您确定要删除此角色吗?</p>');

    $('#modal1').modal();
}

roleList.validate = function () {

    $('.role_page #pageForm').validate({
        rules: {
            pn: {
                digits: true
            }
        }
    });
}
roleList.init=function(){
    var message=$('.shiro_roleList #message').val();
    if(message!=null&&message!="undefined"&&message!=""){
        $('#message-content').append('<p>'+message+'</p>');
        $('#message-modal').modal();
    }


}
$('.shiro_roleList .deleteByRoleId').on('click', function () {
    roleList.deleteById($(this).attr('dataId'));
});

roleList.validate();
roleList.init();
module.exports = roleList;
},{}],37:[function(require,module,exports){
var userForm = {};
userForm.init = function () {
    var roleId = $("#roleId").val();
    $("#roleName option").each(function () {
        if ($(this).val() == roleId) {
            $(this).attr('selected', 'selected');
        }
    });
}


userForm.validate = function () {
    var readOnly=$('#loginName').attr('readonly');
   if(readOnly==null||readOnly==''){
       $('.shiro_userForm #inputForm').validate({
           rules: {
               loginName: {
                   required: true
                   , letter: true
                   , rangelength: [2, 16]
                   , remote: "/support/shiro/user/checkLoginName?oldName=" + encodeURIComponent($('#loginName').val())
               },
               realName: {
                   required: true
                   , rangelength: [2, 16]
               },
               phone: {
                   required: true
                   , isPhoneOrIsMobile: true
               },
               password: {
                   required: true
                   , rangelength: [6, 20]
               },
               againPassword: {
                   required: true
                   , equalTo: '#password'
               }
           },
           messages: {
               loginName: {
                   remote: '登录名已经存在，请重新输入！'
               }
           }
       });
   }else{
       $('.shiro_userForm #inputForm').validate({
           rules: {
               loginName: {
                   required: true
                   , letter: true
                   , rangelength: [2, 16]
                   , remote: "/support/shiro/user/checkLoginName?oldName=" + encodeURIComponent($('#loginName').val())
               },
               realName: {
                   required: true
                   , rangelength: [2, 16]
               },
               phone: {
                   required: true
                   , isPhoneOrIsMobile: true
               }
           },
           messages: {
               loginName: {
                   remote: '登录名已经存在，请重新输入！'
               }
           }
       });
   }


}

var time = 2000;

function fun(){
    $(":submit").removeAttr("disabled");
}
function run(){
    setTimeout(fun,time);
}

userForm.subchange=function(){
    $('.shiro_userForm #inputForm').submit(function() {
        $(":submit",this).attr("disabled","disabled");
        run();
    });
}
userForm.init();
userForm.validate();
userForm.subchange();
module.exports = userForm;
},{}],38:[function(require,module,exports){
var userList = {};

userList.resetPwd = function (id) {

    $('#content').children('p').remove();
    var $form = $('#delAgree');
    $form.attr('href', '/support/shiro/user/resetPwd/' + id);
    $('#content').append('<p>您确定要重置密码吗?</p>');

    $('#modal1').modal();
};

userList.deleteById = function (id) {
    $('#content').children('p').remove();
    var $form = $('#delAgree');
    $form.attr('href', '/support/shiro/user/delete/' + id);
    $('#content').append('<p>您确定要删除此用户吗?</p>');

    $('#modal1').modal();
};
//userList.init=function(){
//    var message=$('#message').val();
//    alert(message);
//    $('#content').append('<p>'+message+'</p>');
//
//    $('#modal1').openModal();
//
//}
userList.init=function() {
    var message = $('.shiro_userList #message').val();
    if (message != null && message != "undefined" && message != "") {
        $('#message-content').append('<p>'+message+'</p>');
        $('#message-modal').modal();
    }
}

////上一页
//userList.previous=function(){
//    var previous = $('#previous').href;
//    previous.attr("&loginName="+$('#loginName').val()+"&realName="+$('#realName').val());
//}
////下一页
//userList.next=function(){
//
//}
userList.validate = function () {

    $('.user_page #pageForm').validate({
        rules: {
            pn: {
                digits:true
            }
        }
    });
}


$('.shiro_userList .resetPwd').on('click', function () {
    userList.resetPwd($(this).attr('data-id'));
});

$('.shiro_userList .deleteById').on('click', function () {
    userList.deleteById($(this).attr('data-id'));
});
userList.validate();
userList.init();
module.exports = userList;
},{}],39:[function(require,module,exports){
var smsChannel = {};




module.exports = smsChannel;
},{}],40:[function(require,module,exports){
var smsTemplate = {};




module.exports = smsTemplate;

},{}],41:[function(require,module,exports){
var addTag = {};

addTag.tagConditions = new Array();


addTag.addCondition = function(){
    $('.czb-tag #btn-add-condition').on('click', function() {
        var $selectField = $('.czb-tag #select-field');
        var $selectCondition = $('.czb-tag #select-condition');
        var $inputValue = $('.czb-tag #input-value');
        if ($selectField.val() == null) {
            alert('请先选择项目');
            return false;
        }
        if($selectCondition.val() == null) {
            alert('请先选择条件');
            return false;
        }
        if($inputValue.val() == null || $inputValue.val().trim()=="") {
            alert('请填写值');
            return false;
        }

        var temp = {field:$selectField.val(),fieldValue:$selectField.find("option:selected").text(),
            condition:$selectCondition.val(), conditionValue:$selectCondition.find("option:selected").text(),
            value:$inputValue.val()};
        addTag.tagConditions.push(temp);
        addTag.refreshCondition();
    })
};

addTag.refreshCondition = function() {
    var table=$("<table class=\"highlight\">");
    for (var i= 0,len=addTag.tagConditions.length; i < len; i++) {
        var tagCondition = addTag.tagConditions[i];
        var tr=$("<tr data-index='"+i+"'></tr>");
        tr.appendTo(table);
        var td1=$("<td>"+tagCondition.fieldValue+"</td>");
        td1.appendTo(tr);
        var td2=$("<td>"+tagCondition.conditionValue+"</td>");
        td2.appendTo(tr);
        var td3=$("<td>"+tagCondition['value']+"</td>");
        td3.appendTo(tr);
        var td4=$("<td><div class='icon-preview col s6 m3 remove-condition' style='cursor:pointer'><i class='fa fa-remove text-red'></i></div></td>");
        td4.appendTo(tr);
    }

    $(".czb-tag #current-tag-condition").html("");
    $(".czb-tag #current-tag-condition").append(table);

    $(".remove-condition").click(function(){
        addTag.tagConditions.splice($(this).parent().parent().attr("data-index"), 1);
        addTag.refreshCondition();
    });
};

addTag.saveTagCondition = function() {
    $(".czb-tag #btn-save").click(function(){

        var $name = $("#name").val();
        var $filterType = $("input:radio[name='filterType']:checked").val();
        if($name == null || $name.trim()=="") {
            alert('请先填写标签名');
            return false;
        }

        if($filterType == null) {
            alert('请选择匹配方式');
            return false;
        }

        if(addTag.tagConditions.length==0){
            alert('请添加匹配条件');
            return false;
        }
        $(this).attr("disabled", true);

        var tagData = {name:$name, filterType: $filterType, tagConditions: addTag.tagConditions};

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url:"/support/tag",
            data: JSON.stringify(tagData),
            type: "post",
            dataType: "json",
            success:function(data){
                if(data.errCode !="00000"){
                    alert(data.errMsg);
                    location.reload();
                } else{
                    location.href='/support/tag/list?isArchived=false';
                }
            }
        });
    });
};


addTag.init = function(){
    $("#select-field").change(function()
    {
        //var value = $("#select-field option:selected").val();
        var value = $("#select-field").find("option:selected").val();
        if(value=="field_gender" || value == "field_company" || value=="field_phone"){
            $("#select-condition option[value='<']").hide();
            $("#select-condition option[value='>']").hide();
        }else{
            $("#select-condition option[value='<']").show();
            $("#select-condition option[value='>']").show();
        }

    });
    addTag.addCondition();
    addTag.saveTagCondition();
};

addTag.init();

module.exports = addTag;
},{}],42:[function(require,module,exports){
var listTag = {};


listTag.archive = function() {
    $(".czb-tag-list #btn-archive").click(function() {
        var tagId = $(this).attr("data-id");
        $.ajax({
            url: "/support/tag/"+tagId+"/archive",
            type: "put",
            dataType: "json",
            success: function(data){
                location.reload();
            }
        });
    });

    $(".czb-tag-list #btn-un-archive").click(function() {
        var tagId = $(this).attr("data-id");
        $.ajax({
            url: "/support/tag/"+tagId+"/unArchive",
            type: "put",
            dataType: "json",
            success: function(data){
                location.reload();
            }
        });
    });

    $(".czb-tag-list #btn-refresh").click(function() {
        var tagId = $(this).attr("data-id");
        $.ajax({
            url: "/support/tag/"+tagId+"/user",
            type: "put",
            dataType: "json",
            success: function(data){
                location.reload();
            }
        });
    });
};

listTag.init = function() {
    listTag.archive();
};


listTag.init();

module.exports = listTag;
},{}],43:[function(require,module,exports){
var addUser = {};
var wrap = $('.support-user-add');
var batchWrap = $('.support-user-add-batch');
var resultWrap = $('.support-user-add-result');

var helpers = require('../../common/components/helpers');

addUser.addBySingle = function() {
    var disabledSubmitButton = function() {
        wrap.find('#btn-submit').attr('disabled', true).addClass('disabled');
    };
    var enabledSubmitButton = function() {
        wrap.find('#btn-submit').removeAttr('disabled').removeClass('disabled');
    };

    wrap.find('#add-user-form').on('submit', function() {
        disabledSubmitButton();

        if (wrap.find('#select-company').val() == null) {
            alert("公司不能为空");
            enabledSubmitButton();
            return false;
        }
    });
};

addUser.addByBatch = function() {
    batchWrap.find('#add-user-list-form').on('submit', function() {
        var $selectCompany = batchWrap.find('#select-company');
        var $file = batchWrap.find('#file');
        if ($selectCompany.val() == null) {
            alert('请先选择公司');
            return false;
        }

        if ($file.val() == '') {
            alert('请先提交文件');
            return false;
        }
        batchWrap.find('#btn-submit').addClass('disabled').attr('disabled', true);
    });
};

addUser.acceptSapChange = function() {
    resultWrap.find('button.btn-danger').on('click', function() {
        var acceptBtn = $(this);
        resultWrap.find('button.btn-danger').attr('disabled', true).addClass('disabled');
        $.post("/support/user/accept_sap_change", {'id': $(this).attr('data-id')}, function(data) {
            if(data.errCode == "00000") {
                alert("修改成功");
                acceptBtn.after('<i class="fa fa-check text-success"></i>');
                acceptBtn.remove();
            } else {
                alert(data.errMsg);
            }
            resultWrap.find('button.btn-danger').removeAttr('disabled').removeClass('disabled');
        });
    })
};


addUser.init = function () {
    wrap.find('#select-company').select2();
    addUser.addBySingle();

    batchWrap.find('#select-company').select2();
    addUser.addByBatch();

    addUser.acceptSapChange();
};

addUser.init();

module.exports = addUser;
},{"../../common/components/helpers":2}],44:[function(require,module,exports){
var addCompany = {};
var wrap = $('.support-user-add-company');

addCompany.formSubmit = function() {
    var $selectCompany = wrap.find("#select-company");
    var $selectArea = wrap.find("#select-company-area");
    var $name = wrap.find("#name");

    var formReset = function() {
        if ($selectCompany.length > 0) {
            $selectCompany[0].selectedIndex = 0;
            $selectCompany.select2();
        }

        if ($selectArea.length > 0) {
            $selectArea[0].selectedIndex = 0;
            $selectArea.select2();
        }

        $name.val('');
    };

    formReset();

    wrap.find('#btn-submit').bind('click', function() {
        if ($.trim($name.val()) == '') {
            alert("单位名称不能为空");
            return false;
        }
        $.post("/support/user/add_company", wrap.find('#add-company-form').serialize(), function(data) {
            if(data.errCode == "00000") {
                alert("添加成功");
                //location.reload();
            } else {
                alert(data.errMsg);
            }
        });
    });
};

addCompany.init = function () {
    addCompany.formSubmit();
};
addCompany.init();

module.exports = addCompany;
},{}],45:[function(require,module,exports){
var helpers = require('../../common/components/helpers');

var userInfo = {};
var wrap = $('.support-user-info');
wrap.find('input[name="startTime"]').datetimepicker({format: 'Y-m-d', autoclose: true});
wrap.find('input[name="endTime"]').datetimepicker({format: 'Y-m-d' , autoclose: true});
var userId = wrap.find('#data-user-id').val();


userInfo.updatePhone = function() {
    var modalUpdatePhone = wrap.find('#modal-update-phone');
    var linkUpdatePhone = wrap.find('#link-update-phone');

    linkUpdatePhone.on('click', function() {
        modalUpdatePhone.modal();

        var submitUpdatePhone = modalUpdatePhone.find('#btn-update-phone');
        submitUpdatePhone.unbind('click').on('click', function() {
            var inputUpdatePhone = wrap.find('#input-update-phone');
            var oldPhoneNumber = inputUpdatePhone.attr('data-old-phone');
            var phoneNumber = inputUpdatePhone.val();

            if (oldPhoneNumber != phoneNumber) {
                $.post("/support/user/change_phone", {userId: userId, phone: phoneNumber}, function(data) {
                    if (data.errCode == "00000") {
                        alert('修改成功');
                        wrap.find('#search').val(phoneNumber);
                        wrap.find('#form-search').submit();
                    } else {
                        helpers.formValidateErrorTips($inputUpdatePhone, "修改失败" + data.errMsg);
                    }
                })
            } else {
                modalUpdatePhone.modal('hide');
            }
        });
    });
};

userInfo.changeBankcard = function(userChannelId, channelId, bankName) {
    var modalChangeBankcard = wrap.find('#modal-change-bankcard');
    var $selectProvince = modalChangeBankcard.find('#select-province');
    var $selectCity = modalChangeBankcard.find('#select-city');
    var $inputCardNo = modalChangeBankcard.find('#cardNo');
    var $inputBankBranch = modalChangeBankcard.find('#bankBranch');

    var initCity = function() {
        var $selectProvinceDefault = "<option value='' disabled selected>选择省</option>";
        var $selectCityDefault = "<option value='' disabled selected>选择城市</option>";

        var updateCityOption = function(cityData) {
            $inputBankBranch.val("");

            $selectCity.empty();
            $selectCity.append($selectCityDefault);

            $.each(cityData, function(i, n) {
                $selectCity.append("<option value='" + n['n'] + "'>" + n['n'] + "</option>");
            });

            $selectCity.on('change', function() {
                $inputBankBranch.val($(this).val() + "分行");
            })
        };

        var updateProvinceOption = function(data) {
            $selectProvince.empty();
            $selectProvince.append($selectProvinceDefault);

            $.each(data, function(i, n) {
                $selectProvince.append("<option value='" + i + "'>" + n['p'] + "</option>");
            });

            $selectProvince.on('change', function() {
                console.log($(this).val());
                if ($(this).val() == null) {
                    updateCityOption({});
                } else {
                    var cityData = data[$(this).val()];
                    updateCityOption(cityData['c']);
                }

            }).change();
        };

        $.getJSON('/static/admin/vendor/openBank/js/city.js',function(json){
            updateProvinceOption(json['citylist']);
        });
    };

    var submit = function() {
        wrap.find('#btn-change-bankcard').unbind('click').on('click', function() {
            if ($inputBankBranch.val() == '') {
                alert("请选择开户城市");
                return false;
            }

            var dataObject = {
                userId: userId,
                channelId: channelId,
                userChannelId: userChannelId,
                cardNo: $inputCardNo.val(),
                branchName: bankName + $inputBankBranch.val(),
                idNumberType: wrap.find("input[name='idNumberType']:checked").val()
            };

            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/support/user/change_bankcard",
                type: 'POST',
                data: JSON.stringify(dataObject),
                success: function(data) {
                    if (data.errCode == "00000") {
                        alert('修改成功');
                        location.reload();
                    } else {
                        alert(data.errMsg);
                    }
                }
            })
        })
    };

    var openModal = function() {
        modalChangeBankcard.modal();
        initCity();
        submit();
    };

    var checkAllowChange = function() {
        $.get("/support/user/change_bankcard/check?userId=" + userId + "&userChannelId=" + userChannelId, function (data) {
            if (data.errCode == "00000") {
                openModal();
            } else if (data.errCode == "57000") {
                alert(data.errMsg + ", 不能换卡");
            } else {
                if (confirm(data.errMsg + "，确认要继续吗?")) {
                    openModal();
                }
            }
        });
    };
    checkAllowChange();
};

userInfo.syncAsset = function (syncDays, userChannelId) {
    var dataObject = {
        syncDays: syncDays,
        userId: userId,
        userChannelId: userChannelId
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/support/user/syncUserAsset",
        type: 'POST',
        data: JSON.stringify(dataObject),
        success: function(data) {
            if (data.errCode == "00000") {
                alert('资产同步成功');
            } else {
                alert(data.errMsg);
            }
        },
        error: function(data) {
            alert("同步失败，服务器错误");
        }
    })
};

userInfo.transactionDetail = function() {
    // 交易详情
    var modalTransactionDetail = wrap.find('#modal-transaction-detail');

    wrap.find('a.link-detail').on('click', function(){
        var $transactionNo = $(this).attr('data-transactionNo');
        var $transactionTime = $(this).attr('data-transactionTime');
        var $transactionMoney = $(this).attr('data-transactionAmount');
        var $transactionType = $(this).attr('data-transactionType');
        var $transactionStatus = $(this).attr('data-transactionStatus');
        var $transactionNote = $(this).attr('data-transactionRemark');

        modalTransactionDetail.modal();

        wrap.find('#transaction-no').text($transactionNo);
        wrap.find('#transaction-time').text($transactionTime);
        wrap.find('#transaction-money').text($transactionMoney);
        wrap.find('#transaction-type').text($transactionType);
        wrap.find('#transaction-status').text($transactionStatus);
        wrap.find('#transaction-note').html($transactionNote);

        return false;
    });
};

userInfo.init = function() {
    // 修改手机号
    userInfo.updatePhone();

    // 修改银行卡
    wrap.find('a.link-change-bankcard').on('click', function() {
        var userChannelId = $(this).attr('data-user-channel-id');
        var channelId = $(this).attr('data-channel-id');
        var bankName = $(this).attr('data-bank-name');

        userInfo.changeBankcard(userChannelId, channelId, bankName);

        return false;
    });

    // 同步用户资产
    wrap.find('a.btn-sync-asset').on('click', function() {
        if (confirm("确认要同步资产吗?")) {
            var userChannelId = $(this).attr('data-user-channel-id');

            userInfo.syncAsset(60, userChannelId);
        }

        return false;
    });

    userInfo.transactionDetail();

    // 解冻
    $('div.support-user-info button.unfreeze-btn').on('click', function(){
        if (confirm('确认解冻吗？')) {
            var id = $(this).attr('data-id');
            var user_id = $(this).attr('data-user_id');

            $.ajax({
                url: "/support/fip/cancel_freeze",
                type: 'POST',
                data: {user_id: user_id, fip_tbid:id},
                success: function(data) {
                    if (data.errCode == "00000") {
                        location.reload();
                        alert('解冻成功');
                    } else {
                        alert(data.errMsg);
                    }
                }
            })
        }
    });
    //查看资产
    wrap.find('a.btn-get-asset').on('click', function() {

        var channelId = $(this).attr('data-channel-id');
            userInfo.getAsset(channelId);

    });

};
userInfo.getAsset = function (channelId) {
    var dataObject = {
        userId: userId,
        userChannelId: channelId
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "/support/user/getAsset",
        type: 'POST',
        data: JSON.stringify(dataObject),
        success: function(result) {

                var item= eval("("+result.data+")");
                //模态框复制，弹出
                $('#totalAsset').text(item.totalAsset);
                $('#totalGzbAsset').text(item.totalGzbAsset);
                $('#availableGzbAsset').text(item.availableGzbAsset);
                $('#totalFipAsset').text(item.totalFipAsset);


        }
    })
    var modalGetAsset = wrap.find('#modal-getAsset');
    modalGetAsset.modal();
};
userInfo.validate = function () {
    $(".support-user-info #form_date_search").validate({
        submitHandler: function (form) {
            form.submit();
        },
        rules: {
            startTime: {
                required: true
            },
            endTime: {
                required: true
            },
            phone: {
                required: true
            }
        }
    });
}
userInfo.init();
userInfo.validate();

module.exports = userInfo;
},{"../../common/components/helpers":2}],46:[function(require,module,exports){
/**
 * Created by marksu on 15/9/28.
 */
var vacationInsert = {};
vacationInsert.init = function(){
    $(".vacation-insert [name='date']").datetimepicker({format: 'Y-m-d', autoclose: true,timepicker:false,});
    $(".vacation-insert #vacation_addBtn").click(function () {
        var postData = {
            date: $(".vacation-insert [name='date']").val(),
            due: $(".vacation-insert [name='due']").val(),
            name: $(".vacation-insert [name='name']").val()
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/vacation/insert",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $(".vacation-insert #vacation_addBtn").attr('disabled', 'disabled');
            },
            complete: function() {
                $(".vacation-insert #vacation_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    alert("添加成功！");
                    window.location.href="/support/vacation/list";
                } else {
                    alert("添加失败，原因：" + data.errMsg);
                }
            }

        });
    });
};
vacationInsert.init();

module.exports = vacationInsert;
},{}],47:[function(require,module,exports){
/**
 * Created by marksu on 15/9/28.
 */
var vacationList = {};
vacationList.init = function(){
    $(".vacation-list .vaction_del").each(function(){
        $(this).unbind().bind("click", function(){
           var choice=confirm("你确认要删除吗？", function(){}, null);
            if (choice) {
                var id = $(this).attr("id");
                $.ajax({
                    url: "/support/vacation/delete",
                    data: "id=" + id,
                    dataType:"json",
                    method: "post",
                    success:function(data) {
                        if (data.errCode == "9999" || data.errCode == "8888") {
                            alert("删除失败！原因：" + data.errMsg);
                        } else {
                            alert("删除成功！");
                            window.location.reload();
                        }
                    }
                });
            }
        });
    });
};
vacationList.init();

module.exports = vacationList;
},{}],48:[function(require,module,exports){
/**
 * Created by hnzb on 16/1/26.
 */
var webbannerlist = {};
var wrap = $('.web-banner');

webbannerlist.init = function(){
    $(".web-banner [name='beginTime']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".web-banner [name='endTime']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    //上传banner
    $('.web-banner [name = "bannerBtn"]').on('click', function () {
        var formData = new FormData($('.web-banner #formBanner')[0]);
        $.ajax({
            url: '/support/web/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if(returndata.errCode == "00000") {
                    alert('上传成功');
                    $('.web-banner [name="bannerUrl"]').val(returndata.data);
                } else {
                    alert("上传失败");
                }
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })


    //删除banner
    $('.web-banner #delBanner').on('click', function () {
        var id = $(this).attr('name');
        $.ajax({
            url: '/support/web/banner/delete?id='+id,
            type: 'POST',
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if(returndata.errCode == "00000") {
                    location.reload();
                } else {
                    alert("删除失败"+returndata.errMsg);
                }
            },
            error: function (returndata) {
                alert("异常");
            }
        });
    });

    //创建banner
    $('.web-banner #bannerSubmit').on('click', function () {
        var formData = {};
        formData.htmlContent = $(".web-banner [name='content']").val();
        formData.beginTime = $(".web-banner [name='beginTime']").val();
        formData.endTime = $(".web-banner [name='endTime']").val();
        formData.src = $(".web-banner [name='bannerUrl']").val();
        formData.url = $(".web-banner [name = 'openUrl']").val();
        formData.target = $(".web-banner [name = 'select']").val();
        formData.type = $(".web-banner [name = 'selectType']").val();

        $.ajax({
            url: '/support/web/banner/create',
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            dataType: "json",
            data: JSON.stringify(formData),
            success: function (returndata) {
                if(returndata.errCode === "00000") {
                    alert("创建成功");
                    location.href = "/support/web/banner/list";
                } else {
                    alert("创建失败: "+returndata.errMsg);
                }
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    });

    //修改banner
    $('.web-banner #bannerUpdate').on('click', function () {
        var formData = {};
        formData.htmlContent = $(".web-banner [name='content']").val();
        formData.beginTime = $(".web-banner [name='beginTime']").val();
        formData.endTime = $(".web-banner [name='endTime']").val();
        formData.src = $(".web-banner [name='bannerUrl']").val();
        formData.url = $(".web-banner [name = 'openUrl']").val();
        formData.target = $(".web-banner [name = 'select']").val();
        formData.type = $(".web-banner [name = 'selectType']").val();
        formData.id = $(".web-banner [name = 'fipId']").val();
        $.ajax({
            url: '/support/web/banner/update',
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            dataType: "json",
            data: JSON.stringify(formData),
            success: function (returndata) {
                if(returndata.errCode === "00000") {
                    alert("修改成功");
                    location.href = "/support/web/banner/list";
                } else {
                    alert("修改失败: "+returndata.errMsg);
                }
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })
}
webbannerlist.init();
module.exports = webbannerlist;
},{}]},{},[3])