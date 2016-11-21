var page = {
    operater: "<button type='button' class='btn btn-primary 'rel='manualMbtn' data-toggle='modal' data-target='#myModal'>点击查看</button>",
    operater2: "<button type='button' class='btn btn-primary 'rel='manualMbtn2' data-toggle='modal' data-target='#myModal'>点击修改</button>",
    pageCount: 1,
    rowsCount: 0,
    // lastPageRows:0,
    rowsLimit: 4,
    curTableNum: 1, //默认首先展示第一个表的内容
        // oldPageIndex:0
    searchInfo:
    [
      [
        ["教师姓名","课程ID","最近使用时间"],
        ["teacherName","courseId","lastSigninTime"],
        ["example:田媛","example:123","example:2016-7-1"]
      ],
      [
        ["课堂代码","课程ID","最近使用时间"],
        ["courseCode","courseId","lastSigninTime"],
        ["example:123","example:123","example:2016-7-1"]
      ],
      [
        ["学校名","所在地区","注用户数"],
        ["schoolName","area","userCount"],
        ["example:华中师范大学","example:武汉","example:2100"]
      ]
    ]
};
$(function() {
    newTable($("table[id=table" + page.curTableNum + "]" + " tbody"), res[page.curTableNum - 1], page.operater, page.operater2);
    initEvent();
});
/**
 * 收纳初始化事件绑定
 */
function initEvent() {
    prevNextClick();
    tableChange();
    topSearchInput();
    getSelectedRowsLimit();
    bindThSortEvent();
      $("#keyword").attr("placeholder",$("#searchSelect :selected").attr("example"));
    searchToGo();
}
/**
 * 绑定th点击触发的排序事件
 */
function bindThSortEvent(){
  var ths=  $("#table-container th");

      /**
       * 增加表头点击事件
       */
      ths.click(function(){
        //获取排序要求
        var sortflag=$(this).find("a span").filter("[class*=up]").length;//箭头向上，表示未排序或反向排序

        /**
         * 增加字形图标toggle效果
         */
      $(this).find("a span").toggleClass("glyphicon glyphicon-chevron-up");
      $(this).find("a span").toggleClass("glyphicon glyphicon-chevron-down");
      /**
       * 增加排序toggle事件
       */
      var thIndex =$(this).index();
      var isNumber =($(this).attr("type")==="number");
      //创建一个数组用来缓存正在处理的数据
      var tempArray=[];
      //获取当前表格的所有tr
      var curTrs = $("table[id=table" + page.curTableNum + "]" + " tbody tr");
      curTrs.each(function(index,value){
        var curTds = $(value).find("td");
        curTds.each(function(index,curTd){
          if(index===thIndex){
            tempArray.push($(curTds[index]).html()+".separator"+$(this).parent("tr").html());

          }
        });
      });
      //根据新数组第一项大小实现新数组排序
      if(sortflag===1){
        /**
         * 当thType为数字时使用下列排序
         * @type {Number}
         */
          tempArray.sort( function(param1,param2){
              //如果两个参数均为数字
              if(isNumber){
                var result=Number(param1.split(".separator")[0]) - Number(param2.split(".separator")[0]);
                  if(result>0) return 1;
                  if(result===0) return 0;
                  if(result<0) return -1;
              }else{
                return param1.localeCompare(param2);
              }
          });
        // for(var i=0;i<tempArray.length;i++){
        //
        //         for(var j=i+1;j<tempArray.length;j++){
        //           if(tempArray[i].split(".separator")[0]-tempArray[j].split(".separator")[0]<0){
        //             var temp=tempArray[i];
        //             tempArray[i]=tempArray[j];
        //             tempArray[j]=temp;
        //           }
        //         }
        //
        //     }

            /**
             * 当thType为字符串时使用下列排序
             * @type {String}
             */

             /**
              * 当thType为时间时使用下列排序
              * @type {Time}
              */
      }else{
         tempArray.reverse();
      }

    //用新数组中的行数据替换掉原来表格的数据
     for (var i = 0; i <curTrs.length; i++) {
          curTrs.eq(i).html(tempArray[i].split(".separator")[1]);
        }

  });
}
/**
 * 根据下拉列表选择控制每页行数
 */
