
var redEyeClickCount = 0;   
var isredEye1Clicked = false;
var isredEye2Clicked = false;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isSafari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
var isIEEdge = /Edge/.test(navigator.userAgent);
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
var isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        return this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});
var _ModuleCommon = (function () {
    var reviewData = [];
    return {
        EnableNext: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (currentPageData.nextPageId != undefined && currentPageData.nextPageId != "") {
                $("#linknext").k_enable();
            }
        },
        GetPageReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        return reviewData[i];
                    }
                }
            }

        },
        GetReviewData:function(){
            return reviewData;
        },
        SetReviewData:function(rData){
            reviewData = rData;
        },
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },
        ShowFeedbackReviewMode: function () {
            var pageData = this.GetPageDetailData();
            var fdkurl = "";
            if (pageData != undefined) {
                if (pageData.EmbedSettings != undefined) {
                    fdkurl = pageData.EmbedSettings.feedbackurl;
                }
                else {
                    if (pageData.ImageHotSpots != undefined) {
                        for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                            fdkurl = pageData.ImageHotSpots.Hotspots[i].feedbackurl;
                            break;
                        }
                    }
                }
                fdkurl = _Settings.dataRoot + "feedbackdata/" + fdkurl;
                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                    //this.SetFeedbackTop()
                    $('html,body').animate({ scrollTop: 0 }, 0, function () { });
                });
            }
        },
       
        InitiateDNDelements: function () {
            debugger;
            var count = 0;
            $(".draggableImgPic").addClass("PSDdraggble")
            $(".draggableImgVideo").addClass("PSDdraggble")
            $(".draggableImgPic").attr("dObjname","Pictures folder");
            $(".draggableImgVideo").attr("dObjname", "Video folder");
            if(isAndroid || iOS){
                $("#droppable") .append('<img class="droppableImgBg" src="" alt=" Beautification folder droppable Background" style="width: 56px;height:71px;opacity:0;"></n3>')

            }
           // $("#droppable").attr("aria-label","Beautifiaction committee folder droppable")
            $(".PSDdraggble").draggable({
                cursor: 'pointer',
                containment: $('.column'),
                helper: 'clone',
                drag: function (event, ui) {
                    $(this).css("opacity","1")
                    ui.helper.addClass("draggable");
                },
                start: function (event, ui) {
                    ui.helper.removeClass("draggable");
                    // $(ui.helper).css("z-index", 100);
                    ui.helper.data('rejected', true);
                    ui.helper.data('original-position', ui.helper.offset());                   
                    $("#droppable").css('opacity', '1');
                    $("#droppable").css("z-index", "4");
                },
                revert: function (event, ui) {
                    $(this).data("draggable");
                    return !event;
                },
                stop: function (event, ui) {

                    if (ui.helper.data('rejected') === true) {
                        ui.helper.css({ "top": ui.helper.attr("originaltop"), "left": ui.helper.attr("originalleft") });
                        $(ui.helper).css("z-index", 4);
                    } else {
                        $(this).draggable({ disabled: true })
                    }
                    var pos = $(ui.helper).offset();
                    $(".draggable").css({"top":pos.top,"left":pos.left})
                        
                    $("#droppable").css("z-index","4")
                    // $(ui.helper).css("z-index", 50);
                    $("#droppable").css('opacity', '1');
                }
            });
          
            $("#droppable").droppable({
                accept: ".PSDdraggble",
                drop: function (event, ui) {
                    debugger;
                    ui.draggable.addClass("dropped");
                 
                      var droppable = $(this);
                      var draggable = ui.draggable;
                    //  // Move draggable into droppable
                     
                       $(".dropped").draggable({ disabled: true })
                    //  $("#droppable").css("z-index", "10");
                    //  $("#droppable").css('opacity', '0.3');
                       if ($(".draggableImgVideo.dropped").length == 1 && count == 0) {
                           _ModuleCommon.InputDND($(".draggableImgVideo"), event);
                           count++;
                       }
                       else {
                           _ModuleCommon.InputDND($(".draggableImgPic"), event)
                       }
                }
            });
          
        },
      
        DisplayInstructorReviewMode: function () {
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            var currPage= _Navigator.GetCurrentPage();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {
                
                this.InstructorReviewModeForTextEntry();
            }
            if (_Navigator.IsDND() && _Navigator.IsAnswered()) {

                this.DisplayDrangAndDropInReviewMode();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    for (var i = 0; i < reviewData.Positions.length; i++) {
                        var posObj = reviewData.Positions[i];
                        
                        var appendImage = $(".wrapperimage");
                        var ht = appendImage.width();
                        var ht1 = appendImage.height();
                     
                    
                        if(ht1 < 597)
                        {
                            ht1 =597;
                        }
                        while ((posObj.posX + 40) > ht) {
                            posObj.posX = posObj.posX - 2;
                        }
                        while ((posObj.posY + 40) > ht1) {
                            posObj.posY = posObj.posY - 2;
                        }
                    
                        if (posObj.isCorrect) {
                            var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                            appendImage.parent().append(_div);


                        } else {
                            var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                            appendImage.parent().append(_divI);
                        }
                    }
                }
                
            }
           
            this.ShowFeedbackReviewMode();
            $(".divHotspotCommon").addClass("disabled")
            $(".divHotspotCommon").attr("aria-disabled","true")  
        },
        InstructorReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                var p = "";
                for (i = 0; i < reviewData.textEntry.length; i++) {
                    if (reviewData.textEntry[i] != undefined && reviewData.textEntry[i] != "") {
                        var tEntry = reviewData.textEntry[i].trim().toLowerCase();
                        if (pageDetailData.EmbedSettings.validatearray.indexOf(tEntry) >= 0) {
                            if (reviewData.isCorrect && i == 0) {
                                $(".textentryreview1").html("<span class='OpenSansFont' style='color:green;font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[i]+ "</span>")
                                $(".textentryaccessibility").text("Correct url entered "+reviewData.textEntry[i])
                                $(".textentryreview1").attr("aria-hidden","true")
                            }
                            else {
                                $(".textentryreview2").html("<span class='OpenSansFont'  style='color:green;font-weight:bold;font-size: 13px;padding-left:5px; '>" + reviewData.textEntry[i] + "</span>");
                                $(".textentryreview2").show();
                                $(".textentryreview2").attr("aria-hidden","true")
                              
                            }
                        }
                        else {
                            $(".textentryreview1").html("<span class='OpenSansFont'  style='color:red;font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[i] + "</span>")
                            $(".textentryaccessibility").text("Incorrect url entered " + reviewData.textEntry[0] + " Correct url "+reviewData.textEntry[1])
                            $(".textentryreview1").attr("aria-hidden","true")
                        }
                    }

                }
                $(".textentryreview1").show();
                
            }
        },
        DisplayUserReviewMode: function () {
            debugger;
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {
                debugger;
                this.DisplayReviewModeForTextEntry();
            }
             if (pageDetailData != undefined && _Navigator.IsDND()) {
                this.DisplayDrangAndDropInReviewMode();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    if (reviewData.Positions.length > 1) {
                        for (var i = 0; i < reviewData.Positions.length; i++) {
                            var posObj = reviewData.Positions[i];
                            var appendImage = $(".wrapperimage");
                            var ht = appendImage.height();
                            while ((posObj.posY + 40) > ht) {
                                posObj.posY = posObj.posY - 2;
                            }
                          
                            if (posObj.isCorrect) {
                                var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                                appendImage.append(_div);


                            } else {
                                var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                                appendImage.append(_divI);
                            }
                        }
                    }
                    else {
                        var posObj = reviewData.Positions[reviewData.Positions.length - 1];
                        var appendImage = $(".wrapperimage");
                        var ht = appendImage.height();
                        while ((posObj.posY + 40) > ht) {
                            posObj.posY = posObj.posY - 2;
                        }

                        if (posObj.isCorrect) {
                            var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                            appendImage.append(_div);


                        } else {
                            var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                            appendImage.append(_divI);
                        }
                    }
                }
            }
            this.ShowFeedbackReviewMode();
            

        },
        DisplayReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                

                if (reviewData.textEntry[reviewData.textEntry.length - 1] != undefined && reviewData.textEntry[reviewData.textEntry.length - 1] != "") {
                    var tEntry = reviewData.textEntry[reviewData.textEntry.length - 1].trim().toLowerCase();
                    if (pageDetailData.EmbedSettings.validatearray.indexOf(tEntry) >= 0) {
                        $(".textentryreview1").html("<span class='OpenSansFont' style='color:green;font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[reviewData.textEntry.length - 1] + "</span>")
                    }

                }
                $(".textentryreview1").show();
            }
        },
         DisplayDrangAndDropInReviewMode:function() {
             debugger;
                    $(".PSDdraggble").draggable({ disabled: true });
                    $(".draggableImgPic").addClass("disabled")
                    $(".draggableImgPic").attr("aria-disabled","true")
                    $(".draggableImgVideo").addClass("disabled")
                    $(".draggableImgVideo").attr("aria-disabled","true")
                    $("#droppable").addClass("disabled")
                    $(".reviewDiv").remove();
                    var reviewData = this.GetPageReviewData();
                    var pageDetailData = this.GetPageDetailData();
                    if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                      
                        for (var i = 0; i < reviewData.Positions.length; i++) {
                            var posObj = reviewData.Positions[i];
                            var appendImage = $(".wrapperimage");
                            var ht1 = appendImage.height();
                            var ht = appendImage.width();
                    
                        if(ht1 < 597)
                        {
                            ht1 =597;
                        }
                        while ((posObj.posX + 40) > ht) {
                            posObj.posX = posObj.posX - 2;
                        }
                        while ((posObj.posY + 40) > ht1) {
                            posObj.posY = posObj.posY - 2;
                        }
                            if (posObj.isCorrect) {
                                var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='" + posObj.src + "' style='width:" + posObj.width + "px;height:" + posObj.height + "px;float:left;' /><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                                appendImage.append(_div);


                            } else {
                                var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='" + posObj.src + "' style='width:" + posObj.width + "px;height:" + posObj.height + "px;float:left;' /><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                                appendImage.append(_divI);
                            }
                      }

                   }

                      
                },
    AddHotspotClick: function (hotspotObj, event,isCorrect) {

        //$(".divHotSpot").remove();
        if (_Navigator.IsAnswered()) {
            return;
        }
        var imgObj = $(".activityimg");
        var posX = imgObj.offset().left;
        var posY = imgObj.offset().top;
        var found = false;

        var rposX;
        var rposY;
        if (event != undefined && event.pageX != undefined) {
            rposX = (event.pageX - posX);
            rposY = (event.pageY - posY);
        }
            if(rposX <0 || rposY <0){//gp if module is attmpted using accessibility
            rposX = hotspotObj.position().left + 20;
            rposY = hotspotObj.position().top + 20;
        }
        var currentPageData = _Navigator.GetCurrentPage();
            var page = this.GetPageDetailData();
            if (page.EmbedSettings != undefined)
            {
                return;
            }
        for (var r = 0; r < reviewData.length; r++) {
            if (reviewData[r].pageId == currentPageData.pageId) {
                var sameclick = false;
                var posindex = 0;
                if (reviewData[r].Positions != undefined) {
                    for (var i = 0; i < reviewData[r].Positions.length; i++) {
                        if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posY == rposY) {
                            sameclick = true;
                            posindex = i;
                            break;
                        }
                    }
                    if (!sameclick) {
                        var position = { posX: rposX, posY: rposY, isCorrect: true };
                        if (reviewData[r].Positions.length < 3) {
                            reviewData[r].Positions.push(position);
                        }
                        else {
                            if (currentPageData.pageId == "p25") { } else {
                                reviewData[r].Positions.splice(0, 1);
                            }
                            reviewData[r].Positions.push(position);
                        }
                    }
                    else {
                        if (reviewData[r].Positions[posindex].isCorrect == undefined || reviewData[r].Positions[posindex].isCorrect == false) {
                            reviewData[r].Positions[posindex].isCorrect = isCorrect;
                        }
                    }
                }
                else {
                    var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                    reviewData[r].Positions = [position]
                }

                found = true;
            }
        }

        if (!found) {
            var _obj = {};
            _obj.pageId = currentPageData.pageId;
            if(isCorrect == undefined)
                {
                    isCorrect = true

                }
            var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
            _obj.Positions = [position]
            reviewData.push(_obj);

        }

    },
