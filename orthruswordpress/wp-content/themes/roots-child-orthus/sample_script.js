$(document).ready(function() {
	$('.hook').hide();
	
	$('.menu-showhide-hooks a').click(function(e) {
		$('.hook').toggle();
		$(this).popover('hide');
		e.preventDefault(); 
	});
	
	$('.menu-showhide-hooks a').popover({
		"title":"Important!",
		"content":"Click this to show indicators.",
		"placement":"right",
		"trigger":"manual"
	}).popover('show');
});



var admin_url = '/wp-admin/admin-';



var widthPercentage;

var animated = false;

var loadingT;

// Detect IE
var browserIE = false;

if(whichBrs() == 'Internet Explorer') browserIE = true;

// Detect Mobile
var browserMobile = false;

if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod'){
	browserMobile = true;
} 

// Get Hashtag on Document Load
if(window.location.hash == null || window.location.hash == '' || window.location.hash == '#') {
  window.location.hash = "#photography";
}
var hashParts = window.location.hash.replace('#','').split('-');

// Loading ID
var hashPartsProjectID = hashParts[2];

$(document).ready(function() 
{    
	/* ////////////////////////////////////////
	//
	// General
	//
	/////////////////////////////////////// */
	
	setTimeout(function(){
		setInterval(function(){
			var newHashParts = window.location.hash.replace('#','').split('-');
					
			if((newHashParts[0] != hashParts[0] || newHashParts[1] != hashParts[1] || newHashParts[2] != hashParts[2]) && !animated){
				animated = false;
			
				hashParts = window.location.hash.replace('#','').split('-');
				hashPartsProjectID = hashParts[2];
			
				hashChangeContent();
			}
		}, 500);
	}, 10000);
	
	// Navigaton Arrows
	setInterval(function(){
		$('#navigation-arrows > div').show();
		setTimeout(function(){
			$('#navigation-arrows > div').hide();
		}, 1200);
	}, 4800);
	
	// Logo
	$('#logo-staub').live('click', function(){
		if(!animated){
			animated = true;
			
			window.location.hash = '';
			hashParts = '';
			
			if($('body').hasClass('home')){
				if($('body').hasClass('contact')){
					$('body').removeClass('contact');
					positionContent();
					animated = false;
				} else {
					animated = false;
				}
			} else {
				$('body').attr('class','');
				changeContent();
				setTimeout(function(){
					$('body').addClass('home');
					changeContent();
				},450);
			}
		}
		
		return false;
	});
	
	if(browserIE){
		$('#loading').addClass('ie');
	} else {
		// Loading
		var square = new Sonic({
		    width: 50,
		    height: 50,
		 	fps: 50,
		 	trailLength: 0.5,
		    fillColor: '#fff',
		    path: [
		        ['line', 0, 0, 50, 0],
		        ['line', 50, 0, 50, 50],
		        ['line', 50, 50, 0, 50],
		        ['line', 0, 50, 0, 0]
		    ]
		});
	 
		square.play();
	 
		$('#loading > div').append(square.canvas);
	}
	
	/* ////////////////////////////////////////
	//
	// Navigation
	//
	/////////////////////////////////////// */
	
	// Root
	$('#root-nav > ul > li > div, #root-sub-nav .main span').live('click', function(){
		if(!animated){
			animated = true;
		
			window.location.hash = $(this).parent().attr('class').replace(' selected','').replace('-','');
			hashParts = window.location.hash.replace('#','').split('-');
			
			// Reset Page
			setTimeout(function(){
				// Photography
				
				$('#photography-content').empty();
				$('#photography-listing').empty().css('top','0');
				$('#photography-nav > ul').empty();
				$('#root-sub-nav .photography-menu, #root-sub-nav .archives-menu, #root-sub-nav .case-study-menu').empty();
				
				
			}, 450);
			
			$('#root-sub-nav .toggle').html('hide gallery');
			$('#root-sub-nav .infos').removeClass('active');
			$('#root-sub-nav .main li').removeClass('selected');
			
			// If : Homepage
			if($('body').hasClass('home')){
				if($('body').hasClass('contact')){
					if($(this).parent().hasClass('contact')){
						animated = false;
						//return false;
					} else {
						$('body').removeClass('home');
						changeContent();
						setTimeout(function(){
							$('body').removeClass('contact');
							$('#root-sub-nav .main .contact').removeClass('selected');
						},450);
						
					}
				} else {
					if($(this).parent().hasClass('contact')){
						$('body').addClass('contact');
						$('#root-sub-nav .main .contact').addClass('selected');
						positionContent();
						animated = false;
						return false;
					} else {
						$('body').attr('class','');
						changeContent();
					}
				}
			} else {
				$('body').attr('class','');
				changeContent();
			}
			
			// If : Photography
			// Else if : Motion Reel
			// Else if : Case Study
			// Else if : Archives
			// Else if : Contact
			if($(this).parent().hasClass('photography')){
				$('#root-sub-nav .main .photography').addClass('selected');
				setTimeout(function(){
					$('body').addClass('photography');
					changeContent();
				},450);
			} 
		}
	});
	
	// Toggle Menu
	$('#root-sub-nav .toggle').live('click', function(){
		$('body').toggleClass('menu');
		if($('body').hasClass('menu')){
			$(this).html('hide gallery');
		} else {
			$(this).html('show gallery');
		}
		changeContent();
		
		return false;
	});
	
	/* ////////////////////////////////////////
	//
	// Photography
	//
	/////////////////////////////////////// */
	
	// Menu
	$('#photography-menu > ul > li > div').live('click', function(){
		if($(this).parent().hasClass('not-clickable') || animated){
			// Do Nothing
		} else {
			animated = true;
			
			loadingT = setTimeout(function(){
		      	$('#loading').fadeIn(250);
		    },150);
			
			var category = $(this).parent().attr('data-category-id');
			var photo_id = $(this).children("input.menu-photo-id").val();
			
			if(photo_id == 'archive')
			{
				var meta = "&content_status=archive";
			} else {
				var meta = "&content_status=photography&category="+category+"&photo_id="+photo_id;
			}
			
			// Populate Content
			$.ajax({
				url: admin_url + "ajax.php",
				type: "GET",
				data: "p=ajax&action=retrieve_content" + meta,
				success: function(data){
					$('#photography-content').show();
					
					// Fill Photography Listing
					$('#photography-listing').html(data);
					
					// Fill Photography Listing Nav
					if($('#photography-listing > li li').length > 15)
					{
						$('#photography-listing > li').each(function(){
							if($(this).index() == 0){
								$('#photography-nav > ul').append('<li class="active"><a href="">'+($(this).index() + 1)+'</a></li>');
							} else {
								$('#photography-nav > ul').append('<li><a href="">'+($(this).index() + 1)+'</a></li>');
							}
						});
					}
					
					// Fill Photography Left Nav
					$('#photography-listing li li').each(function(){
						if($(this).attr('data-project-id') != undefined){
							$('#root-sub-nav .photography-menu').append('<li data-project-id="'+$(this).attr('data-project-id')+'" data-img-src="'+$(this).attr('data-img-src')+'" data-img-src-lowres="'+$(this).attr('data-img-src-lowres')+'"><a href="">'+$(this).attr('data-project-id')+'</a></li>');
						}
					});
					
					// Fill Photography Content
					$('#root-sub-nav .photography-menu li').each(function(){
						var current = $(this).index();
						var last = $('#root-sub-nav .photography-menu li').length;
																	
						if($(this).attr('data-project-id') != undefined){
							var content = '<li data-project-id="'+$(this).attr('data-project-id')+'" data-img-src="'+$(this).attr('data-img-src')+'" data-img-src-lowres="'+$(this).attr('data-img-src-lowres')+'"><div><img src="'+$(this).attr('data-img-src-lowres')+'" alt="" /></div></li>';
							$('#photography-content').append(content);
							
							if($('#photography-content li').length == last){
								var currentLi = 0;
								
								$('#photography-content li').each(function(){
									$('img',this).load(function(){
										$(this).parent().parent().attr('data-size', $(this).width()+'|'+$(this).height());
										
										currentLi ++;
										
										if(currentLi == last){
											if(hashPartsProjectID != undefined){
												// Hash
												window.location.hash = 'photography-'+category+'-'+hashPartsProjectID;
												hashParts = window.location.hash.replace('#','').split('-');
												
												$('body').attr('class','');
												changeContent();

												setTimeout(function(){
													$('#root-sub-nav .photography-menu li').each(function(){
														animated = false;

														if($(this).attr('data-project-id') == hashPartsProjectID){
															$('a',this).trigger('click');
															hashPartsProjectID = undefined;
														}
													});
												},450);
											} else {
												// Hash
												window.location.hash = 'photography-'+category;
												hashParts = window.location.hash.replace('#','').split('-');
												
												// Change Layout
												$('body').attr('class','');
												changeContent();
												setTimeout(function(){
													$('body').addClass('photography-listing menu');
													changeContent();

													clearTimeout(loadingT);
													$('#loading').fadeOut(250);
												},450);
											}
										}
									});
								});
							}
						}
					});
				}
			});
		}
		
		return false;
	});
	
	// Listing
	$('#photography-nav a').live('click', function(){
		var clicked = $(this).parent().index();
	
		$(this).parent().siblings('li').removeClass('active');
		$(this).parent().addClass('active');
	
		$('#photography-listing').animate({top: -($('#photography-listing > li').eq(clicked).position().top)}, 700, 'easeOutQuad');
		
		return false;
	});
	
	// Content
	$('#photography-listing li li a, #root-sub-nav .photography-menu li a').live('click', function(){
		if($(this).parent().hasClass('not-clickable')){
			// Do Nothing
		} else {
			if(!animated){
				animated = true;
				var projectID = $(this).parent().attr('data-project-id');
			
				modifyProjectContent('photography',projectID);
			}
		}
						
		return false;
	});
	

	/* ////////////////////////////////////////
	//
	// Informations
	//
	/////////////////////////////////////// */
	
	$('#root-sub-nav .infos').live('click', function(){
		if(!animated){
			animated = true;
			// if : close
			// else : open
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			
				$('#projects-infos').animate({opacity: 0}, 250, function(){
					$(this).hide();
					$('#overlay').animate({opacity: 0}, 450, function(){
						$(this).hide();
						animated = false;
					});
				});
			} else {
				$(this).addClass('active');

				if($('body').hasClass('photography-listing')){					
					var image_id = $('#root-sub-nav .photography-menu .selected').attr('data-project-id');
					var projectId = $('#project_id').val();
					var meta = "&p_id="+projectId+"&image_id="+image_id+"&content_type=photo&info_type=gallery";
					
				} else if($('body').hasClass('motion-reel-listing')){
					var projectId = $('#root-sub-nav .motion-reel-menu .selected').attr('data-project-id');
					var meta = "&p_id="+projectId+"&content_type=video";
				
				} else if($('body').hasClass('case-study-listing')){
					if($('body').hasClass('content')){
						// Photo
						var projectType = $('#case-study-listing li li.selected').attr('data-project-type');
					
						if(projectType == "photo")
						{
							var image_id = $('#root-sub-nav .case-study-menu .selected').attr('data-project-id');
							var projectId = $('#project_id').val();
							var contentType = "case";
							var infoType = "gallery";
						} else {
							var projectId = $('#root-sub-nav .case-study-menu .selected').attr('data-project-id');
							var contentType = "video";
						}			
					} else {
						// Category
						var projectId = $('#case-study-menu .selected').attr('data-category-id');
						var contentType = "case";
					}
					
					var meta = "&content_type="+contentType+"&p_id="+projectId+"&image_id="+image_id+"&info_type="+infoType;
					
				} else if($('body').hasClass('archives-listing')){
					if($('body').hasClass('content')){
						// Photo
						var projectType = $('#archives-listing li li.selected').attr('data-project-type');
					
						if(projectType == "photo")
						{
							var image_id = $('#root-sub-nav .archives-menu .selected').attr('data-project-id');
							var projectId = $('#project_id').val();
							var contentType = "archive";
							var infoType = "gallery";
						} else {
							var projectId = $('#root-sub-nav .archives-menu .selected').attr('data-project-id');
							var contentType = "video";
						}			
					} else {
						// Category
						var projectId = $('#archives-menu li li.selected').attr('data-category-id');
						var contentType = "archive";
					}				
					
					var meta = "&content_type="+contentType+"&p_id="+projectId+"&image_id="+image_id+"&info_type="+infoType;					
				}
								
				// Populate Content
				$.ajax({
					url: admin_url + "ajax.php",
					type: "GET",
					data: "p=ajax&a=retrieve_content&content_status=informations"+meta,
					success: function(data){
						$('#projects-infos').html(data);
	
						$('#overlay').show()
							.animate({opacity: 0.8},450, function(){
								$('#projects-infos').show();
								positionContent();
								$('#projects-infos').animate({opacity: 1}, 250, function(){
									animated = false;
								});
						});
					}
				});
			}
		}
		
		return false;
	});
	
	$('#overlay, #projects-infos').live('click', function(){
		$('#root-sub-nav .infos').trigger('click');
	});
	
	/* ////////////////////////////////////////
	//
	// Key Events
	//
	/////////////////////////////////////// */
	
	$(document).keydown(function(event){
		if(!animated){
			if($('body').hasClass('photography-listing') && $('body').hasClass('content')){
				var currentProject = $('#root-sub-nav .photography-menu .selected').index();
				var clickedProject;
			
				// Up	
				// Right
				// Down
				// Left
				if(event.keyCode == 38){
					animated = true;
					clickedProject = currentProject - 5;
					if(clickedProject < 0) clickedProject = currentProject;
				} else if(event.keyCode == 39){
					animated = true;
					clickedProject = currentProject + 1;
					if(clickedProject >= $('#root-sub-nav .photography-menu li').length) clickedProject = currentProject;
				} else if(event.keyCode == 40){
					animated = true;
					clickedProject = currentProject + 5;
					if(clickedProject >= $('#root-sub-nav .photography-menu li').length) clickedProject = currentProject;
				} else if(event.keyCode == 37){
					animated = true;
					clickedProject = currentProject - 1;
					if(clickedProject < 0) clickedProject = 0;
				}
				
				if(clickedProject != currentProject){
					modifyProjectContent('photography',$('#root-sub-nav .photography-menu li').eq(clickedProject).attr('data-project-id'));
				} else {
					animated = false;
				}
			} else if($('body').hasClass('motion-reel-listing') && $('body').hasClass('content')){
				var currentProject = $('#root-sub-nav .motion-reel-menu .selected').index();
				var clickedProject;
			
				// Up	
				// Right
				// Down
				// Left
				if(event.keyCode == 38){
					animated = true;
					clickedProject = currentProject - 3;
					if(clickedProject < 0) clickedProject = currentProject;
				} else if(event.keyCode == 39){
					animated = true;
					clickedProject = currentProject + 1;
					if(clickedProject >= $('#root-sub-nav .motion-reel-menu li').length) clickedProject = currentProject;
				} else if(event.keyCode == 40){
					animated = true;
					clickedProject = currentProject + 3;
					if(clickedProject >= $('#root-sub-nav .motion-reel-menu li').length) clickedProject = currentProject;
				} else if(event.keyCode == 37){
					animated = true;
					clickedProject = currentProject - 1;
					if(clickedProject < 0) clickedProject = 0;
				}
				
				if(clickedProject != currentProject){
					modifyProjectContent('motion-reel',$('#root-sub-nav .motion-reel-menu li').eq(clickedProject).attr('data-project-id'));
				} else {
					animated = false;
				}
			} else if($('body').hasClass('case-study-listing') && $('body').hasClass('content')){
				var currentProject = $('#root-sub-nav .case-study-menu .selected').index();
				var clickedProject;
			
				// Up	
				// Right
				// Down
				// Left
				if(event.keyCode == 38){
					animated = true;
					clickedProject = currentProject - 5;
					if(clickedProject < 0) clickedProject = currentProject;
				} else if(event.keyCode == 39){
					animated = true;
					clickedProject = currentProject + 1;
					if(clickedProject >= $('#root-sub-nav .case-study-menu li').length) clickedProject = currentProject;
				} else if(event.keyCode == 40){
					animated = true;
					clickedProject = currentProject + 5;
					if(clickedProject >= $('#root-sub-nav .case-study-menu li').length) clickedProject = currentProject;
				} else if(event.keyCode == 37){
					animated = true;
					clickedProject = currentProject - 1;
					if(clickedProject < 0) clickedProject = 0;
				}
				
				if(clickedProject != currentProject){
					modifyProjectContent('case-study',$('#root-sub-nav .case-study-menu li').eq(clickedProject).attr('data-project-id'));
				} else {
					animated = false;
				}
			} else if($('body').hasClass('archives-listing') && $('body').hasClass('content')){
				var currentProject = $('#root-sub-nav .archives-menu .selected').index();
				var clickedProject;
			
				// Up	
				// Right
				// Down
				// Left
				if(event.keyCode == 38){
					animated = true;
					clickedProject = currentProject - 5;
					if(clickedProject < 0) clickedProject = currentProject;
				} else if(event.keyCode == 39){
					animated = true;
					clickedProject = currentProject + 1;
					if(clickedProject >= $('#root-sub-nav .archives-menu li').length) clickedProject = currentProject;
				} else if(event.keyCode == 40){
					animated = true;
					clickedProject = currentProject + 5;
					if(clickedProject >= $('#root-sub-nav .archives-menu li').length) clickedProject = currentProject;
				} else if(event.keyCode == 37){
					animated = true;
					clickedProject = currentProject - 1;
					if(clickedProject < 0) clickedProject = 0;
				}
				
				if(clickedProject != currentProject){
					modifyProjectContent('archives',$('#root-sub-nav .archives-menu li').eq(clickedProject).attr('data-project-id'));
				} else {
					animated = false;
				}
			}
		}
	});
	
	/* ////////////////////////////////////////
	//
	// On Load
	//
	/////////////////////////////////////// */
	
	// Initiate Swipe
	if(browserMobile){
		$('.projects-content').swipe({ swipe:swipe, threshold: 10 } );
	}
	
	//Initiate Motion Reel Content
	// $('#motion-reel-listing li li').each(function(){
		// var content = '<li data-project-id="'+$(this).attr('data-project-id')+'" data-img-src-lowres="'+$(this).attr('data-img-src-lowres')+'" data-video-src="'+$(this).attr('data-video-src')+'" data-size="400|225"><div><img src="'+$(this).attr('data-img-src-lowres')+'" alt="" class="iframe" /></div></li>';
		// $('#motion-reel-content').show();
		// $('#motion-reel-content').append(content);
	// });
	
	// Initiate positionning
	positionContent();
	
	// Hash
	hashChangeContent();
	
	if(!browserIE){
		var expandableBorder;
		$('.expandable-nav > ul > li > div > .border').live('mouseenter', function(){
			if($('body').hasClass('contact') && $(this).parent().parent().hasClass('contact')){
				// Do Nothing
			} else {
				expandableBorder = [$(this).width(), $(this).height(), parseInt($(this).css('border-left-width'))];
			
				$(this)
					.css('width','110%')
					.css('height','110%')
					.css('left', -(((expandableBorder[0] * 1.1)/2 - expandableBorder[0]/2) + expandableBorder[2])+'px')
					.css('top', -(((expandableBorder[1] * 1.1)/2 - expandableBorder[1]/2) + expandableBorder[2])+'px');
			}
		}).live('mouseleave', function(){
			var borderRatio = expandableBorder[0]/expandableBorder[1];
		
			$(this)
				.css('width','100%')
				.css('height','100%')
				.css('left', -(expandableBorder[2])+'px')
				.css('top', -(expandableBorder[2])+'px');
		});
	}
});

