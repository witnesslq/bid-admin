if ($('#funcTree').length > 0) {
    var func = {};

    /*
     * 调整包含树的容器的高度.
     */
    func.adjustHeight = function () {
        var ph = document.body.clientHeight;

        var $tc = $('.tree-container');
        var $footer = $('.page-footer');
        var fh = 0;
        if ($footer.length) {
            fh = $footer.outerHeight();
        }
        //if($('#form1').length>0){
            //if ($tc.size() > 0) {
            //    var th = ph - $tc.offset().top - fh - 38;
            //    $tc.height(th);
            //}
            $tc.height(2000);
        //}else{
        //    if ($tc.size() > 0) {
        //        var th = ph - $tc.offset().top +50;
        //        $tc.height(th);
        //    }
        //}

    };
    //func.message=function(){
    //    var message=$('.shiro_function #message').val();
    //    if(message!=null&&message!="undefined"&&message!=""){
    //        $('#content').append('<p>'+message+'</p>');
    //        $('#modal1').openModal();
    //    }
    //}

    /*
     * 初始化zTree.
     * @tid zTree的实例容器#id
     * @opt Ztree设置项.
     */
    func.initTree = function (tid, opt) {
        //$.fn.zTree.destroy(tid);
        return $.fn.zTree.init($('#' + tid), opt);
    };

    func.delFunction = function (id, name) {
        $('#content').children('p').remove();
        var $form = $('#delAgree');
        $form.attr('href', '/support/shiro/func/delete/' + id);
        $('#content').append('<p>你确定要删除此功能吗?</p>');

        $('#modal1').openModal();
    };

    func.init = function () {
        //左侧菜单高亮显示

        func.adjustHeight();

        /************************ 配置功能树 ************************/
        var settings = new TreeSetting('/support/shiro/func/tree');
        $.extend(true, settings, {
            view: {
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
            edit: {
                enable: true,
                editNameSelectAll: true,
                removeTitle: '删除',
                renameTitle: '编辑',
                showRemoveBtn: function (treeId, treeNode) {
                    return !treeNode.isParent;
                },
                showRenameBtn: function (treeId, treeNode) {
                    return false;
                },
                drag: {
                    isCopy: false
                }
            },

            async: {
                dataFilter: dataFilter
                , autoParam: ["id=pid"]
            },

            callback: {
                onAsyncSuccess: onAsyncSuccess
                , onClick: onClick
                , beforeRemove: beforeRemove
                , onDrop: onDrop
            }
        });


        function dataFilter(treeId, parentNode, childNodes) {

            if (!childNodes) return null;
            for (var i = 0, l = childNodes.length; i < l; i++) {
                if (childNodes[i].id == '0') {
                    //修改根节点的样式
                    childNodes[i].iconSkin = 'root';
                }
            }
            return childNodes;


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
        }

        function onClick(event, treeId, treeNode, clickFlag) {
            loadForm(treeNode, false);
        }

        function beforeRemove(treeId, treeNode) {
            func.delFunction(treeNode.id, treeNode.name);
            return false;
        }

        function loadForm(treeNode, addFlag) {
            $('#func-form').empty();

            var url = '/support/shiro/func/form?plain';
            if (addFlag)
                $('#func-form').load(url, {pId: treeNode.id});
            else
                $('#func-form').load(url, {id: treeNode.id});
        }

        function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
            var node = treeNodes[0];
            var pId = node.pId;
            var seqNum = node.data.seqNum;

            if (moveType == 'inner') {
                pId = targetNode.id;
            } else if (moveType == 'prev' || moveType == 'next') {
                pId = targetNode.pId;
                seqNum = moveType == 'prev' ? targetNode.data.seqNum - 1 : targetNode.data.seqNum + 1;
            }

            if (pId != node.pId || seqNum != node.seqNum) {
                $.post("/support/shiro/func/change", {id: node.id, pId: pId, seqNum: seqNum}, function (data) {
                    common.log(data);
                });
            }
        }

        /*
         * 异步加载并展开子节点.
         */
        function asyncNodes(nodes) {
            if (!nodes) return;
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

        //----------- 添加自定义的编辑按钮 ----------
        function addHoverDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
            var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                + "' title='添加' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_" + treeNode.tId);
            if (btn) btn.bind("click", function () {
                loadForm(treeNode, true);
                return false;
            });
        };

        function removeHoverDom(treeId, treeNode) {
            $("#addBtn_" + treeNode.tId).unbind().remove();
        };
        //----------- /添加自定义的编辑按钮 ----------

        /************************ 配置功能树 end ************************/

        //初始化zTree
        var funcTree = func.initTree('funcTree', settings);

    }
    $('.tree-container').ready(function(){
        func.init();
    });
    //func.message();

    module.exports = func;
}