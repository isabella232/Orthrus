<?php



add_action('init', 'rsc_init');
function rsc_init() {
  //remove_theme_support('bootstrap-top-navbar');
}

add_action('wp_enqueue_scripts', 'rsc_enqueue_scripts');
function rsc_enqueue_scripts() {
  wp_enqueue_script('jquery');
  
  if(is_page('sample-page')) {
	wp_enqueue_script('rsc_sample_script', get_stylesheet_directory_uri() . '/sample_script.js', array('jquery'));
	wp_enqueue_style('rsc_sample_style', get_stylesheet_directory_uri() . '/sample_style.css', false); 
  } else {
	wp_enqueue_script('rsc_script', get_stylesheet_directory_uri() . '/script.js', array('jquery'));
  }  }
add_action('wp_ajax_retrieve_content', 'orthus_retrieve_content_photography');
add_action('wp_ajax_nopriv_retrieve_content', 'orthus_retrieve_content_photography');
add_action('wp_ajax_retrieve_json', 'orthus_retrieve_json');add_action('wp_ajax_nopriv_retrieve_json', 'orthus_retrieve_json');
function orthus_retrieve_content_photography() {    		$albumid = $_GET["album_id"] ?: $_GET["project_id"] ?: $_GET["photo_id"];          $album_template = $_GET["template"] ?: "gallery";    echo  $albumid;    echo  $album_template;    echo '[album id='.$albumid.' template='.$album_template.']';    echo do_shortcode('[album id='.$albumid.' template='.$album_template.']');    die(); // this is required to return a proper result
}function orthus_retrieve_json() {      require_once (dirname (__FILE__) . '/customjson.php');   die();}add_action('wp_ajax_retrieve_json2', 'orthus_retrieve_json');add_action('wp_ajax_nopriv_retrieve_json2', 'orthus_retrieve_json');
?>