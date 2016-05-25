/**
 * Created by marksu on 15/9/25.
 */
var fipInfo = {};
fipInfo.init = function(){
    $(".fip-info [name='begin_date']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".fip-info [name='end_date']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".fip-info [name='buy_begin_time']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".fip-info [name='buy_end_time']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});

    //$("[name='buyEndTimeStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //$("[name='buyBeginTimeStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //$(" [name='showTimeStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //$(" [name='endDateStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //$(" [name='beginDateStr']").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    //

    $(".fip-info #fip-info-submit").click(function(){
        var postData = {
            id: $(".fip-info input[name='id']").val(),
            name: $(".fip-info [name='name']").val(),
            minBuyAmount: $(".fip-info [name='min_buy_amount']").val(),
            maxBuyAmount: $(".fip-info [name='max_buy_amount']").val(),
            buyStepAmount: $(".fip-info [name='buy_step_amount']").val(),
            amount: $(".fip-info [name='amount']").val(),
            beginDateStr: $(".fip-info [name='begin_date']").val() + ":00",
            endDateStr: $(".fip-info [name='end_date']").val() + ":00",
            appId: $(".fip-info [name='app_id']").val(),
            signType: $(".fip-info [name='sign_type']").val(),
            groupLimit: $(".fip-info [name='group_limit']").val(),
            annualIncome: $(".fip-info [name='annual_income']").val(),
            incomeRate: $(".fip-info [name='income_rate']").val(),
            dueDesc: $(".fip-info [name='due_desc']").val(),
            dueDescUnit: $(".fip-info [name='due_desc_unit']").val(),
            keyword: $(".fip-info [name='keyword']").val(),
            charge: $(".fip-info [name='charge']").val(),
            riskInvestType: $(".fip-info [name='risk_invest_type']:checked").val(),
            description: $(".fip-info [name='description']").val(),
            refundType: $(".fip-info [name='refund_type']").val(),
            amountDesc: $(".fip-info [name='amount_desc']").val(),
            phase: $(".fip-info [name='phase']").val(),
            categoryDesc: $(".fip-info [name='category_desc']").val(),
            introduction: $(".fip-info [name='introduction']").val(),
            buyHint: $(".fip-info [name='buy_hint']").val(),
            qa: $(".fip-info [name='qa']").val(),
            totalAmount: $(".fip-info [name='total_amount']").val(),
            buyBeginTimeStr: $(".fip-info [name='buy_begin_time']").val() + ":00",
            buyEndTimeStr: $(".fip-info [name='buy_end_time']").val() + ":00"
        };

        $.ajax({
            jsonp: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/fip/handle_info",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $(".fip-info #fip-info-submit").attr('disabled', 'disabled');
            },
            complete: function() {
                $(".fip-info #fip-info-submit").removeAttr('disabled');
            },
            success: function (data) {
                if (data.errCode == "00000") {
                    alert("修改成功！");
                    location.reload();
                } else {
                    alert("修改失败，原因：" + data.errMsg);
                }
            }

        });
    });
};
fipInfo.init();
module.exports = fipInfo;