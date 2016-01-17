$(document).ready(function() {
		
	var w = $(window).width();
	//alert(w);
	if(w<=760) {
	  //mobile subnav  click function
	  $('.subNav').hide();
	  $('.navigation ul li.subNavLink').click(function(){
		  $(this).find('.subNav').show().parent().siblings().find('.subNav').hide();	
	  })
	  
	  $('.valText').each(function(){
	  	$(this).attr('placeholder','(0 - 30000 AED)');
	  })
	  
	  $('.valText').click(function(){
	  	$(this).attr('placeholder','');
	  })
	}
	
	//More Toggling Menu in Mobile
    $('.mobileLink').click(function(){
		$('.navigation > ul').slideToggle();
	});
	
	//Credit card text Roatator function
	 setupRotator();
	 
	 //Custom checkbox
	 inputt()
	 
	//Tabs
    $(".tabContent").hide();
    $(".tabContent:first").show();
    $(".tabContainer li:first").addClass("tabSelected");

    $(".tabContainer li").click(function () {
        var id = this.id;
        $("#" + id).addClass("tabSelected").siblings(".tabContainer li").removeClass("tabSelected");
        $("#" + id + "Content").show().siblings(".tabContent").hide();
    });
	
    //Query string for tabs
	 var pathname, pathVar, pathVarParm, pathVarLoanType;
	 pathname = window.location.href;
	 if(window.location.href.indexOf("?") > -1) {
	 	 pathVar = pathname.split('?')[1];
		 pathVarParm = pathVar.substr(0, 1);
	     pathVarLoanType = pathname.split('#')[1];
		 
	if(pathVarParm == '1')
	{
		setTimeout(function(){$(".tabContainer li").eq(1).click();},300)
	}
	if(pathVarLoanType == 'Personal')
	{
	   setTimeout(function(){$('select.loanType option:eq(1)').attr('selected', true);},300)
	}
	if(pathVarLoanType == 'Car')
	{
	   setTimeout(function(){$('select.loanType option:eq(2)').attr('selected', true);},300)
	}
	if(pathVarLoanType == 'Credit')
	{
	   setTimeout(function(){$('select.loanType option:eq(3)').attr('selected', true);},300)
	}
  }

    $('.inputRadioWrap input').click(function () {
        var txt = $(this).attr('class');
        if (txt == 'yes') {
            $(this).parents('.tabContent').find('.adcbID').show();
        }
        else if (txt == 'no') {
            $(this).parents('.tabContent').find('.adcbID').hide();
        }

    });

    //Accordian
    $(".faqAccordian h3").click(function () {
        var $this = $(this);
        $(this).addClass('faqactive').siblings().removeClass('faqactive');
        $(this).next('.faqAccordianContent').slideDown().siblings('.faqAccordianContent').slideUp();
        setTimeout(function () {
            var thistop = $this.offset().top;
            $('body, html').animate({ 'scrollTop': thistop - 110 }, 600);
        }, 400);
    });

    $('.expandLink').click(function () {
        $(this).css('font-weight', 'bold');
        $('.collapseLink').css('font-weight', 'normal');
        var $this = $(this);
        $(".faqAccordian h3").addClass('faqactive');
        $(".faqAccordian .faqAccordianContent").show();
        setTimeout(function () {
            var thistop = $this.offset().top;
            $('body, html').animate({ 'scrollTop': thistop - 110 }, 600);
        }, 400);
    });

    $('.collapseLink').click(function () {
        $(this).css('font-weight', 'bold');
        $('.expandLink').css('font-weight', 'normal');
        var $this = $(this);
        $(".faqAccordian h3").removeClass('faqactive');
        $(".faqAccordian .faqAccordianContent").hide();
        setTimeout(function () {
            var thistop = $this.offset().top;
            $('body, html').animate({ 'scrollTop': thistop - 110 }, 600);
        }, 400);
    });

	//Rating
    $('.rating li a').hover(function () {
        $(this).parent().prevAll().andSelf().addClass('active');
    }, function () {
        $('.rating li a').parent().removeClass('active');
    })

    $('.rating li a').click(function () {
		if($(this).hasClass('starActive')){
			$('.rating li a').parent().removeClass('selected');
      		$(this).parent().prevAll().andSelf().addClass('selected');
			$(this).parents('.rating li').siblings().find('a').removeClass('starActive');
		}
	  })
	  
	  //Select code
/*		$("select").each(function(){
			$(this).children("option").each(function(){
				if($(this).attr("selected"))
				{
					$(this).parent().find(".selectedvalue").html($(this).html());	
				}
			});
		});*/
		$("select").change(function(){
			$(this).prev().html($(this).val());									
		});
		
		//Allow only alphabets
		 $('.ec-screen2 .rTextbox').keyup(function() {
				if (this.value.match(/[^a-zA-Z]/g)) {
				this.value = this.value.replace(/[^a-zA-Z]/g,"");
				}
		});

		
		$('.numericOnly').keypress(function(event){
		var charCode = event.which;
		if(charCode > 47 && charCode < 58 || charCode == 0 || charCode == 8){
			return true;	
		}else{
			return false;	
		}
		});
		
		////Allow only number
//		$('.numericOnly').keydown(function (e) {
//			// Allow: backspace, delete, tab, escape, enter and .
//		//	if (e.which < 48 || e.which > 57) {
////				return(false);
////			}
//			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//				 // Allow: Ctrl+A
//				(e.keyCode == 65 && e.ctrlKey === true) || 
//				 // Allow: home, end, left, right
//				(e.keyCode >= 35 && e.keyCode <= 39)) {
//					 // let it happen, don't do anything
//					 return;
//			}
//			// Ensure that it is a number and stop the keypress
//			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//				e.preventDefault();
//			}
//		});
//		
//		$(".numericOnly").bind("paste",function(e) {  
//		   e.preventDefault();  
//		});

/*Special Offers*/


$('.offerListRight a').click(function(){
	$(this).parents('.offerListItem').find('.offerDetailpopup').show();
	$('.overlay').show();
	var centerDiv = $(this).parents('.offerListItem').find('.offerDetailpopup');
	var height = $(window).height();
	var width = $(document).width();
	var top =  (height - centerDiv.height()) / 2;
	centerDiv.css({'top' : top });
});

$('.offerDetailpopup .closeBtn,.overlay').click(function(){
	$('.offerDetailpopup').hide();
	$('.overlay').hide();
});

$(".offersContent #productOwlCarousel .item").click(function(){
		var itemID=$.trim($(this).attr('id'));
		$(this).addClass('active').parent('.owl-item').siblings().find('.item').removeClass('active');
		$(".detailContentainer .offerList").hide()
		$(".detailContentainer ."+itemID).show();
	}).eq(0).click();

/*Special Offers*/
	  
});


 
/* Credit Card - Text Rotator */
function setupRotator()
 {
     if($('.textItem').length > 1)
     {
         $('.textItem:first').addClass('current').fadeIn(500);
         setInterval('textRotate()', 4000);
     }
 }
     function textRotate()
     {
         var current = $('.textBanner > .current');
         if(current.next().length == 0)
         {
             current.removeClass('current').fadeOut(500);
             $('.textItem:first').addClass('current').fadeIn(500);
         }
         else
         {
             current.removeClass('current').fadeOut(500);
             current.next().addClass('current').fadeIn(500);
         }
}

