<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper support-apibanner-create">
    <section class="content-header">
        <h1>手机端banner管理</h1>
    </section>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">新建banner</h3>
                <div class="box-tools">

                </div>
            </div>
            <c:if test="${errorMsg != null}">
                <div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                        ${errorMsg}
                </div>
            </c:if>
            <form id="add-api-banner-form" class="form-horizontal" enctype="multipart/form-data" method="post" action="/support/api/banner/create">
                <div class="box-body">
                    <div class="form-group">
                        <label for="title" class="col-sm-2 control-label">标题(可不填)</label>
                        <div class="col-sm-6">
                            <input type="text" id="title" name="title"  class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="text" class="col-sm-2 control-label">介绍文本(可不填)</label>
                        <div class="col-sm-6">
                            <input type="text" id="text" name="text"  class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="beginDate" class="col-sm-2 control-label">开始-结束时间</label>
                        <div class="col-sm-3">
                            <input name="beginDate" id="beginDate" type="text" class="form-control">
                        </div>
                        <div class="col-sm-3">
                            <input name="endDate" id="endDate" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="actionType" class="col-sm-2 control-label">执行动作</label>
                        <div class="col-sm-3">
                            <select id="actionType" name="actionType" class="form-control">
                                <c:forEach var="item" items="${actions}">
                                    <option value="${item.key}" data-tips="${item.tips}">${item.value}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="col-sm-3 hide">
                            <select id="nativePages" name="nativePages" class="form-control">
                                <option value="">请选择跳转页面</option>
                                <c:forEach var="item" items="${native_pages}">
                                    <option value="${item.key}" data-tips="${item.tips}">${item.value}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="actionValue" class="col-sm-2 control-label">内容</label>
                        <div class="col-sm-6">
                            <input type="text" id="actionValue" name="actionValue"  class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="productInfo" class="col-sm-2 control-label">产品信息(可不填)</label>
                        <div class="col-sm-6">
                            <input type="text" id="productInfo" name="productInfo"  class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="file" class="col-sm-2 control-label">上传图片</label>
                        <div class="col-sm-6">
                            <input id="file" name="file" type="file">
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