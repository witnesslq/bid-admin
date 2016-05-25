<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid ritp-more">
    <div class="content-header">
        <div class="row">
            <h3>${ritp.name}更多操作<strong class="pull-right" style="font-size: 20px"><a href="/support/ritp/list">返回产品列表</a></strong></h3>
        </div>
    </div>
    <div class="content">
        <input type="hidden" value="${ritp.id}" id="ritpId">
        <section class="invoice ">
            <div class="row page-header">
                <div class="pull-right">
                    <input type="text" id="flashTime" name="flashTime" placeholder="时间" style="border-radius:10px;">
                    <button class="btn btn-success" style="font-size: 12px" id="flash">获取文件</button>
                </div>
            </div>
            <c:forEach var="operation" items="${list}">
                <div class="row" id="${operation.id}">
                    <div class="col-xs-3 col-lg-offset-3">
                        <div class="box box-success">
                            <div class="box-body" style="text-align:center;">
                                <span class="box-number">${operation.title}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2 col-lg-offset-1">
                        <c:if test="${operation.status == 2 }">
                            <a class="btn btn-block btn-success">已完成<i class="fa fa-check"></i></a>

                        </c:if>
                        <c:if test="${operation.status != 2}">
                            <a class="btn btn-block btn-success" href="/support/ritp/more/operation?ritpId=${ritp.id}&operationId=${operation.id}">操 作</a>
                        </c:if>
                    </div>
                </div>
            </c:forEach>
        </section>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>