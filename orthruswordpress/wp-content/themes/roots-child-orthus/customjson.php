<?php
/**
* REST Application Programming Interface PHP class for the WordPress plugin NextGEN Gallery
* Should emulate some kind of Flickr JSON callback : ?callback=json&format=json&api_key=1234567890&method=search&term=myterm
* 
* @version      1.1.0
* @author Alex Rabe 
* 
* @require		PHP 5.2.0 or higher
* 
*/

class nggAPI {

	/**
	  *	$_GET Variables 
	  * Note that Spine.Ajax expects array values to be returned
	  * @since 1.5.0
	  * @access private
	  * @var string
	  */
    var $format		=	false;		// $_GET['format'] 	: Return a XML oder JSON output
	var $api_key	=	false;		// $_GET['api_key']	: Protect the access via a random key (required if user is not logged into backend)
	var $method		=	false;		// $_GET['method']	: search | gallery | image | album | tag | autocomplete
	var $term		=	false;		// $_GET['term']   	: The search term (required for method search | tag)
	var $id			=	false;		// $_GET['id']	  	: object id (required for method gallery | image | album )
	var $limit		=	false;		// $_GET['limit']	: maximum of images which we request
    var $type		=	false;		// $_GET['type']	: gallery | image | album (required for method autocomplete)
    
	/**
	 * Contain the final output
	 *
	 * @since 1.5.0
	 * @access private
	 * @var string
	 */	
	var $output		=	'';

	/**
	 * Holds the requested information as array
	 *
	 * @since 1.5.0
	 * @access private
	 * @var array
	 */	
	var $result		=	'';
	
	/**
	 * Init the variables
	 * 
	 */	
	function __construct() {
		
        if ( !defined('ABSPATH') )
            die('You are not allowed to call this page directly.');

		if ( !function_exists('json_encode') )
			wp_die('Json_encode not available. You need to use PHP 5.2');
		
		// Read the parameter on init
		$this->format 	= isset($_GET['format']) ? strtolower( $_GET['format'] ) : false;
		$this->api_key 	= isset($_GET['api_key'])? $_GET['api_key'] : false; 
		$this->method 	= isset($_GET['method']) ? strtolower( $_GET['method'] ) : false; 
		$this->term		= isset($_GET['term'])   ? urldecode( $_GET['term'] ) : false; 

		$this->albumid 		= isset($_GET['albumid'])     ? (int) $_GET['albumid'] : 0;
        $this->id 		= isset($_GET['id'])     ? (int) $_GET['id'] : $this->albumid;
        
		$this->limit 	= isset($_GET['limit'])  ? (int) $_GET['limit'] : 0;
        $this->type		= isset($_GET['type'])   ? strtolower( $_GET['type'] ) : false; 		
		$this->result	= array();
        $this->list     = false;
		
		$this->start_process();
		$this->render_output();
	}

