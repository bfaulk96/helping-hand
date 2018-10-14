import {Injectable} from '@angular/core';
import {ApiCall} from '../models/apiCall';
import {ApiHelper} from './api-helper';
import {Constants} from './constants';

@Injectable()
export class ApiCallFactory {
    apiCall: ApiCall;
    apiHelper: ApiHelper;

    constructor(
        apiHelper: ApiHelper
    ) {
        this.apiHelper = apiHelper;
        this.apiCall = new ApiCall();
    }

    getDefaultApiCallForGet(): ApiCall {
        this.apiCall.url = this.apiHelper.getServiceEndPoint();
        this.apiCall.method = Constants.API.VERBS.GET;
        this.apiCall.data = {};
        this.apiCall.params = null;
        return this.apiCall;
    }

    getDefaultForRegister(data: any): ApiCall {
        this.apiCall.url = this.apiHelper.getServiceEndPoint() + "/" + Constants.API.RESOURCES.USER + "/" + Constants.API.RESOURCES.REGISTER;
        this.apiCall.method = Constants.API.VERBS.POST;
        this.apiCall.data = data;
        this.apiCall.params = null;
        return this.apiCall;
    }

    getDefaultForVerify(params: any): ApiCall {
        this.apiCall.url = this.apiHelper.getServiceEndPoint() + "/" + Constants.API.RESOURCES.USER + "/" + Constants.API.RESOURCES.VERIFY;
        this.apiCall.method = Constants.API.VERBS.GET;
        this.apiCall.params = params;
        return this.apiCall;
    }

    getDefaultForLogin(data: any): ApiCall {
        this.apiCall.url = this.apiHelper.getServiceEndPoint() + "/" + Constants.API.RESOURCES.USER + "/" + Constants.API.RESOURCES.LOGIN;
        this.apiCall.method = Constants.API.VERBS.POST;
        this.apiCall.data = data;
        this.apiCall.params = null;
        return this.apiCall;
    }

}
