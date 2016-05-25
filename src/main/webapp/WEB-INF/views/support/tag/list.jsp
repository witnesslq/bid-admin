<%@include file="/WEB-INF/views/common/common_title.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="content-wrapper czb-tag-list">
    <div class="content-header">
        <h3>标签列表</h3>
    </div>
    <div class="content">
        <shiro:hasPermission name="tag:add">
            <div class="row" style="margin-bottom: 10px;">
                <div class="col-xs-12">
                    <a class="btn btn-primary" href="/support/tag/add">新增</a>
                </div>
            </div>
        </shiro:hasPermission>
        <div class="row" style="margin-bottom: 10px;">
            <div class="col-xs-12">
                <div class="btn-group">
                <a class="btn btn-info <c:if test="${isArchived==null}">btn-success</c:if>" href="/support/tag/list">所有
                </a>
                <a class="btn btn-info <c:if test="${isArchived!=null && !isArchived}">btn-success</c:if>" href="/support/tag/list?isArchived=false">未归档</a>
                <a class="btn btn-info <c:if test="${isArchived}">btn-success</c:if>" href="/support/tag/list?isArchived=true">已归档</a>
                </div>
            </div>
        </div>

        <c:forEach var="tag" items="${tags}">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">标签名: ${tag.name} </h3>
                        </div>
                        <div class="box-body">
                            <div>
                                <c:if test="${tagConditionMap[tag.id][0].filterType==1}">
                                    <span class="bg-red">完全匹配</span>
                                </c:if>
                                <c:if test="${tagConditionMap[tag.id][0].filterType==2}">
                                    <span class="bg-red">任意匹配</span>
                                </c:if>
                            </div>
                            <div>
                                人数： ${tagUserCountMap[tag.id]}人
                            </div>

                        <ol class="grey-text">
                            <c:forEach var="tagCondition" items="${tagConditionMap[tag.id]}">
                                <li>
                                    <c:if test="${tagCondition.field=='field_age'}">
                                        年龄
                                    </c:if>
                                    <c:if test="${tagCondition.field=='field_phone'}">
                                        手机号
                                    </c:if>
                                    <c:if test="${tagCondition.field=='field_company'}">
                                        公司
                                    </c:if>
                                    <c:if test="${tagCondition.field=='field_gender'}">
                                        性别
                                    </c:if>
                                    <c:if test="${tagCondition.condition=='>'}">
                                        大于
                                    </c:if>
                                    <c:if test="${tagCondition.condition=='<'}">
                                        小于
                                    </c:if>
                                    <c:if test="${tagCondition.condition=='='}">
                                        等于
                                    </c:if>
                                        ${tagCondition.value}
                                </li>
                            </c:forEach>
                        </ol>
                        <span class="chip">创建时间：${tag.createdTime}</span>
                        <span class="chip">更新时间：${tag.updatedTime}</span>
                            <div>
                        <shiro:hasPermission name="tag:load">
                            <a class="btn btn-primary" data-id="${tag.id}"
                               href="/support/tag/${tag.id}/excel"
                               id="btn-download">下载名单
                            </a>
                        </shiro:hasPermission>
                        <shiro:hasPermission name="tag:keep">
                            <c:if test="${!tag.archived}">
                                <a class="btn btn-primary" data-id="${tag.id}" id="btn-archive">归档</a>
                            </c:if>
                            <c:if test="${tag.archived}">
                                <a class="btn btn-primary" data-id="${tag.id}" id="btn-un-archive">取消归档
                                </a>
                            </c:if>
                            <a class="btn btn-primary" data-id="${tag.id}" id="btn-refresh">刷新</a>
                        </shiro:hasPermission>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </c:forEach>
    </div>

</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>
