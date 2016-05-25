<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper announcement-gzbstatus-create">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>公告管理</h1>
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">新增业务</h3>
                <div class="box-tools">
                    <shiro:hasPermission name="announcement:gzblist">
                        <a href="/support/announcement/gzb/status/list" class="btn btn-sm btn-success">
                            <i class="fa fa-list"></i>
                        </a>
                    </shiro:hasPermission>
                </div>
            </div><!-- /.box-header -->
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
                            <label for="closeSign">
                                <input type="checkbox" name="closeSign" class="filled-in" id="closeSign"
                                       <c:if test="${close_sign}">checked</c:if> />
                                关闭签约
                            </label>
                        </div>
                        <div class="checkbox col-sm-2">
                            <label for="closePurchase">
                                <input type="checkbox" name="closePurchase" class="filled-in" id="closePurchase"
                                       <c:if test="${close_purchase}">checked</c:if> />
                                关闭购买
                            </label>
                        </div>
                        <div class="checkbox col-sm-2">
                            <label for="closeRegularRedeem">
                                <input type="checkbox" name="closeRegularRedeem" class="filled-in" id="closeRegularRedeem"
                                       <c:if test="${close_redeem}">checked</c:if> />
                                关闭赎回
                            </label>
                        </div>
                        <div class="checkbox col-sm-2">
                            <label for="closeRealtimeRedeem">
                                <input type="checkbox" name="closeRealtimeRedeem" class="filled-in" id="closeRealtimeRedeem"
                                       <c:if test="${close_realtime}">checked</c:if> />
                                关闭实时赎回
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label">业务类型</label>
                        <c:forEach items="${channelList}" var="channel">
                            <div class="input-group col-sm-6 col-sm-offset-2">
                                <span class="input-group-addon">
                                    <label for="channels-${channel.id}">
                                        <input type="checkbox" value="${channel.id}"
                                               name="channels" class="filled-in" id="channels-${channel.id}"
                                               <c:if test="${channel.notice != null}">checked</c:if> />
                                               ${channel.name}
                                    </label>
                                </span>
                                <input type="text" class="form-control" name="tipMsg_${channel.id}" value="${channel.notice}">
                            </div>
                            <br />
                        </c:forEach>
                    </div>
                </div>
                <div class="box-footer col-sm-12">
                    <input type="hidden" name="id" value="${id}">
                    <button type="reset" class="btn btn-default">重置</button>
                    <button type="submit" id="gzbStatus_addBtn" class="btn btn-primary pull-right">提交</button>
                </div>
            </form>
        </div>
    </section>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>