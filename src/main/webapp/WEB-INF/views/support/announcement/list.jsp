<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper announcement-list">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>公告管理</h1>
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">公告列表</h3>

                <div class="box-tools">
                    <shiro:hasPermission name="announcement:create">
                        <a href="/support/announcement/create" class="btn btn-sm btn-success">
                            <i class="fa fa-plus"></i>
                        </a>
                    </shiro:hasPermission>
                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <ul class="timeline">
                    <c:set var="tempDate" value=""/>
                    <c:forEach var="item" items="${data}">
                        <c:set var="currentDate" value="${fn:substring(item.startTime, 0, 10)}"/>
                        <c:if test="${tempDate != currentDate}">
                            <li class="time-label">
                                <span class="bg-green">${currentDate}</span>
                            </li>
                            <c:set var="tempDate" value="${currentDate}"/>
                        </c:if>

                        <li>
                            <i class="fa bg-blue">${item.id}</i>

                            <div class="timeline-item">
                                <span class="time"></span>

                                <h3 class="timeline-header">
                                    <fmt:formatDate value="${item.startTime}" pattern="yyyy-MM-dd HH:mm:ss"/> 至
                                    <fmt:formatDate value="${item.endTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                                </h3>

                                <div class="timeline-body">
                                    <blockquote>${item.content}</blockquote>
                                    <label class="label bg-yellow">${item.channel}</label>
                                </div>
                                <div class="timeline-footer">
                                    <c:set var="now" value="<%=new java.util.Date()%>"/>
                                    <c:if test="${item.endTime > now}">
                                        <shiro:hasPermission name="announcement:update">
                                            <a href="/support/announcement/create?id=${item.id}" role="button"
                                               class="btn btn-primary btn-sm">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                        </shiro:hasPermission>
                                        <shiro:hasPermission name="announcement:delete">
                                            <a href="javascript:void(0);" data-id="${item.id}" role="button"
                                               class="btn btn-danger btn-sm del">
                                                <i class="fa fa-remove"></i>
                                            </a>
                                        </shiro:hasPermission>
                                    </c:if>
                                </div>
                            </div>
                        </li>
                    </c:forEach>
                </ul>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
                <form method="get" action="/support/feedback/list">
                    <div class="dataTables_paginate paging_simple_numbers">
                        <ul class="pagination">
                            <li class="paginate_button previous">
                                <a href="/support/announcement/list?pn=<c:choose><c:when test="${pn eq 1}">${pn}</c:when><c:otherwise>${pn-1}</c:otherwise></c:choose>"
                                   aria-label="Previous">
                                    <span aria-hidden="true">上一页</span>
                                </a>
                            </li>
                            <c:forEach var="i" begin="1" end="${count}">
                                <li class="paginage_button <c:if test="${pn eq i}">active</c:if>"><a
                                        href="/support/announcement/list?&pn=${i}">${i}</a></li>
                            </c:forEach>
                            <li class="paginate_button next">
                                <a href="/support/announcement/list?&pn=<c:choose><c:when test="${pn < count}">${pn+1}</c:when><c:otherwise>${count}</c:otherwise></c:choose>"
                                   aria-label="Next">
                                    <span aria-hidden="true">下一页</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <div id="confirm_delete_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    <h4 class="modal-title">删除确认</h4>
                </div>
                <div class="modal-body">
                    <p>你确认要删除该条公告吗？</p>
                </div>
                <div class="modal-footer">
                    <button id="confirm_btn" class="btn btn-sm btn-danger">删除</button>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>