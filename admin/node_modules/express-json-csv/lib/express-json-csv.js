/*! 
* @license express-json-csv - v0.0.1
* (c) 2013 Julien VALERY https://github.com/darul75/express-json-csv
* License: MIT 
*/
var json2csv=require("json2csv");module.exports=function(a){a.response.csv=function(a){var b;if(2==arguments.length&&("number"==typeof arguments[1]?this.statusCode=arguments[1]:"object"==typeof arguments[1]?b=arguments[1]:(this.statusCode=a,a=arguments[1])),!b||!b.fields)return this.send(500,{error:"options has to be a correct parameter"});this.charset=this.charset||"utf-8";var c=this.app,d=c.get("json replacer"),e=c.get("json spaces"),f="";try{JSON.stringify(a,d,e),b.data=a}catch(g){f=a}var h=this;b.data?json2csv(b,function(a,b){return a?this.send(500,{error:"bad options param"}):(h.set("Content-Type","text/csv"),h.setHeader("Content-Disposition","attachment; filename=export.csv"),h.send(b))}):this.send(500,{error:"no data to convert, check obj param"})}};