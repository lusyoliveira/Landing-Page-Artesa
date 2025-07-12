//Slider
const imagem = document.querySelectorAll('#imagecarrossel img');
const btnAnterior = document.getElementById('prevBtn');
const btnProximo = document.getElementById('nextBtn');
const menuLoja = document.getElementById('menu-loja');
const btnComprar = document.querySelector('.loja-novidades-comprar');

let currentIndex = 0;

menuLoja.style.display = 'flex';

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

btnComprar.addEventListener('click', (event) => {
    event.preventDefault(); 

    const botaoClicado = event.currentTarget;
    const produto = botaoClicado.closest('.loja-novidades-produto-detalhes');

    const titulo = produto.querySelector('h3')?.textContent.trim();
    const preco = produto.querySelector('p')?.textContent.trim();

    console.log(`Produto: ${titulo} - Preço: ${preco}`);
})