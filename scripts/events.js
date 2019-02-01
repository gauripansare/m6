var hotspotclicked = false;;
var hotspot;
var touchend = false;
var touchend1 = false;
$(document).on("click", ".divHotSpot", function (event) {
    
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    else {
        if($(this).attr("eventname") !=undefined && $(this).attr("eventname") == "noclick")
        return;
        else {
            event.preventDefault();
            $(this).k_disable()
            if (hotspotclicked || _Navigator.IsAnswered())
                return;
            $(this).addClass("hotspotclicked")
            hotspot = $(this);
            setTimeout(function () {
                hotspotclicked = false;
                _ModuleCommon.HotspotClick(hotspot, event);

            }, 400)
        }
    }
  
});



$(document).on("dblclick", ".divHotSpotdbl", function (event) {
    
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    } else {
        event.preventDefault();

        $(this).k_disable()
        if (hotspotclicked || _Navigator.IsAnswered())
            return;
        $(this).addClass("hotspotclicked")
        hotspot = $(this);
        setTimeout(function () {
            hotspotclicked = false;
            _ModuleCommon.HotspotClick(hotspot, event);
        }, 400);

    }
});

$(document).on("keyup", ".divHotSpotdbl", function (event) {
    
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    } else {
        event.preventDefault();
        if (window.event) {
            key = window.event.keyCode;
        } else if (event) {
            key = event.keyCode;
        }
        if (key == 13) {
            $(this).k_disable()
            if (hotspotclicked || _Navigator.IsAnswered())
                return;
            $(this).addClass("hotspotclicked")
            hotspot = $(this);
            setTimeout(function () {
                hotspotclicked = false;
                _ModuleCommon.HotspotClick(hotspot, event);
            }, 400);
        }

    }
});


$(document).on("click", ".dragdiv", function (event) {
    console.log("clicked")
    
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    else {     
        if(! (isChrome || isSafari))
              $(".selected").attr("aria-selected","false")
        $(".selected").css("border","none")
        $(".selected").removeClass("selected")
      
        $(this).addClass("selected");
        $(this).css("border", "#ff8c00 solid 2px");
        if(isChrome || isSafari)
            {
                $(this).attr({"aria-pressed":"true"})
            }
            else{
                 $(this).attr({"aria-selected":"true"})
            }
        $("#droppable").css('outline','#ff8c00 auto 2px')
    }

});
$(document).on("click touchstart", "#droppable", function (event) {
    
    var count = 0;
    var ariaTxt = '';
    $('.selected').addClass("dropped");
    $('dropped').removeClass('selected');
    $('.dropped').css("border", "none")
    //$(this).addClass('droppable')
    $('.dropped').each(function () {

        if (!($(this).attr("aria-live") != undefined)) {
            $(this).attr({ "aria-live": "assertive", "aria-label": $(this).attr("aria-label") + " dropped in Beautification folder droppable", 'aria-disabled': 'true' })
        }
    })
    $(".dropped").draggable({ disabled: true })

    $(".dropped").k_disable();
    if ($(".draggableImgVideo.dropped").length == 1 && count == 0) {
        _ModuleCommon.InputDND($(".draggableImgVideo"), event);
        count++;
    }
    else {
        _ModuleCommon.InputDND($(".draggableImgPic"), event)
    }



});
$(document).on("click", ".hintdoc", function (event) {
 
    if ($(this).hasClass("hintdoc")) {
        if ($(this).hasClass("expanded")) {
            $(this).removeClass("expanded")
            $(".hintcontainerdoc").hide();

            open = "close";
        }
        else {
            $(this).addClass("expanded")
            $(".hintcontainerdoc").show();

        }
    }
    if (touchend1) {
        $(this).mouseout();
        touchend1 = false;
    }
    event.preventDefault();
    return;
});


