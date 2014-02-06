//= require ZeroClipboard.min.js
//= require keyboard.js

(function (window, document) {

  // Rocument ready
  document.addEventListener('DOMContentLoaded', function() {

    var output = document.querySelectorAll('.output')[0];
    var hint = document.querySelectorAll('.hint')[0];


    ZeroClipboard.config({moviePath: '/assets/ZeroClipboard.swf'});
    var client = new ZeroClipboard(hint);

    client.addEventListener('dataRequested', function(client, args) {
      client.setText(output.value);
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
      hint.textContent = 'Copied!'

      if (hint.classList) {
        hint.classList.add('copied');
      } else {
        hint.className += ' ' + 'copied'
      }
    }

    function selectOutput() {
      output.focus();
      output.select();

      // For iOS
      output.selectionStart = 0;
      output.selectionEnd = output.value.length;
    };

    output.addEventListener('click', selectOutput);
    output.addEventListener('touchstart', selectOutput);

  });

})(window, document);