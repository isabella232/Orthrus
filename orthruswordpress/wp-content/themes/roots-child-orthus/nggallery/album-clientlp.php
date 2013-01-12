<?php 
/**
Template Page for the album overview

Follow variables are useable :

	$album     	 : Contain information about the album
	$galleries   : Contain all galleries inside this album
	$pagination  : Contain the pagination content

 You can check the content when you insert the tag <?php var_dump($variable) ?>
 If you would like to show the timestamp of the image ,you can use <?php echo $exif['created_timestamp'] ?>
**/
?>
<?php if (!defined ('ABSPATH')) die ('No direct access allowed'); ?><?php if (!empty ($galleries)) : ?>

<div class="">		

	<!-- List of galleries -->
        <ul style="list-style-type: none;">
	<?php foreach ($galleries as $gallery) : ?>	
				
		<?php if ($gallery->counter > 0) : ?>
                <li class="" style="display:inline;">
               <h4><span class="ngg-album-desc" title="<?php echo $gallery->title ?>" data-href="<?php echo $gallery->pagelink ?>" ><?php echo $gallery->title ?></span></h4>
		<p style="display:none;visibility:hidden;"><strong><?php echo $gallery->counter ?></strong> <?php _e('Photos', 'nggallery') ?></p>
                </li>
		<?php endif; ?>
	

 	<?php endforeach; ?>
 	</ul>
	

</div>

<?php endif; ?>