//= require ZeroClipboard.min.js
//= require keyboard.js

(function (window, document) {

  // Rocument ready
  document.addEventListener('DOMContentLoaded', function() {

    var output = document.querySelectorAll('.output')[0];
    var copy = document.querySelectorAll('.copy')[0];


    ZeroClipboard.config({moviePath: '/assets/ZeroClipboard.swf'});
    var client = new ZeroClipboard(copy);

    client.addEventListener('dataRequested', function(client, args) {
      client.setText('http://' + output.value);
      outputCopied();
    });

    KeyboardJS.on('ctrl+c', function() {
      if (document.activeElement == output) {
        outputCopied();
      }
    });

    KeyboardJS.on('command+c', function() {
      if (document.activeElement == output) {
        outputCopied();
      }
    });

    function outputCopied() {
      copy.textContent = 'Copied!'

      if (copy.classList) {
        copy.classList.add('copied');
      } else {
        copy.className += ' ' + 'copied'
      }
    }

    function selectOutput() {
      output.focus();
      output.select();
    };

    output.addEventListener('click', selectOutput);
    output.addEventListener('touchstart', selectOutput);

  });

})(window, document);
