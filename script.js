window.onload = function () {
  let pontos = 0;
  let tempo = 20;
  let jogoAtivo = true;
  let cronometro;

  const quadrado = document.getElementById("quadrado");
  const pontuacao = document.getElementById("pontos");
  const tempoRestante = document.getElementById("tempo");
  const mensagem = document.getElementById("mensagem");
  const botaoReiniciar = document.getElementById("reiniciar");
  const recordeSpan = document.getElementById("recorde");

  // Carregar recorde do localStorage
  let recorde = localStorage.getItem("recorde") || 0;
  recordeSpan.innerText = recorde;

  function moverQuadrado() {
    const largura = window.innerWidth - 100;
    const altura = window.innerHeight - 100;

    const x = Math.floor(Math.random() * largura);
    const y = Math.floor(Math.random() * altura);

    quadrado.style.left = x + "px";
    quadrado.style.top = y + "px";
  }

  function iniciarJogo() {
    pontos = 0;
    tempo = 20;
    jogoAtivo = true;

    pontuacao.innerText = pontos;
    tempoRestante.innerText = tempo;
    mensagem.innerText = "";
    botaoReiniciar.style.display = "none";
    quadrado.style.display = "block";

    moverQuadrado();

    cronometro = setInterval(() => {
      tempo--;
      tempoRestante.innerText = tempo;

      if (tempo <= 0) {
        clearInterval(cronometro);
        jogoAtivo = false;
        quadrado.style.display = "none";

        // Verifica se o jogador bateu o recorde
        if (pontos > recorde) {
          recorde = pontos;
          localStorage.setItem("recorde", recorde);
          recordeSpan.innerText = recorde;
          mensagem.innerText = `🎉 Novo Recorde! Pontuação: ${pontos}`;
        } else {
          mensagem.innerText = `⏰ Game Over! Pontuação final: ${pontos}`;
        }

        botaoReiniciar.style.display = "inline-block";
      }
    }, 1000);
  }

  quadrado.addEventListener("click", () => {
    if (!jogoAtivo) return;
    pontos += 1;
    pontuacao.innerText = pontos;
    moverQuadrado();
  });

  botaoReiniciar.addEventListener("click", iniciarJogo);

  alert("Bem-vindo ao jogo 'Clique no Quadrado'!");
  console.log("Jogo carregado!");

  iniciarJogo();
};
