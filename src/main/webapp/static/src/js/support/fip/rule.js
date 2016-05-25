/**
 * Created by marksu on 15/9/25.
 */
var fipRule = {};
fipRule.init = function(){
    $('.fip-rule input.date-picker').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $('.fip-rule .btn-submit').on('click', function() {
        var currentIndex = $(this).attr('data-index');
        var bDate = $(".fip-rule input[name='beginDate_" + currentIndex + "']").val() + ":00.0";
        var eDate = $(".fip-rule input[name='endDate_" + currentIndex + "']").val() + ":00.0";
        var amountValue = $(".fip-rule input[name='amount_" + currentIndex + "']").val();
        var totalAmountValue = $(".fip-rule input[name='totalAmount_" + currentIndex + "']").val();
        var typeValue = $(".fip-rule input[name='type_" + currentIndex + "']").val();
        var fipIdValue = $(".fip-rule input[name='fipId_" + currentIndex + "']").val();

        var postData = {
            beginDate: bDate,
            endDate: eDate,
            amount: amountValue,
            totalAmount: totalAmountValue,
            id: currentIndex,
            type: typeValue,
            fipId: fipIdValue
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/fip/handle_rule",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            beforeSend: function() {
                $('.fip-rule .btn-submit').attr('disabled', 'disabled');
            },
            complete: function() {
                $('.fip-rule .btn-submit').removeAttr('disabled');
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
fipRule.init();
module.exports = fipRule;