<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="content-wrapper">
    <section class="content-header">
        <h1>短信通道管理</h1>
    </section>
    <section class="content">
        <shiro:hasPermission name="sms:channel:createOrUpdate">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">修改或增加通道</h3>
                    </div>
                    <form method="post" action="/support/sms/channel">
                        <input type="hidden" name="id" value="${modifySmsChannel.id}"/>
                        <div class="box-body">
                            <div class="form-group">
                                <label for="channel-name">名称</label>
                                <input type="text" class="form-control" name="name" id="channel-name"
                                       value="${modifySmsChannel!=null?modifySmsChannel.name:''}"
                                       placeholder="请输入通道名称">
                            </div>

                            <div class="form-group">
                                <label for="channel-urlTemplate">URL模版</label>
                                <textarea class="form-control" name="urlTemplate" id="channel-urlTemplate"
                                          placeholder="请填写url模版"
                                        >${modifySmsChannel!=null?modifySmsChannel.urlTemplate:''}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="channel-username">通道用户名</label>
                                <input type="text" class="form-control" name="username" id="channel-username"
                                       value="${modifySmsChannel!=null?modifySmsChannel.username:''}"
                                       placeholder="请输入通道用户名">
                            </div>
                            <div class="form-group">
                                <label for="channel-password">通道密码</label>
                                <input type="password" class="form-control" name="password" id="channel-password"
                                       value="${modifySmsChannel!=null?modifySmsChannel.password:''}"
                                       placeholder="请输入通道密码">
                            </div>
                            <div class="form-group">
                                <label for="channel-encoding">通道支持的编码方式</label>
                                <input type="text" class="form-control" name="encoding" id="channel-encoding"
                                       value="${modifySmsChannel!=null?modifySmsChannel.encoding:''}"
                                       placeholder="请输入通道编码方式, 例如：GBK、UTF-8等">
                            </div>
                            <div class="form-group">
                                <label for="channel-returnType">通道返回类型</label>
                                <input type="text" class="form-control" name="returnType" id="channel-returnType"
                                       value="${modifySmsChannel!=null?modifySmsChannel.returnType:''}"
                                       placeholder="请输入通道返回数据类型，例如：xml、json">
                            </div>
                            <div class="form-group">
                                <label for="channel-returnFiledNameBegin">返回码前置</label>
                                <input type="text" class="form-control" name="returnFiledNameBegin"
                                       id="channel-returnFiledNameBegin"
                                       value="${modifySmsChannel!=null?modifySmsChannel.returnFiledNameBegin:''}"
                                       placeholder="请输入返回码前置">
                            </div>
                            <div class="form-group">
                                <label for="channel-returnFiledNameEnd">返回码后置</label>
                                <input type="text" class="form-control" name="returnFiledNameEnd"
                                       id="channel-returnFiledNameEnd"
                                       value="${modifySmsChannel!=null?modifySmsChannel.returnFiledNameEnd:''}"
                                       placeholder="请输入返回码后置">
                            </div>
                            <div class="form-group">
                                <label for="channel-contentPrefix">内容前置</label>
                                <input type="text" class="form-control" name="contentPrefix"
                                       id="channel-contentPrefix"
                                       value="${modifySmsChannel!=null?modifySmsChannel.contentPrefix:''}"
                                       placeholder="请输入内容前置">
                            </div>
                            <div class="form-group">
                                <label for="channel-contentSuffix">内容后置</label>
                                <input type="text" class="form-control" name="contentSuffix"
                                       id="channel-contentSuffix"
                                       value="${modifySmsChannel!=null?modifySmsChannel.contentSuffix:''}"
                                       placeholder="请输入内容后置">
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
                                <th>名称</th>
                                <th>模版</th>
                                <th>通道用户名</th>
                                <th>返回类型</th>
                                <th>创建时间</th>
                                <th>修改</th>
                            </tr>
                            <c:forEach var="smsChannel" items="${smsChannels}">
                                <tr>
                                    <td>${smsChannel.name}</td>
                                    <td>${smsChannel.urlTemplate}</td>
                                    <td>${smsChannel.username}</td>
                                    <td>${smsChannel.returnType}</td>
                                    <td>${smsChannel.createdTime}</td>
                                    <td><a href="/support/sms/channel?id=${smsChannel.id}" class="btn">修改</a></td>
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

