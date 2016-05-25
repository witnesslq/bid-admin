<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="row shiro_funcForm">
    <form id="form1" action="/support/shiro/func/save" method="post">
        <input type="hidden" name="funcId" value="${func.funcId}"/>
        <input type="hidden" id="parentId" name="parentId" value="${func.parentId}"/>
        <div class="form-group">
            <label for="funcName" data-error="">功能名称：</label>
            <input type="text" class="form-control validate" placeholder="请输入角色名称" id="funcName" name="funcName"
                   value="${func.funcName}" maxlength="15"/>
        </div>
        <div class="form-group">
            <label for="funcName" data-error="">url：</label>
            <input type="text" class="form-control validate" placeholder="请输入url，填写URL地址模板，如：/foo/bar" id="action"
                   name="action"
                   value="${func.action}" maxlength="128"/>
            <span class="text-red"></span>
        </div>
        <div class="form-group">
            <label for="funcName" data-error="">权限代码：</label>
            <input type="text" class="form-control validate" placeholder="请输入权限代码，权限代码格式如：module:action" id="permission"
                   name="permission" value="${func.permission}" maxlength="128"/>
            <span class="text-red"></span>
        </div>
        <div class="form-group">
            <label for="seqNum" data-error="">序列号：</label>
            <input type="text" class="form-control validate" placeholder="请输入序列号，[0-99]的整数" id="seqNum" name="seqNum"
                   value="${func.seqNum}" maxlength="128"/>
            <span class="text-red"></span>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-sm blue lighten-2" id="submit_btn">
                <span class="glyphicon glyphicon-ok"></span> 保存
            </button>
            <button type="button" class="btn btn-primary btn-sm blue lighten-2" id="del_btn" data_id="${func.funcId}"
                    data_name="${func.funcName}">
                <span class="glyphicon glyphicon-floppy-remove"></span> 删除
            </button>
        </div>


            <div class="row">
                <div class="col s4 center">

                </div>

                <c:if test="${!empty func.funcId }">
                    <div class="col s4 center">

                    </div>
                </c:if>
            </div>

        </form>
    <div id="modal1" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">提示</h4>
                </div>
                <div class="modal-body">
                    <p id="content"></p>
                </div>
                <div class="modal-footer">
                    <a id="disAgree" type="button" class="btn btn-default pull-left" data-dismiss="modal">DisAgree</a>
                    <a id="delAgree" type="button" class="btn btn-primary">Agree</a>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>
</div>
<script src="/static/admin/dist/js/bundle.js"></script>