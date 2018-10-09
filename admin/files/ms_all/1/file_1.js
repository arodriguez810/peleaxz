
$.throttle_delay = 350;
$info = undefined;
// The rate at which the menu expands revealing child elements on click
$.menu_speed = 235;

// Note: You will also need to change this variable in the "variable.less" file.
$.navbar_height = 49;

$timers = [];

/*
 * APP DOM REFERENCES
 * Description: Obj DOM reference, please try to avoid changing these
 */
$.root_ = $('body');
$.left_panel = $('#left-panel');
$.shortcut_dropdown = $('#shortcut');
$.bread_crumb = $('#ribbon ol.breadcrumb');

$.notyInterval = null;
$.notyIntervalTime = 10000;

// desktop or mobile
$.device = null;

/*
 * APP CONFIGURATION
 * Description: Enable / disable certain theme features here
 */
$.navAsAjax = true; // Your left nav in your app will no longer fire ajax calls

// Please make sure you have included "jarvis.widget.js" for this below feature to work
$.enableJarvisWidgets = true;

// Warning: Enabling mobile widgets could potentially crash your webApp if you have too many 
// 			widgets running at once (must have $.enableJarvisWidgets = true)
$.enableMobileWidgets = false;

/* so far this is covering most hand held devices */
ismobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

if (!ismobile) {
    $.root_.addClass("desktop-detected");
    $.device = "desktop";
} else {
    $.root_.addClass("mobile-detected");
    $.device = "mobile";
}


$(document).ready(function () {
    /*
	 * Fire tooltips
	 */


    $(document).on('click', '.colorpicker', function (e) {
        var me = $(this);
        //me.css('background-color', me.val());
        me.css('background-color', me.val());
    });

    $(document).on('click', '.customBtn', function (e) {
        var me = $(this);
        var article = me.closest("article");
        var beforeClass = article.attr("class");
        var width = parseInt(beforeClass.split('-')[4]);
        nextWidth = width == 12 ? 3 : width + 3;
        var afterClass = replaceAll(width, nextWidth, beforeClass);

        var afterClass = replaceAll("col-xs-9", "col-xs-12", afterClass);
        var afterClass = replaceAll("col-xs-6", "col-xs-12", afterClass);
        var afterClass = replaceAll("col-xs-3", "col-xs-12", afterClass);

        article.removeClass();
        article.addClass(afterClass);
        //appendToStorage("deletedWidgets", th.attr("id") + ",");
    });

    $(document).on('click', '.modalImage', function (e) {
        $('#ImgModal img').attr('src', $(this).attr('data-imgurl'));
        $('#ImgModal').modal('show');
    });

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    //TODO: was moved from window.load due to IE not firing consist
    nav_page_height()

    // INITIALIZE LEFT NAV
    if (!null) {
        $('nav ul').jarvismenu({
            accordion: true,
            speed: $.menu_speed,
            closedSign: '<em class="fa fa-expand-o"></em>',
            openedSign: '<em class="fa fa-collapse-o"></em>'
        });
    } else {
        alert("Error - menu anchor does not exist");
    }

    // COLLAPSE LEFT NAV
    $('.minifyme').click(function (e) {
        $('body').toggleClass("minified");
        $(this).effect("highlight", {}, 500);
        e.preventDefault();
    });

    // HIDE MENU
    $('#hide-menu >:first-child > a').click(function (e) {
        $('body').toggleClass("hidden-menu");
        e.preventDefault();
    });

    $('#show-shortcut').click(function (e) {
        if ($.shortcut_dropdown.is(":visible")) {
            shortcut_buttons_hide();
        } else {
            shortcut_buttons_show();
        }
        e.preventDefault();
    });

    // SHOW & HIDE MOBILE SEARCH FIELD
    $('#search-mobile').click(function () {
        $.root_.addClass('search-mobile');
    });

    $('#cancel-search-js').click(function () {
        $.root_.removeClass('search-mobile');
    });

    // ACTIVITY
    // ajax drop
    $('#activity').click(function (e) {
        var $this = $(this);

        if ($this.find('.badge').hasClass('bg-color-red')) {
            $this.find('.badge').removeClassPrefix('bg-color-');
            $this.find('.badge').text("0");
        }

        if (!$this.next('.ajax-dropdown').is(':visible')) {
            $this.next('.ajax-dropdown').fadeIn(150);
            $this.addClass('active');
        } else {
            $this.next('.ajax-dropdown').fadeOut(150);
            $this.removeClass('active')
        }

        var mytest = $this.next('.ajax-dropdown').find('.btn-group > .active > input').attr('id');

        e.preventDefault();
    });

    $('input[name="activity"]').change(function () {
        //alert($(this).val())
        var $this = $(this);

        url = $this.attr('id');
        container = $('.ajax-notifications');

        loadURL(url, container);

    });

    $(document).mouseup(function (e) {
        if (!$('.ajax-dropdown').is(e.target)// if the target of the click isn't the container...
            && $('.ajax-dropdown').has(e.target).length === 0) {
            $('.ajax-dropdown').fadeOut(150);
            $('.ajax-dropdown').prev().removeClass("active")
        }
    });

    // NOTIFICATION IS PRESENT

    function notification_check() {
        $this = $('#activity > .badge');

        if (parseInt($this.text()) > 0) {
            $this.addClass("bg-color-red bounceIn animated")
        }
    }

    notification_check();

    // RESET WIDGETS
    $('#refresh').click(function (e) {

        var $this = $(this);

        $.widresetMSG = $this.data('reset-msg');

        $.SmartMessageBox({
            title: "<i class='fa fa-refresh' style='color:green'></i> Reset Configurations",
            content: "This option reset all configuration make with list, hide and reorder columns and reorder widgets, are you sure?",
            buttons: '[No][Yes]'
        }, function (ButtonPressed) {
            if (ButtonPressed == "Yes" && localStorage) {
                //kunay reset
                localStorage.clear();
                location.reload();
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    if (name.indexOf("cstable_cookie_heade") != -1) {
                        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    }
                }
            }

        });
        e.preventDefault();
    });

    // LOGOUT BUTTON
    $('#logout a').click(function (e) {
        //get the link
        var $this = $(this);
        $.loginURL = $this.attr('href');
        $.logoutMSG = $this.data('logout-msg');

        // ask verification
        $.SmartMessageBox({
            title: "<i class='fa fa-sign-out txt-color-orangeDark'></i> &iquest;Logout<span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span>&#63",
            content: "This options end your session in the application, are you sure?",
            buttons: '[No][Yes]'

        }, function (ButtonPressed) {
            if (ButtonPressed == "Yes") {
                $.root_.addClass('animated fadeOutUp');
                setTimeout(logout, 1000)
            }

        });
        e.preventDefault();
    });

    /*
	 * LOGOUT ACTION
	 */

    function logout() {
        window.location = $.loginURL;
    }

    /*
	* SHORTCUTS
	*/

    // SHORT CUT (buttons that appear when clicked on user name)
    $.shortcut_dropdown.find('a').click(function (e) {

        e.preventDefault();

        window.location = $(this).attr('href');
        setTimeout(shortcut_buttons_hide, 300);

    });

    // SHORTCUT buttons goes away if mouse is clicked outside of the area
    $(document).mouseup(function (e) {
        if (!$.shortcut_dropdown.is(e.target)// if the target of the click isn't the container...
            && $.shortcut_dropdown.has(e.target).length === 0) {
            shortcut_buttons_hide()
        }
    });

    // SHORTCUT ANIMATE HIDE
    function shortcut_buttons_hide() {
        $.shortcut_dropdown.animate({
            height: "hide"
        }, 300, "easeOutCirc");
        $.root_.removeClass('shortcut-on');

    }

    // SHORTCUT ANIMATE SHOW
    function shortcut_buttons_show() {
        $.shortcut_dropdown.animate({
            height: "show"
        }, 200, "easeOutCirc")
        $.root_.addClass('shortcut-on');
    }

});

