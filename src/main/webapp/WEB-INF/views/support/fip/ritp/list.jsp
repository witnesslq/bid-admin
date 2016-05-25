<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid trust-list">
    <div class="content-header">
        <h3>信诚产品列表</h3>
    </div>
    <div class="content">

        <c:forEach var="ritp" items="${ritpList}">
        <div class="box ">
            <div class="box-body">
                <div class="row" style="font-size: 17px">
                    <div class="col-xs-10" >
                        <div class="row">
                            <div class="col-xs-3" style="color: #009bc0; font-size: 19px"><strong>${ritp.name}(${ritp.productInfoId})</strong></div>
                            <div class="col-xs-2">${ritp.annualIncome}%</div>
                            <div class="col-xs-2">${ritp.duraDays}天</div>
                        </div>
                        <div class="row">&nbsp;</div>
                        <div class="row">
                            <div class="col-xs-5">开始募集: ${ritp.buyBeginTime}</div>
                            <div class="col-xs-5">结束募集: ${ritp.buyEndTime}</div>
                        </div>
                        <div class="row">
                            <div class="col-xs-5">预计开始计息: ${ritp.beginDate}</div>
                            <div class="col-xs-5">预计结束计息: ${ritp.endDate}</div>
                        </div>
                    </div>
                    <div class="col-xs-2">
                        <c:choose>
                            <c:when test="${ritp.preRead}">
                                <div class="row"><a class="btn btn-warning  btn-xs" href="/money/ritp/${ritp.id}/buy#/ritp-buy/input">预览</a></div>
                            </c:when>
                            <c:otherwise>
                                <div class="row"><a class="btn btn-warning  btn-xs" href="/money/ritp/${ritp.id}/buy#/ritp-buy/input">查看</a></div>
                            </c:otherwise>
                        </c:choose>
                        <div class="row">&nbsp; </div>
                        <c:if test="${ritp.update}">
                            <div class="row"><a class="btn btn-warning  btn-xs" href="/support/ritp/edit?id=${ritp.id} ">修改</a> </div>
                        </c:if>
                        <c:if test="${!ritp.update}">
                            <div class="row"><a class="btn btn-primary btn-xs">修改</a> </div>
                        </c:if>

                        <div class="row">&nbsp; </div>
                        <c:if test="${ritp.canBuy}">
                            <div class="row"><a class="btn btn-warning btn-xs"href="/support/ritp/buy?id=${ritp.id} ">购买</a> </div>
                        </c:if>
                        <c:if test="${!ritp.canBuy}">
                            <div class="row"><a class="btn btn-primary btn-xs">购买</a> </div>
                        </c:if>
                        <div class="row">&nbsp; </div>
                        <%--<c:if test="${ritp.canRedeem}">--%>
                            <div class="row"><a class="btn btn-warning btn-xs" href="/support/ritp/more?id=${ritp.id} ">更多</a> </div>
                        <%--</c:if>--%>
                        <%--<c:if test="${!ritp.canRedeem}">--%>
                            <%--<div class="row"><a class="btn btn-primary btn-xs">更多</a></div>--%>
                        <%--</c:if>--%>

                    </div>
                </div>
            </div>
        </div>
        </c:forEach>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>