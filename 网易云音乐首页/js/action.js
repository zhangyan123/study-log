
$(function(){
  initAll();
});
function initAll(){
  //...start
  // 头部搜索框聚焦与失焦事件处理
  // @search-wrap_input
 $(".search-wrap input").focus(function(){
   if(this.value===this.defaultValue){
     $(this).val(null);
   }else{
     return;
   }
 });
 $(".search-wrap input").blur(function(){
   if(this.value===""){
     $(this).val(this.defaultValue);
   }else{
     return;
   }
 });
 // cd后一张列表划出的点击事件
 // @cd-next
  $("a.cd-next").click(function(){
    var $parent = $(this).parents("div.new-wrap");//根据当前点击获取父元素
    var $v_show = $parent.find("div.new-wrap-list");//找到cd展示区域
    var v_show_left =  $v_show.position().left;
    if( v_show_left===-645){
        $v_show.animate({left:"0px"},"normal");
    }else{
        $v_show.animate({left:"-665px"},"normal");

    }
      return false;
  });
  // cd前一张列表划出的点击事件
  // @cd-prev
$("a.cd-prev").click(function(){
  var $parent = $(this).parents("div.new-wrap");//根据当前点击获取父元素
  var $v_show = $parent.find("div.new-wrap-list");//找到cd展示区域
  var v_show_left =  $v_show.position().left;
  if( v_show_left===-645){
      $v_show.animate({left:"0px"},"normal");
  }else{
      $v_show.animate({left:"-665px"},"normal");

  }
    return false;
});
// 关闭弹框
// @sidebar-login-close
$("a.close").click(function(){
  $(this).parent().parent().hide();
  return false;
});
/*begin--弹出登录首页框*/
// 侧边栏点击登录
// @sidebar-login-home
$("div.sidebar-log-bt a").click(function(){
  $("div#login-home").show();
  return false;
});

//头中的登录按钮点击事件
//top-login-home
$("a#top-login-home").click(function(){
  $("div#login-home").show();
  return false;
});
//从分支登录方式返回登录主页
$("div.sidebar-login-foot").click(function(){
  $(this).parent().hide();
  $("div#login-home").show();
  return false;
});
/*end--弹出登录首页框*/

/*begin--弹出手机登录框*/
$("li#top-tel-login>a").click(function(){
  $("div#login-tel").show();
  return false;
});
$("a#sidebar-tel-login").click(function(){
  $("div#login-tel").show();
  return false;
});

/*end--弹出手机登录框*/

/*begin--弹出邮箱登录框*/
$("li#top-email-login>a").click(function(){
  $("div#login-email").show();
  return false;
});
$("li#login-home-email>a").click(function(){
    $(this).parents("div#login-home").hide();
  $("div#login-email").show();
  return false;
});
/*end--弹出邮箱登录框*/

/*begin--弹出注册框*/
$("a#sidebar-register").click(function(){
  $(this).parents("div#login-home").hide();
  $("div#register").show();
  return false;
});
/*end--弹出注册框*/
//to continue
};