(function ($, window, undefined) {

    var elems = $([]), jq_resize = $.resize = $.extend($.resize, {}), timeout_id, str_setTimeout = 'setTimeout', str_resize = 'resize', str_data = str_resize + '-special-event', str_delay = 'delay', str_throttle = 'throttleWindow';

    jq_resize[str_delay] = $.throttle_delay;

    jq_resize[str_throttle] = true;

    $.event.special[str_resize] = {

        setup: function () {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);
            elems = elems.add(elem);
            $.data(this, str_data, {
                w: elem.width(),
                h: elem.height()
            });
            if (elems.length === 1) {
                loopy();
            }
        },
        teardown: function () {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);
            elems = elems.not(elem);
            elem.removeData(str_data);
            if (!elems.length) {
                clearTimeout(timeout_id);
            }
        },

        add: function (handleObj) {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var old_handler;

            function new_handler(e, w, h) {
                var elem = $(this), data = $.data(this, str_data);
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();

                old_handler.apply(this, arguments);
            };
            if ($.isFunction(handleObj)) {
                old_handler = handleObj;
                return new_handler;
            } else {
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }
    };

    function loopy() {
        timeout_id = window[str_setTimeout](function () {
            elems.each(function () {
                if (data != undefined) {
                    var elem = $(this), width = elem.width(), height = elem.height(), data = $.data(this, str_data);
                    if (width !== data.w || height !== data.h) {
                        elem.trigger(str_resize, [data.w = width, data.h = height]);
                    }
                }
            });
            loopy();

        }, jq_resize[str_delay]);

    };

})(jQuery, this);

function nav_page_height() {
    try {
        var setHeight = $('#content').height() + 100;
        //menuHeight = $.left_panel.height();
        var windowHeight = $(window).height() - $.navbar_height;
        //set height
        if (setHeight > windowHeight) {// if content height exceedes actual window height and menuHeight
            $.left_panel.css('min-height', setHeight + 'px');
            $.root_.css('min-height', setHeight + $.navbar_height + 'px');

        } else {
            $.left_panel.css('min-height', windowHeight + 'px');
            $.root_.css('min-height', windowHeight + 'px');
        }
    } catch (err) {

    }
}

$(document).mouseover(function () {
    nav_page_height();
    check_if_mobile_width();
});

$('#main').resize(function () {
    nav_page_height();
    check_if_mobile_width();
});

$('#content').bind('resize', function () {
    nav_page_height();
    check_if_mobile_width();
});

$('nav').resize(function () {
    nav_page_height();
})

function check_if_mobile_width() {
    if ($(window).width() < 979) {
        $.root_.addClass('mobile-view-activated')
    } else if ($.root_.hasClass('mobile-view-activated')) {
        $.root_.removeClass('mobile-view-activated');
    }
}

var ie = (function () {

    var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');

    while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

    return v > 4 ? v : undef;

}());

