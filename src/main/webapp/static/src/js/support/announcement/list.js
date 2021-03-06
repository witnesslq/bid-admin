/**
 * Created by Nathan on 15/9/9.
 */
var announcementlist = {};
var wrap = $('.announcement-list');

announcementlist.init = function(){
    $(function(){
        var delButton = wrap.find('.del');
        var confirmModal = wrap.find('#confirm_delete_modal');

        delButton.each(function() {
            $(this).unbind("click").bind("click", function() {
                var id = $(this).attr("data-id");
                confirmModal.modal();
                confirmModal.find('#confirm_btn').bind("click", function() {
                    $.ajax({
                        url: "/support/announcement/delete",
                        data: "id=" + id,
                        dataType:"json",
                        method: "post",
                        success:function(data) {
                            if (data.errCode != "00000") {
                                confirmModal.find('.modal-body').html("删除失败，原因：" + data.errMsg);
                            } else {
                                confirmModal.modal('hide');
                                window.location.reload();
                            }
                        }
                    });
                });
            });
        });
    })
}
announcementlist.init();
module.exports = announcementlist;