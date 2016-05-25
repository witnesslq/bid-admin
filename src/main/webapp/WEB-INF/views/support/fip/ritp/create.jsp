<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid ritp-create">
    <div class="content-header">
        <h3>新建信诚产品</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-pills nav-justified">
                        <li class="active" id="tab1"><a href="#baseinfo" data-toggle="tab">基本信息</a></li>
                        <li class="" id="tab2"><a href="#sendinfo" data-toggle="tab">发行信息</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="active tab-pane" id="baseinfo">
                            <div  style="margin-top: 30px">
                                <div class="row" >
                                    <div class="col-xs-6">
                                        <label for="name" class="col-xs-3 control-label">产品名称</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="name" name="ritpName">
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <label class="col-xs-3 control-label">FUND_CODE</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="fundCode" name="fundCode" >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style="margin-top: 25px">
                                <div class="row" >
                                    <div class="col-xs-6">
                                        <label class="col-xs-3 control-label">推介编号</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="ritpRecommendNo" name="ritpRecommendNo" placeholder="从cms平台获取" >
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <label class="col-xs-3 control-label">推介名称</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="ritpReferralTitle" name="ritpReferralTitle" >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div  style="margin-top: 25px">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label for="ritpUnit" class="col-xs-3 control-label">管理单位</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="ritpUnit" name="ritpUnit" >
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <label for="ritpRefundType" class="col-xs-3 control-label">还款方式</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="ritpRefundType" name="ritpRefundType" >
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style="margin-top: 25px;margin-left: 20px">
                                <div class="row">
                                    <div class="col-xs-12 table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                            <tr>
                                                <th width="20%" style="text-align:center;">标题</th>
                                                <th width="60%" style="text-align:center;">内容</th>
                                                <th width="20%"style="text-align:center;"><button class="btn btn-danger btn-xs" id="addTr">添加 </button></th>
                                            </tr>
                                            </thead>
                                            <tbody class="canAddTr">
                                            <tr id="del">
                                                <td><input type="text" class="title"  id="ritpIntroductionTitle" name="ritpIntroductionTitle"></td>
                                                <td> <textarea rows="5" id="ritpIntroduction" name="ritpIntroduction" class="form-control" ></textarea></td>
                                                <td style="text-align:center;"><button class="btn btn-danger btn-xs" id="delete" name="del">删除</button></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div style="margin-top: 25px" class="row">
                                <p class="col-sm-offset-4 col-sm-5">上传文件要求（尺寸:1920*300, 格式:jpg, 大小:小于200k）</p>
                            </div>
                            <div style="margin-top: 25px">

                                <form id="formBegin" method="post" enctype="multipart/form-data">
                                    <div class="row" >
                                        <label  class="col-xs-3 control-label" >开始banner</label>
                                        <div class="col-sm-3">
                                            <input type="file" name="file" >
                                        </div>
                                        <div class="col-sm-4">
                                            <input type="text" name="beginBanner" id="beginBanner" disabled/>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="button"id="beginBannerBtn" class="btn btn-danger btn-sm" value="上传" >
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div style="margin-top: 25px">

                                <form id="formEnd" method="post" enctype="multipart/form-data">
                                    <div class="row" >
                                        <label  class="col-xs-3 control-label" >结束banner</label>
                                        <div class="col-sm-3">
                                            <input type="file" name="file">
                                        </div>
                                        <div class="col-sm-4">
                                            <input type="text" name="endBanner" id="endBanner" disabled>
                                        </div>
                                        <div class="col-sm-2">
                                            <input id="endBannerBtn" type="button" class="btn btn-danger btn-sm" value="上传">
                                        </div>


                                    </div>
                                </form>

                            </div>


                            <div style="margin-top: 25px">
                                <div class="row" >
                                </div>
                            </div>

                            <div style="margin-top: 25px">
                                <div class="row" >
                                    <div class="form-group" >
                                        <div class="col-sm-offset-4 col-sm-4">
                                            <a href="#sendinfo"class="btn btn-danger btn-block " id="nextOne">下一步</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="sendinfo">
                            <div class="form-horizontal">
                                <div class="form-group" style="margin-top: 30px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="expectBeginDate" class="col-xs-3 control-label" >预期计息日</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="expectBeginDate" name="expectBeginDate" >
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="expectEndDate" class="col-xs-3 control-label">预期到期日</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="expectEndDate" name="expectEndDate">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row">
                                        <div class="col-xs-6">
                                            <label for="expectedAnnualYield" class="col-xs-3 control-label" >预期年化收益率(%)</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="expectedAnnualYield" name="expectedAnnualYield" >
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="form-group" style="margin-top: 30px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="ritpOften" class="col-xs-3 control-label">时长</label>
                                            <div class="col-sm-6">
                                                <input type="text" class="form-control" id="ritpOften" name="ritpOften" disabled>
                                            </div>
                                            <div class="col-sm-1">
                                                <p>天</p>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="effectiveYield" class="col-xs-3 control-label">实际收益率</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="effectiveYield" name="effectiveYield" disabled>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" style="margin-top: 30px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="showTime" class="col-xs-3 control-label" >展示时长</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" id="showTime" name="showTime" >
                                            </div>
                                            <div class="col-sm-3">
                                                <select id="due_unit" name="due_unit">
                                                    <option value ="天"> 天 </option>
                                                    <option value ="月"> 月 </option>
                                                    <option value="年"> 年 </option>
                                                </select>
                                                <%--<input type="text" class="form-control" id="due_unit" name="due_unit" placeholder="单位:天/月">--%>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="showTimeIndroduction" class="col-xs-3 control-label">展示时长说明</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="showTimeIndroduction" name="showTimeIndroduction">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="totalAmount" class="col-xs-3 control-label">产品总金额</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="totalAmount" name="totalAmount" >
                                            </div>

                                        </div>
                                        <div class="col-xs-6">
                                            <div class="col-sm-2">
                                                =  300万 *
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="text" class="form-control" id="threeAmount" name="threeAmount" >
                                            </div>
                                            <div class="col-sm-2">
                                                + 400万 *
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="text" class="form-control" id="fourAmount" name="fourAmount" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label  class="col-xs-3 control-label">对外显示时间</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"  id="displayTime" name="displayTime" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="raiseBeginTime" class="col-xs-3 control-label" >募集开始时间</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="raiseBeginTime" name="raiseBeginTime">
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="raiseEndTime" class="col-xs-3 control-label">募集结束时间</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="raiseEndTime" name="raiseEndTime">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" style="margin-top: 25px">
                                    <div class="col-sm-offset-4 col-sm-4">
                                        <button class="btn btn-danger btn-block " id="submitData">提交</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.tab-pane -->
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="/WEB-INF/views/common/common_footer.jsp" %>