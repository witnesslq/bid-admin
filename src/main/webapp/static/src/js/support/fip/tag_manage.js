var tagManage = {}

tagManage.init = function() {
    $(".czb-fip-tag-manage #btn-add-tag").click(function() {
        var tagId = $(this).attr("data-tag-id");
        var fipId = $(".czb-fip-tag-manage #input-fip-id").val();
        var data = {tagId: tagId};
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url:"/support/fip/"+fipId+"/tag",
            data: JSON.stringify(data),
            type: "post",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });

    $(".czb-fip-tag-manage #btn-delete-tag").click(function() {
        var tagId = $(this).attr("data-tag-id");
        var fipId = $(".czb-fip-tag-manage #input-fip-id").val();
        $.ajax({
            headers: {
                'Accept': 'application/json'
            },
            url:"/support/fip/"+fipId+"/tag/"+tagId,
            type: "delete",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });

    $(".czb-fip-tag-manage #btn-confirm").click(function(){
        var fipId = $(".czb-fip-tag-manage #input-fip-id").val();
        var phoneErrorMsg = $(".czb-fip-tag-manage #phone-error-msg").val();
        var webErrorMsg = $(".czb-fip-tag-manage #web-error-msg").val();

        var data = {phoneErrorMsg: phoneErrorMsg, webErrorMsg:webErrorMsg};
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data:JSON.stringify(data),
            url:"/support/fip/"+fipId+"/errorMsg",
            type: "put",
            dataType: "json",
            success:function(data){
                location.reload();
            }
        });
    });
};

tagManage.init();
module.exports = tagManage;