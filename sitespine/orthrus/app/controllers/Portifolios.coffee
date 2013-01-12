Spine = require('spine')
Portifolio = require('models/Portifolio')
Project = require('models/Project')
ListItem = require('lib/listitem')
Projectnavigation = require('controllers/projectnavigation')

$ = Spine.$



# class Portifolios extends Spine.Controller

class PortifolioList extends Spine.Controller
  className: 'portifolioList' 
  
  
  elements:
    '.portifoliolistitem': 'items'

  constructor: ->
    super    
    Portifolio.bind 'refresh', @render
    @active @render
    
    @log 'Portifolio Controller initialized!'
	
	
  template: (d) ->    
    require('views/portifoliolist')(d) 
  
  render: =>
    @log 'Rendering PortifolioList: ' 
    $('body').trigger('gallerychange', {data: []})
    presult =  (Portifolio.select (p) -> p.hassubalbum == false).sort (a,b) -> b.id - a.id
    
    @log 'arr listing: '
    # @log presult 
    e = []  
    i = 0    
    for p, ix in presult           
      if(e[i] == undefined)
        e[i] = []
               
      e[i].push(p)  
      # @log (ix % 3 == 0)      
      i = (i + 1) if ((ix + 1) % 3 == 0 )
      @log i
      
    @log 'arr listing: '
    @log e  
    @html @template({elements: e})
    $('.carousel').carousel({interval: 0})
    @log 'end portifoliolist template and carousel'  
  
 
    
# module.exports = Portifolios

class PortifolioGallery extends Spine.Controller
  className: 'project row-fluid'
  
  events:
    'click .back': 'gohome'
	

  elements:
    '.projectitem': 'items' 
    'a .back': 'backbutton'	
    '.thumbnails': 'thumbnails'

  constructor: ->
    super    
    Project.bind 'refresh', @render
    
    @active @change
    @currentalbumid = 0
    @log 'PortifolioGallery Controller initialized!'
	
  
  gohome: =>
    @log 'clicked back button!'
    @navigate('/')
	
  addAll: =>
    @log 'AddAll PortifolioGallery: '
    #@log Project.all()
    @el.empty()
    @append('<ul id="gallery" class="thumbnails container"></ul>')
    albumgalleries = Project.first().galleries
    # albumgalleries.each @addOne
	
    @addOne g for g in albumgalleries
	
    @append('<button class="back"><img alt="" src="http://www.w3.org/html/logo/downloads/HTML5_Logo_32.png" /></button>')

  addOne: (item) =>
    # @log 'AddOne Project: '
    # @log item.thumbURL
    project = new ListItem(item: item, templatefile: 'views/portifoliogalleryitem', className: 'projectitem')   
    project.click = (e) ->
      @navigate('/projects',item.id,'slideshow')
	  
    $('#gallery').append(project.getHtml())
    # @log $('#gallery')
    # @log project.getHtml()
  
  getListItemHtml: (item) =>
    #@log('getListItemHtml Project: ' + item.thumbURL)    
    project = new ListItem(item: item, templatefile: 'views/portifoliogalleryitem', className: 'projectitem')   
    project.click = (e) ->
      @navigate('/projects',item.id,'slideshow')
    
    project.getHtml()
    

  change: (id) =>
    @log 'Changing currentalbumid: ' + id
    @currentalbumid = id  
  
  template: (d) ->    
    require('views/portifoliogallery')(d) 
  
  render: (album) =>
    albumid = @currentalbumid
    @log ('Rendering PortifolioGallery: ' + albumid)
    portifolio =  Project.find(albumid)  
    # albumgalleries = Project.first().galleries   	
    # d = (g for g in albumgalleries)    
    @html @template(portifolio)
    @log 'preview image:'    
    # arr = ( { image: g.previewimage.imageURL } for g in portifolio )
    arr = [ { image: portifolio.previewimage.imageURL, id: portifolio.previewimage.pid } ]
    @log arr    
    $('body').trigger('gallerychange', {data: arr})
	
  clear: =>
    @el.empty()
        
    
# module.exports = Projects


class PortifolioSlideshow extends Spine.Controller
  className: 'slideshow'
  
  events:
    'click .back': 'gotogallery'
    'click .anextslide': 'gotonextslide'
    'click .aprevslide': 'gotoprevslide'
    'scrollup': 'gotoprevslide'
    'scrolldown': 'gotonextslide'

  elements:
    '#navsidebar': 'navsidebar'    
    '.back': 'backbutton'
    '.aprevslide': 'prevslide'
    '.anextslide': 'nextslide'
    

  constructor: ->
    super    
    # Project.bind 'refresh', @addAll
    @navsiderbar = new Projectnavigation()
    @active @render
    # @append('<button class="back"><img alt="" src="http://www.w3.org/html/logo/downloads/HTML5_Logo_32.png" /></button>')
    @log 'PortifolioSlideshow Controller initialized!'


  gotogallery: ->
     @log 'navigate back gotogallery!'
     @navigate('/projects',@portifolio.id,'gallery')
	 
  gotonextslide: (e) ->
    e.preventDefault()
    api.nextSlide()
    $('.navgallery-index').html(vars.current_slide + 1)
    @log('spine next slide')

  gotoprevslide: (e) ->
    e.preventDefault()
    api.prevSlide()  
    $('.navgallery-index').html(vars.current_slide + 1)
    @log('spine prev slide')

  # deprecated using render method
  addAll: (galleryid) =>    
    @log 'AddOne SlideShow: '   
    @log galleryid    
    @item = Project.first()    
    # result = (item for item in list when item % 2 == 0)
    albumgallery = (gl for gl in @item.galleries when gl.galleryid == galleryid)    
    # {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg', title : 'Image Credit: Maria Kazvan', thumb : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/thumbs/kazvan-1.jpg', url : 'http://www.nonsensesociety.com/2011/04/maria-kazvan/'},
    
    @arr = ( { image: g.imageURL } for g in albumgallery[0].images )
    @log @arr
    # App.resetSupersized(@arr) 
    # @addOne g for g in albumgalleries
    # @trigger('gallerychange', @arr)
    $('body').trigger('gallerychange',@arr)
    
  template: (d) ->    
    require('views/portifolioslideshow')(d) 
    
  render: (galleryid,currentalbumid) =>
    @log ('Rendering PortifolioSlideshow: ' + galleryid + ' with albumid: ' + currentalbumid)
    @log Project.all()
    @portifolio =   Project.find(currentalbumid)  # Project.first()   
    albumgallery = (gl for gl in @portifolio.galleries when gl.galleryid == galleryid)
    @log albumgallery  
        
    @log 'Gallery selection: '
    @portifolio.selectedgalleryid = galleryid
    @portifolio.selectedgalleryname = albumgallery[0].ProjectType ? albumgallery[0].name.split('-')[0]
    @portifolio.selectedgallerylength = albumgallery[0].images.length
    @portifolio.selectedgallerycolor = albumgallery[0].ProjectColor 
    @log @portifolio.selectedgallerylength
    
    @html @template(@portifolio)
    # @append @navsidebar.template(@portifolio)
    @append require('views/portifolionavsidebar')(@portifolio)
    arr = ( { image: g.imageURL, id: g.pid } for g in albumgallery[0].images when !g.excluded  )
    # @log arr    
    $('body').trigger('gallerychange', {data: arr})
    
  

  

	   


class Portifolios extends Spine.Stack
  controllers:
    list: PortifolioList
    gallery: PortifolioGallery
    slideshow: PortifolioSlideshow

module.exports = Portifolios





