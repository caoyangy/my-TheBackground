//本地
//export const BaseUrl="http://192.168.1.153:8091/";
//测试
import axios from "axios";
//教育
const BaseUrl = "https://mangotestwww.huanyueguoji.com/mg_api/"; //测试地址
// const BaseUrl = "https://premangowww.huanyueguoji.com/mg_api/";//预生产
// const BaseUrl = "https://mangowww.huanyueguoji.com/mg_api/"; //正式地址
//电商
// const myUrl = "https://mgmall.huanyueguoji.com/mall_api/";	//正式地址
const myUrl = "https://testmgmall.huanyueguoji.com/mall_api/";	//自测地址
// const myUrl = "https://premgmall.huanyueguoji.com/mall_api/";	//预生产地址
// 供应商接口
const agentUrl = "https://testmgretailstore.huanyueguoji.com/retacp/";	//自测地址
//const agentUrl = "https://mgretailstore.huanyueguoji.com/retacp/";	//正式地址
//图形验证码接口
const imgUrl = "https://mangotestwww.huanyueguoji.com/mg_api/createimagecode";	//自测地址
//const imgUrl = "https://mangowww.huanyueguoji.com/mg_api/createimagecode";	//正式地址

//调用自己的接口
const API = (method,url,data,userid,token,successFn,successFns,errorFn) =>{
	let Host = '';
	if (url.indexOf("?") == -1){
	   Host = url + "?userId=" + userid + '&token=' + token 
	}else{
	   Host = url + "&userId=" + userid + '&token=' + token 
	}
	if(method == 'get'){
		axios.get(BaseUrl + Host ,data, ).then((res) =>{
			if(res.data.code == 200){
				successFn(res)
			}else{
				successFns(res)
			}
		}).catch((res) =>{
			errorFn(res);
		})
	}else if(method == 'post'){
		axios.post(BaseUrl + Host ,data, ).then((res) =>{
			if(res.data.code == 200){
				successFn(res)
			}else{
				successFns(res)
			} 
		}).catch((res) =>{
			errorFn(res);
		})
	}
}
//调用P2P接口
const APIS = (method,url,data,userid,token,successFn,successFns,errorFn) =>{
	let Host = ''
	if (url.indexOf("?") == -1){
	   Host = url + "?userId=" + userid + '&token=' + token 
	}else{
	   Host = url + "&userId=" + userid + '&token=' + token 
	}
	if(method == 'get'){
		axios.get(BaseUrl + Host ,data, ).then((res) =>{
			if(res.data.result == 'success'){
				successFn(res)
			}else{
				successFns(res)
			}
		}).catch((res) =>{
			errorFn(res);
		})
	}else if(method == 'post'){
		axios.post(BaseUrl + Host ,data, ).then((res) =>{
			if(res.data.result == 'success'){
				successFn(res)
			}else{
				successFns(res)
			}
		}).catch((res) =>{
			errorFn(res);
		})
	}
}
// 自测接口
const APIMy = (method,url,data,userid,token,successFn,successFns,errorFn) =>{
	let Host = ''
	if (url.indexOf("?") == -1){
	   Host = url + "?userId=" + userid + '&token=' + token 
	}else{
	   Host = url + "&userId=" + userid + '&token=' + token 
	}
	if(method == 'get'){
		axios.get(myUrl + Host ,data, ).then((res) =>{
			if(res.data.result == 'success'){
				successFn(res)
			}else{
				successFns(res)
			}
		}).catch((res) =>{
			errorFn(res);
		})
	}else if(method == 'post'){
		axios.post(myUrl + Host ,data, ).then((res) =>{
			if(res.data.result == 'success'){
				successFn(res)
			}else{
				successFns(res)
			}
		}).catch((res) =>{
			errorFn(res);
		})
	}
}
// 供应商
const APIA = (method,url,data,userid,token,successFn,successFns,errorFn) =>{
	let Host = '';
	if (url.indexOf("?") == -1){
	   Host = url + "?userId=" + userid + '&token=' + token 
	}else{
	   Host = url + "&userId=" + userid + '&token=' + token 
	}
	if(method == 'get'){
		axios.get(agentUrl + Host ,data, ).then((res) =>{
			if(res.data.code == 200){
				successFn(res)
			}else{
				successFns(res)
			}
		}).catch((res) =>{
			errorFn(res);
		})
	}else if(method == 'post'){
		axios.post(agentUrl + Host ,data, ).then((res) =>{
			if(res.data.code == 200){
				successFn(res)
			}else{
				successFns(res)
			} 
		}).catch((res) =>{
			errorFn(res);
		})
	}
}
export { BaseUrl, myUrl,API, APIS,APIMy,agentUrl,APIA,imgUrl}