<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="content-wrapper support-important">
    <div class="content">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">新增重要日期</h3>
                <div class="box-tools"></div>
            </div>
            <div class="box-body">
                <form id="createForm" class="form-inline" role="form">
                    <div class="form-group">
                        <label for="date">日期</label>
                        <input name="date" id="date" type="text" value='${date}' class="form-control valid">
                    </div>
                    <div class="form-group">
                        <select id="type" name="type" class="form-control">
                            <!--option value="" disabled selected>选择类型</option-->
                            <c:forEach items="${list}" var="t">
                                <option value="${t.type}" <c:if test="${type == t.type}">checked</c:if> >类型：${t.title}</option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="button" id="important_addBtn" class="btn btn-primary">提交</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>