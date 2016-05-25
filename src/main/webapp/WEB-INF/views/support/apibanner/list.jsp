<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper apibanner-list">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>手机端banner管理</h1>
    </section>
    <!-- Main content -->
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">banner列表</h3>

                <div class="box-tools">
                    <shiro:hasPermission name="apibanner:create">
                        <a href="/support/api/banner/create_page" class="btn btn-sm btn-success">
                            <i class="fa fa-plus"></i>
                        </a>
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
            <c:if test="${alertMsg != null}">
                <div class="alert alert-success alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                        ${alertMsg}
                </div>
            </c:if>
            <!-- /.box-header -->
            <div class="box-body">
                <ul class="timeline">
                    <c:set var="tempDate" value=""/>
                    <c:forEach var="item" items="${list}">
                        <li>
                            <c:set var="now" value="<%=new java.util.Date()%>"/>
                            <c:choose>
                                <c:when test="${item.beginDate > now}">
                                    <i class="fa bg-yellow">${item.id}</i>
                                </c:when>
                                <c:when test="${item.endDate > now}">
                                    <i class="fa bg-green">${item.id}</i>
                                </c:when>
                                <c:otherwise>
                                    <i class="fa bg-grey">${item.id}</i>
                                </c:otherwise>
                            </c:choose>

                            <div class="timeline-item">
                                <span class="time"></span>

                                <h3 class="timeline-header">
                                    <fmt:formatDate value="${item.beginDate}" pattern="yyyy-MM-dd HH:mm:ss"/> 至
                                    <fmt:formatDate value="${item.endDate}" pattern="yyyy-MM-dd HH:mm:ss"/>
                                </h3>

                                <div class="timeline-body">
                                    <table class="table">
                                        <tbody>
                                        <tr>
                                            <th width="10%">title</th>
                                            <th width="10%">text</th>
                                            <th width="30%">imageUrl</th>
                                            <th width="6%">action</th>
                                            <th width="24%">value</th>
                                            <th width="10%">md5</th>
                                            <th width="10%">productInfo</th>
                                        </tr>
                                        <tr>
                                            <td class="">${item.title}</td>
                                            <td class="">${item.text}</td>
                                            <td class="">${item.imageUrl}</td>
                                            <td class="">${item.actionType}</td>
                                            <td class="">${item.actionValue}</td>
                                            <td class="">${item.md5}</td>
                                            <td class="">${item.productInfo}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="timeline-footer">
                                    <shiro:hasPermission name="apibanner:delete">
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
                    <p>你确认要删除该条banner吗？</p>
                </div>
                <div class="modal-footer">
                    <button id="confirm_btn" class="btn btn-sm btn-danger">删除</button>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>