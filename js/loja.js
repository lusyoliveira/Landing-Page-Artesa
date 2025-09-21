const imagem = document.querySelectorAll('#imagecarrossel img');
const btnAnterior = document.getElementById('prevBtn');
const btnProximo = document.getElementById('nextBtn');
const btnComprar = document.querySelectorAll('.loja-produto-conteudo-comprar');
const btncupom = document.getElementById('btn-cupom');
const btnBuscaCep = document.getElementById('btn-busca-cep');
const spanTotalProdutos = document.getElementById('total-produtos')
const spanTotal = document.getElementById('total')
const spanDesconto = document.getElementById('desconto')
const spanFrete = document.getElementById('frete')
const carrinhoCompra = JSON.parse(localStorage.getItem('carrinho')) || [];
const pedidoResumo = JSON.parse(localStorage.getItem('pedido')) || [];

let currentIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('loja.html')) {
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
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('carrinho.html')) {

        //Mensagem de carrinho vazio
        if (carrinhoCompra.length === 0) {
            const carrinhoVazio = document.getElementById('carrinho-itens');

            carrinhoVazio.innerHTML = '';

            const mensagem = document.createElement('div');
            mensagem.classList.add('loja-carrinho-vazio');
            mensagem.textContent = 'Seu carrinho está vazio.';
            carrinhoVazio.appendChild(mensagem);    
        }

        //Aplica desconto do cupom
        btncupom.addEventListener('click', (evento) => {
            evento.preventDefault();
            aplicarCupom();
            calculaPedido();
        })

        //Aplica frete
        btnBuscaCep.addEventListener('click', (evento) => {
            evento.preventDefault();
            aplicarFrete();
            calculaPedido();
        })        
        carregaProdutos(carrinhoCompra)
    }
});


//Adiciona item ao carrinho
btnComprar.forEach((botao) => {

    botao.addEventListener('click', (evento) => {
        evento.preventDefault(); 
    
        const detalhes = botao.closest('#detalhes-produto');

        const descricao = detalhes.querySelector('h3').textContent;
        const preco = detalhes.querySelector('.loja-produtos-detalhes strong').textContent;
        const imagemProduto = detalhes.querySelector('img').src

        const item = {
            produto: descricao,
            quantidade: 1,
            valor: preco.replace(',', '.'),
            valorTotal: preco.replace(',', '.'),
            imagem: imagemProduto
        }
        carrinhoCompra.push(item)
        localStorage.setItem('carrinho', JSON.stringify(carrinhoCompra))          
       
        localStorage.setItem('pedido', JSON.stringify({    
            frete: 0, 
            desconto: 0, 
            totalProdutos: somarProdutos(carrinhoCompra), 
            total: somarProdutos(carrinhoCompra) 
        }));


         if (window.location.pathname.endsWith('loja.html')) {
            setTimeout(() => {
                window.location.href = 'loja/carrinho.html';
            }, 200);
         }
        setTimeout(() => {
            window.location.href = '../loja/carrinho.html';
        }, 200);      
    })
});