/* ////////////////////////////////////////
//
// Window Functions
//
/////////////////////////////////////// */

$(window).resize(function(){
	positionContent();
});

$(window).load(function () {
	$('body').css('opacity','1');
	$('#fader').fadeOut(450);
	positionContent();
	
	if(browserMobile){
		setTimeout(function() { window.scrollTo(0, 1) }, 1000);	
	}
});

/* ////////////////////////////////////////
//
// Position General Content
//
/////////////////////////////////////// */

function positionContent(){
	var bg_main = $('#bg-main');
	var wrapper = $('#wrapper');
	var expandable_nav = $('.expandable-nav');
	var root_nav = $('#root-nav');
	var root_sub_nav = $('#root-sub-nav');
	var projects_listing = $('.projects-listing');
	var projects_nav = $('.projects-nav');
	var projects_content = $('.projects-content');
	var photography_listing = $('#photography-listing');
	var photography_nav = $('#photography-nav');
	var photography_content = $('#photography-content');
	
	var projects_infos = $('#projects-infos');
	var loading = $('#loading');
	
	var wrapperWidth = $(wrapper).width();
	var wrapperHeight = $(wrapper).height();
		
	/// Background Image 
	var bgMainRatio = 1280/720;
	var wrapperRatio = wrapperWidth/wrapperHeight;
	
	// Width Percentage
	widthPercentage = (wrapperWidth/1920).toFixed(2);
	if(widthPercentage >= 1) widthPercentage = 1;
	if(widthPercentage <= 0) widthPercentage = 0;
	
	// Background Main
	if(bgMainRatio > wrapperRatio){
		$(bg_main).width('auto')
			.height(wrapperHeight)
			.css('left',-($(bg_main).width()/2 - wrapperWidth/2)+'px')
			.css('top','0');
	} else {
		$(bg_main).width(wrapperWidth)
			.height('auto')
			.css('left','0')
			.css('top',-($(bg_main).height()/2 - wrapperHeight/2)+'px');
	} 
	
	// Loading
	$('> div',loading).css('left', ($(loading).width()/2 - $('> div',loading).width()/2)+'px')
		.css('top', ($(loading).height()/2 - $('> div',loading).height()/2)+'px');
	
	// Root Nav
	$('> ul > li > div > span:first-child',expandable_nav).each(function(){
		/*if(!browserIE){
			$(this).parent().css('transform','scale('+widthPercentage+')')
				.css('-moz-transform','scale('+widthPercentage+')')
				.css('-webkit-transform','scale('+widthPercentage+')');
		} else {*/
			$(this).parent().css('font-size', (parseInt($(this).parent().attr('data-font-size') * widthPercentage))+'px')
				.width(parseInt($(this).parent().css('max-width')) * widthPercentage)
			
			if(browserIE) $(this).parent().css('border', (widthPercentage * 10)+'px solid #fff');
			
			$(this).siblings('.border').css('border', (parseInt(widthPercentage * 10))+'px solid #fff')
				.css('left', -(parseInt(widthPercentage * 10))+'px')
				.css('top', -(parseInt(widthPercentage * 10))+'px');
		//}
		
		$(this).css('top',($(this).parent().height()/2 - $(this).height()/2 - ($('> span',this).eq(0).outerHeight() - $('> span',this).eq(1).outerHeight())/2)+'px');
	});
	if(wrapperHeight > $(expandable_nav).height()) $(expandable_nav).css('margin-top', (wrapperHeight/2 - $(expandable_nav).height()/2)+'px');
	else $(expandable_nav).css('margin-top', '0');
	
	if($('#root-nav > ul > li.contact > div > .content').height() < $('#root-nav > ul > li.contact > div').height()) $('#root-nav > ul > li.contact > div > .content').css('margin-top', ($('#root-nav > ul > li.contact > div').height()/2 - $('#root-nav > ul > li.contact > div > .content').height()/2)+'px')
	else $('#root-nav > ul > li.contact > div > .content').css('margin-top','0');
	
	// Root Sub Nav
	$(root_sub_nav).css('top',($(window).height()/2 - $(root_sub_nav).height()/2)+'px');
	$('.photography-menu',root_sub_nav).css('top',($(window).height()/2 - $('.photography-menu',root_sub_nav).height()/2)+'px');
	
	
	// Projects
	if($('body').hasClass('photography-listing')){
		// Listing
		$('li li a > span:first-child',photography_listing).each(function(){
			var initialWidth = parseInt($(this).parent().css('max-width'));
			var ratio = parseInt($(this).parent().css('max-width'))/parseInt($(this).parent().css('max-height'));
			
			$(this).parent().width(Math.ceil(initialWidth * widthPercentage))
				.css('border', (widthPercentage * 10)+'px solid #fff');
			$(this).parent().height(Math.ceil($(this).parent().width()/ratio));
			$(this).css('font-size', (widthPercentage * 20)+'px')
				.css('top',($(this).parent().height()/2 - $(this).height()/2)+'px');
		});
		
		$('> li',photography_listing).height($(wrapper).height());
		
		$('li ul',photography_listing).width($('li li',photography_listing).outerWidth() * 5 + 10)
			.css('padding-left', (wrapperWidth/2 - $('li ul',photography_listing).width()/2 + 5)+'px')
			.css('padding-top', (wrapperHeight/2 - $('li ul',photography_listing).height()/2)+'px');
		$(photography_listing).css('top',-($('> li',photography_listing).eq($('.active',photography_nav).index()).position().top)+'px');
		
		// Navigation
		$(photography_nav).css('top', ($(window).height()/2 - $(photography_nav).height()/2)+'px');
		
		// Content
		$(photography_content).width(wrapperWidth * 5);
		
		$('> li',photography_content).each(function(){
			$(this).width(wrapperWidth)
				.height(wrapperHeight);
				
			$('> div', this).height(wrapperHeight - 60);
			
			if($('img',this).get(0)){
				// Show Products List
				var dimensions = $(this).attr('data-size').split('|');

				var imageWidth = dimensions[0];
				var imageHeight = dimensions[1];

				// Calculate Ratios
				var wrapperRatio = $('> div',this).width()/$('> div',this).height();
				var imgRatio = imageWidth/imageHeight;
				
				// Adapt image size depending on window ratio
				if(imgRatio > wrapperRatio){
					$('img',this).width($('> div',this).width());
					$('img',this).height('auto');
				} else {
					$('img',this).width('auto');
					$('img',this).height($('> div',this).height());
				}

				$('img',this).css('left', ($('> div',this).width()/2 - $('img',this).width()/2 + 180)+'px')
					.css('top', ($('> div',this).height()/2 - $('img',this).height()/2 + 30)+'px');
			}
		});
		
		// Selected
		if($('> .loaded',photography_content).get(0)){
			$(photography_content).css('left', - $('> .loaded',photography_content).position().left+'px')
				.css('top', - $('> .loaded',photography_content).position().top+'px');
		}
	} 
	
	// Informations
	if(!browserIE){
		$(projects_infos).css('transform','scale('+widthPercentage+')')
			.css('-moz-transform','scale('+widthPercentage+')')
			.css('-webkit-transform','scale('+widthPercentage+')')
			.css('left',(wrapperWidth/2 - $(projects_infos).width()/2)+'px')
			.css('top',(wrapperHeight/2 - $(projects_infos).height()/2)+'px');
	} else {
		$(projects_infos).width(parseInt($(projects_infos).css('max-width')) * widthPercentage)
			.css('left',(wrapperWidth/2 - $(projects_infos).width()/2)+'px')
			.css('top',(wrapperHeight/2 - $(projects_infos).height()/2)+'px');
		$('> div',projects_infos).css('border', (10 * widthPercentage)+'px solid #fff')
			.css('font-size', (50 * widthPercentage)+'px');
	}
		
	$(wrapper).css('min-height', (1000 * widthPercentage)+'px');
}

