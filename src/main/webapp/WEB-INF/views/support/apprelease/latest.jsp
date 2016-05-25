<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper apprelease-latest">
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
                    最新版本
                </h3>

                <div class="box-title">
                    <shiro:hasPermission name="apprelease:list">
                        <a class="btn btn-primary btn-sm" href="/support/app/release/${type}/list">历史版本</a>
                    </shiro:hasPermission>
                </div>

                <div class="box-tools">
                    <shiro:hasPermission name="apprelease:create">
                        <a href="/support/app/release/${type}/create_page" class="btn btn-sm btn-success">
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
            <!-- /.box-header -->
            <div class="box-body">
                <table class="table" border="2">
                    <tbody>
                    <tr>
                        <td class="">下载url</td>
                        <td class="">
                        ${info.downloadUrl}
                            <c:if test="${type == 'Android'}">
                                <a class="btn btn-primary btn-sm" href="${info.downloadUrl}">下载</a>
                            </c:if>
                        </td>
                    </tr>
                    <tr>
                        <td class="">发布时间</td>
                        <td class=""><fmt:formatDate value="${info.releaseDate}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                    </tr>
                    <tr>
                        <td class="">是否强制更新</td>
                        <td class="">
                            <c:choose>
                                <c:when test="${info.forceUpdate}">是</c:when>
                                <c:otherwise>否</c:otherwise>
                            </c:choose>
                        </td>
                    </tr>
                    <tr>
                        <td class="">版本号</td>
                        <td class="">${info.version}</td>
                    </tr>
                    <tr>
                        <td class="">md5</td>
                        <td class="">${info.md5Signature}</td>
                    </tr>
                    <tr>
                        <td class="">发布信息</td>
                        <td class="">${info.versionContent}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>