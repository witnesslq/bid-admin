<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper support-apprelease-create">
    <section class="content-header">
        <h1>app版本发布管理</h1>
    </section>
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">app新版本发布</h3>

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
            <form class="form-horizontal">
                <div class="box-body">
                    <div class="form-group">
                        <label for="url" class="col-sm-2 control-label">下载链接</label>
                        <div class="col-sm-6">
                            <input type="text" id="url" name="url"  class="form-control" <c:if test="${info!=null}">value="${info.downloadUrl}" </c:if> />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="md5" class="col-sm-2 control-label">md5</label>
                        <div class="col-sm-6">
                            <input type="text" id="md5" name="md5"  class="form-control" <c:if test="${info!=null}">value="${info.md5Signature}" </c:if> />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="releaseDate" class="col-sm-2 control-label">更新时间</label>

                        <div class="col-sm-3">
                            <input name="releaseDate" id="releaseDate" type="text" class="form-control"
                                   <c:if test="${info!=null}">value='${fn:substring(info.releaseDate, 0, 16)}</c:if>'>
                        </div>
                        <div class="checkbox col-sm-2">
                            <label for="forceUpdate">
                                <input type="checkbox" name="forceUpdate" id="forceUpdate"
                                       <c:if test="${info!=null && info.forceUpdate}">checked</c:if> />强制更新
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="title" class="col-sm-2 control-label">标题</label>
                        <div class="col-sm-6">
                            <input type="text" id="title" name="title"  class="form-control" <c:if test="${info!=null}">value="${info.versionTitle}" </c:if> />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="version" class="col-sm-2 control-label">版本号</label>
                        <div class="col-sm-6">
                            <input type="text" id="version" name="version"  class="form-control" <c:if test="${info!=null}">value="${info.version}" </c:if> />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="versionCode" class="col-sm-2 control-label">编译版本</label>
                        <div class="col-sm-6">
                            <input type="text" id="versionCode" name="versionCode"  class="form-control" <c:if test="${info!=null}">value="${info.versionCode}" </c:if> />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="content" class="col-sm-2 control-label">内容</label>

                        <div class="col-sm-6">
                            <textarea id="content" name="content" class="form-control" style="height: 150px"><c:if test="${info!= null}">${info.versionContent}</c:if></textarea>
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
                <div class="box-footer col-sm-12">
                    <c:if test="${info != null}">
                        <input type="hidden" name="id" value="${info.id}">
                    </c:if>
                    <input type="hidden" name="model" value="${type}">
                    <button type="reset" class="btn btn-default">重置</button>
                    <button type="submit" id="apprelease_addBtn" class="btn btn-primary pull-right">提交</button>
                </div>
                <!-- /.box-footer -->
            </form>
        </div>
    </section>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>