/* ////////////////////////////////////////
//
// Change Content
//
/////////////////////////////////////// */

function changeContent(){	
	// Empty
	if($('body').attr('class') == '' || $('body').attr('class') == 'contact'){		
		// Fade Content
		$('.expandable-nav, .projects-listing, .projects-nav, .projects-content, #overlay, #projects-infos').animate({opacity: 0}, 450, function(){
			$(this).hide();
		});
		
		// Menu
		$('#root-sub-nav .toggle').css('left', '-140px');
		$('#root-sub-nav .infos, #root-sub-nav .campaign').animate({opacity: 0}, 450, function(){
			$(this).hide();
		});
		$('#root-sub-nav .photography-menu, #root-sub-nav .motion-reel-menu, #root-sub-nav .case-study-menu, #root-sub-nav .archives-menu').fadeOut(450);
		
		$('#navigation-arrows').animate({textIndent: -5000}, {duration: 450, step: function(){
			$('#root-sub-nav').css('top',($(window).height()/2 - $('#root-sub-nav').height()/2)+'px');
			$('#root-sub-nav .photography-menu').css('top',($(window).height()/2 - $('#root-sub-nav .photography-menu').height()/2)+'px');
			
		}});
	}
	// Home
	else if($('body').hasClass('home')) {
		$('#root-nav').show(function(){
			positionContent();
			$(this).animate({opacity: 1}, 450, function(){
				animated = false;
			});
		});
	}
	// Photography
	else if($('body').hasClass('photography')) {
		$('#photography-menu').show(function(){
			positionContent();
			$(this).animate({opacity: 1}, 450, function(){
				animated = false;
			});
		});
	}
	// Photography Listing
	else if($('body').hasClass('photography-listing')) {
		// Listing
		if($('body').hasClass('menu')){
			$('#root-sub-nav .photography-menu').fadeOut(450);
			
			$('#photography-listing, #photography-nav').show(function(){
				positionContent();
				$(this).animate({opacity: 1}, 450, function(){
					animated = false;
				});
			});
		} else {
			$('#photography-listing, #photography-nav').animate({opacity: 0}, 450, function(){
				$(this).hide();
				animated = false;
			});
			
			if($('body').hasClass('content')){
				// Menu
				$('#root-sub-nav .toggle').css('left','0');
				$('#root-sub-nav .infos.available, #root-sub-nav .campaign.available').css('display','block').delay(300).animate({opacity: 1},550);
				$('#root-sub-nav .photography-menu').delay(850).fadeIn(550);
				
				$('#navigation-arrows').animate({textIndent: -6000}, {duration: 1400, step: function(){
					$('#root-sub-nav').css('top',($(window).height()/2 - $('#root-sub-nav').height()/2)+'px');
					$('#root-sub-nav .photography-menu').css('top',($(window).height()/2 - $('#root-sub-nav .photography-menu').height()/2)+'px');
				}});
			}
		}
		
		// Content
		if($('body').hasClass('content')){
			$('#photography-content').show(function(){
				positionContent();
				$(this).animate({opacity: 1}, 450, function(){
					animated = false;
				});
			});
		} else {
			$('#photography-content').animate({opacity: 0}, 450, function(){
				$(this).hide();
				animated = false;
			});
		}
	}
	
}

