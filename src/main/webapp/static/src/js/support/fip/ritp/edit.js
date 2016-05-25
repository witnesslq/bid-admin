var riptedit = {};
var wrap = $('.ritp-edit');
riptedit.init = function() {

    wrap.find('input[name="expectBeginDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="expectEndDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="displayTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="raiseBeginTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="raiseEndTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    $('.ritp-edit #nextOne').on('click', function () {
        $('.ritp-edit #tab1').attr("class", "");
        $('.ritp-edit #baseinfo').attr("class", "tab-pane") ;

        $('.ritp-edit #tab2').attr("class",  "active");
        $('.ritp-edit #sendinfo').attr("class", "tab-pane active");

    })

    $('.ritp-edit #totalAmount').on('change',  function () {
        var totalAmount = $('.ritp-edit #totalAmount').val();
        var threeAmount = $('.ritp-edit #three').text();
        var fourAmount = $('.ritp-edit #four').text();
        if((totalAmount%threeAmount) == (threeAmount/3)) {
            $('.ritp-edit #threeAmount').val((totalAmount - 1*fourAmount)/threeAmount);
            $('.ritp-edit #fourAmount').val(1);
        } else if(totalAmount%threeAmount == (threeAmount/3*2)){
            $('.ritp-edit #threeAmount').val((totalAmount - 2*fourAmount)/threeAmount);
            $('.ritp-edit #fourAmount').val(2);
        } else if(totalAmount%threeAmount == 0){
            $('.ritp-edit #threeAmount').val(totalAmount/threeAmount);
            $('.ritp-edit #fourAmount').val(0);
        } else {
            alert('请检查总金额是否正确');
        }
    })

    //上传及下载banner图
    $('.ritp-edit #beginBannerBtn').on('click', function () {
        var formData = new FormData($('.ritp-edit #formBegin')[0]);
        $.ajax({
            url: '/support/ritp/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.ritp-edit #beginBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })
    $('.ritp-edit #endBannerBtn').on('click', function () {
        var formData = new FormData($('.ritp-edit #formEnd')[0]);
        $.ajax({
            url: '/support/ritp/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.ritp-edit #endBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })

//计算时长和年化收益率
    $(".ritp-edit #expectBeginDate").change(function () {
        var beginDateStr = $(".ritp-edit #expectBeginDate").val();
        var endDateStr = $(".ritp-edit #expectEndDate").val();
        var annualIncome = $(".ritp-edit #expectedAnnualYield").val();
        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-edit #ritpOften').val(data.data.dueDesc);
                        $('.ritp-edit #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    $(".ritp-edit #expectEndDate").change(function () {
        var beginDateStr = $(".ritp-edit #expectBeginDate").val();
        var endDateStr = $(".ritp-edit #expectEndDate").val();
        var annualIncome = $(".ritp-edit #expectedAnnualYield").val();

        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-edit #ritpOften').val(data.data.dueDesc);
                        $('.ritp-edit #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    $(".ritp-edit #expectedAnnualYield").change(function () {
        var beginDateStr = $(".ritp-edit #expectBeginDate").val();
        var endDateStr = $(".ritp-edit #expectEndDate").val();
        var annualIncome = $(".ritp-edit #expectedAnnualYield").val();

        if(beginDateStr.length != 0 && endDateStr.length != 0 && annualIncome.length != 0) {
            console.log(beginDateStr, endDateStr, annualIncome);
            $.ajax({
                type: 'GET',
                url: '/support/ritp/auto/calc',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: {beginDateStr: beginDateStr,endDateStr: endDateStr,annualIncome: annualIncome},
                success: function (data) {
                    if(data.errCode === '99999') {
                        alert("错误信息:"+data.errMsg);
                    } else {
                        $('.ritp-edit #ritpOften').val(data.data.dueDesc);
                        $('.ritp-edit #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })
    //提交数据
    $('.ritp-edit #submitData').on('click', function () {
        alert("提交数据");
        var ritp = {};
        var bool = true;
        ritp.ritpSummaryList = [];
        ritp.ritpSplitList = [];
        ritp.id = $('.ritp-edit #ritpId').val();
        ritp.name = $('.ritp-edit #name').val();
        ritp.fundCode = $('.ritp-edit #fundCode').val();
        ritp.unit = $('.ritp-edit #ritpUnit').val();
        ritp.beginDate = $('.ritp-edit #expectBeginDate').val();
        ritp.endDate = $('.ritp-edit #expectEndDate').val();
        ritp.annualIncome = $('.ritp-edit #expectedAnnualYield').val();
        ritp.incomeRate = $('.ritp-edit #effectiveYield').val();
        ritp.amount = $('.ritp-edit #totalAmount').val();
        ritp.showTime = $('.ritp-edit #displayTime').val();
        ritp.buyBeginTime = $('.ritp-edit #raiseBeginTime').val();
        ritp.buyEndTime = $('.ritp-edit #raiseEndTime').val();
        ritp.refundType = $('.ritp-edit #ritpRefundType').val();
        ritp.beginBanner = $('.ritp-edit #beginBanner').val();
        ritp.endBanner = $('.ritp-edit #endBanner').val();
        ritp.duraDays = $('.ritp-edit #ritpOften').val();
        ritp.due = $('.ritp-edit #showTime').val();
        ritp.dueUnit = $('.ritp-edit #due_unit').val();
        ritp.dueHint = $('.ritp-edit #showTimeIndroduction').val();
        ritp.referralNumber =$('.ritp-edit #ritpRecommendNo').val();
        ritp.referralTitle = $('.ritp-edit #ritpReferralTitle').val();


        var threeSplit = {};
        var fourSplit = {};
        threeSplit.num = $('.ritp-edit #threeAmount').val();
        threeSplit.amount = $('.ritp-edit #three').text();
        fourSplit.num = $('.ritp-edit #fourAmount').val();
        fourSplit.amount =  $('.ritp-edit #four').text();
        ritp.ritpSplitList.push(threeSplit);
        ritp.ritpSplitList.push(fourSplit);
        $('.ritp-edit table tbody tr').each(function (item) {
            var eachSummary = {};
            eachSummary.title = $(this).find("input").val();
            eachSummary.content = $(this).find("textarea").val();
            ritp.ritpSummaryList.push(eachSummary);
        })
        for(var key in ritp) {
            if(key != "endBanner") {
                if(ritp[key] == null || ritp[key] == "" ||ritp[key].length == 0) {
                    bool = false;
                    break;
                }
            }
        }

        if(!bool) {
            alert("所有字段不能为空,请检查是否有没填字段");
        } else {
            $.ajax({
                type: 'POST',
                url: '/support/ritp/edit',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: JSON.stringify(ritp),
                success: function (data) {
                    if(data.errCode === "00000") {
                        alert("修改成功");
                        location.href = "/support/ritp/list";
                    } else {
                        alert("修改失败: 请检查所填写的参数是否有误");
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    var i = 1;
    $('.ritp-edit #addTr').click(function () {
        var html = '<tr id="del'+i+'">' +
            ' <td><input type="text" class="title"  id="title" name="title"></td>'+
            ' <td> <textarea rows="5" id="content" name="content" class="form-control" ></textarea></td>'+
            '<td style="text-align:center;"><button type="button" class="btn btn-danger btn-xs" id="delete" name="del'+i+'">删除</button></td>'+
            '</tr>';
        $('.ritp-edit .canAddTr').append(html);
        i++;
    })

    $('.ritp-edit').delegate('#delete', "click", function () {
        var id = $(this).attr("name");
        $("#"+id).remove();
    })
}
riptedit.init();
module.exports = riptedit;