	function start_process() {
	   
        global $ngg;
		
		if ( !$this->valid_access() ) 
			return;
		
		switch ( $this->method ) {
			case 'search' :
				//search for some images
				$this->result['images'] = array_merge( (array) nggdb::search_for_images( $this->term ), (array) nggTags::find_images_for_tags( $this->term , 'ASC' ));
			break;
			case 'album' :
				//search for some album  //TODO : Get images for each gallery, could end in a big db query
				$this->result['album'] = nggdb::find_album( $this->id );
			break; 
            case 'albums' :				
				//$this->result['albums'] = $this->find_all_album();
				$temp_album_list = array_values($this->find_all_album());
				foreach($temp_album_list as $alb) {
				
				  $categories = array();
				  $asubtitle = '';
				  foreach($alb->galleries as $gid) {
				     $gcat = nggcf_get_gallery_field($gid,'ProjectCategory');
					 if(!empty($gcat)) {
					   $categories[] = $gcat;
					 }
					  if(empty($asubtitle)) {
                       $asubtitle = nggcf_get_gallery_field($gid,'albumsubtitle') ?: '';
                      }
				  }				  
				$alb->categories =  array_unique($categories);
				$alb->asubtitle =   $asubtitle;
				
				$img = $this->find_image($alb->previewpic);
				$alb->previewimage = $img;
				
				}
                $this->result = $temp_album_list;
			break; 
			
			case 'albumdetail' :
				//search for some album  //TODO : Get images for each gallery, could end in a big db query
				$temp_album = nggdb::find_album( $this->id );
				
				$temp_images =  $this->find_images_in_album($temp_album);
				$parsed_gallery_ids = array();
				$mygalleries = array();
				
				if(!empty($temp_album->previewpic)) {
				  $pimg = $this->find_image($temp_album->previewpic);
				  $temp_album->previewimage = $pimg;
				}
				
				foreach ($temp_images as $gallery) {
				    if(!in_array($gallery->galleryid,$parsed_gallery_ids)) {
					    array_push($parsed_gallery_ids,$gallery->galleryid);
						$mygalleries[$gallery->galleryid] = $gallery;
            $mygalleries[$gallery->galleryid]->ProjectType = nggcf_get_gallery_field($gallery->galleryid,'ProjectType');
            $mygalleries[$gallery->galleryid]->ProjectColor = nggcf_get_gallery_field($gallery->galleryid,'ProjectColor');
			$mygalleries[$gallery->galleryid]->ProjectCategory = nggcf_get_gallery_field($gallery->galleryid,'ProjectCategory');
            $albumsubtitle = nggcf_get_gallery_field($gallery->galleryid,'albumsubtitle');
            if(!empty($albumsubtitle)) {
              if( empty($temp_album->albumsubtitle) ) {
                $temp_album->albumsubtitle = $albumsubtitle;
              }
            }
					}
					
					 $img = new stdClass();
					 $img->pid = $gallery->pid;
					 $img->imageURL = $gallery->imageURL;
					 $img->thumbURL = $gallery->thumbURL;
					 $img->imagePath = $gallery->imagePath;
					 $img->thumbPath = $gallery->thumbPath;
					 $img->href = $gallery->href;
					 $img->galleryid = $gallery->galleryid;					 
					 $img->filename = $gallery->filename;
					 $img->description = $gallery->description;
					 $img->altext = $gallery->alttext;
					 $img->imagedate = $gallery->imagedate;
					 $img->exclude = $gallery->exclude;
					 $img->imageSlug = $gallery->image_slug;
					 $img->author = $gallery->author;
					 $img->gid = $gallery->gid;
					 
					 $mygalleries[$gallery->galleryid]->images[] = $img;
				}	
				
        if( empty($temp_album->albumsubtitle) ) {
          $temp_album->albumsubtitle = "";
        }
              
				$temp_album->galleries = array_values($mygalleries);
				// $this->result['album'] = $temp_album;
                                 
                $this->result[] = $temp_album;
			break;   			
			case 'gallery' :
				//search for some gallery
				$this->result['images'] = ($this->id == 0) ? nggdb::find_last_images( 0 , 100 ) : nggdb::get_gallery( $this->id, $ngg->options['galSort'], $ngg->options['galSortDir'], true, 0, 0, true );
			break;
			case 'image' :
				//search for some image
				$this->result['images'] = nggdb::find_image( $this->id );
			break;
			case 'tag' :
				//search for images based on tags
				$this->result['images'] = nggTags::find_images_for_tags( $this->term , 'ASC' );
			break;
			case 'recent' :
				//search for images based on tags
				$this->result['images'] = nggdb::find_last_images( 0 , $this->limit );
			break;
			case 'autocomplete' :
				//return images, galleries or albums for autocomplete drop down list
				return $this->autocomplete();                
			break;
			case 'version' :
				$this->result = array ('stat' => 'ok', 'version' => $ngg->version);
				return;           
			break;
			default :
				$this->result = array ('stat' => 'fail', 'code' => '98', 'message' => 'Method not known.');
				return false;	
			break;		
		}

		// result should be fine	
		// $this->result['stat'] = 'ok';	 
        // TODO: Use proper   http code here
	}
	
	function valid_access() {
		
		// if we are logged in, then we can go on
		if ( is_user_logged_in() )
			return true;
		
		//TODO:Implement an API KEY check later
		if 	($this->api_key != false)
			return true;
		
		$this->result = array ('stat' => 'fail', 'code' => '99', 'message' => 'Insufficient permissions. Method requires read privileges; none granted.');
		return false;
	}

