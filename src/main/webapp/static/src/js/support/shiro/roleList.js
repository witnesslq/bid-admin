var roleList = {};

roleList.deleteById = function (rid) {
    $('#content').children('p').remove();
    var $form = $('#delAgree');
    $form.attr('href', '/support/shiro/role/delete/' + rid);
    $('#content').append('<p>您确定要删除此角色吗?</p>');

    $('#modal1').modal();
}

roleList.validate = function () {

    $('.role_page #pageForm').validate({
        rules: {
            pn: {
                digits: true
            }
        }
    });
}
roleList.init=function(){
    var message=$('.shiro_roleList #message').val();
    if(message!=null&&message!="undefined"&&message!=""){
        $('#message-content').append('<p>'+message+'</p>');
        $('#message-modal').modal();
    }


}
$('.shiro_roleList .deleteByRoleId').on('click', function () {
    roleList.deleteById($(this).attr('dataId'));
});

roleList.validate();
roleList.init();
module.exports = roleList;