
/**
 * Created by hnzb on 16/1/26.
 */

var fipcreate = {};
var wrap = $('.fip-create');
fipcreate.init = function() {

    wrap.find('input[name="buyEndTimeStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="buyBeginTimeStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="showTimeStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="endDateStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="beginDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="beginDateStr"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    $('.fip-create #beginBannerBtn').on('click', function () {
        var formData = new FormData($('.fip-create #formBegin')[0]);
        $.ajax({
            url: '/support/fip/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.fip-create #beginBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })

    $('.fip-create #endBannerBtn').on('click', function () {
        var formData = new FormData($('.fip-create #formEnd')[0]);
        $.ajax({
            url: '/support/fip/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.fip-create #endBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })
    $(".fip-create #beginDate").change(function () {
        var beginDate = $(".fip-create #beginDate").val();
        var endDateStr = $(".fip-create #endDateStr").val();
        var annualIncome = $(".fip-create #annualIncome").val();
        if(beginDate.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDate, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/fip/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                dataType: "json",
                data: {beginDateStr: beginDate,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    $('.fip-create #dueDesc').val(data.data.dueDesc);
                    $('.fip-create #incomeRate').val(data.data.incomeRate);
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })
    $(".fip-create #endDateStr").change(function () {
        var beginDate = $(".fip-create #beginDate").val();
        var endDateStr = $(".fip-create #endDateStr").val();
        var annualIncome = $(".fip-create #annualIncome").val();
        if(beginDate.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDate, endDateStr, annualIncome);
            $.ajax({
                method: 'GET',
                url: '/support/fip/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                data: {beginDateStr: beginDate,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    $('.fip-create #dueDesc').val(data.data.dueDesc);
                    $('.fip-create #incomeRate').val(data.data.incomeRate);
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })
    $(".fip-create #annualIncome").change(function () {
        var beginDate = $(".fip-create #beginDate").val();
        var endDateStr = $(".fip-create #endDateStr").val();
        var annualIncome = $(".fip-create #annualIncome").val();
        if(beginDate.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            var formdata = {};
            formdata.beginDateStr = beginDate;
            formdata.endDateStr = endDateStr;
            formdata.annualIncome = annualIncome;

            console.log(beginDate, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/fip/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                dataType: "json",
                data:formdata,
                success: function (data) {
                    $('.fip-create #dueDesc').val(data.data.dueDesc);
                    $('.fip-create #incomeRate').val(data.data.incomeRate);
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    var DateDiff = function (sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
        var aDate, oDate1, oDate2, iDays
        aDate = sDate1.split("-")
        oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-18-2006格式
        aDate = sDate2.split("-")
        oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数
        return iDays
    }

    $('.fip-create #submitForm').on('click', function () {
        alert("提交");
        var product = {};
        product.name = $(".fip-create #name").val();
        product.contractNo = $(".fip-create #contractNo").val();
        product.categoryDesc = $(".fip-create #categoryDesc").val();
        product.refundType = $(".fip-create #refundType").val();
        product.introduction = $(".fip-create #introduction").val();
        product.description = $(".fip-create #description").val();
        product.buyHint = $(".fip-create #buyHint").val();
        product.beginBanner = $(".fip-create #beginBanner").val();
        product.endBanner = $(".fip-create #endBanner").val();
        product.minBuyAmount = $(".fip-create #minBuyAmount").val();
        product.maxBuyAmount = $(".fip-create #maxBuyAmount").val();
        product.buyStepAmount = $(".fip-create #buyStepAmount").val();
        product.beginDateStr = $(".fip-create #beginDate").val();
        product.endDateStr = $(".fip-create #endDateStr").val();
        product.dueDesc = $(".fip-create #dueDesc").val();
        product.basicNo = $(".fip-create #basicNo").val();
        product.annualIncome = $(".fip-create #annualIncome").val();
        product.incomeRate = $(".fip-create #incomeRate").val();
        $('.fip-create input[name="riskInvestType"]:checked').each(function () {
            product.riskInvestType = $(this).val();
        });
        product.groupLimit = $(".fip-create #groupLimit").val();
        product.amount = $(".fip-create #amount").val();
        product.showTimeStr = $(".fip-create #showTimeStr").val();
        product.buyBeginTimeStr = $(".fip-create #buyBeginTimeStr").val();
        product.buyEndTimeStr = $(".fip-create #buyEndTimeStr").val();
        product.ruleList = [];
        $('.fip-create #muji .post').each(function (item) {
            var item = {};
            item.beginDateStr = $(this).find("[name='beginDateStr']").val();
            item.currentAmount = $(this).find("[name='currentAmount']").val();
            item.isAppOpen = $(this).find("[name='openway2']").prop("checked") ? "true" : "false";
            item.isWebOpen = $(this).find("[name='openway1']").prop("checked") ? "true" : "false";
            product.ruleList.push(item);
        })

        $.ajax({
            type: 'POST',
            url: '/support/fip/create',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify(product),
            success: function (data) {
                console.log(data);
                if(data.errCode === "00000") {
                    alert("上传成功");
                    location.href = "/support/fip/list";
                } else {
                    alert("上传失败: "+data.errMsg);
                }

            },
            error: function (data) {
                alert("异常！"+data.errMsg);
            }
        })
    })

    $('.fip-create #submitUpdateForm').on('click', function () {
        alert("提交修改");
        var product = {};
        product.id= $(".fip-create #fipId").val();
        product.name = $(".fip-create #name").val();
        product.contractNo = $(".fip-create #contractNo").val();
        product.categoryDesc = $(".fip-create #categoryDesc").val();
        product.refundType = $(".fip-create #refundType").val();
        product.introduction = $(".fip-create #introduction").val();
        product.description = $(".fip-create #description").val();
        product.buyHint = $(".fip-create #buyHint").val();
        product.beginBanner = $(".fip-create #beginBanner").val();
        product.endBanner = $(".fip-create #endBanner").val();
        product.minBuyAmount = $(".fip-create #minBuyAmount").val();
        product.maxBuyAmount = $(".fip-create #maxBuyAmount").val();
        product.buyStepAmount = $(".fip-create #buyStepAmount").val();
        product.beginDateStr = $(".fip-create #beginDate").val();
        product.endDateStr = $(".fip-create #endDateStr").val();
        product.dueDesc = $(".fip-create #dueDesc").val();
        product.basicNo = $(".fip-create #basicNo").val();
        product.annualIncome = $(".fip-create #annualIncome").val();
        product.incomeRate = $(".fip-create #incomeRate").val();
        $('.fip-create input[name="riskInvestType"]:checked').each(function () {
            product.riskInvestType = $(this).val();
        });
        product.groupLimit = $(".fip-create #groupLimit").val();
        product.amount = $(".fip-create #amount").val();
        product.showTimeStr = $(".fip-create #showTimeStr").val();
        product.buyBeginTimeStr = $(".fip-create #buyBeginTimeStr").val();
        product.buyEndTimeStr = $(".fip-create #buyEndTimeStr").val();
        product.ruleList = [];
        $('.fip-create #muji .post').each(function (item) {
            var item = {};
            item.beginDateStr = $(this).find("[name='beginDateStr']").val();
            item.currentAmount = $(this).find("[name='currentAmount']").val();
            item.isAppOpen = $(this).find("[name='openway2']").prop("checked") ? "true" : "false";
            item.isWebOpen = $(this).find("[name='openway1']").prop("checked") ? "true" : "false";
            product.ruleList.push(item);
        })

        $.ajax({
            type: 'POST',
            url: '/support/fip/edit',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            dataType: "json",
            data: JSON.stringify(product),
            success: function (data) {
                console.log(data);
                if(data.errCode === "00000") {
                    alert("上传成功");
                    location.href = "/support/fip/list";
                } else {
                    alert("上传失败: "+data.errMsg);
                }
            },
            error: function (data) {
                alert("异常！"+data.errMsg);
            }
        })
    })
    $('.fip-create #nextOne').on('click', function () {
        $('.fip-create #tab1').attr("class", "");
        $('.fip-create #baseinfo').attr("class", "tab-pane") ;

        $('.fip-create #tab2').attr("class",  "active");
        $('.fip-create #sendinfo').attr("class", "tab-pane active");

        $('.fip-create #tab3').attr("class", "");
        $('.fip-create #mujiinfo').attr("class", "tab-pane") ;
    })


    $('.fip-create #nextTwo').on('click', function () {
        $('.fip-create #tab1').attr("class", "");
        $('.fip-create #baseinfo').attr("class", "tab-pane") ;

        $('.fip-create #tab2').attr("class",  "");
        $('.fip-create #sendinfo').attr("class", "tab-pane");

        $('.fip-create #tab3').attr("class",  "active");
        $('.fip-create #mujiinfo').attr("class", "tab-pane active");

    })

    var n = 1;
    $('.fip-create #addFipBtn').click(function () {
        $(".fip-create #muji").append('<div class="post" id="post' + n + '"><div id="addFipTime">' +
            '<p><span class="badge" contenteditable="true">' + n + '</span></p>' +
            '<div class="form-group ">' +
            '<div class="row">' +
            '<div class="col-xs-6">' +
            '<label for="sale_time" class="col-xs-3 control-label">开售时间</label>' +
            '<div class="col-sm-8">' +
            '<input type="datetime" class="form-control date-picker"  id="beginDateStr" name="beginDateStr" >' +
            '</div>' +
            '</div>' +
            '<div class="col-xs-6">' +
            '<label for="sale_money" class="col-xs-3 control-label">开放金额</label>' +
            '<div class="col-sm-8">' +
            '<input type="text" class="form-control" id="sale_money" name="currentAmount">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="form-group">' +
            '<div class="row">' +
            '<div class="col-xs-6">' +
            '<label class="col-sm-2 control-label">开放渠道</label>' +
            '<div class="col-sm-10">' +
            '<label class="checkbox-inline">' +
            '<input type="checkbox" name="openway1" value="web"> Web </label>' +
            '<label class="checkbox-inline">' +
            '<input type="checkbox" name="openway2" value="app"> App ' +
            '</label>' +
            '</div>' +
            '</div>' +
            '<div class="col-lg-offset-10 col-xs-1" name="' + n + '">' +
            '<input type="button" class="btn btn-danger" id="deleteFip" name="post' + n + '" value="删除">'+
            '</div>' +
            '</div>' +
            '</div></div></div>');
        n++;
        $('.date-picker').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    })

    $('.fip-create').delegate('#deleteFip', "click", function () {
        var id = $(this).attr("name");
        $("#"+id).remove();
    })

    $('.fip-create').delegate('#deleteFip', "click", function () {
        var id = $(this).attr("name");
        $("#"+id).remove();
    });



//    修改产品权限
    $(".fip-create #btn-add-tag").click(function() {
        console.log("添加按钮");
        var tagId = $(this).attr("data-tag-id");
        var fipId = $(".fip-create #input-fip-id").val();
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

    $(".fip-create #btn-delete-tag").click(function() {
        var tagId = $(this).attr("data-tag-id");
        var fipId = $(".fip-create #input-fip-id").val();
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

    $(".fip-create #btn-confirm").click(function(){
        var fipId = $(".fip-create #input-fip-id").val();
        var phoneErrorMsg = $(".fip-create #phone-error-msg").val();
        var webErrorMsg = $(".fip-create #web-error-msg").val();

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

}
fipcreate.init();
module.exports = fipcreate;