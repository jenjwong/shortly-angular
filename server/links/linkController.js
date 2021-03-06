var Q = require('q');
var util = require('../config/utils.js');
var Link = require('./linkModel.js');

// Promisify a few mongoose methods with the `q` promise library
var findLink = Q.nbind(Link.findOne, Link);
var createLink = Q.nbind(Link.create, Link);
var findAllLinks = Q.nbind(Link.find, Link);

var getAllRes = [
  {
    visits: 3,
    link: 'wwww.urMomBakesPies',
    title: 'fun',
    code: 'fdsfds8fsdj',
    baseUrl: 'wwwxxx',
    url: 'fdsfdfdsfdsf url'
  },

  {
  visits: 6,
  link: 'wwww.beseverSites',
  title: 'thuperGreatwebPages',
  code: 'fdsfdsfdsfdsfsd8fsdj',
  baseUrl: 'wwwfdfdsfsxxx',
  url: 'fruit url'
  }

];



module.exports = {

  allLinks: function (req, res, next) {
    findAllLinks({})
      .then(function (links) {
        res.json(links);
      })
      .fail(function (error) {
        next(error);
      });
  },

  newLink: function (req, res, next) {
    console.log(req.body, 'server ulr link !!!!!!!!!!!!!!!!!!!!!!!!!!!')
    var url = req.body.url;
    // if (!util.isValidUrl(url)) {
    //   return next(new Error('Not a valid url'));
    // }

    findLink({url: url})
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          return util.getUrlTitle(url);
        }
      })
      .then(function (title) {
        if (title) {
          var newLink = {
            url: url,
            visits: 0,
            baseUrl: req.headers.origin,
            title: title
          };
          return createLink(newLink);
        }
      })
      .then(function (createdLink) {
        if (createdLink) {
          res.json(createdLink);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  navToLink: function (req, res, next) {
    findLink({code: req.params.code})
      .then(function (link) {
        if (!link) {
          return next(new Error('Link not added yet'));
        }

        link.visits++;
        link.save(function (err, savedLink) {
          if (err) {
            next(err);
          } else {
            res.redirect(savedLink.url);
          }
        });
      })
      .fail(function (error) {
        next(error);
      });
  }

};
