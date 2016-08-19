$(function() {
    $("#search-term").submit(function(event) {
        event.preventDefault();

        var request = gapi.client.youtube.search.list({
            q: $("#query").val(), //get user input
            part: "snippet",
            type: "video",
            maxResults: 5
        });
        request.execute(function(response) {
            var results = response.result;
            showResults(results); 
        });
    });
});

//create video object
var Video = function(videoId) {
    this.videoHTML = "<iframe src=//www.youtube.com/embed/" + videoId + "></iframe>";
};

//iterate through results and create a new instance of the video object with each new videoId that then gets appended to the HTML document
function showResults(results) {
    $.each(results.items, function(index, item) {
        var vid = new Video(item.id.videoId);

        $("#search-results").append(vid.videoHTML);
    });

}

function init() {
    gapi.client.setApiKey("AIzaSyAAeEliIWNKfAlOjtTFoEfGoTtqt_RAF0I");
    gapi.client.load("youtube", "v3", function() {
        //youtube api is ready
    });
}
