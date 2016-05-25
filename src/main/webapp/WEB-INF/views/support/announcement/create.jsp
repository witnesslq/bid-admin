<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper announcement-create">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>公告管理</h1>
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">创建公告</h3>
                <div class="box-tools">
                    <shiro:hasPermission name="announcement:list">
                        <a href="/support/announcement/list" class="btn btn-sm btn-success">
                            <i class="fa fa-list"></i>
                        </a>
                    </shiro:hasPermission>
                </div>
            </div><!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal">
                <div class="box-body">
                    <div class="form-group">
                        <label for="startTime" class="col-sm-2 control-label">开始-结束时间</label>
                        <div class="col-sm-3">
                            <input name="startTime" id="startTime" type="text" class="form-control" value='${fn:substring(start_time, 0, 16)}'>
                        </div>
                        <div class="col-sm-3">
                            <input name="endTime" id="endTime" type="text" class="form-control" value='${fn:substring(end_time, 0, 16)}'>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label">业务类型</label>
                        <div class="checkbox col-sm-2">
                            <label for="seeBeforeLogin">
                                <input type="checkbox" name="seeBeforeLogin" id="seeBeforeLogin"
                                       <c:if test="${see_before_login==1}">checked</c:if> />未登录可见
                            </label>
                        </div>
                        <%--<div class="checkbox col-sm-2">--%>
                            <%--<label for="canClose">--%>
                                <%--<input type="checkbox" name="canClose" class="filled-in" id="canClose"--%>
                                       <%--<c:if test="${can_close==1}">checked</c:if> />可以关闭--%>
                            <%--</label>--%>
                        <%--</div>--%>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label">影响银行*</label>
                        <c:forEach items="${channelList}" var="channel">
                            <div class="checkbox col-sm-2">
                                <label for="channels-${channel.id}">
                                    <input type="checkbox" value="${channel.id}"
                                           name="channels" class="filled-in" id="channels-${channel.id}"
                                           <c:if test="${fn:contains(support_channel, channel.id)}">checked</c:if> />${channel.name}
                                </label>
                            </div>
                        </c:forEach>
                    </div>

                    <div class="form-group">
                        <label for="content" class="col-sm-2 control-label">内容*</label>
                        <div class="col-sm-6">
                            <textarea id="content" name="content" class="form-control">${content}</textarea>
                        </div>
                    </div>
                </div><!-- /.box-body -->
                <div class="box-footer col-sm-12">
                    <input type="hidden" name="id" value="${id}">
                    <button type="reset" class="btn btn-default">重置</button>
                    <button type="submit" id="announcement_addBtn" class="btn btn-primary pull-right">提交</button>
                </div><!-- /.box-footer -->
            </form>
        </div>
    </section><!-- /.content -->
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>