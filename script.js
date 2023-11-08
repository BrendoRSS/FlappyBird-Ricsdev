const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,
  atualizar() {
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },
  desenhar() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX, flappyBird.spriteY, // Sprite X e Sprite Y
      flappyBird.largura, flappyBird.altura, //tamanho do recorte
      flappyBird.x, flappyBird.y, //posição
      flappyBird.largura, flappyBird.altura // tamanho que quero que desenhe
    );
  }
}
//PlanoDeFundo]
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenhar() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

// [Chao]
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenhar() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  },
};

//[Tela de início]

const teladeInicio = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: (canvas.width/2) - 172 / 2,
  y: 50,
  desenhar() {
    contexto.drawImage(
      sprites,
      teladeInicio.spriteX, teladeInicio.spriteY,
      teladeInicio.largura, teladeInicio.altura,
      teladeInicio.x, teladeInicio.y,
      teladeInicio.largura, teladeInicio.altura,
    );
  },
};
//
// [Telas]
//
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;
}

const Telas = {
  INICIO: {
    desenhar() {
      planoDeFundo.desenhar();
      chao.desenhar();
      flappyBird.desenhar();
      teladeInicio.desenhar();
    },
    click(){
      mudaParaTela(Telas.JOGO)
    },
    atualizar() {
    }
  },
  JOGO: {
    desenhar() {
      planoDeFundo.desenhar()
      chao.desenhar()
      flappyBird.desenhar()
    },
    atualizar() {
      flappyBird.atualizar()
    }
  }
};


function loop() {
  telaAtiva.desenhar();
  telaAtiva.atualizar();

  requestAnimationFrame(loop);//desenhar quadros
}
window.addEventListener("click", function(){
  if (telaAtiva.click){
    telaAtiva.click()
  }
})
mudaParaTela(Telas.INICIO);
loop();
