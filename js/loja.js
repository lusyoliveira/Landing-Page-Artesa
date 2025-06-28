//Slider
const imagem = document.querySelectorAll('#imagecarrossel img');
const btnAnterior = document.getElementById('prevBtn');
const btnProximo = document.getElementById('nextBtn');
let currentIndex = 0;

btnAnterior.addEventListener('click', () => {
    imagem[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === 0) ? imagem.length - 1 : currentIndex - 1;
    imagem[currentIndex].classList.add('active');
});

btnProximo.addEventListener('click', () => {
    imagem[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === imagem.length - 1) ? 0 : currentIndex + 1;
    imagem[currentIndex].classList.add('active');
});

setInterval(() => {
    imagem[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === imagem.length - 1) ? 0 : currentIndex + 1;
    imagem[currentIndex].classList.add('active');
}, 5000);

