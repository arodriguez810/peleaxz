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
    SIDEBAR.apply('app.sidebar-xs','sidebar-xs');
});