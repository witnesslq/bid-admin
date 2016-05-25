<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper support-user-add-result">
    <section class="content-header">
        <h1>用户管理</h1>
    </section>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">添加SAP用户结果</h3>
                <div class="box-tools">

                </div>
            </div>
            <div class="box-body table-responsive no-padding">
                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th>结果</th>
                        <th class="right-align">操作</th>
                    </tr>
                    <c:forEach items="${result}" var="resultItem">
                        <c:choose>
                            <c:when test="${resultItem.data != null}">
                                <tr>
                                    <td>${resultItem.errMsg}</td>
                                    <td class="right-align">
                                        <button class="btn btn-danger" data-id="${resultItem.data}">确定</button>
                                    </td>
                                </tr>
                            </c:when>
                            <c:when test="${resultItem.errCode == '0000'}">
                                <tr>
                                    <td>${resultItem.errMsg}</td>
                                    <td class="right-align"><i class="fa fa-check text-success"></i> </td>
                                </tr>
                            </c:when>
                            <c:when test="${resultItem.errCode == '9999'}">
                                <tr>
                                    <td>${resultItem.errMsg}</td>
                                    <td class="right-align"><i class="fa fa-alert text-danger"></i> </td>
                                </tr>
                            </c:when>
                            <c:otherwise>
                                <tr>
                                    <td>${resultItem.errMsg}</td>
                                    <td class="right-align"></td>
                                </tr>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>