<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid trust-confirm">
    <div class="content-header">
        <h3>信诚产品协议签署管理</h3>
    </div>
    <div class="content">
        <c:forEach var="ritp" items="${list}">
            <div class="box">
                <div class="box-body">
                    <div class="row">
                        <div class="col-xs-10" style="font-size: 17px">
                            <div class="row">
                                <div class="col-xs-4" style="color: #009bc0; font-size: 19px"><strong>${ritp.name}</strong></div>
                            </div>
                            <div class="row">&nbsp;</div>
                            <div class="row">
                                <div class="col-xs-2 col-lg-offset-2">${ritp.annualIncome}%</div>
                                <div class="col-xs-2">${ritp.duraDays}天</div>
                                <div class="col-xs-2">${ritp.amount}元</div>
                                <div class="col-xs-2">${ritp.bought}人购买</div>
                            </div>
                        </div>
                        <div class="col-xs-1">
                            <div class="row">&nbsp;</div>
                            <div class="row">&nbsp;</div>
                            <c:if test="${ritp.signAgreement == true}">
                                <a href="/support/ritp/confirm/detail?ritpId=${ritp.id}&name=${ritp.name}" role="button" id="signAgreement" class="btn btn-sm btn-warning">购买详情</a>
                            </c:if>
                            <c:if test="${ritp.signAgreement == false}">
                                <a role="button" id="signAgreement" class="btn btn-sm btn-primary">购买详情</a>
                            </c:if>
                        </div>
                    </div>
                </div>
            </div>
        </c:forEach>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>