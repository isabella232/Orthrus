Spine = require('spine')
Project = require('models/Project')
ListItem = require('lib/listitem')

class Projects extends Spine.Controller
  className: 'project'

  elements:
    '.projectitem': 'items'

  constructor: ->
    super    
    # Project.bind 'refresh', @addAll

    # @routes       
    #  '/projects/:id': (params) ->
    #    @log 'Navigate to route /projects/:id'
    #    Project.albumfetch(params.id)
    #    # @sidebar.active(params)
    #    # $('.portifolioList').hide()
    #    # @el.show()

    @log 'Projects Controller initialized!'


  addAll: =>    
    #@log Project.all()
    albumgalleries = Project.first().galleries
    # albumgalleries.each @addOne
    @addOne g for g in albumgalleries

  addOne: (item) =>
    @log 'AddOne Project: '
    @log item.thumbURL
    project = new ListItem(item: item, templatefile: 'views/portifoliogalleryitem', className: 'projectitem')
    @append(project.render())
        
    
module.exports = Projects