const imagem = document.querySelectorAll('#imagecarrossel img');
const btnAnterior = document.getElementById('prevBtn');
const btnProximo = document.getElementById('nextBtn');
const btnComprar = document.querySelectorAll('.loja-novidades-comprar');
const btncupom = document.getElementById('btn-cupom');
const menuLoja = document.getElementById('menu-loja');
const totalProdutos = document.getElementById('total-produtos')
const total = document.getElementById('total')
const carrinhoCompra = JSON.parse(localStorage.getItem('carrinho')) || [];

let currentIndex = 0;

menuLoja.style.display = 'flex';

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('carrinho.html')) {
    carregaProdutos(carrinhoCompra)

    totalProdutos.textContent = somarProdutos(carrinhoCompra)
    total.textContent = calculaPedido() 
}
});

//Aplica desconto do cupom
btncupom.addEventListener('click', (evento) => {
    evento.preventDefault();
    aplicaCupom();
})

//Carrossel
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
        inputQuantidade.setAttribute ('value', produto.quantidade)

        const btnAumentar = document.createElement('button')   
        btnAumentar.setAttribute ('title', 'Aumentar Quantidade')
        btnAumentar.onclick = () => aumentaQuantidade(inputQuantidade)

        const iconeAumentar = document.createElement('i')
        iconeAumentar.classList.add('bi','bi-plus-lg')

        const btnDiminuir = document.createElement('button')   
        btnDiminuir.setAttribute ('title', 'Diminuir Quantidade')   
        btnDiminuir.onclick  = () => diminuiQuantidade(inputQuantidade,produto.descricao)

        const iconeDiminuir = document.createElement('i')
        iconeDiminuir.classList.add('bi', 'bi-dash-lg')
  
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

function somarProdutos(listaProdutos) {
    let soma = 0;

    listaProdutos.forEach(produto => {
        soma += parseFloat(produto.valor.replace(',', '.')) || 0;
    });

    return soma.toFixed(2);
};

function calculaPedido() {
    const desconto = document.getElementById('desconto').textContent
    const frete = document.getElementById('frete').textContent

    let soma = 0
    let valorProdutos = somarProdutos(carrinhoCompra)
    let freteConvertido = parseFloat(frete)
    let descontoConvertido = parseFloat(desconto)

    soma = freteConvertido + parseFloat(valorProdutos) - descontoConvertido

    return soma.toFixed(2);
};

function aplicaCupom() {
    const cupom = document.querySelectorAll('.loja-carrinho-menulateral-conteudo p');
    const inputCupom = document.getElementById('cupom').value;
    const desconto = document.getElementById('desconto')
    const valorDesconto = parseFloat(5) || 0;

    if (inputCupom === 'PRIMEIRACOMPRA') {
        cupom.textContent = inputCupom
        desconto.textContent = valorDesconto.toFixed(2);
        total.textContent = somarProdutos(carrinhoCompra);
        calculaPedido();
    } else {
        desconto.textContent = '0.00';
    }
}

