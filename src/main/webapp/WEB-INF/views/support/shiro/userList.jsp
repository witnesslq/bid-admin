<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<div class="content-wrapper shiro_userList">
    <div class="content-header">
        <h3>用户管理</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-6">
                <form method="post" action="/support/shiro/user/list" >
                    <input type="hidden" id="message" name="message" value="${message}">
                    <div class="form-group">
                        <label for="loginName">按登录账号查询</label>
                        <input id="loginName" name="loginName" type="text" class="form-control validate"
                           value="${loginName}">
                    </div>
                    <div class="form-group">
                        <label for="realName">按用户名查询</label>
                        <input id="realName" name="realName" type="text" class="form-control validate" value="${realName}">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-sm blue lighten-2"><span
                                class="glyphicon glyphicon-search"></span> 搜索
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!-- /查询条件 -->
        <shiro:hasPermission name="shiroUser:create">
            <div class="row" style="margin-bottom: 10px;"><!-- 操作按钮组 -->
                <div class="col-xs-6">
                    <a class="btn btn-primary btn-sm blue lighten-2" href="/support/shiro/user/create">创建新用户</a>
                </div>
            </div>
        </shiro:hasPermission>
        <!-- /操作按钮组 -->
        <div class="row">
            <div class="col-xs-8">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">用户列表</h3>
                    </div>
                    <div class="box-body">
                        <table class="table table-hover" id="contentTable">
                            <tr>
                                <th class="text-center">序号</th>
                                <th>登录账号</th>
                                <th>真实姓名</th>
                                <th>联系方式</th>
                                <th>角色</th>
                                <th>操作</th>
                            </tr>
                            <c:forEach items="${list}" var="user" varStatus="stat">
                                <tr>
                                    <td class="text-center">${stat.count }</td>
                                    <td>${user.loginName}</td>
                                    <td>${user.realName}</td>
                                    <td>${user.phone}</td>
                                    <td>${user.roleName}</td>
                                    <td>
                                        <shiro:hasPermission name="shiroUser:update">
                                            <a href="/support/shiro/user/update/${user.userId}" id="editLink-${user.userId}"> 修改</a>
                                        </shiro:hasPermission>
                                        <span class="cutline"></span>
                                        <shiro:hasPermission name="shiroUser:delete">
                                            <a href="#" data="${user.realName }" class="deleteById" data-id="${user.userId}"> 删除</a>
                                        </shiro:hasPermission>
                                        <span class="cutline"></span>
                                        <%--<shiro:hasPermission name="shiroUser:resetPwd">--%>
                                            <%--<a href="#" data="${user.realName }" class="resetPwd" data-id="${user.userId}"> 重置密码</a>--%>
                                        <%--</shiro:hasPermission>--%>
                                    </td>
                                </tr>
                            </c:forEach>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-3">
                <div class="pagination">
                    <a href="/support/shiro/user/list?
                        pn=<c:choose>
                        <c:when test="${pn eq 1}">${pn}</c:when>
                        <c:otherwise>${pn-1}</c:otherwise>
                        </c:choose>" id="previous"
                       aria-label="Previous">
                        <span aria-hidden="true">上一页 </span>
                    </a>
                    <span> ${pn} / ${count} </span>
                    <a href="/support/shiro/user/list?pn=<c:choose><c:when test="${pn < count}">${pn+1}</c:when><c:otherwise>${count}</c:otherwise></c:choose>"
                       id="next" aria-label="Next">
                        <span aria-hidden="true"> 下一页</span>
                    </a>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-xs-1">
                <input type="text" id="pn" class="form-control" name="pn" value="${pn}" placeholder="${pn+1}">
                <label for="pn" data-error="请输入合法的数字！"></label>
            </div>
            <div class="col-xs-4">
                <button class="btn btn-primary" type="submit">跳转
                </button>
            </div>
        </div>
    </div>
    <form id="actionForm" action="" method="post">
        <input type="hidden" id="ids" name="ids">
    </form>


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
<!-- /右侧主体内容 -->
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>
