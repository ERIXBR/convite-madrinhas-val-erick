# Convite Madrinhas Val & Erick - v4

Esta versão corrige a falha em que somente a primeira imagem aparecia.

## O que mudou
- estrutura de animação simplificada;
- botão real para clique no convite;
- pré-carregamento das imagens;
- arquivos com versão `?v=4` para evitar cache antigo;
- rolagem suave da imagem final;
- meta tags ajustadas para o repositório `convite-madrinhas-val-erick`.

## Estrutura no GitHub

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

## Como publicar
1. Apague os arquivos antigos do repositório `convite-madrinhas-val-erick`.
2. Suba todos os arquivos deste pacote para a branch `main`.
3. Em `Settings > Pages`, confirme:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Aguarde alguns minutos para o GitHub Pages atualizar.
5. Faça um refresh forte no navegador para limpar o cache.

## Link
`https://erixbr.github.io/convite-madrinhas-val-erick/`

## Prévia do WhatsApp
Se a imagem de prévia demorar a aparecer, aguarde alguns minutos e teste com:
`https://erixbr.github.io/convite-madrinhas-val-erick/?v=4`