AddEditPropertiesClick: function (event) {
    if (_Navigator.IsAnswered()) {
        return;
    }
    var pageDetailData = this.GetPageDetailData();
    if (pageDetailData.ImageHotSpots == undefined)
        return;
    var imgObj = $(".activityimg");
    var posX = imgObj.offset().left;
    var posY = imgObj.offset().top;
    var found = false;

    var rposX = (event.pageX - posX);
    var rposY = (event.pageY - posY);
    if (isNaN(rposX) || isNaN(rposY))
        return;

    var currentPageData = _Navigator.GetCurrentPage();
    for (var r = 0; r < reviewData.length; r++) {
        if (reviewData[r].pageId == currentPageData.pageId) {
            var sameclick = false;
            if (reviewData[r].Positions != undefined) {
                for (var i = 0; i < reviewData[r].Positions.length; i++) {
                    if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posy == rposY) {
                        sameclick = true;
                        break;
                    }
                }
                if (!sameclick) {
                    var position = { posX: rposX, posY: rposY, isCorrect: false };
                    if (reviewData[r].Positions.length < 3) {
                        reviewData[r].Positions.push(position);
                    }
                    else {
                        debugger;
                        if (currentPageData.pageId == "p25") { } else {
                            reviewData[r].Positions.splice(0, 1);
                        }
                        reviewData[r].Positions.push(position);
                                
                    }
                }
            }
            else {
                var position = { posX: rposX, posY: rposY, isCorrect: false };
                reviewData[r].Positions = [position]
            }

            found = true;
        }
    }

    if (!found) {
        var _obj = {};
        _obj.pageId = currentPageData.pageId;
        var position = { posX: rposX, posY: rposY, isCorrect: false };
        _obj.Positions = [position]
        reviewData.push(_obj);
    }

},
OnPageLoad: function () {
    var currentPageData = _Navigator.GetCurrentPage();
  //  $( "#gridcontainer" ).resizable();
    this.LoadHotSpot();
    this.ApplycontainerWidth();
                if( $("#div_feedback").length > 0)
            {
                $("#div_feedback").hide();
               
            }

    if (_Navigator.IsAnswered()) {
        debugger;
        this.DisplayInstructorReviewMode();
        
    }
      $("h2.pageheading").attr("tabindex","-1");
    if (currentPageData.pageId == "p42") {
         this.setVideoPageData();
       
        if(_Navigator.IsAnswered()) {
            this.DisplaySliderData();
        }
  
    }
    if (currentPageData.pageId == "p30") {
        
        if(_Navigator.IsAnswered())
             this.DisplayCropData();
    }
    if (_Navigator.IsDND() && !_Navigator.IsAnswered()) {
            this.InitiateDNDelements();
              
    }
    if (_Navigator.IsRedEyed()) {
        debugger;
        if (isredEye1Clicked == false) {
            $(".Redeyeleft").hide();
        }
        if (isredEye2Clicked == false) {
            $(".Redeyeright").hide();
        }
        $("#divHotspots1_2").hide();
        $("#divHotspots2_3").hide();
    }
    this.AppendCss();
},

