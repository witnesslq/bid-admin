<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<div class="content-wrapper shiro_function">
    <div class="content-header">
        <h3>功能列表</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-3">
                <div class="tree-container">
                    <ul id="funcTree" class="ztree"></ul>
                </div>
            </div>
            <div class="col-xs-6" id="func-form"></div>
        </div>
    </div>

    <form id="actionForm" action="#" method="post"></form>
    <!-- Modal Trigger -->
    <a class="waves-effect waves-light btn modal-trigger" id="trigger" href="#modal1" style="display: none">Modal</a>

    <!-- Modal Structure -->
    <div id="modal1" class="modal" style="z-index: 1003; display: none; opacity: 1; transform: scaleX(1); top: 10%;">
        <div class="modal-content" id="content">

        </div>
        <div class="modal-footer">
            <a id="delAgree" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
            <a id="disAgree" class=" modal-action modal-close waves-effect waves-red btn-flat">Disagree</a>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp"%>
