<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>

<div class="content-wrapper shiro_permission">
    <div class="content-header">
        <h3>分配权限</h3>
    </div>
    <div class="content">
        <div class="row" id="func-form">
            <form id="form1" action="/support/shiro/role/perms/${role.roleId}" method="post" class="form-horizontal">
                <input type="hidden" id="fids" name="funcIds" value="111"/>
                <input type="hidden" class="roleId" value="${role.roleId}">
                <div class="col-xs-10">
                    <h2>角色名称：${role.roleName }</h2>
                </div>
            </form>
        </div>
        <div class="row" style="margin-bottom: 10px;">
            <div class="col-xs-12">
                <a class="btn btn-primary btn-sm blue lighten-2" onclick="window.history.go(-1)">
                    <span class="glyphicon glyphicon-remove"></span> 返回
                </a>
                <button type="submit" class="btn btn-primary btn-sm blue lighten-2" id="submit_btn">
                    <span class="glyphicon glyphicon-ok"></span> 保存权限配置
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-5">
                <div class="tree-container">
                    <ul id="pemissionTree" class="ztree"></ul>
                </div>
            </div>
        </div>
    </div>
    <form id="permissionForm" action="#" method="post">
        <input type="hidden" id="funcIds" name="funcIds" value="111"/>
    </form>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>


