//Slider
const imagem = document.querySelectorAll('#imagecarrossel img');
const btnAnterior = document.getElementById('prevBtn');
const btnProximo = document.getElementById('nextBtn');
const menuLoja = document.getElementById('menu-loja');
const btnComprar = document.querySelectorAll('.loja-novidades-comprar');
const carrinhoCompra = JSON.parse(localStorage.getItem('carrinho')) || [];

let currentIndex = 0;

menuLoja.style.display = 'flex';

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('carrinho.html')) {
    carregaProdutos(carrinhoCompra)
}
});

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

//Adiciona item ao carrinho
btnComprar.forEach((botao) => {

    botao.addEventListener('click', (evento) => {
        evento.preventDefault(); 
    
        const detalhes = botao.closest('.loja-novidades-produto-detalhes');

        const descricao = detalhes.querySelector('h3').textContent;
        const preco = detalhes.querySelector('.loja-novidades-preco strong').textContent;
        const imagemProduto = detalhes.querySelector('img').src

        const item = {
            produto: descricao,
            quantidade: 1,
            valor: preco,
            imagem: imagemProduto
        }
        carrinhoCompra.push(item)
        localStorage.setItem('carrinho', JSON.stringify(carrinhoCompra))    
    })
});

function carregaProdutos(listaProdutos) {
    const linhaTabela = document.getElementById('carrinho');
    if (!linhaTabela) return;

    linhaTabela.innerHTML = '';      
            
        listaProdutos.forEach(produto => {
        const tr = document.createElement('tr')
        const tdProduto = document.createElement('td')
        const divProduto = document.createElement('div')
        divProduto.classList.add('loja-carrinho-produto')

        const imgProduto = document.createElement('img')
        imgProduto.setAttribute('src', produto.imagem)

        const descricaoProduto = document.createElement('p')
        descricaoProduto.textContent = produto.produto

        const tdQuantidade = document.createElement('td')
        const divQuantidade = document.createElement('div')
        divQuantidade.classList.add('loja-carrinho-quantidade')
     
        const inputQuantidade  = document.createElement('input')
        inputQuantidade.setAttribute ('type', 'text')
        inputQuantidade.setAttribute ('id', 'quantidade')
        inputQuantidade.setAttribute ('value', produto.quantidade)

        const btnAumentar = document.createElement('button')
        btnAumentar.onclick = () => aumentaQuantidade(inputQuantidade)

        const iconeAumentar = document.createElement('i')
        iconeAumentar.classList.add('bi', 'bi-dash-lg')
        iconeAumentar.setAttribute ('id', 'aumentar')

        const btnDiminuir = document.createElement('button')    
        btnDiminuir.onclick  = () => diminuiQuantidade(inputQuantidade,produto.descricao)

        const iconeDiminuir = document.createElement('i')
        iconeDiminuir.classList.add('bi', 'bi-plus-lg')
        iconeDiminuir.setAttribute('id','diminuir')
  
        const tdValor = document.createElement('td')
        tdValor.textContent = produto.valor
        tdValor.classList.add('text-center')

        divProduto.appendChild(imgProduto)
        divProduto.appendChild(descricaoProduto)
        tdProduto.appendChild(divProduto)

        btnAumentar.appendChild(iconeAumentar)
        btnDiminuir.appendChild(iconeDiminuir)
        divQuantidade.appendChild(btnDiminuir)
        divQuantidade.appendChild(inputQuantidade)
        divQuantidade.appendChild(btnAumentar)
        tdQuantidade.appendChild(divQuantidade)

        tr.appendChild(tdProduto)
        tr.appendChild(tdQuantidade)
        tr.appendChild(tdValor)

        linhaTabela.appendChild(tr)
    });
    
};

function aumentaQuantidade(elementoInput) {    
    let valorcontador = parseInt(elementoInput.value) || 0; 
    
    valorcontador += 1;
    inputContador.value = valorcontador;
    atualizarQuantidade()
    carregaProdutos()
};

function diminuiQuantidade(elementoInput, produto) {
    let valorcontador = parseInt(elementoInput.value) || 0;
    
   if (valorcontador > 0) {
        valorcontador -= 1;
        inputContador.value = valorcontador;
        atualizarQuantidade()
        carregaProdutos()
    } else if (valorcontador = 0) {
        carrinhoCompra.removeItem(produto)
        atualizarQuantidade()
        carregaProdutos()
    }
};

function atualizarQuantidade() {
    localStorage.setItem('quantidade', novaValor)
};