var addTag = {};

addTag.tagConditions = new Array();


addTag.addCondition = function(){
    $('.czb-tag #btn-add-condition').on('click', function() {
        var $selectField = $('.czb-tag #select-field');
        var $selectCondition = $('.czb-tag #select-condition');
        var $inputValue = $('.czb-tag #input-value');
        if ($selectField.val() == null) {
            alert('请先选择项目');
            return false;
        }
        if($selectCondition.val() == null) {
            alert('请先选择条件');
            return false;
        }
        if($inputValue.val() == null || $inputValue.val().trim()=="") {
            alert('请填写值');
            return false;
        }

        var temp = {field:$selectField.val(),fieldValue:$selectField.find("option:selected").text(),
            condition:$selectCondition.val(), conditionValue:$selectCondition.find("option:selected").text(),
            value:$inputValue.val()};
        addTag.tagConditions.push(temp);
        addTag.refreshCondition();
    })
};

addTag.refreshCondition = function() {
    var table=$("<table class=\"highlight\">");
    for (var i= 0,len=addTag.tagConditions.length; i < len; i++) {
        var tagCondition = addTag.tagConditions[i];
        var tr=$("<tr data-index='"+i+"'></tr>");
        tr.appendTo(table);
        var td1=$("<td>"+tagCondition.fieldValue+"</td>");
        td1.appendTo(tr);
        var td2=$("<td>"+tagCondition.conditionValue+"</td>");
        td2.appendTo(tr);
        var td3=$("<td>"+tagCondition['value']+"</td>");
        td3.appendTo(tr);
        var td4=$("<td><div class='icon-preview col s6 m3 remove-condition' style='cursor:pointer'><i class='fa fa-remove text-red'></i></div></td>");
        td4.appendTo(tr);
    }

    $(".czb-tag #current-tag-condition").html("");
    $(".czb-tag #current-tag-condition").append(table);

    $(".remove-condition").click(function(){
        addTag.tagConditions.splice($(this).parent().parent().attr("data-index"), 1);
        addTag.refreshCondition();
    });
};

addTag.saveTagCondition = function() {
    $(".czb-tag #btn-save").click(function(){

        var $name = $("#name").val();
        var $filterType = $("input:radio[name='filterType']:checked").val();
        if($name == null || $name.trim()=="") {
            alert('请先填写标签名');
            return false;
        }

        if($filterType == null) {
            alert('请选择匹配方式');
            return false;
        }

        if(addTag.tagConditions.length==0){
            alert('请添加匹配条件');
            return false;
        }
        $(this).attr("disabled", true);

        var tagData = {name:$name, filterType: $filterType, tagConditions: addTag.tagConditions};

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url:"/support/tag",
            data: JSON.stringify(tagData),
            type: "post",
            dataType: "json",
            success:function(data){
                if(data.errCode !="00000"){
                    alert(data.errMsg);
                    location.reload();
                } else{
                    location.href='/support/tag/list?isArchived=false';
                }
            }
        });
    });
};


addTag.init = function(){
    $("#select-field").change(function()
    {
        //var value = $("#select-field option:selected").val();
        var value = $("#select-field").find("option:selected").val();
        if(value=="field_gender" || value == "field_company" || value=="field_phone"){
            $("#select-condition option[value='<']").hide();
            $("#select-condition option[value='>']").hide();
        }else{
            $("#select-condition option[value='<']").show();
            $("#select-condition option[value='>']").show();
        }

    });
    addTag.addCondition();
    addTag.saveTagCondition();
};

addTag.init();

module.exports = addTag;