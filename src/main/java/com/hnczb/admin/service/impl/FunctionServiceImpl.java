package com.hnczb.admin.service.impl;


import com.google.common.collect.Lists;
import com.hnczb.admin.entity.Function;
import com.hnczb.admin.entity.FunctionEx;
import com.hnczb.admin.entity.RoleFunc;
import com.hnczb.admin.mapper.FunctionMapper;
import com.hnczb.admin.mapper.FunctionMapperEx;
import com.hnczb.admin.mapper.RoleFuncMapper;
import com.hnczb.admin.security.ShiroCacheManager;
import com.hnczb.admin.service.FunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class FunctionServiceImpl implements FunctionService {
    @Autowired
    private FunctionMapper functionMapper;
    @Autowired
    private RoleFuncMapper roleFuncMapper;

    @Autowired
    private ShiroCacheManager shiroCacheManager;

    @Autowired
    private FunctionProvider functionProvider;
    @Autowired
    private FunctionMapperEx functionMapperEx;

    @Transactional
    public void insertFunction(Function f) {
        try {
            if (f.getFuncId() != null) {
                functionMapper.updateByPrimaryKey(f);
            } else {

                functionMapper.insert(f);
            }

            functionProvider.reload();

            shiroCacheManager.clear();

        } catch (Exception e) {
          e.getStackTrace();
        }
    }

    @Transactional
    public void delFunction(String fid) {
        delRoleFunc(fid);
        functionMapper.deleteByPrimaryKey(Long.valueOf(fid));

        functionProvider.reload();

        shiroCacheManager.clear();
    }

    @Transactional
    public void delRoleFunc(String fid) {
        roleFuncMapper.deleteByFuncId(Integer.valueOf(fid));
    }

    public Function getFunction(String fid) {
        try {
            return functionMapper.selectByPrimaryKey(Long.valueOf(fid));
        } catch (Exception e) {
            e.getStackTrace();
            return null;
        }
    }

    public List<FunctionEx> findByParentId(String parentId) {

        return functionMapperEx.selectByPid(parentId);
    }

    public int countByPId(String parentId) {

        return functionMapper.countByParentId(parentId);
    }

    public Function getByNameAndPId(String funcName, String pId) {


        List<Function> list = functionMapper.selectByNameAndPid(pId, funcName);

        return (list.size() > 0 ? list.get(0) : null);
    }

    public List<Function> findAll() {
        return functionMapper.selectAll();
    }


//	@Autowired
//	private FunctionMapperEx functionMapperEx;
//
//	public List<FunctionEx> findExByPId(String pid) {
//
//		return functionMapperEx.selectByPid(pid);
//	}

    //根据roleId查询function
    public List<Function> findByRoleId(String roleId) {
        List<Function> funclist = Lists.newArrayList();
        //根据roleid查询functionid
        List<RoleFunc> list = roleFuncMapper.selectByRoleId(Integer.valueOf(roleId));
        if (list != null && list.size() > 0) {

            //根据functionid查询Function信息
            for (RoleFunc roleFunc : list) {
                Function func = functionMapper.selectByPrimaryKey(Long.valueOf(roleFunc.getFuncId()));
                funclist.add(func);
            }
            return funclist;
        } else {
            return null;
        }
    }
}
