var helpers = {};

helpers.formValidateSuccessTips = function($inputObject, $msg) {
    $inputObject.removeClass('invalid').addClass('valid');
    $inputObject.next('label').attr('data-success', $msg);
}

helpers.formValidateErrorTips = function($inputObject, $msg) {
    $inputObject.removeClass('valid').addClass('invalid');
    $inputObject.next('label').attr('data-error', $msg);
}

module.exports = helpers;