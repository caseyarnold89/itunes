var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

  this.findArtist = function(artist) {
      var deferred = $q.defer();
      
      $http({
          method: 'JSONP',
          url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      })
      .then(function(response){
          var firstResp = response.data.results; //an array of objects
          console.log(firstResp);
          var parseData = [];
        //   var newObj = {};
          for (var i = 0; i < firstResp.length; i++) {
              var newObj = {};
              newObj.Song = firstResp[i].trackName;
              newObj.AlbumArt = firstResp[i].artworkUrl60;
              newObj.Artist = firstResp[i].artistName;
              newObj.Collection = firstResp[i].collectionName;
              newObj.CollectionPrice = firstResp[i].collectionPrice;
              newObj.Play = firstResp[i].previewUrl;
              newObj.Type = firstResp[i].kind;
              parseData.push(newObj);
          }
          deferred.resolve(parseData);
      })
      
      return deferred.promise;
  }
    
});
