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



<li>
	<ul>
		<!-- Display image gallery -->
											





	<!-- List of galleries -->
	<?php foreach ($galleries as $gallery) : ?>
        
         <?php if (!empty ($gallery->previewurl)) : ?>
		
<li data-project-type="photo" class="photography" data-project-id="ngg-gallery-<?php echo $gallery->gid ?>" data-img-src="<?php echo $gallery->previewurl ?>" data-img-src-lowres="<?php echo $gallery->previewurl ?>">
					<a href="">
						<span><?php echo $gallery->title ?>
							<span><?php echo $gallery->title ?></span>
						</span>
						<div></div>
						<img src="<?php echo $gallery->previewurl ?>" alt="" />
						<input type="hidden" class="campaign-link" value=""/>
						<input type="hidden" class="description" value=""/>
					</a>
				</li>

	

	<?php endif; ?>

 	<?php endforeach; ?>
 	
	
 	


<!-- END Display image gallery -->
</ul>
</li>

<input type="hidden" value="<?php echo $album->id?>" id="project_id">

<?php endif; ?>