DisplayCropData: function () {
   
    var appendImage = $(".wrapperimage");
    var reviewData = this.GetPageReviewData();
    if (reviewData != undefined && reviewData.PositionsCrop != undefined) {
        for (var i = 0; i < reviewData.PositionsCrop.length; i++) {
            if (reviewData.PositionsCrop[i].isCorrect == true) {
                var _div = "<div style='position:absolute;left:214px;top:182px;width:" + reviewData.PositionsCrop[i].width + "px;height:" + reviewData.PositionsCrop[i].height + "px;border-right: 3px dashed green;border-bottom: 3px dashed green;'></div>";
            }
            else {
                var _div = "<div style='position:absolute;left:214px;top:182px;width:" + reviewData.PositionsCrop[i].width + "px;height:" + reviewData.PositionsCrop[i].height + "px;border-right: 3px dashed red;border-bottom: 3px dashed red;'></div>";
            }
            appendImage.append(_div);
        }
    }
},
 DisplaySliderData :function() {
     var appendImage = $(".wrapperimage");
     var reviewData = this.GetPageReviewData();
    var div;
    $(".videoSliderValue").addClass("disabled");
    if (reviewData != undefined && reviewData.PositionsSlide != undefined) {
        for (var i = 0; i < reviewData.PositionsSlide.length; i++) {
            if (reviewData.PositionsSlide[i].isCorrect == true) {
                div = "<div style='position:absolute;left:" + (reviewData.PositionsSlide[i].slideValue+200) + "px;top:360px;width:1px;height:13px;border-right: 3px solid green;'></div>";
            }
            else {
                div = "<div style='position:absolute;left:" + (reviewData.PositionsSlide[i].slideValue+200) + "px;top:360px;width:1px;height:13px;border-right: 3px solid red;'></div>";
            }
            appendImage.append(div);
        }

    }

},

