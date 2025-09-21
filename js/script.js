document.addEventListener("DOMContentLoaded", () => {
  // 1) esconder menu-loja só se existir (evita TypeError)
  const menuLoja = document.querySelector('.menu-loja');
  if (menuLoja) menuLoja.style.display = 'none';

  // 2) rodapé (seguro)
  const footer = document.querySelector('.footer-direitos');
  if (footer) footer.innerHTML = `&copy; ${new Date().getFullYear()} Luciene Oliveirart - Todos os direitos reservados.`;

  // 3) botao e menu lateral
  const botao = document.querySelector(".menu-toggle-button");
  const menuLateral = document.querySelector(".menu-lateral");

  // 4) se o menu-lateral estiver vazio, clone os links do menu desktop
  if (menuLateral) {
    const desktopLinks = document.querySelectorAll('.menu-lista-link');
    if (desktopLinks.length && menuLateral.children.length === 0) {
      desktopLinks.forEach(a => {
        const clone = a.cloneNode(true);
        // removemos a classe que é escondida no mobile e adicionamos uma específica
        clone.classList.remove('menu-lista-link');
        clone.classList.add('menu-lateral-link');
        menuLateral.appendChild(clone);
      });
    }
  }

  // 5) overlay e controle de abertura/fechamento
  function ensureOverlay() {
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', closeMenu);
    }
    return overlay;
  }
  function openMenu() {
    if (!menuLateral) return;
    menuLateral.classList.add('ativo');
    if (botao) botao.setAttribute('aria-expanded', 'true');
    ensureOverlay().classList.add('active');
  }
  function closeMenu() {
    if (!menuLateral) return;
    menuLateral.classList.remove('ativo');
    if (botao) botao.setAttribute('aria-expanded', 'false');
    const ov = document.querySelector('.menu-overlay');
    if (ov) ov.classList.remove('active');
  }

  if (botao && menuLateral) {
    botao.setAttribute('aria-expanded', 'false');
    botao.addEventListener('click', (e) => {
      e.stopPropagation();
      menuLateral.classList.toggle('ativo');
      const opened = menuLateral.classList.contains('ativo');
      botao.setAttribute('aria-expanded', opened ? 'true' : 'false');
      if (opened) ensureOverlay().classList.add('active');
      else {
        const ov = document.querySelector('.menu-overlay');
        if (ov) ov.classList.remove('active');
      }
    });

    // fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuLateral.classList.contains('ativo')) closeMenu();
    });

    // fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!menuLateral.contains(e.target) && !botao.contains(e.target) && menuLateral.classList.contains('ativo')) {
        closeMenu();
      }
    });
  }
});
