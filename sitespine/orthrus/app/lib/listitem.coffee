Spine  = require("spine")
$      = Spine.$

class Spine.ListItem extends Spine.Controller
  className: 'listitem'
  
  # Delegate the click event to a local handler
  events:
    "click": "click"

  # Bind events to the record
  constructor: ->  
    super
    throw '@item required' unless @item
    throw '@templatefile required' unless @templatefile    
    @el.attr('data-id', @item.id)

  template: (items) ->    
    require(@templatefile)(items) 

  render: (item) ->
    @item = item if item
    # @log @item.thumbURL    
    @html(@template(@item))
    @
	
  getHtml: (item) ->
    @item = item if item
    @html(@template(@item))
    @el
  
     
  click: (e) ->
    @log 'Clicked item: '
    
    item = $(e.target)
    @log item.id
    
    
    # @trigger("change", item)


module?.exports = Spine.ListItem