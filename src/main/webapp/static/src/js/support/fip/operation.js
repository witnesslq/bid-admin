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