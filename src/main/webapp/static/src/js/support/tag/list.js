var listTag = {};


listTag.archive = function() {
    $(".czb-tag-list #btn-archive").click(function() {
        var tagId = $(this).attr("data-id");
        $.ajax({
            url: "/support/tag/"+tagId+"/archive",
            type: "put",
            dataType: "json",
            success: function(data){
                location.reload();
            }
        });
    });

    $(".czb-tag-list #btn-un-archive").click(function() {
        var tagId = $(this).attr("data-id");
        $.ajax({
            url: "/support/tag/"+tagId+"/unArchive",
            type: "put",
            dataType: "json",
            success: function(data){
                location.reload();
            }
        });
    });

    $(".czb-tag-list #btn-refresh").click(function() {
        var tagId = $(this).attr("data-id");
        $.ajax({
            url: "/support/tag/"+tagId+"/user",
            type: "put",
            dataType: "json",
            success: function(data){
                location.reload();
            }
        });
    });
};

listTag.init = function() {
    listTag.archive();
};


listTag.init();

module.exports = listTag;