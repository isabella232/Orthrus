<?php get_template_part('templates/head'); ?>

<body class="photography menu" style="opacity: 1;">	

  <!--[if lt IE 7]><div class="alert">Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</div><![endif]-->

  <?php
    // Use Bootstrap's navbar if enabled in config.php
    //if (current_theme_supports('bootstrap-top-navbar')) {
    //  get_template_part('templates/header-top-navbar');
   // } else {
	
		//if (is_page_template('page-work.php')) {
	//		get_template_part('templates/header-work');
	//	} else if (is_page_template('page-portifolio.php')) {
//			get_template_part('templates/header-portifolio');
//		} else {
//			get_template_part('templates/header');
//		}
        
  //  }
  ?>



<div id="wrapper" style="">
		<!-- Main Background 1280x720 -->
		  <img alt="" src="http://dev.orthrusstudio.com/wp-content/themes/roots-child-orthus/assets/img/background/BG-Image.jpg" id="bg-main" style="" />
		
		<!-- Staub Logo -->
		<a id="logo-staub" href="">Orthrus</a>


                           

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
		<div id="navigation-arrows"><div style="display: none;"></div></div>
		
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
		
		
		
	</div>

<div id="loading" style="display: none;"><div style="left: 925px; top: 327.5px;"><p>use your arrow keys <br>to navigate</p><canvas class="sonic" height="60" width="60"></canvas></div></div>
		
	
	
</body>
</html>
