var userForm = {};
userForm.init = function () {
    var roleId = $("#roleId").val();
    $("#roleName option").each(function () {
        if ($(this).val() == roleId) {
            $(this).attr('selected', 'selected');
        }
    });
}


userForm.validate = function () {
    var readOnly=$('#loginName').attr('readonly');
   if(readOnly==null||readOnly==''){
       $('.shiro_userForm #inputForm').validate({
           rules: {
               loginName: {
                   required: true
                   , letter: true
                   , rangelength: [2, 16]
                   , remote: "/support/shiro/user/checkLoginName?oldName=" + encodeURIComponent($('#loginName').val())
               },
               realName: {
                   required: true
                   , rangelength: [2, 16]
               },
               phone: {
                   required: true
                   , isPhoneOrIsMobile: true
               },
               password: {
                   required: true
                   , rangelength: [6, 20]
               },
               againPassword: {
                   required: true
                   , equalTo: '#password'
               }
           },
           messages: {
               loginName: {
                   remote: '登录名已经存在，请重新输入！'
               }
           }
       });
   }else{
       $('.shiro_userForm #inputForm').validate({
           rules: {
               loginName: {
                   required: true
                   , letter: true
                   , rangelength: [2, 16]
                   , remote: "/support/shiro/user/checkLoginName?oldName=" + encodeURIComponent($('#loginName').val())
               },
               realName: {
                   required: true
                   , rangelength: [2, 16]
               },
               phone: {
                   required: true
                   , isPhoneOrIsMobile: true
               }
           },
           messages: {
               loginName: {
                   remote: '登录名已经存在，请重新输入！'
               }
           }
       });
   }


}

var time = 2000;

function fun(){
    $(":submit").removeAttr("disabled");
}
function run(){
    setTimeout(fun,time);
}

userForm.subchange=function(){
    $('.shiro_userForm #inputForm').submit(function() {
        $(":submit",this).attr("disabled","disabled");
        run();
    });
}
userForm.init();
userForm.validate();
userForm.subchange();
module.exports = userForm;