$.fn.extend({
    jarvismenu: function (options) {
        var defaults = {
            accordion: 'true',
            speed: 200,
            closedSign: '[+]',
            openedSign: '[-]'
        };

        // Extend our default options with those provided.
        var opts = $.extend(defaults, options);
        //Assign current element to variable, in this case is UL element
        var $this = $(this);

        //add a mark [+] to a multilevel menu
        $this.find("li").each(function () {
            if ($(this).find("ul").size() != 0) {
                //add the multilevel sign next to the link
                $(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

                //avoid jumping to the top of the page when the href is an #
                if ($(this).find("a:first").attr('href') == "#") {
                    $(this).find("a:first").click(function () {
                        return false;
                    });
                }
            }
        });

        //open active level
        $this.find("li.active").each(function () {
            $(this).parents("ul").slideDown(opts.speed);
            $(this).parents("ul").parent("li").find("b:first").html(opts.openedSign);
            $(this).parents("ul").parent("li").addClass("open")
        });

        $this.find("li a").click(function () {

            if ($(this).parent().find("ul").size() != 0) {

                if (opts.accordion) {
                    //Do nothing when the list is open
                    if (!$(this).parent().find("ul").is(':visible')) {
                        parents = $(this).parent().parents("ul");
                        visible = $this.find("ul:visible");
                        visible.each(function (visibleIndex) {
                            var close = true;
                            parents.each(function (parentIndex) {
                                if (parents[parentIndex] == visible[visibleIndex]) {
                                    close = false;
                                    return false;
                                }
                            });
                            if (close) {
                                if ($(this).parent().find("ul") != visible[visibleIndex]) {
                                    $(visible[visibleIndex]).slideUp(opts.speed, function () {
                                        $(this).parent("li").find("b:first").html(opts.closedSign);
                                        $(this).parent("li").removeClass("open");
                                    });

                                }
                            }
                        });
                    }
                }// end if
                if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {
                    $(this).parent().find("ul:first").slideUp(opts.speed, function () {
                        $(this).parent("li").removeClass("open");
                        $(this).parent("li").find("b:first").delay(opts.speed).html(opts.closedSign);
                    });

                } else {
                    $(this).parent().find("ul:first").slideDown(opts.speed, function () {
                        /*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
                        $(this).parent("li").addClass("open");
                        $(this).parent("li").find("b:first").delay(opts.speed).html(opts.openedSign);
                    });
                } // end else
            } // end if
        });
    }
});


jQuery.fn.doesExist = function () {
    return jQuery(this).length > 0;
};

Number.prototype.pad = function (width, padValue) {
    padValue = padValue || '0';
    var value = this.valueOf().toString();
    return value.length >= width ? value : new Array(width - value.length + 1).join(padValue) + this;
};

Date.prototype.daysDiff = function (date2) {
    var time1 = this.getTime();
    var time2 = date2.getTime();

    return parseInt((time2 - time1) / (24 * 3600 * 1000));
};

Date.prototype.weeksDiff = function (date2) {
    var time1 = this.getTime();
    var time2 = date2.getTime();

    return parseInt((time2 - time1) / (24 * 3600 * 1000 * 7));
};

Date.prototype.monthsDiff = function (date2) {
    var year1 = this.getFullYear();
    var year2 = date2.getFullYear();
    var month1 = this.getMonth();
    var month2 = date2.getMonth();

    return parseInt((month2 + 12 * year2) - (month1 + 12 * year1));
};

Date.prototype.yearsDiff = function (date2) {
    return date2.getFullYear() - this.getFullYear();
};

function launchFullscreen(element) {

    if (!$.root_.hasClass("full-screen")) {

        $.root_.addClass("full-screen");

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

    } else {

        $.root_.removeClass("full-screen");

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

    }

}

function noDecimal(selector) {
    $(selector).maskMoney('destroy');
    $(selector).maskMoney({ precision: 0, allowZero: false });
}

function clearCanvas(id) {
    var canvas = document.querySelector("#" + id);
    canvasArray[id] = new SignaturePad(canvas);
    var data = canvasArray[id].toDataURL();;
    $("#" + $('#' + id).data("field")).val(data);
}

function LoadCanvas(canvasId, imageUrl) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext('2d');

    var imageObj = new Image();
    imageObj.onload = function () {
        context.drawImage(this, 0, 0);
    };

    // Agrego esto para que el canvas asuma el cambio y no se quede con la imagen actual porque es la misma url
    // Esto sirve para cuando se está editando principalmente
    imageObj.src = '';
    imageObj.src = imageUrl;

    console.log('LoadCanvas => ' + imageUrl);
}

$(document).on("mouseup mouseenter mouseleave mouseout touchstart touchend touch", ".canvasSign", function () {
    var $this = $(this);
    var data = canvasArray[$this.attr('id')].toDataURL('image/png');
    data = data.replace('data:image/png;base64,', '');
    $("#" + $this.data("field")).val(data);
});


$(document).on("click", "[data-printernext]", function () {
    $("input").css('outline', 'none');
    $("input").css('box-shadow', 'none');
    $("input").css('border-top', '0');
    $("input").css('border-left', '0');
    $("input").css('border-right', '0');
    $("input").css('border-bottom', '0');
    $(".leftblank").css('border-bottom', '1px solid #000');
    $(".tooltip").css('display', 'none');
    $('.MsoNormalTable').css('margin-left', '0');
    $('.MsoNormalTable').css('margin-bottom', '16px');
    var $this = $(this);
    var div = $this.next($this.data('printer'));
    $this.data('loading-text', "<i class='fa fa-refresh fa-spin'></i>");
    $this.button('loading');
    html2canvas(div, {
        onrendered: function (canvas) {
            var myImage = canvas.toDataURL("image/png");
            $this.button('reset');
            printElem(myImage);
        }
    });
    return false;
});

$(document).on("click", "[data-printer]", function () {
    var $this = $(this);
    var div = $($this.data('printer'));
    $this.data('loading-text', "<i class='fa fa-refresh fa-spin'></i>");
    $this.button('loading');
    html2canvas(div, {
        onrendered: function (canvas) {
            var myImage = canvas.toDataURL("image/png");
            $this.button('reset');
            printElem(myImage);
        }
    });
    return false;
});

$(document).on("click", "[data-printerhtml]", function () {
    var $this = $(this);
    $this.data('loading-text', "<i class='fa fa-refresh fa-spin'></i>");
    $this.button('loading');
    PrintElemHtml($this.data('printerhtml'));
    $this.button('reset');
    return false;
});

function PrintElemHtml(elem) {
    var mywindow = window.open('', 'PRINT', '');
    mywindow.document.write('<html><head>');
    mywindow.document.write('</head><body>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();

    return true;
}

function printElem(elem) {
    var btn = document.createElement("IMG");
    btn.src = elem;
    setTimeout(function () {
        var mywindow = window.open();
        mywindow.document.body.appendChild(btn);
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
        mywindow.close();
    }, 1000);
    return true;
}

canvasArray = [];
function runAllForms() {

    /*
	 * BOOTSTRAP SLIDER PLUGIN
	 * Usage:
	 * Dependency: js/plugin/bootstrap-slider
	 */

    try {
        $("input[data-numberformat='C']").maskMoney();
    } catch (err) {

    }
    if ($.fn.slider) {
        $('.slider').slider();
    }


    $('.canvasSign').each(function () {
        var $this = $(this);
        var canvas = document.querySelector("#" + $this.attr('id'));
        canvasArray[$this.attr('id')] = new SignaturePad(canvas);
        var fill = $("#" + $this.data("field")).val();
        if (fill != '') {
            canvasArray[$this.attr('id')].fromDataURL(fill);
        }
    });

    $('.summernote').each(function () {
        var $this = $(this);
        $this.summernote();
    });

    /*
	 * SELECT2 PLUGIN
	 * Usage:
	 * Dependency: js/plugin/select2/
	 */

    if ($.fn.select2) {
        $('select.baseSelect').each(function () {
            var $this = $(this);
            var width = $this.attr('data-select-width') || '100%';
            //, _showSearchInput = $this.attr('data-select-search') === 'true';
            if (!$this.hasClass('select2-offScren')) {
                $this.select2({
                    //showSearchInput : _showSearchInput,
                    allowClear: true,
                    width: width
                });
            }
        })
    }

    $('.markdown').each(function () {
        var $this = $(this);
        $this.markdown({
            autofocus: false,
            savable: true
        })
    });

    $('.datetime').each(function () {
        var $this = $(this);
        $this.datepicker({
            format: 'YYYY-MM-DD HH:mm:ss',
            //dateFormat: $this.data('dateformat') || "dd.mm.yy",
            prevText: $this.data('prevtext') || '<i class="fa fa-chevron-left"></i>',
            nextText: $this.data('nexttext') || '<i class="fa fa-chevron-right"></i>',
            //defaultDate: $this.data('defaultdate') || '+1m',
            defaultDate: moment(this.value, "YYYY-MM-DD HH:mm:ss"),
            changeMonth: $this.data('changemonth') || true,
            changeYear: $this.data('changeYear') || true,
            showButtonPanel: $this.data('showbuttonpanel') || true,
            numberOfMonths: $this.data('numberofmonths') || 1,
            minDate: $this.data('mindate') || "",
            maxDate: $this.data('maxdate') || "",
            currentText: "Hoy",
            closeText: "Ok",
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fru', 'Sat'],
            onClose: function (selectedDate) {
                $me = $(this);
                if ($me.data("child")) {
                    if ($me.data("child") != "")
                        $('#' + $me.data("child")).datepicker('option', 'minDate', selectedDate);
                }
                if ($me.data("parent")) {
                    if ($me.data("parent") != "")
                        $('#' + $me.data("parent")).datepicker('option', 'maxDate', selectedDate);
                }
            }
        });
    });

    $('.datetimepicker').each(function () {
        var $this = $(this);
        $this.datetimepicker({
            format: $this.data('dateformat') || "YYYY/MM/DD HH:mm",
            minDate: $this.data('mindate') || "1900/01/01",
            maxDate: $this.data('maxdate') || "3000/01/01",
        });
        $this.trigger("click");
        $this.trigger("click");
    });

    $(".datetimepicker").on("dp.change", function (e) {
        $me = $(this);
        if ($me.data('child')) {
            $(`#${$me.data('child')}`).data('DateTimePicker').minDate($me.val());
        }

        if ($me.data('parent')) {
            $(`#${$me.data('parent')}`).data('DateTimePicker').maxDate($me.val());
        }
    });

    $('.spinner').each(function () {
        var $this = $(this);
        if (!$this.hasClass('ui-spinner-input')) {
            $this.spinner({
                min: $this.data('min'),
                max: $this.data('max'),
                step: $this.data('step'),
                start: $this.data('start'),
                numberFormat: $this.data('numberFormat')
            });
        }
    });




    /*
	 * MASKING
	 * Dependency: js/plugin/masked-input/
	 */
    if ($.fn.mask) {
        $('[data-mask]').each(function () {

            var $this = $(this);
            var mask = $this.attr('data-mask') || 'error...', mask_placeholder = $this.attr('data-mask-placeholder') || 'X';

            $this.mask(mask, {
                placeholder: mask_placeholder
            });
        })
    }



    /*
	 * Autocomplete
	 * Dependency: js/jqui
	 */
    if ($.fn.autocomplete) {
        $('[data-autocomplete]').each(function () {

            var $this = $(this);
            var availableTags = $this.data('autocomplete') || ["The", "Quick", "Brown", "Fox", "Jumps", "Over", "Three", "Lazy", "Dogs"];

            $this.autocomplete({
                source: availableTags
            });
        })
    }

    /*
	 * JQUERY UI DATE
	 * Dependency: js/libs/jquery-ui-1.10.3.min.js
	 * Usage:
	 */
    if ($.fn.datepicker) {
        $('.datepicker').each(function () {

            var $this = $(this);
            var dataDateFormat = $this.attr('data-dateformat') || 'dd.mm.yy';

            $this.datepicker({
                dateFormat: dataDateFormat,
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>',
            });
        })
    }
}

function runAllCharts() {
    /*
	 * SPARKLINES
	 * DEPENDENCY: js/plugins/sparkline/jquery.sparkline.min.js
	 * See usage example below...
	 */

    /* Usage:
	 * 		<div class="sparkline-line txt-color-blue" data-fill-color="transparent" data-sparkline-height="26px">
	 *			5,6,7,9,9,5,9,6,5,6,6,7,7,6,7,8,9,7
	 *		</div>
	 */

    if ($.fn.sparkline) {

        $('.sparkline').each(function () {
            var $this = $(this);
            var sparklineType = $this.data('sparkline-type') || 'bar';

            // BAR CHART
            if (sparklineType == 'bar') {

                var barColor = $this.data('sparkline-bar-color') || $this.css('color') || '#0000f0', sparklineHeight = $this.data('sparkline-height') || '26px', sparklineBarWidth = $this.data('sparkline-barwidth') || 5, sparklineBarSpacing = $this.data('sparkline-barspacing') || 2, sparklineNegBarColor = $this.data('sparkline-negbar-color') || '#A90329', sparklineStackedColor = $this.data('sparkline-barstacked-color') || ["#A90329", "#0099c6", "#98AA56", "#da532c", "#4490B1", "#6E9461", "#990099", "#B4CAD3"];

                $this.sparkline('html', {
                    type: 'bar',
                    barColor: barColor,
                    type: sparklineType,
                    height: sparklineHeight,
                    barWidth: sparklineBarWidth,
                    barSpacing: sparklineBarSpacing,
                    stackedBarColor: sparklineStackedColor,
                    negBarColor: sparklineNegBarColor,
                    zeroAxis: 'false'
                });

            }

            //LINE CHART
            if (sparklineType == 'line') {

                var sparklineHeight = $this.data('sparkline-height') || '20px', sparklineWidth = $this.data('sparkline-width') || '90px', thisLineColor = $this.data('sparkline-line-color') || $this.css('color') || '#0000f0', thisLineWidth = $this.data('sparkline-line-width') || 1, thisFill = $this.data('fill-color') || '#c0d0f0', thisSpotColor = $this.data('sparkline-spot-color') || '#f08000', thisMinSpotColor = $this.data('sparkline-minspot-color') || '#ed1c24', thisMaxSpotColor = $this.data('sparkline-maxspot-color') || '#f08000', thishighlightSpotColor = $this.data('sparkline-highlightspot-color') || '#50f050', thisHighlightLineColor = $this.data('sparkline-highlightline-color') || 'f02020', thisSpotRadius = $this.data('sparkline-spotradius') || 1.5;
                thisChartMinYRange = $this.data('sparkline-min-y') || 'undefined', thisChartMaxYRange = $this.data('sparkline-max-y') || 'undefined', thisChartMinXRange = $this.data('sparkline-min-x') || 'undefined', thisChartMaxXRange = $this.data('sparkline-max-x') || 'undefined', thisMinNormValue = $this.data('min-val') || 'undefined', thisMaxNormValue = $this.data('max-val') || 'undefined', thisNormColor = $this.data('norm-color') || '#c0c0c0', thisDrawNormalOnTop = $this.data('draw-normal') || false;

                $this.sparkline('html', {
                    type: 'line',
                    width: sparklineWidth,
                    height: sparklineHeight,
                    lineWidth: thisLineWidth,
                    lineColor: thisLineColor,
                    fillColor: thisFill,
                    spotColor: thisSpotColor,
                    minSpotColor: thisMinSpotColor,
                    maxSpotColor: thisMaxSpotColor,
                    highlightSpotColor: thishighlightSpotColor,
                    highlightLineColor: thisHighlightLineColor,
                    spotRadius: thisSpotRadius,
                    chartRangeMin: thisChartMinYRange,
                    chartRangeMax: thisChartMaxYRange,
                    chartRangeMinX: thisChartMinXRange,
                    chartRangeMaxX: thisChartMaxXRange,
                    normalRangeMin: thisMinNormValue,
                    normalRangeMax: thisMaxNormValue,
                    normalRangeColor: thisNormColor,
                    drawNormalOnTop: thisDrawNormalOnTop

                });

            }

            //PIE CHART
            if (sparklineType == 'pie') {

                var pieColors = $this.data('sparkline-piecolor') || ["#B4CAD3", "#4490B1", "#98AA56", "#da532c", "#6E9461", "#0099c6", "#990099", "#717D8A"], pieWidthHeight = $this.data('sparkline-piesize') || 90, pieBorderColor = $this.data('border-color') || '#45494C', pieOffset = $this.data('sparkline-offset') || 0;

                $this.sparkline('html', {
                    type: 'pie',
                    width: pieWidthHeight,
                    height: pieWidthHeight,
                    tooltipFormat: '<span style="color: {{color}}">&#9679;</span> ({{percent.1}}%)',
                    sliceColors: pieColors,
                    offset: 0,
                    borderWidth: 1,
                    offset: pieOffset,
                    borderColor: pieBorderColor
                });

            }

            //BOX PLOT
            if (sparklineType == 'box') {

                var thisBoxWidth = $this.data('sparkline-width') || 'auto', thisBoxHeight = $this.data('sparkline-height') || 'auto', thisBoxRaw = $this.data('sparkline-boxraw') || false, thisBoxTarget = $this.data('sparkline-targetval') || 'undefined', thisBoxMin = $this.data('sparkline-min') || 'undefined', thisBoxMax = $this.data('sparkline-max') || 'undefined', thisShowOutlier = $this.data('sparkline-showoutlier') || true, thisIQR = $this.data('sparkline-outlier-iqr') || 1.5, thisBoxSpotRadius = $this.data('sparkline-spotradius') || 1.5, thisBoxLineColor = $this.css('color') || '#000000', thisBoxFillColor = $this.data('fill-color') || '#c0d0f0', thisBoxWhisColor = $this.data('sparkline-whis-color') || '#000000', thisBoxOutlineColor = $this.data('sparkline-outline-color') || '#303030', thisBoxOutlineFill = $this.data('sparkline-outlinefill-color') || '#f0f0f0', thisBoxMedianColor = $this.data('sparkline-outlinemedian-color') || '#f00000', thisBoxTargetColor = $this.data('sparkline-outlinetarget-color') || '#40a020';

                $this.sparkline('html', {
                    type: 'box',
                    width: thisBoxWidth,
                    height: thisBoxHeight,
                    raw: thisBoxRaw,
                    target: thisBoxTarget,
                    minValue: thisBoxMin,
                    maxValue: thisBoxMax,
                    showOutliers: thisShowOutlier,
                    outlierIQR: thisIQR,
                    spotRadius: thisBoxSpotRadius,
                    boxLineColor: thisBoxLineColor,
                    boxFillColor: thisBoxFillColor,
                    whiskerColor: thisBoxWhisColor,
                    outlierLineColor: thisBoxOutlineColor,
                    outlierFillColor: thisBoxOutlineFill,
                    medianColor: thisBoxMedianColor,
                    targetColor: thisBoxTargetColor

                })

            }

            //BULLET
            if (sparklineType == 'bullet') {

                var thisBulletHeight = $this.data('sparkline-height') || 'auto', thisBulletWidth = $this.data('sparkline-width') || 2, thisBulletColor = $this.data('sparkline-bullet-color') || '#ed1c24', thisBulletPerformanceColor = $this.data('sparkline-performance-color') || '#3030f0', thisBulletRangeColors = $this.data('sparkline-bulletrange-color') || ["#d3dafe", "#a8b6ff", "#7f94ff"]

                $this.sparkline('html', {

                    type: 'bullet',
                    height: thisBulletHeight,
                    targetWidth: thisBulletWidth,
                    targetColor: thisBulletColor,
                    performanceColor: thisBulletPerformanceColor,
                    rangeColors: thisBulletRangeColors

                })

            }

            //DISCRETE
            if (sparklineType == 'discrete') {

                var thisDiscreteHeight = $this.data('sparkline-height') || 26, thisDiscreteWidth = $this.data('sparkline-width') || 50, thisDiscreteLineColor = $this.css('color'), thisDiscreteLineHeight = $this.data('sparkline-line-height') || 5, thisDiscreteThrushold = $this.data('sparkline-threshold') || 'undefined', thisDiscreteThrusholdColor = $this.data('sparkline-threshold-color') || '#ed1c24';

                $this.sparkline('html', {

                    type: 'discrete',
                    width: thisDiscreteWidth,
                    height: thisDiscreteHeight,
                    lineColor: thisDiscreteLineColor,
                    lineHeight: thisDiscreteLineHeight,
                    thresholdValue: thisDiscreteThrushold,
                    thresholdColor: thisDiscreteThrusholdColor

                })

            }

            //TRISTATE
            if (sparklineType == 'tristate') {

                var thisTristateHeight = $this.data('sparkline-height') || 26, thisTristatePosBarColor = $this.data('sparkline-posbar-color') || '#60f060', thisTristateNegBarColor = $this.data('sparkline-negbar-color') || '#f04040', thisTristateZeroBarColor = $this.data('sparkline-zerobar-color') || '#909090', thisTristateBarWidth = $this.data('sparkline-barwidth') || 5, thisTristateBarSpacing = $this.data('sparkline-barspacing') || 2, thisZeroAxis = $this.data('sparkline-zeroaxis') || false;

                $this.sparkline('html', {

                    type: 'tristate',
                    height: thisTristateHeight,
                    posBarColor: thisBarColor,
                    negBarColor: thisTristateNegBarColor,
                    zeroBarColor: thisTristateZeroBarColor,
                    barWidth: thisTristateBarWidth,
                    barSpacing: thisTristateBarSpacing,
                    zeroAxis: thisZeroAxis

                })

            }

            //COMPOSITE: BAR
            if (sparklineType == 'compositebar') {

                var sparklineHeight = $this.data('sparkline-height') || '20px', sparklineWidth = $this.data('sparkline-width') || '100%', sparklineBarWidth = $this.data('sparkline-barwidth') || 3, thisLineWidth = $this.data('sparkline-line-width') || 1, thisLineColor = $this.data('sparkline-color-top') || '#ed1c24', thisBarColor = $this.data('sparkline-color-bottom') || '#333333'

                $this.sparkline($this.data('sparkline-bar-val'), {

                    type: 'bar',
                    width: sparklineWidth,
                    height: sparklineHeight,
                    barColor: thisBarColor,
                    barWidth: sparklineBarWidth
                    //barSpacing: 5

                })

                $this.sparkline($this.data('sparkline-line-val'), {

                    width: sparklineWidth,
                    height: sparklineHeight,
                    lineColor: thisLineColor,
                    lineWidth: thisLineWidth,
                    composite: true,
                    fillColor: false

                })

            }

            //COMPOSITE: LINE
            if (sparklineType == 'compositeline') {

                var sparklineHeight = $this.data('sparkline-height') || '20px', sparklineWidth = $this.data('sparkline-width') || '90px', sparklineValue = $this.data('sparkline-bar-val'), sparklineValueSpots1 = $this.data('sparkline-bar-val-spots-top') || null, sparklineValueSpots2 = $this.data('sparkline-bar-val-spots-bottom') || null, thisLineWidth1 = $this.data('sparkline-line-width-top') || 1, thisLineWidth2 = $this.data('sparkline-line-width-bottom') || 1, thisLineColor1 = $this.data('sparkline-color-top') || '#333333', thisLineColor2 = $this.data('sparkline-color-bottom') || '#ed1c24', thisSpotRadius1 = $this.data('sparkline-spotradius-top') || 1.5, thisSpotRadius2 = $this.data('sparkline-spotradius-bottom') || thisSpotRadius1, thisSpotColor = $this.data('sparkline-spot-color') || '#f08000', thisMinSpotColor1 = $this.data('sparkline-minspot-color-top') || '#ed1c24', thisMaxSpotColor1 = $this.data('sparkline-maxspot-color-top') || '#f08000', thisMinSpotColor2 = $this.data('sparkline-minspot-color-bottom') || thisMinSpotColor1, thisMaxSpotColor2 = $this.data('sparkline-maxspot-color-bottom') || thisMaxSpotColor1, thishighlightSpotColor1 = $this.data('sparkline-highlightspot-color-top') || '#50f050', thisHighlightLineColor1 = $this.data('sparkline-highlightline-color-top') || '#f02020', thishighlightSpotColor2 = $this.data('sparkline-highlightspot-color-bottom') || thishighlightSpotColor1, thisHighlightLineColor2 = $this.data('sparkline-highlightline-color-bottom') || thisHighlightLineColor1, thisFillColor1 = $this.data('sparkline-fillcolor-top') || 'transparent', thisFillColor2 = $this.data('sparkline-fillcolor-bottom') || 'transparent';

                $this.sparkline(sparklineValue, {

                    type: 'line',
                    spotRadius: thisSpotRadius1,

                    spotColor: thisSpotColor,
                    minSpotColor: thisMinSpotColor1,
                    maxSpotColor: thisMaxSpotColor1,
                    highlightSpotColor: thishighlightSpotColor1,
                    highlightLineColor: thisHighlightLineColor1,

                    valueSpots: sparklineValueSpots1,

                    lineWidth: thisLineWidth1,
                    width: sparklineWidth,
                    height: sparklineHeight,
                    lineColor: thisLineColor1,
                    fillColor: thisFillColor1

                })

                $this.sparkline($this.data('sparkline-line-val'), {

                    type: 'line',
                    spotRadius: thisSpotRadius2,

                    spotColor: thisSpotColor,
                    minSpotColor: thisMinSpotColor2,
                    maxSpotColor: thisMaxSpotColor2,
                    highlightSpotColor: thishighlightSpotColor2,
                    highlightLineColor: thisHighlightLineColor2,

                    valueSpots: sparklineValueSpots2,

                    lineWidth: thisLineWidth2,
                    width: sparklineWidth,
                    height: sparklineHeight,
                    lineColor: thisLineColor2,
                    composite: true,
                    fillColor: thisFillColor2

                })

            }

        });

    }

}

function setup_widgets_desktop() {

    if ($.fn.jarvisWidgets && $.enableJarvisWidgets) {

        $('#widget-grid').jarvisWidgets({

            grid: 'article',
            widgets: '.jarviswidget',
            localStorage: true,
            deleteSettingsKey: '#deletesettingskey-options',
            settingsKeyLabel: 'Reset settings?',
            deletePositionKey: '#deletepositionkey-options',
            positionKeyLabel: 'Reset position?',
            sortable: true,
            buttonsHidden: false,
            // toggle button
            toggleButton: true,
            toggleClass: 'fa fa-minus | fa fa-plus',
            toggleSpeed: 200,
            onToggle: function () {
            },
            // delete btn
            deleteButton: true,
            deleteClass: 'fa fa-times',
            deleteSpeed: 200,
            onDelete: function (th) {
                appendToStorage("deletedWidgets", th.attr("id") + ",");
            },
            // edit btn
            editButton: true,
            editPlaceholder: '.jarviswidget-editbox',
            editClass: 'fa fa-cog | fa fa-save',
            editSpeed: 200,
            onEdit: function () {
            },
            // color button
            colorButton: true,
            // full screen
            fullscreenButton: true,
            fullscreenClass: 'fa fa-resize-full | fa fa-resize-small',
            fullscreenDiff: 3,
            onFullscreen: function () {
            },
            // custom btn
            customButton: true,
            customClass: 'folder-10 | next-10 | customBtn',
            customStart: function () {
                alert('Hello you, this is a custom button...')
            },
            customEnd: function () {
                alert('bye, till next time...')
            },
            // order
            buttonOrder: '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
            opacity: 1.0,
            dragHandle: '> header',
            placeholderClass: 'jarviswidget-placeholder',
            indicator: true,
            indicatorTime: 600,
            ajax: true,
            timestampPlaceholder: '.jarviswidget-timestamp',
            timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
            refreshButton: true,
            refreshButtonClass: 'fa fa-refresh',
            labelError: 'Sorry but there was a error:',
            labelUpdated: 'Last Update:',
            labelRefresh: 'Refresh',
            labelDelete: 'Delete widget:',
            afterLoad: function (th) {

            },
            rtl: false, // best not to toggle this!
            onChange: function () {

            },
            onSave: function () {

            },
            ajaxnav: $.navAsAjax // declears how the localstorage should be saved

        });

    }

}

// Setup Desktop Widgets
function setup_widgets_mobile() {

    if ($.enableMobileWidgets && $.enableJarvisWidgets) {
        setup_widgets_desktop();
    }


}

var gMapsLoaded = false;
window.gMapsCallback = function () {
    gMapsLoaded = true;
    $(window).trigger('gMapsLoaded');
}
window.loadGoogleMaps = function () {
    if (gMapsLoaded)
        return window.gMapsCallback();
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
}

var jsArray = {};

function loadScript(scriptName, callback) {

    if (!jsArray[scriptName]) {
        jsArray[scriptName] = true;

        // adding the script tag to the head as suggested before
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptName;

        // then bind the event to the callback function
        // there are several events for cross browser compatibility
        //script.onreadystatechange = callback;
        script.onload = callback;

        // fire the loading
        body.appendChild(script);

    } else if (callback) {
        callback();
    }
}

if ($.navAsAjax) {
    // fire this on page load if nav exists
    if ($('nav').length) {
        checkURL();
    };

    $(document).on('click', 'nav a[href!="#"]', function (e) {

        e.preventDefault();
        var $this = $(e.currentTarget);

        // if parent is not active then get hash, or else page is assumed to be loaded
        if (!$this.parent().hasClass("active") && !$this.attr('target')) {

            // update window with hash
            // you could also do here:  $.device === "mobile" - and save a little more memory

            if ($.root_.hasClass('mobile-view-activated')) {
                $.root_.removeClass('hidden-menu');
                window.setTimeout(function () {
                    if (window.location.search) {
                        window.location.href =
                            window.location.href.replace(window.location.search, '')
                                .replace(window.location.hash, '') + '#' + $this.attr('href');
                    } else {
                        window.location.hash = $this.attr('href')
                    }
                }, 150);
                // it may not need this delay...
            } else {
                if (window.location.search) {
                    window.location.href =
                        window.location.href.replace(window.location.search, '')
                            .replace(window.location.hash, '') + '#' + $this.attr('href');
                } else {
                    window.location.hash = $this.attr('href');
                }
            }
        }

    });

    // fire links with targets on different window
    $(document).on('click', 'nav a[target="_blank"]', function (e) {
        e.preventDefault();
        var $this = $(e.currentTarget);

        window.open($this.attr('href'));
    });

    // fire links with targets on same window
    $(document).on('click', 'nav a[target="_top"]', function (e) {
        e.preventDefault();
        var $this = $(e.currentTarget);

        window.location = ($this.attr('href'));
    });

    // all links with hash tags are ignored
    $(document).on('click', 'nav a[href="#"]', function (e) {
        e.preventDefault();
    });

    // DO on hash change
    $(window).on('hashchange', function () {
        checkURL();
    });
}


function checkURL() {

    //get the url by removing the hash
    var url = location.hash.replace(/^#/, '');
    container = $("#content");
    // Do this if url exists (for page refresh, etc...)
    if (url) {
        // remove all active class
        $('nav li.active').removeClass("active");
        // match the url and add the active class
        $('nav li:has(a[href="' + url + '"])').addClass("active");
        var title = ($('nav a[href="' + url + '"]').attr('title'));

        // change page title from global var
        document.title = (title || document.title);

        // parse url to jquery
        loadURL(url + location.search, container);
    } else {
        // grab the first URL from nav
        var $this = $('nav > ul > li:first-child > a[href!="#"]');
        //update hash
        window.location.hash = $this.attr('href');
    }
}

function loadContentAppend(url, container, callback) {
    container = $(container);
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        cache: true, // (warning: this will cause a timestamp and will call the request twice)
        beforeSend: function () {
            // cog placed
            container.append('<h1 class="licheck"><i class="fa fa-cog fa-spin"></i> ' + "" + '...</h1>');
            // Only draw breadcrumb if it is main content material
            // TODO: see the framerate for the animation in touch devices
            drawBreadCrumb();
            // scroll up
            $("html").animate({
                scrollTop: 0
            }, "fast");

        },
        complete: function (data) {
        },
        success: function (data) {
            refreshMeSMGreaterPage = refreshMeSMQueueCSRManagerAssigned = refreshMeSMQueueCSRManagerUnasigned = refreshMeSMMyQueue = undefined;

            $(".licheck").remove();
            if (data.indexOf('you do not have permission for this option') !== -1) {

            } else {
                container.append(data);
            }
            nav_page_height();
            if (callback != undefined)
                callback();
        },
        error: function (data) {
            //container.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>');
            container.html(data);
        },
        async: true
    });
}

function loadContentAppendStop(url, container, callback) {
    container = $(container);
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        cache: false, // (warning: this will cause a timestamp and will call the request twice)
        beforeSend: function () {
            // cog placed
            container.append('<h1 class="licheck"><i class="fa fa-cog fa-spin"></i> ' + "" + '...</h1>');
            // Only draw breadcrumb if it is main content material
            // TODO: see the framerate for the animation in touch devices
            drawBreadCrumb();
            // scroll up
            $("html").animate({
                scrollTop: 0
            }, "fast");

        },
        complete: function (data) {
        },
        success: function (data) {
            refreshMeSMGreaterPage = refreshMeSMQueueCSRManagerAssigned = refreshMeSMQueueCSRManagerUnasigned = refreshMeSMMyQueue = undefined;
            $(".licheck").remove();
            if (data.indexOf('you do not have permission for this option') !== -1) {

            } else {
                container.append(data);
            }
            nav_page_height();
            if (callback != undefined)
                callback();
        },
        error: function (data) {
            //container.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>');
            container.html(data);
        },
        async: false
    });
}

function loadContent(url, container, callback) {
    container = $(container);
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        cache: true,
        beforeSend: function () {
            container.html('<h1><i class="fa fa-cog fa-spin"></i> ' + "" + '...</h1>');
            drawBreadCrumb();
            $("html").animate({
                scrollTop: 0
            }, "fast");
        },
        complete: function (data) {
        },
        success: function (data) {

            
            container.html(data);
            nav_page_height();
            if (callback != undefined)
                callback();
        },
        error: function (data) {
            container.html(data);
        },
        async: true
    });
}

var lastScreen = "#";

function loadURL(url, container) {
    //container.html("");
    //loadAngularPage(url, document.getElementById('content'));
    //return;
    openNav();
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        cache: true, // (warning: this will cause a timestamp and will call the request twice)
        beforeSend: function () {
            // cog placed
            //ClearAllIntervals();
            container.html('<h1><i class="fa fa-cog fa-spin"></i> ' + "" + '...</h1>');
            // Only draw breadcrumb if it is main content material
            // TODO: see the framerate for the animation in touch devices

            if (container[0] == $("#content")[0]) {
                drawBreadCrumb();
                // scroll up
                $("html").animate({
                    scrollTop: 0
                }, "fast");
            }
        },
        complete: function (data) {
            // Handle the complete event
            // alert("complete")
            //angular.bootstrap($(".innerAngular"));
            closeNav();
        },
        success: function (data) {
            refreshMeSMGreaterPage = refreshMeSMQueueCSRManagerAssigned = refreshMeSMQueueCSRManagerUnasigned = refreshMeSMMyQueue = undefined;

            //container.css({
            //    opacity: '0.0'
            //}).html(data).delay(50).animate({
            //    opacity: '1.0'
            //}, 300);
            container.html(data);
            nav_page_height();
            closeNav();
        },
        error: function (data) {
            //container.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>');
            container.html(data);
            closeNav();
        },
        async: true
    });
}

function ClearAllIntervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}

function drawBreadCrumb() {
    try {
        var nav_elems = $('nav li.active > a'), count = nav_elems.length;
        $.bread_crumb.empty();
        $.bread_crumb.append($("<li>" + appName + "</li>"));
        if (nav_elems.length > 0) {
            nav_elems.each(function () {
                $.bread_crumb.append($("<li></li>").html($.trim($(this).clone().children(".badge").remove().end().text())));
                if (!--count) document.title = $.bread_crumb.find("li:last-child").text();
            });
        } else {
            var url = location.href.split('#')[1].split('?')[0];
            var urlSchema = url.split('/');
            var count = 0;
            for (var item in urlSchema) {
                var text = urlSchema[item].replace("Base", "");
                if (count == 0) {
                    if (text.length == urlSchema[item].length)
                        text = text.substring(2, text.length);
                    document.title = text;
                }
                $.bread_crumb.append($("<li></li>").html($.trim(text)));
                count++;
            }
        }
    } catch (err) {
    }
}

function summernote() {
    $('.summernote').summernote();
}
function runTimePicker() {
    $('.timepickerClass').each(function () {
        var $this = $(this);
        try {
            $this.timepicker({ showMeridian: false });
        }
        catch (err) {

        }
    });
}
function initializeColorpicker() {
    if ($('.colorpicker.dropdown-menu').length) {
        $('.colorpicker.dropdown-menu').remove();
    }

    $('.colorpicker').each(function () {
        $this = $(this);
        try {
            $this.colorpicker();
        }
        catch (err) {

        }
    });
}

function loadTags() {
    $('.tagsinput').each(function () {
        $this = $(this);
        $this.tagsinput();
    });
}

function startKnob() {
    $('.knob').each(function () {
        $this = $(this);
        $this.knob();
    });
}

function startDropzone() {
    $('.mydropzone').each(function () {
        $this = $(this);
        Dropzone.autoDiscover = false;
        $this.dropzone({
            //url: "/file/post",
            addRemoveLinks: true,
            maxFilesize: 0.5,
            dictResponseError: 'Error uploading file!'
        });
    });
}

ckeditors = new Array();
function pageSetUp(partial, widget) {

    for (name in CKEDITOR.instances) {
        CKEDITOR.instances[name].destroy(true);
    }

    if (widget == undefined || widget == true)
        widget = true;
    else
        widget = false;

    $('.hastooltip').each(function () {
        $this = $(this);
        $this.tooltip();
    });

    $('.baseCheck').each(function () {
        $this = $(this);
        if ($this.data("val") == true) {
            var id = $this.attr("id");
            $this.prop('checked', true)
            $this.val(true);
            $("input[name='" + id + "']:hidden").val(true);
        }
    });


    $('.colorpicker').each(function () {
        var me = $(this);
        me.css('background-color', me.val());
    });



    $('.ckeditor').each(function () {
        $this = $(this);
        var editor = CKEDITOR.instances[$this.attr("id")];
        if (editor) {
            editor.destroy(true);
        }
        CKEDITOR.replace($this.attr("id"), { height: '200px', startupFocus: true });
    });

    if (partial == undefined || partial == false)
        partial = false;
    else
        partial = true;

    if ($.device === "desktop") {
        if (!partial) {
            loadScript("js/plugin/bootstrap-timepicker/bootstrap-timepicker.min.js", runTimePicker);
            loadScript("js/plugin/colorpicker/bootstrap-colorpicker.min.js", initializeColorpicker);
            loadScript("js/plugin/bootstrap-tags/bootstrap-tagsinput.min.js", loadTags);
        }
        if (partial) {
            runTimePicker();
            initializeColorpicker();
            loadTags();
            startKnob();
        }


        $('[readonly]').each(function () {

            switch ($(this).prop("tagName")) {
                case "SELECT":
                    {
                        var option = $(this).find('option:selected');
                        $(this).html('');
                        $(this).append(option);
                        break;
                    }
                default: {
                    $(this).attr('onfocus', 'this.blur()');
                }
            }
        });

        // is desktop

        // activate tooltips
        $("[rel=tooltip]").tooltip();

        // activate popovers
        $("[rel=popover]").popover();

        // activate popovers with hover states
        $("[rel=popover-hover]").popover({
            trigger: "hover"
        });

        // activate inline charts
        runAllCharts();

        // setup widgets
        if (widget)
            setup_widgets_desktop();

        //setup nav height (dynamic)
        nav_page_height();

        // run form elements
        runAllForms();

        var disabledWidgets = localStorage.getItem('deletedWidgets');
        if (disabledWidgets != null) {
            disabledWidgets = disabledWidgets.split(',');
            for (var item in disabledWidgets) {
                if (disabledWidgets[item] != "") {
                    $("#" + disabledWidgets[item]).hide();
                    //alert(disabledWidgets[item]);
                }
            }
            //printObject(disabledWidgets);
        }

    } else {

        // is mobile

        // activate popovers
        if ($("[rel=popover]").length > 0)
            $("[rel=popover]").popover();

        // activate popovers with hover states
        if ($("[rel=popover-hover]").length > 0)
            $("[rel=popover-hover]").popover({
                trigger: "hover"
            });

        // activate inline charts
        runAllCharts();

        // setup widgets
        setup_widgets_mobile();

        //setup nav height (dynamic)
        nav_page_height();

        // run form elements
        runAllForms();

    }

    nav_page_height();
}

$('body').on('click', function (e) {
    $('[rel="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

function loadURLPOST(url, container, selectorSerializer, func) {
    $.ajax({
        url: url,
        type: 'POST',
        enctype: 'multipart/form-data',
        data: $(selectorSerializer).serialize(),
        success: function (data) {
            if (data == undefined || data == "") {
            }
            else {
                $(container).html(data);
                if (func != undefined) {
                    func();
                }
            }
        }
    });
}

function loadURLPOSTAjaxForm(url, container, selectorSerializer, func) {
    $(selectorSerializer).ajaxSubmit(
        {
            url: url,
            success: function (data) {
                $(container).html(data);
                if (func != undefined) {
                    func();
                }
            }
        }
    );
}

function loadURLPOSTFunction(url, func, selectorSerializer) {
    $.ajax({
        url: url,
        type: 'POST',
        data: $(selectorSerializer).serialize(),
        success: function (data) {
            if (data == undefined || data == "") {
            }
            else {
                if (func != undefined) {
                    func();
                }
            }
        }
    });
}

function executeKnow(knowString) {
    if (knowString != undefined) {
        var allCodes = knowString.split(';');
        for (var item in allCodes) {
            var subKnow = allCodes[item];
            var group = subKnow.split('=');
            var selector = subKnow.split('.')[0];
            var method = subKnow.split('.')[1].split('=')[0];
            var value = subKnow.split('=')[1];
            //printObject({ subKnow: subKnow, group: group, selector: selector, method: method, value: value });
            eval('$("' + selector + '").' + method + '("' + value + '");');
        }
    }
}

function clearEvent(selectors, event) {
    for (var item in selectors) {
        if (event == undefined)
            $(selectors[item]).unbind();
        else
            $(selectors[item]).unbind(event);
    }
}

function knowEvent(selector, func) {
    $(selector).click(function () {
        executeKnow($(this).data("code"));
        func();
    });
}

function printDocument(selector) {
    $(selector).addClass("printable");
    window.print();
}

function printObject(o) {
    var out = '';
    for (var p in o) {
        var display = o[p];
        out += p + ' => ' + display + '\n';
    }
    alert(out);
}

function appendToStorage(name, data) {
    var old = localStorage.getItem(name);
    if (old === null) old = "";
    localStorage.setItem(name, old + data);
}


function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
}

loadCSS = function (href) {
    var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
    $("head").append(cssLink);
};

function renderImage(file, element) {

    // generate a new FileReader object
    var reader = new FileReader();

    // inject an image with the src url
    reader.onload = function (event) {
        the_url = event.target.result;
        element.next(".showfile").html("<img src='" + the_url + "' />");
    }

    // when the file is read it triggers the onload event above.
    reader.readAsDataURL(file);
}


$("input[type=file]").on("change", function (e) {
    var reader = new FileReader();
    reader.onload = function (e) {
        $(".showfile").html(this.result.replace(/\n/g, "<br />"));
    };
    reader.readAsText(e.target.files[0]);
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function getJson(url, dataDic, callback, type) {
    if (type == undefined || type == null)
        type = "POST";
    $.ajax({
        url: url,
        type: type,
        data: dataDic,
        mimeType: "multipart/form-data",
        contentType: false,
        cache: false,
        processData: false,
        success: function (data, textStatus, jqXHR) {
            callback(eval("(" + data + ")"));
        }
    });
}


$(document).ajaxStart(function () {

}).ajaxStop(function () {

}).ajaxComplete(function (e) {

}).ajaxSend(function (e) {

});