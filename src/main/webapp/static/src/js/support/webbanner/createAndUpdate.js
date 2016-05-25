/**
 * Created by hnzb on 16/1/26.
 */
var webbannerlist = {};
var wrap = $('.web-banner');

webbannerlist.init = function(){
    $(".web-banner [name='beginTime']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".web-banner [name='endTime']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    //上传banner
    $('.web-banner [name = "bannerBtn"]').on('click', function () {
        var formData = new FormData($('.web-banner #formBanner')[0]);
        $.ajax({
            url: '/support/web/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if(returndata.errCode == "00000") {
                    alert('上传成功');
                    $('.web-banner [name="bannerUrl"]').val(returndata.data);
                } else {
                    alert("上传失败");
                }
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })


    //删除banner
    $('.web-banner #delBanner').on('click', function () {
        var id = $(this).attr('name');
        $.ajax({
            url: '/support/web/banner/delete?id='+id,
            type: 'POST',
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                if(returndata.errCode == "00000") {
                    location.reload();
                } else {
                    alert("删除失败"+returndata.errMsg);
                }
            },
            error: function (returndata) {
                alert("异常");
            }
        });
    });

    //创建banner
    $('.web-banner #bannerSubmit').on('click', function () {
        var formData = {};
        formData.htmlContent = $(".web-banner [name='content']").val();
        formData.beginTime = $(".web-banner [name='beginTime']").val();
        formData.endTime = $(".web-banner [name='endTime']").val();
        formData.src = $(".web-banner [name='bannerUrl']").val();
        formData.url = $(".web-banner [name = 'openUrl']").val();
        formData.target = $(".web-banner [name = 'select']").val();
        formData.type = $(".web-banner [name = 'selectType']").val();

        $.ajax({
            url: '/support/web/banner/create',
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            dataType: "json",
            data: JSON.stringify(formData),
            success: function (returndata) {
                if(returndata.errCode === "00000") {
                    alert("创建成功");
                    location.href = "/support/web/banner/list";
                } else {
                    alert("创建失败: "+returndata.errMsg);
                }
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    });

    //修改banner
    $('.web-banner #bannerUpdate').on('click', function () {
        var formData = {};
        formData.htmlContent = $(".web-banner [name='content']").val();
        formData.beginTime = $(".web-banner [name='beginTime']").val();
        formData.endTime = $(".web-banner [name='endTime']").val();
        formData.src = $(".web-banner [name='bannerUrl']").val();
        formData.url = $(".web-banner [name = 'openUrl']").val();
        formData.target = $(".web-banner [name = 'select']").val();
        formData.type = $(".web-banner [name = 'selectType']").val();
        formData.id = $(".web-banner [name = 'fipId']").val();
        $.ajax({
            url: '/support/web/banner/update',
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            dataType: "json",
            data: JSON.stringify(formData),
            success: function (returndata) {
                if(returndata.errCode === "00000") {
                    alert("修改成功");
                    location.href = "/support/web/banner/list";
                } else {
                    alert("修改失败: "+returndata.errMsg);
                }
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })
}
webbannerlist.init();
module.exports = webbannerlist;