	/**
	 * return search result for autocomplete request from backend
	 * 
     * @since 1.7.0
	 * @return void
	 */
	function autocomplete() {
        global $nggdb;
        
        switch ( $this->type ) {
			case 'image' :
            
                // return the last entries in case of an empty search string
                if ( empty($this->term) )
				    $list = $nggdb->find_last_images(0, $this->limit, false);
                else
                    $list = $nggdb->search_for_images($this->term, $this->limit);
                    
                if( is_array($list) ) {
        			foreach($list as $image) {
                        // reorder result to array-object
                        $obj = new stdClass();
                        $obj->id = $image->pid;
                        $name = ( empty($image->alttext) ? $image->filename : $image->alttext );
                        //TODO : need to rework save/load 
                        $name = stripslashes( htmlspecialchars_decode($name, ENT_QUOTES));
                        $obj->label = $image->pid . ' - ' . $name;
                        $obj->value = $name;
                        $this->result[] = $obj;
        			}
        		}

                return $this->result;
            break;
			case 'gallery' :
            
                if ( empty($this->term) )
                    $list = $nggdb->find_all_galleries('gid', 'DESC', false, $this->limit );
                else
                    $list = $nggdb->search_for_galleries($this->term, $this->limit);   
                     
                if( is_array($list) ) {
        			foreach($list as $gallery) {
                        // reorder result to array-object
                        $obj = new stdClass();
                        $obj->id = $gallery->gid;
                        $name = ( empty($gallery->title) ) ? $gallery->name : $gallery->title;
                        $name = stripslashes( htmlspecialchars_decode($name, ENT_QUOTES));
                        $obj->label = $gallery->gid . ' - ' . $name;
                        $obj->value = $name;
                        $this->result[] = $obj;
        			}
        		}
                return $this->result;
            break;
			case 'album' :
            
                if ( empty($this->term) )
                    $list = $nggdb->find_all_album('id', 'DESC', $this->limit );
                else
                    $list = $nggdb->search_for_albums($this->term, $this->limit); 
                                    
                if( is_array($list) ) {
        			foreach($list as $album) {
                        // reorder result to array-object            			 
                        $obj = new stdClass();
                        $obj->id = $album->id;
                        $album->name = stripslashes( htmlspecialchars_decode($album->name, ENT_QUOTES));
                        $obj->label = $album->id . ' - ' . $album->name;
                        $obj->value = $album->name;
                        $this->result[] = $obj;
        			}
        		}
                return $this->result;
            break;
			default :
				$this->result = array ('stat' => 'fail', 'code' => '98', 'message' => 'Type not known.');
				return false;	
			break;	
        }
    }

    /**
     * Iterates through a multidimensional array
     * 
     * @author Boris Glumpler
     * @param array $arr
     * @return void
     */
    function create_xml_array( &$arr )
    {
        $xml = '';
        
        if( is_object( $arr ) )
            $arr = get_object_vars( $arr );

        foreach( (array)$arr as $k => $v ) {
            if( is_object( $v ) )
                $v = get_object_vars( $v );
            //nodes must contain letters   
            if( is_numeric( $k ) )
                $k = 'id-'.$k;                
            if( is_array( $v ) )
                $xml .= "<$k>\n". $this->create_xml_array( $v ). "</$k>\n";
            else
                $xml .= "<$k>$v</$k>\n";
        }
        
        return $xml;
    }
	
	function render_output() {
		header("Access-Control-Allow-Origin: *"); 		header("Access-Control-Allow-Methods: GET"); 		header("Access-Control-Allow-Headers: Origin,Accept,Content-Type,X-Requested-With,X-CSRF-Token"); 		//headers["Access-Control-Allow-Headers"] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
		if ($this->format == 'json') {
			header('Content-Type: application/json; charset=' . get_option('blog_charset'), true);
			$this->output = json_encode($this->result);
		} else {
			header('Content-Type: text/xml; charset=' . get_option('blog_charset'), true);
			$this->output  = "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>\n";
			$this->output .= "<nextgen-gallery>" . $this->create_xml_array( $this->result )  . "</nextgen-gallery>\n";
		}	
		
	}
	
	
	
