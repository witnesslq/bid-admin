var apibannercreate = {};
var wrap = $('.support-apibanner-create');

apibannercreate.create = function() {
    var disabledSubmitButton = function() {
        wrap.find('#btn-submit').attr('disabled', true).addClass('disabled');
    };
    var enabledSubmitButton = function() {
        wrap.find('#btn-submit').removeAttr('disabled').removeClass('disabled');
    };

    wrap.find('#add-api-banner-form').on('submit', function() {
        disabledSubmitButton();

        var $test = wrap.find('#file');
        if ($test.val() == '') {
            alert('请先提交图片');
            enabledSubmitButton();
            return false;
        }

        $test = wrap.find('#beginDate');
        if ($test.val() == null || $test.val() == '') {
            alert("开始时间不能为空");
            enabledSubmitButton();
            return false;
        }

        $test = wrap.find('#endDate');
        if ($test.val() == null || $test.val() == '') {
            alert("结束时间不能为空");
            enabledSubmitButton();
            return false;
        }

        $test = wrap.find('#actionType');
        if ($test.val() == null || $test.val() == '') {
            alert("执行动作不能为空");
            enabledSubmitButton();
            return false;
        }

        $test = wrap.find('#actionValue');
        if ($test.val() == null || $test.val() == '') {
            alert("内容不能为空");
            enabledSubmitButton();
            return false;
        }
    });

    wrap.find('#actionType').on('change', function() {
        var selectEm = $(this);
        var tips = (selectEm.find('option:selected').data('tips'));
        wrap.find('#actionValue').attr('placeholder', tips).val('');
        if ($(this).val() == 'embed') {
            wrap.find('#nativePages').parent().removeClass('hide');
            wrap.find('#actionValue').attr('readonly', true);
        } else {
            wrap.find('#nativePages').parent().addClass('hide');
            wrap.find('#actionValue').removeAttr('readonly');
        }

    }).change();

    wrap.find('#nativePages').on('change', function() {
        var selectEm = $(this);
        var tips = (selectEm.find('option:selected').data('tips'));
        wrap.find('#actionValue').val(tips);
    })
};


apibannercreate.init = function () {
    wrap.find('input[name="beginDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    wrap.find('input[name="endDate"]').datetimepicker({format: 'Y-m-d H:i', autoclose: true});
    apibannercreate.create();
};

apibannercreate.init();

module.exports = apibannercreate;