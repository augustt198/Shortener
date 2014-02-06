var client = new ZeroClipboard( document.getElementById("copy-button"), {
  moviePath: "/assets/ZeroClipboard.swf"
} );
client.on( "load", function(client) {
  client.on( "complete", function(client, args) {
    $("#success-flash").css('display', '')
  } );
} );
