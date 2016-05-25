<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<jsp:useBean id="now" class="java.util.Date" />
<div class="content-wrapper container coupon-list">
    <div class="content-header">
        <h3>粮票批次列表</h3>
    </div>

    <div class="content">
        <div class="row" style="margin-bottom: 10px;">
            <div class="col-xs-12">
                <a class="btn btn-primary" href="/support/coupon/grant">发放粮票</a>
            </div>
        </div>
        <c:forEach var="couponBatch" items="${couponBatches}">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box box-info">
                        <div class="box-header">
                            <h3 class="box-title">${couponBatch.name} - ${fipDTOMap[couponBatch.fipId].name} -
                            ${couponBatch.amount}元</h3>
                        </div>
                        <div class="box-body">
                            <div class="chip">${couponBatchCountMap[couponBatch.id]}张</div>
                            <c:if test="${couponBatchCountMap[couponBatch.id] == 0}">
                                <div class="chip red lighten-2 right">已取消</div>
                            </c:if>
                            <c:if test="${couponBatch.showTime.time>now.time and couponBatchCountMap[couponBatch.id]
                            != 0}">
                                <a class="btn red lighten-2 right" id="btn-cancel-grant"
                                   data-batch-id="${couponBatch.id}" data-batch-name="${couponBatch.name}" href="#">取消发送
                                </a>
                            </c:if>
                            <p class="grey-text">${couponBatch.description}</p>
                            <div class="grey-text">
                                发送时间:
                                <span class="chip"><fmt:formatDate value="${couponBatch.createdTime}" pattern="yyyy-MM-dd HH:mm:ss"/></span>
                                有效期:
                            <span class="chip teal lighten-5">
                            <fmt:formatDate value="${couponBatch.beginTime}" pattern="yyyy-MM-dd HH:mm:ss"/> ~
                            <fmt:formatDate value="${couponBatch.endTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                            </span>
                                显示时间:
                                <span class="chip"><fmt:formatDate value="${couponBatch.showTime}" pattern="yyyy-MM-dd HH:mm:ss"/></span>
                                <a class="btn btn-primary" id="btn-download-coupon-batch"
                                   href="/support/coupon/download?couponBatchId=${couponBatch.id}">下载名单</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </c:forEach>
    </div>
</div>

<%@include file="/WEB-INF/views/common/common_footer.jsp"%>