/* ////////////////////////////////////////
//
// Modify Projects Contents
//
/////////////////////////////////////// */

function modifyProjectContent(projectType,projectID){
	var currentHash = window.location.hash.split('-');
	var projectID = projectID;
	
	// Main Infos
	if(projectType == 'photography'){
		var content = $('#photography-content');
		var listing = $('#photography-listing');
		var nav = $('#photography-nav');
		var menu = $('#root-sub-nav .photography-menu');
		
		// Info / Campaign
		$('li li',listing).each(function(){
			if($(this).attr('data-project-id') == projectID){
				if($('.campaign-link',this).val() == ''){
					$('#root-sub-nav .campaign')
						.removeClass('available')
						.attr('href','')
						.animate({opacity: 0}, 450, function(){
							$(this).hide();
						});
				} else {
					$('#root-sub-nav .campaign')
						.addClass('available')
						.attr('href',$('.campaign-link',this).val())
						.show(function(){
							$(this).animate({opacity: 1}, 450);
						});
				}
				
				if($('.description',this).val() == ''){
					$('#root-sub-nav .infos')
						.removeClass('available')
						.animate({opacity: 0}, 450, function(){
							$(this).hide();
						});
				} else {
					$('#root-sub-nav .infos')
						.addClass('available')
						.show(function(){
							$(this).animate({opacity: 1}, 450);
						});
				}
			}
		});
		
		// Hash
		window.location.hash = 'photography-'+currentHash[1]+'-'+projectID;
		hashParts = window.location.hash.replace('#','').split('-');
	} 
	
	$(content).show();
	
	// Selected Content Position
	var positionLeft;
	var positionRight;
	var currentPositionLeft = parseInt($(content).css('left'));
	var currentPositionTop = parseInt($(content).css('top'));

	
	// General
	$('li li',listing).removeClass('selected');
	$('li',menu).removeClass('selected');
	
	// Menu
	$('li',menu).each(function(){
		if($(this).attr('data-project-id') == projectID){
			$(this).addClass('selected');
		}
	});
	
	// Listing
	$('li li',listing).each(function(){
		if($(this).attr('data-project-id') == projectID){
			$(this).addClass('selected');
		}
	});
	
	$('li',nav).eq($('li .selected',listing).parent().parent().index()).children('a').trigger('click');
	
	var bodyContent = false;
	var loadingDelay = 2000;
	var loadingTimerDelay = 1
	if($('body').hasClass('content')){
		bodyContent = true;
		loadingDelay = 1;
		loadingTimerDelay = 150;
	}
		
	// Content
	$('> li',content).each(function(){
		var clickedIndex = $(this).index();
		
		if($(this).attr('data-project-id') == projectID){
			
			if(projectType == 'photography'){
				loadingT = setTimeout(function(){
			      	$('#loading').fadeIn(250);
			      	if(!bodyContent) $('#loading p').show();
			    },loadingTimerDelay);
				
				var currentLoaded = -1;
				
				if($('> .loaded',content).get(0)){
					currentLoaded = $('> .loaded',content).index();
				}
				
				$('> div',this).html('<img src="'+$(this).attr('data-img-src')+'" alt="" />');
				$('img',this).load(function(){
					var thisImage = $(this);
					
					clearTimeout(loadingT);
					setTimeout(function(){
						$('#loading').fadeOut(250, function(){
							$('p', this).hide();
							
							$(thisImage).parent().parent().addClass('loaded');
							$(thisImage).parent().parent().attr('data-size',$(thisImage).width()+'|'+$(thisImage).height());
							
							var wrapperRatio = $(thisImage).parent().width()/$(thisImage).parent().height();
							var imgRatio = $(thisImage).width()/$(thisImage).height();
		
							// Adapt image size depending on window ratio
							if(imgRatio > wrapperRatio){
								$(thisImage).width($(thisImage).parent().width());
								$(thisImage).height('auto');
							} else {
								$(thisImage).width('auto');
								$(thisImage).height($(thisImage).parent().height());
							}
		
							$(thisImage).css('left', ($(thisImage).parent().width()/2 - $(thisImage).width()/2 + 180)+'px')
								.css('top', ($(thisImage).parent().height()/2 - $(thisImage).height()/2 + 30)+'px');
							
							positionLeft = $(thisImage).parent().parent().position().left * -1;
							positionTop = $(thisImage).parent().parent().position().top * -1;
												
							var deplacementX = (Math.abs(currentPositionLeft - positionLeft) / $(thisImage).parent().parent().width()) * 700;
							var deplacementY = (Math.abs(currentPositionTop - positionTop) / $(thisImage).parent().parent().height()) * 700;
							
							if(currentLoaded != -1){
								setTimeout(function(){
									$('> li',content).eq(currentLoaded).removeClass('loaded');
									$('> li',content).eq(currentLoaded).children('div').html('<img src="'+$('> li',content).eq(currentLoaded).attr('data-img-src-lowres')+'" alt="" />');
									
									$('> li',content).eq(currentLoaded).children('div').children('img').load(function(){
										$(this).parent().parent().attr('data-size',$(this).width()+'|'+$(this).height());
		
										var wrapperRatio = $(this).parent().width()/$(this).parent().height();
										var imgRatio = $(this).width()/$(this).height();
										
										// Adapt image size depending on window ratio
										if(imgRatio > wrapperRatio){
											$(this).width($(this).parent().width());
											$(this).height('auto');
										} else {
											$(this).width('auto');
											$(this).height($(this).parent().height());
										}
										
										$(this).css('left', ($(this).parent().width()/2 - $(this).width()/2 + 180)+'px')
											.css('top', ($(this).parent().height()/2 - $(this).height()/2 + 30)+'px');
									});
								},(deplacementX + deplacementY));
							}
		
							// If : Content already visible
							// Else : If Content hidden
							if($('body').hasClass('content')){
								if(currentPositionLeft == positionLeft){
									$(content).animate({top: positionTop}, deplacementY, 'easeOutQuad', function(){
										animated = false;
									});
								} else if(currentPositionTop == positionTop){
									$(content).animate({left: positionLeft}, deplacementX, 'easeOutQuad', function(){
										animated = false;
									});
								} else {
									$(content).animate({left: positionLeft}, deplacementX, 'easeOutQuad');
									$(content).animate({top: positionTop}, deplacementY, 'easeOutQuad', function(){
										animated = false;
									});
								}
							} else {
								$('body').attr('class',projectType+'-listing content');
								changeContent();
								$('#root-sub-nav .toggle').html('show gallery');
														
								animated = false;
							}
						});
					}, loadingDelay);
				});
			} 
		}
	});
}

