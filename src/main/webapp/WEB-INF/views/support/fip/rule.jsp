<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="content-wrapper container fip-rule">
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">网站端募集时间</div>
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>本期金额</th>
                            <th>当前总金额</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${webList}" var="fipRule">
                            <tr>
                                <td>
                                    <input name="beginDate_${fipRule.id}" type="text" class="form-control date-picker"
                                           placeholder="开始时间"
                                           value='${fn:substring(fipRule.beginDate, 0, 16)}' required>
                                </td>
                                <td>
                                    <input name="endDate_${fipRule.id}" type="text" class="form-control date-picker"
                                           placeholder="开始时间"
                                           value='${fn:substring(fipRule.endDate, 0, 16)}' required>
                                </td>
                                <td>
                                    <input name="amount_${fipRule.id}" type="text" class="form-control" value="${fipRule.amount}"
                                           required/>
                                </td>
                                <td>
                                    <input name="totalAmount_${fipRule.id}" type="text" class="form-control"
                                           value="${fipRule.totalAmount}" required/>
                                </td>
                                <shiro:hasPermission name="fip:rule">
                                    <td>
                                        <input type="hidden" name="fipId_${fipRule.id}" value="${fipRule.fipId}">
                                        <input type="hidden" name="type_${fipRule.id}" value="${fipRule.type}">
                                        <button type="submit" id="addBtn_${fipRule.id}" class="btn btn-success btn-submit"
                                                data-index="${fipRule.id}">提交
                                        </button>
                                    </td>
                                </shiro:hasPermission>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="panel panel-primary">

                    <div class="panel-heading">客户端端募集时间</div>
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>本期金额</th>
                            <th>当前总金额</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${clientList}" var="fipRule">
                            <tr>
                                <td>
                                    <input name="beginDate_${fipRule.id}" type="text" class="form-control date-picker"
                                           placeholder="开始时间"
                                           value='${fn:substring(fipRule.beginDate, 0, 16)}' required>
                                </td>
                                <td>
                                    <input name="endDate_${fipRule.id}" type="text" class="form-control date-picker"
                                           placeholder="开始时间"
                                           value='${fn:substring(fipRule.endDate, 0, 16)}' required>
                                </td>
                                <td>
                                    <input name="amount_${fipRule.id}" type="text" class="form-control" value="${fipRule.amount}"
                                           required/>
                                </td>
                                <td>
                                    <input name="totalAmount_${fipRule.id}" type="text" class="form-control"
                                           value="${fipRule.totalAmount}" required/>
                                </td>
                                <shiro:hasPermission name="fip:rule">
                                    <td>
                                        <input type="hidden" name="fipId_${fipRule.id}" value="${fipRule.productId}">
                                        <input type="hidden" name="type_${fipRule.id}" value="${fipRule.type}">
                                        <button type="submit" id="addBtn_${fipRule.id}" class="btn btn-success btn-submit"
                                                data-index="${fipRule.id}">提交
                                        </button>
                                    </td>
                                </shiro:hasPermission>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<%@include file="/WEB-INF/views/common/common_footer.jsp" %>