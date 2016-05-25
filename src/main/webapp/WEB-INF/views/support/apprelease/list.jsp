<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper apprelease-list">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>app版本发布管理</h1>
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">
                    <c:choose>
                        <c:when test="${type == 'iPhone'}">
                            IOS
                        </c:when>
                        <c:when test="${type == 'Android'}">
                            Android
                        </c:when>
                        <c:otherwise>
                            未知
                        </c:otherwise>
                    </c:choose>
                    历史版本
                </h3>

                <div class="box-title">
                    <shiro:hasPermission name="apprelease:list">
                        <a class="btn btn-primary btn-sm" href="/support/app/release/${type}/latest">最新版本</a>
                    </shiro:hasPermission>
                </div>
            </div>
            <c:if test="${errorMsg != null}">
                <div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                        ${errorMsg}
                </div>
            </c:if>
            <!-- /.box-header -->
            <div class="box-body">
                <ul class="timeline">
                    <c:set var="tempDate" value=""/>
                    <c:forEach var="item" items="${list}">
                        <li>
                            <i class="fa bg-green">${item.id}</i>

                            <div class="timeline-item">
                                <span class="time"></span>

                                <h3 class="timeline-header">
                                    版本${item.version}ver${item.versionCode}(<fmt:formatDate value="${item.releaseDate}"
                                                                                            pattern="yyyy年MM月dd日"/>)
                                    <c:if test="${type == 'Android'}">
                                        <a class="btn btn-primary btn-sm" href="${item.downloadUrl}">下载</a>
                                    </c:if>
                                </h3>

                                <div class="timeline-body">
                                        <p>${item.versionContent}</p>
                                </div>
                                <div class="timeline-footer">
                                    <shiro:hasPermission name="apprelease:create">
                                        <a href="/support/app/release/${type}/create_page?id=${item.id}" role="button"
                                           class="btn btn-primary btn-sm">
                                            <i class="fa fa-edit"></i>
                                        </a>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="apprelease:delete">
                                        <a href="javascript:void(0);" data-id="${item.id}" role="button"
                                           class="btn btn-danger btn-sm del">
                                            <i class="fa fa-remove"></i>
                                        </a>
                                    </shiro:hasPermission>
                                </div>
                            </div>
                        </li>
                    </c:forEach>
                </ul>
            </div>
            <div class="box-footer">
                <form method="get" action="/support/app/release/${type}/list">
                    <div class="dataTables_paginate paging_simple_numbers">
                        <ul class="pagination">
                            <li class="paginate_button previous">
                                <a href="/support/app/release/${type}/list?pn=<c:choose><c:when test="${currentPage eq 1}">${currentPage}</c:when><c:otherwise>${currentPage-1}</c:otherwise></c:choose>"
                                   aria-label="Previous">
                                    <span aria-hidden="true">上一页</span>
                                </a>
                            </li>
                            <c:forEach var="i" begin="1" end="${totalPage}">
                                <li class="paginage_button <c:if test="${currentPage eq i}">active</c:if>"><a
                                        href="/support/app/release/${type}/list?&pn=${i}">${i}</a></li>
                            </c:forEach>
                            <li class="paginate_button next">
                                <a href="/support/app/release/${type}/list?&pn=<c:choose><c:when test="${currentPage < totalPage}">${currentPage+1}</c:when><c:otherwise>${totalPage}</c:otherwise></c:choose>"
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
                    <p>你确认要删除该条版本记录吗？</p>
                </div>
                <div class="modal-footer">
                    <button id="confirm_btn" class="btn btn-sm btn-danger">删除</button>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>