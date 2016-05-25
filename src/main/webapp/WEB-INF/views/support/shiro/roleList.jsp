<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<div class="content-wrapper shiro_roleList">
    <div class="content-header">
        <h3>角色管理</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <form action="/support/shiro/role/list" method="post">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">角色查询</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label for="roleName">按名称查询</label>
                            <input id="roleName" name="roleName" type="text" class="validate">
                        </div>
                        <div class="form-group">
                            <label for="roleCode">按编码查询</label>
                            <input id="roleCode" name="roleCode" type="text" class="validate">
                        </div>
                        <div class="input-field col s4">
                            <input type="hidden" id="message" name="message" value="${message}">
                        </div>
                        <div class="col s4">
                            <button type="submit" class="btn btn-primary btn-sm blue lighten-2"><span
                                    class="glyphicon glyphicon-search"></span> 搜索
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
        <div class="row" style="margin-bottom: 10px;">
            <shiro:hasPermission name="shiroRole:create">
                <div class="col-xs-12">
                    <a class="btn btn-primary" href="/support/shiro/role/create"><span
                            class="glyphicon glyphicon-plus"></span> 创建新角色</a>
                        <%--<button type="button" class="btn btn-primary" onclick="deleteBySelected()"><span--%>
                        <%--class="glyphicon glyphicon-remove"></span> 删除角色--%>
                        <%--</button>--%>
                </div>
            </shiro:hasPermission>
            <!-- /操作按钮组 -->
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">角色列表</h3>
                    </div>
                    <div class="box-body">
                        <table class="table table-hover" id="table1">
                            <tbody>
                            <tr class="thead">
                                <th class="text-center">序号</th>
                                <th>角色编码</th>
                                <th>角色名称</th>
                                <th>操作</th>
                            </tr>
                            <c:forEach items="${list}" var="role" varStatus="stat">
                                <tr>
                                    <td class="text-center">${stat.count }</td>
                                    <td>${role.roleCode}</td>
                                    <td>${role.roleName}</td>
                                    <td>
                                        <shiro:hasPermission name="shiroRole:update">
                                            <a href="/support/shiro/role/update/${role.roleId}"
                                               id="editLink-${role.roleId}">修改</a>
                                        </shiro:hasPermission>
                                        <span class="cutline"></span>
                                        <shiro:hasPermission name="shiroRole:delete">
                                            <a href="#" id="editLink-${role.roleId}" class="deleteByRoleId"
                                               dataId="${role.roleId}">删除</a>
                                        </shiro:hasPermission>
                                        <span class="cutline"></span>
                                        <shiro:hasPermission name="shiroRole:perms">
                                            <a href="/support/shiro/role/perms/${role.roleId}"
                                               id="editLink-${role.roleId}">分配权限</a>
                                        </shiro:hasPermission>
                                    </td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                        <form id="actionForm" action="" method="post">
                            <input type="hidden" id="ids" name="ids">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="pagination">
                    <a href="/support/shiro/role/list?pn=<c:choose><c:when test="${pn eq 1}">${pn}</c:when><c:otherwise>${pn-1}</c:otherwise></c:choose>"
                       aria-label="Previous">
                        <span aria-hidden="true">上一页 </span>
                    </a>
                    <span> ${pn} / ${count} </span>
                    <a href="/support/shiro/role/list?pn=<c:choose><c:when test="${pn < count}">${pn+1}</c:when><c:otherwise>${count}</c:otherwise></c:choose>"
                       aria-label="Next">
                        <span aria-hidden="true"> 下一页</span>
                    </a>
                </div>
            </div>

        </div>
        <div class="row">
            <form method="get" action="/support/shiro/role/list?" id="pageForm">
                <div class="col-xs-1">
                    <input type="hidden" name="status" value="${status}"/>
                    <input type="text" class="form-control" id="pn" name="pn"  value="${pn}"
                           placeholder="${pn}">
                    <label for="pn" data-error="请输入合法的数字！"></label>
                </div>
                <div class="col-xs-3">
                    <button class="btn btn-primary" type="submit">跳转</button>
                </div>
            </form>
        </div>
    </div>
    <div id="modal1" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">确认</h4>
                </div>
                <div class="modal-body" id="content">
                </div>
                <div class="modal-footer">
                    <button type="button" id="disAgree" class="btn btn-default pull-left" data-dismiss="modal">关闭
                    </button>
                    <a type="button" id="delAgree" class="btn btn-primary" href="#">确认</a>
                </div>
            </div>
        </div>
    </div>
    <div id="message-modal" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">提示</h4>
                </div>
                <div class="modal-body" id="message-content" >
                </div>
                <div class="modal-footer">
                    <button type="button"  class="btn btn-default pull-right" data-dismiss="modal">关闭
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>

