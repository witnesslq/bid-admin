var addCompany = {};
var wrap = $('.support-user-add-company');

addCompany.formSubmit = function() {
    var $selectCompany = wrap.find("#select-company");
    var $selectArea = wrap.find("#select-company-area");
    var $name = wrap.find("#name");

    var formReset = function() {
        if ($selectCompany.length > 0) {
            $selectCompany[0].selectedIndex = 0;
            $selectCompany.select2();
        }

        if ($selectArea.length > 0) {
            $selectArea[0].selectedIndex = 0;
            $selectArea.select2();
        }

        $name.val('');
    };

    formReset();

    wrap.find('#btn-submit').bind('click', function() {
        if ($.trim($name.val()) == '') {
            alert("单位名称不能为空");
            return false;
        }
        $.post("/support/user/add_company", wrap.find('#add-company-form').serialize(), function(data) {
            if(data.errCode == "00000") {
                alert("添加成功");
                //location.reload();
            } else {
                alert(data.errMsg);
            }
        });
    });
};

addCompany.init = function () {
    addCompany.formSubmit();
};
addCompany.init();

module.exports = addCompany;