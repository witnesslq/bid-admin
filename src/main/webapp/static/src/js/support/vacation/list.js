/**
 * Created by marksu on 15/9/28.
 */
var vacationList = {};
vacationList.init = function(){
    $(".vacation-list .vaction_del").each(function(){
        $(this).unbind().bind("click", function(){
           var choice=confirm("你确认要删除吗？", function(){}, null);
            if (choice) {
                var id = $(this).attr("id");
                $.ajax({
                    url: "/support/vacation/delete",
                    data: "id=" + id,
                    dataType:"json",
                    method: "post",
                    success:function(data) {
                        if (data.errCode == "9999" || data.errCode == "8888") {
                            alert("删除失败！原因：" + data.errMsg);
                        } else {
                            alert("删除成功！");
                            window.location.reload();
                        }
                    }
                });
            }
        });
    });
};
vacationList.init();

module.exports = vacationList;