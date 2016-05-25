var feedbackList = {};

feedbackList.getStatusHtml = function(status) {
    var html = "";
    if (status == "1") {
        html = '<i class="icon fa fa-warning text-red"></i>';
    }
    if (status == "2") {
        html = '<i class="glyphicon glyphicon-time text-yellow"></i>';
    }
    if (status == "3") {
        html = '<i class="glyphicon glyphicon-ok-circle text-green"></i>';
    }
    return html;
}
feedbackList.formatDate = function(timestamp) {
    var fdate = new Date(timestamp);
    return fdate.toLocaleString();
}
feedbackList.init = function() {
    var disabledCleanButton = function() {
        $('.feedback-list #clean').attr('disabled', true).addClass('disabled');
    };
    var enabledCleanButton = function() {
        $('.feedback-list #clean').removeAttr('disabled').removeClass('disabled');
    };
    $('.feedback-list #clean').on('click', function () {
        disabledCleanButton();
        $.ajax({
            type: 'POST',
            url: '/support/feedback/clean',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            dataType: "json",
            success: function (data) {
                enabledCleanButton();
                alert(data.errMsg);
                if(data.errCode == "00000") {
                    location.reload();
                }
            },
            error: function (data) {
                enabledCleanButton();
                alert("异常！"+data);
            }
        })

    });
    var $nameLinkList = $('.feedback-list .name');
    var $contentLinkList = $('.feedback-list .cnt');
    var $phoneLinkList = $('.feedback-list .phone');

    var $feedbackModal = $('div.feedback-modal');
    var $feedbackModalTitle = $feedbackModal.find('.modal-title');
    var $feedbackModalBody = $feedbackModal.find('.modal-body');
    var $feedbackModalFooter = $feedbackModal.find('.modal-footer');

    $nameLinkList.each(function(){
        $(this).unbind("click").bind("click", function(){
            var url = "/support/feedback/user?uid=" + $(this).attr("id");
            var userName = $(this).text();

            $feedbackModalFooter.html('');
            $feedbackModalTitle.text(userName);
            $feedbackModalBody.html('');

            $.ajax({
                url: url,
                dataType:"json",
                method: "get",
                success:function(data) {
                    if (data.errCode == "00000") {
                        var html="<div class='table-responsive no-padding'><table class='table table-bordered table-hover'>";
                        html += '<thead><tr><th>内容</th><th width="175px;">日期</th></tr></thead><tbody>';
                        var num = data.data.length;
                        for(var i = 0; i < num; i++) {
                            html += '<tr>';
                            html += '<td>' + feedbackList.getStatusHtml(data.data[i].status) + '<span style="word-wrap:break-word; word-break:break-all;">' + data.data[i].content + '</span></td><td>' + feedbackList.formatDate(data.data[i].createdTime) + '</td>';
                            html += '</tr>';
                        }
                        html += "</tbody></table></div>";
                        $feedbackModalBody.html(html);
                    } else {
                        $feedbackModalBody.text("获取数据失败！失败原因：" + data.errMsg);
                    }
                }
            });
            $feedbackModal.modal();
        });
    });

    $phoneLinkList.each(function(){
        $(this).unbind("click").bind("click", function(){
            var feedbackId = $(this).attr("data-id");

            var listenSubmit = function(data, $sendButton) {
                $sendButton.unbind("click").bind("click", function() {
                    var postData = {
                        feedbackId: data.data.id,
                        phone: data.data.phone,
                        msg: $("#reply_content").val()
                    };

                    $.ajax({
                        jsonp: false,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        url: "/support/feedback/send_msg",
                        method: "post",
                        dataType: "json",
                        data: JSON.stringify(postData),
                        beforeSend: function() {
                            $("#send").attr('disabled', 'disabled');
                        },
                        complete: function() {
                            $("#send").removeAttr('disabled');
                        },
                        success:function(data) {
                            if (data.errCode == "00000") {
                                //$feedbackModal.modal('hide');
                                requestContent();
                                console.log($feedbackModal.find('i').attr('class'));
                            } else {
                                alert("发送短信失败，原因：" + data.errorMsg);
                            }
                        }
                    });
                });
            };

            var writeContent = function (data) {
                $feedbackModalTitle.text("短信回复 " + ((data.data.userName==null) ? " " : data.data.userName + "(" + data.data.phone + ")"));
                var html = "";
                html += '<div style="word-wrap:break-word; word-break:break-all;"><blockquote>' + feedbackList.getStatusHtml(data.data.status) + " <span>" + data.data.content + '</span></blockquote></div>';
                html += "<div class='table-responsive no-padding'><table class='table table-bordered table-hover' >";
                html += '<thead><tr><td>内容</td><td width="175px;">日期</td></tr></thead><tbody>';
                var num = data.data.replies.length;
                for(var i = 0; i < num; i++) {
                    html += '<tr>';
                    html += '<td style="word-wrap:break-word; word-break:break-all;">' + data.data.replies[i].content + '</td><td>' + feedbackList.formatDate(data.data.replies[i].createTime) + '</td>';
                    html += '</tr>';
                }
                html += "</tbody></table></div>";
                html += '<div class="form-group"><textarea class="form-control" id="reply_content" rows="5" placeholder="请输入短信内容"></textarea></div>';

                $feedbackModalBody.html(html);

                var $sendButton = $('<button id="send" type="button" class="btn btn-success">发送</button>');
                $feedbackModalFooter.html($sendButton);
                listenSubmit(data, $sendButton);
            };

            var requestContent = function() {
                var url = "/support/feedback/reply_detail?id=" + feedbackId;

                $feedbackModalTitle.text('');
                $feedbackModalBody.html('');

                $.ajax({
                    url: url,
                    dataType:"json",
                    method: "get",
                    success:function(data) {
                        if (data.errCode == "00000") {
                            writeContent(data);
                        } else {
                            $feedbackModalBody.text("获取数据失败！失败原因：" + data.errMsg);
                        }
                    }
                });
            };

            $feedbackModal.modal();
            requestContent();
        });
    });

    $contentLinkList.each(function(){
        $(this).unbind("click").bind("click", function(){
            var url = "/support/feedback/detail?id=" + $(this).attr("id");

            $feedbackModalFooter.html('');
            $feedbackModalTitle.text("详情");
            $feedbackModalBody.html("");

            $.ajax({
                url: url,
                dataType:"json",
                method: "get",
                success:function(data) {
                    if (data.errCode == "00000") {
                        var html="<div class='table-responsive no-padding'><table class='table table table-bordered table-hover' style='word-wrap:break-word; word-break:break-all;'>";
                        html += "<tr><td  style='width:80px;'>姓名:</td><td>" + data.data.userName + "</td></tr>";
                        html += "<tr><td>公司:</td><td>" + data.data.userCompany + "</td></tr>";
                        html += "<tr><td>手机:</td><td><a href='/support/user/info?phone="+ data.data.phone+"' >" + data.data.phone + "</a></td></tr>";
                        html += "<tr><td>内容:</td><td style='word-wrap:break-word; word-break:break-all;'>" + data.data.content + "</td></tr>";
                        html += "<tr><td>用户信息:</td><td>" + data.data.userEnv + "</td></tr>";
                        html += "<tr><td>解决状态:</td><td id='status'>" + feedbackList.getStatusHtml(data.data.status) + "</td></tr>";
                        html += "<tr><tdcolspan='2'></td></tr>";
                        html += "</table></div>";

                        $feedbackModalBody.html(html);

                        var listenBtn = false;
                        if (data.data.status == 1) {
                            var btnClass = "btn-warning";
                            var btnText = "开始解决";
                            listenBtn = true;
                        }
                        if (data.data.status == 2) {
                            var btnClass = "btn-success";
                            var btnText = "已经解决";
                            listenBtn = true;
                        }
                        if (listenBtn) {
                            var $htmlFooterButtonUndo = $('<button class="btn" type="button" />').addClass(btnClass)
                                .attr('data-id', data.data.id).attr('data-status', data.data.status).text(btnText);
                            $feedbackModalFooter.html($htmlFooterButtonUndo);

                            $htmlFooterButtonUndo.bind('click', function() {
                                var id = $(this).attr("data-id");
                                var status = $(this).attr("data-status");
                                var changeStatus = parseInt(status) + 1;
                                $.ajax({
                                    url: "/support/feedback/change_status?fbid=" + id + "&status=" + changeStatus,
                                    dataType:"json",
                                    method:"get",
                                    success:function(data) {
                                        if (data.errCode == "00000") {

                                            if (status == 1) {
                                                //修改为已将解决
                                                $('button[class="btn btn-warning"]').removeClass(btnClass).addClass('btn-success').attr('data-id', id).attr('data-status', '2').text('已经解决');
                                            }
                                            if (status == 2) {
                                                window.location.reload();
                                            }
                                            //window.location.reload();
                                        } else {
                                            alert("更改状态失败。原因：" + data.errMsg);
                                        }
                                    }
                                });
                            });
                        }

                    } else {
                        $feedbackModalBody.text("获取数据失败！失败原因：" + data.errMsg);
                    }
                }
            });

            $feedbackModal.modal();
        });
    });
};
feedbackList.init();
module.exports = feedbackList;