<%@ include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container fip-create">
    <div class="content-header">
        <h3>修改FIP产品信息</h3>
        <input type="hidden" name="fipId" id="fipId" value=${info.id}>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-pills nav-justified">
                        <li class="active" id="tab4"><a href="#authority" data-toggle="tab">配置产品权限</a></li>
                        <li class="" id="tab1"><a href="#baseinfo" data-toggle="tab">基本信息</a></li>
                        <li class="" id="tab2"><a href="#sendinfo" data-toggle="tab">发行信息</a></li>
                        <li class="" id="tab3"><a href="#mujiinfo" data-toggle="tab">募集信息</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane" id="baseinfo">
                            <div  style="margin-top: 30px">
                                <div class="row" >
                                    <div class="col-xs-6">
                                        <label for="name" class="col-xs-3 control-label">产品名称</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="name" name="name" value="${info.name}">
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <label class="col-xs-3 control-label">合同编号</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="contractNo" name="contractNo" value="${info.contractNo}" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  style="margin-top: 25px">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label for="categoryDesc" class="col-xs-3 control-label">产品类型</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="categoryDesc" name="categoryDesc"value="${info.categoryDesc}" >
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <label for="refundType" class="col-xs-3 control-label">还款方式</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="refundType" name="refundType" value="${info.refundType}" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  style="margin-top: 25px">
                                <div class="row" >
                                    <label for="description" class="col-xs-3 control-label">购买说明</label>
                                    <div class="col-sm-8">
                                        <textarea  rows="5" style="overflow-y:visible" id="description" name="description" class="form-control">${info.description}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 25px">
                                <div class="row" >
                                    <label for="introduction" class="col-xs-3 control-label" >产品介绍</label>
                                    <div class="col-sm-8">
                                        <textarea  rows="5" style="overflow-y:visible" id="introduction" name="introduction" class="form-control" >${info.introduction}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 25px">
                                <div class="row" >
                                    <label for="buyHint" class="col-xs-3 control-label" >收益计算</label>
                                    <div class="col-sm-8">
                                        <textarea rows="5" id="buyHint" name="buyHint" class="form-control">${info.buyHint}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 25px" class="row">
                                <p class="col-sm-offset-4 col-sm-5">上传文件要求（尺寸:1920*300, 格式:jpg, 大小:小于200k）</p>
                            </div>
                            <div style="margin-top: 25px">

                                <form id="formBegin" method="post" enctype="multipart/form-data">
                                    <div class="row" >
                                        <label  class="col-xs-3 control-label" >开始banner</label>
                                        <div class="col-sm-3">
                                            <input type="file" name="file">
                                        </div>
                                        <div class="col-sm-4">
                                            <input type="text" name="beginBanner" id="beginBanner" value="${info.beginBanner}">
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="button"id="beginBannerBtn" value="上传" >
                                        </div>


                                    </div>
                                </form>

                            </div>
                            <div style="margin-top: 25px">

                                <form id="formEnd" method="post" enctype="multipart/form-data">
                                    <div class="row" >
                                        <label  class="col-xs-3 control-label" >结束banner</label>
                                        <div class="col-sm-3">
                                            <input type="file" name="file">
                                        </div>
                                        <div class="col-sm-4">
                                            <input type="text" name="endBanner" id="endBanner" value="${info.endBanner}">
                                        </div>
                                        <div class="col-sm-2">
                                            <input id="endBannerBtn" type="button" value="上传">
                                        </div>


                                    </div>
                                </form>

                            </div>


                            <div style="margin-top: 25px">
                                <div class="row" >
                                </div>
                            </div>

                            <div style="margin-top: 25px">
                                <div class="row" >
                                    <div class="form-group" >
                                        <div class="col-sm-offset-4 col-sm-4">
                                            <a class="btn btn-danger btn-block " id="nextOne">下一步</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="sendinfo">
                            <div class="form-horizontal">
                                <div class="form-group" style="margin-top: 30px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="minBuyAmount" class="col-xs-3 control-label" >单笔最小</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="minBuyAmount" name="minBuyAmount" value="${info.minBuyAmount}">
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="maxBuyAmount" class="col-xs-3 control-label">单笔最大</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="maxBuyAmount" name="maxBuyAmount" value="${info.maxBuyAmount}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="buyStepAmount" class="col-xs-3 control-label">步进值</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="buyStepAmount" name="buyStepAmount" value="${info.buyStepAmount}">
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="basicNo" class="col-xs-3 control-label">基础资产编号</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="basicNo" name="basicNo" value="${info.basicNo}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label  class="col-xs-3 control-label">计息日</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"  id="beginDate" name="beginDate" value="${info.beginDateStr}">
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="endDateStr" class="col-xs-3 control-label">到期日</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"  id="endDateStr" name="endDateStr"value="${info.endDateStr}" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label class="col-xs-4 control-label">年化收益率(%)</label>
                                            <div class="col-sm-7">
                                                <input type="text" class="form-control" id="annualIncome" name="annualIncome" value="${info.annualIncome}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="dueDesc" class="col-xs-3 control-label">时长</label>
                                            <div class="col-sm-6">
                                                <input type="text" class="form-control" id="dueDesc" name="dueDesc" value="${info.dueDesc}" disabled>
                                            </div>
                                            <div class="col-sm-1">
                                                <p>天</p>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="incomeRate" class="col-xs-4 control-label">实际收益率</label>
                                            <div class="col-sm-7">
                                                <input type="text" class="form-control" id="incomeRate" name="incomeRate" value="${info.incomeRate}" disabled>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-2 control-label">风险等级</label>
                                    <c:forEach var="item" items="${riskTypeList}">
                                        <c:choose>
                                            <c:when test="${info.riskInvestType eq item.key}">
                                                <div class="col-sm-1">
                                                    <label class="radio">
                                                        <input type="radio" name="riskInvestType" value="${item.key}" checked> ${item.value}
                                                    </label>
                                                </div>
                                            </c:when>
                                            <c:otherwise>
                                                <div class="col-sm-1">
                                                    <label class="radio">
                                                        <input type="radio" name="riskInvestType" value="${item.key}"> ${item.value}
                                                    </label>
                                                </div>
                                            </c:otherwise>
                                        </c:choose>
                                    </c:forEach>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="groupLimit" class="col-xs-3 control-label" >每组人数</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="groupLimit" name="groupLimit"value="${info.groupLimit}" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="col-sm-offset-4 col-sm-4">
                                        <a href="#timeline"class="btn btn-danger btn-block " id="nextTwo">下一步</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="mujiinfo" style="margin-top: 30px">
                            <div class="form-horizontal">
                                <div class="post">
                                    <div class="form-group ">
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <label for="amount" class="col-xs-3 control-label">产品总金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" id="amount" name="amount" value="${info.amount}">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <label for="showTimeStr" class="col-xs-3 control-label">对外显示时间</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" id="showTimeStr" name="showTimeStr" value="${info.showTimeStr}">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <label for="buyBeginTimeStr" class="col-xs-3 control-label">募集开始时间</label>
                                                <div class="col-sm-8">
                                                    <input type="datetime" class="form-control date-picker"  id="buyBeginTimeStr" name="buyBeginTimeStr" value="${info.buyBeginTimeStr}">
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <label for="buyEndTimeStr" class="col-xs-3 control-label">募集结束时间</label>
                                                <div class="col-sm-8">
                                                    <input type="datetime" class="form-control date-picker" id="buyEndTimeStr" name="buyEndTimeStr"value="${info.buyEndTimeStr}" >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="post">
                                    <input type="button" class="btn btn-danger" id="addFipBtn" value="新增募集时间">
                                </div>
                                <div id="muji">
                                    <c:forEach var="rule" items="${info.ruleList}" varStatus="status">
                                        <div class = "post" id="raise${status.count}">
                                            <div id="appFidTime">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-xs-6">
                                                            <label class="col-xs-3 control-label">开售时间</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control date-picker"  id="beginDateStr" name="beginDateStr" value="${rule.beginDateStr}">
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-6">
                                                            <label class="col-xs-3 control-label">开放金额</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" id="currentAmount" name="currentAmount" value="${rule.currentAmount}">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <label class="col-sm-2 control-label">开放渠道</label>
                                                        <c:if test="${rule.isWebOpen && rule.isAppOpen }">
                                                            <div class="col-sm-10">
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" name="openway1" checked> Web
                                                                </label>
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" name="openway2" checked> App
                                                                </label>
                                                            </div>
                                                        </c:if>
                                                        <c:if test="${rule.isWebOpen && !rule.isAppOpen}">
                                                            <div class="col-sm-10">
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" name="openway1" checked> Web
                                                                </label>
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" name="openway2" > App
                                                                </label>
                                                            </div>
                                                        </c:if>
                                                        <c:if test="${!rule.isWebOpen && rule.isAppOpen}">
                                                            <div class="col-sm-10">
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" name="openway1" > Web
                                                                </label>
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" name="openway2" checked> App
                                                                </label>
                                                            </div>
                                                        </c:if>
                                                        <c:if test="${!rule.isWebOpen && !rule.isAppOpen}">
                                                            <div class="col-sm-10">
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" name="openway1" > Web
                                                                </label>
                                                                <label class="checkbox-inline">
                                                                    <input type="checkbox" name="openway2" > App
                                                                </label>
                                                            </div>
                                                        </c:if>
                                                        <div class="col-lg-offset-10 col-xs-1" name="' + n + '">
                                                            <input type="button" class="btn btn-danger" id="deleteFip" name="raise${status.count}" value="删除">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </c:forEach>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="col-sm-offset-4 col-sm-4">
                                        <button class="btn btn-danger btn-block " id="submitUpdateForm">提交</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="active tab-pane" id="authority">
                            <div class="form-horizontal box-body">
                                <input type="hidden" id="input-fip-id" value="${fipId}"/>
                                <div class="form-group">
                                    <div class="alert alert-warning">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                        不配置默认任何用户都可以购买,配置后,仅拥有该标签的用户可以购买.
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 col-lg-offset-1">
                                        <span class="card-title teal-text">配置未拥有“已添加标签”用户看到的文案</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">

                                <div class="row">
                                    <div class="col-xs-11">
                                        <div class="form-group col-lg-offset-1">
                                            <label for="phone-error-msg">手机端</label>
                                            <textarea  rows="3" id="phone-error-msg"  class="form-control" rows="1">${phoneErrorMsg}</textarea>
                                        </div>
                                        <div class="form-group col-lg-offset-1">
                                            <label for="web-error-msg">网站端</label>
                                            <textarea  rows="3" id="web-error-msg" class="form-control" rows="1">${webErrorMsg}</textarea>
                                        </div>
                                        <shiro:hasPermission name="fip:tag_manage">
                                            <div class="form-group col-lg-offset-1">
                                                <a href="#" class="btn btn-primary" id="btn-confirm">确认文案</a>
                                            </div>
                                        </shiro:hasPermission>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-xs-11 col-lg-offset-1">
                                        <div class="box">
                                            <div class="box-header">
                                                <h3 class="box-title">已添加标签</h3>
                                            </div>
                                            <div class="box-body">
                                                <ul class="nav nav-pills nav-stacked">
                                                    <c:forEach var="fipTagId" items="${fipTags}">
                                                        <li> ${tagIdMap[fipTagId].name}
                                                            <c:if test="${tagIdMap[fipTagId].archived}">
                                                                <div class="chip">已归档</div>
                                                            </c:if>
                                                            <shiro:hasPermission name="fip:tag_manage">
                                                                <a href="#!" data-tag-id="${fipTagId}" id="btn-delete-tag"
                                                                   class="secondary-content"><i class="fa fa-fw fa-remove"></i>移除</a>
                                                            </shiro:hasPermission>
                                                        </li>
                                                    </c:forEach>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="box box-solid">
                                            <div class="box-header">
                                                <h3 class="box-title">未添加标签</h3>
                                            </div>
                                            <div class="box-body no-padding">
                                                <ul class="nav nav-pills nav-stacked">
                                                    <c:forEach var="tag" items="${unSelectTags}">
                                                        <c:if test="${!tag.archived}">
                                                            <li class="row">${tag.name}<shiro:hasPermission name="fip:tag_manage"><a href="#" data-tag-id="${tag.id}" id="btn-add-tag"><i class="fa fa-fw fa-plus-square"></i>添加</a></shiro:hasPermission></li>
                                                        </c:if>
                                                    </c:forEach>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.tab-pane -->
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>