function carregaProdutos(listaProdutos) {
    const linhaTabela = document.getElementById('carrinho');

    if (!linhaTabela) return;
    linhaTabela.innerHTML = '';      

    listaProdutos.forEach((produto, index) => {
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
    
    const tdValor = document.createElement('td')
    tdValor.textContent = produto.valorTotal
    tdValor.classList.add('text-center')

    const btnAumentar = document.createElement('button')   
    btnAumentar.setAttribute ('title', 'Aumentar Quantidade')
    btnAumentar.onclick = () => {
        let valorcontador = parseInt(inputQuantidade.value) || 0;
        const precoProduto = carrinhoCompra[index].valor 
        let novoValor = 0

        valorcontador += 1;
        inputQuantidade.value = valorcontador;

        novoValor = parseFloat(precoProduto) * parseFloat(valorcontador)
        carrinhoCompra[index].valorTotal = novoValor;
        carrinhoCompra[index].quantidade = valorcontador;
        tdValor.textContent = novoValor;
        localStorage.setItem('carrinho', JSON.stringify(carrinhoCompra));

        pedidoResumo.totalProdutos =  somarProdutos(carrinhoCompra)
        localStorage.setItem('pedido', JSON.stringify(pedidoResumo));
        calculaPedido()
    };

    const iconeAumentar = document.createElement('i')
    iconeAumentar.classList.add('bi','bi-plus-lg')

    const btnDiminuir = document.createElement('button')   
    btnDiminuir.setAttribute ('title', 'Diminuir Quantidade')   
    btnDiminuir.onclick  = () => {
        let valorcontador = parseInt(inputQuantidade.value) || 0;
        const precoProduto = carrinhoCompra[index].valor 
        let novoValor = 0

        if (valorcontador > 0) {
            valorcontador -= 1;
            inputQuantidade.value = valorcontador;
        }

        if (valorcontador === 0) {
            carrinhoCompra.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinhoCompra));
            carregaProdutos(carrinhoCompra);
            contarProdutos();

            pedidoResumo.totalProdutos =  somarProdutos(carrinhoCompra)
            localStorage.setItem('pedido', JSON.stringify(pedidoResumo));
            calculaPedido();
            return;
        }
        novoValor = parseFloat(precoProduto) * valorcontador
        carrinhoCompra[index].valorTotal = novoValor
        carrinhoCompra[index].quantidade = valorcontador;
        tdValor.textContent = novoValor;
        localStorage.setItem('carrinho', JSON.stringify(carrinhoCompra));

        pedidoResumo.totalProdutos =  somarProdutos(carrinhoCompra)
        localStorage.setItem('pedido', JSON.stringify(pedidoResumo));
        calculaPedido()
    };

    const iconeDiminuir = document.createElement('i')
    iconeDiminuir.classList.add('bi', 'bi-dash-lg')

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

function somarProdutos(listaProdutos) {
    let soma = 0;

    listaProdutos.forEach(produto => {
        soma += parseFloat(produto.valorTotal) || 0;
    });

    return soma.toFixed(2);
};

function contarProdutos() {
    const quantidade = carrinhoCompra.length
    const divQuantidade = document.getElementById('carrinho-quantidade')
    
    if (quantidade > 0) {
        divQuantidade.textContent = quantidade; 
        divQuantidade.style.display = 'block';                                    
    } else {
        divQuantidade.style.display = 'none';
    } 
};

function calculaPedido() {
    const valorProdutos = parseFloat(pedidoResumo.totalProdutos) || 0;
    const valorDesconto = parseFloat(pedidoResumo.desconto) || 0;
    const valorFrete = parseFloat(pedidoResumo.frete) || 0;

    const totalPedido = (valorProdutos + valorFrete - valorDesconto).toFixed(2);
    pedidoResumo.total = totalPedido;
    localStorage.setItem('pedido', JSON.stringify(pedidoResumo));

    spanDesconto.textContent = valorDesconto.toFixed(2);
    spanFrete.textContent = valorFrete.toFixed(2);
    spanTotal.textContent = totalPedido;
    spanTotalProdutos.textContent = valorProdutos.toFixed(2);
};

function aplicarCupom() {
    const cupom = document.querySelectorAll('.loja-carrinho-menulateral-conteudo p');
    const inputCupom = document.getElementById('cupom').value;
    const spanDesconto = document.getElementById('desconto')
    const valorDesconto = parseFloat(5).toFixed(2) || 0.00;

    if (inputCupom.toUpperCase() === 'PRIMEIRACOMPRA') {
        cupom.textContent = 'desconto aplicado';
        spanDesconto.textContent = valorDesconto;
        pedidoResumo.desconto = valorDesconto;
        localStorage.setItem('pedido', JSON.stringify(pedidoResumo))  
        inputCupom.value = ''  
    } else {
        spanDesconto.textContent = '0.00';
    }
};

function aplicarFrete() {
    const spanfrete = document.getElementById('frete')
    const inputCEP = document.getElementById('cep').value;
    const valorFrete = parseFloat(10).toFixed(2) || 0.00;

    if (inputCEP.length === 8) {
        spanfrete.textContent = valorFrete;
        pedidoResumo.frete = valorFrete;
        localStorage.setItem('pedido', JSON.stringify(pedidoResumo))
        inputCEP.value = ''                                     
    } else {
        spanfrete.textContent = '0.00';
    }    
};

contarProdutos();