//= require ZeroClipboard.min.js
//= require keyboard.js
//= require jquery

(function (window, document) {

  // Rocument ready
  document.addEventListener('DOMContentLoaded', function() {

    var output = document.querySelectorAll('.output')[0];

    if (output) {

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
    }


    var urlInput = document.querySelectorAll('.url-input')[0];
    var placeholder = urlInput.getAttribute("placeholder");
    var cloneWrap = document.createElement("div")
    var clone = document.createElement("span");
    var theWidth = 0;
    var value = 0;

    cloneWrap.className = "input-clone-wrap";
    clone.className = "input-clone";
    document.body.appendChild(cloneWrap);
    cloneWrap.appendChild(clone);

    clone.innerHTML = placeholder;
    urlInput.style.width = clone.offsetWidth + "px";
    urlInput.style.minWidth = clone.offsetWidth + "px";

    window.adjustWidthOfInput = function() {
      value = urlInput.value.replace(/</g,'&lt;').replace(/>/g,'&gt;');
      //console.log(value.length)
      if (value.length !== 0) {
        clone.innerHTML = value;
      } else {
        clone.innerHTML = placeholder;
      }
      theWidth = clone.offsetWidth;
      urlInput.style.width = theWidth + "px";
    }

    urlInput.addEventListener('input', window.adjustWidthOfInput);

  });

})(window, document);
