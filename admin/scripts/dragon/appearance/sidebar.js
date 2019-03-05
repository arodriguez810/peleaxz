SIDEBAR ={
  apply:function (classElement,classBody) {
      if (STORAGE.exist(classElement)) {
          if (STORAGE.getSimple(classElement) === "true") {
              $('body').addClass(classBody);
          }
      }
  }
};
$(document).ready(function () {
    SIDEBAR.apply('app.sidebar-main-ishide','sidebar-main-hidden');
    if (STORAGE.getSimple('app.sidebar-main-ishide') === "true"){
        $(".sidebar-main-toggle").hide();
    }
    SIDEBAR.apply('app.sidebar-xs','sidebar-xs');
});