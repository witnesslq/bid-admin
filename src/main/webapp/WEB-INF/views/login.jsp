<%@page import="org.apache.shiro.SecurityUtils" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
    if (SecurityUtils.getSubject().isAuthenticated()) {
        response.sendRedirect("/support");
    }
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>华能管理后台</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <%@include file="/WEB-INF/views/common/common_css.jsp" %>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
      <img src="/static/admin/assets/img/common/logo.png">
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
      <form action="/support/login" autocomplete="off" method="POST" id="loginForm">
              <c:if test="${!empty shiroLoginFailure }">
                  <div class="container">
                      <div class="hide-on-small-only">
                          <p style="color:red; font-size: 1.5rem">
                              <small>
                                  <c:out value="登录失败，请检查用户名和密码！"/>
                              </small>
                          </p>
                      </div>
                  </div>
              </c:if>
          <div class="form-group has-feedback">
              <input type="text" class="form-control" name="username" placeholder="登录账号">
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
              <input type="password" class="form-control" name="password" placeholder="登录密码">
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
              <div class="col-xs-8">
                  <div class="checkbox icheck">
                      <label>
                          <input type="checkbox"> Remember Me
                      </label>
                  </div>
              </div>
              <!-- /.col -->
              <div class="col-xs-4">
                  <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
              <!-- /.col -->
          </div>
      </form>
  </div>
  <!-- /.login-box-body -->
</div>

<!-- /.login-box -->
<%@include file="/WEB-INF/views/common/common_js.jsp" %>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });
</script>
</body>
</html>
