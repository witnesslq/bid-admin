package com.bid.admin.controller;

import com.bid.admin.entity.FunctionEx;
import com.bid.admin.service.FunctionService;
import com.bid.admin.util.MyGson;
import com.bid.admin.util.TreeNode;
import com.google.common.collect.Lists;
import com.bid.admin.entity.Function;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;


@Controller
@RequestMapping(value = "/support/shiro")
public class FunctionController {

	@Autowired
	private FunctionService functionService;

	@RequestMapping(value={"func"})
	public String main() {
		return "support/shiro/function";
	}

	@RequiresPermissions("shiroFunc:tree")
	@RequestMapping("func/tree")
	@ResponseBody
	public String tree(String pid) {

		TreeNode root = null;
		if (StringUtils.isBlank(pid)) {
			root = new TreeNode("0", "功能树", null);
			root.setIsParent(true);
			root.setOpen(false);

			//因为zTree需要数组形式的json，所以这里转换一下
			return MyGson.getInstance().toJson(new TreeNode[]{root});
		}

		List<FunctionEx> funcs = functionService.findByParentId(pid);
		List<TreeNode> nodes = bind2TreeNode(funcs);

		return MyGson.getInstance().toJson(nodes);
	}


	private TreeNode newTreeNode(FunctionEx func) {
		String id = String.valueOf(func.getFuncId());
		String name = func.getFuncName();
		TreeNode node = new TreeNode(id, name, null);
		if (StringUtils.isNotBlank(func.getParentId())) {
			node.setpId(func.getParentId());
		}
		if (func.getChildren() > 0) {
			node.setIsParent(true);
		}

		node.getData().put("seqNum", func.getSeqNum());

		return node;
	}

	private List<TreeNode> bind2TreeNode(List<FunctionEx> funcs) {
		List<TreeNode> list = Lists.newArrayList();
		for (FunctionEx func : funcs) {
			list.add(newTreeNode(func));
		}

		return list;
	}

	@RequestMapping("func/form")
	public String loadForm(String id, String pId,  Model model) {

		Function func = null;
		if (StringUtils.isNotBlank(id)) {
			func = functionService.getFunction(id);
		}
		func = func == null ? new Function() : func;

		if (func.getParentId() == null && StringUtils.isNotBlank(pId)) {
			func.setParentId(pId);
		}

		model.addAttribute("func", func);

		return "/support/shiro/functionForm";
	}

	@RequiresPermissions("shiroFunc:save")
	@RequestMapping("func/save")
	public String save(@ModelAttribute("preload") Function func, RedirectAttributes redirectAttr) {

		functionService.insertFunction(func);

		redirectAttr.addFlashAttribute("message", "保存成功！");

		return "redirect:/support/shiro/func";
	}

	@RequiresPermissions("shiroFunc:delete")
	@RequestMapping("func/delete/{id}")
	public String delete(@PathVariable String id, RedirectAttributes redirectAttr) {

		int n = functionService.countByPId(id);
		if (n > 0) {
			redirectAttr.addFlashAttribute("message", "无法删除父功能!");

		} else {
			functionService.delFunction(id);

			redirectAttr.addFlashAttribute("message", "操作成功！");
		}
		return "redirect:/support/shiro/func";
	}

	@ModelAttribute("preload")
	public Function preload(String id) {
		Function func = null;
		if (StringUtils.isNotBlank(id))
			func = functionService.getFunction(id);

		return func == null ? new Function() : func;
	}

	@RequestMapping(value = "func/checkName")
	@ResponseBody
	public boolean checkName(String oldName, String funcName, String pId) {
		if (oldName.equals(funcName)) {
			return true;
		} else {
			return functionService.getByNameAndPId(funcName, pId) == null;
		}
	}

	@RequiresPermissions("shiroFunc:change")
	@RequestMapping(value = "func/change")
	@ResponseBody
	public boolean change(String id, String pId, @RequestParam(required=false)Integer seqNum) {
		Function f = new Function();
		f.setFuncId(Long.valueOf(id));
		f.setParentId(pId);
		if (seqNum != null)
			f.setSeqNum(seqNum);

		functionService.insertFunction(f);

		return true;
	}

}
