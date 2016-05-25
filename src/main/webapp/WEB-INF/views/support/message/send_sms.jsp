<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="message-sms content-wrapper">
    <section class="content-header">
        <button class="btn btn-primary btn-lg" id="messageCreate">
            创建短信发送任务
        </button>
    </section>
    <section class="content">

        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">短信任务列表</h3>
                    </div>
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                            <tbody>
                            <tr>
                                <th>内容</th>
                                <th>个人/群组</th>
                                <th>标签ID</th>
                                <th>电话</th>
                                <th>发送时间</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                            <c:forEach var="messageSmsSend" items="${messageSmsSendList}">
                                <tr>
                                    <td>${messageSmsSend.content}</td>
                                    <td><c:if test="${messageSmsSend.groupId==0}">
                                         个人
                                        </c:if>
                                        <c:if test="${messageSmsSend.groupId==1}">
                                            群组
                                        </c:if>

                                    </td>
                                    <td>${messageSmsSend.tagId}</td>
                                    <td>${messageSmsSend.phone}</td>
                                    <td>${messageSmsSend.sendTime}
                                        <input class="smsTime" value="${messageSmsSend.sendTime}" type="hidden"/>
                                        <input class="smsId" value="${messageSmsSend.id}" type="hidden"/>
                                    </td>
                                    <td>${messageSmsSend.createdTime}</td>
                                    <td>
                                        <button class="btn btn-primary smsCancel">取消</button>
                                    </td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <div class="modal fade message-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
         aria-hidden="true" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="myLargeModalLabel"></h4>
                </div>
                <div id="name-table" class="modal-body">
                    <form method="post" id="sms-form" action="/support/message/sms">
                        <div class="box-body">
                            <div class="form-group">
                                <label for="message-content">发送内容：</label>
                                <textarea class="form-control" name="content" id="message-content"
                                          placeholder="短信内容" rows="5" style="width:500px;"></textarea>
                                </br><span class="text-red"></span>
                            </div>
                            <div class="form-group">
                                <label for="message-send-time">发送时间：</label>
                                <input type="text" class="form-control" name="sendTime" id="message-send-time"
                                       placeholder="设定发送时间" style="width:500px;height: 34px">
                                </br> <span class="text-red"></span>
                            </div>
                            <div class="form-group">
                                <%--<label for="message-tag-id">发送对象：</label>--%>
                                <select name="groupId" id="message-group-id" class="form-control" style="width:500px;height: 34px;">
                                    <option value="0">个人</option>
                                    <option value="1">群组</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select name="tagId" id="message-sms-tag-id" class="form-control" style="width:500px;height: 34px;">
                                    <option value="">请选择发送对象</option>
                                    <c:forEach var="tag" items="${tags}">
                                        <option value="${tag.id}">${tag.name}</option>
                                    </c:forEach>
                                </select>
                                <input type="text" class="form-control" id="message-phone" name="phone"
                                       placeholder="输入个人手机号" style="width:500px;height: 34px;"/>
                            </div>
                        </div>
                        <div class="box-footer">
                            <button class="btn btn-primary" type="submit" id="messageSms">提交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>

