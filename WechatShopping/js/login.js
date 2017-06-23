$(function(){
	if(error == '1'){
		floatNotify.simple("您提供的用户名或密码有误");
	}
	
	if(error == '2'){
		floatNotify.simple("该用户已经登录！");
	}
});

function userLogin(){
	var flag =true;
	var postData={};
	
	$("#theForm").find("input").each(function(){
		var $obj=$(this);
		var message=$obj.attr("message");
		if(isBlank($obj.val()) && $obj.attr("required") == "required"){
			floatNotify.simple(message+'不能为空');
			flag=false;
			return false;
		}
	})
		
	if(flag){
		$("#theForm").submit();
	}
}

//方法，判断是否为空
function isBlank(_value){
	if(_value==null || _value=="" || _value==undefined){
		return true;
	}
	return false;
}