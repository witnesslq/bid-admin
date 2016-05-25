<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container coupon-index">
    <div class="content-header">
        <h3>粮票查询</h3>
    </div>
    <div class="content">
        <div class="row" style="margin-bottom: 10px;">
            <div class="col-xs-6">
                <div class="input-group input-group-sm">
                    <input placeholder="请输入粮票编号"  id="input-number" name="number" type="text" class="form-control">
                        <span class="input-group-btn">
                            <button class="btn btn-info btn-flat" id="btn-search"  type="button">查询</button>
                        </span>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="box-body">

                <div class="row">
                    <div class="col-xs-10">
                        <div class="red-text">${errorMsg}</div>
                        <c:if test="${coupon!=null}">
                            <table class="table">
                                <tr>
                                    <td>持有者:</td>
                                    <td>${user.name}</td>
                                </tr>
                                <tr>
                                    <td>持有者手机号:</td>
                                    <td>${user.phone}</td>
                                </tr>
                                <tr>
                                    <td>可用产品:</td>
                                    <td>${fip.name}</td>
                                </tr>
                                <tr>
                                    <td>总金额:</td>
                                    <td>${coupon.amount}</td>
                                </tr>
                                <tr>
                                    <td>有效时间:</td>
                                    <td><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd HH:mm:ss"/> -
                                        <fmt:formatDate value="${coupon.endTime}" pattern="yyyy-MM-dd HH:mm:ss"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>发放时间:</td>
                                    <td><fmt:formatDate value="${coupon.createdTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                                </tr>
                                <tr>
                                    <td>粮票状态:</td>
                                    <td>
                                        <c:if test="${coupon.status==1}">未使用</c:if>
                                        <c:if test="${coupon.status==2}">正在使用</c:if>
                                        <c:if test="${coupon.status==3}">已使用</c:if>
                                    </td>
                                </tr>
                            </table>
                        </c:if>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>