$(document).on("click", ".hintlink", function (event) {
    if ($(this).k_IsDisabled()) return;
    var open = "open;"
    if ($(this).hasClass("expanded")) {
        $(this).removeClass("expanded")
        $(this).attr("aria-expanded", "false")
        $(".hintcontainer").slideUp(100);
        $(".pageheading").focus();
        open = "close";
    }
    else {
        $(this).addClass("expanded");
        $(this).attr("aria-expanded", "true");
        $(".hintcontainer").slideDown(100, function () {

            $(".hintcontainer .hintcontent").find("p:first").attr("tabindex", "-1")
            if (iOS) {
                $(".hintcontainer .hintcontent").find("p:first").attr("role", "text")
            }
            $(".hintcontainer .hintcontent").find("p:first").focus();
        });
    }
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnInteraction("Hint button click. Hint " + open)
    }
    if (touchend) {
        $(this).mouseout();
        touchend = false;
    }

});

$(document).on("click", ".closehintdoc", function (event) {
    if ($(this).k_IsDisabled()) return;
    $(".hintdoc").removeClass("expanded")
    $(".hintcontainerdoc").hide();

    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnInteraction("Hint button click. Hint closed")
    }
    event.preventDefault();
    return;

});
$(document).on("click", ".closehintlink", function (event) {
    if ($(this).k_IsDisabled()) return;
    $(".hintlink").removeClass("expanded")
    $(".hintlink").attr("aria-expanded", "false")
    $(".hintcontainer").slideUp(100, function () { $("h2.pageheading").focus(); });
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnInteraction("Hint button click. Hint closed")
    }

});
$(document).on("keydown", "input.EmbededElement", function (event) {
    if ($(this).k_IsDisabled()) return;
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        _ModuleCommon.InputEnter($(this));
    }
});

$(document).on('touchstart', ".hintlink", function (event) {
    mouseenter($(this));
    touchend = false;
});

$(document).on('touchend ', ".hintlink", function (event) {
    mouseleave($(this));
    touchend = true;
});

$(document).on('touchstart', ".hintdoc", function (event) {
    mouseenter($(this));
    touchend1 = false;
});

$(document).on('touchend ', ".hintdoc", function (event) {
    mouseleave($(this));
    touchend1 = true;
});


$(document).on('mouseenter', ".hintlink", function (event) {
    mouseenter($(this));
});

$(document).on('mouseleave', ".hintlink", function (event) {
    mouseleave($(this));
});

$(document).on('mouseenter', ".hintdoc", function (event) {
    mouseenter($(this));
});

$(document).on('mouseleave', ".hintdoc", function (event) {
    mouseleave($(this));
});
function mouseenter(_ths) {
    _ths.find(".hintlinkspan").css({ "color": "#b22222", "border-bottom": "1px solid #b22222" })
    _ths.find("path").css({ "fill": "#b22222" })
}
function mouseleave(_ths) {
    _ths.find(".hintlinkspan").css({ "color": "#047a9c", "border-bottom": "1px solid #047a9c" })
    _ths.find("path").css({ "fill": "#047a9c" })
}

$(document).on("keyup", "#droppable", function (event) {
   
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $("#droppable").click();
    }
});

$(document).on("keyup", ".dragdiv", function (event) {
   
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        $(this).click();
    }
});

$(document).keydown(function (event) {
  
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        if ($("input.EmbededElement").length > 0 || $(".ui-draggable").length > 0 || $("#droppable").length) {
            //do nothuning
        }
        else {
            _ModuleCommon.CropEnter();
        }
    }
});



$(document).on("keyup", '#cropSliderContainer .cropSliderValue', function () {
    cropSlideValue = Number($(this).val());
    $("#cropSliderContainerResize").css("width", cropSlideValue + "px");
    console.log("in crop keyup : " + cropSlideValue);
    $('.cropSliderValue').removeAttr("value");
    $('.cropSliderValue').attr("value", cropSlideValue);
    cust_ShowCropSliderValue(cropSlideValue);
    $(".slidervalue").html("")
    if(iOS && $(".slidervalue").attr("role")==undefined){
        $(this).attr("role","alert")
    }
    
    var cropwidth = Number($('.cropSliderValue').val());
    if (cropwidth > 240 && cropwidth < 295) {
        
        $(".slidervalue").text("Person is out of frame")
    }
    else if(cropwidth >=295)
    {
        $(".slidervalue").text("Person is still in frame")
    }
    else if(cropwidth <=240){
        $(".slidervalue").text("Cropped more than required")
    }
    
});

