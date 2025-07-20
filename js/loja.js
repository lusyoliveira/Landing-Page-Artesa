const imagem = document.querySelectorAll('#imagecarrossel img');
const btnAnterior = document.getElementById('prevBtn');
const btnProximo = document.getElementById('nextBtn');
const btnComprar = document.querySelectorAll('.loja-novidades-comprar');
const btncupom = document.getElementById('btn-cupom');
const btnBuscaCep = document.getElementById('btn-busca-cep');
const menuLoja = document.getElementById('menu-loja');
const spanTotalProdutos = document.getElementById('total-produtos')
const spanTotal = document.getElementById('total')
const spanDesconto = document.getElementById('desconto')
const spanFrete = document.getElementById('frete')
const carrinhoCompra = JSON.parse(localStorage.getItem('carrinho')) || [];
const pedidoResumo = JSON.parse(localStorage.getItem('pedido')) || [];

let currentIndex = 0;

menuLoja.style.display = 'flex';

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('carrinho.html')) {
    carregaProdutos(carrinhoCompra)

    // totalProdutos.textContent = somarProdutos(carrinhoCompra)
    // total.textContent = calculaPedido() 

    //Aplica desconto do cupom
    btncupom.addEventListener('click', (evento) => {
        evento.preventDefault();
        aplicarCupom();
    })

    //Aplica frete
    btnBuscaCep.addEventListener('click', (evento) => {
        evento.preventDefault();
        aplicarFrete();
    })
    }
});

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
        localStorage.setItem('pedido', JSON.stringify({ frete: 0, 
                                                        desconto: 0, 
                                                        totalProdutos: somarProdutos(carrinhoCompra), 
                                                        total: somarProdutos(carrinhoCompra) 
                                                    }))      
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

        calculaPedido()
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
    //fazer multiplicação do valor do produto pela quantidade
};

function somarProdutos(listaProdutos) {
    let soma = 0;

    listaProdutos.forEach(produto => {
        soma += parseFloat(produto.valor.replace(',', '.')) || 0;
    });

    return soma.toFixed(2);
};

function calculaPedido() {
    spanDesconto.textContent = pedidoResumo.desconto
    spanFrete.textContent = pedidoResumo.frete
    spanTotal.textContent = pedidoResumo.total
    spanTotalProdutos.textContent = pedidoResumo.totalProdutos
};

function aplicarCupom() {
    const cupom = document.querySelectorAll('.loja-carrinho-menulateral-conteudo p');
    const inputCupom = document.getElementById('cupom').value;
    const desconto = document.getElementById('desconto')
    const valorDesconto = parseFloat(5) || 0;

    let valorFrete = pedidoResumo.frete
    let valorTotalProdutos = pedidoResumo.totalProdutos

    if (inputCupom === 'PRIMEIRACOMPRA') {
        cupom.textContent = 'desconto aplicado';
        desconto.textContent = valorDesconto.toFixed(2);
        localStorage.setItem('pedido', JSON.stringify({ frete: valorFrete, 
                                                        desconto: valorDesconto.toFixed(2),
                                                        totalProdutos: valorTotalProdutos,
                                                        total: (valorTotalProdutos - valorDesconto + valorFrete).toFixed(2) 
                                                    }));
        inputCupom.value = ''  
    } else {
        desconto.textContent = '0.00';
    }
};

function aplicarFrete() {
    const frete = document.getElementById('frete')
    const inputFrete = document.getElementById('cep').value;
    const valorFrete = parseFloat(10) || 0;

    let valorDesconto = pedidoResumo.desconto
    let valorTotalProdutos = pedidoResumo.totalProdutos

    if (inputFrete.length === 8) {
        frete.textContent = valorFrete.toFixed(2);
        localStorage.setItem('pedido', JSON.stringify({ frete: valorFrete.toFixed(2), 
                                                        desconto: valorDesconto,
                                                        totalProdutos: valorTotalProdutos,
                                                        total: (valorTotalProdutos - valorDesconto + valorFrete).toFixed(2) 
                                                    }));
        inputFrete.value = ''                                     
    } else {
        frete.textContent = '0.00';
    }    
}

