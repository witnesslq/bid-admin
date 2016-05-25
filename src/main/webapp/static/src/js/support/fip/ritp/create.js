var ritpcreate = {};
var wrap = $('.ritp-create');
ritpcreate.init = function() {

    wrap.find('input[name="expectBeginDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="expectEndDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="displayTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="raiseBeginTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="raiseEndTime"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    $('.ritp-create #nextOne').on('click', function () {
        $('.ritp-create #tab1').attr("class", "");
        $('.ritp-create #baseinfo').attr("class", "tab-pane") ;

        $('.ritp-create #tab2').attr("class",  "active");
        $('.ritp-create #sendinfo').attr("class", "tab-pane active");

    })

    $('.ritp-create #totalAmount').on('change',  function () {
        var totalAmount = $('.ritp-create #totalAmount').val();
        if(totalAmount%3000000 == 1000000) {
            if((totalAmount - 1*4000000)/3000000 < 0) {
                alert("请检查总金额是否正确")
            } else {
                $('.ritp-create #threeAmount').val((totalAmount - 1*4000000)/3000000);
                $('.ritp-create #fourAmount').val(1);
            }
        } else if(totalAmount%3000000 == 2000000){
            $('.ritp-create #threeAmount').val((totalAmount - 2*4000000)/3000000);
            $('.ritp-create #fourAmount').val(2);
        } else if(totalAmount%3000000 == 0){
            $('.ritp-create #threeAmount').val(totalAmount/3000000);
            $('.ritp-create #fourAmount').val(0);
        } else {
            alert('请检查总金额是否正确');
        }
    })

    //上传及下载banner图
    $('.ritp-create #beginBannerBtn').on('click', function () {
        var formData = new FormData($('.ritp-create #formBegin')[0]);
        $.ajax({
            url: '/support/ritp/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.ritp-create #beginBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })
    $('.ritp-create #endBannerBtn').on('click', function () {
        var formData = new FormData($('.ritp-create #formEnd')[0]);
        $.ajax({
            url: '/support/ritp/banner/upload',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                $('.ritp-create #endBanner').val(returndata.data);
                alert("上传成功");
            },
            error: function (returndata) {
                alert("执行失败，原因：" + returndata.errMsg);
            }
        });
    })

//计算时长和年化收益率
    $(".ritp-create #expectBeginDate").change(function () {
        var beginDateStr = $(".ritp-create #expectBeginDate").val();
        var endDateStr = $(".ritp-create #expectEndDate").val();
        var annualIncome = $(".ritp-create #expectedAnnualYield").val();
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
                        $('.ritp-create #ritpOften').val(data.data.dueDesc);
                        $('.ritp-create #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    $(".ritp-create #expectEndDate").change(function () {
        var beginDateStr = $(".ritp-create #expectBeginDate").val();
        var endDateStr = $(".ritp-create #expectEndDate").val();
        var annualIncome = $(".ritp-create #expectedAnnualYield").val();

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
                        $('.ritp-create #ritpOften').val(data.data.dueDesc);
                        $('.ritp-create #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    $(".ritp-create #expectedAnnualYield").change(function () {
        var beginDateStr = $(".ritp-create #expectBeginDate").val();
        var endDateStr = $(".ritp-create #expectEndDate").val();
        var annualIncome = $(".ritp-create #expectedAnnualYield").val();

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
                        $('.ritp-create #ritpOften').val(data.data.dueDesc);
                        $('.ritp-create #effectiveYield').val(data.data.incomeRate);
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }
    })

    //提交数据
    $('.ritp-create #submitData').on('click', function () {
        alert("提交数据");
        var ritp = {};
        var bool = true;
        ritp.ritpSummaryList = [];
        ritp.ritpSplitList = [];
        ritp.name = $('.ritp-create #name').val();
        ritp.fundCode = $('.ritp-create #fundCode').val();
        ritp.unit = $('.ritp-create #ritpUnit').val();
        ritp.beginDate = $('.ritp-create #expectBeginDate').val();
        ritp.endDate = $('.ritp-create #expectEndDate').val();
        ritp.annualIncome = $('.ritp-create #expectedAnnualYield').val();
        ritp.incomeRate = $('.ritp-create #effectiveYield').val();
        ritp.amount = $('.ritp-create #totalAmount').val();
        ritp.showTime = $('.ritp-create #displayTime').val();
        ritp.buyBeginTime = $('.ritp-create #raiseBeginTime').val();
        ritp.buyEndTime = $('.ritp-create #raiseEndTime').val();
        ritp.refundType = $('.ritp-create #ritpRefundType').val();
        ritp.beginBanner = $('.ritp-create #beginBanner').val();
        ritp.duraDays = $('.ritp-create #ritpOften').val();
        ritp.due = $('.ritp-create #showTime').val();
        ritp.dueUnit = $('.ritp-create #due_unit').val();
        ritp.dueHint = $('.ritp-create #showTimeIndroduction').val();
        ritp.referralNumber =$('.ritp-create #ritpRecommendNo').val();
        ritp.endBanner = $('.ritp-create #endBanner').val();
        ritp.referralTitle = $('.ritp-create #ritpReferralTitle').val();

        var threeSplit = {};
        var fourSplit = {};
        threeSplit.num = $('.ritp-create #threeAmount').val();
        threeSplit.amount = 3000000;
        fourSplit.num = $('.ritp-create #fourAmount').val();
        fourSplit.amount = 4000000;
        ritp.ritpSplitList.push(threeSplit);
        ritp.ritpSplitList.push(fourSplit);
        $('.ritp-create table tbody tr').each(function (item) {
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
                url: '/support/ritp/create',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                dataType: "json",
                data: JSON.stringify(ritp),
                success: function (data) {
                    if(data.errCode === "00000") {
                        alert("创建成功");
                        location.href = "/support/ritp/list";
                    } else {
                        alert("创建失败: 请检查所填写的参数是否有误");
                    }
                },
                error: function (data) {
                    alert("异常！"+data.errMsg);
                }
            })
        }

    })

    var i = 1;
    $('.ritp-create #addTr').click(function () {

        var html = '<tr id="del'+i+'">' +
            ' <td><input type="text" class="title"  id="title" name="title"></td>'+
            ' <td> <textarea rows="5" id="content" name="content" class="form-control" ></textarea></td>'+
            '<td style="text-align:center;"><button type="button" class="btn btn-danger btn-xs" id="delete" name="del'+i+'">删除</button></td>'+
            '</tr>';
        $('.ritp-create .canAddTr').append(html);
        i++;
    })

    $('.ritp-create').delegate('#delete', "click", function () {
        var id = $(this).attr("name");
        $("#"+id).remove();
    })


}
ritpcreate.init();
module.exports = ritpcreate;
