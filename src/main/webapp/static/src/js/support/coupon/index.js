var couponIndex = {};

couponIndex.init = function(){
    $(".coupon-index #btn-search").click(function(){
        var number = $(".coupon-index #input-number").val();
        if(number == "") {
            alert("请输入粮票编号");
        } else {
            location.href="/support/coupon?number="+number;
        }
    });
};

couponIndex.init();
module.exports = couponIndex;