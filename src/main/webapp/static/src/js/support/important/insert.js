/**
 * Created by marksu on 15/9/28.
 */
var importantInsert = {};
importantInsert.init = function(){
    $(".support-important [name='date']").datetimepicker({format: 'Y-m-d', autoclose: true,timepicker:false,});
    $(".support-important #important_addBtn").click(function () {
        var postData = {
            date: $(".support-important [name='date']").val(),
            type: 0 + parseInt($(".support-important [name='type']").val()),
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/important_date/insert",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $(".support-important #important_addBtn").attr('disabled', 'disabled');
            },
            complete: function() {
                $(".support-important #important_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    alert("添加成功！");
                    window.location.reload();
                } else {
                    alert("添加失败，原因：" + data.errMsg);
                }
            }

        });
    });
};
importantInsert.init();

module.exports = importantInsert;