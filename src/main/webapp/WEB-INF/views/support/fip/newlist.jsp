<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid">
    <div class="content-header">
        <h3>产品列表</h3>
    </div>
    <div class="content">
        <div class="row" style="margin-bottom: 10px">
            <div class="col-xs-2">
                <a href="/support/fip/create" class="btn btn-block btn-linkedin">
                    新增FIP产品
                </a>
            </div>
            <div class="col-xs-10">
                <p style="color: rgba(215, 51, 13, 0.73); font-size: medium"> 新建产品前，请先发布产品合同，准备好banner图片，计划好发行期数!</p>
            </div>
        </div>
        <c:forEach var="fipDTO" items="${fipDTOList}">
            <div class="box">
                <div class="box-body">
                    <div class="row">
                        <div class="col-xs-11" style="font-size: 18px">
                            <div class="row">
                                <div class="col-xs-8"><strong>${fipDTO.name}</strong></div>
                                <c:choose>
                                    <c:when test="${fipDTO.status == 1}">
                                        <div class="col-xs-4">状态：热销中(${fipDTO.status})</div>
                                    </c:when>
                                    <c:when test="${fipDTO.status == 2}">
                                        <div class="col-xs-4">状态：已售罄(${fipDTO.status})</div>
                                    </c:when>
                                    <c:when test="${fipDTO.status < 10}">
                                        <div class="col-xs-4">状态：付款中(${fipDTO.status})</div>
                                    </c:when>
                                    <c:when test="${fipDTO.status == 10}">
                                        <div class="col-xs-4">状态：付款完毕(${fipDTO.status})</div>
                                    </c:when>
                                    <c:when test="${fipDTO.status == 99}">
                                        <div class="col-xs-4">状态：回款完毕(${fipDTO.status})</div>
                                    </c:when>
                                    <c:otherwise>
                                        <div class="col-xs-4">状态：回款中(${fipDTO.status})</div>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                            <div class="row">
                                <div class="col-xs-2">年化${fipDTO.annualIncome}%</div>
                                <div class="col-xs-2">${fipDTO.dueDesc} ${fipDTO.dueDescUnit}</div>
                                <div class="col-xs-4">${fipDTO.showTimeStr}对外开放</div>
                            </div>
                            <div class="row">&nbsp;</div>
                            <div class="row">
                                <div class="col-xs-4">开始募集：${fipDTO.buyBeginTimeStr}</div>
                                <div class="col-xs-4">结束募集：${fipDTO.buyEndTimeStr}</div>
                            </div>
                            <div class="row">
                                <div class="col-xs-4">开始计息：${fipDTO.beginDateStr}</div>
                                <div class="col-xs-4">结束计息：${fipDTO.endDateStr}</div>
                            </div>
                        </div>
                        <div class="col-xs-1">
                            <c:forEach var="fipButton" items="${fipDTO.buttons}">
                                <shiro:hasPermission name="${fipButton.shiro}">
                                    <div class="row">
                                        <c:choose>
                                            <c:when test="${fipButton.active}">
                                                <a style="color: rgba(255, 0, 0, 0.55)" class="btn" href="${fipButton.url}">${fipButton.text}</a>
                                            </c:when>
                                            <c:otherwise>
                                                <a class="btn disabled" href="${fipButton.url}">${fipButton.text}</a>
                                            </c:otherwise>
                                        </c:choose>
                                    </div>
                                </shiro:hasPermission>
                            </c:forEach>
                        </div>
                    </div>

                </div>
            </div>
        </c:forEach>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>