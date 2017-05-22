//Página de cadastro e login
if(sPag.indexOf("CADASTRO.ASP")>=0){

  //Login e teclado
//  try{document.getElementById("Email").style.width='100%';}catch(e){}
  try{document.getElementById("SenhaAtual").style.width='100%';}catch(e){}
//  window.onload(setTimeout("try{document.getElementById('VirtualKeyboard').style.display='none'}catch(e){}",500));
//  window.onload(setTimeout("try{document.getElementById('divTeclado').style.display='none'}catch(e){};",500));

  //Tabelas
  try{document.getElementById("idTableCPFFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableCEPFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTablePCEPFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableCelularFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableDataNascFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableSenhaFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableLembreteFC").style.width='100%';}catch(e){}
  try{document.getElementById("idTableccNomeFC").style.width='100%';}catch(e){}

  //texto acima do campo de mensagem
  try{document.getElementById("idTxtComentsFC").innerHTML="Instruções adicionais de envio:"}catch(e){}

  //Campos
  try{document.getElementById("P2LembreteSenhaCli").style.width='120';}catch(e){}

}

//Página Fale conosco
else if(sPag.indexOf("FALECONOSCO.ASP")>=0){
  try{document.getElementById("Nome").style.width='100%';}catch(e){}
  try{document.getElementById("Email").style.width='100%';}catch(e){}
  try{document.getElementById("IDAssunto").style.width='100%';}catch(e){}
  try{document.getElementById("Mensagem").style.width='100%';}catch(e){}
  try{document.getElementById("CodCaptcha").style.width='60px';}catch(e){}
}

//Página Newsletter
else if(sPag.indexOf("NEWSLETTER.ASP")>=0){
  try{document.getElementById("NomeAssinante").style.width='100%';}catch(e){}
  try{document.getElementById("Email").style.width='100%';}catch(e){}
  try{document.getElementById("CodCaptcha").style.width='60px';}catch(e){} 
}

//Página Noticias
else if(sPag.indexOf("NOTICIAS.ASP")>=0){
  try{document.getElementById("TextoBuscaNews").style.width='100px';}catch(e){}
}

//Página Indique
 else if(sPag.indexOf("INDIQUE.ASP")>=0){
  try{document.getElementById("Nome").style.width='100%';}catch(e){}
  try{document.getElementById("Email").style.width='100%';}catch(e){}
  try{document.getElementById("NomeAmigo").style.width='100%';}catch(e){}
  try{document.getElementById("EmailAmigo").style.width='100%';}catch(e){}
  try{document.getElementById("Comentarios").style.width='100%';}catch(e){}
  try{document.getElementById("CodCaptcha").style.width='60px';}catch(e){}
}

//Página Forma de pagamento
else if(sPag.indexOf("FORMAPAGTO.ASP")>=0){
  //Ex de como não exibir determinada forma de pagamento
  //try{document.getElementById("idPagto1FC").style.display='none';}catch(e){}

  try{document.getElementById("Parcelas3.1").style.width='100px';}catch(e){}
  try{document.getElementById("Parcelas3.2").style.width='100px';}catch(e){}
  try{document.getElementById("Parcelas3.3").style.width='100px';}catch(e){}
  try{document.getElementById("Parcelas3.4").style.width='100px';}catch(e){}
  try{document.getElementById("Parcelas3.5").style.width='100px';}catch(e){}
  try{document.getElementById("Parcelas3.6").style.width='100px';}catch(e){}
  try{document.getElementById("Parcelas3.7").style.width='100px';}catch(e){}

  try{document.getElementById("TabParcelas3.1").style.width='100px';}catch(e){}
  try{document.getElementById("TabParcelas3.2").style.width='100px';}catch(e){}
  try{document.getElementById("TabParcelas3.3").style.width='100px';}catch(e){}
  try{document.getElementById("TabParcelas3.4").style.width='100px';}catch(e){}
  try{document.getElementById("TabParcelas3.5").style.width='100px';}catch(e){}
  try{document.getElementById("TabParcelas3.6").style.width='100px';}catch(e){}
  try{document.getElementById("TabParcelas3.7").style.width='100px';}catch(e){}

  try{document.getElementById("TabRadio").style.width='480px';}catch(e){}

  try{document.getElementById("TabBancos").style.display='none';}catch(e){}
}
