import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
let html = await readFile(path.join(root, 'src/sistema-npt-local-2025-12.html'), 'utf8');
function replaceRequired(pattern, replacement) {
  if (!html.match(pattern)) throw new Error(`Trecho de origem não encontrado: ${pattern}`);
  html = html.replace(pattern, replacement);
}

// Reuse the existing standalone interface; never publish the repository root.
replaceRequired(/<title>.*?<\/title>/, '<title>NPT — Demonstração individual</title>');
replaceRequired(/<!-- Institutional Header[^]*?<\/header>/,
  `<header class="institutional-header"><div class="container">
    <strong>NPT · Demonstração de portfólio</strong>
    <p class="mb-0">Ambiente individual, sem conexão com o hospital. Utilize apenas dados fictícios.
    Os registros ficam neste navegador. Acesso simulado: <strong>demo / demo</strong>.</p>
  </div></header>`);
replaceRequired(/Gestão de Terapia Nutricional Parenteral \| Vigência: 02\/12\/2025/,
  'Gestão operacional de nutrição parenteral · Dados fictícios');
replaceRequired(/<footer[^]*?<\/footer>/,
  '<footer><p>NPT · Protótipo demonstrativo de portfólio · Não utilizar para atendimento real.</p></footer>');
html = html.replaceAll('Sistema NPT HUWC', 'Sistema NPT');
html = html.replaceAll('Autenticação Necessária', 'Identificação simulada · demo / demo');
html = html.replaceAll('Sequência global automática', 'Sequência automática neste navegador');
html = html.replaceAll('fscmhuwc@gmail.com', 'farmacia@example.invalid');
html = html.replaceAll('Pronutrir', 'fornecedor fictício');
html = html.replaceAll('registrosNPT_v2', 'npt_demo_registros_v1');
html = html.replaceAll('contadorPrescricao_v2', 'npt_demo_contador_v1');
replaceRequired(/function carregarUsuarios\(\) \{[^]*?\n    \}\s*\n\s*function pedirLogin/,
  `function carregarUsuarios() {
      // Public demonstration identity only; this does not provide authentication.
      usuarios = { demo: 'demo' };
    }

    function pedirLogin`);

// Render user-entered history values as text, preserving the existing badge markup.
replaceRequired(/function atualizarHistorico\(\) \{/,
  `function escaparHTML(valor) {
      return String(valor).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[c]));
    }

    function atualizarHistorico() {`);
const historyStart = html.indexOf('function atualizarHistorico()');
const historyEnd = html.indexOf('function atualizarSelectsPrescricoes()', historyStart);
let history = html.slice(historyStart, historyEnd);
history = history.replace(/\$\{(r\.[^}]+|statusClass)\}/g, '${escaparHTML($1)}');
html = html.slice(0, historyStart) + history + html.slice(historyEnd);

for (const forbidden of ['usuarios.json', 'sharepoint-api.js', 'auth-simulator.js', 'fscmhuwc@gmail.com']) {
  if (html.includes(forbidden)) throw new Error(`Referência indevida no demo: ${forbidden}`);
}
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/index.html'), html);
console.log('Demo gerado em dist/index.html. Somente este diretório deve ser publicado.');
