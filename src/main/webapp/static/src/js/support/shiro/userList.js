var userList = {};

userList.resetPwd = function (id) {

    $('#content').children('p').remove();
    var $form = $('#delAgree');
    $form.attr('href', '/support/shiro/user/resetPwd/' + id);
    $('#content').append('<p>您确定要重置密码吗?</p>');

    $('#modal1').modal();
};

userList.deleteById = function (id) {
    $('#content').children('p').remove();
    var $form = $('#delAgree');
    $form.attr('href', '/support/shiro/user/delete/' + id);
    $('#content').append('<p>您确定要删除此用户吗?</p>');

    $('#modal1').modal();
};
//userList.init=function(){
//    var message=$('#message').val();
//    alert(message);
//    $('#content').append('<p>'+message+'</p>');
//
//    $('#modal1').openModal();
//
//}
userList.init=function() {
    var message = $('.shiro_userList #message').val();
    if (message != null && message != "undefined" && message != "") {
        $('#message-content').append('<p>'+message+'</p>');
        $('#message-modal').modal();
    }
}

////上一页
//userList.previous=function(){
//    var previous = $('#previous').href;
//    previous.attr("&loginName="+$('#loginName').val()+"&realName="+$('#realName').val());
//}
////下一页
//userList.next=function(){
//
//}
userList.validate = function () {

    $('.user_page #pageForm').validate({
        rules: {
            pn: {
                digits:true
            }
        }
    });
}


$('.shiro_userList .resetPwd').on('click', function () {
    userList.resetPwd($(this).attr('data-id'));
});

$('.shiro_userList .deleteById').on('click', function () {
    userList.deleteById($(this).attr('data-id'));
});
userList.validate();
userList.init();
module.exports = userList;