LoadHotSpot: function () {
    debugger;
   
    var currentPageData = _Navigator.GetCurrentPage();
    var pageData = _PData[currentPageData.pageId];
    var aceessTextforImg = currentPageData.accessText;
    $(".activityimg").attr("alt",aceessTextforImg)
    if (pageData != undefined) {

        var hotspotdata = pageData.ImageHotSpots;
        var htmlForDivHotspotImage = "";
        if (pageData.ImageHotSpots != undefined) {
            for (var i = 0; i < hotspotdata.Hotspots.length; i++) {
                var currImg = $("img")
                var orw = currImg.width();
                var orh = currImg.height();

                var hsId = hotspotdata.Hotspots[i].HotspotId;

                var pwdth = hotspotdata.Hotspots[i].width;
                var phight = hotspotdata.Hotspots[i].height;
                var pleft = hotspotdata.Hotspots[i].left;
                var ptop = hotspotdata.Hotspots[i].top;
                var accessText = hotspotdata.Hotspots[i].accessText;
               
                if ((hotspotdata.Hotspots[i].left + "").indexOf("px") != -1) {
                    pleft = getPerc(Number(hotspotdata.Hotspots[i].left.replace("px", "").replace("%", "")), orw) + "%";
                    ptop = getPerc(Number(hotspotdata.Hotspots[i].top.replace("px", "").replace("%", "")), orh) + "%";
                }
                if (hotspotdata.Hotspots[i].eventname == "dblclick") {
                    htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpotDbl divHotspotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>"
                }
                else {
                    htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpot divHotspotCommon' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>";
                }
            }
           
            $(".wrapperimage").append(htmlForDivHotspotImage)
        }

    }
},
PresenterMode:function(){
    debugger;
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = this.GetPageDetailData();
            isCorrect=true;
            var getArray=[];
            var getidArray=[];
            $(".divHotspotCommon").each(function(){

                getArray.push($(this).attr("hsid"))
             
            })
            if((currentPageData.pageId == "p5" ||currentPageData.pageId == "p36" ) && pageData.EmbedSettings!=undefined)
            {
                $("input[type='text']").addClass("greenspan");
                $("input[type='text']").val(pageData.EmbedSettings.validatearray[0]);
                $("input[type='text']").k_disable();

            }
            if(currentPageData.pageId == "p3"){

                this.DisplayDrangAndDropInReviewMode();
            }
            if(currentPageData.pageId == "p25"){

                $("#divHotspots2_3").show();
                $("#divHotspots1_2").show();
            }

            if(currentPageData.pageId == "p30"){

                //this.setCropPageData();
                var appendImage = $(".wrapperimage");               
                var _div = "<div style='position:absolute;left:214px;top:182px;width:" + 291 + "px;height:" + 242 + "px;border-right: 3px dashed green;border-bottom: 3px dashed green;'></div>";
                appendImage.append(_div);
           
    
            }
            if(currentPageData.pageId == "p42")
            {
               // var videoSlideValue = Number($('.videoSliderValue').val());
              //  var sliderLength = parseInt(280 * videoSlideValue / 1195)
                var appendImage = $(".wrapperimage");
                $("#updateTimer").find("p").html("00:10.00");
               var div;
               $(".videoSliderValue").addClass("disabled");
                div = "<div style='position:absolute;left:" + (141+200) + "px;top:360px;width:1px;height:13px;border-right: 3px solid green;'></div>";
                appendImage.append(div);
                  
           
          }

            
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                 for(var j=0; j< getArray.length;j++){   
                    
                       if (pageData.ImageHotSpots.Hotspots[i].HotspotId == getArray[j]) {
                                
                            if (pageData.ImageHotSpots.Hotspots[i].isCorrect != undefined) {
                                 isCorrect = pageData.ImageHotSpots.Hotspots[i].isCorrect;
                            }
                          if(isCorrect)
                          { 
                            if(pageData.ImageHotSpots.Hotspots[i].eventname == "dblclick")
                            {
                                     $(".divHotSpotDbl").addClass("hotspotclicked")

                            }
                            else if(pageData.ImageHotSpots.Hotspots[i].eventname != "noclick"){

                                $(".divHotSpot").addClass("hotspotclicked")
                            }     
                          }
                          else
                          {


                          }
                               //
                                 break;
                            
                        }
                       
                    }
                       
                    
                }
            }
           
            $(".divHotspotCommon").addClass("disabled");
           
            
            $("#linknext").k_enable();
            _Navigator.SetPageStatus(true);
            _Navigator.UpdateProgressBar();
        },
