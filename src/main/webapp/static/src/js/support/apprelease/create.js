var appreleasecreate = {};

appreleasecreate.init = function () {
    var $wrapPage = $('.support-apprelease-create');

    $wrapPage.find('input[name="releaseDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    var $model = $(".announcement-create input[name='model']").val();

    var handle = function (postData) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/app/release/create",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function () {
                $(".support-apprelease-create #apprelease_addBtn").attr('disabled', 'disabled');
            },
            complete: function () {
                $(".support-apprelease-create #apprelease_addBtn").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    if (postData.id == null) {
                        alert("添加成功！");
                    } else {
                        alert("修改成功！");
                    }
                    if (postData.model == "Android") {
                        window.location.href = "/support/app/release/Android/latest";
                    } else if (postData.model == "iPhone") {
                        window.location.href = "/support/app/release/iPhone/latest";
                    }

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

    $(".support-apprelease-create #apprelease_addBtn").click(function () {
        var postData = {
            url: $(".support-apprelease-create [name='url']").val(),
            md5: $(".support-apprelease-create [name='md5']").val(),
            releaseDate: $(".support-apprelease-create [name='releaseDate']").val(),
            forceUpdate: $(".support-apprelease-create [name='forceUpdate']").prop("checked") ? "1" : "0",
            title: $(".support-apprelease-create [name='title']").val(),
            version: $(".support-apprelease-create [name='version']").val(),
            versionCode: $(".support-apprelease-create [name='versionCode']").val(),
            content: $(".support-apprelease-create [name='content']").val(),
            id: $(".support-apprelease-create input[name='id']").val(),
            model: $(".support-apprelease-create input[name='model']").val()
        };

        handle(postData);
    });

};
appreleasecreate.init();
module.exports = appreleasecreate;