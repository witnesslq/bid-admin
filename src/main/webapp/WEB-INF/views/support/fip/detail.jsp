<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="content-wrapper container">
    <div class="content-header">
        <h3>上传产品明细</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-8">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">产品分期列表</h3>
                    </div>
                    <div class="box-body">
                        <table class="table">
                            <tbody>
                            <tr>
                                <th>产品代码</th>
                                <th>产品名称</th>
                                <th>发行价格</th>
                                <th>上市日期</th>
                                <th>人数</th>
                            </tr>
                            <c:forEach var="productDetail" items="${productDetailList}">
                                <tr>
                                    <td>${productDetail.productCode}</td>
                                    <td>${productDetail.bondName}</td>
                                    <td>${productDetail.issuePrice}</td>
                                    <td><fmt:formatDate value="${productDetail.listedDate}" pattern="yyyy-MM-dd"/></td>
                                    <td>${productDetail.positionCountLimit}</td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>
