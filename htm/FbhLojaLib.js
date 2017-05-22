//### Guarda em variável a página atual
var sPag=document.location.href.toUpperCase();

function fPos(obj){
  var iLeft=iTop=0;
  if(obj.offsetParent){
    iLeft=obj.offsetLeft;
    iTop=obj.offsetTop;
    while (obj=obj.offsetParent){
      iLeft+=obj.offsetLeft;
      iTop+=obj.offsetTop;
    }
  }
  return [iLeft,iTop];
}

function RedefineTamanho(){
  var aPos=fPos(oPos);
  FB.Canvas.setSize({width:520,height:aPos[1]+180});
}

function AjustaFiltros(){ 
  var bTemPathQts=false;
  var oUlPathCatQt=document.getElementById("idUlPathCatQtFC");

  if(oUlPathCatQt){bTemPathQts=true;}else{document.getElementById('idListaProdCategoriasFC').style.display='none';}
  //Caso não tenha produtos em categorias/adicionais encontrados, remove div
  if(!bTemPathQts)document.getElementById("idDivPath").style.display='none';

  //Caso não tenha filtros de busca, remove div com filtros
  var oUlPathSearch=document.getElementById("idUlPathSearchFC");
  if(oUlPathSearch==null)document.getElementById("idDivSearch").style.display='none';
}

function VerTextoBS(oForm){if (oForm.Texto.value=='' || oForm.Texto.value==' Procurar'){alert('Digite antes sua busca.');oForm.Texto.focus();return false;}else{return true;}}

function MostraCarrinhoProd(IDProduto,iQtdEstoque,sCodProd){
 if(iQtdEstoque>0){
   document.write("<a target='_self' href='javascript:Compra"+IDProduto+"();'><img src='"+ sCaminhoImages +"FbbBotComprarProd.png'  alt='Clique para adicionar ao carrinho' border=0 vspace=1></a>");}
   else{document.write("<a href='javascript:MostraDispCaptcha("+ IDLojaNum +","+IDProduto+")'><img src='"+ sCaminhoImages +"FbbBotEsgotado.png' border='0' vspace='1' alt='Clique para ser avisado quando ficar disponível'></a>");
 }
}

function MostraIndiqueP(IDProduto){
  popup=window.open("IndiqueProduto.asp?IDLoja="+IDLojaNum+"&IDProduto="+IDProduto,"Indique","top=20,left=20,height=450,width=460,scrollbars=no");
  popup.focus();
  return void(0);
}

function MostraBotIndique(IDProduto){
  document.write("<center><span class=smText><a href='javascript:MostraIndiqueP("+IDProduto+")' class=RodapeMenu><img src="+sCaminhoImages+"FbbRecomende.png border=0 vspace=2></a></span></center>");
}

function MostraBotAval(IDProduto){
  document.write("<center><span class=smText><a href='Opiniao.asp?IDLoja="+IDLojaNum+"&IDProduto="+IDProduto+"' class=RodapeMenu><img src="+sCaminhoImages+"FbbAvalie.png border=0 vspace=2></a></span></center>");
}

function MostraCestaTopo(){
  var PosCarrinho=document.getElementById("idMostraDadosCesta"); 
  if(PosCarrinho){
    if(QtdCesta>1){sItensCesta=" itens";}else{sItensCesta=" item";};
    PosCarrinho.innerHTML='<div id="MostraDadosCestaIDFC" class="Estilo_Div_Cesta"><table cellspacing=0 cellpadding=0><tr><td><a href="AddProduto.asp?IDLoja='+ IDLojaNum +'"><img src="'+ sCaminhoImages +'FbbCarrinhoTop.png"  alt="Clique para ir ao carrinho" border="0" hspace="5"></a></td><td><a href="AddProduto.asp?IDLoja='+ IDLojaNum +'" class="Estilo_Link_Cesta"> Carrinho: <span class="Estilo_Itens_Cesta">'+ QtdCesta + sItensCesta +'</span> &nbsp;  Sub-total: <span class="Estilo_Total_Cesta">'+FormatPrice(ValorCesta,'R$')+'</span></a></td></tr></table></div>';
  }
}


function ConectXMLPageHistory(){
  // para conectar
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.open("GET","XMLPageHistory.asp?IDLoja="+IDLojaNum,false);
  xmlhttp.send();
  xmlDoc=xmlhttp.responseXML; 
  return(xmlDoc.getElementsByTagName("item"));
}

