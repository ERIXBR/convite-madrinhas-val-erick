# Convite Val & Erick - versão ajustada

Esta versão foi ajustada para:
- deixar **somente** o texto `Clique para visualizar o convite!` acima do convite;
- deixar **somente** o texto `Com Carinho, Val e Erick.` abaixo do convite;
- manter **todo o restante do texto dentro das imagens**;
- fazer a animação de abertura mais suave;
- fazer a imagem final rolar suavemente para mostrar o convite completo;
- se ajustar melhor ao tamanho da tela do celular;
- configurar a imagem de prévia para compartilhamento no WhatsApp.

## Estrutura que deve ficar no GitHub

```text
index.html
style.css
script.js
.nojekyll
assets/
  01-envelope-fechado.png
  02-envelope-abrindo.png
  03-convite-aparecendo.png
  04-convite-completo.png
  og-image.png
  og-image-square.png
```

## Como subir no GitHub Pages

### 1. Apague os arquivos antigos
No seu repositório `convite-madrinhas-val-erick`, apague os arquivos antigos para evitar conflito.

### 2. Suba estes novos arquivos
Envie para a branch `main`, na raiz do repositório:
- `index.html`
- `style.css`
- `script.js`
- `.nojekyll`
- pasta `assets`

### 3. Confira o GitHub Pages
No GitHub, vá em:
- `Settings`
- `Pages`

E confirme:
- **Source:** `Deploy from a branch`
- **Branch:** `main`
- **Folder:** `/ (root)`

### 4. Aguarde publicar
Depois de salvar/subir, espere 1 a 5 minutos para o GitHub Pages republicar.

## Link esperado

O site foi configurado com este endereço:

`https://erixbr.github.io/convite-madrinhas-val-erick/`

Se você mudar o nome do repositório, será necessário atualizar as meta tags do `index.html`.

## Sobre a prévia do WhatsApp

O código já está com as meta tags preenchidas com o seu link real. Se a prévia não aparecer imediatamente, isso costuma ser cache do WhatsApp.

Faça assim:
1. espere alguns minutos após o deploy;
2. teste colando o link novamente;
3. se necessário, teste também com uma variação do link, por exemplo:
   - `https://erixbr.github.io/convite-madrinhas-val-erick/?v=2`