ApplycontainerWidth: function () {
    debugger;
    var innerWidth = $(window).width();

    $("#header-title img").attr("src", "assets/images/logo.png")

    if (innerWidth < 850) {
        if ($(".activityContainer").find(".activityimg").length > 0) {
            var marginleft = $(".intro-content:first").css("margin-left");
            marginleft = marginleft.substring(0, marginleft.indexOf("px"))

            var imgcntwidth = innerWidth - (marginleft * 2);
            $(".activity").css({ "width": imgcntwidth + "px" })
        }
        if (innerWidth <= 500) {
            $("#header-title img").attr("src", "assets/images/pearson-logo-v1.png")
        }
    }
    else {
        $(".activity").css({ "width": "auto" })
    }

},
OrientationChange: function () {

    this.ApplycontainerWidth();

},
HotspotClick: function (_hotspot, event) {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Hotspot click.")
            }
    if (_Navigator.IsAnswered())
        return;
    var action = _hotspot.attr("action")
    isCorrect = true;
  //  this.AddHotspotClick(_hotspot, event);
    var score = 0;
    var pageData = this.GetPageDetailData();
    if (pageData.ImageHotSpots != undefined) {
        for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
            if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                if (pageData.ImageHotSpots.Hotspots[i].isCorrect != undefined && pageData.ImageHotSpots.Hotspots[i].isCorrect != "") {
                    isCorrect = pageData.ImageHotSpots.Hotspots[i].isCorrect;
                }
            }
        }
    }
    _Navigator.SetPageScore(score)
    this.AddHotspotClick(_hotspot, event,isCorrect);
    switch (action) {
        case "next":
            _Navigator.SetPageStatus(true);
            this.HotspotNext();
            break;
        case "feedback":
            _Navigator.SetPageStatus(true);
            this.HotspotFeedback(_hotspot);
            break;
        case "checkinput":
            this.InputEnter($("input.EmbededElement"));
            break;
        case "redEye":
            if (isredEye1Clicked == true) {
                $("#divHotspots1_2").hide();
            } else {
                $("#divHotspots1_2").show();

            }
            if (isredEye2Clicked == true) {
                $("#divHotspots2_3").hide();
            } else {
                $("#divHotspots2_3").show();
                //$("#divHotspots0_3").focus();
            }
            $("#divHotspots0_1").hide();
            $("#divHotspots1_2").focus();
            break;
        case "redEye1":
            isredEye1Clicked = true;
            redEyeClickCount++;
            $(".Redeyeright").show();
            $("#divHotspots1_2").hide();
            $("#divHotspots2_3").hide();
            if (redEyeClickCount == 2) {
                _Navigator.SetPageStatus(true);
                this.HotspotNext();
            }
            else {
                      
                $("#divHotspots0_1").show();
                $("#divHotspots0_1").removeClass("hotspotclicked disabled")
                $("#divHotspots0_1").removeAttr("disabled")
                $("#divHotspots0_1").removeAttr("aria-disabled")
            }
            $("#divHotspots0_1").focus();
            break;
        case "redEye2":
            isredEye2Clicked = true;
            redEyeClickCount++;
            $(".Redeyeleft").show();
            $("#divHotspots1_2").hide();
            $("#divHotspots2_3").hide();
            if (redEyeClickCount == 2) {
                _Navigator.SetPageStatus(true);
                this.HotspotNext();
            }
            else {
                $("#divHotspots0_1").show();
                $("#divHotspots0_1").removeClass("hotspotclicked disabled");
                $("#divHotspots0_1").removeAttr("disabled")
                $("#divHotspots0_1").removeAttr("aria-disabled")
            }
            $("#divHotspots0_1").focus();
            break;
        case "cropPage":
          
            this.setCropPageData();
            $("#gridcontainer").show();
            
           // $("#gridcontainer").resizable({});
            $("#divHotspots0_1").hide();
            $("#cropSliderContainer").focus();
            break;
        case "videotrim":
           
            var videoSlideValue = Number($('.videoSliderValue').val());
            var sliderLength = parseInt(280 * videoSlideValue / 1195);

            if (videoSlideValue >= 595 && videoSlideValue <= 605) {
              this.AddSliderData(sliderLength, true);
              _Navigator.SetPageStatus(true);
              this.HotspotFeedback(_hotspot);
           }
            else {
                this.AddSliderData(sliderLength, false);
                $("#divHotspots0_1").hide();
                $("#divHotspots0_1").removeAttr("disabled")
                $("#divHotspots0_1").removeAttr("aria-disabled")
            }
            break;
        default:
            break;
    }
    
},
setCropPageData:function(){
    var cropSlidetStr = '<div id="cropSliderContainerResize"></div><div id="cropSliderContainer"><input class="cropSliderValue" id="cropSliderdouble" type="range" min="0" max="354" value="354" /></div>'
    $(".wrapperimage").find("#cropSliderContainer").remove();
    $(".wrapperimage").append(cropSlidetStr);
    if(iOS || isAndroid){

        var elm1 = document.getElementById('cropSliderdouble');
        var timeout;
        var lastTap = 0;
        // elm1.addEventListener('touchend', function (event) {
        //     var currentTime = new Date().getTime();
        //     var tapLength = currentTime - lastTap;
        //     clearTimeout(timeout);
        //     if (tapLength < 5000 && tapLength > 0) {
        //         var cropwidth = Number($('.cropSliderValue').val());
        //         if (cropwidth >= 235 && cropwidth <= 295) {
        //             //AddCropData(cropwidth, cropheight, true);
        //             _ModuleCommon.CropEnter();
        //         }
        //         else {
        //             //AddCropData(cropwidth, cropheight, false)
                    
        //             _ModuleCommon.AddCropData(cropwidth, cropheight, false);
        //         }
        //         event.preventDefault();
        //     } else {
        //         timeout = setTimeout(function () {
        //             clearTimeout(timeout);
        //         }, 500);
        //     }
        //     lastTap = currentTime;
        // });
    }
    
},
 setVideoPageData:function() {
   
  var videoSlidetStr = '<div id="videoSliderContainer"><input class="videoSliderValue" type="range" min="0" max="1195" value="0" /></div>'
    
    var str = "<div id='updateTimer' aria-hidden='true'><p>00:00:00</p></div>";
    $(".wrapperimage").find("#updateTimer").remove();
    $(".wrapperimage").find("#videoSliderContainer").remove();
    $(".wrapperimage").append(str);
    $(".wrapperimage").append(videoSlidetStr);
},
        