function ExibeHistoricoNaveg(x){
  try{MostrarBarra=(x[0].getElementsByTagName("title")[0].childNodes[0].nodeValue);}
  catch(e){MostrarBarra="";}
  
  if(MostrarBarra!=""){
  document.write("<table width=95% cellspacing=3 cellpadding=3><tr><td class=EstTabTopo><div id=EstCommentsTxt>&nbsp;Histórico de navegação::</div></td></tr></table><table align=center border=0><tr>");
  }
  
  for (i=0;i<x.length && i<4;i++){
    titleProd=x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    linkProd=x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
    try{imageProd=x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;}
    catch(e){imageProd="images/shim.gif";}
    try{priceProd=(x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);}
    catch(e){priceProd="";}
    titleProd=titleProd.substring(0,20);
  txt="<td width=119 valign=top align=center><table width=117 height=150 style='border-style:solid;border-width:1px;border-color:#cbd3df'><tr><td align=center height=25 style='background:#eceff5;font-size:8pt;color:#333333;font-family:tahoma,verdana;font-weight:bold'><a href='"+ linkProd +"' style='text-decoration:none;'>"+  titleProd +"</a></td></tr><tr><td height=80 align='center'><a href='"+ linkProd +"'><img src='" + imageProd + "' border=0 width=80 height=80 title='"+ titleProd +"'></a></td></tr><tr><td height=30 align='center' style='color:#3b5998;font-size:8pt;font-family:arial;font-weight:bold'>"+ priceProd +"</td></tr></table><br></td>";
  document.write(txt);
  }
  if(MostrarBarra!=""){
  document.write("</td></tr></table>");
  }
}

function ExibePassosCompra(){
//Personalização dos passos da compra com imagens
  var TemPassosCompra=document.getElementById("PassosCompra"); 
  if(TemPassosCompra){
  var passo1=document.getElementById("idPasso1FC"); 
  var passo2=document.getElementById("idPasso2FC"); 
  var passo3=document.getElementById("idPasso3FC"); 
  var passo4=document.getElementById("idPasso4FC"); 
  var passo5=document.getElementById("idPasso5FC"); 
  if(passo1.className=='EstPassoCompraAtual')passo1.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso1Atual.png' width='82' height='23'>";
  else if(passo1.className=='EstPassoCompraPre')passo1.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso1Pre.png' width='82' height='23'>";

  if(passo2.className=='EstPassoCompraAtual')passo2.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso2Atual.png' width='82' height='23'>";
  else if(passo2.className=='EstPassoCompraPre')passo2.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso2Pre.png' width='82' height='23'>";
  else if(passo2.className=='EstPassoCompraPos')passo2.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso2Pos.png' width='82' height='23'>";

  if(passo3.className=='EstPassoCompraAtual')passo3.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso3Atual.png' width='82' height='23'>";
  else if(passo3.className=='EstPassoCompraPre')passo3.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso3Pre.png' width='82' height='23'>";
  else if(passo3.className=='EstPassoCompraPos')passo3.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso3Pos.png' width='82' height='23'>";

  if(passo4.className=='EstPassoCompraAtual')passo4.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso4Atual.png' width='82' height='23'>";
  else if(passo4.className=='EstPassoCompraPre')passo4.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso4Pre.png' width='82' height='23'>";
  else if(passo4.className=='EstPassoCompraPos')passo4.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso4Pos.png' width='82' height='23'>";

  if(passo5.className=='EstPassoCompraAtual')passo5.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso5Atual.png' width='82' height='23'>";
  else if(passo5.className=='EstPassoCompraPos')passo5.innerHTML="<img src='"+ sCaminhoImages +"FbbPasso5Pos.png' width='82' height='23'>";
  }
}

function AlteraEstIcPagto(oIcone){
  oIcone.style.width='65';
  oIcone.style.height='41';
  oIcone.style.cursor='pointer';
}

