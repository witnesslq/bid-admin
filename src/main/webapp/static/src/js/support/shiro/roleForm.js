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