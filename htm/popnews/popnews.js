function PopNews(){ 
  // Função que posiciona o elemento sempre no centro
  jQuery(window).resize(function(){
  
  jQuery('#popupNews').css({
  position:'absolute',
  left: (jQuery(window).width() - jQuery('#popupNews').outerWidth())/2,
  top: (jQuery(window).height() - jQuery('#popupNews').outerHeight())/2
  });
  
  });
  // Para iniciar a função:
  jQuery(window).resize();
  
  /* PopNews */
  var cookie=jQuery.cookie('popupNews');
  
  if(FC$.Page=="Home" && cookie!="true"){
  
  jQuery(document).ready(function(){
  jQuery('#popupNews, #FullBackground').css('display', 'block');
  
  jQuery.cookie("popupNews", "true",{
  days:0, // Define o tempo em dias para a exibição do popup
  hours:0, // Define o tempo em horas para a exibição do popup
  minutes:0 // Define o tempo em minutos para a exibição do popup
  });
  });
  
  var background = jQuery("#FullBackground")
  if(background){
  jQuery('body,html').css('overflow','hidden');
  }
  
  jQuery('.btnClose').click(function(){
  jQuery('#popupNews, #FullBackground').fadeOut(300);
  
  setTimeout(function(){
  jQuery('body,html').css('overflow','auto');
  },300);
  });
  }else{jQuery('body,html').css('overflow','auto');}
  /* PopNews */
}