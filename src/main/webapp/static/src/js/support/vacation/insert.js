/**
 * Created by marksu on 15/9/28.
 */
var vacationInsert = {};
vacationInsert.init = function(){
    $(".vacation-insert [name='date']").datetimepicker({format: 'Y-m-d', autoclose: true,timepicker:false,});
    $(".vacation-insert #vacation_addBtn").click(function () {
        var postData = {
            date: $(".vacation-insert [name='date']").val(),
            due: $(".vacation-insert [name='due']").val(),
            name: $(".vacation-insert [name='name']").val()
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/vacation/insert",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $(".vacation-insert #vacation_addBtn").attr('disabled', 'disabled');
            },
            complete: function() {
                $(".vacation-insert #vacation_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    alert("添加成功！");
                    window.location.href="/support/vacation/list";
                } else {
                    alert("添加失败，原因：" + data.errMsg);
                }
            }

        });
    });
};
vacationInsert.init();

module.exports = vacationInsert;