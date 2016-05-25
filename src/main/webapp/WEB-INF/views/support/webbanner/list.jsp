<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper  container-fluid web-banner">
    <div class="content-header">
        <h3>Web端banner列表</h3>
    </div>
    <div class="content">
        <c:forEach var="banner" items="${list}">
            <div class="box">
                <div class="box-body">
                    <table class="table" >
                        <tbody>
                        <tr>
                            <th>内容</th>
                            <%--<td width="80%">${banner.htmlContent}</td>--%>
                            <td width="80%" style="word-wrap:break-word;"><c:out value=" ${ banner.htmlContent } " escapeXml="true" /></td>
                        </tr>
                        <tr>
                            <th>图片地址</th>
                            <td >${banner.src}</td>
                        </tr>
                        <tr>
                            <th>打开地址</th>
                            <td>${banner.url}</td>
                        </tr>
                        <tr>
                            <th>页面类型</th>
                            <c:choose>
                                <c:when test="${banner.target == 1}">
                                    <td>本页面</td>
                                </c:when>
                                <c:otherwise>
                                    <td>新页面</td>
                                </c:otherwise>
                            </c:choose>
                        </tr>

                        <tr>
                            <th>banner类型</th>
                            <c:choose>
                                <c:when test="${banner.type == 1}">
                                    <td>图片</td>
                                </c:when>
                                <c:when test="${banner.type == 2}">
                                    <c:if test="${banner.productType == 1 }">
                                        <td>fip</td>
                                    </c:if>
                                    <c:if test="${banner.productType == 2 }">
                                        <td>ritp</td>
                                    </c:if>
                                </c:when>
                                <c:otherwise>
                                    <td>html类</td>
                                </c:otherwise>
                            </c:choose>
                        </tr>
                        <tr>
                            <th>开始时间</th>
                            <td>${banner.beginTime}</td>
                        </tr>
                        <tr>
                            <th>结束时间</th>
                            <td>${banner.endTime}</td>
                        </tr>
                        <tr>
                            <th>操作</th>
                            <c:if test="${banner.type != 2}">
                                <td width="25%">
                                    <shiro:hasPermission name="webbanner:update">
                                        <a href="/support/web/banner/update?id=${banner.id}">修改</a>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="webbanner:delete">
                                        <a href="#" id = "delBanner" name="${banner.id}">删除</a>
                                    </shiro:hasPermission>
                                </td>
                            </c:if>
                            <c:if test="${banner.type == 2}">
                                <td width="25%">
                                    <a >修改</a>
                                    <a >删除</a>
                                </td>
                            </c:if>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </c:forEach>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>