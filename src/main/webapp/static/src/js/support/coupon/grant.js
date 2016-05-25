var couponGrant = {};

couponGrant.selectTags = {};
couponGrant.tags = []

couponGrant.refreshSelectTag = function() {
    var $divSelectedTag = $(".coupon-grant #div-selected-tag");
    $divSelectedTag.html("");
    couponGrant.tags = []
    for(var key in couponGrant.selectTags) {
        couponGrant.tags.push(parseInt(key));
        var $div = $("<tr><td></td></tr>");
        $div.html(couponGrant.selectTags[key]+"<i class='fa fa-times close-tag'></i>");
        $div.attr("data-tag-id", key);
        $div.attr("data-tag-name", couponGrant.selectTags[key]);
        $div.appendTo($divSelectedTag);
    }
    $(".coupon-grant .close-tag").click(function(){
        delete couponGrant.selectTags[$(this).parent().attr("data-tag-id")];
        couponGrant.refreshSelectTag();
    });
};



couponGrant.init = function() {
    $(".coupon-grant #show-time").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".coupon-grant #begin-time").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".coupon-grant #end-time").datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    $(".coupon-grant #btn-add-tag").click(function(){
        couponGrant.selectTags[$(".coupon-grant #select-tag").val()] = $(".coupon-grant #select-tag").find("option:selected").text();
        couponGrant.refreshSelectTag();
    });

    $(".coupon-grant #btn-grant").click(function(){
        $(".coupon-grant #btn-grant").attr("disabled", true).addClass('disabled');
        var couponName = $(".coupon-grant #coupon-name").val();
        var couponAmount = $(".coupon-grant #coupon-amount").val();
        var couponDescription = $(".coupon-grant #coupon-description").val();
        var showTime = $(".coupon-grant #show-time").val();
        var beginTime = $(".coupon-grant #begin-time").val();
        var endTime = $(".coupon-grant #end-time").val();
        var fipId = $(".coupon-grant #coupon-fip-id").val();

        var postData =  {
            name: couponName,
            amount: Number(couponAmount),
            description: couponDescription,
            showTime: new Date(showTime+":00".replace(/-/,"/")).getTime(),
            beginTime: new Date(beginTime+":00".replace(/-/,"/")).getTime(),
            endTime:  new Date(endTime+":00".replace(/-/,"/")).getTime(),
            fipId: parseInt(fipId),
            tags: couponGrant.tags
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/support/coupon",
            method: "post",
            dataType: "json",
            data: JSON.stringify(postData),
            success: function(data) {
                if(data.errCode == '00000') {
                    alert("发放成功");
                    location.reload();
                } else {
                    alert(data.errMsg);
                }
                $(".coupon-grant #btn-grant").removeAttr('disabled').removeClass('disabled');
            }
        });
    });
};

couponGrant.init();
module.exports = couponGrant;
