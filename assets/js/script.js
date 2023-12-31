const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOver = document.querySelector('.gameOver');
const startBtn = document.querySelector('.startBtn');
const restartBtn = document.querySelector('.restartBtn');

pipe.style.display = 'none';
restartBtn.style.display = 'none';

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

function startGame() {

    pipe.style.display = 'block';
    startBtn.style.display = 'none';

    const jump = () => {
        mario.classList.add('jump');

        // a classe jump só será removida depois que 500ml se passarem, ou seja, a animação ocorrer
        // assim a classe, juntamente com a animação, será adicionada ao gif do Mario
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }

    const loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft;
        // para conseguir pegar o bottom do Mario quando ele pular
        // replace para tirar o px da string
        // o + na frente de window transforma o resultado desse bottom em number
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'assets/imgs/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '58px';

            // nome de game over na tela
            gameOver.style.display = 'block';
            restartBtn.style.display = 'block';

            clearInterval(loop);
        }

    }, 10);

    // evento que vai ocorrer assim que a tecla é pressionada
    document.addEventListener('keydown', jump);
}

function restartGame() {
    startGame();
}