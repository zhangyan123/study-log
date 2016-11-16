var page = {
  operater: "<button type='button' class='btn btn-primary 'rel='manualMbtn' data-toggle='modal' data-target='#myModal'>点击查看</button>",
  pageCount:1,
  rowsCount:0,
  // lastPageRows:0,
  rowsLimit:1,
  curTableNum:1//默认首先展示第一个表的内容
  // oldPageIndex:0
};
$(function() {
    // $("table[id=table"+page.curTableNum+"]").siblings('table').hide();
    prevNextClick();
    tableChange();
    topSearchInput();
    newTable($("table[id=table"+page.curTableNum+"]"+" tbody"),res[page.curTableNum-1], page.operater);
});
/**
 * 翻页效果实现
 */
 function pageNumClick(oldPageIndex){
   var pageTagGroup =$("#pageTag");
   var tagNum = pageTagGroup.children(":not(:first,:last)");
   var curTagNum;
   if(typeof oldPageIndex!==undefined){
     curTagNum=oldPageIndex;
     tagNum.eq(curTagNum).trigger('click');
   }

    // 添加页码点击事件
  tagNum.each(function(i,tag){
        $(tag).click(function(){
        // 取当前页码
        curTagNum =i+1;
        // 计算当前页展示行起始位置
        var curPStartRNum =i*(page.rowsLimit);
        // 获取新建表格的所有行tr
        var newTrs =$("table[id=table"+page.curTableNum+"] tbody").children('tr');
        // 获取需展示行
        var $showTrs = newTrs.filter(":gt("+(curPStartRNum-1)+"),:lt("+(curPStartRNum+page.rowsLimit)+")");
        // 获取隐藏行
        var $hideTrs = newTrs.filter(":lt("+curPStartRNum+"),:gt("+(curPStartRNum+page.rowsLimit-1)+")");
        //处理只显示需要行
        $showTrs.show();
        $hideTrs.hide();
        pageTagGroup.children('button').removeClass('active');
        $(this).addClass('active');
        });
    });

 }
 /**
  * 位prev和next按钮添加点击事件
  */
 function prevNextClick(){
     var pageTagGroup =$("#pageTag");
     var $prev =  pageTagGroup.find(':first');
     var $next = pageTagGroup.find(":last");
     var oldPageIndex=0;
     //寻找当前页码

       $prev.click(function(){
         pageTagGroup.children(":not(:first,:last)").each(function(i,tag){
           var judge = $(tag).hasClass('active');
           if(judge){
           oldPageIndex=i;
           }
         });
         if(oldPageIndex>0){
           oldPageIndex--;
             pageNumClick(oldPageIndex);
         }
       });
       $next.click(function() {
         pageTagGroup.children(":not(:first,:last)").each(function(i,tag){
           var judge = $(tag).hasClass('active');
           if(judge){
           oldPageIndex=i;
           }
         });
         if(oldPageIndex<page.pageCount){
           oldPageIndex++;
             pageNumClick(oldPageIndex);
         }
       });

 }
/**
 * 为每行按钮添加只读模态框内容
 */
function addModalEvent() {
    var Mbtn = $("button[rel=manualMbtn]"); //找到动态添加的模态框按钮

    Mbtn.each(function(i, item) { //遍历每一个添加的模态框出发按钮

        $(item).click(function() {
            var Mbody = $(".modal-body tbody");
            Mbody.children(':not(:first)').remove();
            var dataObj = $(item).parents("tr").data("course_information");
            var $tr = $("<tr></tr>");
            eachMap(dataObj, function(value) {
                var $td = $("<td></td>");
                $td.text(value);
                $tr.append($td);
            });
            Mbody.append($tr);
        });
    });
}
/**
 * 信息表格切换效果
 */
function tableChange() {
    var nav = $("ul.nav li");
    var tables = $("#table-container table");
    var tableContainer = $("#table-container");
    nav.each(function(i,navLi){
      $(navLi).click(function() {
          $(this).addClass("active").siblings().removeClass("active");
          var curIndex = $(this).index();
          var curTbody = "#table"+(curIndex+1)+" tbody";
          var requireDta = res[curIndex];
          newTable($(curTbody),requireDta,page.operater); tables.eq(curIndex).removeClass('hide').siblings().addClass('hide');
          page.curTableNum=curIndex+1;
      });
    });

}
/**
 * 搜索框响应效果
 */
function topSearchInput() {
    var search = $("#info-search").children('[type=text]');
    search
        .focus(function() {
            if (search.attr("value") === "搜搜")
                search.attr('value', '');
        })
        .blur(function() {
            if (search.attr("value") === '') {
                search.attr('value', "搜搜");
            }
        });
}
/**
 * 根据传入数据res创建新表格并返回tbody
 */
function newTable(oldTbody,data,operater) {
      page.pageCount=1;//页面总数
      page.rowsCount=0;//新表格总行数统计
      // page.lastPageRows=0;//新表格最后一页行数统计
    var $tbody = $("<tbody></tbody>");
    eachMap(data, function(item) {
        var $tr = renderTr(item, operater);
        $tbody.append($tr);
        page.rowsCount++;
        if(page.rowsCount>page.rowsLimit){
          page.lastPageRows=(page.rowsCount%page.rowsLimit)?(page.rowsCount%page.rowsLimit):(page.rowsLimit);
        }//计算最后一个行数
    });
   page.pageCount=Math.ceil(page.rowsCount/page.rowsLimit);//更新页面总数
   oldTbody.empty().parent().append($tbody.children());
  // 默认隐藏超出行
   var newTrs =oldTbody.children('tr');
   var $hideTrs = newTrs.filter(":gt("+(page.rowsLimit-1)+")");
   $hideTrs.hide();
   var $showTrs =newTrs.filter(":lt("+(page.rowsLimit)+")");
   $showTrs.show();
   createPageTag();
   pageNumClick();
   addModalEvent();

}
/**
 * 将每一位老师的信息添加进一行并返回行
 */
function renderTr(data, operater) {
    var $tr = $("<tr></tr>");
    // 为每一个td填充显示数据活缓存展示在模态框中的数据
    eachMap(data, function(item) {
        if (typeof item === "object") {
            $tr.data("course_information", item);
        } else {
            var $td = $("<td></td>");
            $td.text(item);
            $tr.append($td);
        }
    });
    if (operater !== null) { // 排除模态对话框
        $tr.append($("<td></td>").html(operater));
    }
    return $tr;
}
/**
 * 创建遍历传入数据集合的遍历组件
 */
function eachMap(obj, callback) {
    if (getType(obj) === 'array') {
        for (var i = 0, len = obj.length; i < len; i++) {
            callback(obj[i], i);
        }
    } else {
        for (var key in obj) {
            callback(obj[key], key);
        }
    }
}
/**
 * 创建获取数据类型组件
 */
function getType(target) {
    return Object.prototype.toString.apply(target).slice(8, -1).toLowerCase();
}
/**
 * 生成页码组件
 */
 function createPageTag(){
   var pageTagGroup =$("#pageTag");
   var nextTag =pageTagGroup.children(":last");
      //  初始化页码为1
       pageTagGroup.children(":gt(1):not(:last)").remove();
  //  根据生成表格反馈的页数生成页码
       for(var i=2;i<page.pageCount+1;i++){
         var $button = "<button type='button' class='btn btn-default'>"+i+"</button>";
         nextTag.before($($button));
       }
     $("#pageTag").find(":eq(1)").addClass('active');
 }
