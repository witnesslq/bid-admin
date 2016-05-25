var addUser = {};
var wrap = $('.support-user-add');
var batchWrap = $('.support-user-add-batch');
var resultWrap = $('.support-user-add-result');

var helpers = require('../../common/components/helpers');

addUser.addBySingle = function() {
    var disabledSubmitButton = function() {
        wrap.find('#btn-submit').attr('disabled', true).addClass('disabled');
    };
    var enabledSubmitButton = function() {
        wrap.find('#btn-submit').removeAttr('disabled').removeClass('disabled');
    };

    wrap.find('#add-user-form').on('submit', function() {
        disabledSubmitButton();

        if (wrap.find('#select-company').val() == null) {
            alert("公司不能为空");
            enabledSubmitButton();
            return false;
        }
    });
};

addUser.addByBatch = function() {
    batchWrap.find('#add-user-list-form').on('submit', function() {
        var $selectCompany = batchWrap.find('#select-company');
        var $file = batchWrap.find('#file');
        if ($selectCompany.val() == null) {
            alert('请先选择公司');
            return false;
        }

        if ($file.val() == '') {
            alert('请先提交文件');
            return false;
        }
        batchWrap.find('#btn-submit').addClass('disabled').attr('disabled', true);
    });
};

addUser.acceptSapChange = function() {
    resultWrap.find('button.btn-danger').on('click', function() {
        var acceptBtn = $(this);
        resultWrap.find('button.btn-danger').attr('disabled', true).addClass('disabled');
        $.post("/support/user/accept_sap_change", {'id': $(this).attr('data-id')}, function(data) {
            if(data.errCode == "00000") {
                alert("修改成功");
                acceptBtn.after('<i class="fa fa-check text-success"></i>');
                acceptBtn.remove();
            } else {
                alert(data.errMsg);
            }
            resultWrap.find('button.btn-danger').removeAttr('disabled').removeClass('disabled');
        });
    })
};


addUser.init = function () {
    wrap.find('#select-company').select2();
    addUser.addBySingle();

    batchWrap.find('#select-company').select2();
    addUser.addByBatch();

    addUser.acceptSapChange();
};

addUser.init();

module.exports = addUser;