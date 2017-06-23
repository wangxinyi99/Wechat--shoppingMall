$(function(){
	// 详情数量减少
	$('.details_con .minus,.cart_count .minus').click(function(){
		var _index=$(this).parent().parent().index()-1;
		var _count=$(this).parent().find('.count');
		var _val=_count.val();
		if(_val>1){
			_count.val(_val-1);
			$('.details_con .selected span').eq(_index).text(_val-1);
			
		}
		if(_val<=2){
			$(this).addClass('disabled');
		}
		
	});

	// 详情数量添加
	$('.details_con .add,.cart_count .add').click(function(){
		var _index=$(this).parent().parent().index()-1;
		var _count=$(this).parent().find('.count');
		var _val=_count.val();
		$(this).parent().find('.minus').removeClass('disabled');
		_count.val(_val-0+1);
		$('.details_con .selected span').eq(_index).text(_val-0+1);
		
	});

	//详情属性选择
	$('.details_con ul li dd').click(function(e) {
		clickChoose(this);
	});
	
	//处理默认选中的
	$('.details_con ul li dd[class="check"]').each(function(){
		clickChoose(this);
	});
});

//获取属性值图片
function getPropValImgs(valId){
	 for(var i=0;i<propValueImgList.length;i++){
		  if(propValueImgList[i].valueId==valId){
			  var imgList = propValueImgList[i].imgList;
			  var str = "";
			  var strCounts = "";
			  for(var j=0;j<imgList.length;j++){

				  str+= '<li style="display: table-cell; vertical-align: middle; max-width: 768px;">';
				  str+= '<a href="#"><img style="max-width:100vw;max-height:80vw;margin:auto;" src="'+photoPath+imgList[j]+'"></a>';
				  str+= '</li>';
				  
				  strCounts+= '<li></li>';
			  }
			  
			  $("#slide .tempWrap ul").html(str);
			  $("#slide .hd ul").html(strCounts);
			  
			//插件：图片轮播
			 TouchSlide({
			  	slideCell:"#slide",
			  	titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
			  	mainCell:".bd ul",
			  	effect:"left",
			  	autoPlay:false,//自动播放
			  	autoPage:true, //自动分页
			  	switchLoad:"_src" //切换加载，真实图片路径为"_src"
			  });

			  break;
		  }
	  }
}

//选中属性
function clickChoose(object){
	//---------------------------------------------------------------------- 输出语句
	//console.debug("clickChoose 被调用到。");
	
	if (!$(object).hasClass('attr_sold_out')) {
		$(object).addClass('check').siblings().removeClass('check');
	}
	
	var chooseCount = $(object).parents("li").attr("index");
	
    getSku($(object).attr("key"),chooseCount);
    
    getPropValImgs($(object).attr("valId")); //获取属性图片
}

function getSelectedSkus(propIndex){
	var selectedLiList = [];
	  var selIndex = 0;
	  for(var h=0;h<=propIndex;h++){
		  if($("#choose_"+h+" .check").length!=0){
			  selectedLiList[selIndex]=$("#choose_"+h+" .check").get(0);
			  selIndex++;
		  }
	  }
	  
	  var index = 0;
	  var newSkus = [];
	  for(var i=0;i<skuDtoList.length;i++){
		  var has = true;
		  for(var j=0;j<selectedLiList.length;j++){
			  var kv = $(selectedLiList[j]).attr("key");
			  if(skuDtoList[i].properties.indexOf(kv)<0){
				  has = false;
				  break;
			  }
		  }
		  if(has){
			  newSkus[index]=skuDtoList[i];
			  index++;
		  }
	  }
	  return newSkus;
}

//获取sku
function getSku(kv,chooseIndex){
	//---------------------------------------------------------------------- 输出语句
	//console.debug("getsku 被调用到。kv:"+kv+"; chooseIndex:"+chooseIndex);
	
	propIndex = Number(chooseIndex);
	
	  var id = Number(propIndex);
	  while($("#choose_"+id).length!=0){
		  var aList = $("#choose_"+id+" dd").get();
		  for(var i=0;i<aList.length;i++){
			  var kv = $(aList[i]).attr("key");
			  var has = false;
			  var newSkus = getSelectedSkus(id-1);
			  for(var j=0;j<newSkus.length;j++){
				  if(newSkus[j].properties.indexOf(kv)>=0 && newSkus[j].status==1){
					  has = true;
					  break;
				  }
			  }
			  if(!has){
				  $(aList[i]).removeClass("check");
				  $(aList[i]).addClass("tb-out-of-stock");
			  }else{
				  $(aList[i]).removeClass("tb-out-of-stock");
			  }
		  }
		  id++;
	  }
	
	 $(".details_con ul li").removeClass("no-selected");
	
	var propLiCount = $("li[id^='choose_']").length;
	
	 if($(".check").length == propLiCount){
			var kvList = [];
			var checkList = $(".check").get();
			for(var k=0;k<checkList.length;k++){
				kvList[k]=$(checkList[k]).attr("key");
			}
			for(var i=0;i<skuDtoList.length;i++){
				var isT = true;
				for(var j=0;j<kvList.length;j++){
					if(skuDtoList[i].properties.indexOf(kvList[j])<0){
						isT = false;
						break;
					}
				}
				if(isT){
					//console.debug("选中的sku ："+ JSON.stringify(skuDtoList[i]));
					$("#currSkuId").val(skuDtoList[i].skuId);
					if(skuDtoList[i].name!=null && skuDtoList[i].name!=''){
						$("#prodName").html(skuDtoList[i].name);
					}else{
						$("#prodName").html(prodName);
					}
					
					var promotionPrice=Number(skuDtoList[i].amountDetail.promotionPrice);
					var cash=Number(skuDtoList[i].amountDetail.cash);
					if(promotionPrice<=cash){ //说明有折扣
						$("#prodCash").html(promotionPrice.toFixed(2));
					}else{
						$("#prodCash").html(cash.toFixed(2));
					}
					//$("#prodCash").html(skuDtoList[i].price.toFixed(2));
					break;
				}
			}
			allSelected=true;
		}else{
			//floatNotify.simple("请选中 属性！");
			var dlList = $("li[id^='choose_'] dl").get();
			for(var i=0;i<dlList.length;i++){
				if($(dlList[i]).find(".check").length==0){
					$(dlList[i]).parent().addClass("no-selected");
				}
			}
			allSelected = false;
		}
	  
}


