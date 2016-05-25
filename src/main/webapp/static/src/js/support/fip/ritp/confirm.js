/**
 * Created by hnzb on 16/3/4.
 */

var ritpConfirm = {};
var wrap = $('.ritp-confirm');
ritpConfirm.init = function() {
    $('.ritp-confirm #del').click(function () {
        var id = $(this).attr("name");
        var name = $('.ritp-confirm #'+id).attr("name");
        if(confirm("您正在删除客户"+name+"的预约,删除预约之后,用户该笔预约将失效,可能导致产品不能达到募集金额,请您再次确认")){
            $.ajax({
                type: 'GET',
                url: '/support/ritp/deleteAppointment?transactionalId='+id,
            }).done(function (response) {
                location.reload();
            })

        }
    })
}
ritpConfirm.init();
module.exports = ritpConfirm;
