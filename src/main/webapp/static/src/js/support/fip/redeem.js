
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