//加入购物车
function addShopCart() {
	if (!allSelected) {//是否全部选中
		return;
	}
	var prodId = currProdId;//商品Id
	var prodCount = $("#prodCount").val();//购买数量
	jQuery.ajax({
		url : contextPath + "/addShopBuy",
		data : {
			"prodId" : prodId,
			"count" : prodCount,
			"sku_id" : $("#currSkuId").val(),
			"distUserName":distUserName
		},
		type : 'post',
		async : false, //默认为true 异步   
		dataType : 'json',
		error : function(data) {
		},
		success : function(retData) {
			if (retData.status == 'LESS') {
				floatNotify.simple(prodLessMsg);
			} else if (retData.status == 'OWNER') {
				floatNotify.simple(failedOwnerMsg);
			} else if (retData.status == 'MAX') {
				floatNotify.simple(failedBasketMaxMsg);
			} else if (retData.status == 'ERR') {
				floatNotify.simple(failedBasketErrorMsg);
			}else if (retData.status == 'NO_SHOP') {
				floatNotify.simple("商家不存在");
			}else if (retData.status == 'OFFLINE') {
				floatNotify.simple("该商品已经下线,不能购买！");
			}else if (retData.status == "OK") {
				floatNotify.simple("成功加入购物车！");
				var basketCount =  $("#totalNum").html();
				$("#totalNum").html(Number(basketCount)+Number(prodCount));
			}
		}
	});
}

//立即购买
function buyNow() {
	if (!allSelected) {//是否全部选中
		return;
	}
	var prodId = currProdId;
	var prodCount = $("#prodCount").val();//购买数量
	//var prodAttr = getProdAttr();
	jQuery.ajax({
		url : contextPath + "/addShopBuy",
		data : {
			"prodId" : prodId,
			"count" : prodCount,
			"sku_id" : $("#currSkuId").val(),
			"distUserName":distUserName
		},
		type : 'post',
		async : false, //默认为true 异步   
		dataType : 'json',
		error : function(data) {
		},
		success : function(retData) {
			if (retData.status == 'LESS') {
				floatNotify.simple(prodLessMsg);
			} else if (retData.status == 'OWNER') {
				floatNotify.simple(failedOwnerMsg);
			} else if (retData.status == 'MAX') {
				floatNotify.simple(failedBasketMaxMsg);
			} else if (retData.status == 'ERR') {
				floatNotify.simple(failedBasketErrorMsg);
			}else if (retData.status == 'NO_SHOP') {
				floatNotify.simple("商家不存在");
			}else if (retData.status == 'OFFLINE') {
				floatNotify.simple("该商品已经下线,不能购买！");
			}else if (retData.status == "OK") {
				window.location.href = contextPath+"/shopcart";
			}
		}
	});

}

/** 收藏商品 **/
function addInterest(obj,prodId){
	 var _this = $(obj);
	jQuery.ajax({
		url : contextPath + "/addInterest",
		data : {
			"prodId" : prodId
		},
		type : 'post',
		async : false, //默认为true 异步   
		dataType : 'json',
		error : function(data) {
		},
		success : function(retData) {
			floatNotify.simple(retData.message);
			if(retData.status == 1){
				//更换样式
				_this.find("i").addClass("i-fav-active");
			}
		}
	});
}

//获取参数页面
var paramResult;
function queryParameter(element,prodId){
	
	if(paramResult!=undefined){
		element.find('.desc-area').html(paramResult);
	}else{
		$.ajax({
			url: contextPath+"/queryDynamicParameter", 
			data: {"prodId":prodId},
			type:'post', 
			async : true, //默认为true 异步   
			error:function(data){
			},   
			success:function(data){
				paramResult=data;
				element.find('.desc-area').html(paramResult);
			}   
		});         
	}
	
	element.addClass('hadGoodsContent');
 }
 
//获取评论
function queryProdComment(element,prodId){
  var data = {
    "curPageNO": $("#prodCommentCurPageNO").val(),
	"prodId":prodId
  };
  jQuery.ajax({
	url:contextPath+"/comments",
	data: data,
	type:'post', 
	async : true, //默认为true 异步   
	error: function(jqXHR, textStatus, errorThrown) {
 		 //alert(textStatus, errorThrown);
	},
	success:function(result){
		element.html(result);
	}
  });
  element.addClass('hadGoodsContent');
}

//获取下一页评价
function next_comments(curPageNO,obj){
	var th = jQuery("#goodsContent .bd ul").eq(2);
	var page = parseInt(curPageNO)+1;
	var prodId = $("#prodId").val();
	var data = {
		    "curPageNO": page,
			"prodId":prodId
		};
	var _this = $(obj);
	jQuery.ajax({
		url:contextPath+"/comments",
		data: data,
		type:'post', 
		async : true, //默认为true 异步   
		error: function(jqXHR, textStatus, errorThrown) {
	 		 //alert(textStatus, errorThrown);
		},
		success:function(result){
			th.append(result);
			_this.remove();
		}
	  });
}