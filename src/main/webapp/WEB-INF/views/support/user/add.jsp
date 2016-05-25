<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper support-user-add">
    <section class="content-header">
        <h1>用户管理</h1>
    </section>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">添加SAP用户</h3>
                <div class="box-tools">

                </div>
            </div>
            <!-- form start -->
            <form class="form-horizontal" method="post" action="/support/user/add_user" id="add-user-form">
                <div class="box-body">
                    <div class="form-group">
                        <label for="select-company" class="col-sm-2 control-label">所在公司</label>
                        <div class="col-sm-6">
                            <select id="select-company" name="companyId" class="form-control">
                                <option value="" disabled selected>选择所属公司</option>
                                <c:forEach items="${companyList}" var="company">
                                    <option value="${company.value}">${company.key}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-sm-2 control-label">用户姓名</label>
                        <div class="col-sm-6">
                            <input type="text" id="name" name="name"  class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="certId" class="col-sm-2 control-label">身份证号</label>
                        <div class="col-sm-6">
                            <input type="text" id="certId" name="certId"  class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="phone" class="col-sm-2 control-label">手机号码</label>
                        <div class="col-sm-6">
                            <input type="text" id="phone" name="phone"  class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="depart" class="col-sm-2 control-label">所在部门</label>
                        <div class="col-sm-6">
                            <input type="text" id="depart" name="depart"  class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edu" class="col-sm-2 control-label">文化程度</label>
                        <div class="col-sm-6">
                            <input type="text" id="edu" name="edu"  class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="box-footer col-sm-12">
                    <button id="btn-reset" type="reset" class="btn btn-default">重置</button>
                    <button id="btn-submit" type="submit" class="btn btn-primary pull-right">提交</button>
                </div>
            </form>
        </div>
    </section>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>