function AlteraImgsFormaPagto(){
  IcPagtoBB=document.getElementById("idImgPagto1FC"); //Boleto bancário
  if(IcPagtoBB){IcPagtoBB.src=sCaminhoImages+'IcPagtoBB.png';AlteraEstIcPagto(IcPagtoBB);}
  IcPagtoCE=document.getElementById("idImgPagto6FC"); //Contra entrega
  if(IcPagtoCE){IcPagtoCE.src=sCaminhoImages+'IcPagtoCE.png';AlteraEstIcPagto(IcPagtoCE);}
  IcPagtoDB=document.getElementById("idImgPagto4FC"); //Depósito bancário
  if(IcPagtoDB){IcPagtoDB.src=sCaminhoImages+'IcPagtoDB.png';AlteraEstIcPagto(IcPagtoDB);}
  IcPagtoBR=document.getElementById("idImgPagto19FC"); //Banco do Brasil
  if(IcPagtoBR){IcPagtoBR.src=sCaminhoImages+'IcPagtoBR.png';AlteraEstIcPagto(IcPagtoBR);}
  IcPagtoIS=document.getElementById("idImgPagto5FC"); //Itaú Shopline
  if(IcPagtoIS){IcPagtoIS.src=sCaminhoImages+'IcPagtoIS.png';AlteraEstIcPagto(IcPagtoIS);}
  IcPagtoRP=document.getElementById("idImgPagto17FC"); //RealPague
  if(IcPagtoRP){IcPagtoRP.src=sCaminhoImages+'IcPagtoRP.png';AlteraEstIcPagto(IcPagtoRP);}
  IcPagtoVE=document.getElementById("idImgPagto16FC"); //VISA Electron
  if(IcPagtoVE){IcPagtoVE.src=sCaminhoImages+'IcPagtoVE.png';AlteraEstIcPagto(IcPagtoVE);}
  IcPagtoPP=document.getElementById("idImgPagto15FC"); //PayPal
  if(IcPagtoPP){IcPagtoPP.src=sCaminhoImages+'IcPagtoPP.png';AlteraEstIcPagto(IcPagtoPP);}
  CCAmex=document.getElementById("idImgPagto3_1FC"); //AMEX
  if(CCAmex){CCAmex.src=sCaminhoImages+'IcPagtoAE.png';AlteraEstIcPagto(CCAmex);}
  CCAura=document.getElementById("idImgPagto3_6FC"); //Aura
  if(CCAura){CCAura.src=sCaminhoImages+'IcPagtoAU.png';AlteraEstIcPagto(CCAura);}
  CCDine=document.getElementById("idImgPagto3_2FC"); //Diners
  if(CCDine){CCDine.src=sCaminhoImages+'IcPagtoDN.png';AlteraEstIcPagto(CCDine);}
  CCElo=document.getElementById("idImgPagto3_7FC"); //Elo
  if(CCElo){CCElo.src=sCaminhoImages+'IcPagtoEL.png';AlteraEstIcPagto(CCElo);}
  CCHiperCard=document.getElementById("idImgPagto3_5FC"); //Hipercard
  if(CCHiperCard){CCHiperCard.src=sCaminhoImages+'IcPagtoHC.png';AlteraEstIcPagto(CCHiperCard);}
  CCMast=document.getElementById("idImgPagto3_3FC"); //MasterCard
  if(CCMast){CCMast.src=sCaminhoImages+'IcPagtoMC.png';AlteraEstIcPagto(CCMast);}
  CCVisa=document.getElementById("idImgPagto3_4FC"); //VISA
  if(CCVisa){CCVisa.src=sCaminhoImages+'IcPagtoVS.png';AlteraEstIcPagto(CCVisa);}
  IcPagtoPS=document.getElementById("idImgPagto18FC"); //PagSeguro
  if(IcPagtoPS){IcPagtoPS.src=sCaminhoImages+'IcPagtoPS.png';AlteraEstIcPagto(IcPagtoPS);}
  IcPagtoMP=document.getElementById("idImgPagto21FC"); //MercadoPago
  if(IcPagtoMP){IcPagtoMP.src=sCaminhoImages+'IcPagtoMP.png';AlteraEstIcPagto(IcPagtoMP);}
  IcPagtoMI=document.getElementById("idImgPagto22FC"); //MoIP
  if(IcPagtoMI){IcPagtoMI.src=sCaminhoImages+'IcPagtoMI.png';AlteraEstIcPagto(IcPagtoMI);}
  IcPagtoVK=document.getElementById("idImgPagto20FC"); //Vakinha
  if(IcPagtoVK){IcPagtoVK.src=sCaminhoImages+'IcPagtoVK.png';AlteraEstIcPagto(IcPagtoVK);}
}

function ExibeBotoesCesta(bExibeDuasLinhasBotoes){
  try{
    var table=document.getElementById('TabItens');

    if(bExibeDuasLinhasBotoes && sBrowser!='IE'){
      var row=table.insertRow(0);
      var cell=row.insertCell(-1);
      cell.colSpan=4;
      var sCel1="<table width='100%'><tr>";
            sCel1+="<td width='33%' align='left'><a href='home.asp?IDLoja="+ IDLojaNum +"'><img src='"+ sCaminhoImages +"FbbBotContComprando.png' title='Continuar comprando' border='0'></a></td>";
            sCel1+="<td width='34%' align='center'><a href='#R' onclick='document.Lista.submit()'><img src='"+ sCaminhoImages +"FbbBotRecalcular.png' title='Recalcular' border='0'></a></td>";
            sCel1+="<td width='33%' align='right'><a href='#C' onclick='ComprarImg()'><img src='"+ sCaminhoImages +"FbbBotComprar.png' title='Comprar' border='0'></a></td>";
          sCel1+="</tr></table>";
      cell.innerHTML=sCel1;
    }

    var row=table.insertRow(-1);
    var cell=row.insertCell(-1);
    cell.colSpan=4;
    var sCel2="<table width='100%'><tr>";
          sCel2+="<td width='33%' align='left'><a href='home.asp?IDLoja="+ IDLojaNum +"'><img src='"+ sCaminhoImages +"FbbBotContComprando.png' title='Continuar comprando' border='0'></a></td>";
          sCel2+="<td width='34%' align='center'><a href='#R' onclick='document.Lista.submit()'><img src='"+ sCaminhoImages +"FbbBotRecalcular.png' title='Recalcular' border='0'></a></td>";
          sCel2+="<td width='33%' align='right'><a href='#C' onclick='ComprarImg()'><img src='"+ sCaminhoImages +"FbbBotComprar.png' title='Comprar' border='0'></a></td>";
        sCel2+="</tr></table>";
    cell.innerHTML=sCel2;

  }catch(e){}
  try{document.getElementById("TabBotoes").style.display='none';}catch(e){}
}

