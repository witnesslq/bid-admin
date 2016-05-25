<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container">
    <div class="content-header">
        <h3>产品列表</h3>
    </div>
    <div class="content">
        <c:forEach var="fipDTO" items="${fipDTOList}">
            <div class="row">
                <div class="col-xs-10">
                    <div class="box">
                        <div class="box-header">
                            <h3 class="box-title">${fipDTO.id} : ${fipDTO.name}</h3>
                        </div>
                        <div class="box-body">
                            <div class="row" style="margin-bottom: 10px;">
                                <div class="col-xs-2"><a href="/support/fip/${fipDTO.id}/detail" title="上传产品明细" class="btn btn-primary">上传产品明细</a></div>
                                <div class="col-xs-2"><a href="/support/fip/${fipDTO.id}/refundDetail" title="上传回款明细" class="btn btn-primary">上传回款明细</a></div>
                                <div class="col-xs-2"><a href="/support/fip/info?id=${fipDTO.id}" title="修改基本信息" class="btn btn-primary">修改基本信息</a></div>
                                <div class="col-xs-2"><a href="/support/fip/rule?id=${fipDTO.id}" title="修改募集时间" class="btn btn-primary">修改募集时间</a></div>
                            </div>
                            <div class="row">
                                <div class="col-xs-2"><a href="/support/fip/operation?id=${fipDTO.id}"
                                                         title="执行其他操作" class="btn btn-primary">执行其他操作</a></div>
                                <div class="col-xs-2"><a href="/support/fip/tag_manage?id=${fipDTO.id}" title="修改募集时间"
                                                         class="btn btn-primary">购买权限配置</a></div>
                            </div>
                        </div>
                        <div class="row">
                            <c:set var="now" value="<%=new java.util.Date()%>"/>
                            <c:if test="${item.endTime > now}">
                                <shiro:hasPermission name="fip:update">
                                    <a href="/support/announcement/create?id=${item.id}" role="button" class="edit">编辑</a>
                                </shiro:hasPermission>
                                <shiro:hasPermission name="fip:delete">
                                    <a href="javascript:void(0);" data-id="${item.id}" role="button" class="del">删除</a>
                                </shiro:hasPermission>
                            </c:if>
                        </div>
                    </div>
                </div>
            </div>
        </c:forEach>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>