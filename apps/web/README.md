# Demonstração individual na Vercel

Demonstração publicada: https://npt-demo.vercel.app

Esta entrega disponibiliza a interface standalone existente para avaliação visual.
O HTML original em `src/` é preservado; o build gera uma variante demonstrativa.

Requer Node.js. Na raiz do repositório:

```powershell
node apps/web/build-demo.mjs
python -m http.server 8080 --directory dist
```

Abra http://localhost:8080. Use `demo` como usuário e senha nas ações que
solicitarem identificação. Esse acesso é público e simulado, sem proteção real.
Utilize exclusivamente dados fictícios. Os registros ficam no localStorage do
navegador, em chaves próprias da demonstração, e não sincronizam entre pessoas.
Bootstrap e fontes são carregados de serviços externos; requerem conectividade.

Na Vercel, `vercel.json` configura o build e publica somente `dist/`.
O build remove contatos e assinatura institucional da variante pública e não
copia configurações SharePoint, usuários originais, documentação ou imagens.
O histórico escapa o conteúdo digitado antes de renderizá-lo em HTML.

Para publicar, com Vercel CLI autenticada, execute na raiz:

```powershell
vercel --prod
```

Esta versão preserva o visual existente para estabelecer uma referência de
avaliação. Não comprova adequação a uso hospitalar, segurança de produção ou
validação de regras clínicas. As melhorias visuais serão avaliadas em seguida.

## Verificação em 25/10/2026

Build executado com Node.js e teste funcional local com Playwright em Edge
headless. Verificados: abertura, identificação simulada, cadastro de prescrição,
recebimento conforme, dispensação, exclusão de bolsa já dispensada do seletor,
registro de perda e persistência dos quatro registros após recarregar a página.
Uma entrada contendo uma tag HTML foi exibida como texto no histórico, sem criar
um elemento de imagem. Não houve erros JavaScript não tratados durante esse fluxo.
Página aberta e capturada em 1440×1000 e 390×844; sem overflow horizontal na
tela inicial móvel. Estes testes não cobrem todas as regras e condições de falha.

O mesmo fluxo funcional passou no endereço público da Vercel. A página inicial
respondeu HTTP 200, e as tentativas de acessar `/usuarios.json`,
`/src/usuarios.json`, `/config.js` e `/docs/README.md` responderam HTTP 404.
