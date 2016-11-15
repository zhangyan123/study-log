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
var course_information_2 = new course_information(1, "语文必修1", "20160901", "60", "233", "666", "60");
var course_information_3 = new course_information(1, "语文必修1", "20160901", "60", "233", "666", "60");
var course_information_4 = new course_information(1, "语文必修1", "20160901", "60", "233", "666", "60");
var teacher1=new teacher("yanyan1",123,"外语","2016-7-28",course_information_1),
    teacher2=new teacher("yanyan2",123,"外语","2016-7-28",course_information_2),
    teacher3=new teacher("yanyan3",123,"外语","2016-7-28",course_information_3),
    teacher4=new teacher("yanyan4",123,"外语","2016-7-28",course_information_4);
var course1=new course(1,123,"语文","2016-4-30",course_information_1),
    course2=new course(2,123,"语文","2016-4-30",course_information_2),
    course3=new course(3,123,"语文","2016-4-30",course_information_3),
    course4=new course(4,123,"语文","2016-4-30",course_information_4);
var school1= new school("华中","武汉",123,"外语",course_information_1),
    school2= new school("华中","武汉",123,"外语",course_information_1),
    school3= new school("华中","武汉",123,"外语",course_information_1),
    school4= new school("华中","武汉",123,"外语",course_information_1);


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