$(document).on("change", '#cropSliderContainer .cropSliderValue', function () {
 
    cropSlideValue = Number($(this).val());
    $("#cropSliderContainerResize").css("width", cropSlideValue + "px");
    console.log("in video event : " + cropSlideValue);
    var ariaL = Math.round((cropSlideValue / 354) * 100);
    $('.cropSliderValue').attr({
        "aria-label": ariaL + "%"
    });
    $('.cropSliderValue').attr("value", cropSlideValue);
    cust_ShowCropSliderValue(cropSlideValue);
    if (iOS || isAndroid) {
        var cropwidth = Number($('.cropSliderValue').val());
        var cropheight = 242;
        if (cropwidth >= 235 && cropwidth <= 295) {
            //AddCropData(cropwidth, cropheight, true);
            setTimeout(function(){
            _ModuleCommon.CropEnter();
        },2000)
        }
        else {
            //AddCropData(cropwidth, cropheight, false)

            _ModuleCommon.AddCropData(cropwidth, cropheight, false);
        }
    }
    if(iOS && $(".slidervalue").attr("role")==undefined){
        $(this).attr("role","alert")
    }
    
    var cropwidth = Number($('.cropSliderValue').val());
    if (cropwidth > 240 && cropwidth < 295) {
        
        $(".slidervalue").text("Person is out of frame")
    }
    else if(cropwidth >=295)
    {
        $(".slidervalue").text("Person is still in frame")
    }
    else if(cropwidth <=240){
        $(".slidervalue").text("Cropped more than required")
    }
   
});
$(document).on("touchend", '#cropSliderContainer .cropSliderValue', function () {
  
    if (iOS) {
        var cropwidth = Number($('.cropSliderValue').val());
        var cropheight = 242;
        if (cropwidth >= 235 && cropwidth <= 295) {
            //AddCropData(cropwidth, cropheight, true);
            _ModuleCommon.CropEnter();
        }
        else {
            //AddCropData(cropwidth, cropheight, false)
            _ModuleCommon.AddCropData(cropwidth, cropheight, false);
        }
    }

    else if (isAndroid) {
        cropSlideValue = Number($(this).val());
        $("#cropSliderContainerResize").css("width", cropSlideValue + "px");
        console.log("in video event : " + cropSlideValue);
        var ariaL = Math.round((cropSlideValue / 354) * 100);
        $('.cropSliderValue').attr({
            "aria-label": ariaL + "%"
        });
        $('.cropSliderValue').attr("value", cropSlideValue);
        cust_ShowCropSliderValue(cropSlideValue);
        var cropwidth = Number($('.cropSliderValue').val());
        var cropheight = 242;
        if (cropwidth >= 235 && cropwidth <= 295) {
            //AddCropData(cropwidth, cropheight, true);
            _ModuleCommon.CropEnter();
        }
        else {
            //AddCropData(cropwidth, cropheight, false)
            _ModuleCommon.AddCropData(cropwidth, cropheight, false);
        }
    }


});
function cust_ShowCropSliderValue(_videoSlideValue) {
    $("#cropSliderContainerResize").css("width", _videoSlideValue + "px");
    $("#gridcontainer").css("width", _videoSlideValue + "px");
    $(".hdr_table").css("width", _videoSlideValue + "px");

}


$(document).on('keyup', '#videoSliderContainer .videoSliderValue', function () {
    $(" #videoSliderContainer .videoSliderValue").focus();
    videoSlideValue = Number($(this).val());

    var hours = Math.floor(videoSlideValue / 60);
    var minutes = videoSlideValue - (hours * 60);
    $('.videoSliderValue').removeAttr("value");
    if ((hours + "").length == 1) hours = '0' + hours;
    if ((minutes + "").length == 1) minutes = '0' + minutes;

    $("#updateTimer").find("p").html("00:" + hours + "." + minutes);

    $('.videoSliderValue').attr("value", videoSlideValue);
    cust_ShowVideoSliderValue(videoSlideValue);
});

