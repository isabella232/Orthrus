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




	<ul>
		
	<?php foreach ($galleries as $gallery) : ?>
        
         <?php if (!empty ($gallery->previewurl)) : ?>
		



<li class="menu_ngg-gallery-<?php echo $gallery->gid ?>" data-category-id="ngg-gallery-<?php echo $gallery->gid ?>">
					<div style="font-size: 31px; width: 198px;" data-font-size="32">
						<span style="top: 88.5px;">
                                               <span style=""><span></span>Orthrus presents </span>
                                                <?php echo $gallery->title ?><span style=""></span>
                                               </span>
						<img src="http://www.olivierstaub.com/app/assets/images/layout/ratio_photography.gif" alt="">
						<div style="border: 9px solid rgb(255, 255, 255); left: -9px; top: -9px;" class="border"><span>(COUNT)</span></div>
						<input type="hidden" class="menu-photo-id" value="<?php echo $gallery->gid ?>">
					</div>
				</li>


	

	<?php endif; ?>

 	<?php endforeach; ?>
 	
	
 	



</ul>



<?php endif; ?>