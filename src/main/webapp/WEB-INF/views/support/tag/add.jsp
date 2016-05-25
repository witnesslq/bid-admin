<%@include file="/WEB-INF/views/common/common_title.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="content-wrapper czb-tag">
    <!-- Main content -->
    <section class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">新建标签</h3>
                <div class="box-tools">
                    <shiro:hasPermission name="announcement:list">
                        <a href="/support/announcement/list" class="btn btn-sm btn-success">
                            <i class="fa fa-list"></i>
                        </a>
                    </shiro:hasPermission>
                </div>
            </div>
            <form  method="post" action="/support/tag" id="add-tag-form" class="form-horizontal">
                <div class="box-body">
                    <div class="form-group">
                        <label for="name" class="col-sm-2 control-label">标签名</label>
                        <div class="col-sm-6">
                            <input type="text" id="name" name="name" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">匹配规则</label>
                        <div class="radio col-sm-5">
                            <label><input name="filterType" value="1" type="radio" id="filterType1" />全部匹配</label>
                            <label><input name="filterType" value="2" type="radio" id="filterType2" />任意匹配</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label">筛选条件</label>
                        <div id="current-tag-condition" class="col-sm-10 pull-right"></div>
                        <div class="col-sm-10 form-inline pull-right">
                            <select id="select-field" name="field" class="form-control">
                                <option value="" disabled selected>选择项目</option>
                                <option value="field_age">年龄</option>
                                <option value="field_gender">性别</option>
                                <option value="field_company">公司</option>
                                <option value="field_phone">手机</option>
                                <option value="field_birthday">生日</option>
                            </select>
                            <select id="select-condition" name="condition" class="form-control">
                                <option value="" disabled selected>选择条件</option>
                                <option value=">">大于</option>
                                <option value="<">小于</option>
                                <option value="=">等于</option>
                            </select>
                            <input id='input-value' type="text" name="value" class="form-control" placeholder="输入值">
                            <button id="btn-add-condition" type="button" class="btn btn-primary">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <button id="btn-save" type="button" class="btn btn-primary">保存</button>
                </div>
            </form>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>
