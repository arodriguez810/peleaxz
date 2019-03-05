ANIMATION = {
    play: function (block, animation) {
        if (block === undefined) block = "#content";
        var element = $(block);
        if (animation === undefined) {
            animation = element.data("animation");
        }
        element.addClass("animated " + animation).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            element.removeClass("animated " + animation);
        });
    },
    scrollToPure: function (block) {
        var $container = $('#baseController');
        $container.scrollTop(
            block.offset().top - $container.offset().top + $container.scrollTop()
        );
    },
    playPure: function (block, animation, callback) {
        block.addClass("animated " + animation).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            block.removeClass("animated " + animation);
            if (DSON.iffunction(callback))
                callback();
        });
    },
    loading: function (customBlock, text, spinner, size, icon) {
        if (customBlock === undefined) customBlock = "#content";
        if (text === undefined) text = "Loading...";
        if (spinner !== undefined) {
            ANIMATION.spinner.on(spinner);
        }
        var block = $(customBlock);
        $(block).block({
            message: text + '<br><i class="icon-' + (icon || "spinner2") + ' spinner" style="font-size: ' + (size || "50") + 'px"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd',
                height: '100%',
                width: '100%',
                left: '0px'
            },
            css: {
                border: 0,
                backgroundColor: 'none'
            }
        });
    },
    stoploading: function (customBlock, spinner) {
        if (customBlock === undefined) customBlock = "#content";
        if (spinner !== undefined) {
            ANIMATION.spinner.off(spinner);
        }
        var block = $(customBlock);
        $(block).unblock();
    },
    loadingPure: function (customBlock, text, spinner, size, icon) {
        if (text === undefined) text = "Loading...";
        if (spinner !== undefined) {
            ANIMATION.spinner.onPure(spinner);
        }
        customBlock.block({
            message: text + '<br><i class="icon-' + (icon || "spinner2") + ' spinner" style="font-size: ' + (size || "50") + 'px"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd',
                height: '100%',
                width: '100%',
                left: '0px'
            },
            css: {
                border: 0,
                backgroundColor: 'none'
            }
        });
    },
    stoploadingPure: function (customBlock, spinner) {
        if (spinner !== undefined) {
            ANIMATION.spinner.offPure(spinner);
        }
        customBlock.unblock();
    },
    spinner: {
        on: function (customBlock) {
            var i = $(customBlock).find("i");
            $(customBlock).addClass("disabled");
            $(customBlock).addClass("spinner");
            if (i.length <= 0) {

            } else {
                i.addClass("spinner");
            }
        },
        off: function (customBlock) {
            var i = $(customBlock).find("i");
            $(customBlock).removeClass("disabled");
            $(customBlock).removeClass("spinner");
            if (i.length <= 0) {

            } else {
                i.removeClass("spinner");
            }
        },
        onPure: function (customBlock) {
            var i = customBlock.find("i");
            customBlock.addClass("disabled");
            customBlock.addClass("spinner");
            if (i.length <= 0) {

            } else {
                i.addClass("spinner");
            }
        },
        offPure: function (customBlock) {
            var i = customBlock.find("i");
            customBlock.removeClass("disabled");
            customBlock.removeClass("spinner");
            if (i.length <= 0) {

            } else {
                i.removeClass("spinner");
            }
        }
    }
};


$(document).ready(function () {

    // Animate when Pace loading is done
    firstPeace = true;
    Pace.on('done', function () {
        if (firstPeace) {

            setTimeout(function () {
                $(".containerLading").remove();
                $('#baseController').show();

                $(document).on('dblclick', '[data-dragonfile]', function () {
                    var folder = $(this).data('dragonfile');
                    folder = folder[0] = '/' ? folder.substr(1, folder.length - 1) : folder;
                    baseController.viewData = {
                        root: folder,
                        scope: baseController.currentModel,
                        columns: 1,
                        maxsize: 9999,
                        maxfiles: 1
                    };
                    baseController.currentModel.modal.modalView("../templates/components/gallery", {
                        width: 'modal-full',
                        header: {
                            title: `Files of ${folder}`,
                            icon: ICON.classes.file_stats
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: "Loading Files"
                        },
                    });
                });

                $('[data-dragonfile]').each(function () {
                    FILE.runServerFile($(this))
                });

                $(".navbar, .navbar-brand, .navbar-text, .navbar-nav > li, .page-title, .page-header .heading-elements")
                    .css('opacity', 1)
                    .velocity("transition.slideDownIn", {
                        stagger: 100,
                        duration: 100,
                        complete: function (elements) {
                            $(this).removeAttr('style');
                        }
                    });

                // Navigation list on load
                $(".navigation ul > li")
                    .css('opacity', 0)
                    .velocity("transition.slideLeftIn", {
                        stagger: 150,
                        duration: 500,
                        complete: function (elements) {
                            $(this).removeAttr('style')
                        }
                    });

            }, 1000);
            firstPeace = false;
        }
    });

});