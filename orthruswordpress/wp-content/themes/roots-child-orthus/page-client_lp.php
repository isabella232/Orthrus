<?php //This template will be used if the page slug is "sample-page" ?>

<?php get_template_part('templates/page', 'header'); ?>


<?php
echo do_shortcode('[nggallery id=1]');
?>