AddSliderData: function (slideValue, isCorrect) {
    debugger;
    var found = false;
    var pageReviewData;
    var currentPageData = _Navigator.GetCurrentPage();
 
    for (var r = 0; r < reviewData.length; r++) {
        if (reviewData[r].pageId == currentPageData.pageId) {
            var sameclick = false;
            if (reviewData[r].PositionsSlide != undefined) {
                for (var i = 0; i < reviewData[r].PositionsSlide.length; i++) {
                    if (reviewData[r].PositionsSlide[i].slideValue == slideValue) {
                        sameclick = true;
                    }
                }
                if (!sameclick) {
                    var position = { slideValue: slideValue, isCorrect: isCorrect };
                    if (reviewData[r].PositionsSlide.length < 2) {
                        reviewData[r].PositionsSlide.push(position);
                    }
                    else {
                        reviewData[r].PositionsSlide.splice(0, 1);
                        reviewData[r].PositionsSlide.push(position);
                    }
                }

            }
            else {
                var position = { slideValue: slideValue, isCorrect: isCorrect };
                reviewData[r].PositionsSlide = [position];
            }
            pageReviewData = reviewData[r];
            found = true;
        }
    }

    if (!found) {
        var _obj = {};
        _obj.pageId = gCurrPageObj.PageId;
        var position = { slideValue: slideValue, isCorrect: isCorrect };
        _obj.PositionsSlide = [position];
        pageReviewData = _obj;
        reviewData.push(_obj);
    }

   _Navigator.SetBookmarkData();
},
SetFeedbackTop: function () {
    var ptop = Number($("#div_feedback").position().top);
    var pheight = Number($("#div_feedback").outerHeight());
    var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
    if (pdiff > 0) {
        $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
    }
},
InputFeedback: function () {
    debugger;
    var pageData = this.GetPageDetailData();
    var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.EmbedSettings.feedbackurl;
    $("#div_feedback").show();
    $("#div_feedback").css("display", "inline-block");
    $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
        // this.SetFeedbackTop()
                $("#div_feedback p:first").attr("tabindex","-1")            
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () {                    
                    $("#div_feedback p:first").focus();
                });
            });
    $("input").k_disable();
    this.EnableNext();
},
HotspotFeedback: function (_hotspot) {
    debugger;
    var pageData = this.GetPageDetailData();
    var url = "";
    if (pageData.ImageHotSpots != undefined) {
        for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
            if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                url = pageData.ImageHotSpots.Hotspots[i].feedbackurl;
            }
        }
    }
    var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;
    $("#div_feedback").show();
    $("#div_feedback").css("display", "inline-block");
    $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
        // this.SetFeedbackTop()
                $("#div_feedback p:first").attr("tabindex","-1")            
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () {                  
                    $("#div_feedback p:first").focus();
                 });
            });
          //  $(".divHotSpot").k_disable();
    this.EnableNext();
},
HotspotNext: function () {
    _Navigator.Next();
},
InputNext: function () {
    _Navigator.Next();
},
InputEnter: function (inputtext) {
    if (_Navigator.IsAnswered())
        return;
    if ($.trim(inputtext.val()) != "") {
        var pageData = this.GetPageDetailData();

        var vtextarr = pageData.EmbedSettings.validatearray;
        var isVRequired = false;
        for (var i = 0; i < vtextarr.length; i++) {
            if (($.trim(vtextarr[i])).toLowerCase() == ($.trim(inputtext.val())).toLowerCase()) {
                isVRequired = true;
                break;
            }
            else {
                $(".divHotSpot").removeClass("hotspotclicked disabled")
                $(".divHotSpot").removeAttr("disabled")
                $(".divHotSpot").removeAttr("aria-disabled")
            }
        }

        var found = false;
        var str = $.trim(inputtext.val()).toLowerCase();
        var currentPageData = _Navigator.GetCurrentPage();

        if (reviewData != undefined && reviewData.length > 0) {
            for (var i = 0; i < reviewData.length; i++) {
                if (reviewData[i].pageId == currentPageData.pageId) {
                    if (reviewData[i].textEntry.length < 2) {
                        reviewData[i].textEntry.push(str);
                    } else {
                        reviewData[i].textEntry.splice(0, 1);
                        reviewData[i].textEntry.push(str);
                    }

                    found = true;
                }
            }
        }

        if (!found) {
            var _obj = {};
            _obj.pageId = currentPageData.pageId;
            _obj.textEntry = [str];
            _obj.isCorrect = true;
            reviewData.push(_obj);

        }

    }
    else {
        $(".divHotSpot").removeClass("hotspotclicked disabled")
        $(".divHotSpot").removeAttr("disabled")
        $(".divHotSpot").removeAttr("aria-disabled")
    }
    if (isVRequired) {
        var score = pageData.EmbedSettings.score;
        _Navigator.SetPageScore(score)
        var action = pageData.EmbedSettings.action;
        _Navigator.SetPageStatus(true);
        switch (action) {
            case "next":
                this.InputNext();
                break;
            case "feedback":
                this.InputFeedback();
                break;
            default:
                break;
        }
    }
},
CropEnter: function () {
    if (_Navigator.IsAnswered())
        return;
    var isVRequired = false;
    var cropwidth = Number($('.cropSliderValue').val());
    var cropheight = 242;
    if (cropwidth > 240 && cropwidth < 295) {
        this.AddCropData(cropwidth, cropheight, true);
        _Navigator.SetPageStatus(true);
          this.HotspotNext();
    }
    else
    {
        this.AddCropData(cropwidth, cropheight, false);
    }

   
    
},
AddCropData: function (cropwidth, cropheight, isCorrect) {
    var found = false;
    var pageReviewData;
   // var reviewData = ITSimModule.GetReviewData();
    var currentPageData = _Navigator.GetCurrentPage();
    for (var r = 0; r < reviewData.length; r++) {
        if (reviewData[r].pageId == currentPageData.pageId) {
            if (reviewData[r].PositionsCrop != undefined) {
                var sameclick = false;
                for (var i = 0; i < reviewData[r].PositionsCrop.length; i++) {
                    if (reviewData[r].PositionsCrop[i].width == cropwidth && reviewData[r].PositionsCrop[i].height == cropheight) {
                        sameclick = true;
                    }
                }
                if (!sameclick) {
                    var position = { width: cropwidth, height: cropheight, isCorrect: isCorrect };
                    if (reviewData[r].PositionsCrop.length < 2) {
                        reviewData[r].PositionsCrop.push(position);
                    }
                    else {
                        reviewData[r].PositionsCrop.splice(0, 1);
                        reviewData[r].PositionsCrop.push(position);
                    }
                }
            }
            else {
                var position = { width: cropwidth, height: cropheight, isCorrect: isCorrect };
                reviewData[r].PositionsCrop = [position];
            }
            pageReviewData = reviewData[r];
            found = true;
        }
    }

    if (!found) {
        var _obj = {};
        _obj.pageId = currentPageData.PageId;
        var position = { width: cropwidth, height: cropheight, isCorrect: isCorrect };
        _obj.PositionsCrop = [position];
        pageReviewData = _obj;
        reviewData.push(_obj);
    }





},
InputDND: function (imgObj,event) {
    var currentPageData = _Navigator.GetCurrentPage();
    var pageData = _PData[currentPageData.pageId];
    if (_Navigator.IsAnswered())
        return;
    var isVRequired = false;
    if ($(".dropped").length == 2)
        isVRequired = true;  
   
    var posX = parseInt(imgObj.css("left"), 10);
    var posY = parseInt(imgObj.css("top"), 10);
  
    posX = posX - 230;
    posY = posY - 50;
    if (event != undefined && event.pageX != undefined) {
        rposX = (event.pageX - posX);
        rposY = (event.pageY - posY);
    }
    var found = false;

    var currentPageData = _Navigator.GetCurrentPage();
    for (var r = 0; r < reviewData.length; r++) {
        if (reviewData[r].pageId == currentPageData.pageId) {
            var sameclick = false;
            var posindex = 0;
            if (reviewData[r].Positions != undefined) {
                var position = { posX: posX, posY: posY, isCorrect: true, src: imgObj.attr('src'), width: imgObj.css("width"), height: imgObj.css("height") };
                if (reviewData[r].Positions.length < 3) {
                    reviewData[r].Positions.push(position);
                }
            }
            else {
                
            }

            found = true;
        }
    }
    if (!found) {
        var _obj = {};
        _obj.pageId = currentPageData.pageId;
        var position = { posX: posX, posY: posY, isCorrect: true, src: imgObj.attr('src'), width: imgObj.css("width"), height: imgObj.css("height") };
        _obj.Positions = [position]
        reviewData.push(_obj);

    }
    if (isVRequired) {
        var score = pageData.EmbedSettings.score;
        _Navigator.SetPageScore(score)
        var action = pageData.EmbedSettings.action;
        _Navigator.SetPageStatus(true);
        switch (action) {
            case "next":
                this.InputNext();
                break;
            case "feedback":
                this.InputFeedback();
                break;
            default:
                break;
        }
    }
},
        AppendFooter: function () {
    if ($(".presentationModeFooter").length == 0) {
      //var str = '<div class="levelfooterdiv"><div class="navBtn prev" onClick="_Navigator.Prev()" role="button" tabindex = 195 aria-label="Previous"><a id="prev_arrow" href="#"></a></div><div style="display: inline-block;width: 2px;"></div><div class="boxleveldropdown" style="width: 150px;"  role="button" tabindex = 196 aria-label="Scorecard"><span class="leftarrow"></span><ul class="levelmenu"><li class="uparrow" style = "width: 100px; margin-left: -8px;"><span class="menutitle" >Scorecard</span><div class="levelsubMenu" tabindex = 197 role="text">Total Score - <br>Activity Score - </div><a class="menuArrow"></a></div><div style="display: inline-block;width: 2px;"></div><div class="navBtn next" onClick="_Navigator.Next()" role="button" tabindex = 198 aria-label="Next"><a id="next_arrow" href="#"></a></div></div>';
      var str = '<div class="presentationModeFooter">Presentation Mode</div>';
      $("footer").append($(str));
                $("footer").show().css("display", "inline");
      $("#linknext").k_enable();
  }
  else{

                $("footer").show().css("display", "inline");
            }
        },
        AppendCss: function () {
            if (isIE11version) {
                $(".hintDiv").css("margin-left", "383px")

            }
            if (isAndroid || iOS) {
                $("#footer-navigation ").css("display", "");

            }
        }
    }


})();




$(document).ready(function () {
    
    _Navigator.Initialize();
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});

