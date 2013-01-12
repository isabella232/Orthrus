Spine = require('spine')
Portifolio = require('models/Portifolio')
Portifolios = require('controllers/Portifolios')


class PortifolioWrapper extends Spine.Controller
  
  

  constructor: ->
    super    
    @portifolios = new Portifolios        
    @append @portifolios
    @log 'Portifolio Wrapper initialized'
    
module.exports = PortifolioWrapper