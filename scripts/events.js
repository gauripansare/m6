var count = 0;

$(document).on("mouseover", ".qheight", function (event) {
    $(this).css({
        "font-weight": "bold"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#003058",
        "color": "#F9FF00"
    });

});
$(document).on("mouseout", ".qheight", function (event) {
    $(this).css({
        "font-weight": "normal"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#007AA2",
        "color": "#FFF"
    });
});
$(document).on("click", ".qheight", function (event) {
    $(".qheight").removeClass("optionselected");

    $(this).addClass("optionselected");

});
var hotspotclicked = false;;
var hotspot;
$(document).on("click", ".divHotSpot", function (event) {
    debugger;
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    else {
        var currentPageData = _Navigator.GetCurrentPage();
        var pageData = _PData[currentPageData.pageId];

        if (pageData != undefined) {

            var hotspotdata = pageData.ImageHotSpots;
        }
        var htmlForDivHotspotImage = "";

        //if (pageData.ImageHotSpots != undefined) {
        //    for (var i = 0; i < hotspotdata.Hotspots.length; i++) {
        if (_PData[currentPageData.pageId].ImageHotSpots["Hotspots"][0].eventname == 'noclick')
            return;
        else if (hotspotdata.Hotspots.length > 1) {
            if (_PData[currentPageData.pageId].ImageHotSpots["Hotspots"][1].eventname != 'undefined') {
                if (_PData[currentPageData.pageId].ImageHotSpots["Hotspots"][1].eventname == 'noclick') {
                    return;
                }
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
        }

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
         //   }
       // }
});



$(document).on("click", ".divHotSpotDbl", function (event) {
    debugger;
  
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    else {
        event.preventDefault();
        count++;
        if(count == 2)
        {
        $(this).k_disable()
        if (hotspotclicked || _Navigator.IsAnswered())
            return;
        $(this).addClass("hotspotclicked")
        hotspot = $(this);
        setTimeout(function () {
            hotspotclicked = false;
            _ModuleCommon.HotspotClick(hotspot, event);
        }, 400);
         count = 0;
    }
    
    }
});

  
$(document).on("click",".ui-draggable",function(event){
    debugger;
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    else {
     
 
    $(this).css("border", "blue solid 2px");
    $(this).addClass("selected");
    $(this).attr("aria-label","selected folder")
  //  $("#droppable").css('outline','#ff8c00 solid 2px')
    }
 
});
$(document).on("click","#droppable",function(event){
    debugger;
    var count = 0;
    var ariaTxt='';
               $('.selected').addClass("dropped");
               $('dropped').removeClass('selected');
               $('.dropped').css("border","none")
               //$(this).addClass('droppable')
                 $('.dropped').each(function(){

                    if(!($(this).attr("aria-live") != undefined))
                    {

                        $(this).attr({"aria-live":"assertive","aria-label":$(this).attr("alt")+" dropped in Beautification folder droppable",'aria-disabled':'true'})
                    }
                 })
                
                
                      var droppable = $(this);
                      var draggable = $('.dropped');
                       $(".dropped").draggable({ disabled: true })      
                    //    if( $(".dropped").length == 1)
                    //    {
                    //     $(".PSDdraggble").each(function(){
                    //         debugger;
                    //         if(!$(this).hasClass("dropped"))
                    //         {

                    //             $(this).focus();
                    //             $(this).css('outline',' #ff8c00 solid 2px');
                    //             $("#droppable").css('outline','none')
                    //          }
                            
                    //         });
                    //    }  
                              
                                 
                       if ($(".draggableImgVideo.dropped").length == 1 && count == 0) {
                           _ModuleCommon.InputDND($(".draggableImgVideo"), event);
                           count++;
                       }
                       else {
                           _ModuleCommon.InputDND($(".draggableImgPic"), event)
                       }

                    //    if($('.dropped').length == 2){
                         
                    //        $('.dropped').each(function(){
                    //         ariaTxt = $(this).attr('aria-label');
                    //         ariaTxt = ariaTxt.split('dropped');
                    //         $(this).attr({'aria-label':ariaTxt[0]})

                    //        })
                       
                    //    }
                
 
});

$(document).on("click", ".hintlink", function (event) {
    debugger;
    if ($(this).hasClass("expanded")) {
        $(".hintlink").removeClass("expanded")
        $(".hintlink").attr("aria-expanded", "false")
        $(".hintcontainer").slideUp(100);
        $(".pageheading").focus();
    }
    else {
        $(".hintcontainer").slideDown(100, function () {
            $(".hintlink").addClass("expanded");
            $(".hintlink").attr("aria-expanded", "true");
            $(".hintcontainer .hintcontent").find("p:first").attr("tabindex","-1")
            $(".hintcontainer .hintcontent").find("p:first").focus();
        });
    }

});
$(document).on("click", ".closehintlink", function (event) {

    $(".hintlink").removeClass("expanded")
    $(".hintlink").attr("aria-expanded", "false")
    $(".hintcontainer").slideUp(100,function(){$("h2.pageheading").focus();});


});

$(document).on("keydown", "#droppable", function (event) {
    debugger;
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
$(document).on("keydown", "#droppable", function (event) {
    debugger;
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
$(document).on("keydown", ".ui-draggable", function (event) {
    debugger;
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
    debugger;
    if ($(this).attr("disabled") || $(this).hasClass("disabled") ) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        if ($("input.EmbededElement").length > 0 || $(".ui-draggable").length > 0 || $("#droppable").length ) {
            //do nothuning
        }
        else {
            _ModuleCommon.CropEnter();
        }
    }
});



$(document).on("keyup",'#cropSliderContainer .cropSliderValue', function () {
    cropSlideValue = Number($(this).val());
    $("#cropSliderContainerResize").css("width", cropSlideValue + "px");
    console.log("in crop keyup : " + cropSlideValue);
    $('.cropSliderValue').removeAttr("value");    
    $('.cropSliderValue').attr("value", cropSlideValue);
    cust_ShowCropSliderValue(cropSlideValue);
});

$(document).on("change", '#cropSliderContainer .cropSliderValue', function () {
    debugger;
    cropSlideValue = Number($(this).val());
    $("#cropSliderContainerResize").css("width", cropSlideValue + "px");
    console.log("in video event : " + cropSlideValue);
    var ariaL = Math.round((cropSlideValue / 354) * 100);
    $('.cropSliderValue').attr({
        "aria-label": ariaL + "%"
    });
    $('.cropSliderValue').attr("value", cropSlideValue);
    cust_ShowCropSliderValue(cropSlideValue);
    if(iOS){
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
$(document).on("touchstart", '#cropSliderContainer .cropSliderValue', function () {
    debugger;
    if(iOS || isAndroid){
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
}


$(document).on('keyup','#videoSliderContainer .videoSliderValue', function () {
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
    if ((hours + "").length == 1) hours = '0' + hours;
    if ((minutes + "").length == 1) minutes = '0' + minutes;

    $("#updateTimer").find("p").html("00:" + hours + "." + minutes);
    
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
    debugger;
    if ($(".divHotSpot").hasClass("disabled"))
        return;
    _ModuleCommon.AddEditPropertiesClick(event);
});



$(document).on('click', ".start-btn", function (event) {
    _Navigator.Next();
});
$(document).on('click', ".reviewsubmit", function (event) {
    _Navigator.Next();
});
$(document).on('mouseover', ".hintlink", function (event) {
    $(".hintlink .hintlinkspan").css({"color":"#b22222","border-bottom":"1px solid #b22222"})
    $(this).find("path").css({"fill":"#b22222"})
});

$(document).on('mouseout', ".hintlink", function (event) {
 $(".hintlink .hintlinkspan").css({"color":"#047a9c","border-bottom":"1px solid #047a9c"})
 $(this).find("path").css({"fill":"#047a9c"}) 
});

$(document).on("change", ".assessmentradio", function (event) {
    if($(this).hasClass("disabled"))
    return;
    $(".assessmentSubmit").k_enable();    
});
$(document).on("click", ".assessmentSubmit", function (event) {
    gRecordData.Questions[currentQuestionIndex].UserSelectedOptionId = $("input[type='radio']:checked").attr("id") ;
    gRecordData.Questions[currentQuestionIndex].IsAnswered = true;
    _Navigator.SetBookmarkData();
    _Navigator.Next();
});
$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Prev();
});
$(document).on('click', ".inputcircle", function (event) {
   
    $(this).next(".inpputtext").trigger( "click" );
})
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;    
    _Navigator.Next();
});

window.onload = function () {
    _ScormUtility.Init();
}

window.onunload = function () {
    _ScormUtility.End();
}