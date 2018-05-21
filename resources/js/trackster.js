var Trackster = {};

$(document).ready(() => {

  $('#search-button').click(() => {
    var $search = $('#search').val();
    Trackster.searchTracksByTitle($search);
  });

  $('#search').keydown(function(e){
    if(e.which == 13){//Enter key pressed
        $('#search-button').click();//Trigger search button click event
    }
  });

  /*
    Given an array of track data, create the HTML for a Bootstrap row for each.
    Append each "row" to the container in the body to display all tracks.
  */
  Trackster.renderTracks = function(tracks) {
    var $trackcontainer = $('#trackcontainer');
    $trackcontainer.empty();
    var n = tracks.length;
    for (i = 0; i < n; i++) {
      var trackurl = tracks[i].url;
      var trackname = tracks[i].name;
      var artistname = tracks[i].artist;
      var artwork = tracks[i].image[1]["#text"]
      var popularity = tracks[i].listeners;
      var $trackhtml = $('<div class="row"><div class="col-1"><p><a href="' + trackurl + '"><i class="fas fa-play-circle"></a></i></p></div><div class="col-4"><p>' + trackname + '</p></div><div class="col-3"><p>' + artistname + '</p></div><div class="col-2"><p><img src="' + artwork + '"></p></div><div class="col-2 desktop"><p>' + popularity + '</p></div></div>')
      $trackcontainer.append($trackhtml);
    }
  };

  /*
    Given a search term as a string, query the LastFM API.
    Render the tracks given in the API query response.
  */
  Trackster.searchTracksByTitle = function(title) {
    var key = 'a4f271700c22982fae8954645260c522';
    $.ajax({
      url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + key + '&format=json',
      datatype: 'jsonp',
      success: function(data) {
        Trackster.renderTracks(data.results.trackmatches.track);
      }
    });
  };
});