/* Custom Radio Button & Checkbox */
function inputt(){
	
	if($('input').prev('span').length==0)
	{
		$("<span class='uncheked'></span>").insertBefore('input:radio, input:checkbox');
	}
	$('input:checkbox').click(function(){
		var Check = $(this).is(':checked');
		if(Check){
			$(this).prev('span').addClass('cheked').removeClass('uncheked');
		}else{		
			$(this).prev('span').addClass('uncheked').removeClass('cheked');
		}
	});	
	
	$('input:radio').click(function(){
		var Check = $(this).is(':checked');
		if(Check){
			$(this).prev('span').addClass('cheked').removeClass('uncheked').siblings('span').addClass('uncheked').removeClass('cheked');
		}
	});
}


function articleslhs(){
	$(".tabContent").show();
	$(".contentBox").hide()
	
	
	$(".articlesContent .lhs li").click(function () {
        var $this = $(this);
        $(this).addClass('lhsactive').siblings().removeClass('lhsactive');
		//alert($(this).next('.lhsDiv').html());
        $('.lhsDiv').slideDown().siblings('.lhsDiv').slideUp();
    }).eq(0).click();
	
	$(".articlesContent #productOwlCarousel .item").click(function(){
		$(".lhsContent, .contentBox").hide();
		$(".lhsContent."+$(this).attr('id')).show();
		//alert($(".lhsContent."+$(this).attr('id')).text());
		$(".contentBox."+$(this).attr('id')+"_"+$(".lhsactive").find('.lhsheading').text()).eq(0).show();
		$(this).addClass('active').parent('.owl-item').siblings().find('.item').removeClass('active');
	}).eq(0).click();
	
	$(".lhsContent a").click(function(){
		var className=$(this).attr('class').split('-')
		$(".contentBox").hide()
		$(".contentBox."+className[0]).eq(className[1]-1).show();
	})
}


