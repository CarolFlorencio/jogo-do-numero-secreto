let listaNumerosSorteados = []
let limite = 10
let numeroSecreto = gerarNumeroSecreto()
let contador = 1
exibirMenssagemTela()

function exibirTextoNaTela(tag, texto){
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2})
}

function gerarNumeroSecreto(){
    numeroEscolhido = parseInt(Math.random() * limite + 1);

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        if( listaNumerosSorteados.length == Math.round(limite/2)){
            listaNumerosSorteados = []
        }
        return gerarNumeroSecreto();
    }
    else{
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function exibirMenssagemTela(){
    exibirTextoNaTela('h1','Jogo do número secreto' );
    exibirTextoNaTela('p','Digite um número entre 1 e 10:');
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);
    console.log(numeroSecreto);
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Parabém você venceu o jogo do número secreto' );
        let palavraTentativa = contador > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${contador} ${palavraTentativa}!`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chute').setAttribute('disabled', true)
    }
    else{
        contador++;
        valor = chute > numeroSecreto ? 'menor': 'maior'
        let mensagemDica = `Tente um número ${valor}.`
        exibirTextoNaTela('p',mensagemDica);
        limparCampo()
        document.getElementById('reiniciar').setAttribute('disabled', true)
    }

}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroSecreto()
    contador = 1
    limparCampo()
    document.getElementById('chute').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true)
    exibirMenssagemTela()
}