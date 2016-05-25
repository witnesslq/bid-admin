<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>
<div class="content-wrapper container vacation-list">
    <div class="content-header">
        <h3>假期列表</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-body">
                        <table class="table">
                            <tbody>
                            <tr>
                                <th width="10%">#</th>
                                <th width="40%">名称</th>
                                <th width="40%">日期</th>
                                <th width="10%">操作</th>
                            </tr>
                            <c:forEach var="vacations" items="${vacationList}">
                                <tr>
                                    <td class="">${vacations.id}</td>
                                    <td class="">${vacations.name}</td>
                                    <td class="">${vacations.date}</td>
                                    <shiro:hasPermission name="vacation:delete">
                                        <td><a href="#!" id="${vacations.id}" class="vaction_del">删除</a></td>
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
    <div class="row">
        <div class="col s12">

        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>