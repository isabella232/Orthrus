<?php get_template_part('templates/page', 'header'); ?>




<div id="work" class="container" >

<div style="margin-left:200px">
<?php
 //echo do_shortcode('[nggallery id=1 template=clientlp]');

 
 echo do_shortcode('[album id=1 template=listwork]');
?>
<div>
</div>



<div id="clientlp-listing" class="project-listing container" style="margin-top:200px;display:none;">

<?php 
 echo do_shortcode('[album id=2 template=gallery]');
?>
</div>



<div id="clientlp-content" class="project-content" style="display:none;">
<?php 
// echo do_shortcode('[nggallery id=1 template=clientlp]');
?>
</div>

