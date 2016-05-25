
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