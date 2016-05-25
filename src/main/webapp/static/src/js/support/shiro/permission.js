if ($('#pemissionTree').length > 0) {
    var permission = {};

    /*
     * 调整包含树的容器的高度.
     */
    permission.adjustHeight = function () {
        var ph = document.body.clientHeight;

        var $tc = $('.tree-container');
        var $footer = $('.page-footer');
        var fh = 0;
        if ($footer.length) {
            fh = $footer.outerHeight();
        }
        if ($tc.size() > 0) {
            var th = ph - $tc.offset().top - fh - 38;
            $tc.height(2000);
        }
    }

    /*
     * 初始化zTree.
     * @tid zTree的实例容器#id
     * @opt Ztree设置项.
     */
    permission.initTree = function (tid, opt) {
        //$.fn.zTree.destroy(tid);
        return $.fn.zTree.init($('#' + tid), opt);
    }

    permission.init = function () {
        //左侧菜单高亮显示

        permission.adjustHeight();

        /************************ 配置功能树 ************************/
        var settings = new TreeSetting('/support/shiro/func/tree');
        $.extend(true, settings, {
            check: {
                enable: true
                , chkboxType: {"Y": "ps", "N": "ps"}
            },

            async: {
                dataFilter: dataFilter
                , autoParam: ["id=pid"]
            },

            callback: {
                onAsyncSuccess: onAsyncSuccess
                , onAsyncError: onAsyncError
                , onClick: onClick
            }
        });


        function dataFilter(treeId, parentNode, childNodes) {
            if (!childNodes) return null;
            for (var i = 0, l = childNodes.length; i < l; i++) {
                if (childNodes[i].id == '0') {
                    //修改根节点的样式
                    childNodes[i].iconSkin = 'root';
                    childNodes[i].nocheck = true;
                }

                if ($.inArray(childNodes[i].id, rfids) != -1) {
                    childNodes[i].checked = true;
                }
            }
            return childNodes;
        }


        function onClick(event, treeId, treeNode, clickFlag) {
            funcTree.checkNode(treeNode, !treeNode.checked, true, true);
        }


        var asynCount = 0, asyncRoot = true;

        function onAsyncSuccess(event, treeId, treeNode, msg) {
            if (asyncRoot) {
                asyncRoot = false;
            } else {
                asynCount--;
            }

            if (!!treeNode) {
                asyncNodes(treeNode.children);
            } else {
                asyncNodes(funcTree.getNodes());
            }

            //common.log('onAsyncSuccess : asynCount = ' + asynCount);
        }

        function onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
            //asynCount--;
            //common.log('onAsyncError : asynCount = ' + asynCount);
        }

        /*
         * 异步加载并展开子节点.
         */
        function asyncNodes(nodes) {
            if (!nodes)
                return;

            var zTree = funcTree;
            for (var i = 0, l = nodes.length; i < l; i++) {
                if (nodes[i].isParent && nodes[i].zAsync) {
                    asyncNodes(nodes[i].children);
                } else {
                    if (nodes[i].level < 99 && nodes[i].isParent) {
                        asynCount++;
                        zTree.reAsyncChildNodes(nodes[i], "refresh", false);
                    }
                }
            }
        }

        /************************ 配置功能树 end ************************/

        //加载角色的权限id
        var rfids = [];
        $.ajax('/support/shiro/role/perms/' + $('.roleId').val() + '/json', {
            async: false
            , dataType: 'json'
            , success: function (data, textStatus, jqXHR) {
                rfids = data;
            }
        });

        //初始化zTree
        var funcTree = permission.initTree('pemissionTree', settings);

        $('#submit_btn').on('click', function () {
            var fids = [];
            var nodes = funcTree.getCheckedNodes(true);
            $.each(nodes, function () {
                fids.push(this.id);
            });

            $('#funcIds').val(fids.join());
            $('#fids').val(fids.join());
            var url = '/support/shiro/role/perms/' + $('.roleId').val();
            $('#permissionForm').attr('action', url)[0].submit();
        });

    }
    permission.init();

    module.exports = permission;
}

