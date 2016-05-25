/**
 * Created by marksu on 15/9/22.
 */
var announcementGzbStatusCreate = {};
var wrap = $('.announcement-gzbstatus-create');

announcementGzbStatusCreate.init = function () {
    $(function () {
        wrap.find("input[name='startTime']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
        wrap.find("input[name='endTime']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});


        var preCheck = function (postData) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/support/announcement/gzb/status/checkGzbStatus",
                method: "post",
                dataType: "json",
                data: JSON.stringify(postData),
                beforeSend: function () {
                    wrap.find("#gzbStatus_addBtn").attr('disabled', 'disabled');
                },
                complete: function () {
                    wrap.find("#gzbStatus_addBtn").removeAttr('disabled');
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

        var handle = function (postData) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "/support/announcement/gzb/status/handle",
                method: "post",
                dataType: "json",
                data: JSON.stringify(postData),
                beforeSend: function () {
                    wrap.find("#gzbStatus_addBtn").attr('disabled', 'disabled');
                },
                complete: function () {
                    wrap.find("#gzbStatus_addBtn").removeAttr('disabled');
                },
                success: function (data) {
                    if (data.errCode == "00000") {
                        if (postData.id == "0") {
                            alert("添加成功！");
                        } else {
                            alert("修改成功！");
                        }
                        window.location.href = "/support/announcement/gzb/status/list";
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

        wrap.find('#gzbStatus_addBtn').click(function () {
            var aid = $(".announcement-gzbstatus-create input[name='id']").val();
            if (aid == "") aid = "0";

            var channels = {};
            wrap.find("[name='channels']:checked").each(function () {
                var channelId = $(this).val();
                channels[channelId] = wrap.find("input[name='tipMsg_" + channelId + "']").val();
            });
            var postData = {
                startTime: wrap.find("[name='startTime']").val() + ":00.0",
                endTime: wrap.find("[name='endTime']").val() + ":00.0",
                closeSign: wrap.find("input[name='closeSign']").prop("checked") ? "true" : "false",
                closePurchase: wrap.find("input[name='closePurchase']").prop("checked") ? "true" : "false",
                closeRegularRedeem: wrap.find("input[name='closeRegularRedeem']").prop("checked") ? "true" : "false",
                closeRealtimeRedeem: wrap.find("input[name='closeRealtimeRedeem']").prop("checked") ? "true" : "false",
                channels: channels,
                id: aid
            };

            preCheck(postData);
        });
    });
};

announcementGzbStatusCreate.init();
module.exports = announcementGzbStatusCreate;