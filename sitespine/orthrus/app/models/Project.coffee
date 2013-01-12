Spine = require('spine')

class Project extends Spine.Model
  @configure 'Project', 'galleryid', 'name'

  @extend Spine.Model.Ajax

  @url: "http://dev.orthrusstudio.com/wp-admin/admin-ajax.php?action=retrieve_json&callback=json&api_key=true&format=json&method=albumdetail"

  @albumfetch: (id) ->    
    @fetch({
     data: 'albumid=' + id   
    })
    
    
  
  
module.exports = Project