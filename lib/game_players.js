var games = require('./games')
  , request = require('request')
  , xml2js = require('xml2js')

var parser = new xml2js.Parser()


exports.players = function (url, cb, options) {
  
  url = url + '/players.xml'
  !cb ? cb = console.log : ''
  
  return request(url, function (err, res, body) {

    if (err) {
      return cb(err)
    }

    parser.parseString(body, function (err, res) {
      if (err) {
	return cb(err)
      }

      var all_players = []
        try {
            res.team.forEach(function (val, key) {
                if (val.player && Array.isArray(val.player)) {
                    val.player.forEach(function (val, key) {
                        all_players.push(val)
                    })
                }
            })

            if (options && options.hasOwnProperty('limit')) {
                cb(null, all_players.slice('-' + options.limit).reverse(), res)
            } else {
                cb(null, all_players.reverse(), res)
            }
        } catch(e) {
            console.log('game_players.js:'+e);
        }
    })

  })

}
