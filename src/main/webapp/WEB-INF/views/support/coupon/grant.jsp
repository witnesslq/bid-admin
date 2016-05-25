<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container coupon-grant">
    <div class="content-header">
        <h3>粮票发放</h3>
    </div>
    <div class="content">
        <div class="row" style="margin-bottom: 10px;">
            <div class="col-xs-12">
            <a class="btn btn-primary" href="/support/coupon/list">粮票批次列表</a>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">粮票发放明细</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label for="coupon-name">粮票名称</label>
                            <input id="coupon-name" name="couponName" type="text" class="form-control validate">
                        </div>
                        <div class="form-group">
                            <label for="coupon-amount">粮票金额</label>
                            <input id="coupon-amount" name="couponAmount"  type="number" class="form-control validate" >
                        </div>
                        <div class="form-group">
                            <label for="coupon-description">粮票描述</label>
                            <textarea id="coupon-description" name="couponDescription" class="form-control"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="show-time">用户可见时间</label>
                            <input name="showTime" id="show-time" type="text" value='' class="form-control validate">
                        </div>
                        <div class="form-group">
                            <label for="begin-time">开始时间</label>
                            <input name="beginTime" id="begin-time" type="text" value='' class="form-control validate">
                            <label for="end-time">结束时间</label>
                            <input name="endTime" id="end-time" type="text" value='' class="form-control validate">
                        </div>
                        <div class="form-group">
                            <label for="coupon-fip-id">产品</label>
                            <select id="coupon-fip-id" name="couponFipId" class="form-control">
                                <option>请选择产品</option>
                                <c:forEach var="fip" items="${fipDTOs}">
                                    <option value="${fip.id}">${fip.name}</option>
                                </c:forEach>
                            </select>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-4">
                                <select id="select-tag" class="form-control">
                                    <option>请选择要发放的标签</option>
                                    <c:forEach var="tag" items="${tags}">
                                        <c:if test="${!tag.archived}">
                                            <option value="${tag.id}">${tag.name}</option>
                                        </c:if>
                                    </c:forEach>
                                </select>
                            </div>
                            <button class="btn btn-primary" style="margin-bottom: 10px;" id="btn-add-tag" >添加</button>
                            <div class="col-xs-12" style="margin-bottom: 10px;">
                                <table class="table" id="div-selected-tag" ></table>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" id="btn-grant">发粮票</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>
