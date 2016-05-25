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