//Inicial Data

let currentQuestion = 0; // variavel para armazenar a questao atual
let correctAnswers = 0; // variavel numero de resposta corretas

showQuestion(); //chamando a funcao 
//eventos

document.querySelector('.scoreArea button').addEventListener('click', resetEvent); //evento do botao resetar

//funcoes 



function showQuestion() { // funcao para mostar as questoes
    if (questions[currentQuestion]) {

        let q = questions[currentQuestion]; //armazenado a questao na variavel q
        let pct = Math.floor((currentQuestion / questions.length) * 100); // conta da barra de porcentagem 

        document.querySelector('.progress--bar').style.width = `${pct}%` // barra de progresso css

        document.querySelector('.scoreArea').style.display = 'none'; // sem nada
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question; //inserindo a questao no html

        let optionsHtml = ''; // zerando 
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}"class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`; // pasando as opcao das questoes
        }
        document.querySelector('.options').innerHTML = optionsHtml; // atribuido 

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })

    } else {
        //acabaram as questoes
        finishQuiz();

    }
}

function optionClickEvent(e) { //evento de click
    let clickedOption = parseInt(e.target.getAttribute('data-op')); // recebendo o numero do indice da resposta 
    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers = correctAnswers + 1; // acumuladora de acertos
    }

    currentQuestion = currentQuestion + 1; // pulando para proxima questao
    showQuestion();

}

function finishQuiz() { //final quiz

    let poits = Math.floor((correctAnswers / questions.length) * 100) // calculo de pontos 
    if (poits < 30) {

        document.getElementById("imagens").src = "img/3.gif";
        document.querySelector('.scoreText1').innerHTML = 'Tem estudar mais ! ';
        document.querySelector('.scorePct').style.color = '#FF0000';

    } else if (poits >= 30 && poits < 70) {
        document.getElementById("imagens").src = "img/2.gif";
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom ! ';
        document.querySelector('.scorePct').style.color = '#FFFF00';

    } else if (poits >= 70) {

        document.getElementById("imagens").src = "img/1.gif";
        document.querySelector('.scoreText1').innerHTML = 'Parabéns ';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }



    document.querySelector('.scorePct').innerHTML = `Acertou ${poits}%`; //imprimido a porcentagem no html
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`; // imprimindo  numero de acertos

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%` // se terminar as perguntas a barra vai preencher toda
}

function resetEvent() {

    correctAnswers = 0; //limpando os dados das resposta acerdadas
    currentQuestion = 0;
    showQuestion();
}