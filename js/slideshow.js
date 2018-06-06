(function() {
var curr = 1,
    length = $(".slide-4 a").length,
    left,
    errors = [],
    leftog = 0,
    last = 0,
    iwidth = $(".slide-4 a:first div").width(),
    prevStart = 0,
    prevOn = 0,
    ret,
    ratio = "16:9",
    trace = 0,
    mouseon = 0,
    retTog = 1,
    perc,
    $sliding = $(".slide .slide-4"),
    $slide = $(".slide"),
    bdur = 0;
curr -= 1;
$slide.hover(function() {
    setTimeout(function() {
        $(".slide .info").remove();
        $slide.unbind("hover");
    }, 400)
})
$(".slide .slide-item").each(function() {
    bdur += 0.04;
    $("<div class='fill'></div>").insertAfter($(this).find("img"));
    $(this).attr(
        "data",
        $(this)
        .parent()
        .index()
    );
    $(".bullets").append(
        "<div class='bullet' data='" + $(this).attr("data") + "'></div>"
    );
    $(".bdur").html(
        $(".bdur").html() +
        ".bullet[data='" +
        $(this)
        .parent()
        .index() +
        "']:before{transition-delay:" +
        bdur +
        "s}"
    );
});
$(window).resize(resp);
$sliding
    .find("[data='" + curr + "']")
    .fadeIn("slow");
$(window).on("load", function() {
    $(".loading").fadeOut("slow");
});
$(".slide-4, .bullets")
    .on("mousedown touchstart", move)
    .on("mousemove touchmove", function(e) {
        if (mouseon === 1 && detectmob() === false) {
            moving(e);
        } else if (detectmob() === true) {
            moving(e);
        }
    });
$(window).on("mouseup touchend", moved);
$(".right, left, .bullet").unbind();
$(".right").on("click", right);
$(".left").on("click", left);
$(".bullet").on("click", bullets);

function bullets(b) {
    if (b != 1) {
        ret = "stationary";
        var a = $(this).attr("data");
        curr = parseInt(a);
        $sliding.css({
            left: "",
            transform: ""
        });
        lag();
        moved(1);
    }
    $(".slide-item")
        .hide()
        .css("transform", "");
    $(".slide-item[data='" + curr + "']").fadeIn(200);
    if (b == 1) {
        bulletid(0);
    } else {
        bulletid(a);
    }
}

function hidebullets(o) {
    if (o.hasClass("bullets")) {
        return false;
    }
    $(".slide .bullets, .left, .right").addClass("bullets-down");
}

function showbullets() {
    $(".slide .bullets, .left, .right").removeClass("bullets-down");
}

function bulletid(b) {
    $(".active").removeClass("active");
    $(".bullet[data='" + b + "']").addClass("active");
}

function lag(n) {
    $(".slide-item").removeClass("slide-item-btn");
    $(".slide-item")
        .hide()
        .css("transform", "");
    $(".slide-item[data='" + getCurr(curr - 1) + "']").show();
    $(".slide-item[data='" + getCurr(curr - 1) + "']").css(
        "transform",
        "translateX(-100%)"
    );
    $(".slide-item[data='" + getCurr(curr + 1) + "']").css(
        "transform",
        "translateX(100%)"
    );
    $(".slide-item[data='" + getCurr(curr + 1) + "']").show();
    $(".slide-item[data='" + curr + "']").show();
}

function getCurr(a) {
    if (a == -1) {
        return length - 1;
    } else if (a == length) {
        return 0;
    } else if (a == -2) {
        return length - 2;
    } else if (a == length + 1) {
        return 1;
    } else {
        return a;
    }
}

function move(e) {
    detectmob();
    if (detectmob() === true) {
        try {
            trace = e.originalEvent.touches[0].pageX - $sliding.offset().left;
        } catch (err) {
            errors.push(err);
        }
        mouseon = 0;
    } else {
        trace = e.pageX - $sliding.offset().left;
        mouseon = 1;
    }
    $sliding.removeClass("return");
    ret = 0;
    lag();
    left =
        parseInt(
            $sliding
            .css("left")
            .replace("px", "")
        ) + trace;
    prevStart = trace;
    hidebullets($(this));
}

function moving(e) {
    if (detectmob() === true) {
        try {
            trace = e.originalEvent.touches[0].pageX - $sliding.offset().left;
        } catch (err) {
            errors.push(err);
        }
    } else {
        trace = e.pageX - $sliding.offset().left;
    }
    leftog =
        parseInt(
            $sliding
            .css("left")
            .replace("px", "")
        ) +
        trace - left;
    prevOn = trace;
    $sliding.css("left", last + leftog + "px");
    if (
        parseInt(
            $sliding
            .css("left")
            .replace(/px/gi, "")
        ) <= parseInt("-" + iwidth)
    ) {
        if (curr != length - 1) {
            curr += 1;
        } else {
            curr = 0;
        }
        $sliding.css("left", "0");
        //lag();
        last = 0;
        if (detectmob() === true) {
            left =
                parseInt(
                    $sliding
                    .css("left")
                    .replace("px", "")
                ) +
                (e.originalEvent.touches[0].pageX - $sliding.offset().left);
        } else {
            left =
                parseInt(
                    $sliding
                    .css("left")
                    .replace("px", "")
                ) +
                e.pageX -
                $sliding.offset().left;
        }
    }
    if (
        parseInt(
            $sliding
            .css("left")
            .replace(/px/gi, "")
        ) >= iwidth
    ) {
        if (-1 == curr - 1) {
            curr = length - 1;
        } else {
            curr -= 1;
        }
        $sliding.css("left", 0 + "px");
        //lag();
        last = 0;
        if (detectmob() === true) {
            left =
                parseInt(
                    $sliding
                    .css("left")
                    .replace("px", "")
                ) +
                (e.originalEvent.touches[0].pageX - $sliding.offset().left);
        } else {
            left =
                parseInt(
                    $sliding
                    .css("left")
                    .replace("px", "")
                ) +
                e.pageX -
                $sliding.offset().left;
        }
    }
    lag();
}

function moved(n) {
    var c,
        d = $slide.offset().left;
    showbullets();
    percc();
    last = parseInt(
        $sliding
        .css("left")
        .replace("px", "")
    );
    if (n != 1 && mouseon == 1) {
        returnn(ret);
    } else if (detectmob() === true) {
        returnn(ret);
    }
    setTimeout(function() {

        $(".slide-item:visible").each(function() {
            var g = $(this).parent().index();
            //console.log(g + ": " + $(this).offset().left + "\n.slide: " + $slide.offset().left);
            if (
                Math.round($(this).offset().left) === d ||
                Math.ceil($(this).offset().left) === d ||
                Math.floor($(this).offset().left) === d
            ) {
                bulletid(g);
                c = g;
            }
        });
    }, 301);
    mouseon = 0;
    prevOn = 0;
    prevStart = 0;
    lag();
}

function percc() {
    perc = parseInt($sliding.css("left").replace("px", "")) / iwidth * 100;
    if (prevOn > prevStart) {
        if (perc > 10) {
            ret = "left";
        } else {
            ret = "stationary";
        }
    } else {
        if (perc < -10) {
            ret = "right";
        } else {
            ret = "stationary";
        }
    }
}

function returnn(w, n) {
    if (retTog == 1) {
        if (n !== 0) {
            cover();
            $sliding.addClass("return");
        }
        nouse();
        if (w == "left") {
            $sliding.css("left", iwidth + "px");
            left = iwidth;
            last = iwidth;
        } else if (w == "stationary") {
            $sliding.css("left", 0 + "px");
            left = 0;
            last = 0;
        } else if (w == "right") {
            $sliding.css("left", "-" + iwidth + "px");
            left = parseInt("-" + iwidth);
            last = parseInt("-" + iwidth);
        }
    }
}

function right() {
    bulletid(getCurr(parseInt($(".active").attr("data")) + 1));
    $(".slide-item[data='" + getCurr(curr + 2) + "']").show().css(
        "transform",
        "translateX(200%)"
    );
    $sliding.addClass("return-2");
    $sliding.css("transform", "translateX(-" + iwidth + "px)");
    setTimeout(function() {
        $sliding.removeClass("return-2");
        $sliding.css("transform", "");
        if (curr != length - 1) {
            curr += 1;
        } else {
            curr = 0;
        }
        lag();
    }, 300);
}

function left() {
    bulletid(getCurr(parseInt($(".active").attr("data")) - 1));
    $(".slide-item[data='" + getCurr(curr - 2) + "']").show().css(
        "transform",
        "translateX(-200%)"
    );
    $sliding.addClass("return-2");
    $sliding.css("transform", "translateX(" + iwidth + "px)");
    setTimeout(function() {
        $sliding.removeClass("return-2");
        $sliding.css("transform", "");
        if (-1 == curr - 1) {
            curr = length - 1;
        } else {
            curr -= 1;
        }
        lag();
    }, 300);
}

function cover() {

}

function resp() {
    var a = ratio.split(":");
    $sliding.removeClass("return");
    $slide.height($slide.width() / a[0] * a[1]);
    $(".slide-4 a .slide-item").width($slide.width());
    $(".slide-4 a .slide-item").height($slide.height());
    iwidth = $(".slide-4 a:first-child .slide-item").width();
    returnn(ret, 0);
}

function detectmob() {
    var a = navigator.userAgent;
    if (
        a.match(/BlackBerry/gi) ||
        a.match(/Android/gi) ||
        a.match(/iPad/gi) ||
        a.match(/webOS/gi) ||
        a.match(/iPhone/gi) ||
        a.match(/iPod/gi) ||
        a.match(/Windows Phone/gi)) {
        return true;
    }
    return false;
}

function nouse() {
    $sliding.addClass("returning");
    setTimeout(function() {
        $sliding.removeClass("returning");
    }, 400);
}

function getErrors() {
    console.log(errors);
}
resp();
lag();
bullets(curr + 1);

(window.blockMenuHeaderScroll = !1),
$(window).on("touchstart", function(e) {
        1 == $(e.target).closest(".slide-4").length && (blockMenuHeaderScroll = !0);
    }),
    $(window).on("touchend", function() {
        blockMenuHeaderScroll = !1;
    }),
    $(window).on("touchmove", function(e) {
        blockMenuHeaderScroll && e.preventDefault();
    });
})();
