/**
 * 存放res对象，用于本地调试
 */

/**
 * 教师数据构造函数
 */
function teacher(name, courseId, courseName, last_login_time, course_information) {
  this.name=name;
  this.courseId=courseId;
  this.courseName=courseName;
  this.last_login_time=last_login_time;
  this.course_information=course_information;
}
/**
 * 课堂信息数据构造函数
 */
 function course(code, courseId, courseName, last_login_time, course_information) {
   this.code=code;
   this.courseId=courseId;
   this.courseName=courseName;
   this.last_login_time=last_login_time;
   this.course_information=course_information;
 }
 /**
  * 学校信息构造函数
  */
  function school(name, area, userCount, activeCourse, course_information) {
    this.name=name;
    this.area=area;
    this.userCount=userCount;
    this.activeCourse=activeCourse;
    this.course_information=course_information;
  }
/**
 * 课程信息构造函数
 */
function course_information(course_id, course_name, create_time, student_number, question_number, team_number, signin_number) {
  this.course_id = course_id;
  this.course_name = course_name;
  this.create_time = create_time;
  this.student_number = student_number;
  this.question_number = question_number;
  this.team_number = team_number;
  this.signin_number = signin_number;
}

/**
 * 建立教师数据
 */
var course_information_1 = new course_information(1, "语文必修1", "20160901", "60", "233", "666", "60");
var course_information_2 = new course_information(1, "文必修1", "20160901", "60", "233", "666", "60");
var course_information_3 = new course_information(1, "英文必修1", "20160901", "60", "233", "666", "60");
var course_information_4 = new course_information(1, "必修1", "20160901", "60", "233", "666", "60");
var teacher1=new teacher("yanyan1",1,"语","2016-4-2",course_information_1),
    teacher2=new teacher("wanyan2",23,"外语","2016-7-26",course_information_2),
    teacher3=new teacher("anyan3",3,"英语","2016-6-28",course_information_3),
    teacher4=new teacher("zanyan4",123,"法语","2016-5-20",course_information_4);
var course1=new course(1,123,"语文","2016-4-30",course_information_1),
    course2=new course(2,345,"语文","2016-4-30",course_information_2),
    course3=new course(3,321,"语文","2016-4-30",course_information_3),
    course4=new course(4,136,"语文","2016-4-30",course_information_4);
var school1= new school("华中","武汉",12,"英语",course_information_1),
    school2= new school("华东","上海",23,"法语",course_information_1),
    school3= new school("华南","广州",143,"俄语",course_information_1),
    school4= new school("东北","辽宁",123,"日语",course_information_1);


var res = new Array(
  [teacher1,
  teacher2,
  teacher3,
  teacher4],
  [
    course1,
    course2,
    course3,
    course4
  ],
  [
    school1,
    school2,
    school3,
    school4
  ]
);
