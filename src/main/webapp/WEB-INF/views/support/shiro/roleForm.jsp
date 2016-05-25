<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<div class="content-wrapper shiro_roleForm" style="min-height: 251px;">
    <div class="content-header">
        <h3>角色修改</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-10">
                <form id="roleForm" role="form" method="post" action="/support/shiro/role/${action }">
                    <input type="hidden" name="roleId" value="${role.roleId}"/>
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">角色修改</h3>
                        </div>
                        <div class="box-body with-border">
                            <div class="form-group">
                                <label for="roleCode">角色代码：</label>
                                <input type="text" class="form-control" placeholder="请输入角色代码，只能输入英文字母和数字"
                                       id="roleCode"
                                       name="roleCode" value="${role.roleCode}" <c:if test="${!empty role.roleId }">readonly="readonly"</c:if> />
                                <span class="text-red"></span>
                            </div>
                            <div class="form-group">
                                <label for="roleName">角色名称：</label>
                                <input type="text" class="form-control" placeholder="请输入角色名称" id="roleName" name="roleName" value="${role.roleName}"/>
                                <span class="text-red"></span>
                            </div>
                            <div class="form-group">
                                <a class="btn btn-primary" onclick="window.history.go(-1)"><span class="glyphicon glyphicon-remove"></span> 返回</a>
                                <button type="submit" class="btn btn-primary" id="submit_btn2"><span class="glyphicon glyphicon-search"></span> 保存</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>