/* ////////////////////////////////////////
//
// Hash Change Content
//
/////////////////////////////////////// */

function hashChangeContent(){
	// Reset Page
	
	// Photography
	$('#case-study-menu > ul > li, #archives-menu li li').removeClass('selected');
	$('#photography-content, #archives-content, #case-study-content').empty();
	$('#photography-listing, #archives-listing, #case-study-listing').empty().css('top','0');
	$('#photography-nav > ul, #archives-listing-nav > ul, #case-study-nav > ul').empty();
	$('#root-sub-nav .photography-menu, #root-sub-nav .archives-menu, #root-sub-nav .case-study-menu').empty();
	
	
	
	if(window.location.hash != ''){
		// Photography
		if(hashParts[0] == 'photography'){
			$('#root-sub-nav .main .photography').addClass('selected');
			
			// Category Clicked
			if(hashParts[1] != undefined){
				$('.expandable-nav, .projects-listing, .projects-nav, .projects-content, #overlay, #projects-infos').css('opacity','0').hide();
				
				$('#photography-menu > ul > li').each(function(){
					if($(this).attr('data-category-id') == hashParts[1]){
						$('> div',this).trigger('click');
					}
				});
			} else {
				$('.expandable-nav, .projects-listing, .projects-nav, .projects-content, #overlay, #projects-infos').css('opacity','0').hide();
				$('body').attr('class','photography');
				changeContent();
			}
		}
		
	} else {
		if($('body').hasClass('home')){
			// Do Nothing
		} else {
			window.location.hash = '#';
			hashParts = window.location.hash.replace('#','').split('-');
			
			$('.expandable-nav, .projects-listing, .projects-nav, .projects-content, #overlay, #projects-infos').css('opacity','0').hide();
			$('body').attr('class','home');
			changeContent();
		}
	}
}

