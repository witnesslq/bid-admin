<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid buyClass">
    <div class="content-header">
        <h3>BUY</h3>
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
                            <h4>1. 上传产品明细</h4>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <form id="uploadDetailForm" method="post" enctype="multipart/form-data">
                            <c:if test='${uploadDetail != "pass"}'>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <shiro:hasPermission name="fip:file">
                                            <input type="file" name="file" style="color: black" id="buyFile">
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
                            </c:if>
                            <c:if test='${uploadDetail == "pass"}'>
                                <div class="row" >
                                    <div class="col-md-4">
                                        <shiro:hasPermission name="fip:file">
                                            <input type="file" name="file" style="color: black" disabled>
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
                            </c:if>
                        </form>
                    </div>
                    <div id="uploadFileIdStatus">
                        <c:if test='${uploadDetail == "pass" or uploadDetail == "pass-active"}'>
                            <div class="col-md-2" id="detailResult" style="color: #0a0a0a">
                                交易完成<i class="fa fa-fw fa-check-square-o"></i>
                            </div>
                            <div class="col-md-2" id="detailResultUrl">
                                <a class="btn" href="/support/fip/${id}/detail">查看</a>
                            </div>
                        </c:if>
                    </div>


                </div>
            </div>
            <div class="inform" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>2. 通知长城基金后发起数据验证</h4>
                        </div>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a">
                        <shiro:hasPermission name="fip:operation">
                            <c:choose>
                                <c:when test='${inform == "active"}'>
                                    <input type="button" class="btn btn-danger btn-sm btn-block" id="inform"
                                           name="inform" value="已通知，发起验证"  >
                                </c:when>
                                <c:when test='${inform == "pass"}'>
                                    <input type="button" class="btn btn-danger btn-sm btn-block" id="inform"
                                           name="inform" value="已通知并验证通过" disabled >
                                </c:when>
                                <c:otherwise>
                                    <input type="button" class="btn btn-danger btn-sm btn-block" id="inform"
                                           name="inform" value="发起验证" disabled >
                                </c:otherwise>
                            </c:choose>
                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="informStatus">
                        <c:if test='${inform == "pass"}'>
                            已完成<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="pay" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>3. 发起非交易过户</h4>
                        </div>
                    </div>
                    <div class="col-md-2" >
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${pay == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="payId" name="pay" value="过户">
                            </c:if>
                            <c:if test='${pay != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="payId" name="pay" value="过户" disabled>
                            </c:if>
                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="payIdStatus">
                        <c:if test='${pay == "pass"}'>
                            交易完成<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                        <c:if test='${pay == "inProgress"}'>
                            进行中<i class="fa fa-fw fa-minus-circle"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="sms" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>4. 发送购买成功短信</h4>
                        </div>
                    </div>
                    <div class="col-md-2" >
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${sms == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="smsId" name="sms" value="发送">
                            </c:if>
                            <c:if test='${sms != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="smsId" name="sms" value="发送" disabled>
                            </c:if>
                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="smsIdStatus">
                        <c:if test='${sms == "pass"}'>
                            发送成功<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                        <c:if test='${sms == "inProgress"}'>
                            发送中<i class="fa fa-fw fa-minus-circle"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="generator" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>5. 生成销售明细表</h4>
                        </div>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a">
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${generate == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="generatorId"
                                       name="generator" value="生成" >
                            </c:if>
                            <c:if test='${generate != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="generatorId"
                                       name="generator" value="生成"disabled >

                            </c:if>

                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="generatorIdStatus">
                        <c:if test='${generate == "pass"}'>
                            已完成<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                        <c:if test='${generate == "inProgress"}'>
                            进行中<i class="fa fa-fw fa-minus-circle"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
            <div class="checkAndNotice" style="margin-top: 5%">
                <div class="row">
                    <div class="col-md-4">
                        <div style="margin: 0 10% 10% 10%;height:50px;background-color: #009bc0;text-align: center;
                          line-height:50px;overflow:hidden;border-radius:10%">
                            <h4>6. 核对并通知粤交所</h4>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <shiro:hasPermission name="fip:operation">
                            <c:if test='${check == "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="checkId" name="check" value="已核对" >
                            </c:if>
                            <c:if test='${check != "active"}'>
                                <input type="button" class="btn btn-danger btn-sm btn-block" id="checkId" name="check" value="已核对" disabled>
                            </c:if>
                        </shiro:hasPermission>
                    </div>
                    <div class="col-md-2" style="color: #0a0a0a" id="checkIdStatus">
                        <c:if test='${check == "pass"}'>
                            已完成<i class="fa fa-fw fa-check-square-o"></i>
                        </c:if>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>