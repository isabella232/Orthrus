Spine = require('spine')

class Projectnavigation extends Spine.Controller

  className: 'projectnav'
  
  events:
    'click': 'click'
  
  elements:
    '.navitem': 'items'
  
  constructor: ->
    super
    @log 'ProjectNavigation controller initiliazed'
	
  click: ->
  
  template: (d) ->    
    require('views/portifolionavsidebar')(d) 
  
  render: (albumgallery) =>
    @log 'Rendering PortifolioSlideshow: '     
    @albumgallery =  albumgallery unless albumgallery  
    @html @template(@albumgallery)
    
 
    
  
    
module.exports = Projectnavigation