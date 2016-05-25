<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper feedback-list">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>反馈管理</h1>
    </section>
    <!-- Main content -->
    <section class="content">
        <!-- Default box -->
        <div class="box box-primary">
            <div class="box-header with-border">
                <i class="fa fa-comments"></i>

                <h3 class="box-title">反馈列表</h3>

                <div class="box-tools pull-right">
                    <div class="btn-group">
                        <a href="/support/feedback/list?status=0" class="btn btn-sm btn-primary">
                            <c:if test="${status==0}"><i class="fa fa-check"></i></c:if> 全部</a>
                        <a href="/support/feedback/list?status=1" class="btn btn-sm btn-danger">
                            <c:if test="${status==1}"><i class="fa fa-check"></i></c:if> 未解决</a>
                        <a href="/support/feedback/list?status=2" class="btn btn-sm btn-warning">
                            <c:if test="${status==2}"><i class="fa fa-check"></i></c:if> 正在解决</a>
                        <a href="/support/feedback/list?status=3" class="btn btn-sm btn-success">
                            <c:if test="${status==3}"><i class="fa fa-check"></i></c:if> 已解决</a>
                    </div>
                </div>
            </div>
            <div class="box-body table-responsive no-padding">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <td width="10%">姓名</td>
                        <td width="50%">内容</td>
                        <td width="13%">手机号</td>
                        <td width="15%">公司</td>
                        <td width="12%">日期</td>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach var="feedbacks" items="${feedbackList}">
                        <tr>
                            <td>
                                <c:if test="${feedbacks.userName!=''}">
                                    <a href="javascript:void(0);" class="name"
                                       id="${feedbacks.userId}">${feedbacks.userName}</a>
                                </c:if>
                            </td>
                            <td class="cnt" id="${feedbacks.id}" style="word-wrap:break-word; word-break:break-all;">
                                <a href="javascript:void(0);">
                                    <c:choose>
                                        <c:when test="${feedbacks.status == 1}">
                                            <i class="icon fa fa-warning text-red"></i>
                                        </c:when>
                                        <c:when test="${feedbacks.status == 2}">
                                            <i class="glyphicon glyphicon-time text-yellow"></i>
                                        </c:when>
                                        <c:when test="${feedbacks.status == 3}">
                                            <i class="glyphicon glyphicon-ok-circle text-green"></i>
                                        </c:when>
                                    </c:choose>
                                    <span>${feedbacks.content}</span>
                                </a>
                            </td>
                            <td class="phone" data-id="${feedbacks.id}" data-phone="${feedbacks.phone}">
                                <a href="javascript:void(0);">${feedbacks.phone}</a>
                            </td>
                            <td class="">${feedbacks.userCompany} </td>
                            <td class=""><fmt:formatDate value="${feedbacks.createdTime}"
                                                         pattern="yyyy-MM-dd HH:mm:ss"/></td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <div class="row">
                    <div class="col-sm-8">
                        <form method="get" action="/support/feedback/list">
                            <div class="dataTables_paginate paging_simple_numbers">
                                <ul class="pagination">
                                    <li class="paginate_button previous"><a
                                            href="/support/feedback/list?status=${status}&pn=<c:choose><c:when test="${pn eq 1}">${pn}</c:when><c:otherwise>${pn-1}</c:otherwise></c:choose>">上一页</a>
                                    </li>
                                    <li class="paginage_button active"><a href="#!">${pn} / ${count}</a></li>
                                    <li class="paginate_button next"><a
                                            href="/support/feedback/list?status=${status}&pn=<c:choose><c:when test="${pn < count}">${pn+1}</c:when><c:otherwise>${count}</c:otherwise></c:choose>">下一页</a>
                                    </li>
                                    <li class="col-sm-2">
                                        <div class="input-group">
                                            <input type="hidden" name="status" value="${status}"/>
                                            <input type="number" class="form-control" name="pn" min="1" max="${count}"
                                                   value="${pn}" placeholder="${pn}">
                                <span class="input-group-btn">
                                  <button class="btn btn-info btn-flat" type="submit">Go!</button>
                                </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    <div class="col-sm-4">
                        <div class="dataTables_paginate paging_simple_numbers">
                            <ul class="pagination pull-right">
                                <shiro:hasPermission name="feedback:send_msg">
                                    <input type="button" class="btn btn-danger btn-sm btn-block" id="clean"
                                           name="clean" value="清除重复反馈">
                                </shiro:hasPermission>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.box-footer-->
        </div>
        <!-- /.box -->
    </section>
    <!-- /.content -->

    <div class="modal fade feedback-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="myLargeModalLabel"></h4>
                </div>
                <div id="name-table" class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" id="send" class="btn btn-success" style="display: none;">发送</button>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>