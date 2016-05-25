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