function ComprarImg(){
  document.getElementsByName("Comprar")[0].click();
}

function ConfirmaPedido(botao){
  MostraAviso=false;
  botao.style.backgroundImage="url(/images/shim.gif)"
  botao.style.backgroundColor="#e4e4e3";
  botao.style.borderColor="#888888";
  botao.style.color="#555555";
  botao.value='Confirmando...';
  botao.setAttribute('disabled','true');
  Valida(document.Form1);
}

function ExibeBotaoConfirmaPedido(){
  var ConteudoTopoPagConfirmar=document.getElementById("idTopoConfirmarFC"); 
  if(ConteudoTopoPagConfirmar){
    ConteudoTopoPagConfirmar.innerHTML="<br>&nbsp;<br><br><center><input type=button name=btConfirmarPedido class='BotConfPed' value='Confirmar pedido  >>' onclick='ConfirmaPedido(this);'></center><br>&nbsp;";
  }
}

//### Função que abre janela de chat
function MostraChatP(){
 popup=window.open('ChatLogin.asp?IDLoja='+IDLoja,'Chat','top=20,left=20,height=280,width=390,scrollbars=no,resizable=yes');
 popup.focus();return void(0);
}

//### Função que mostra o máximo de parcela na home e na listagem principal de produtos
function MostraMaxParcela(PrecoProd,MaxParcelas){
  var ComSem;
  if(PrecoProd==0||MaxParcelas==1||Juros.length==0)return;
  if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
  if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem="<font color=#990000>&nbsp;sem&nbsp;juros</font>";
  document.write("ou&nbsp;<b>"+MaxParcelas+"x</b>"+ComSem+" de&nbsp;<b>"+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas))+"</b>");
}

function MostraParcelas(PrecoProd,MaxParcelas){
  var ComSem,EstiloLinha;
  if(PrecoProd==0||MaxParcelas==1||Juros.length==0)return;
  if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
  document.write("<br><table align=center cellpadding=3 cellspacing=1 bgcolor=#CECECE width=270><tr bgcolor=#dfdfdf><td colspan=3 height=22 class=TitTabParc align=center><b>Opções de parcelamento</td></tr><tr bgcolor=#FFFFFF><td class=TitTabParc>Parcelas</td><td align=right class=TitTabParc>Valor</td><td align=right class=TitTabParc>Total</td></tr>");
  for(var i=0;i<MaxParcelas;i++){
    if(Juros[i]>0)ComSem="com juros"; else ComSem="<font color=#990000>sem&nbsp;juros</font>";
    if((i%2)==0)EstiloLinha='EstParcPar'; else EstiloLinha='EstParcImpar';
    document.write("<tr class="+EstiloLinha+"><td class="+EstiloLinha+">"+(i+1)+"x "+ComSem+"</td><td class="+EstiloLinha+" align=right>"+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,i+1))+"</td><td class="+EstiloLinha+" align=right>"+FormatPrecoReais(CalculaParcelaJurosCompostos(PrecoProd,i+1)*(i+1))+"</td></tr>");
  }
  document.write("</table><br>");
}

//### Função para mostrar valor economizado em produtos em promoção
function MostraEconomia(PrecoProd,PrecoOri){
if(PrecoProd!=PrecoOri)document.write("<br><font color=#6f9e45>Economize <b>"+FormatPrice(PrecoOri-PrecoProd,'R$')+"</b> ("+FormatNum(((PrecoOri-PrecoProd)/PrecoOri)*100)+"%)</font>");
}

function FormatNum(num){
num=num.toString().replace(/\$|\,/g,'');
if(isNaN(num))num="0";
sign=(num==(num=Math.abs(num)));
num=Math.floor(num*100+0.50000000001);
num=Math.floor(num/100).toString();
for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
return ((sign)?'':'-')+num;
}
