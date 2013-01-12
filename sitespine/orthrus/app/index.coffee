require('lib/setup')

Spine = require('spine')
Portifolio = require('models/Portifolio')
Portifolios = require('controllers/Portifolios')
PortifolioWrapper = require('controllers/PortifolioWrapper')
Project = require('models/Project')
Projects = require('controllers/Projects')
Footer = require('controllers/Footer')
# PortifolioGallery = require('controllers/PortifolioGallery')

class App extends Spine.Controller

  elements:
    '.stack': 'stack'
    '#wrapper': 'portifolio'
    # '#footer': 'footer'

  constructor: ->
    super
    
    
    
    
    @portifoliowrapper = new PortifolioWrapper({el: $("#wrapper")})
    @portifolios = @portifoliowrapper.portifolios
    # @portifolios = new Portifolios
    # @projects = new Projects
    @footer = new Footer({el: $("#footer")})
    # @append @portifolios  # , @projects
	
    # $.supersized({slides: []}) 
        

    
    Portifolio.fetch()
    # Project.albumfetch(2)
    # Project.bind('refresh', => @portifolios.gallery.active() )
    
    Spine.Route.setup( { trigger: true, shim: false } )   
 
    @log 'App Initialized'

    @routes
      '/projects/:id/gallery': (params) -> 
        myid = params.id
        Project.albumfetch(myid)
        @log 'route to /projects/:id/gallery'
        @portifolios.gallery.clear()
        @portifolios.gallery.active(myid)

      '/projects/:id/slideshow': (params) -> 
        # Project.albumfetch(params.id)        
        @log 'route to /projects/:id/slideshow'
        @log @portifolios.gallery.currentalbumid
        @portifolios.slideshow.active(params.id,@portifolios.gallery.currentalbumid)
        
      '/projects/:id': (params) ->
        @log 'route to /projects/:id'        
        @portifolios.list.active(params)

      '/portifolios': (params) ->
        @log 'route to /portifolios'
        @portifolios.list.active(params)
       
      

      '/': (params) ->
        @log 'route to Home page'               
        @portifolios.list.active(params)
    
    @portifolios.list.active()
    
    @supersized = $('window')
    @setPositionInfo(@supersized.width(),@supersized.height())
    
    
  setPositionInfo: (w,h) =>
    @wrapperWidth = w
    @wrapperHeight = h
    
	  # Background Image 
    @bgMainRatio = 1280/720;
    @wrapperRatio = @wrapperWidth/@wrapperHeight
	
    # Width Percentage
    # @widthPercentage = (@wrapperWidth/1920).toFixed(2);
    # if(@widthPercentage >= 1) @widthPercentage = 1;
    # if(@widthPercentage <= 0) @widthPercentage = 0;
    @log 'wrapper height: '
    @log @wrapperHeight
    # @el.empty()    
    # @append @portifolios  # , @projects
    # @append @portifolioWrapper
    # @append @footer
    @log 'end set position'
    
	# @append '<div class="push"></div>'
  

module.exports = App
