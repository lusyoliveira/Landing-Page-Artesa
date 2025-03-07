// <!-- bloqueios inicio-->
//<!-- Bloquear botão direito do mouse -->
     
// function click() {       
// if (event.button==2||event.button==3) {       
// oncontextmenu=&#39;return false&#39;;       
// }       
// }       
// document.onmousedown=click       
// document.oncontextmenu = new Function(&quot;return false;&quot;)       


// //<!--Bloquear seleção de texto -->
      
// function click() {       
// if (event.button==2||event.button==3) {       
// oncontextmenu=&#39;return false&#39;;       
// }       
// }       
// document.onmousedown=click       
// document.oncontextmenu = new Function(&quot;return false;&quot;)       

// function bloquear(e){return false}
// function desbloquear(){return true}
// document.onselectstart=new Function (&quot;return false&quot;)
// if (window.sidebar){document.onmousedown=bloquear
// document.onclick=desbloquear}

//Contador
const dataAlvo = new Date("Apr 29, 2025 00:04:25").getTime();
const intervalo = setInterval(() => {
    const dataAtual = new Date().getTime();
    const tempoRestante = dataAlvo - dataAtual;

    if (tempoRestante <= 0) {
        clearInterval(intervalo);
        return;
    }

    const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

    document.querySelector("#dias").innerHTML = dias;
    document.querySelector("#horas").innerHTML = horas;
    document.querySelector("#minutos").innerHTML = minutos;
    document.querySelector("#segundos").innerHTML = segundos;
}, 1000)

//carrosel
let imagens = document.querySelectorAll('imgCarrossel')

let imagemPrincipal = document.querySelector('#imgPrincipal')

imagens.forEach((imagem) => {
    imagem.addEventListener("click", (event)=> {
        imagemPrincipal.src = event.target.src;
    })
})

function carregarPagina(pagina) {
    fetch(pagina)
        .then(response => response.text())
        .then(data => {
            document.getElementById("conteudo").innerHTML = data;
        })
        .catch(error => console.error("Erro ao carregar a página:", error));
}
