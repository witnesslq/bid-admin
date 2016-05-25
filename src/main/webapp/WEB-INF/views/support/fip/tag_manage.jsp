<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="czb-fip-tag-manage content-wrapper container">
    <div class="content-header">
        <h3>配置产品权限</h3>
    </div>
    <div class="content">
        <input type="hidden" id="input-fip-id" value="${fipId}"/>
        <div class="row">
            <div class="col-xs-12">
                <div class="alert alert-warning">不配置默认任何用户都可以购买，配置后，仅拥有该标签的用户可以购买.</div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <span class="card-title teal-text">配置未拥有“已添加标签”用户看到的文案</span>
            </div>
            <div class="col-xs-12">
                <div class="form-group">
                    <label for="phone-error-msg">手机端</label>
                    <textarea id="phone-error-msg" class="form-control"
                              rows="1">${phoneErrorMsg}</textarea>
                </div>
                <div class="form-group">
                    <label for="web-error-msg">网站端</label>
                    <textarea id="web-error-msg" class="form-control"
                              rows="1">${webErrorMsg}</textarea>
                </div>
                <shiro:hasPermission name="fip:tag_manage">
                    <div class="form-group">
                        <a href="#" class="btn btn-primary" id="btn-confirm">确认文案</a>
                    </div>
                </shiro:hasPermission>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">已添加标签</h3>
                    </div>
                    <div class="box-body">
                        <ul class="nav nav-pills nav-stacked">
                            <c:forEach var="fipTagId" items="${fipTags}">
                                <li> ${tagIdMap[fipTagId].name}
                                    <c:if test="${tagIdMap[fipTagId].archived}">
                                        <div class="chip">已归档</div>
                                    </c:if>
                                    <shiro:hasPermission name="fip:tag_manage">
                                        <a href="#!" data-tag-id="${fipTagId}" id="btn-delete-tag"
                                           class="secondary-content"><i class="fa fa-fw fa-remove"></i>移除</a>
                                    </shiro:hasPermission>
                                </li>
                            </c:forEach>
                        </ul>
                    </div>
                </div>
                <div class="box box-solid">
                    <div class="box-header">
                        <h3 class="box-title">未添加标签</h3>
                    </div>
                    <div class="box-body no-padding">
                        <ul class="nav nav-pills nav-stacked">
                            <c:forEach var="tag" items="${unSelectTags}">
                                <c:if test="${!tag.archived}">
                                    <li class="row">${tag.name}<shiro:hasPermission name="fip:tag_manage"><a href="#" data-tag-id="${tag.id}" id="btn-add-tag"><i class="fa fa-fw fa-plus-square"></i>添加</a></shiro:hasPermission></li>
                                </c:if>
                            </c:forEach>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>