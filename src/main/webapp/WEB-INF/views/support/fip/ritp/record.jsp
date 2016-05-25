<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid trust-list">
    <div class="content-header">
        <h3>详情列表
        <span class="pull-right" style="font-size: 20px">
            <button class="btn btn-primary" onclick="window.history.go(-1)">
                <i class="fa fa-mail-reply-all">返回</i>
            </button>
        </span>
        </h3>

    </div>
    <div class="content">
        <div class="box ">
            <div class="box-body">
                <table class="table table-condensed">
                    <tr>
                        <th width="30%">姓名</th>
                        <th width="30%">手机号</th>
                        <th width="30%">业务代码</th>
                        <th width="30%">金额</th>
                    </tr>
                    <c:forEach var="record" items="${records}">
                        <tr>
                            <td>${record.userName}</td>
                            <td>${record.mobile}</td>
                            <td>${record.businessCode}</td>
                            <td>${record.money}</td>
                        </tr>
                    </c:forEach>
                </table>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>