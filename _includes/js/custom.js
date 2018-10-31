function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        // if cookie exists
        if (offset != -1) { 
            offset += search.length
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // set index of end of cookie value
            if (end == -1) end = document.cookie.length;
            returnvalue=unescape(document.cookie.substring(offset, end))
        }
    }
    return returnvalue;
}
function set_cookie(what){
    document.cookie="splashshown="+what
}
function iOSversion(useragent) {
  if (/iP(hone|od|ad|od Touch)/.test(useragent)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
  return false;
}
$(window).on('orientationchange', function(e) {
	window.location.reload();
});

$(window).resize(function(){

});

$( document ).ready(function() {
	if($(window).height()<500) {
		$('body').addClass('low_height');
	}

	var useragent = navigator.userAgent;
	//check for old stock Android browser
	//to remove position fixed and background attachment fixed
	if(	(useragent.indexOf("Mozilla/5.0") > -1) &&
		(useragent.indexOf("Android") > -1) &&
		(useragent.indexOf("Chrome") == -1)
	) {
		$('body').addClass('old_Android');
	}

	//check for Android
	//to remove animation
	if(useragent.indexOf("Android") > -1) $('body').addClass('Android');

	//check for old iOS version 
	//to remove position fixed
	var iOS_version = iOSversion(useragent);
	if(iOS_version[0]<5) $('body').addClass('old_iOS');
	if(iOS_version[0]>6) $('body').addClass('new_iOS');

	//check for iOS 
	//to remove background attachment fixed and animation
	var iOS = /(iPad|iPhone|iPod)/g.test(useragent);
	if(iOS) $('body').addClass('iOS');

	//detect browser with Touch Events running on touch-capable device
	if ('ontouchstart' in window) {
	     $('body').addClass('touch');
	}

	//show splash if modern device/browser
	if(!$('body').hasClass('old_Android') && !$('body').hasClass('old_iOS')) {
		if (get_cookie("splashshown")=="") $('#splash').show();
	}
	$('#nonsplash').show();
	set_cookie('true');

    if(window.location.hash) {
    	var hash = window.location.hash.substring(1);
    	if(hash) {
	    	var offset = $('#'+hash).offset();
	    	var scrollto = (offset.top-$( ".navbar-default" ).height()-53); 
			setTimeout(function() {
				window.scrollTo(0, scrollto);
			}, 1);
		}
    }
    $( window ).scroll(function() {

      if($('body').hasClass('old_Android') && $('body').hasClass('old_iOS')) {
			$( ".navbar-default" ).removeClass('attop');
	  }

	  if($(window).scrollTop()) $( ".arrow" ).hide(  );
	  else if(!$('body').hasClass('touch')) $( ".arrow" ).show( );
	});
	
	//make anchor tags scroll
	$('.navbar a').click(function(){
		if($('body').hasClass('home') && $(this).attr('href')) {
			el = $.attr(this, 'href').replace('/','');
		    $('html, body').animate({
		        scrollTop: ($( el ).offset().top - 100)
		    }, 500);
		    if($('.navmenu.offcanvas').hasClass('in')) $('.navbar-toggle').click();
		    return false;
		}
		else if (!$('body').hasClass('home')) {
			if($(this).attr('href').charAt(0)!='/' && $(this).attr('href').charAt(0)=='#') $(this).attr('href', '/'+$(this).attr('href'));
		}
	});

	
	$('#splash').click(function() {
		$(this).hide();
	})
	if($('body').hasClass('Android') || $('body').hasClass('iOS')) {
		//no animation
		$('#splash').delay(1500).hide();
		$('#review').css('visibility','visible'); 
	}
	else {
		//animation
		$('#splash').delay(1500).fadeOut();
	    $('#review').css('left', '-'+$('#review').width()+'px');
    	$('#review').css('visibility','visible'); 
		$('#review').animate({"left": '+='+$('#review').width()},1500);
	}
	
	$('#popup').delay(3000).slideToggle();

	$('#closepopup').click(function(event) {
		$('#popup').slideToggle();
		event.preventDefault();
		event.stopPropagation();
	})

	$("#contact_form input[type='submit']").click(function(event) {
        $('#contact_form [required]').each(function() {
        	if(!$(this).val()) {
        		$(this).addClass('error');
        		event.preventDefault();
        	}
        }); 
	});
	$("#contact_form .form-control").click(function(event) {
        if($(this).hasClass('error')) $(this).removeClass('error');
	});
	
    /* SCROLLSPY NAVBAR */
    $('#navbar').on('activate.bs.scrollspy', function (e) {
        $pageTitle = $(e.target).children("a").text();
        $pagehref = $(e.target).children("a").attr('href').replace("#","").replace("/","");
        if( $("#header").attr('class') != $pagehref){
            $('.navbar li a').blur();
            $("#header").removeClass().addClass($pagehref);
        }
        function delayupdate(){
            history.pushState({}, $pageTitle , '#'+$pagehref)
        };
        setTimeout(delayupdate,500)
	});
	
    $(window).resize();
});

function toggledescription(el, num) {
	$(".bigplant").css('background-image', $(el).css('background-image'));
	$('#descriptions .description').hide();
	$('#descriptions .description:nth-child('+num+')').show();
	$('#variantname').html($(el).attr('title'));
}