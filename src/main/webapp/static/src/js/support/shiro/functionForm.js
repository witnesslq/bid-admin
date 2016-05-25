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