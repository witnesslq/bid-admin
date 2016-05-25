var couponList = {};

couponList.init = function() {
    $(".coupon-list #btn-cancel-grant").click(function(){
        if(confirm("你确信要取消["+$(this).attr("data-batch-name")+"]粮票？")){
            $.ajax({
                headers: {
                    'Accept': 'application/json'
                },
                url: "/support/coupon?batchId="+$(this).attr("data-batch-id"),
                type: "delete",
                dataType: "json",
                success:function(data){
                    location.reload();
                }
            });
        }
    });

};

couponList.init();
module.exports = couponList;