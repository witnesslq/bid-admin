<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<div class="content-wrapper web-banner">
    <section class="content-header">
        <h1>Web端banner管理</h1>
        <input type="hidden" name="fipId" id="fipId" value=${webbanner.id}>
    </section>
    <section class="content" style="margin-top: 30px">
        <div class="box box-primary">
            <form id="formBanner" method="post" enctype="multipart/form-data">
                <c:if test="${webbanner != null}">
                <div class="box-header with-border">
                    <h3 class="box-title">修改banner</h3>
                </div>
                <div id="update-web-banner-form" class="form-horizontal">
                    <div id="add-web-banner-form" class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">内容</label>
                                <div class="col-sm-5">
                                    <textarea  rows="5" style="overflow-y:visible" id="updatecontext" name="content" class="form-control" >${webbanner.htmlContent}</textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">打开地址</label>
                                <div class="col-sm-5">
                                    <input type="text" id="openUrl" name="openUrl" class="form-control" value="${webbanner.url}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">目标页面</label>
                                <div class="col-sm-5">
                                    <select name="select" id="target" style="width: 100%">
                                        <c:if test="${webbanner.target == 1}">
                                            <option value="1" selected>本页面</option>
                                            <option value="2">新页面</option>
                                        </c:if>
                                        <c:if test="${webbanner.target == 2}">
                                            <option value="1" >本页面</option>
                                            <option value="2"selected>新页面</option>
                                        </c:if>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">banner类型</label>
                                <div class="col-sm-5">
                                    <select name="selectType" id="bannerType" style="width: 100%">
                                        <c:if test="${webbanner.type == 1}">
                                            <option value="1" selected>图片</option>
                                            <option value="3">html类</option>
                                        </c:if>
                                        <c:if test="${webbanner.type == 3}">
                                            <option value="1" >图片</option>
                                            <option value="3" selected>html类</option>
                                        </c:if>

                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">开始时间</label>
                                <div class="col-sm-5">
                                    <input type="text" id="updateBeginTime" name="beginTime" class="form-control" value="${webbanner.beginTime}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">结束时间</label>
                                <div class="col-sm-5">
                                    <input type="text" id="updateEndTime" name="endTime" class="form-control" value="${webbanner.endTime}"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row" >
                                    <label  class="col-sm-4 control-label" >Banner</label>
                                    <div class="col-sm-3">
                                        <input type="file" name="file">
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="button" id="uploadBanner" name="bannerBtn" value="上传" >
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row" >
                                    <label  class="col-sm-4 control-label" >Banner地址</label>
                                    <div class="col-sm-5">
                                        <input type="text" name="bannerUrl" id="bannerUrl" class="form-control" value="${webbanner.src}" disabled>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="box-footer col-xs-12">
                            <div class="col-sm-3 col-lg-offset-5">
                                <button id="btn-reset" type="reset" class="btn btn-default">重置</button>
                                <input type="button" id="bannerUpdate" class="btn btn-primary pull-right" value="修改">
                            </div>
                        </div>
                    </div>
                    </c:if>
                    <c:if test="${webbanner == null}">
                    <div class="box-header with-border">
                        <h3 class="box-title">新建banner</h3>
                    </div>
                    <div id="add-web-banner-form" class="form-horizontal">
                        <div class="box-body">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">内容</label>
                                <div class="col-sm-5">
                                    <textarea  rows="5" style="overflow-y:visible" id="createContent" name="content" class="form-control" ></textarea>
                                </div>

                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">打开地址</label>
                                <div class="col-sm-5">
                                    <input type="text" id="createOpenUrl" name="openUrl" class="form-control" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">目标页面</label>
                                <div class="col-sm-5">
                                    <select name="select" id="selectTarger" style="width: 100%">
                                        <option value="1">本页面</option>
                                        <option value="2">新页面</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">banner类型</label>
                                <div class="col-sm-5">
                                    <select name="selectType" id="selectBanner" style="width: 100%">
                                        <option value="1">图片</option>
                                        <option value="3">html类</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">开始时间</label>
                                <div class="col-sm-5">
                                    <input type="text" id="beginTime" name="beginTime" class="form-control"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">结束时间</label>
                                <div class="col-sm-5">
                                    <input type="text" id="endTime" name="endTime" class="form-control"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row" >
                                    <label  class="col-sm-4 control-label" >Banner</label>
                                    <div class="col-sm-3">
                                        <input type="file" name="file">
                                    </div>
                                    <div class="col-sm-2">
                                        <input type="button" id="bannerBtn" name="bannerBtn" value="上传" >
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="row" >
                                    <label  class="col-sm-4 control-label" >Banner地址</label>
                                    <div class="col-sm-5">
                                        <input type="text" name="bannerUrl" id="beginBannerUrl" class="form-control" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="box-footer col-xs-12">
                            <div class="col-sm-3 col-lg-offset-5">
                                <button type="reset" class="btn btn-primary">重置</button>
                                <input  type="button" id="bannerSubmit" class="btn btn-primary pull-right" value="提交">
                            </div>
                        </div>
                    </div>
                    </c:if>
            </form>
        </div>

    </section>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>