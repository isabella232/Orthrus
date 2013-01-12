Spine = require('spine')
Portifolio = require('models/Portifolio')

class Footer extends Spine.Controller
  # tag: 'footer'
  
  elements:
    '.collapse': 'collapsible'
  
  constructor: ->
    super
    Portifolio.bind 'refresh', @render
    @active @render    
    @hidden = false
    
    $('#footer .collapse').on(
      'hidden'
      => 
        @hidden = true
        @log 'hidden: '
      )
      
    $('body').find('a,button').not('.footer-collapse').on(
      'click'
      => 
        @hide()        
        @log 'hidable: '
        
      )
      
    @log 'Footer initialized!'
    
  template: (d) ->    
    require('views/footer')(d) 
  
  render: =>
    @log 'Rendering Footer: ' 
    presult =  Portifolio.select (p) -> p.hassubalbum == false
    # @html @template(presult)
    @html @template({data: presult})
    # @el.show()
    # @el.css({visibility: 'visible'})
    
    
  hide: =>    
    # $('#footer .collapse').collapse('hide') if @hidden == true
    # @hidden = false
    
module.exports = Footer