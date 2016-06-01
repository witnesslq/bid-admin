package com.bid.admin.vo;

import com.bid.common.exception.CommonErrors;
import com.bid.common.exception.ErrorCode;

/**
 * 结果对象
 */
public class Result {
    public Result(){}

    public Result(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    private ErrorCode errorCode = CommonErrors.SUCCESS;


    private Object data;

    public void setErrorCode(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrCode(){
        return errorCode.getErrorCode();
    }


    public String getErrMsg(){
        return errorCode.getErrorMsg();
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