	/**
     * Get all the images from a given album
     * 
     * @param object|int $album The album object or the id  
     * @param string $order_by
     * @param string $order_dir
     * @param bool $exclude
     * @return An array containing the nggImage objects representing the images in the album.
     */
    function find_images_in_album($album, $order_by = 'galleryid', $order_dir = 'DESC', $exclude = true) {        
        global $wpdb;
        
        if ( !is_object($album) )
            $album = nggdb::find_album( $album );

        // Get gallery list      
        $gallery_list = implode(',', $album->gallery_ids);       
        // Check for the exclude setting
        $exclude_clause = ($exclude) ? ' AND tt.exclude<>1 ' : '';

        // Say no to any other value
        $order_dir = ( $order_dir == 'ASC') ? 'ASC' : 'DESC';      
        $order_by  = ( empty($order_by) ) ? 'galleryid' : $order_by;
        
        $result = $wpdb->get_results("SELECT t.*, tt.* FROM $wpdb->nggallery AS t INNER JOIN $wpdb->nggpictures AS tt ON t.gid = tt.galleryid WHERE tt.galleryid IN ($gallery_list) $exclude_clause ORDER BY tt.$order_by $order_dir");      
        // Return the object from the query result
        if ($result) {
            foreach ($result as $image) {
                $nimg = new nggImage( $image );
                // $nimg->ProjectType = $nimg->ngg_custom_fields;
                $images[] = $nimg;
            }
            return $images;
			//return $result;
        } 

        return null;     
    }

	/**
     * Get all the album and unserialize the content
     * 
     * @since 1.3.0
     * @param string $order_by
     * @param string $order_dir
     * @param int $limit number of albums, 0 shows all albums
     * @param int $start the start index for paged albums
     * @return array $album
     */
    function find_all_album( $order_by = 'id', $order_dir = 'DESC', $limit = 0, $start = 0) {    
        global $wpdb; 
        
        $order_dir = ( $order_dir == 'ASC') ? 'ASC' : 'DESC';
        $limit_by  = ( $limit > 0 ) ? 'LIMIT ' . intval($start) . ',' . intval($limit) : '';
        $this->albums = $wpdb->get_results("SELECT * FROM $wpdb->nggalbum ORDER BY {$order_by} {$order_dir} {$limit_by}" , OBJECT_K );
        
        if ( !$this->albums )
            return array();
        
        foreach ($this->albums as $key => $value) {
            $this->albums[$key]->galleries = empty ($this->albums[$key]->sortorder) ? array() : (array) unserialize($this->albums[$key]->sortorder)  ;
            $this->albums[$key]->name = stripslashes( $this->albums[$key]->name ); 
            $this->albums[$key]->albumdesc = stripslashes( $this->albums[$key]->albumdesc );
			$this->albums[$key]->hassubalbum = false;
			foreach($this->albums[$key]->galleries as $gal) {
			    if(!is_numeric($gal)) {
				  $this->albums[$key]->hassubalbum = true;
				  break;
				}
			}
            wp_cache_add($key, $this->albums[$key], 'ngg_album'); 
        }
        
        return $this->albums;
    }
	
	
	
	/**
     * Get an image given its ID
     * 
     * @param  int|string The image ID or Slug
     * @return object A nggImage object representing the image (false if not found)
     */
    function find_image( $id ) {
        global $wpdb;

        if( is_numeric($id) ) {
            
            if ( $image = wp_cache_get($id, 'ngg_image') )
                return $image;
        
            $result = $wpdb->get_row( $wpdb->prepare( "SELECT tt.*, t.* FROM $wpdb->nggallery AS t INNER JOIN $wpdb->nggpictures AS tt ON t.gid = tt.galleryid WHERE tt.pid = %d ", $id ) );
        } else
            $result = $wpdb->get_row( $wpdb->prepare( "SELECT tt.*, t.* FROM $wpdb->nggallery AS t INNER JOIN $wpdb->nggpictures AS tt ON t.gid = tt.galleryid WHERE tt.image_slug = %s ", $id ) ); 
          
        // Build the object from the query result
        if ($result) {
            $image = new nggImage($result);
            return $image;
        } 
                
        return false;
    }


	/**
	 * PHP5 style destructor and will run when the class is finished.
	 *
	 * @return output
	 */
	function __destruct() {
		echo $this->output;
	}

}

// let's use it
$nggAPI = new nggAPI;
