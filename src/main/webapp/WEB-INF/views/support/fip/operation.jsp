<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="content-wrapper container fip-operation">
    <div class="content-header">
        <h3>其他操作</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-8">
                <form id="createForm" class="col s12" role="form">
                    <div class="box">
                        <div class="box-body">
                            <div class="form-group">
                                <label class="active" for="type_id">请选择要执行的操作</label>
                                <select name="type_id" id="type_id" class="form-control input-lg">
                                    <option value="${fipInfoStatus.index}">${fipInfoStatus.operation}</option>
                                </select>
                            </div>
                            <shiro:hasPermission name="fip:operation">
                            <div class="form-group">
                                <input type="hidden" name="fip_id" value="${id}"/>
                                <button id="opt_submit_btn" type="button" class="btn btn-success">提交</button>
                            </div>
                            </shiro:hasPermission>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>