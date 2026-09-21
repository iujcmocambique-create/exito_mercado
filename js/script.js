// ÊXITO MERCADO — script principal
// A navegação responsiva (menu hamburger) é tratada pelo próprio
// Bootstrap (bootstrap.bundle.min.js) através dos atributos data-bs-*
// já presentes no index.html. Este ficheiro trata do carrossel de
// viaturas, do ecrã ampliado das imagens e de pequenos detalhes.

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Ano automático no rodapé ----------
  var elAno = document.getElementById('ano');
  if (elAno) elAno.textContent = new Date().getFullYear();

  // ---------- Carrossel: scroll horizontal com snap + setas ----------
  function iniciarCarrossel(nome) {
    var viewport = document.getElementById('carrossel-' + nome);
    var btnAnterior = document.querySelector('[data-carrossel-anterior="' + nome + '"]');
    var btnSeguinte = document.querySelector('[data-carrossel-seguinte="' + nome + '"]');
    if (!viewport || !btnAnterior || !btnSeguinte) return;

    function passo() {
      var cartao = viewport.querySelector('.cartao');
      if (!cartao) return 300;
      var estilo = getComputedStyle(viewport);
      var gap = parseFloat(estilo.columnGap || estilo.gap || 24);
      return cartao.getBoundingClientRect().width + gap;
    }

    function atualizarEstadoSetas() {
      var max = viewport.scrollWidth - viewport.clientWidth - 2;
      btnAnterior.disabled = viewport.scrollLeft <= 2;
      btnSeguinte.disabled = viewport.scrollLeft >= max;
    }

    btnAnterior.addEventListener('click', function () {
      viewport.scrollBy({ left: -passo(), behavior: 'smooth' });
    });
    btnSeguinte.addEventListener('click', function () {
      viewport.scrollBy({ left: passo(), behavior: 'smooth' });
    });
    viewport.addEventListener('scroll', atualizarEstadoSetas, { passive: true });
    window.addEventListener('resize', atualizarEstadoSetas);
    atualizarEstadoSetas();
  }

  iniciarCarrossel('viaturas');

  // ---------- Ecrã ampliado (lightbox) ----------
  // Cada imagem clicável tem: data-lightbox="grupo"  data-full="imagem grande"
  //                           data-titulo="Legenda"  data-wa="link do WhatsApp"
  // As imagens do mesmo grupo ficam ligadas entre si (setas / teclado / deslize).
  var dlg = document.getElementById('lightbox');
  if (!dlg) return;

  var imgEl = dlg.querySelector('.lb-img');
  var tituloEl = dlg.querySelector('.lb-titulo');
  var contadorEl = dlg.querySelector('.lb-contador');
  var waEl = dlg.querySelector('.lb-wa');
  var waPadrao = waEl.getAttribute('href');
  var grupo = [];
  var pos = 0;

  function mostrar() {
    var item = grupo[pos];
    imgEl.src = item.dataset.full;
    imgEl.alt = item.dataset.titulo || '';
    tituloEl.textContent = item.dataset.titulo || '';
    contadorEl.textContent = (pos + 1) + ' / ' + grupo.length;
    waEl.href = item.dataset.wa || waPadrao;
    if (grupo.length < 2) dlg.setAttribute('data-unico', ''); else dlg.removeAttribute('data-unico');
    // pré-carrega a imagem seguinte para a navegação ser instantânea
    if (grupo.length > 1) { new Image().src = grupo[(pos + 1) % grupo.length].dataset.full; }
  }

  function abrir(item) {
    if (typeof dlg.showModal !== 'function') { window.open(item.dataset.full, '_blank', 'noopener'); return; }
    grupo = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox="' + item.dataset.lightbox + '"]'));
    pos = grupo.indexOf(item);
    mostrar();
    dlg.showModal();
    document.body.classList.add('lb-aberto');
  }

  function navegar(passo) {
    if (grupo.length < 2) return;
    pos = (pos + passo + grupo.length) % grupo.length;
    mostrar();
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function () { abrir(el); });
  });

  dlg.querySelector('.lb-fechar').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.lb-anterior').addEventListener('click', function () { navegar(-1); });
  dlg.querySelector('.lb-seguinte').addEventListener('click', function () { navegar(1); });

  // clicar fora da imagem (no fundo escuro) também fecha
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg || e.target.classList.contains('lb-palco') || e.target.classList.contains('lb-quadro')) dlg.close();
  });
  dlg.addEventListener('close', function () {
    document.body.classList.remove('lb-aberto');
    imgEl.removeAttribute('src');
  });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') navegar(-1);
    if (e.key === 'ArrowRight') navegar(1);
  });

  // deslizar o dedo para o lado no telemóvel
  var toqueX = null;
  dlg.addEventListener('touchstart', function (e) { toqueX = e.changedTouches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (toqueX === null) return;
    var dx = e.changedTouches[0].clientX - toqueX;
    toqueX = null;
    if (Math.abs(dx) > 60) navegar(dx < 0 ? 1 : -1);
  }, { passive: true });
});
