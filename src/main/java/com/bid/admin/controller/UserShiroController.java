package com.bid.admin.controller;

import com.bid.admin.entity.Role;
import com.bid.admin.entity.UserEx;
import com.bid.admin.entity.UserShiro;
import com.bid.admin.service.RoleService;
import com.bid.admin.service.UserShiroService;
import com.bid.admin.util.SessionUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;


@Controller
@RequestMapping(value = "/support/shiro")
public class UserShiroController {

    private static Logger logger = LoggerFactory.getLogger(UserShiroController.class);

    @Autowired
    private UserShiroService userService;
    @Autowired
    private RoleService roleService;

    @RequiresPermissions("shiroUser:list")
    @RequestMapping(value = { "user/list"})
    public String getUserShiroList(@RequestParam(value = "pn", defaultValue = "1") Integer pageNum,
                                   @RequestParam(value = "ps", defaultValue = "10") Integer pageSize, Model model,String loginName,String realName) {

        if (pageNum == null) {
            pageNum = 1;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        if("".equals(loginName)){
            loginName=null;
        }
        if("".equals(realName)){
            realName=null;
        }
        //总条数
        int count = userService.getUserExCount(loginName, realName);
        //总页数
        int totalPage = (count + pageSize - 1) / pageSize;
        //开始条数
        int start=(pageNum-1)*pageSize;

        model.addAttribute("count", totalPage);
        model.addAttribute("pn", pageNum);
        model.addAttribute("loginName", loginName);
        model.addAttribute("realName", realName);

        List<UserEx> userShiroList = userService.getUserExList(start, pageSize, loginName, realName);

        model.addAttribute("list", userShiroList);
        model.addAttribute("action", "user-list");

        return "/support/shiro/userList";
    }

    @RequiresPermissions("shiroUser:update")
    @RequestMapping(value = "user/update/{userId}", method = RequestMethod.GET)
    public String updateForm(@PathVariable String userId, Model model) throws Exception {
        UserEx ue = userService.getUserExByUserId(userId);

//            if(ue.getRoles()!=null && ue.getRoles().size()>0) {
//                ue.setRoleName(ue.getRoles().get(0).getRoleName());
//                ue.setRoleId(ue.getRoles().get(0).getId().toString());
//            }
            //查询全部角色
        List<Role> roleList=roleService.findAll();

        UserShiro current = SessionUtil.currentUser();
        if(current.getLoginName().equals(ue.getLoginName())){
            model.addAttribute("flg", "0");
        }
        model.addAttribute("user", ue);
        model.addAttribute("roleList", roleList);
        model.addAttribute("action", "update");
        return "/support/shiro/userForm";
    }

    @ModelAttribute("preloadUser")
    public UserEx getUser(@RequestParam(required = false) String userId) throws Exception {
        if (StringUtils.isNotBlank(userId)) {
            return userService.getUserExByUserId(userId);
        }

        return new UserEx();
    }

    @RequiresPermissions("shiroUser:update")
    @RequestMapping(value = "user/update", method = RequestMethod.POST)
    public String update(@ModelAttribute("preloadUser") UserShiro user,String roleName, RedirectAttributes redirectAttributes) {

        try {
            UserShiro current = SessionUtil.currentUser();
            //更新用户信息
            if(current.getLoginName().equals(user.getLoginName())){
                userService.updateCurrentUserInfo(user);

            }else{
                userService.updateUserInfo(user,roleName);
            }
            redirectAttributes.addFlashAttribute("message",  "保存用户信息成功!");
        } catch (Exception e) {
            logger.debug("保存用户信息成功失败: {}", e.getMessage());
            logger.error(e.getMessage(), e);
            redirectAttributes.addFlashAttribute("message", "保存用户信息失败:" + e.getMessage());
        }

        return "redirect:/support/shiro/user/list";
    }

    @RequestMapping(value = "user/checkLoginName")
    @ResponseBody
    public boolean checkLoginName(String oldName,String loginName) {
        if(loginName.equals(oldName)){
            return true;
        }else{
            logger.info("*****************checkLoginName*********************");
            UserEx userEx=userService.getUserExByLoginName(loginName);
            if (userEx!=null){
                return false;
            }else{
                return true;
            }
        }

    }

    @RequiresPermissions("shiroUser:create")
    @RequestMapping(value = "user/create", method = RequestMethod.GET)
    public String createForm(Model model) throws Exception {
        //查询全部角色
        List<Role> roleList=roleService.findAll();
        model.addAttribute("roleList", roleList);
        model.addAttribute("user", new UserEx());
        model.addAttribute("action", "create");
        return "/support/shiro/userForm";
    }

    @RequiresPermissions("shiroUser:create")
    @RequestMapping(value = "user/create", method = RequestMethod.POST)
    public String create(@ModelAttribute("preloadUser") UserEx user,String roleName,RedirectAttributes redirectAttributes) {
        try {
            user.setRoleId(roleName);
            userService.saveUser(user);
            redirectAttributes.addFlashAttribute("message",  "创建用户成功!");
        } catch (Exception e) {
            logger.debug("创建失败: {}", e.getMessage());
            logger.error(e.getMessage(), e);
            redirectAttributes.addFlashAttribute("message", "创建用户失败:" + e.getMessage());
        }
        return "redirect:/support/shiro/user/list";
    }

    @RequiresPermissions("shiroUser:delete")
    @RequestMapping(value = "user/delete/{userId}", method = RequestMethod.GET)
    public String delete(@PathVariable String userId, RedirectAttributes redirectAttributes) throws Exception {
        try {
            userService.deleteUser(userId);
            redirectAttributes.addFlashAttribute("message",  "删除用户成功!");
        } catch (Exception e) {
            logger.debug("删除失败: {}", e.getMessage());
            logger.error(e.getMessage(), e);
            redirectAttributes.addFlashAttribute("message", "删除用户失败:" + e.getMessage());
        }
        return "redirect:/support/shiro/user/list";
    }

//    @RequiresPermissions("shiroUser:resetPwd")
//    @RequestMapping(value = "user/resetPwd/{userId}")
//    public String resetPwd(@PathVariable String userId, RedirectAttributes redirectAttributes) throws Exception {
//
//        userService.resetPassword(userId);
//
//        redirectAttributes.addFlashAttribute("message", "\"用户密码\"已经重置为与\"登录账号\"相同！");
//        return "redirect:/support/shiro/user/list";
//    }

}
