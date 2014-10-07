// --------------------------------------------------------------------------------------------------------------------

function forum(opts) {
  // a set of pages have:
  // - 
  var express  = opts.express
  var db       = opts.db
  var pageCol  = opts.pageCol
  var title    = opts.title

  var templateIndex = opts.templateIndex || 'page-index'
  var templatePage  = opts.templatePage || 'page-page'

  // ------------------------------------------------------------------------------------------------------------------
  // middleware

  function setupConnie(req, res, next) {
    res.locals.connie      = res.locals.connie || {}
    res.locals.connie.page = res.locals.connie.page || {}
    res.locals.connie.page.title = title
    next()
  }

  // multiple
  function loadPages(req, res, next) {
    pageCol.find({}).toArray(function(err, pages) {
      if (err) return next(err)
      res.locals.connie.page.pages = pages 
      next()
    })
  }

  // singular
  function loadPage(req, res, next) {
    console.log('params:', req.params)
    var search = {
      _id : req.params.pageId,
    }
    console.log('search:', search)
    pageCol.findOne(search, function(err, page) {
      if (err) return next(err)
      if (!page) {
        // instead of sending a 404, just cede to the next route and let express do it's thing
        return next('route')
      }
      res.locals.connie.page.page = page
      next()
    })
  }

  // ------------------------------------------------------------------------------------------------------------------

  // create the router
  var router = express.Router({
    strict : true,
  })

  router.get(
    '/',
    setupConnie,
    loadPages,
    function(req, res, next) {
      // the index
      res.render(templateIndex)
    }
  )

  router.get(
    '/:pageId',
    setupConnie,
    loadPage,
    function(req, res, next) {
      res.render(templatePage)
    }
  )

  return router
}

// --------------------------------------------------------------------------------------------------------------------

module.exports = forum

// --------------------------------------------------------------------------------------------------------------------
