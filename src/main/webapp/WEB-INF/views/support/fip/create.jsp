<%@ page import="com.hnczb.product.dto.FipDTO" %>
<%@include file="/WEB-INF/views/common/common_title.jsp" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div class="content-wrapper container-fluid fip-create">
    <div class="content-header">
        <h3>新增FIP产品</h3>
    </div>
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-pills nav-justified">
                        <li class="active" id="tab1"><a href="#baseinfo" data-toggle="tab">基本信息</a></li>
                        <li class="" id="tab2"><a href="#sendinfo" data-toggle="tab">发行信息</a></li>
                        <li class="" id="tab3"><a href="#mujiinfo" data-toggle="tab">募集信息</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="active tab-pane" id="baseinfo">
                            <div  style="margin-top: 30px">
                                <div class="row" >
                                    <div class="col-xs-6">
                                        <label for="name" class="col-xs-3 control-label">产品名称</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="name" name="name">
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <label class="col-xs-3 control-label">合同编号</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="contractNo" name="contractNo" placeholder="从cms平台获取" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  style="margin-top: 25px">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <label for="categoryDesc" class="col-xs-3 control-label">产品类型</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="categoryDesc" name="categoryDesc" >
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <label for="refundType" class="col-xs-3 control-label">还款方式</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" id="refundType" name="refundType" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div  style="margin-top: 25px">
                                <div class="row" >
                                    <label for="description" class="col-xs-3 control-label">购买说明</label>
                                    <div class="col-sm-8">
                                        <textarea  rows="5" id="description" name="description" class="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 25px">
                                <div class="row" >
                                    <label for="introduction" class="col-xs-3 control-label" >产品介绍</label>
                                    <div class="col-sm-8">
                                        <textarea rows="5" id="introduction" name="introduction" class="form-control" ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 25px">
                                <div class="row" >
                                    <label for="buyHint" class="col-xs-3 control-label" >收益计算</label>
                                    <div class="col-sm-8">
                                        <textarea rows="5" id="buyHint" name="buyHint" class="form-control"></textarea>
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
                                            <input type="file" name="file">
                                        </div>
                                        <div class="col-sm-4">
                                            <input type="text" name="beginBanner" id="beginBanner" />
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="button"id="beginBannerBtn" value="上传" >
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
                                            <input type="text" name="endBanner" id="endBanner">
                                        </div>
                                        <div class="col-sm-2">
                                            <input id="endBannerBtn" type="button" value="上传">
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
                                            <a href="#timeline"class="btn btn-danger btn-block " id="nextOne">下一步</a>
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
                                            <label for="minBuyAmount" class="col-xs-3 control-label" >单笔最小</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="minBuyAmount" name="minBuyAmount" d>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="maxBuyAmount" class="col-xs-3 control-label">单笔最大</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="maxBuyAmount" name="maxBuyAmount" d>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="buyStepAmount" class="col-xs-3 control-label">步进值</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="buyStepAmount" name="buyStepAmount" d>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="basicNo" class="col-xs-3 control-label">基础资产编号</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="basicNo" name="basicNo" d>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label  class="col-xs-3 control-label">计息日</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"  id="beginDate" name="beginDate" >
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="endDateStr" class="col-xs-3 control-label">到期日</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"  id="endDateStr" name="endDateStr" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label class="col-xs-4 control-label">年化收益率(%)</label>
                                            <div class="col-sm-7">
                                                <input type="text" class="form-control" id="annualIncome" name="annualIncome">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="dueDesc" class="col-xs-3 control-label">时长</label>
                                            <div class="col-sm-6">
                                                <input type="text" class="form-control" id="dueDesc" name="dueDesc" disabled>
                                            </div>
                                            <div class="col-sm-1">
                                                <p>天</p>
                                            </div>
                                        </div>
                                        <div class="col-xs-6">
                                            <label for="incomeRate" class="col-xs-4 control-label">实际收益率</label>
                                            <div class="col-sm-7">
                                                <input type="text" class="form-control" id="incomeRate" name="incomeRate" disabled>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-2 control-label">风险等级</label>
                                    <c:forEach var="item" items="${riskTypeList}">
                                        <div class="col-sm-1">
                                            <label class="radio">
                                                <input type="radio" name="riskInvestType" value=${item.key}> ${item.value}
                                            </label>
                                        </div>
                                    </c:forEach>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="row" >
                                        <div class="col-xs-6">
                                            <label for="groupLimit" class="col-xs-3 control-label" >每组人数</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="groupLimit" name="groupLimit" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="col-sm-offset-4 col-sm-4">
                                        <a href="#timeline"class="btn btn-danger btn-block " id="nextTwo">下一步</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="mujiinfo" style="margin-top: 30px">
                            <div class="form-horizontal">
                                <div class="post">
                                    <div class="form-group ">
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <label for="amount" class="col-xs-3 control-label">产品总金额</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" id="amount" name="amount" >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <label for="showTimeStr" class="col-xs-3 control-label">对外显示时间</label>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control" id="showTimeStr" name="showTimeStr" >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <label for="buyBeginTimeStr" class="col-xs-3 control-label">募集开始时间</label>
                                                <div class="col-sm-8">
                                                    <input type="datetime" class="form-control date-picker"  id="buyBeginTimeStr" name="buyBeginTimeStr" >
                                                </div>
                                            </div>
                                            <div class="col-xs-6">
                                                <label for="buyEndTimeStr" class="col-xs-3 control-label">募集结束时间</label>
                                                <div class="col-sm-8">
                                                    <input type="datetime" class="form-control date-picker" id="buyEndTimeStr" name="buyEndTimeStr" >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="post">
                                    <input type="button" class="btn btn-danger" id="addFipBtn" value="新增募集时间">
                                </div>
                                <div id="muji"></div>
                                <div class="form-group" style="margin-top: 25px">
                                    <div class="col-sm-offset-4 col-sm-4">
                                        <button class="btn btn-danger btn-block " id="submitForm">提交</button>
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