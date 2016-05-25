<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid redeemClass">
    <div class="content-header">
        <h3>REDEEM</h3>
    </div>
    <div class="content">
        <div class="box box-body" style="color: white">
            <input type="hidden" name="fipId" id="fipId" value="${id}">
            <input type="hidden" name="fipInfoStatus" id="fipInfoStatus" value="${fipInfoStatus}">
            <div class="betail">
                <div class="row">
                    <div class="col-md-4">
                        <div id="uploadFile" style="margin: auto 10% 10% 10%;height:55px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>1. 上传回款明细</h4>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <form id="uploadDetailForm" method="post" enctype="multipart/form-data">
                            <c:choose>
                                <c:when test='${uploadDetail == "active" or uploadDetail == "pass-active"}'>
                                    <div class="row" >
                                        <div class="col-md-6">
                                            <shiro:hasPermission name="fip:file">
                                                <input type="file" name="file" style="color: black" id="redeemFile">
                                            </shiro:hasPermission>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-top: 10px">
                                        <div class="col-md-8">
                                            <shiro:hasPermission name="fip:file">
                                                <input type="button" class="btn btn-danger btn-sm btn-block" id="uploadFileId" value="上传文件" >
                                            </shiro:hasPermission>
                                        </div>
                                    </div>
                                </c:when>
                                <c:otherwise>
                                    <div class="row" >
                                        <div class="col-md-4">
                                            <shiro:hasPermission name="fip:file">
                                                <input type="file" name="file" id="redeemFile" style="color: black" disabled>
                                            </shiro:hasPermission>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-top: 10px">
                                        <div class="col-md-8">
                                            <shiro:hasPermission name="fip:file">
                                                <input type="button" class="btn btn-danger btn-sm btn-block"
                                                       id="uploadFileId" value="上传文件" disabled>
                                            </shiro:hasPermission>
                                        </div>
                                    </div>
                                </c:otherwise>
                            </c:choose>
                        </form>
                    </div>
                    <div id="uploadFileIdStatus">
                        <c:if test='${uploadDetail == "pass" or uploadDetail == "pass-active"}'>
                            <div class="col-md-2" id="detailResult" style="color: #0a0a0a">
                                交易完成<i class="fa fa-fw fa-check-square-o"></i>
                            </div>
                            <div class="col-md-2" id="detailResultUrl">
                                <a class="btn" href="/support/fip/${id}/refundDetail">查看</a>
                            </div>
                        </c:if>
                    </div>
                </div>
            </div>
            <div class="remindSms" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>2. 发送短信提醒</h4>
                        </div>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a">
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${remindSms == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="remindSms"
                                       name="remindSms" value="发送"  >
                            </c:if>
                            <c:if test='${remindSms != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="remindSms"
                                       name="remindSms" value="发送" disabled >
                            </c:if>
                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="remindSmsStatus">
                        <c:if test='${remindSms == "pass"}'>
                            发送完成<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                        <c:if test='${remindSms == "inProgress"}'>
                            发送中<i class="fa fa-fw fa-minus-circle"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="confirmReceiveMoney" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>3. 确认钱到账或17:00前可到</h4>
                        </div>
                    </div>
                    <div class="col-md-2" >
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${confirmReceiveMoney == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="confirmReceiveMoney" name="confirmReceiveMoney" value="确认">
                            </c:if>
                            <c:if test='${confirmReceiveMoney != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="confirmReceiveMoney" name="confirmReceiveMoney" value="确认" disabled>
                            </c:if>
                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="confirmReceiveMoneyStatus">
                        <c:if test='${confirmReceiveMoney == "pass"}'>
                            已确认<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="informFund" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>4. 通知长城基金</h4>
                        </div>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a">
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${informFund == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="informFund"
                                       name="informFund" value="确认" >
                            </c:if>
                            <c:if test='${informFund != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="informFund"
                                       name="informFund" value="确认"disabled >

                            </c:if>

                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="informFundStatus">
                        <c:if test='${informFund == "pass"}'>
                            已确认<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>

                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="refund" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>5. 发起代客户申购</h4>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${refund == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="refund" name="refund" value="申购" >
                            </c:if>
                            <c:if test='${refund != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="refund" name="refund" value="申购" disabled>
                            </c:if>
                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="refundStatus">
                        <c:if test='${refund == "pass"}'>
                            交易完成<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                        <c:if test='${refund == "inProgress"}'>
                            进行中<i class="fa fa-fw fa-minus-circle"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="finalSms" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>6. 发送到账短信</h4>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${finalSms == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="finalSms" name="finalSms" value="发送" >
                            </c:if>
                            <c:if test='${finalSms != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="finalSms" name="finalSms" value="发送" disabled>
                            </c:if>
                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" is="finalSmsStatus">
                        <c:if test='${finalSms == "pass"}'>
                            发送完成<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                        <c:if test='${finalSms == "inProgress"}'>
                            发送中<i class="fa fa-fw fa-minus-circle"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>