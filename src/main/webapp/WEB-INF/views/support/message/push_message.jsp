<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="message-push content-wrapper">
    <section class="content-header">
        <button class="btn btn-primary btn-lg" id="messagePull">
            创建消息推送任务
        </button>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Push任务列表</h3>
                    </div>
                    <c:if test="${errorMsg != null}">
                        <div class="alert alert-danger alert-dismissable">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                            <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                                ${errorMsg}
                        </div>
                    </c:if>
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                            <tbody>
                            <tr>
                                <th>标题内容</th>
                                <th>内容</th>
                                <th>标签ID</th>
                                <th>schema</th>
                                <th>发送时间</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                            <c:forEach var="messagePushSend" items="${messagePushSendList}">
                                <tr>
                                    <td>${messagePushSend.title}</td>
                                    <td>${messagePushSend.content}</td>
                                    <td>${messagePushSend.tagId}</td>
                                    <td>${messagePushSend.schema}</td>
                                    <td>${messagePushSend.sendTime}
                                        <input class="pullTime" value="${messagePushSend.sendTime}" type="hidden"/>
                                        <input class="pullId" value="${messagePushSend.id}" type="hidden"/>
                                    </td>
                                    <td>${messagePushSend.createdTime}</td>
                                    <td><button class="btn btn-primary pullCancel">取消</button></td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <div class="modal fade messagePull-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
         aria-hidden="true" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="myLargeModalLabel"></h4>
                </div>
                <div id="name-table" class="modal-body">
                    <form id="push-form"  method="post" action="/support/message/push">
                        <div class="box-body">
                            <div class="form-group">
                                <input type="text" class="form-control" name="title" id="message-title"
                                       placeholder="消息标题" style="width:500px;height: 34px;">
                            </div>
                            <div class="form-group">
                                <textarea class="form-control validate" name="content" id="message-content"
                                          placeholder="消息内容" rows="5" style="width:500px;"></textarea>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="sendTime" id="message-send-time"
                                       placeholder="设定发送时间" style="width:500px;height: 34px;">
                            </div>
                            <div class="form-group">
                            <label for="actionType" class="col-sm-2 control-label">执行动作</label>
                            <div class="col-sm-4">
                                <select id="actionType" name="actionType" class="form-control" style="height: 34px;">
                                    <c:forEach var="item" items="${actions}">
                                        <option value="${item.key}" data-tips="${item.tips}">${item.value}</option>
                                    </c:forEach>
                                </select>
                            </div>
                            <div class="col-sm-5 hide">
                                <select id="nativePages" name="nativePages" class="form-control" style="height: 34px;">
                                    <option value="">请选择跳转页面</option>
                                    <c:forEach var="item" items="${native_pages}">
                                        <option value="${item.key}" data-tips="${item.tips}">${item.value}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                            <br>
                            <div class="form-group">

                                    <input type="text" id="actionValue" name="actionValue" class="form-control"
                                           style="width:500px;height: 34px;" placeholder="内容"/>
                            </div>




                            <div class="form-group">
                                <select name="tagId" id="message-tag-id" class="form-control" style="width:500px;height: 34px;">
                                    <option value="">请选择发送对象</option>
                                    <c:forEach var="tag" items="${tags}">
                                        <option value="${tag.id}">${tag.name}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button class="btn btn-primary" type="submit" id="pullSms">提交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>