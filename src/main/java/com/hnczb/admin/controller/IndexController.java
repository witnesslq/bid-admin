package com.hnczb.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
/**
* Home页
*
* */
@Controller
@RequestMapping("/support")
public class IndexController {

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(Model model) {

        model.addAttribute("action", "index");
        return "/index";
    }

}

