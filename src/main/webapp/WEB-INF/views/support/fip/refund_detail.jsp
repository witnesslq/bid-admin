<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="content-wrapper container">
    <div class="content-header">
        <h3>回款明细</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-body">
                        <table class="table">
                            <tbody>
                            <tr>
                                <th>用户ID</th>
                                <th>交易日期</th>
                                <th>用户名</th>
                                <th>交易流水号</th>
                                <th>总金额</th>
                                <th>本金</th>
                                <th>利息</th>
                                <th>产品代码</th>
                            </tr>
                            <c:forEach var="refundDetail" items="${fipRefundDetailList}">
                                <tr>
                                    <td>${refundDetail.userId}</td>
                                    <td><fmt:formatDate value="${refundDetail.transactionDate}" pattern="yyyy-MM-dd"/></td>
                                    <td>${refundDetail.customerName}</td>
                                    <td>${refundDetail.transactionNo}</td>
                                    <td>${refundDetail.refundTotalAmount}</td>
                                    <td>${refundDetail.refundPrincipal}</td>
                                    <td>${refundDetail.refundInterest}</td>
                                    <td>${refundDetail.productCode}</td>
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
<script type="text/javascript">
    //    function getPath(obj) {
    //        if(obj) {
    //            if (window.navigator.userAgent.indexOf("MSIE")>=1) {
    //                obj.select();
    //                return document.selection.createRange().text;
    //            } else if(window.navigator.userAgent.indexOf("Firefox")>=1) {
    //                if(obj.files) {
    //                    return obj.files.item(0).getAsDataURL();
    //                }
    //                return obj.value;
    //            }
    //            return obj.value;
    //        }
    //    }
</script>