# Êxito Mercado — site institucional

Site estático (HTML + CSS + JS) construído sobre **Bootstrap 5.3**, sem necessidade
de servidor, base de dados ou build — basta abrir `index.html` num browser ou
publicar a pasta inteira num alojamento.

## Estrutura

```
exito-mercado-site/
├── index.html              ← página única do site
├── css/
│   └── estilo.css          ← identidade visual (cores, tipografia, componentes)
├── js/
│   └── script.js           ← carrossel, ecrã ampliado das imagens, ano do rodapé
├── assets/
│   └── img/
│       ├── logo.png                 ← logo com fundo transparente
│       ├── favicon.png / apple-touch-icon.png
│       ├── viaturas/                ← fotos e flyers das viaturas (WebP)
│       │   ├── nome-da-viatura.webp        (grande — abre ao clicar)
│       │   └── nome-da-viatura-thumb.webp  (pequena — aparece no cartão)
│       └── produtos/                ← imagens dos produtos (WebP)
└── README.md
```

O Bootstrap (CSS e JS) e as fontes (Big Shoulders Display + Inter) são carregados
via CDN dentro do `index.html` — não precisas de os descarregar.

## Como funciona

- **Viaturas**: carrossel com setas. Ao clicar numa imagem abre-se o ecrã ampliado
  (com setas, teclado ← → e deslize no telemóvel). O botão "Consultar" abre o WhatsApp
  já com uma mensagem a dizer qual é a viatura.
- **Produtos**: grelha de 3 cartões (2 produtos + um cartão "Procura outro produto?").
- **Botão de WhatsApp** fixo no canto do ecrã.

## Como acrescentar uma viatura

1. Guarda a foto/flyer em `assets/img/viaturas/` (ex.: `toyota-corolla-2012.webp`).
   Se possível cria também uma versão pequena (800 px de largura) com o sufixo `-thumb`.
   Formatos `.jpg` e `.png` também funcionam.
2. No `index.html`, procura `<!-- VIATURA:` , copia um bloco `<article class="card cartao"> ... </article>`
   inteiro e cola-o a seguir a outro.
3. Altera nesse bloco: os dois caminhos da imagem (`data-full` e `src`), o `data-titulo`,
   o `alt`, o nome (`card-titulo`), a ficha técnica (`<dl class="ficha">`) e o preço.
   Nos links do WhatsApp (`data-wa` e `href`) troca o nome da viatura dentro do texto.

Os cartões ficam na ordem em que aparecem no ficheiro: primeiro os que têm preço em MT
(do mais barato para o mais caro), depois as fotos com preço C&F.

## Como trocar a imagem de destaque (topo)

No `index.html`, procura `<!-- IMAGEM DE DESTAQUE` e muda o ficheiro no `src` da imagem
(também no `<link rel="preload">` no topo do ficheiro). Usa uma imagem na proporção 4:3.

## Notas sobre as imagens

- Todas as imagens foram convertidas para **WebP** (bem mais leves) e têm nomes limpos
  em vez de "WhatsApp Image ...".
- O logo foi recortado com fundo transparente, para assentar bem em qualquer cor de fundo.
- Os cartões das fotos de leilão (Toyota Ractis, Nissan Note) mostram o preço **C&F em dólares**
  que vem escrito nas próprias fotos. Se preferires não o mostrar, substitui, no bloco do
  cartão, o `<span class="preco">…US$</span>` por `<span class="preco preco--consulta">Preço sob consulta</span>`
  (e apaga a linha `preco-nota`) — mas atenção que o valor continua visível dentro da foto.
- O flyer INUKA (promoção de perfumes de 31 Ago a 3 Set) não foi usado por ter a promoção
  já terminada e outro número de contacto.

## Como publicar o site

Qualquer alojamento de ficheiros estáticos serve, por exemplo:
- **Hostinger / cPanel**: carrega a pasta inteira via FTP ou gestor de ficheiros
  para `public_html/`.
- **Netlify / Vercel / GitHub Pages**: arrasta a pasta para o painel (Netlify tem
  um "drag and drop deploy") ou liga a um repositório Git.

Não é preciso nenhuma configuração de servidor — é um site 100% estático.

## Contactos usados no site

- Email: suporte.exitomercado@outlook.com
- Telefone / WhatsApp: +258 86 922 3330 (link `https://wa.me/258869223330`)

Se estes dados mudarem, procura por eles no `index.html` (aparecem em vários
sítios: barra de info, botões de cotação, secção de contacto, rodapé e mensagens
pré-preenchidas dos cartões).
