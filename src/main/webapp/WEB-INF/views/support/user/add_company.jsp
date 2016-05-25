<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper support-user-add-company">
    <section class="content-header">
        <h1>用户管理</h1>
    </section>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">添加公司</h3>
                <div class="box-tools">

                </div>
            </div>
            <!-- form start -->
            <form class="form-horizontal" method="post" action="#!" id="add-company-form">
                <div class="box-body">
                    <div class="form-group">
                        <label for="name" class="col-sm-2 control-label">单位名称</label>
                        <div class="col-sm-6">
                            <input type="text" id="name" name="name" class="form-control" autofocus required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="select-company" class="col-sm-2 control-label">上级公司</label>
                        <div class="col-sm-6">
                            <select id="select-company" name="parentId" class="form-control">
                                <option value="" disabled selected>选择所属公司</option>
                                <c:forEach items="${companyList}" var="company">
                                    <option value="${company.value}">${company.key}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="select-company" class="col-sm-2 control-label">所在地域</label>
                        <div class="col-sm-6">
                            <select id="select-company-area" name="areaCode" class="form-control">
                                <c:forEach items="${companyAreaList}" var="firstLevel">
                                    <optgroup label="${firstLevel.key}">
                                        <c:forEach items="${firstLevel.value}" var="secondLevel">
                                            <option value="${secondLevel.key}">${secondLevel.value}</option>
                                        </c:forEach>
                                    </optgroup>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="box-footer col-sm-12">
                    <button id="btn-reset" type="reset" class="btn btn-default">重置</button>
                    <button id="btn-submit" type="button" class="btn btn-primary pull-right">提交</button>
                </div>
            </form>
        </div>
    </section>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>