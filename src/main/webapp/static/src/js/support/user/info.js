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