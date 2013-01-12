Spine = require('spine')

class Portifolio extends Spine.Model
  @configure 'Portifolio', 'id','name','slug','previewpic','albumdesc','sortorder','pageid','galleries','hassubalbum'
  
  @extend Spine.Model.Ajax

  @url: "http://dev.orthrusstudio.com/wp-admin/admin-ajax.php?action=retrieve_json&callback=json&api_key=true&format=json&method=albums"

  # @fromJSON: (objects) ->
    # console.log 'In Modified fromJSON'
    # console.log objects
    # return unless objects
    # if typeof objects is 'string'
      # objects = JSON.parse(objects)
    # if Spine.isArray(objects)
      # console.log 'It is an array'
      # (new @(value) for value in objects)
    # else
      # console.log 'It is an NOT array, what?'
      # new @(objects)  

module.exports = Portifolio