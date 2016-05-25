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