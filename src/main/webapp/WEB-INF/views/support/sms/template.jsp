<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="content-wrapper">
    <section class="content-header">
        <h1>短信模版管理</h1>
    </section>
    <section class="content">
        <shiro:hasPermission name="sms:template:createOrUpdate">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">修改或增加模版</h3>
                    </div>
                    <form method="post" action="/support/sms/template">
                        <input type="hidden" name="id" value="${modifySmsTemplate.id}"/>
                    <div class="box-body">
                            <div class="form-group">
                                <label for="template-name">名称</label>
                                <input type="text" class="form-control" name="name" id="template-name"
                                       value="${modifySmsTemplate!=null?modifySmsTemplate.name:''}"
                                       placeholder="请输入模版名称">
                            </div>
                            <div class="form-group">
                                <label for="template-content">模版内容</label>
                                <textarea  class="form-control" name="content" id="template-content" placeholder="请输入模版内容">${modifySmsTemplate!=null?modifySmsTemplate.content:''}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="template-channel-id">短信渠道</label>
                                <select class="form-control" name="channelId" id="template-channel-id">
                                    <c:forEach var="smsChannel" items="${smsChannels}">
                                        <option value="${smsChannel.id}" ${modifySmsTemplate!=null &&
                                        modifySmsTemplate.channelId==smsChannel.id?'selected':''} >${smsChannel.name}</option>
                                    </c:forEach>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>是否需要重试</label>
                                是 <input type="radio" name="isNeedRetry" value="true"
                                ${modifySmsTemplate.isNeedRetry?"checked":""} />

                                否 <input type="radio" name="isNeedRetry" value="false"
                                ${!modifySmsTemplate.isNeedRetry?"checked":""}/>
                            </div>
                    </div>
                    <div class="box-footer">
                            <button class="btn btn-primary" type="submit">提交</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </shiro:hasPermission>
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">短信模版列表</h3>
                    </div>
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                <th>编号</th>
                                <th>名称</th>
                                <th>模版</th>
                                <th>渠道</th>
                                <th>创建时间</th>
                                <th>修改</th>
                                </tr>
                            <c:forEach var="smsTemplate" items="${smsTemplates}">
                                <tr>
                                    <td>${smsTemplate.id}</td>
                                    <td>${smsTemplate.name}</td>
                                    <td>${smsTemplate.content}</td>
                                    <td>${smsChannelMap[smsTemplate.channelId].name}</td>
                                    <td>${smsTemplate.createdTime}</td>
                                    <td><a href="/support/sms/template?id=${smsTemplate.id}" class="btn">修改</a></td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>