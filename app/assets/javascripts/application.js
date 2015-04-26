//= require ZeroClipboard.min.js
//= require keyboard.js

(function (window, document) {

  // Document ready
  document.addEventListener('DOMContentLoaded', function() {
    var outputEl = document.querySelectorAll('.output')[0];
    handleOutputField(outputEl);
  });

  function handleOutputField(outputEl) {
    if (!outputEl) { return; }

    var copy = document.querySelectorAll('.copy')[0];
    var zeroClipboardSwf = '/assets/ZeroClipboard.swf';
    ZeroClipboard.config({moviePath: zeroClipboardSwf});
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

    outputEl.addEventListener('click', selectField);
  }

  function outputCopied() {
    copy.textContent = 'Copied!'

    if (copy.classList) {
      copy.classList.add('copied');
    } else {
      copy.className += ' ' + 'copied'
    }
  }

  function selectField() {
    this.focus();
    this.select();
  };

})(window, document);