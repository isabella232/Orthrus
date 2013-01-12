<?php 
/**
Template Page for the album overview (extended)

Follow variables are useable :

	$album     	 : Contain information about the album
	$galleries   : Contain all galleries inside this album
	$pagination  : Contain the pagination content

 You can check the content when you insert the tag <?php var_dump($variable) ?>
 If you would like to show the timestamp of the image ,you can use <?php echo $exif['created_timestamp'] ?>
**/
?>





<?php if (!defined ('ABSPATH')) die ('No direct access allowed'); ?><?php if (!empty ($galleries)) : ?>



			<ul class=''>


	<!-- List of galleries -->
	<?php foreach ($galleries as $gallery) : ?>

	
				<li class="photography">
					<div data-font-size="32" style="font-size: 31px; width: 336.6px;">
						<h1 style="font-size:32;font-weigth:bold;text-transform:uppercase;"><?php echo $gallery->title ?></h1>
						<br/>
						<?php	
                                 $parts = parse_url($gallery->pagelink);

   				  $query_string = $parts['query'];

				  parse_str($query_string, $output);

      		                  //var_dump($output['album']);
                                 
                                 echo do_shortcode("[album id=".$output['album']." template=clientlp]");  
                            ?>

                                <input type="hidden" value="<?php  echo $output['album']  ?>" class="menu-photo-id">
					</div>
				</li>
				
		


 	<?php endforeach; ?>
 	


	</ul>
		  



<?php endif; ?>