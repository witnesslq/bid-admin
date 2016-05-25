<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<header class="main-header">
    <!-- Logo -->
    <a href="/support" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini">HN</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg">华能资本</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </a>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li>
                    <a href="#">
                        <span class="hidden-xs"><shiro:principal/></span>
                    </a>
                </li>
                <li>
                    <a href="/support/logout">
                        <span class="hidden-xs">注销</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</header>