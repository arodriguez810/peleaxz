var folder = "7-plugins/templates/system";
var controller = `${folder}/controller.ejs`;
var crud = `${folder}/crud.ejs`;
var filter = `${folder}/filter.ejs`;
var form = `${folder}/form.ejs`;
var index = `${folder}/index.ejs`;
var view = `${folder}/view.ejs`;
var fs = fs || require("fs");
var colors = colors || require("colors");

colors.setTheme({
    error: ["red", "bgYellow"],
    success: ["green", "bgWhite"],
    info: ["cyan", "bgBlue"],
    warning: ["yellow", "bgRed"]
});
var controllerName = "";
process.argv.forEach(function (val, index, array) {
    if (index === 2)
        controllerName = val;
});
if (controllerName !== "") {
    console.log(controllerName);
    return;

    var controller = fs.readFileSync(controller).toString();
} else {
    console.log("Please set controllerName: node generate.js exampleName".error);
}
