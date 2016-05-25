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