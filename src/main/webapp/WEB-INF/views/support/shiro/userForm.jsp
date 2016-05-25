<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>

<div class="content-wrapper shiro_userForm">
    <div class="content-header">

    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">用户信息</h3>
                    </div>
                    <div class="box-body">
                        <form id="inputForm" action="/support/shiro/user/${action }" method="post">
                            <input type="hidden" name="userId" value="${user.userId}"/>
                            <div class="form-group">
                                <label for="loginName" data-error="">登陆账号：</label>
                                <input type="text" id="loginName" name="loginName" placeholder="请输入登陆账号"
                                       value="${user.loginName}"
                                       <c:if test="${!empty user.userId }">readonly="readonly"</c:if> />
                                <span class="text-red"></span>
                            </div>
                            <div class="form-group">
                                <label for="realName" data-error="">真实姓名：</label>
                                <input type="text" class="validate" placeholder="请输入真实姓名" id="realName" name="realName"
                                       value="${user.realName}"/>
                                <span class="text-red"></span>
                            </div>
                            <div class="form-group">
                                <label for="roleName" data-error="">角色名称：</label>
                                <select id="roleName" name="roleName">
                                    <c:forEach items="${roleList}" var="role" varStatus="stat">
                                        <option value="${role.roleId }">${role.roleName }</option>
                                    </c:forEach>
                                </select>
                                <input type="hidden" id="roleId" name="roleId" value="${user.roleId}"/>
                                <span class="text-red"></span>
                            </div>
                            <c:if test="${empty flg }">
                            <div class="form-group">
                                <label for="phone" data-error="">手机号码：</label>
                                <input type="text" class="validate" id="phone" name="phone" placeholder="请输入手机号码"
                                       value="${user.phone}"/>
                                <span class="text-red"></span>
                            </div>
                            </c:if>
                            <div class="form-group">
                                <label for="password" data-error=""> 密  码：</label>
                                <input type="password" class="validate" id="password" name="password" placeholder="请输入密码"/>
                                <span class="text-red"></span>
                            </div>
                            <div class="form-group">
                                <label for="againPassword" data-error="">确认密码：</label>
                                <input type="password" class="validate" id="againPassword" name="againPassword"
                                       placeholder="请输入确认密码"/>
                                <span class="text-red"></span>
                            </div>
                            <div class="form-group">
                                <a class="btn btn-primary btn-sm blue lighten-2" onclick="window.history.go(-1)">
                                    <span class="glyphicon glyphicon-remove"></span> 返回</a>
                                <button type="submit" class="btn btn-primary btn-sm blue lighten-2" id="submit_btn1"><span
                                        class="glyphicon glyphicon-search"></span> 保存
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>
