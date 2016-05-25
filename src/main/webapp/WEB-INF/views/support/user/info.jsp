<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper support-user-info ">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>用户管理</h1>
    </section>
    <!-- Main content -->
    <section class="content">
        <!-- Default box -->
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">用户信息查询</h3>
                <div class="box-tools">
                    <shiro:hasPermission name="user:add_user_page">
                    <a class="btn btn-sm btn-success" href="/support/user/add_user_page">添加用户到SAP</a>
                    </shiro:hasPermission>
                </div>
            </div>
            <c:if test="${errorMsg != null}">
                <div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                        ${errorMsg}
                </div>
            </c:if>
            <div class="box-body">
                <div class="nav-wrapper hoverable">
                    <form id="form-search" method="get" action="/support/user/info">
                        <div class="input-group">
                            <input id="search" name="phone" value="${phone}" type="search" class="form-control"
                                   placeholder="请输入要查询的手机号">
                            <span class="input-group-btn">
                              <button class="btn btn-success btn-flat" type="submit">Go!</button>
                            </span>
                        </div>

                    </form>
                </div>
            </div>
            <div class="box-body">
                <c:if test="${data != null && data.userId != null}">
                    <dl class="dl-horizontal">
                        <dt>姓名</dt>
                        <dd>${data.name}</dd>
                        <dt>公司</dt>
                        <dd>${data.companyName}</dd>
                        <dt>手机号码</dt>
                        <dd>
                            ${data.phone}
                            <shiro:hasPermission name="user:change_phone">
                                <a id="link-update-phone" class="modal-trigger" href="#!">更改</a>
                            </shiro:hasPermission>
                        </dd>
                        <dt>银行卡</dt>
                        <c:forEach items="${data.bankCards}" var="bankCard">
                            <dd>
                                    ${bankCard.channelName}
                                    ${bankCard.cardNo}
                                <shiro:hasPermission name="user:change">
                                    <a class="modal-trigger link-change-bankcard" href="#modal-change-bankcard"
                                       data-channel-id="${bankCard.channelId}"
                                       data-user-channel-id="${bankCard.id}"
                                       data-bank-name="${bankCard.channelName}"
                                       href="#">更换银行卡</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="user:sycronized">
                                    <a class="btn-sync-asset"
                                       data-channel-id="${bankCard.channelId}"
                                       data-user-channel-id="${bankCard.id}"
                                       href="#">同步资产</a>
                                </shiro:hasPermission>
                                        <shiro:hasPermission name="user:getAsset">
                                            <a class="btn-get-asset"
                                               data-channel-id="${bankCard.channelId}"
                                               href="#">查看资产</a>
                                        </shiro:hasPermission>

                            </dd>
                        </c:forEach>
                    </dl>
                </c:if>
            </div>
        </div>





        <c:if test="${transactionRecords != null}">
           <!-- 日期查询-->
        <div class="box box-warning">
            <div class="box-header with-border">
                <h3 class="box-title">时间查询</h3>
                <form id="form_date_search" method="get" action="/support/user/info">
                    <div class="form-group">
                        <br>
                        <label for="startTime" class="col-sm-1 ">startTime:</label>
                        <div class="col-sm-2">
                            <input name="startTime" id="startTime" type="text" class="form-control" value='${startTime}'>
                        </div>
                        <label for="endTime" class="col-sm-1 ">endTime:</label>
                        <div class="col-sm-2">
                            <input name="endTime" id="endTime" type="text" class="form-control" value='${endTime}'>
                        </div>
                        <button class="btn btn-success btn-flat" type="submit">Go!</button>
                        <input  name="phone" type="hidden" value="${phone}">
                    </div>
                </form>
            </div>
            <div class="box-header with-border">
                <h3 class="box-title">交易信息</h3>
            </div>

            <div class="box-body table-responsive no-padding">
                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th>日期</th>
                        <th>金额（元）</th>
                        <th>交易信息</th>
                        <th>状态</th>
                        <th>详情</th>
                    </tr>
                    <c:forEach items="${transactionRecords}" var="transaction">
                        <tr>
                            <td>
                                <c:set var="now" value="${java.util.Date()}"/>
                                <jsp:useBean id="dateValue" class="java.util.Date"/>
                                <jsp:setProperty name="dateValue" property="time"
                                                 value="${transaction.transactionTime}"/>
                                    <%--<fmt:formatDate value="${dateValue}" pattern="yyyy-MM-dd HH:mm" />--%>
                                <fmt:formatDate value="${dateValue}" pattern="yyyy-MM-dd HH:mm"/>
                            </td>
                            <td>
                                <c:choose>
                                    <c:when test="${fn:contains(transaction.transactionAmount, '+')}">
                                        <span style="color: #ff9800">${transaction.transactionAmount}</span>
                                    </c:when>
                                    <c:otherwise>
                                        <span style="color: #4aad7a">${transaction.transactionAmount}</span>
                                    </c:otherwise>
                                </c:choose>
                            </td>
                            <td>${transaction.transactionType}</td>
                            <td>${transaction.transactionStatus}</td>
                            <td>
                                <a href="#modal-transaction-detail" class="link-detail modal-trigger"
                                   data-transactionNo="${transaction.transactionNo}"
                                   data-transactionTime="<fmt:formatDate value="${dateValue}" pattern="yyyy-MM-dd HH:mm" />"
                                   data-transactionAmount="${transaction.transactionAmount}"
                                   data-transactionType="${transaction.transactionType}"
                                   data-transactionStatus="${transaction.transactionStatus}"
                                   data-transactionRemark="${transaction.transactionRemark}">详情</a>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
        </c:if>

        <c:if test="${fipFreezeRecords != null}">
        <div class="box box-danger">
            <div class="box-header with-border">
                <h3 class="box-title">资金冻结列表</h3>
            </div>
            <div class="box-body table-responsive no-padding">
                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th>日期</th>
                        <th>购买产品</th>
                        <th>购买金额</th>
                        <th>解冻</th>
                    </tr>
                    <c:forEach items="${fipFreezeRecords}" var="fipFreeze">
                        <tr>
                            <td>${fipFreeze.createdTime}</td>
                            <td>${fipFreeze.fipName}</td>
                            <td>${fipFreeze.applicationAmount}</td>
                            <shiro:hasPermission name="user:fipFreeze">
                                <td>
                                    <button class="waves-effect waves-light btn unfreeze-btn"
                                            data-id="${fipFreeze.id}" data-user_id="${fipFreeze.userId}">解冻
                                    </button>
                                </td>
                            </shiro:hasPermission>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
        </c:if>
    </section>

    <!-- 用户ID -->
    <input id="data-user-id" type="hidden" value="${data.userId}"/>
    <!-- 修改手机号 Modal -->
    <div id="modal-update-phone" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">修改手机号</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label for="input-update-phone" class="col-sm-2 control-label">手机号码</label>
                        <div class="col-sm-10">
                            <input id="input-update-phone" value="${data.phone}" data-old-phone="${data.phone}" type="text"
                                   class="form-control">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                    <button id="btn-update-phone" type="button" class="btn btn-primary">提交</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

    <!-- 修改银行卡 Modal-->
    <div id="modal-change-bankcard" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">更换银行卡</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label for="input-update-phone" class="col-sm-2 control-label">新卡号</label>
                        <div class="col-sm-10">
                            <input id="cardNo" name="cardNo" value="" type="text" class="form-control" autofocus required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="input-update-phone" class="col-sm-2 control-label">所在地域</label>
                        <div class="col-sm-5">
                            <input id="bankBranch" value="" name="bankBranch" type="hidden"/>
                            <select id="select-province" class="form-control">
                                <option value="" disabled selected>选择省</option>
                            </select>
                        </div>
                        <div class="col-sm-5">
                            <select id="select-city" class="form-control">
                                <option value="" disabled selected>选择市</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="input-update-phone" class="col-sm-2 control-label">身份证位数</label>
                        <div class="radio col-sm-5">
                            <label for="inlineRadio1">
                                <input name="idNumberType" type="radio" id="inlineRadio1" value="15"/>
                                15位身份证
                            </label>
                        </div>
                        <div class="radio col-sm-5">
                            <label for="inlineRadio2">
                                <input name="idNumberType" type="radio" id="inlineRadio2" value="18" checked/>
                                18位身份证
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                    <button id="btn-change-bankcard" type="button" class="btn btn-primary">提交</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

    <!-- 交易详情 Modal-->
    <div id="modal-transaction-detail" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">交易详情</h4>
                </div>
                <div class="box-body table-responsive no-padding">
                    <table class="table table-hover">
                        <tbody>
                        <tr>
                            <th class="right-align grey-text">交易号</th>
                            <td id="transaction-no">xxxxx</td>
                        </tr>
                        <tr>
                            <th class="right-align grey-text">交易时间</th>
                            <td id="transaction-time">xxxxx</td>
                        </tr>
                        <tr>
                            <th class="right-align grey-text">交易类型</th>
                            <td id="transaction-type">xxxxx</td>
                        </tr>
                        <tr>
                            <th class="right-align grey-text">交易金额</th>
                            <td id="transaction-money">xxxxx</td>
                        </tr>
                        <tr>
                            <th class="right-align grey-text">交易状态</th>
                            <td id="transaction-status">xxxxx</td>
                        </tr>
                        <tr>
                            <th class="right-align grey-text">备注</th>
                            <td id="transaction-note">xxxxx</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="box-footer"></div>
            </div>
        </div>
    </div>
    <!-- 查看资产 Modal -->
    <div id="modal-getAsset" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">资产详情</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label for="totalAsset" class="col-sm-3 control-label">总资产：</label>
                        <div class="col-sm-8">
                            <span id="totalAsset" ></span>元
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="totalGzbAsset" class="col-sm-3 control-label">工资宝资产：</label>
                        <div class="col-sm-8">
                            <span id="totalGzbAsset"></span>元（<span id="availableGzbAsset"></span>元可用）
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="totalFipAsset" class="col-sm-3 control-label">理财宝资产：</label>
                        <div class="col-sm-8">
                            <span id="totalFipAsset" ></span>元
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default " data-dismiss="modal" >确定</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>