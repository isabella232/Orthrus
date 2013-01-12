<?php //This template will be used if the page slug is "sample-page" ?>

<?php get_template_part('templates/page', 'header'); ?>



                  

              <!-- Root Navigation -->
		<nav class="expandable-nav" id="root-nav" style="margin-top: 0px;">
		<?php	echo do_shortcode('[album id=1 template=listwork]'); ?>
		</nav>
		
		<!-- Root Sub Navigation -->
		<nav id="root-sub-nav" style="">
			<a class="toggle" href="">hide gallery</a>
			<ul class="main">
				<li class="photography"><span>Works</span></li>
				
				<li class="contact"><span>Contact</span></li>
			</ul>
			<ul class="photography-menu" style="top: 355px;"></ul>
			
			<div class="infos-container">
				<a class="campaign" href="">campaign</a>
				<a class="infos" href="">i</a>
			</div>
		</nav>
		
		<!-- Navigation Arrows -->
		<div id="navigation-scroll-arrows"  style='position:fixed;bottom:10%;right:20px;display:block;z-index:1000;'>
                 <a href="">
                <img alt="" src="/wp-content/themes/roots-child-orthus/assets/img/arrows.png" />      </a>         
                </div>

                <div id="navigation-back-arrows"  style='position:fixed;top:10%;right:20px;display:block;z-index:1000;'>
                 <a href="">
                <img alt="" src="/wp-content/themes/roots-child-orthus/assets/img/back_btn-arrow.png" />    
                  </a>           
                </div>
		
  <div  id="navigation-scroll-gallery"  style='position:fixed;bottom:10%;left:20px;display:block;z-index:1000;'>
<ul style="top: 375px; display: block;" class="photography-menu"><li data-img-src-lowres="http://dev.orthrusstudio.com/wp-content/gallery/website/thumbs/thumbs_5-orthrus_cp.jpg" data-img-src="http://dev.orthrusstudio.com/wp-content/gallery/website/thumbs/thumbs_5-orthrus_cp.jpg" data-project-id="ngg-gallery-2"><a href="">ngg-gallery-2</a></li><li data-img-src-lowres="http://dev.orthrusstudio.com/wp-content/gallery/photography/thumbs/thumbs_6-orthrus_cp-2.jpg" data-img-src="http://dev.orthrusstudio.com/wp-content/gallery/photography/thumbs/thumbs_6-orthrus_cp-2.jpg" data-project-id="ngg-gallery-3"><a href="">ngg-gallery-3</a></li><li data-img-src-lowres="http://dev.orthrusstudio.com/wp-content/gallery/ad-campaign/thumbs/thumbs_2-orthrus_lp-rollovers.jpg" data-img-src="http://dev.orthrusstudio.com/wp-content/gallery/ad-campaign/thumbs/thumbs_2-orthrus_lp-rollovers.jpg" data-project-id="ngg-gallery-4" class="selected"><a href="">ngg-gallery-4</a></li><li data-img-src-lowres="http://dev.orthrusstudio.com/wp-content/gallery/social-media/thumbs/thumbs_6-orthrus_cp-3.jpg" data-img-src="http://dev.orthrusstudio.com/wp-content/gallery/social-media/thumbs/thumbs_6-orthrus_cp-3.jpg" data-project-id="ngg-gallery-5"><a href="">ngg-gallery-5</a></li><li data-img-src-lowres="http://dev.orthrusstudio.com/wp-content/gallery/event/thumbs/thumbs_6-orthrus_cp-3.jpg" data-img-src="http://dev.orthrusstudio.com/wp-content/gallery/event/thumbs/thumbs_6-orthrus_cp-3.jpg" data-project-id="ngg-gallery-6"><a href="">ngg-gallery-6</a></li></ul>
  <div>


		
		<!-- Photography Navigation -->
		<nav class="expandable-nav" id="photography-menu" style="margin-top: 0px;">
		<?php	echo do_shortcode('[album id=1 template=listwork]'); ?>
		</nav>
		
		<!-- Photography Navigation -->
		<nav class="projects-nav" id="photography-nav"><ul></ul></nav>
		<!-- Photography Listing -->
		<ul class="projects-listing" id="photography-listing" style="top: 0px;"></ul>
		<!-- Photography Content -->
		<ul class="projects-content" id="photography-content"></ul>
		
		
		
		
		
		<!-- Projects Informations -->
		<div id="overlay"></div>
		<div id="projects-infos" style="-moz-transform: scale(0.99); left: 477.5px; top: 500px;">
		</div>
		