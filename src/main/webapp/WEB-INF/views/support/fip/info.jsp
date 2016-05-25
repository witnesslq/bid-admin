<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="content-wrapper container fip-info">
    <div class="content-header">
        <h3>修改产品信息</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-body">
                        <form id="createForm" class="col s12">
                            <div class="form-group">
                                <label class="active" data-error="" for="names">产品名称</label>
                                <input type="text" name="name" id="names" class="form-control validate" placeholder=""
                                       value="${info.name}">
                            </div>
                            <div class="form-group">
                                <label class="active" data-error="" for="min_buy_amount">最小购买金额</label>
                                <input type="text" name="min_buy_amount" id="min_buy_amount"
                                       class="form-control validate"
                                       placeholder="" value="${info.minBuyAmount}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="max_buy_amount">最大购买金额</label>
                                <input type="text" name="max_buy_amount" id="max_buy_amount"
                                       class="form-control validate"
                                       placeholder="" value="${info.maxBuyAmount}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="buy_step_amount">步增金额</label>
                                <input type="text" name="buy_step_amount" id="buy_step_amount"
                                       class="form-control validate"
                                       placeholder="" value="${info.buyStepAmount}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="amount">购买总额度</label>
                                <input type="text" name="amount" id="amount" class="form-control validate"
                                       placeholder=""
                                       value="${info.amount}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="begin_date">收益开始时间</label>
                                <input type="text" name="begin_date" id="begin_date" class="form-control validate"
                                       placeholder=""
                                       value="${info.beginDateStr}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="end_date">收益结束时间</label>
                                <input type="text" name="end_date" id="end_date" class="form-control validate"
                                       placeholder="" value="${info.endDateStr}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="app_id">支付appId</label>
                                <input disabled="disabled" type="text" name="app_id" id="app_id"
                                       class="form-control validate" placeholder=""
                                       value="${info.appId}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="sign_type">签名类型</label>
                                <input disabled="disabled" type="text" name="sign_type" id="sign_type"
                                       class="form-control validate"
                                       placeholder="" value="${info.signType}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="group_limit">每组人数</label>
                                <input type="text" name="group_limit" id="group_limit" class="form-control validate"
                                       placeholder=""
                                       value="${info.groupLimit}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="annual_income">预期年化收益</label>
                                <input type="text" name="annual_income" id="annual_income" class="form-control validate"
                                       placeholder="" value="${info.annualIncome}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="income_rate">预期收益率</label>
                                <input type="text" name="income_rate" id="income_rate" class="form-control validate"
                                       placeholder="" value="${info.incomeRate}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="due_desc">期限</label>
                                <input type="text" name="due_desc" id="due_desc" class="form-control validate"
                                       placeholder=""
                                       value="${info.dueDesc}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="due_desc_unit">期限单位</label>
                                <input type="text" name="due_desc_unit" id="due_desc_unit"
                                       class="form-control validate"
                                       placeholder=""
                                       value="${info.dueDescUnit}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="keyword">产品关键字</label>
                                <input type="text" name="keyword" id="keyword" class="form-control validate"
                                       placeholder=""
                                       value="${info.keyword}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="charge">手续费</label>
                                <input type="text" name="charge" id="charge" class="form-control validate"
                                       placeholder=""
                                       value="${info.charge}">
                            </div>
                            <div class="form-group">
                                <label>风险等级</label>
                                <div class="row">
                                <c:forEach var="riskType" items="${riskTypeList}">
                                    <div class="radio col-xs-2">
                                        <label for="riskInvestType${riskType.key}">
                                        <input type="radio" name="risk_invest_type"
                                               id="riskInvestType${riskType.key}"
                                               value="${riskType.key}"
                                               <c:if test="${info.riskInvestType == riskType.key}">checked="checked"</c:if> />
                                       ${riskType.value}
                                        </label>
                                    </div>
                                </c:forEach>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="active" for="refund_type">返还方式</label>
                                <input type="text" name="refund_type" id="refund_type" class="form-control validate"
                                       placeholder="" value="${info.refundType}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="amount_desc">产品规模</label>
                                <input type="text" name="amount_desc" id="amount_desc" class="form-control validate"
                                       placeholder=""
                                       value="${info.amountDesc}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="description">购买说明</label>
                                <textarea name="description" id="description"
                                          class="form-control">${info.description}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="active">期数</label>
                                <input type="text" name="phase" class="form-control validate" placeholder=""
                                       value="${info.phase}">
                                        <span class="help-inline">
                                        </span>
                            </div>
                            <div class="form-group">
                                <label class="active" for="category_desc">产品类型</label>
                                <textarea name="category_desc" id="category_desc"
                                          class="form-control">${info.categoryDesc}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="active" for="introduction">产品介绍</label>
                                <textarea name="introduction" id="introduction"
                                          class="form-control">${info.introduction}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="active" for="buy_hint">收益计算</label>
                                <textarea name="buy_hint" id="buy_hint" class="form-control">${info.buyHint}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="active" for="qa">QA</label>
                                <textarea name="qa" id="qa" class="form-control">${info.qa}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="active" for="total_amount">totalAmount</label>
                                 <textarea name="total_amount" id="total_amount"
                                           class="form-control">${info.totalAmount}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="active" for="buy_begin_time">开始购买时间</label>
                                <input type="text" required="required" name="buy_begin_time" id="buy_begin_time"
                                       class="form-control validate"
                                       placeholder=""
                                       value="${info.buyBeginTimeStr}">
                            </div>
                            <div class="form-group">
                                <label class="active" for="buy_end_time">结束购买时间</label>
                                <input type="text" required="required" name="buy_end_time" id="buy_end_time"
                                       class="form-control validate"
                                       placeholder=""
                                       value="${info.buyEndTimeStr}">
                            </div>
                            <shiro:hasPermission name="fip:info">
                            <div class="form-group">
                                <input type="hidden" name="id" value="${info.id}"/>
                                <button type="button" id="fip-info-submit" class="btn btn-success">提交</button>
                                <button type="reset" class="btn btn-default">重置</button>
                            </div>
                            </shiro:hasPermission>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>