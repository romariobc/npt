# Documentação Técnica - Sistema NPT HUWC SharePoint

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Estrutura de Arquivos](#estrutura-de-arquivos)
4. [Configuração SharePoint](#configuração-sharepoint)
5. [Módulos JavaScript](#módulos-javascript)
6. [Fluxo de Dados](#fluxo-de-dados)
7. [API Reference](#api-reference)
8. [Segurança](#segurança)
9. [Troubleshooting](#troubleshooting)
10. [Manutenção e Extensão](#manutenção-e-extensão)

---

## 🎯 Visão Geral

### Propósito

Sistema web para gerenciamento do ciclo completo de Nutrição Parenteral Therapy (NPT) no Hospital Universitário Walter Cantídio (HUWC), desde a prescrição médica até a dispensação ou devolução/perda.

### Tecnologias

- **Frontend**: HTML5, CSS3 (Bootstrap 5.3.0), JavaScript (ES6+)
- **Backend**: SharePoint Online (Microsoft 365)
- **API**: SharePoint REST API
- **Autenticação**: Microsoft Entra ID (a implementar) / Simulador (desenvolvimento)
- **Build**: Nenhum (zero dependencies, no build process)

### Características Principais

- ✅ Single Page Application (SPA)
- ✅ Zero dependências npm/node
- ✅ Persistência em SharePoint Lists
- ✅ Compliance LGPD
- ✅ Auditoria completa (autor, data, modificações)
- ✅ Interface responsiva (mobile-friendly)
- ✅ Exportação CSV

---

## 🏗️ Arquitetura do Sistema

### Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR (Cliente)                  │
├─────────────────────────────────────────────────────────┤
│  sistema-npt-sharepoint.html                            │
│  ├── Interface HTML (Bootstrap 5)                       │
│  ├── Lógica de Apresentação (JavaScript)                │
│  └── Event Handlers                                     │
├─────────────────────────────────────────────────────────┤
│  Módulos JavaScript (Locais)                            │
│  ├── config.js          → Configurações                 │
│  ├── sharepoint-api.js  → Camada de API                 │
│  └── auth-simulator.js  → Auth (dev mode)               │
└────────────┬────────────────────────────────────────────┘
             │
             │ HTTPS / REST API
             ▼
┌─────────────────────────────────────────────────────────┐
│              SharePoint Online (Microsoft 365)          │
├─────────────────────────────────────────────────────────┤
│  Listas SharePoint:                                     │
│  ├── Prescricoes       (25 colunas)                     │
│  ├── Recebimentos      (15 colunas)                     │
│  ├── Dispensacoes      (13 colunas)                     │
│  └── Perdas            (8 colunas)                      │
├─────────────────────────────────────────────────────────┤
│  Recursos SharePoint:                                   │
│  ├── Autenticação Entra ID                              │
│  ├── Auditoria automática (Created/Modified)            │
│  ├── Backup automático (Microsoft 365)                  │
│  └── Compliance LGPD                                    │
└─────────────────────────────────────────────────────────┘
```

### Padrões Arquiteturais

1. **Separation of Concerns**: Arquivos separados para config, API, auth
2. **Module Pattern**: Encapsulamento em IIFEs (Immediately Invoked Function Expressions)
3. **RESTful API**: Operações CRUD via HTTP (GET, POST, MERGE, DELETE)
4. **Event-Driven**: Event listeners para interações do usuário
5. **SPA**: Navegação por tabs, sem recarregamento de página

---

## 📁 Estrutura de Arquivos

```
npt/
│
├── 📄 sistema-npt-sharepoint.html   # Aplicação principal (8KB)
│   └── Interface completa com tabs, formulários e tabela
│
├── 📄 config.js                     # Configurações (5KB)
│   ├── URL do site SharePoint
│   ├── Nomes das listas
│   ├── Headers HTTP
│   └── Funções auxiliares
│
├── 📄 sharepoint-api.js             # API SharePoint (17KB)
│   ├── Operações CRUD genéricas
│   ├── Módulos específicos (Prescricoes, Recebimentos, etc.)
│   └── Gestão de Form Digest
│
├── 📄 auth-simulator.js             # Autenticação dev (12KB)
│   ├── Simulador de login
│   └── Carregar usuarios.json
│
├── 📄 usuarios.json                 # Credenciais (dev only)
│   └── Pares username:password
│
├── 📄 GUIA_CONFIGURACAO_SHAREPOINT.md
├── 📄 ROTEIRO_TESTES.md
├── 📄 DOCUMENTACAO_TECNICA.md       # Este arquivo
├── 📄 APRESENTACAO_TI.md
├── 📄 CHECKLIST_VALIDACAO.md
├── 📄 README.md
│
└── 📂 legacy/ (referência)
    ├── sistema_npt_v2.html          # Versão localStorage
    └── 2npt_dispensa_sistema.html   # Versão antiga
```

---

## ⚙️ Configuração SharePoint

### Estrutura das Listas

#### 1. Lista: `Prescricoes`

**Internal Name**: Prescricoes
**Title**: Prescrições NPT

| Nome da Coluna | Tipo | Obrigatório | Descrição |
|----------------|------|-------------|-----------|
| Title | Single line of text | Sim | ID da prescrição (NPT-00001) |
| Paciente | Single line of text | Sim | Nome do paciente |
| Prontuario | Single line of text | Sim | Número do prontuário |
| Leito | Single line of text | Sim | Leito/quarto |
| Vazao | Single line of text | Sim | Vazão (ex: 50 mL/h) |
| Volume | Single line of text | Sim | Volume total (ex: 1200 mL) |
| Composicao | Multiple lines of text | Não | Composição detalhada |
| Observacoes | Multiple lines of text | Não | Observações adicionais |
| Status | Choice | Sim | Aguardando Bolsa / Bolsa Recebida / Dispensada / Devolvida |

**Choices para Status**:
- Aguardando Bolsa
- Bolsa Recebida
- Dispensada
- Devolvida

---

#### 2. Lista: `Recebimentos`

**Internal Name**: Recebimentos
**Title**: Recebimentos de Bolsas

| Nome da Coluna | Tipo | Obrigatório | Descrição |
|----------------|------|-------------|-----------|
| Title | Single line of text | Sim | ID único do recebimento |
| IDPrescricao | Single line of text | Sim | Referência à prescrição (NPT-00001) |
| Lote | Single line of text | Sim | Número do lote Pronutrir |
| Paciente | Single line of text | Sim | Nome do paciente |
| Leito | Single line of text | Sim | Leito |
| Temperatura | Choice | Sim | Sim / Não |
| Integridade | Choice | Sim | Íntegra / Violada |
| StatusConferencia | Choice | Sim | Conforme / Inconsistente |
| Conferente | Single line of text | Sim | Nome do conferente |
| Observacoes | Multiple lines of text | Não | Observações |

---

#### 3. Lista: `Dispensacoes`

**Internal Name**: Dispensacoes
**Title**: Dispensações

| Nome da Coluna | Tipo | Obrigatório | Descrição |
|----------------|------|-------------|-----------|
| Title | Single line of text | Sim | ID único da dispensação |
| IDPrescricao | Single line of text | Sim | Referência à prescrição |
| Lote | Single line of text | Sim | Lote da bolsa |
| Paciente | Single line of text | Sim | Paciente |
| Leito | Single line of text | Sim | Leito |
| HoraDispensa | Single line of text | Sim | Hora (ex: 21:00) |
| Entregou | Single line of text | Sim | Quem entregou |
| Recebeu | Single line of text | Sim | Quem recebeu |
| Observacoes | Multiple lines of text | Não | Observações |

---

#### 4. Lista: `Perdas`

**Internal Name**: Perdas
**Title**: Perdas e Devoluções

| Nome da Coluna | Tipo | Obrigatório | Descrição |
|----------------|------|-------------|-----------|
| Title | Single line of text | Sim | ID único da perda |
| IDPrescricao | Single line of text | Sim | Referência à prescrição |
| TipoPerda | Choice | Sim | Devolução / Perda |
| Motivo | Choice | Sim | (10 opções - ver abaixo) |
| Detalhes | Multiple lines of text | Sim | Descrição detalhada |

**Choices para Motivo**:
- Temperatura inadequada
- Composição incorreta
- Volume errado
- Identificação incorreta
- Integridade comprometida
- Cancelamento médico
- Alta do paciente
- Óbito
- Validade vencida
- Outro

---

### Permissões Recomendadas

| Grupo | Permissão | Justificativa |
|-------|-----------|---------------|
| Farmacêuticos | Edit (Contribuir) | Acesso total CRUD |
| Técnicos | Edit (Contribuir) | Registro de recebimentos |
| Administradores TI | Full Control | Configuração e manutenção |
| Leitura (Auditoria) | Read | Visualização apenas |

---

## 🔧 Módulos JavaScript

### 1. `config.js`

**Propósito**: Centralizar todas as configurações do sistema

**Variáveis Principais**:

```javascript
const SharePointConfig = {
  // URL do site SharePoint
  SITE_URL: 'https://[TENANT].sharepoint.com/sites/SistemaNPT',

  // Nomes das listas
  LISTAS: {
    PRESCRICOES: 'Prescricoes',
    RECEBIMENTOS: 'Recebimentos',
    DISPENSACOES: 'Dispensacoes',
    PERDAS: 'Perdas'
  },

  // Configurações de API
  API_VERSION: '_api/web',
  HEADERS: { /* ... */ },
  REQUEST_TIMEOUT: 30000,

  // Modo desenvolvimento
  MODO_DESENVOLVIMENTO: true,
  DEBUG: true,

  // Sistema
  PREFIXO_ID_PRESCRICAO: 'NPT-',
  DIGITOS_ID: 5,
  PAGE_SIZE: 100
};
```

**Funções Auxiliares**:

- `getListaUrl(nomeLista)` - Retorna URL completa da lista
- `getItemsUrl(nomeLista)` - Retorna URL dos items
- `getItemUrl(nomeLista, itemId)` - Retorna URL de um item específico
- `validar()` - Valida se configuração está completa
- `log(...args)` - Log condicional (só se DEBUG = true)

**Inicialização**:
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const validacao = SharePointConfig.validar();
  // Exibe erros se configuração inválida
});
```

---

### 2. `sharepoint-api.js`

**Propósito**: Camada de abstração para SharePoint REST API

**Estrutura**:

```javascript
const SharePointAPI = (function() {
  'use strict';

  // ============ PRIVADO ============
  let formDigestValue = null;
  let formDigestExpires = null;

  async function getFormDigest() { /* ... */ }
  async function handleResponse(response) { /* ... */ }
  function toSharePointItem(data) { /* ... */ }
  function fromSharePointItem(spItem) { /* ... */ }

  // ============ CRUD GENÉRICO ============
  async function criarItem(nomeLista, dados) { /* ... */ }
  async function buscarItens(nomeLista, options) { /* ... */ }
  async function buscarItemPorId(nomeLista, itemId) { /* ... */ }
  async function atualizarItem(nomeLista, itemId, dados) { /* ... */ }
  async function excluirItem(nomeLista, itemId) { /* ... */ }

  // ============ ESPECÍFICO NPT ============
  const Prescricoes = { /* ... */ };
  const Recebimentos = { /* ... */ };
  const Dispensacoes = { /* ... */ };
  const Perdas = { /* ... */ };

  // ============ API PÚBLICA ============
  return {
    criarItem,
    buscarItens,
    buscarItemPorId,
    atualizarItem,
    excluirItem,
    Prescricoes,
    Recebimentos,
    Dispensacoes,
    Perdas,
    getFormDigest,
    testarConexao
  };
})();
```

**Form Digest**:
- Necessário para operações POST/MERGE/DELETE
- Expira em 30 minutos
- Renovado automaticamente após 25 minutos
- Obtido via `/_api/web/contextinfo`

**Conversão de Dados**:
- `toSharePointItem()`: JavaScript → SharePoint format
- `fromSharePointItem()`: SharePoint → JavaScript format

---

### 3. `auth-simulator.js`

**Propósito**: Simular autenticação durante desenvolvimento (substituir por Entra ID em produção)

**Estrutura**:

```javascript
const AuthSimulator = (function() {
  'use strict';

  let usuarios = {};

  async function carregarUsuarios() {
    // Carrega usuarios.json
    // Fallback para usuários padrão
  }

  async function autenticar(usuario, senha) {
    return usuarios[usuario] === senha;
  }

  return {
    autenticar,
    carregarUsuarios
  };
})();
```

**Usuários Padrão** (fallback):
```json
{
  "admin": "12345",
  "tecnico1": "senha1",
  "tecnico2": "senha2",
  "farmacia": "farm123",
  "supervisor": "super456",
  "teste": "123"
}
```

**⚠️ IMPORTANTE**: Este módulo deve ser REMOVIDO em produção e substituído por autenticação Entra ID real.

---

## 🔄 Fluxo de Dados

### Fluxo Completo (Happy Path)

```
1. PRESCRIÇÃO
   ├── Usuário preenche formulário
   ├── Click "Salvar"
   ├── Modal de login
   ├── Autenticação (simulador ou Entra ID)
   ├── SharePointAPI.Prescricoes.criar()
   │   ├── POST /_api/web/lists/getbytitle('Prescricoes')/items
   │   ├── Form Digest obtido
   │   └── Item criado no SharePoint
   ├── Status: "Aguardando Bolsa"
   ├── ID auto-gerado: NPT-00001
   └── Atualiza UI (histórico + selects)

2. RECEBIMENTO
   ├── Select mostra prescrições "Aguardando Bolsa"
   ├── Seleção auto-preenche dados do paciente
   ├── Farmacêutico/técnico preenche conferência
   ├── SharePointAPI.Recebimentos.criar()
   ├── SharePointAPI.Prescricoes.atualizarStatus(id, 'Bolsa Recebida')
   │   └── MERGE /_api/web/lists/.../items(id)
   └── Atualiza UI

3. DISPENSAÇÃO
   ├── Select mostra recebimentos "Conforme" não dispensados
   ├── Seleção auto-preenche dados
   ├── SharePointAPI.Dispensacoes.criar()
   ├── SharePointAPI.Prescricoes.atualizarStatus(id, 'Dispensada')
   └── Atualiza UI

4. PERDA/DEVOLUÇÃO (Alternativo)
   ├── Entrada manual do ID prescrição
   ├── SharePointAPI.Perdas.criar()
   ├── SharePointAPI.Prescricoes.atualizarStatus(id, 'Devolvida')
   └── Atualiza UI
```

### Fluxo de Autenticação

```
Modo Desenvolvimento:
  ├── pedirLogin(acao, dados)
  ├── Modal exibido
  ├── Usuário digita credenciais
  ├── AuthSimulator.autenticar(usuario, senha)
  ├── Se válido: confirmarLogin(usuario)
  └── executarAcao(acao, dados)

Modo Produção (a implementar):
  ├── Entra ID redirect
  ├── OAuth2 flow
  ├── Token JWT
  └── API calls com Bearer token
```

### Fluxo de Atualização de UI

```
Após qualquer operação CRUD:
  ├── atualizarHistorico()
  │   ├── Promise.all([buscar 4 listas])
  │   ├── Mesclar arrays
  │   ├── Ordenar por data DESC
  │   └── Renderizar tabela
  │
  └── atualizarSelectsPrescricoes()
      ├── buscarAguardandoBolsa() → Select Recebimento
      ├── buscarConformes() → Select Dispensação
      └── Filtrar já dispensadas
```

---

## 📚 API Reference

### SharePointAPI.Prescricoes

#### `.criar(dados)`

Cria nova prescrição.

**Parâmetros**:
```javascript
{
  idPrescricao: string,  // NPT-00001
  paciente: string,
  prontuario: string,
  leito: string,
  vazao: string,
  volume: string,
  composicao: string,    // opcional
  observacoes: string    // opcional
}
```

**Retorna**: `Promise<object>` - Item criado com ID SharePoint

**Exemplo**:
```javascript
const presc = await SharePointAPI.Prescricoes.criar({
  idPrescricao: 'NPT-00001',
  paciente: 'João Silva',
  prontuario: '123456',
  leito: '102',
  vazao: '50 mL/h',
  volume: '1200 mL'
});
console.log('Criado ID:', presc.Id);
```

---

#### `.buscarAguardandoBolsa()`

Busca todas as prescrições com status "Aguardando Bolsa".

**Retorna**: `Promise<array>` - Array de prescrições

**Exemplo**:
```javascript
const lista = await SharePointAPI.Prescricoes.buscarAguardandoBolsa();
console.log(`${lista.length} prescrições aguardando`);
```

---

#### `.buscarTodas()`

Busca todas as prescrições (qualquer status).

**Retorna**: `Promise<array>`

---

#### `.buscarPorIdPrescricao(idPrescricao)`

Busca prescrição específica por ID (Title).

**Parâmetros**:
- `idPrescricao`: string (ex: 'NPT-00001')

**Retorna**: `Promise<object|null>`

**Exemplo**:
```javascript
const presc = await SharePointAPI.Prescricoes.buscarPorIdPrescricao('NPT-00001');
if (presc) {
  console.log('Paciente:', presc.Paciente);
}
```

---

#### `.atualizarStatus(itemId, novoStatus)`

Atualiza status de uma prescrição.

**Parâmetros**:
- `itemId`: number (ID SharePoint, não confundir com idPrescricao)
- `novoStatus`: string ('Aguardando Bolsa' | 'Bolsa Recebida' | 'Dispensada' | 'Devolvida')

**Retorna**: `Promise<void>`

**Exemplo**:
```javascript
await SharePointAPI.Prescricoes.atualizarStatus(15, 'Bolsa Recebida');
```

---

### SharePointAPI.Recebimentos

#### `.criar(dados)`

**Parâmetros**:
```javascript
{
  idPrescricao: string,
  lote: string,
  paciente: string,
  leito: string,
  temperatura: 'Sim' | 'Não',
  integridade: 'Íntegra' | 'Violada',
  status: 'Conforme' | 'Inconsistente',
  conferente: string,
  observacoes: string  // opcional
}
```

---

#### `.buscarConformes()`

Busca recebimentos com status "Conforme".

---

#### `.buscarPorIdPrescricao(idPrescricao)`

Busca recebimento associado a uma prescrição.

---

#### `.buscarTodos()`

Busca todos os recebimentos.

---

### SharePointAPI.Dispensacoes

#### `.criar(dados)`

**Parâmetros**:
```javascript
{
  idPrescricao: string,
  lote: string,
  paciente: string,
  leito: string,
  horaDispensa: string,  // '21:00'
  entregou: string,
  recebeu: string,
  observacoes: string    // opcional
}
```

---

#### `.jaDispensada(idPrescricao)`

Verifica se prescrição já foi dispensada.

**Retorna**: `Promise<boolean>`

**Exemplo**:
```javascript
const jaDispensada = await SharePointAPI.Dispensacoes.jaDispensada('NPT-00001');
if (jaDispensada) {
  console.log('Já foi dispensada');
}
```

---

#### `.buscarTodas()`

Busca todas as dispensações.

---

### SharePointAPI.Perdas

#### `.criar(dados)`

**Parâmetros**:
```javascript
{
  idPrescricao: string,
  tipoPerdaString: 'Devolução' | 'Perda',
  motivo: string,      // Choice do SharePoint
  detalhes: string
}
```

---

#### `.buscarTodas()`

Busca todas as perdas/devoluções.

---

#### `.buscarPorMotivo(motivo)`

Filtra por motivo específico.

---

### Funções Genéricas (CRUD)

#### `SharePointAPI.criarItem(nomeLista, dados)`

Cria item em qualquer lista.

---

#### `SharePointAPI.buscarItens(nomeLista, options)`

Busca items com filtros avançados.

**Options**:
```javascript
{
  filter: string,       // OData filter (ex: "Status eq 'Ativo'")
  select: array,        // Campos (ex: ['Title', 'Status'])
  orderBy: string,      // Ordenação (ex: 'Created desc')
  top: number          // Limite (default: 100)
}
```

**Exemplo**:
```javascript
const items = await SharePointAPI.buscarItens('Prescricoes', {
  filter: "Leito eq '102'",
  select: ['Title', 'Paciente', 'Status'],
  orderBy: 'Created desc',
  top: 10
});
```

---

#### `SharePointAPI.buscarItemPorId(nomeLista, itemId)`

Busca item por ID SharePoint.

---

#### `SharePointAPI.atualizarItem(nomeLista, itemId, dados)`

Atualiza item existente.

---

#### `SharePointAPI.excluirItem(nomeLista, itemId)`

Exclui item (usar com cuidado - auditoria).

---

#### `SharePointAPI.testarConexao()`

Testa conectividade com SharePoint.

**Retorna**:
```javascript
{
  sucesso: boolean,
  site: string,        // Nome do site (se sucesso)
  url: string,         // URL do site
  erro: string         // Mensagem de erro (se falha)
}
```

**Exemplo**:
```javascript
const teste = await SharePointAPI.testarConexao();
if (teste.sucesso) {
  console.log('Conectado a:', teste.site);
} else {
  console.error('Erro:', teste.erro);
}
```

---

## 🔒 Segurança

### Configurações Atuais (Desenvolvimento)

**⚠️ NÃO USAR EM PRODUÇÃO**:

1. Senhas em texto puro em `usuarios.json`
2. Autenticação client-side (facilmente burlável)
3. Sem criptografia de dados em trânsito adicional (apenas HTTPS do SharePoint)
4. Sem rate limiting
5. Sem proteção CSRF além do Form Digest

---

### Configurações para Produção

**OBRIGATÓRIO implementar**:

1. **Autenticação Entra ID (Azure AD)**
   - OAuth 2.0 flow
   - Token JWT
   - Single Sign-On (SSO)
   - Multi-factor Authentication (MFA)

2. **Autorização**
   - Grupos de segurança do AD
   - Permissões granulares por lista SharePoint
   - Audit trail (automático no SharePoint)

3. **HTTPS**
   - SharePoint já força HTTPS
   - Certificado válido Microsoft

4. **LGPD Compliance**
   - Dados armazenados em tenant brasileiro (se configurado)
   - Auditoria de acesso (SharePoint Audit Logs)
   - Direito ao esquecimento (deleção manual)
   - Termos de uso (a implementar no frontend)

5. **Proteções Adicionais**
   - Content Security Policy (CSP) headers
   - Input sanitization (já feito pelo SharePoint)
   - XSS protection (Bootstrap + sanitização)
   - SQL Injection protection (N/A - não há SQL direto)

---

### Exemplo de Implementação Entra ID

```javascript
// FUTURO: Substituir auth-simulator.js por:

const EntraIDAuth = (function() {
  const msalConfig = {
    auth: {
      clientId: 'SEU-CLIENT-ID',
      authority: 'https://login.microsoftonline.com/SEU-TENANT-ID',
      redirectUri: window.location.origin
    }
  };

  const msalInstance = new msal.PublicClientApplication(msalConfig);

  async function login() {
    const loginRequest = {
      scopes: ['https://[TENANT].sharepoint.com/.default']
    };

    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      return loginResponse.account;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async function getToken() {
    const tokenRequest = {
      scopes: ['https://[TENANT].sharepoint.com/.default']
    };

    const account = msalInstance.getAllAccounts()[0];
    const tokenResponse = await msalInstance.acquireTokenSilent({
      ...tokenRequest,
      account: account
    });

    return tokenResponse.accessToken;
  }

  return { login, getToken };
})();
```

Depois, em `sharepoint-api.js`, adicionar token nos headers:
```javascript
const token = await EntraIDAuth.getToken();
headers['Authorization'] = `Bearer ${token}`;
```

---

## 🔍 Troubleshooting

### Erro: "Erro ao obter Form Digest"

**Sintomas**: Não consegue criar/atualizar items

**Causas**:
1. Não está logado no SharePoint
2. Sessão expirou
3. URL incorreta em config.js
4. Permissões insuficientes

**Soluções**:
1. Fazer login no SharePoint no mesmo navegador
2. Recarregar a página
3. Verificar SITE_URL em config.js
4. Verificar permissões da conta no site SharePoint

---

### Erro: "404 - List not found"

**Sintomas**: Console mostra erro 404 ao buscar items

**Causas**:
1. Lista não foi criada no SharePoint
2. Nome da lista incorreto (case-sensitive)
3. Site URL errado

**Soluções**:
1. Verificar se lista existe no SharePoint
2. Conferir nomes exatos em `config.js` → `LISTAS`
3. Verificar URL do site em `config.js` → `SITE_URL`

---

### Erro: "Conexão com SharePoint falhou"

**Sintomas**: Badge vermelho "Erro de Conexão"

**Causas**:
1. URL inválida
2. Site não existe
3. Sem acesso ao site
4. Problema de rede

**Soluções**:
1. Copiar URL correta do SharePoint (incluir /sites/NomeSite)
2. Verificar acesso manual ao site
3. Testar conexão de rede
4. Verificar console para erro específico

---

### Erro: "Select vazio (sem opções)"

**Sintomas**: Dropdown de recebimento/dispensação não mostra itens

**Causas**:
1. Nenhuma prescrição com status adequado
2. Dados filtrados corretamente (ex: já dispensadas)
3. Erro ao buscar dados

**Soluções**:
1. Criar prescrição primeiro
2. Verificar status das prescrições no histórico
3. Conferir console para erros de API

---

### Erro: "Dados não aparecem no histórico"

**Sintomas**: Tabela histórico vazia ou desatualizada

**Causas**:
1. Dados não salvaram no SharePoint
2. Permissões de leitura
3. Erro de rede durante fetch

**Soluções**:
1. Verificar manualmente no SharePoint se items existem
2. Clicar em "🔄 Atualizar"
3. Conferir console para erros
4. Verificar permissões Read na lista

---

### Erro: "CSV exportado com caracteres estranhos"

**Sintomas**: Acentos aparecem incorretos no Excel

**Causas**:
1. Encoding UTF-8 não reconhecido
2. Excel configurado para outro encoding

**Soluções**:
1. O CSV já inclui BOM (\uFEFF) - deve funcionar
2. No Excel: Dados → De Texto → Selecionar UTF-8
3. Usar LibreOffice (reconhece automaticamente)

---

## 🛠️ Manutenção e Extensão

### Adicionar Nova Coluna em Lista Existente

1. **SharePoint**:
   - Ir para lista → Settings → List settings
   - Create column
   - Configurar tipo e opções

2. **Código**:
   - Atualizar `sharepoint-api.js` → módulo específico
   - Adicionar campo no objeto de criação
   - Atualizar formulário HTML se necessário

**Exemplo**: Adicionar campo "Urgente" em Prescricoes:

```javascript
// sharepoint-api.js
async criar(dados) {
  const item = {
    Title: dados.idPrescricao,
    Paciente: dados.paciente,
    // ... outros campos ...
    Urgente: dados.urgente || false  // NOVO
  };
  return await criarItem(SharePointConfig.LISTAS.PRESCRICOES, item);
}
```

```html
<!-- sistema-npt-sharepoint.html -->
<div class="col-md-4 mb-3">
  <label class="form-label">Urgente?</label>
  <select class="form-select" id="prescUrgente">
    <option value="false">Não</option>
    <option value="true">Sim</option>
  </select>
</div>
```

```javascript
// No submit handler
urgente: document.getElementById('prescUrgente').value === 'true'
```

---

### Adicionar Nova Lista (ex: "Fornecedores")

1. **SharePoint**:
   - Criar nova lista "Fornecedores"
   - Definir colunas

2. **config.js**:
```javascript
LISTAS: {
  PRESCRICOES: 'Prescricoes',
  RECEBIMENTOS: 'Recebimentos',
  DISPENSACOES: 'Dispensacoes',
  PERDAS: 'Perdas',
  FORNECEDORES: 'Fornecedores'  // NOVO
}
```

3. **sharepoint-api.js**:
```javascript
const Fornecedores = {
  async criar(dados) {
    const item = {
      Title: dados.nome,
      CNPJ: dados.cnpj,
      Contato: dados.contato
    };
    return await criarItem(SharePointConfig.LISTAS.FORNECEDORES, item);
  },

  async buscarTodos() {
    return await buscarItens(SharePointConfig.LISTAS.FORNECEDORES);
  }
};

// No return:
return {
  // ... existentes ...
  Fornecedores  // NOVO
};
```

4. **sistema-npt-sharepoint.html**:
   - Adicionar nova tab
   - Criar formulário
   - Adicionar event handlers

---

### Modificar Regra de Negócio

**Exemplo**: Mudar filtro de dispensação para incluir "Parcialmente Conforme"

```javascript
// sharepoint-api.js → Recebimentos.buscarConformes()
async buscarConformes() {
  return await buscarItens(SharePointConfig.LISTAS.RECEBIMENTOS, {
    // ANTES:
    // filter: "StatusConferencia eq 'Conforme'",

    // DEPOIS:
    filter: "(StatusConferencia eq 'Conforme') or (StatusConferencia eq 'Parcialmente Conforme')",

    orderBy: 'Created desc'
  });
}
```

---

### Adicionar Validação Customizada

**Exemplo**: Impedir criar prescrição com leito já em uso

```javascript
// No event handler do formPrescricao
document.getElementById('formPrescricao').addEventListener('submit', async function(e) {
  e.preventDefault();

  const leito = document.getElementById('prescLeito').value.trim();

  // Validação customizada
  const prescricoes = await SharePointAPI.Prescricoes.buscarTodas();
  const leitoEmUso = prescricoes.some(p =>
    p.Leito === leito &&
    (p.Status === 'Aguardando Bolsa' || p.Status === 'Bolsa Recebida')
  );

  if (leitoEmUso) {
    alert(`❌ Leito ${leito} já possui prescrição ativa. Verifique!`);
    return;
  }

  // Continuar com salvamento normal
  const dados = { /* ... */ };
  pedirLogin('prescricao', dados);
});
```

---

### Migrar para Entra ID (Produção)

1. **Registrar app no Azure**:
   - Portal Azure → Azure Active Directory → App registrations
   - New registration
   - Configurar Redirect URI
   - Anotar Client ID e Tenant ID

2. **Adicionar permissões**:
   - API permissions → Add permission → SharePoint
   - AllSites.Read, AllSites.Write

3. **Instalar MSAL.js**:
```html
<script src="https://alcdn.msauth.net/browser/2.14.2/js/msal-browser.min.js"></script>
```

4. **Substituir auth-simulator.js** por módulo Entra ID (ver seção Segurança)

5. **Atualizar config.js**:
```javascript
MODO_DESENVOLVIMENTO: false  // Desabilitar simulador
```

6. **Remover** `usuarios.json` e `auth-simulator.js`

7. **Testar** autenticação OAuth

---

### Performance: Paginação para Grandes Volumes

Se histórico ficar muito grande (>1000 items), implementar paginação:

```javascript
// sharepoint-api.js
async buscarItens(nomeLista, options = {}) {
  let url = SharePointConfig.getItemsUrl(nomeLista);
  const params = [];

  // ... código existente ...

  // Adicionar skip para paginação
  if (options.skip) {
    params.push(`$skip=${options.skip}`);
  }

  // ... resto do código ...
}
```

```javascript
// sistema-npt-sharepoint.html
let paginaAtual = 0;
const ITEMS_POR_PAGINA = 50;

async function atualizarHistorico(pagina = 0) {
  const prescricoes = await SharePointAPI.Prescricoes.buscarItens({
    orderBy: 'Created desc',
    top: ITEMS_POR_PAGINA,
    skip: pagina * ITEMS_POR_PAGINA
  });
  // ... renderizar + botões Anterior/Próximo ...
}
```

---

## 📞 Suporte

**Desenvolvedor**: Claude (Anthropic)
**Data de Criação**: 2025-12-25
**Versão**: 1.0

**Contato TI HUWC**:
- Email: fscmhuwc@gmail.com
- Setor: Farmácia

**Documentação SharePoint**:
- [SharePoint REST API Reference](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service)
- [Microsoft Entra ID Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)

---

**Fim da Documentação Técnica**