$(document).on('change', '#videoSliderContainer .videoSliderValue', function () {
    $("#divHotspots0_1").show();
    $("#divHotspots0_1").removeClass("hotspotclicked disabled")
    videoSlideValue = Number($(this).val());

    var hours = Math.floor(videoSlideValue / 60);
    var minutes = videoSlideValue - (hours * 60);
    $('.videoSliderValue').removeAttr("value");
    var seconds = hours > 1 ? " seconds " :" second ";
    var miliseconds = minutes > 1 ? " milliseconds" :" millisecond";
    if ((hours + "").length == 1) hours = '0' + hours;
    if ((minutes + "").length == 1) minutes = '0' + minutes;

    $("#updateTimer").find("p").html("00:" + hours + "." + minutes);
    if(iOS && $(".slidervalue").attr("role")==undefined){
        $(this).attr("role","alert")
    }
   
    $(".slidervalue").text("current end point for video set at "+hours + seconds + minutes +miliseconds )
    $('.videoSliderValue').attr("value", videoSlideValue);
    cust_ShowVideoSliderValue(videoSlideValue);
   
    
});

function cust_ShowVideoSliderValue(_videoSlideValue) {
    var hours = Math.floor(_videoSlideValue / 60);
    var minutes = _videoSlideValue - (hours * 60);
    $('.videoSliderValue').removeAttr("value");
    if ((hours + "").length == 1) hours = '0' + hours;
    if ((minutes + "").length == 1) minutes = '0' + minutes;

    $("#updateTimer").find("p").html("00:" + hours + "." + minutes);
    $('.videoSliderValue').attr("value", _videoSlideValue);
}

$(window).resize(function () {
    _ModuleCommon.OrientationChange();
});
$(document).on('click', ".activityimg", function (event) {
    if ($(".divHotSpot").hasClass("disabled") || $(".divHotSpot").length == 0 || $(".input.EmbededElement").length > 0)
        return;
    _ModuleCommon.AddEditPropertiesClick(event);
});


$(document).on('click', ".startbtn", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Next();
    //_Navigator.LoadPage("p30")
});
$(document).on('click', ".reviewsubmit", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Next();
});

$(document).on("change", ".assessmentradio", function (event) {
    if ($(this).k_IsDisabled()) return;
    if ($(this).hasClass("disabled"))
        return;
    $(".assessmentSubmit").k_enable();
});
$(document).on("click", ".assessmentSubmit", function (event) {
    if ($(this).k_IsDisabled()) return;
    if (_Navigator.IsRevel()) {
        LifeCycleEvents.OnSubmit();
    }
    gRecordData.Questions[currentQuestionIndex].UserSelectedOptionId = $("input[type='radio']:checked").attr("id");
    gRecordData.Questions[currentQuestionIndex].IsAnswered = true;
    _Navigator.GetBookmarkData();
    _Navigator.Next();
});
$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Prev();
});
$(document).on('click', ".inputcircle", function (event) {

    $(this).next(".inpputtext").trigger("click");
})
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Next();
});

$(document).on('click', ".inputcircle", function (event) {
    if ($(this).k_IsDisabled()) return;
    $(this).next(".inpputtext").trigger("click");
});
window.onload = function () {
    _ScormUtility.Init();
}

window.onunload = function () {
    _ScormUtility.End();
}
window.addEventListener("scroll", function () {

    var currPage = _Navigator.GetCurrentPage();
    if (currPage.pageId == "p1")
        return;
    var target = $(".header-content-dock");

    if (window.pageYOffset > $("#header-content").height() - 10) {
        var width = $("#wrapper").width();
        target.css({ "visibility": "visible", "top": "0px", "width": width + "px" })
    }
    else if (window.pageYOffset < $("#header-content").height() - 10) {
        target.css({ "visibility": "hidden", "top": "-80px" })
        $(".hintcontainerdoc").hide();
        $(".hintdoc").removeClass("expanded")
        $(".header-content-dock").find(".presentationModeFooter").hide();

    }
    if (_Navigator.GetCurrentPage().pageId == _Navigator.GetQuizPageId() || currPage.hinturl == undefined || currPage.hinturl == "") {
        $(".hintdoc").parent().hide();
    }
    else {
        $(".hintdoc").parent().show();
    }
    if(_Navigator.IsPresenterMode() || _Navigator.IsReviewMode())
    {
        $(".header-content-dock").find(".presentationModeFooter").show();
        $(".header-content-dock .intro-content").css({"margin-top":"30px"})
    }

}, false);
