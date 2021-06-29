/**
 * 模仿ACFUN通知条
 * @authors 野兔 (admin@azimiao.com)
 * @date    2017-03-05 22:00:00
 * @version 0.1.2
 */


//中期目标：优化结构，现在的结构有问题。
//后期目标：实现多条消息，其中早消息向上移动，新消息占据老消息的位置。
//
//
//
var greenMessageBox = {
	fontColor : "#FBFBFF",
	mainColor : "#95ba12",
	borderColor : "#86a710",
}

var redMessageBox = {
	fontColor : "#FBFBFF",
	mainColor : "#e74c3c",
	borderColor : "#e43422",
}

var blueMessageBox = {
	fontColor : "#FBFBFF",
	mainColor : "#055f95",
	borderColor : "#055586",
}

var pinkMessageBox = {
	fontColor : "#FBFBFF",
	mainColor : "#f78fa7",
	borderColor : "#ff86a2",
}

var newPinkMessageBox = 
{
	fontColor : "#FBFBFF",
	mainColor : "#ff8c83",
	borderColor : "#fa8072",
}
var box_width = 0;
//访客来源信息
var theWeb = [
	    		["azimiao.com","梓喵出没"],
	    		["baidu.com","百度"],
	    		["bdimg.com","百度"],
	    		["google","google"],
	    		["xema07.pw","xema"],
	    		["xema.ink","xema"],
	    		["c0smx.com","c0smx"],
	    		["xjh.me","岁月小筑"],
	    		["yetu.ml","兔子窝"],
	    		["canxi.cc","未满残曦"],
	    		["bfdz.ink","bfdz"],
	    		["weicn.org","WeiCN"],
	    		["hd9990.tk","HD9990"],
	    		["myloveru.cn","梦想博客"],
	    		["skyblond.info","天空Blond"]
	    	];
//初始化
function init_Message_Box(theColor,theMessage){
	//生成消息框
	//switch 比较 ===，即数据类型与值都相等
	switch (theColor)
	{
		case "":case "undefined":case undefined :case null:
		{
			//默认消息框颜色：绿色
			chose_Box_Color("green");
			break;
		}
		default:
		{
			chose_Box_Color(theColor);
		}
	}
	

	switch (theMessage)
	{
		case "welcome":
		{
			checkCookie();
			break;
		}
		case "test":
		{
			set_Box_Word("这是一段测试文字");
			//测试输出
			alert("div宽度："+box_width);
			actionBox("thenotice");
			break;
		}
		default:
		{
			set_Box_Word(theMessage);
			actionBox("thenotice");
		}
	}

}

//选择消息框颜色
function chose_Box_Color(theColor){

	switch (theColor) 
	{
		case "green":case greenMessageBox:
		{
			print_Message_Box(greenMessageBox);
			break;
		}
		case "red":case redMessageBox:
		{
			print_Message_Box(redMessageBox);
			break;
		}
		case "blue":case blueMessageBox:
		{
			print_Message_Box(blueMessageBox);
			break;
		}
		case "pink":case pinkMessageBox:
		{
			print_Message_Box(pinkMessageBox);
			break;
		}
		case "newpink":
		{
			print_Message_Box(newPinkMessageBox);
			break;
		}
		default:
		{
			alert("其他颜色开发中哦，已重新设置为绿色");
			print_Message_Box(greenMessageBox);
		}	
	}


}

//打印消息框
function print_Message_Box (a) {
	// 打印html代码，包含css与一个id为thenotice的div
	var MessageBox = a;
	document.write("<style type='text/css'>.messagebox{position: fixed;z-index:99999;text-align: left;height: 24px;padding: 0 16px 0 4px;font-weight: bold;line-height: 24px;font-size: 13px;text-shadow:none;font-family: 'Helvetica Neue',Helvetica,Arial,STHeiti,'Microsoft Yahei',sans-serif;border-left: 4px solid "+MessageBox.borderColor+" !important;left: -150px;bottom: 90px;transition: left 0.6s;color: "+MessageBox.fontColor+";background-color: "+MessageBox.mainColor+";box-shadow: 0px 1px 1px #bcbcbc;}.messagebox:hover{left: -1px !important;}</style><div class='messagebox' id='thenotice'></div>");

}

//设置消息
function set_Box_Word (a) {

	console.assert("准备获取notice，a="+a);
	document.getElementById("thenotice").innerHTML = a;
	//将div宽度保存，用于在action_box_back 中使用
	box_width  = document.getElementById("thenotice").clientWidth;
}





//创建cookie
function setCookie(value,myRefer){
	//不填写path的结果：作用域为当前目录
	//不填过期日期的结果：作用时间为关闭浏览器前。
	document.cookie =  "username=" + escape(value) +"; path=www.azimiao.com";
	document.cookie = "myRefer="+escape(myRefer)+"; path=www.azimiao.com";
}
//获取cookie键值
function getCookie(myKey){
	 if(document.cookie.length > 0 )
	{
		var myCookie = document.cookie;	
		var theCookieValue = myCookie.split("; ");
		//console.log(theCookieValue);
		for(var i = 0 ; i < theCookieValue.length ; i++)
		{
			var myValue = theCookieValue[i].split("=");
			if (myKey == myValue[0])
			{
				//console.log(unescape(myValue[1]));
				return unescape(myValue[1]);
			}

		}
		return "";
		
	}
	else
	{
		return "";
	}
}
//检查cookie
function checkCookie(){
	var username = getCookie("username");
	//setTheWord(getWhereYouAre());
	if(username != null && username != "")
	{

		//cookie存在,不处理，但是重写一遍消息框内容，用于刷新后
		console.log("读取到cookie");
		//console.log(getCookie("myRefer"));
		set_Box_Word("欢迎"+getCookie("myRefer")+"的朋友");
		//刷新位置归位
		actionBox_back();
		console.log("位置已归位");
	}
	else
	{
		console.log("准备设置cookie");
		username = "fangke";
		setCookie(username,getWhereYouAre());
		set_Box_Word("欢迎"+getWhereYouAre()+"的朋友");
		actionBox("thenotice");
	}
}
//得到referrer
function getWhereYouAre(){
    if(document.referrer != "null" && document.referrer != "")
    {
    	for(var i = 0;i < theWeb.length; i++)
    		{
    			if(document.referrer.indexOf(theWeb[i][0]) != -1)
    			{
    				console.log(document.referrer);
    				return "来自"+ theWeb[i][1];
    				
    			}
    		}
    	return "未知网站";
    }
    else
    {
    	return "直接访问";
    }
}
// //设置消息框内容
	// function setTheWord(word){
		
	// 	if(word == "" || word == null || word == "undefined")
	// 	{
	// 		a.innerHTML = "欢迎来自未知网站的朋友。";
	// 	}
	// 	else
	// 	{
	// 		a.innerHTML = "欢迎" + word + "的朋友。";
	// 	}
	// }



// //激活一次弹出
function actionBox(boxid){
	
	setTimeout("document.getElementById('thenotice').style.left = '-1px'",100);
    //a.style.left = "-1px";
    setTimeout("actionBox_back();",2000);
}

function actionBox_back(){
	document.getElementById('thenotice').style.left = (-(box_width - 8)).toString() +'px';
}
//<script type="text/javascript" color="255,0,0" opacity='0.7' zIndex="-1" count="99" src="http://www.azimiao.com/js/canvas-nest.min.js"></script>