function getSelectedRowsLimit() {

      $("select[rel=rows]").change(function() {
        page.rowsLimit = $(this).val();
        newTable($("table[id=table" + page.curTableNum + "]" + " tbody"), res[page.curTableNum - 1], page.operater, page.operater2);
    });
}
/**
 * 翻页效果实现
 */
function pageNumClick(oldPageIndex) {
    var pageTagGroup = $("#pageTag");
    var tagNum = pageTagGroup.children(":not(:first,:last)");
    var curTagNum;
    if (typeof oldPageIndex !== undefined) {
        curTagNum = oldPageIndex;
        tagNum.eq(curTagNum).trigger('click');
    }

    // 添加页码点击事件
    tagNum.each(function(i, tag) {
      $(tag).unbind("click");
        $(tag).click(function() {
            // 取当前页码
            curTagNum = i + 1;
            // 计算当前页展示行起始位置
            var curPStartRNum = i * (page.rowsLimit);
            // 获取新建表格的所有行tr
            var newTrs = $("table[id=table" + page.curTableNum + "] tbody").children('tr');
            // 获取需展示行
            var $showTrs = newTrs.filter(":gt(" + (Number(curPStartRNum) - 1) + "),:lt(" + (Number(curPStartRNum)+Number(page.rowsLimit)) + ")");
            // 获取隐藏行
            var $hideTrs = newTrs.filter(":lt(" + Number(curPStartRNum) + "),:gt(" + (Number(curPStartRNum)+Number(page.rowsLimit)-1) + ")");
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
function prevNextClick() {
    var pageTagGroup = $("#pageTag");
    var $prev = pageTagGroup.find(':first');
    var $next = pageTagGroup.find(":last");
    var oldPageIndex = 0;
    //寻找当前页码

    $prev.click(function() {
        pageTagGroup.children(":not(:first,:last)").each(function(i, tag) {
            var judge = $(tag).hasClass('active');
            if (judge) {
                oldPageIndex = i;
            }
        });
        if (oldPageIndex > 0) {
            oldPageIndex--;
            pageNumClick(oldPageIndex);
        }
    });
    $next.click(function() {
        pageTagGroup.children(":not(:first,:last)").each(function(i, tag) {
            var judge = $(tag).hasClass('active');
            if (judge) {
                oldPageIndex = i;
            }
        });
        if (oldPageIndex < page.pageCount) {
            oldPageIndex++;
            pageNumClick(oldPageIndex);
        }
    });

}
/**
 * 为每行按钮添加只读模态框内容
 */
function rModalbtnClick() {
    var Mbtn = $("button[rel=manualMbtn]"); //找到动态添加的模态框按钮

    Mbtn.each(function(i, item) { //遍历每一个添加的模态框出发按钮

        $(item).click(function() {
            var Mbody = $(".modal-body tbody");
            var Mfooter=$(".modal-footer").find("button:contains(Save)");
            Mfooter.remove();
            Mbody.children().remove();
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
 * 为每行修改按钮添加点击事件
 */
function wModalbtnClick() {
    var Mbtn = $("button[rel=manualMbtn2]"); //找到动态添加的模态框按钮
    var Mfooter=$(".modal-footer");

    Mbtn.each(function(i, item) { //遍历每一个添加的模态框出发按钮

        $(item).click(function() {
            var Mbody = $(".modal-body tbody");
            var thsCount = $(".modal-body th").length;
            Mbody.children().remove();
            var dataObj = $(item).parents("tr").data("course_information");
            var dataArr = objToArr(dataObj);
            var $tr = $("<tr></tr>");
            for (var i = 0; i < thsCount; i++) {

                var $td = $("<td></td>");
                var $input = $("<input type='text' class='form-control'/>");
                $input.attr('value', dataArr[i]);
                $td.html($input);
                $tr.append($td);

            }
             Mbody.append($tr);
            //在模态框结尾添加保存按钮
            var MSBtn=$(".modal-footer").find("button:contains(Save)");
             MSBtn.remove();
            var fBtn=$("<button type='button' class='btn btn-primary'>Save changes</button>");
            Mfooter.append(fBtn);
        });
    });
}

/**
 * 搜索框响应效果
 */
function topSearchInput() {
    var search = $("#keyword");
    search
        .focus(function() {
            if (search.attr("placeholder") === "输入关键字")
                search.attr('placeholder', '');
        })
        .blur(function() {
            if (search.attr("placeholder") === '') {
                search.attr('placeholder',"输入关键字");
            }
        });
}
/**
 * 根据传入数据res创建新表格并返回tbody
 */
function newTable(oldTbody, data, operater, operater2) {

    page.rowsCount = 0; //新表格总行数统计
    page.pageCount = Math.ceil(page.rowsCount/page.rowsLimit); //页面总数
    // page.lastPageRows=0;//新表格最后一页行数统计
    var $tbody = $("<tbody></tbody>");
    eachMap(data, function(item) {
        var $tr = renderTr(item, operater, operater2);
        $tbody.append($tr);
        page.rowsCount++;
        if (page.rowsCount > page.rowsLimit) {
            page.lastPageRows = (page.rowsCount % page.rowsLimit) ? (page.rowsCount % page.rowsLimit) : (page.rowsLimit);
        } //计算最后一个行数
    });
    page.pageCount = Math.ceil(page.rowsCount / page.rowsLimit); //更新页面总数
    oldTbody.empty().parent().append($tbody.children());
    // 默认隐藏超出行
    var newTrs = oldTbody.children('tr');
    var $hideTrs = newTrs.filter(":gt(" + (page.rowsLimit - 1) + ")");
    $hideTrs.hide();
    var $showTrs = newTrs.filter(":lt(" + (page.rowsLimit) + ")");
    $showTrs.show();
    createPageTag();
    pageNumClick();
    rModalbtnClick();
    wModalbtnClick();
}
/**
 * 将每一位老师的信息添加进一行并返回行
 */
function renderTr(data, operater, operater2) {
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
    if (operater2 !== null) { // 排除模态对话框
        $tr.append($("<td></td>").html(operater2));
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
function createPageTag() {
    var pageTagGroup = $("#pageTag");
    var nextTag = pageTagGroup.children(":last");
    //  初始化页码为1
    pageTagGroup.children(":gt(1):not(:last)").remove();
    //  根据生成表格反馈的页数生成页码
    for (var i = 2; i < page.pageCount + 1; i++) {
        var $button = "<button type='button' class='btn btn-default'>" + i + "</button>";
        nextTag.before($($button));
    }
    $("#pageTag").find(":eq(1)").addClass('active');
}
/**
 * 将对象的值组合为数组组件
 */
function objToArr(obj) {
    var newArr = [],
        i = 0;

    eachMap(obj, function(value) {
        newArr[i] = value;
        i++;
    });
    return newArr;
}
/**
 * 信息表格切换效果
 */
function tableChange() {
    var nav = $("ul.nav li");
    var tables = $("#table-container table");
    var tableContainer = $("#table-container");
    nav.each(function(i, navLi) {
        $(navLi).click(function() {
            $(this).addClass("active").siblings().removeClass("active");
            var curIndex = $(this).index();
            var curTbody = "#table" + (curIndex + 1) + " tbody";
            var requireDta = res[curIndex];
            newTable($(curTbody), requireDta, page.operater,page.operater2);
            tables.eq(curIndex).removeClass('hide').siblings().addClass('hide');
            page.curTableNum = curIndex + 1;
            var selectInfoArray = getSelectInfo(curIndex);
            showSelectItem(selectInfoArray);
              $("#keyword").attr("placeholder",$("#searchSelect :selected").attr("example"));
        });
    });

}
/**
 * 创建从三维数组中返回tag对应select数据二维数组
 */
 function getSelectInfo(tagIndex){
    return page.searchInfo[tagIndex];
 }
 /**
  * 将一维数组中各项对应显示在select选项中
  */
  function showSelectItem(selectInfoArray){
      var options = $("#searchSelect").children('option');
      for(var i=0;i<options.length;i++){
        var curOption=options.eq(i);
        curOption.text(selectInfoArray[0][i]);
        curOption.val(selectInfoArray[1][i]);
        curOption.attr("example",selectInfoArray[2][i]);

      }
  }
/**
 * 根据select.val()筛选符合条件的信息进行展示
 */
 function searchToGo(){
   var searchInfo = $("select[rel=searchInfo]");
   searchInfo.change(function(){
     $("#keyword").attr("placeholder",$(this).find(":selected").attr("example"));
   });
   var searchBtn = $("#search_submit");
   searchBtn.click(function(){
    var searchInfoVal = $(this).val();
    var keyword = $("#keyword").val();
   });
 }
