var announcementcreate = {};

announcementcreate.init = function () {
    var $wrapPage = $('.announcement-create');

    $wrapPage.find('input[name="startTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $wrapPage.find('input[name="endTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    var handle = function (postData) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/announcement/handle",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function () {
                $(".announcement-create #announcement_addBtn").attr('disabled', 'disabled');
            },
            complete: function () {
                $(".announcement-create #announcement_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    if (postData.id == "0") {
                        alert("添加成功！");
                    } else {
                        alert("修改成功！");
                    }
                    window.location.href = "/support/announcement/list";
                } else {
                    if (postData.id == "0") {
                        alert("添加失败，原因：" + data.errMsg);
                    } else {
                        alert("修改失败，原因：" + data.errMsg);
                    }
                }
            }
        });
    };

    var preCheck = function (postData) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/announcement/checkCreate",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function () {
                $(".announcement-create #announcement_addBtn").attr('disabled', 'disabled');
            },
            complete: function () {
                $(".announcement-create #announcement_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    handle(postData);
                } else {
                    alert("相同银行，相同时间区间内的公告已存在，请重新确认！");
                }
            }

        });
    };

    $(".announcement-create #announcement_addBtn").click(function () {
        var aid = $(".announcement-create input[name='id']").val();
        if (aid == "") aid = "0";

        var channels = new Array();
        $(".announcement-create [name='channels']:checked").each(function () {
            channels.push($(this).val());
            if(channels.length==0){
                alert("请选择影响银行！");
            }
        });
        var content= $(".announcement-create [name='content']").val();
        if(content==null||content==""){
            alert("请填写内容！")
        }

        var postData = {
            startTime: $(".announcement-create [name='startTime']").val() + ":00.0",
            endTime: $(".announcement-create [name='endTime']").val() + ":00.0",
            seeBeforeLogin: $(".announcement-create [name='seeBeforeLogin']").prop("checked") ? "true" : "false",
            canClose: $(".announcement-create input[name='canClose']").prop("checked") ? "true" : "false",
            channels: channels,
            content: $(".announcement-create [name='content']").val(),
            id: aid
        };

        preCheck(postData);
    });

};
announcementcreate.init();
module.exports = announcementcreate;