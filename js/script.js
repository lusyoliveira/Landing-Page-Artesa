const menuLoja = document.querySelector('.menu-loja');
menuLoja.style.display = 'none';

const footer = document.getElementsByClassName('footer-direitos')
const data = new Date()
footer[0].innerHTML = `&copy; ${data.getFullYear()} Luciene Oliveirart - Todos os direitos reservados.`
