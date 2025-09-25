document.addEventListener("DOMContentLoaded", () => {
//menu loja
const menuLoja = document.querySelector('.menu-lista-loja');
menuLoja.style.display = 'none';

//rodapé 
const footer = document.querySelector('.footer-direitos');
  if (footer) footer.innerHTML = `&copy; ${new Date().getFullYear()} Luciene Oliveirart - Todos os direitos reservados.`;

});