/* ////////////////////////////////////////
//
// Swipe
//
/////////////////////////////////////// */

function swipe(event, direction){
	if(!animated){
		animated = true;
		if($('body').hasClass('photography-listing') && $('body').hasClass('content')){
			var currentProject = $('#root-sub-nav .photography-menu .selected').index();
			var clickedProject;
		
			// Up	
			// Right
			// Down
			// Left
			if(direction == 'down'){
				clickedProject = currentProject - 5;
				if(clickedProject < 0) clickedProject = currentProject;
			} else if(direction == 'left'){
				clickedProject = currentProject + 1;
				if(clickedProject >= $('#root-sub-nav .photography-menu li').length) clickedProject = currentProject;
			} else if(direction == 'up'){
				clickedProject = currentProject + 5;
				if(clickedProject >= $('#root-sub-nav .photography-menu li').length) clickedProject = currentProject;
			} else {
				clickedProject = currentProject - 1;
				if(clickedProject < 0) clickedProject = 0;
			}
			
			if(clickedProject != currentProject){
				modifyProjectContent('photography',$('#root-sub-nav .photography-menu li').eq(clickedProject).attr('data-project-id'));
			} else {
				animated = false;
			}
		} else if($('body').hasClass('motion-reel-listing') && $('body').hasClass('content')){
			var currentProject = $('#root-sub-nav .motion-reel-menu .selected').index();
			var clickedProject;
		
			// Up	
			// Right
			// Down
			// Left
			if(direction == 'down'){
				clickedProject = currentProject - 3;
				if(clickedProject < 0) clickedProject = currentProject;
			} else if(direction == 'left'){
				clickedProject = currentProject + 1;
				if(clickedProject >= $('#root-sub-nav .motion-reel-menu li').length) clickedProject = currentProject;
			} else if(direction == 'up'){
				clickedProject = currentProject + 3;
				if(clickedProject >= $('#root-sub-nav .motion-reel-menu li').length) clickedProject = currentProject;
			} else {
				clickedProject = currentProject - 1;
				if(clickedProject < 0) clickedProject = 0;
			}
			
			if(clickedProject != currentProject){
				modifyProjectContent('motion-reel',$('#root-sub-nav .motion-reel-menu li').eq(clickedProject).attr('data-project-id'));
			} else {
				animated = false;
			}
		} else if($('body').hasClass('case-study-listing') && $('body').hasClass('content')){
			var currentProject = $('#root-sub-nav .case-study-menu .selected').index();
			var clickedProject;

			// Up	
			// Right
			// Down
			// Left
			if(direction == 'down'){
				clickedProject = currentProject - 5;
				if(clickedProject < 0) clickedProject = currentProject;
			} else if(direction == 'left'){
				clickedProject = currentProject + 1;
				if(clickedProject >= $('#root-sub-nav .case-study-menu li').length) clickedProject = currentProject;
			} else if(direction == 'up'){
				clickedProject = currentProject + 5;
				if(clickedProject >= $('#root-sub-nav .case-study-menu li').length) clickedProject = currentProject;
			} else {
				clickedProject = currentProject - 1;
				if(clickedProject < 0) clickedProject = 0;
			}

			if(clickedProject != currentProject){
				modifyProjectContent('case-study',$('#root-sub-nav .case-study-menu li').eq(clickedProject).attr('data-project-id'));
			} else {
				animated = false;
			}
		} else if($('body').hasClass('archives-listing') && $('body').hasClass('content')){
			var currentProject = $('#root-sub-nav .archives-menu .selected').index();
			var clickedProject;

			// Up	
			// Right
			// Down
			// Left
			if(direction == 'down'){
				clickedProject = currentProject - 5;
				if(clickedProject < 0) clickedProject = currentProject;
			} else if(direction == 'left'){
				clickedProject = currentProject + 1;
				if(clickedProject >= $('#root-sub-nav .archives-menu li').length) clickedProject = currentProject;
			} else if(direction == 'up'){
				clickedProject = currentProject + 5;
				if(clickedProject >= $('#root-sub-nav .archives-menu li').length) clickedProject = currentProject;
			} else {
				clickedProject = currentProject - 1;
				if(clickedProject < 0) clickedProject = 0;
			}

			if(clickedProject != currentProject){
				modifyProjectContent('archives',$('#root-sub-nav .archives-menu li').eq(clickedProject).attr('data-project-id'));
			} else {
				animated = false;
			}
		}
	}
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Get Browser
//
/////////////////////////////////////////////////////////////////////////// */

function whichBrs() {
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf('\/') != -1) {
		if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
			return navigator.userAgent.substr(0,agt.indexOf('\/'));
		} else return 'Netscape';
	} else if (agt.indexOf(' ') != -1)
		return navigator.userAgent.substr(0,agt.indexOf(' '));
	else return navigator.userAgent;
}