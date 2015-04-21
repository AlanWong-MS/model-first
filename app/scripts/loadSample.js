'use strict';

$(function (){
  var samplesPrefix   = 'samples/',
      $sampleList     = $('#sampleList'),
      $sampleLoad     = $('#sampleLoad');
  
  function loadSample(){
    $.get(samplesPrefix + $sampleList.find(':selected').text(), function(data){
      window.morphoEditor.loadSource(data);
    });
  }

  $.each(window.morphoEditor.getConfig('samples'), function(key, value) {   
       $sampleList.append($('<option></option>').text(value)); 
  });
  
  loadSample();
  $sampleLoad.click(loadSample);
});
