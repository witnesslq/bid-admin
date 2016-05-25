<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="content-wrapper container vacation-insert">
    <div class="content-header">
        <h3>新增假期</h3>
    </div>
    <div class="content">
        <div class="row margin-top-1em">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                    </div>
                    <div class="box-body">
                        <form id="createForm" class="col s12" role="form">
                            <div class="form-group">
                                <label for="date">日期</label>
                                <input name="date" id="date" type="text" value='${date}' class="form-control valid">
                            </div>
                            <div class="form-group">
                                <label for="due">天数</label>
                                <input name="due" id="due" type="text" value="${due}" class="form-control valid">
                            </div>
                            <div class="form-group">
                                <label for="name">名称</label>
                                <input name="name" id="name" type="text" value="${name}" class="form-control valid">
                            </div>
                            <div class="form-group">
                                <button type="button" id="vacation_addBtn" class="btn btn-primary">提交</button>
                            </div>
                        </form>
                        <!-- form end -->
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>