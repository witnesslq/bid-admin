<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid trust-buy">
    <div class="content-header">
        <h3>BUY</h3>
    </div>
    <div class="content">
        <div class="box box-body">
            <input type="hidden" name="ritpId" id="ritpId" value="${id}">
            <input type="hidden" name="ritpInfoStatus" id="ritpInfoStatus" value="${ritpInfoStatus}">
            <section class="invoice">
                <div class="certification" style="margin-top: 2%">
                    <div class="row">
                        <div class="col-xs-3 col-lg-offset-2">
                            <div class="box box-success">
                                <div class="box-body" style="text-align:center;">
                                    <span class="box-number">1. 核对产品金额</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1">
                            <shiro:hasPermission name="ritp:operation">
                                <c:choose>
                                    <c:when test='${certification == "active"}'>
                                        <input type="button" class="btn btn-success btn-sm btn-block" id="certification"
                                               name="certification" value="核对"  >
                                    </c:when>
                                    <c:when test='${certification == "pass"}'>
                                        <input type="button" class="btn btn-success btn-sm btn-block" id="certification"
                                               name="certification" value="已核对成功" disabled >
                                    </c:when>
                                    <c:otherwise>
                                        <input type="button" class="btn btn-success btn-sm btn-block" id="certification"
                                               name="certification" value="核对" disabled >
                                    </c:otherwise>
                                </c:choose>
                            </shiro:hasPermission>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1" id="certificationStatus">
                            <c:if test='${certification == "pass"}'>
                                已完成<i class="fa fa-fw fa-check-square-o"></i>
                            </c:if>
                        </div>
                    </div>
                </div>
                <div class="inform" style="margin-top: 2%">
                    <div class="row">
                        <div class="col-xs-3 col-lg-offset-2">
                            <div class="box box-success">
                                <div class="box-body" style="text-align:center;">
                                    <span class="box-number">2. 通知长城基金</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1">
                            <shiro:hasPermission name="ritp:operation">
                                <c:choose>
                                    <c:when test='${inform == "active"}'>
                                        <input type="button" class="btn btn-success btn-sm btn-block" id="inform"
                                               name="inform" value="通知"  >
                                    </c:when>
                                    <c:when test='${inform == "pass"}'>
                                        <input type="button" class="btn btn-success btn-sm btn-block" id="inform"
                                               name="inform" value="已通知并验证通过" disabled >
                                    </c:when>
                                    <c:otherwise>
                                        <input type="button" class="btn btn-success btn-sm btn-block" id="inform"
                                               name="inform" value="通知" disabled >
                                    </c:otherwise>
                                </c:choose>
                            </shiro:hasPermission>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1" id="informStatus">
                            <c:if test='${inform == "pass"}'>
                                已完成<i class="fa fa-fw fa-check-square-o"></i>
                            </c:if>
                        </div>
                    </div>
                </div>
                <div class="pay" style="margin-top: 2%">
                    <div class="row">
                        <div class="col-xs-3 col-lg-offset-2">
                            <div class="box box-success">
                                <div class="box-body" style="text-align:center;">
                                    <span class="box-number">3. 发起非交易过户</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1">
                            <shiro:hasPermission name="ritp:operation">
                                <c:if test='${pay == "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="payId" name="pay" value="过户">
                                </c:if>
                                <c:if test='${pay != "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="payId" name="pay" value="过户" disabled>
                                </c:if>
                            </shiro:hasPermission>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1" id="payIdStatus">
                            <c:if test='${pay == "pass"}'>
                                交易完成<i class="fa fa-fw fa-check-square-o"></i>
                            </c:if>
                            <c:if test='${pay == "inProgress"}'>
                                进行中<i class="fa fa-fw fa-minus-circle"></i>
                            </c:if>
                        </div>
                    </div>
                </div>
                <div class="generator" style="margin-top: 2%">
                    <div class="row">
                        <div class="col-xs-3 col-lg-offset-2">
                            <div class="box box-success">
                                <div class="box-body" style="text-align:center;">
                                    <span class="box-number">4. 生成确认文件</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1">
                            <shiro:hasPermission name="fip:operation">
                                <c:if test='${generate == "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="generatorId"
                                           name="generator" value="生成" >
                                </c:if>
                                <c:if test='${generate != "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="generatorId"
                                           name="generator" value="生成"disabled >

                                </c:if>

                            </shiro:hasPermission>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1" id="generatorIdStatus">
                            <c:if test='${generate == "pass"}'>
                                已完成<i class="fa fa-fw fa-check-square-o"></i>
                            </c:if>
                        </div>
                    </div>
                </div>
                <div class="sendBuyFile" style="margin-top: 2%">
                    <div class="row">
                        <div class="col-xs-3 col-lg-offset-2">
                            <div class="box box-success">
                                <div class="box-body" style="text-align:center;">
                                    <span class="box-number">5. 向信托公司发送认购文件</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1">
                            <shiro:hasPermission name="fip:operation">
                                <c:if test='${sendFile == "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="sendFile" name="sendFile" value="发送">
                                </c:if>
                                <c:if test='${sendFile != "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="sendFile" name="sendFile" value="发送" disabled>
                                </c:if>
                            </shiro:hasPermission>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1"  id="sendFileStatus">
                            <c:if test='${sendFile == "pass"}'>
                                发送成功<i class="fa fa-fw fa-check-square-o"></i>
                            </c:if>
                        </div>
                    </div>
                </div>
                <div class="sms" style="margin-top: 2%">
                    <div class="row">
                        <div class="col-xs-3 col-lg-offset-2">
                            <div class="box box-success">
                                <div class="box-body" style="text-align:center;">
                                    <span class="box-number">6. 发送购买成功短信</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1" >
                            <shiro:hasPermission name="fip:operation">
                                <c:if test='${sms == "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="smsId" name="sms" value="发送">
                                </c:if>
                                <c:if test='${sms != "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="smsId" name="sms" value="发送" disabled>
                                </c:if>
                            </shiro:hasPermission>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1" id="smsIdStatus">
                            <c:if test='${sms == "pass"}'>
                                发送成功<i class="fa fa-fw fa-check-square-o"></i>
                            </c:if>
                        </div>
                    </div>
                </div>
                <div class="syncFile" style="margin-top: 2%">
                    <div class="row">
                        <div class="col-xs-2">
                            <input type="text" name="syncTime" id="syncTime" placeholder="文件同步时间" style="border-radius:10px;">
                        </div>
                        <div class="col-xs-3">
                            <div class="box box-success">
                                <div class="box-body" style="text-align:center;">
                                    <span class="box-number">7. 同步信托公司传来的文件</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1" >
                            <shiro:hasPermission name="fip:operation">
                                <c:if test='${syncFile == "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="syncFile" name="syncFile" value="确认">
                                </c:if>
                                <c:if test='${syncFile != "active"}'>
                                    <input type="button" class="btn btn-success btn-sm btn-block" id="syncFile" name="syncFile" value="确认" disabled>
                                </c:if>
                            </shiro:hasPermission>
                        </div>
                        <div class="col-sm-2 col-lg-offset-1" style="color: #0a0a0a" id="syncFileStatus">
                            <c:if test='${syncFile == "pass"}'>
                                确认成功<i class="fa fa-fw fa-check-square-o"></i>
                            </c:if>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>