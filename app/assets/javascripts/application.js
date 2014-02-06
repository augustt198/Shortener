// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require_tree .

(function (window, document) {

  // Rocument ready
  document.addEventListener('DOMContentLoaded', function() {

    var output = document.querySelectorAll('.output')[0];
    var hint = document.querySelectorAll('.hint')[0];

    function selectOutput() {
      output.focus();
      output.select();

      // For iOS
      output.selectionStart = 0;
      output.selectionEnd = output.value.length;
    };

    function copyOutput() {
      alert('we should add the copy code here')
    };

    output.addEventListener('click', selectOutput);
    output.addEventListener('touchstart', selectOutput);
    hint.addEventListener('click', copyOutput);
    hint.addEventListener('touchstart', copyOutput);

  });

})(window, document);