<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<div class="content-wrapper important-list">
    <div class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">新增重要日期</h3>
                <div class="box-tools"></div>
            </div>
            <div class="box-body no-padding">
                <table class="table">
                    <tbody>
                    <tr>
                        <th width="40%">类型</th>
                        <th width="40%">日期</th>
                        <th width="20%">操作</th>
                    </tr>
                    <c:forEach var="dates" items="${dateList}">
                        <tr>
                            <td class="">${dates.type}</td>
                            <td class="">${dates.date}</td>
                            <td>
                            <shiro:hasPermission name="important:insert">
                                <a href="support/important_date/insert_page?type=${dates.type}&date
                                =${dates.date}" class="dates_eidt btn btn-primary">修改</a>
                            </shiro:hasPermission>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>