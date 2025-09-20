const menuLoja = document.querySelector('.menu-loja');
menuLoja.style.display = 'none';

const footer = document.getElementsByClassName('footer-direitos')
const data = new Date()
footer[0].innerHTML = `&copy; ${data.getFullYear()} Luciene Oliveirart - Todos os direitos reservados.`

//Menu
document.addEventListener("DOMContentLoaded", function () {
  const botao = document.querySelector(".menu-toggle-button");
  const menuLateral = document.querySelector(".menu-lateral");

  botao.addEventListener("click", function () {
    menuLateral.classList.toggle("ativo");
  });
});