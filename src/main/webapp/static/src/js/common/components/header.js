/**
 * Created by Nathan on 15/9/9.
 */
var header = {};

header.content = '我是页头';
header.init = function(){
    $('#header').append('<p>'+this.content+'</p>');
};

module.exports = header;