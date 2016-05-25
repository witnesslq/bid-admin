<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid ritp-more">
    <div class="content-header">
        <div class="row">
            <h3>${name}
                <span class="pull-left" style="font-size: 20px">
                    <a style="color: green;" href="/support/ritp/more?id=${ritpId}">
                        <i class="fa fa-mail-reply-all"></i>
                    </a>
                </span>
                <span class="pull-right" style="margin-right: 4%">
                    <a class="btn btn-success" href="/support/ritp/more/record/detail?id=${operationId}">详情信息</a>
                </span>
            </h3>
        </div>
    </div>
    <div class="content">
        <input type="hidden" value="${ritpId}" id="ritpId">
        <input type="hidden" value="${ritpStatus}" id="ritpStatus">
        <input type="hidden" value="${operationId}", id="operationId">
        <section class="invoice ">
            <div class="row">
                <div class="col-xs-3 col-lg-offset-2">
                    <div class="box box-success">
                        <div class="box-body" style="text-align:center;">
                            <span class="box-number">1. 发送提醒短信</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 col-lg-offset-1">
                    <c:choose>
                        <c:when test='${smsRemind == "active"}'>
                            <button class="btn btn-block btn-success" id="smsRemind">发送</button>
                        </c:when>
                        <c:otherwise>
                            <button class="btn btn-block btn-success" id="smsRemind" disabled>发送</button>
                        </c:otherwise>
                    </c:choose>

                </div>
                <div class="col-sm-2 col-lg-offset-1" id="smsRemindStatus">
                    <c:choose>
                        <c:when test="${smsRemind == 'pass'}">
                            <span>发送成功<i class="fa fa-check-square"></i></span>
                        </c:when>
                    </c:choose>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-3 col-lg-offset-2">
                    <div class="box box-success">
                        <div class="box-body" style="text-align:center">
                            <span>2. 确认钱到账或17:00前可到账</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 col-lg-offset-1">
                    <c:choose>
                        <c:when test="${confirm == 'active'}">
                            <button class="btn btn-block btn-success" id="confirm">确认</button>
                        </c:when>
                        <c:otherwise>
                            <button class="btn btn-block btn-success" id="confirm" disabled>确认</button>
                        </c:otherwise>
                    </c:choose>
                </div>
                <div class="col-sm-2 col-lg-offset-1" id="confirmStatus">
                    <c:choose>
                        <c:when test="${confirm == 'pass'}">
                            <span>已确认<i class="fa fa-check-square"></i></span>
                        </c:when>
                    </c:choose>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-3 col-lg-offset-2">
                    <div class="box box-success">
                        <div class="box-body" style="text-align:center">
                            <span>3. 通知长城基金</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 col-lg-offset-1">
                    <c:choose>
                        <c:when test="${inform == 'active'}">
                            <button class="btn btn-block btn-success" id="inform">确认</button>
                        </c:when>
                        <c:otherwise>
                            <button class="btn btn-block btn-success" id="infrom" disabled>确认</button>
                        </c:otherwise>
                    </c:choose>
                </div>
                <div class="col-sm-2 col-lg-offset-1" id="infromStatus">
                    <c:choose>
                        <c:when test="${inform == 'pass'}">
                            <span>已确认<i class="fa fa-check-square"></i></span>
                        </c:when>
                    </c:choose>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-3 col-lg-offset-2">
                    <div class="box box-success">
                        <div class="box-body" style="text-align:center">
                            <span>4. 发起代客户申购</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 col-lg-offset-1">
                    <c:choose>
                        <c:when test="${buy == 'active'}">
                            <button class="btn btn-block btn-success" id="buy">申购</button>
                        </c:when>
                        <c:otherwise>
                            <button class="btn btn-block btn-success" id="buy" disabled>申购</button>
                        </c:otherwise>
                    </c:choose>
                </div>
                <div class="col-sm-2 col-lg-offset-1" id="buyStatus">
                    <c:choose>
                        <c:when test="${buy == 'pass'}">
                            <span>交易完成<i class="fa fa-check-square"></i></span>
                        </c:when>
                        <c:when test="${buy == 'inprocess'}">
                            <span>进行中<i class="fa fa-ellipsis-h"></i></span>
                        </c:when>
                    </c:choose>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-3 col-lg-offset-2">
                    <div class="box box-success">
                        <div class="box-body" style="text-align:center">
                            <span>5. 发送到账短信</span>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2 col-lg-offset-1" >
                    <c:choose>
                        <c:when test="${smsSuccess =='active'}">
                            <button class="btn btn-block btn-success" id="smsSuccess">发送</button>
                        </c:when>
                        <c:otherwise>
                            <button class="btn btn-block btn-success" id="smsSuccess" disabled>发送</button>
                        </c:otherwise>
                    </c:choose>
                </div>
                <div class="col-sm-2 col-lg-offset-1" id="smsSuccessStatus">
                    <c:choose>
                        <c:when test="${smsSuccess =='pass'}">
                            <span>发送完成<i class="fa fa-check-square"></i></span>
                        </c:when>
                    </c:choose>

                </div>
            </div>
        </section>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>