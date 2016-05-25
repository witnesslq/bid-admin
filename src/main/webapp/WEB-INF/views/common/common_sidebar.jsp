<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="header">导航菜单</li>
            <!--shiro:hasAnyRoles name="admin,pom,support,pdm,rd"-->
            <shiro:hasPermission name="announcement:support">
                <li>
                    <a href="/support/feedback/list"><i class="fa fa-comments"></i> <span>反馈管理</span></a>
                </li>
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa fa-bullhorn"></i> <span>公告管理</span> <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="announcement:create">
                            <li><a href="/support/announcement/create"><i class="fa fa-circle-o"></i> 新建公告</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="announcement:list">
                            <li><a href="/support/announcement/list"><i class="fa fa-circle-o"></i> 公告列表</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="announcement:gzbcreate">
                            <li><a href="/support/announcement/gzb/status/create"><i class="fa fa-circle-o"></i>
                                新增业务</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="announcement:gzblist">
                            <li><a href="/support/announcement/gzb/status/list"><i class="fa fa-circle-o"></i> 业务列表</a>
                            </li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="apibanner:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa fa-image"></i> <span>手机端banner管理</span> <i
                            class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="apibanner:create">
                            <li><a href="/support/api/banner/create_page"><i class="fa fa-circle-o"></i> 新建banner</a>
                            </li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="apibanner:list">
                            <li><a href="/support/api/banner/list"><i class="fa fa-circle-o"></i> banner列表</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="user:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-user"></i>
                        <span>用户管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="user:info">
                            <li><a href="/support/user/info"><i class="fa fa-circle-o"></i> 用户信息</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="user:add_user_page">
                            <li><a href="/support/user/add_user_page"><i class="fa fa-circle-o"></i> 添加SAP用户</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="user:add_user_list_page">
                            <li><a href="/support/user/add_user_list_page"><i class="fa fa-circle-o"></i> 批量添加SAP用户</a>
                            </li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="user:add_company_page">
                            <li><a href="/support/user/add_company_page"><i class="fa fa-circle-o"></i> 公司管理</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="tag:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-group"></i>
                        <span>分组管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="tag:list">
                            <li><a href="/support/tag/list"><i class="fa fa-circle-o"></i> 分组列表</a>
                            </li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="tag:add">
                            <li><a href="/support/tag/add"><i class="fa fa-circle-o"></i> 新增分组</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="vacation:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-calendar"></i> <span> 日期管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="vacation:insert_page">
                            <li><a href="/support/vacation/insert_page"><i class="fa fa-circle-o"></i> 添加假期</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="vacation:list">
                            <li><a href="/support/vacation/list"><i class="fa fa-circle-o"></i> 假期列表</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="important_date:list">
                            <li><a href="/support/important_date/list"><i class="fa fa-circle-o"></i> 重要日期列表</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="important_date:insert_page">
                            <li><a href="/support/important_date/insert_page"><i class="fa fa-circle-o"></i> 添加重要日期</a>
                            </li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="apprelease:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-line-chart"></i> <span> app版本发布管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="apprelease:list">
                            <li><a href="/support/app/release/iPhone/latest"><i class="fa fa-circle-o"></i> IOS</a></li>
                            <li><a href="/support/app/release/Android/latest"><i class="fa fa-circle-o"></i> Android</a>
                            </li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="product:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-money"></i> <span> 理财产品管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="fip:list">
                            <li><a href="/support/fip/list"><i class="fa fa-circle-o"></i> 诚御产品管理</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="ritp:support">
                            <li>
                                <a href="/support/ritp/support">
                                    <i class="fa fa-circle-o"></i> <span> 信诚产品管理</span>
                                    <i class="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul class="treeview-menu">
                                    <shiro:hasPermission name="ritp:create">
                                        <li><a href="/support/ritp/create"><i class="fa fa-circle-o"></i> 信诚产品新建</a></li>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="ritp:list">
                                        <li><a href="/support/ritp/list"><i class="fa fa-circle-o"></i> 信诚产品列表</a></li>
                                    </shiro:hasPermission>
                                    <shiro:hasPermission name="ritp:confirm">
                                        <li><a href="/support/ritp/confirm"><i class="fa fa-circle-o"></i> 信诚协议签署管理</a></li>
                                    </shiro:hasPermission>
                                </ul>
                            </li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="coupon:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-map-o"></i> <span> 粮票管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="coupon:index">
                            <li><a href="/support/coupon"><i class="fa fa-circle-o"></i> 粮票查询</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="coupon:list">
                            <li><a href="/support/coupon/list"><i class="fa fa-circle-o"></i> 粮票批次列表</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="coupon:grant">
                            <li><a href="/support/coupon/grant"><i class="fa fa-circle-o"></i> 粮票发放</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="sms:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-envelope"></i> <span> 短信管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="sms:channel:list">
                            <li><a href="/support/sms/channel"><i class="fa fa-circle-o"></i> 通道列表</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="sms:template:list">
                            <li><a href="/support/sms/template"><i class="fa fa-circle-o"></i> 模版列表</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="message:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-comments-o"></i> <span> 消息管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="message:sms:send">
                            <li><a href="/support/message/sms"><i class="fa fa-circle-o"></i> 短信发送</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="message:push:send">
                            <li><a href="/support/message/push"><i class="fa fa-circle-o"></i> Push发送</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>
            <shiro:hasPermission name="webbanner:support">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa fa-television"></i> <span>web端banner管理</span> <i
                            class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="webbanner:create">
                            <li><a href="/support/web/banner/create"><i class="fa fa-circle-o"></i> 新建banner</a>
                            </li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="webbanner:list">
                            <li><a href="/support/web/banner/list"><i class="fa fa-circle-o"></i> banner列表</a></li>
                        </shiro:hasPermission>
                    </ul>
                </li>
            </shiro:hasPermission>

            <!--/shiro:hasAnyRoles-->
            <shiro:hasAnyRoles name="admin">
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-lock"></i> <span>权限管理</span>
                        <i class="fa fa-angle-left pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <shiro:hasPermission name="shiroUser:list">
                            <li><a href="/support/shiro/user/list"><i class="fa fa-circle-o"></i> 用户管理</a></li>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="shiroRole:list">
                            <li><a href="/support/shiro/role/list"><i class="fa fa-circle-o"></i> 角色管理</a></li>
                        </shiro:hasPermission>
                        <li><a href="/support/shiro/func"><i class="fa fa-circle-o"></i> 功能管理</a></li>
                    </ul>
                </li>
            </shiro:hasAnyRoles>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>