function testimonials(){
	$(".quotes").hover(function(){
		$(this).find("p").stop().animate({bottom: "0"})	
	}, function(){
		$(this).find("p").stop().animate({bottom: "-57px"})
	});
	
	/*PopUp for Video*/
	$(".videoContainer").find("iframe").remove()
	$(".vedio").click(function(){
		$(".videoContainer").find("iframe").remove()
		var videoUrl= $(this).find("img").attr("name")
		var iframe='<iframe width="100%" frameborder="0" allowtransparency="yes" src="'+videoUrl+'"></iframe>';
		$(".videoContainer").find('.popUpImg').before(iframe)
		$(".popUp, .overlay").show();	
		$(".popUpImg, .popupForAudio").hide();
		$(".popUpImg").hide();
	})
	
	/*PopUp for image*/
	$(".quotes").click(function(){
		var ImgCont = $(this).find(".hiddenContent").html();
		var popImg= $(this).find("img").attr("src").split(".jpg")[0]+"-big.jpg"
		$(".popUp").find(".popUpImg").attr("src", popImg)
		$(".popUp").find(".descrip").html(ImgCont);
		$(".popUp, .overlay").show();	
		$("iframe, .popupForAudio").hide();
		$(".popUpImg").show();
	});

	/*PopUp for Audio*/
	$(".audio").click(function(){
		var ImgCont = $(this).find(".hiddenContent").html();
		var popImg= $(this).find("img").attr("src").split(".jpg")[0]+"-big.jpg"
		$(".popUp").find(".audioPopUpImg").attr("src", popImg)
		$(".popUp, .overlay").show();	
		$("iframe, .popUpImg").hide();
		
		$(".popupForAudio").show();
		$(".popUp").find(".popupForAudio .audioplayer #englishAudio1 source").eq(0).attr('src',$(this).find("img").attr("audiorel")+'.wav');
		$(".popUp").find(".popupForAudio .audioplayer #englishAudio1 source").eq(1).attr('src',$(this).find("img").attr("audiorel")+'.mp3');
		$(".popUp").find(".popupForAudio .audioplayer #englishAudio1 source").eq(2).attr('src',$(this).find("img").attr("audiorel")+'.ogg');
		$(".popUp").find(".popupForAudio .audioplayer #englishAudio1 source").eq(3).attr('src',$(this).find("img").attr("audiorel")+'.amr');
		$(".videoContainer").addClass('padding11')
	});
		
	$(".element").click(function(){
		$(".popUp").css('left',($(window).width() - $(".popUp").width())/2);
		$(".popUp").css('top',$(this).offset().top-($(".popUp").height() / 2));
	})

	$(".closeBtn").click(function(){
		$(".popUp, .overlay").hide();
		$(".videoContainer").find("iframe").remove()
		$(".videoContainer").removeClass('padding11')
		$(".popUp").find(".popupForAudio .audioplayer #englishAudio1 source").attr('src','');
	});
	
	$('audio').audioPlayer(
	{
		classPrefix: 'audioplayer',
		strPlay: 'Play',
		strPause: 'Pause',
		strVolume: 'Volume'
	});
	
	$('audio,video').bind('play', function() {
		activated = this;
		$('audio,video').each(function() {
		if(this != activated) this.pause();
		this.currentTime= 0;
		});
	});
	
	//Stop audi on tab click
	function stopAll() {
     $('.testimonialsPage audio').each(function() {
		if(this.currentTime!= 0.0) {
			this.pause();
		}
	});
    }
	
	$(".radioBannerCarousel .tabContainer li, .radioBannerCarousel .owl-buttons div").click(function () {
		stopAll();
		$('.radioBannerCarousel audio').each(function() {
			this.currentTime = 0.0
		});
		$('.radioBannerCarousel audio').parent().addClass('audioplayer-stopped').removeClass('audioplayer-playing');
    });
}