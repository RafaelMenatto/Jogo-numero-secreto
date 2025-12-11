let listaDeNumerosSorteados = []; 
let numeroLimite= 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
 let campo = document.querySelector(tag);
 campo.innerHTML = texto;
  if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial(){
exibirTextoNaTela('h1', 'Jogo do numero secreto');
exibirTextoNaTela('p', 'Escolha um numero entre 1 á 10');
}


function verificarChute(){
    let chute = document.querySelector('input').value;
   // console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1' , 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' :'tentativa';
        let mensagemTentativas= `Parabéns você descobriu com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas );
        document.getElementById('reiniciar').removeAttribute('disabled')
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O numero é menor');
         }else{
            exibirTextoNaTela('p', 'O numero é maior');
         }
    
         tentativas++;
         limparCampo();
        }

    }

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() *numeroLimite +1 );
  let quantidadeDeELementosNaLista = listaDeNumerosSorteados.length;
  if(quantidadeDeELementosNaLista == numeroLimite ){
    listaDeNumerosSorteados= [];

  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
  }else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
    
  }
  //console.log(chute == numeroSecreto);
  }
   function limparCampo() {
    chute = document.querySelector('input');
    chute.value= '';
}
function reiniciarJogo() {
    numeroSecreto== gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)

}