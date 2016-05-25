<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper ritp-confirm">
    <section class="content-header">
        <h1>信诚产品协议签署管理 >> ${ritpName}</h1>
        <div class="row">
            <a class="btn btn-success pull-right" style="margin-right: 15px" href="/support/ritp/downloadExcel?ritpId=${ritpId}" >
                <i class="fa fa-download">下载为Excel表格</i>
            </a>
        </div>
    </section>
    <!-- Main content -->
    <section class="content">
        <!-- Default box -->
        <div class="row">
            <div class="col-xs-12">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-pills nav-justified">
                        <li class="active" id="tab"><a href="#all" data-toggle="tab">已预约</a></li>
                        <li class="" id="tab3"><a href="#mujiinfo" data-toggle="tab">删除预约</a></li>
                    </ul>

                    <div class="tab-content">
                        <div class="active tab-pane" id="all">
                            <table  style="text-align:center" class="table table-hover">
                                <thead>
                                <tr style="font-weight:bold;">
                                    <td width="10%">姓名</td>
                                    <td width="10%">公司</td>
                                    <td width="10%">手机</td>
                                    <td width="10%">预约金额</td>
                                    <td width="12%">高级功能</td>
                                </tr>
                                </thead>
                                <tbody>
                                <c:forEach var="info" items="${list}">
                                    <tr id="${info.transactionalId}" name="${info.name}">
                                        <td>${info.name}</td>
                                        <td>${info.company}</td>
                                        <td>${info.mobile}</td>
                                        <td>${info.amount}元</td>
                                        <td><a class="btn btn-primary" name="${info.transactionalId}" id="del">删除预约</a></td>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </table>
                        </div>

                        <div class="tab-pane" id="mujiinfo" style="margin-top: 30px">
                            <table  style="text-align:center" class="table table-hover">
                                <thead>
                                <tr style="font-weight:bold;">
                                    <td width="10%">姓名</td>
                                    <td width="10%">公司</td>
                                    <td width="10%">手机</td>
                                    <td width="10%">预约金额</td>
                                    <td width="12%">高级功能</td>
                                </tr>
                                </thead>
                                <tbody>
                                <c:forEach var="info" items="${delAppointmentlist}">
                                    <tr id="${info.transactionalId}" name="${info.name}">
                                        <td>${info.name}</td>
                                        <td>${info.company}</td>
                                        <td>${info.mobile}</td>
                                        <td>${info.amount}元</td>
                                        <td><a class="btn btn-xs"style="color: grey;" disabled="true">已删除预约</a></td>
                                    </tr>
                                </c:forEach>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div><!-- /.tab-pane -->
            </div>
        </div>

    </section>
    <!-- /.content -->
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>