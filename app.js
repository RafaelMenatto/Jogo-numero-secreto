let listaDeNumerosSorteados = []; // Lista que armazena os números que já foram sorteados para não repetirem
let numeroLimite= 10; // Número máximo permitido no jogo (de 1 a 10)
let numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto inicial chamando a função gerarNumeroAleatorio()
let tentativas = 1; // Contador de tentativas do jogador, começa em 1
exibirMensagemInicial(); // Exibe a mensagem inicial (título e instruções) ao carregar a página

function exibirTextoNaTela(tag, texto){ // Função que escreve um texto em um elemento da página e fala ele em voz alta
 let campo = document.querySelector(tag); // Seleciona o elemento HTML correspondente à tag passada (ex: 'h1', 'p')
 campo.innerHTML = texto; // Insere o texto dentro do elemento selecionado
  if ('speechSynthesis' in window) { // Verifica se o navegador suporta a API de síntese de voz (fala)
        let utterance = new SpeechSynthesisUtterance(texto); // Cria um objeto que representa a fala do texto
        utterance.lang = 'pt-BR'; // Define o idioma da fala como português do Brasil
        utterance.rate = 1; // Define a velocidade da fala (1 = velocidade normal)
        window.speechSynthesis.speak(utterance); // Manda o navegador falar o texto em voz alta
    } else { // Se o navegador não suportar fala...
        console.log("Web Speech API não suportada neste navegador."); // ...mostra um aviso no console
    }
}
function exibirMensagemInicial(){ // Função que exibe as mensagens iniciais do jogo
exibirTextoNaTela('h1', 'Jogo do numero secreto'); // Escreve o título do jogo no elemento h1
exibirTextoNaTela('p', 'Escolha um numero entre 1 á 10'); // Escreve a instrução no parágrafo (p)
}


function verificarChute(){ // Função que verifica se o chute do jogador acertou o número secreto
    let chute = document.querySelector('input').value; // Pega o valor digitado no campo de input da página
   // console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) { // Verifica se o chute é igual ao número secreto
        exibirTextoNaTela('h1' , 'Acertou!'); // Se acertou, escreve "Acertou!" no título
        let palavraTentativa = tentativas > 1 ? 'tentativas' :'tentativa'; // Escolhe a palavra "tentativas" (plural) ou "tentativa" (singular) conforme o total
        let mensagemTentativas= `Parabéns você descobriu com ${tentativas} ${palavraTentativa}`; // Monta a frase com a quantidade de tentativas usadas
        exibirTextoNaTela('p', mensagemTentativas ); // Exibe a frase de parabéns no parágrafo
        document.getElementById('reiniciar').removeAttribute('disabled') // Habilita o botão "Novo jogo" removendo o atributo disabled
    }else{ // Se não acertou...
        if (chute > numeroSecreto){ // Se o chute for maior que o número secreto...
            exibirTextoNaTela('p','O numero é menor'); // ...informa que o número secreto é menor
         }else{ // Caso contrário (chute menor)...
            exibirTextoNaTela('p', 'O numero é maior'); // ...informa que o número secreto é maior
         }
    
         tentativas++; // Aumenta o contador de tentativas
         limparCampo(); // Limpa o campo de input para o jogador digitar de novo
        }

    }

function gerarNumeroAleatorio() { // Função que gera um número aleatório entre 1 e o limite
  let numeroEscolhido = parseInt(Math.random() *numeroLimite +1 ); // Gera um número inteiro aleatório entre 1 e numeroLimite (10)
  let quantidadeDeELementosNaLista = listaDeNumerosSorteados.length; // Conta quantos números já foram sorteados
  if(quantidadeDeELementosNaLista == numeroLimite ){ // Se todos os números possíveis já foram sorteados...
    listaDeNumerosSorteados= []; // ...zera a lista para poder sortear de novo

  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)){ // Se o número gerado já está na lista de sorteados...
    return gerarNumeroAleatorio(); // ...chama a função de novo para sortear outro número
  }else{ // Senão...
    listaDeNumerosSorteados.push(numeroEscolhido); // ...adiciona o número à lista
    console.log(listaDeNumerosSorteados); // Mostra a lista no console para acompanhamento
    return numeroEscolhido; // Retorna o número sorteado
    
  }
  //console.log(chute == numeroSecreto);
  }
   function limparCampo() { // Função que limpa o campo de input
    chute = document.querySelector('input'); // Seleciona o campo de input
    chute.value= ''; // Esvazia o valor do campo
}
function reiniciarJogo() { // Função que reinicia o jogo
    numeroSecreto== gerarNumeroAleatorio(); // Gera um novo número secreto (usa == por engano, deveria ser =)
    limparCampo(); // Limpa o campo de input
    tentativas = 1; // Reinicia o contador de tentativas
    exibirMensagemInicial(); // Mostra as mensagens iniciais novamente
    document.getElementById('reiniciar').setAttribute('disabled', true) // Desabilita o botão "Novo jogo" até acertar novamente

}