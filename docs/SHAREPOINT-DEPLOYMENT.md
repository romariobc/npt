# Guia de Implantação - Sistema NPT HUWC no SharePoint

## Visão Geral

Este documento fornece instruções passo-a-passo para implantar o Sistema NPT HUWC no SharePoint Online do hospital.

**Pré-requisitos:**
- Acesso administrativo ao SharePoint Online
- Permissões para criar sites e listas
- Navegador moderno (Chrome, Edge, Firefox)
- Conhecimentos básicos de SharePoint

---

## Parte 1: Criação do Site SharePoint

### Passo 1.1: Criar Site de Equipe

1. Acesse o SharePoint Online do hospital
2. Clique em **"+ Criar site"**
3. Selecione **"Site de equipe"**
4. Configure:
   - **Nome do site**: `Sistema NPT HUWC`
   - **Descrição**: `Sistema de Gestão de Nutrição Parenteral Total`
   - **Idioma**: Português (Brasil)
   - **Privacidade**: Privado (apenas membros podem acessar)
5. Clique em **"Avançar"** e adicione proprietários e membros
6. Clique em **"Concluir"**

### Passo 1.2: Anotar URL do Site

Após criar o site, anote a URL completa:
```
https://[SEU-TENANT].sharepoint.com/sites/SistemaNPT
```

**Esta URL será necessária na configuração do sistema!**

---

## Parte 2: Criação das Listas SharePoint

Você precisará criar 4 listas customizadas. Siga as instruções abaixo para cada uma.

### 2.1 Lista: Prescricoes

1. No site criado, clique em **"+ Novo"** → **"Lista"**
2. Selecione **"Lista em branco"**
3. Configure:
   - **Nome**: `Prescricoes` (sem acento, exatamente assim)
   - **Descrição**: `Prescrições médicas de NPT`
4. Clique em **"Criar"**

#### Colunas da Lista Prescricoes

Adicione as seguintes colunas (clique em **"+ Adicionar coluna"**):

| Nome da Coluna | Tipo | Configuração |
|----------------|------|--------------|
| `Title` | Texto (já existe) | Renomear para "ID Prescrição" |
| `Paciente` | Texto | Obrigatório, linha única |
| `Prontuario` | Texto | Obrigatório, linha única |
| `Leito` | Texto | Obrigatório, linha única |
| `Vazao` | Texto | Obrigatório, linha única |
| `Volume` | Texto | Obrigatório, linha única |
| `Composicao` | Texto | Múltiplas linhas, não obrigatório |
| `Observacoes` | Texto | Múltiplas linhas, não obrigatório |
| `Status` | Escolha | Opções: `Aguardando Bolsa`, `Bolsa Recebida`, `Dispensada`, `Devolvida` |

**Configuração da coluna Status:**
- Tipo: Escolha
- Escolhas (uma por linha):
  ```
  Aguardando Bolsa
  Bolsa Recebida
  Dispensada
  Devolvida
  ```
- Valor padrão: `Aguardando Bolsa`
- Permitir seleção: Apenas uma opção

---

### 2.2 Lista: Recebimentos

1. Clique em **"+ Novo"** → **"Lista"**
2. Selecione **"Lista em branco"**
3. Configure:
   - **Nome**: `Recebimentos`
   - **Descrição**: `Recebimento de bolsas da Pronutrir`
4. Clique em **"Criar"**

#### Colunas da Lista Recebimentos

| Nome da Coluna | Tipo | Configuração |
|----------------|------|--------------|
| `Title` | Texto (já existe) | Renomear para "ID Recebimento" |
| `IDPrescricao` | Texto | Obrigatório, linha única |
| `Lote` | Texto | Obrigatório, linha única |
| `Paciente` | Texto | Obrigatório, linha única |
| `Leito` | Texto | Obrigatório, linha única |
| `Temperatura` | Escolha | Opções: `Sim`, `Não` |
| `Integridade` | Escolha | Opções: `Íntegra`, `Violada` |
| `StatusConferencia` | Escolha | Opções: `Conforme`, `Inconsistente` |
| `Conferente` | Texto | Obrigatório, linha única |
| `Observacoes` | Texto | Múltiplas linhas, não obrigatório |

---

### 2.3 Lista: Dispensacoes

1. Clique em **"+ Novo"** → **"Lista"**
2. Selecione **"Lista em branco"**
3. Configure:
   - **Nome**: `Dispensacoes`
   - **Descrição**: `Dispensação de NPT para unidades`
4. Clique em **"Criar"**

#### Colunas da Lista Dispensacoes

| Nome da Coluna | Tipo | Configuração |
|----------------|------|--------------|
| `Title` | Texto (já existe) | Renomear para "ID Dispensação" |
| `IDPrescricao` | Texto | Obrigatório, linha única |
| `Lote` | Texto | Obrigatório, linha única |
| `Paciente` | Texto | Obrigatório, linha única |
| `Leito` | Texto | Obrigatório, linha única |
| `HoraDispensa` | Texto | Obrigatório, linha única |
| `Entregou` | Texto | Obrigatório, linha única |
| `Recebeu` | Texto | Obrigatório, linha única |
| `Observacoes` | Texto | Múltiplas linhas, não obrigatório |

---

### 2.4 Lista: Perdas

1. Clique em **"+ Novo"** → **"Lista"**
2. Selecione **"Lista em branco"**
3. Configure:
   - **Nome**: `Perdas`
   - **Descrição**: `Registro de perdas e devoluções`
4. Clique em **"Criar"**

#### Colunas da Lista Perdas

| Nome da Coluna | Tipo | Configuração |
|----------------|------|--------------|
| `Title` | Texto (já existe) | Renomear para "ID Perda" |
| `IDPrescricao` | Texto | Obrigatório, linha única |
| `TipoPerda` | Escolha | Opções: `Devolução`, `Perda` |
| `Motivo` | Escolha | Ver lista abaixo |
| `Detalhes` | Texto | Múltiplas linhas, obrigatório |

**Configuração da coluna Motivo:**
```
Temperatura inadequada
Composição incorreta
Volume errado
Identificação incorreta
Integridade comprometida
Cancelamento médico
Alta do paciente
Óbito
Validade vencida
Outro
```

---

## Parte 3: Configuração de Permissões

### 3.1 Permissões do Site

1. No site, clique em **⚙️ Configurações** → **"Permissões do site"**
2. Configure grupos de acesso:

**Grupo: Proprietários (Administradores)**
- Permissões: Controle Total
- Adicionar: Administradores TI, Coordenador de Farmácia

**Grupo: Membros (Farmacêuticos e Técnicos)**
- Permissões: Editar
- Adicionar: Farmacêuticos, Técnicos de Farmácia autorizados

**Grupo: Visitantes (Visualização)**
- Permissões: Ler
- Adicionar: Supervisores, Auditores (se necessário)

### 3.2 Permissões das Listas

Por padrão, as listas herdam as permissões do site. Se necessário:

1. Acesse cada lista → **⚙️ Configurações** → **"Configurações da lista"**
2. Clique em **"Permissões desta lista"**
3. Ajuste conforme necessário

**Recomendação**: Manter herança para simplificar gestão.

---

## Parte 4: Configuração do Código

### 4.1 Atualizar config.js

1. Abra o arquivo `config.js`
2. Localize a linha:
   ```javascript
   SITE_URL: 'https://[SEU-TENANT].sharepoint.com/sites/SistemaNPT',
   ```
3. Substitua `[SEU-TENANT]` pela URL real anotada no Passo 1.2
4. Exemplo:
   ```javascript
   SITE_URL: 'https://hospital.sharepoint.com/sites/SistemaNPT',
   ```

### 4.2 Validar Nomes das Listas

Verifique se os nomes das listas em `config.js` correspondem exatamente aos criados:

```javascript
LISTAS: {
  PRESCRICOES: 'Prescricoes',
  RECEBIMENTOS: 'Recebimentos',
  DISPENSACOES: 'Dispensacoes',
  PERDAS: 'Perdas'
}
```

**IMPORTANTE**: Os nomes são case-sensitive!

### 4.3 Modo de Desenvolvimento vs Produção

**Para testes iniciais (MODO_DESENVOLVIMENTO = true):**
- Usa autenticação simulada (auth-simulator.js)
- Exibe banner de desenvolvimento
- Usuários de teste pré-configurados

**Para produção (MODO_DESENVOLVIMENTO = false):**
- Requer configuração de Entra ID (ver Parte 5)
- Remove banner de desenvolvimento
- Usa autenticação real do hospital

---

## Parte 5: Upload dos Arquivos

### 5.1 Criar Biblioteca de Documentos

1. No site SharePoint, clique em **"+ Novo"** → **"Biblioteca de documentos"**
2. Nome: `SistemaApp`
3. Clique em **"Criar"**

### 5.2 Upload dos Arquivos

Faça upload dos seguintes arquivos para a biblioteca `SistemaApp`:

```
sistema-npt-sharepoint-2025-12.html
config.js
sharepoint-api.js
auth-simulator.js (apenas para testes)
usuarios.json (apenas para testes)
```

### 5.3 Configurar Página Inicial

**Opção A: Web Part (Recomendado)**

1. Crie uma nova página no site: **"+ Novo"** → **"Página"**
2. Escolha layout "Branco"
3. Adicione Web Part: **"Inserir código"** ou **"Arquivo"**
4. Configure para exibir `sistema-npt-sharepoint-2025-12.html`

**Opção B: Link Direto**

1. Após upload, clique com botão direito no arquivo HTML
2. Selecione **"Detalhes"**
3. Copie o link do arquivo
4. Crie um botão ou link na página inicial do site

---

## Parte 6: Testes

### 6.1 Teste de Conexão

1. Abra o sistema no navegador
2. Verifique o badge no topo: deve exibir **"● SharePoint Conectado"**
3. Se aparecer erro, verifique:
   - URL configurada em config.js
   - Permissões de acesso
   - Console do navegador (F12)

### 6.2 Teste de Fluxo Completo

Execute o fluxo completo para validar:

1. **Prescrição**:
   - Registre uma prescrição de teste
   - Verifique se aparece no histórico
   - Confirme criação na lista SharePoint

2. **Recebimento**:
   - Registre recebimento da prescrição
   - Verifique se status mudou para "Bolsa Recebida"

3. **Dispensação**:
   - Registre dispensação
   - Verifique se status mudou para "Dispensada"

4. **Perda/Devolução**:
   - Registre uma perda
   - Verifique se status mudou para "Devolvida"

5. **Exportação**:
   - Teste exportação CSV
   - Valide dados exportados

### 6.3 Teste de Autenticação

**Modo Desenvolvimento:**
- Teste login com usuários simulados:
  - admin / 12345
  - farmacia / farm123
  - tecnico1 / senha1

**Modo Produção:**
- Valide integração com Entra ID
- Teste com usuários reais do hospital

---

## Parte 7: Produção e Segurança

### 7.1 Checklist Pré-Produção

Antes de liberar para uso:

- [ ] Todas as listas criadas e configuradas
- [ ] Permissões configuradas corretamente
- [ ] URL configurada em config.js
- [ ] Fluxo completo testado com dados reais
- [ ] Autenticação Entra ID configurada (se produção)
- [ ] Backup inicial das listas (exportar para Excel)
- [ ] Documentação entregue à equipe
- [ ] Treinamento realizado

### 7.2 Migração de Dados Existentes

Se já possui dados na versão localStorage:

1. Exporte CSV da versão antiga
2. Importe manualmente nas listas SharePoint
3. OU desenvolva script de migração (consultar TI)

### 7.3 Segurança

**Recomendações:**

1. **NUNCA usar MODO_DESENVOLVIMENTO em produção**
2. Remover `auth-simulator.js` do servidor de produção
3. Habilitar auditoria nas listas SharePoint
4. Configurar política de retenção de dados
5. Revisar permissões trimestralmente
6. Implementar backup automático (Power Automate)

---

## Parte 8: Manutenção

### 8.1 Backup Regular

**Manual:**
1. Acesse cada lista
2. **"Exportar para Excel"**
3. Salvar em local seguro

**Automatizado (Power Automate):**
- Configurar fluxo semanal
- Exportar listas para SharePoint/OneDrive
- Notificar administradores

### 8.2 Monitoramento

Monitore regularmente:
- Uso de espaço nas listas
- Performance de carregamento
- Erros no console (navegador)
- Feedback dos usuários

### 8.3 Atualizações

Ao atualizar o sistema:
1. Testar em site de desenvolvimento primeiro
2. Comunicar usuários sobre manutenção
3. Fazer backup antes da atualização
4. Atualizar arquivos na biblioteca
5. Validar funcionamento
6. Documentar mudanças

---

## Parte 9: Autenticação Entra ID (Produção)

### 9.1 Requisitos

Para usar autenticação Entra ID real:
- Tenant Azure AD configurado
- Permissões de administrador
- App Registration no Azure Portal

### 9.2 Configuração Azure AD

1. Acesse **Azure Portal** → **Azure Active Directory**
2. Navegue para **"App registrations"** → **"+ New registration"**
3. Configure:
   - **Name**: `Sistema NPT HUWC`
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**:
     - Tipo: Single-page application (SPA)
     - URI: `https://[SEU-SITE]/SitePages/SistemaNPT.aspx`
4. Clique em **"Register"**

### 9.3 Configurar Permissões API

1. No app registrado, vá para **"API permissions"**
2. Adicione permissões:
   - **Microsoft Graph**: User.Read
   - **SharePoint**: AllSites.Manage (ou permissão específica)
3. Clique em **"Grant admin consent"**

### 9.4 Obter Client ID

1. No app registrado, vá para **"Overview"**
2. Copie **"Application (client) ID"**
3. Adicione em `config.js`:
   ```javascript
   ENTRA_ID_CLIENT_ID: 'seu-client-id-aqui',
   ```

### 9.5 Implementar Autenticação

Substitua `auth-simulator.js` por implementação MSAL (Microsoft Authentication Library):

```javascript
// Exemplo básico - consultar documentação Microsoft MSAL
const msalConfig = {
  auth: {
    clientId: SharePointConfig.ENTRA_ID_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/[TENANT-ID]',
    redirectUri: window.location.origin
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);
```

**Documentação oficial**: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview

---

## Parte 10: Suporte e Troubleshooting

### 10.1 Problemas Comuns

**Erro: "Não foi possível conectar ao SharePoint"**
- Verificar URL em config.js
- Confirmar permissões de acesso
- Verificar se está logado no SharePoint

**Erro: "Lista não encontrada"**
- Verificar nome exato das listas (case-sensitive)
- Confirmar que listas foram criadas
- Verificar permissões nas listas

**Erro: "Form Digest inválido"**
- Fazer logout e login novamente
- Limpar cache do navegador
- Verificar configuração de cookies

**Dados não aparecem no histórico**
- Verificar console do navegador (F12)
- Confirmar que dados foram salvos nas listas
- Atualizar página

### 10.2 Logs e Debug

Para ativar logs detalhados:

1. Abra `config.js`
2. Configure:
   ```javascript
   DEBUG: true
   ```
3. Abra console do navegador (F12)
4. Execute operações e observe logs

### 10.3 Contato TI

Para suporte técnico:
- Equipe de TI do hospital
- E-mail: [email-ti@hospital.local]
- Telefone: [telefone-suporte]

---

## Conclusão

Após completar todos os passos, o Sistema NPT HUWC estará operacional no SharePoint com:

✅ Site dedicado e listas configuradas
✅ Controle de acesso e permissões
✅ Fluxo completo de prescrição → dispensação
✅ Histórico centralizado e rastreável
✅ Dados persistentes e auditáveis
✅ Backup e segurança de dados

Para dúvidas ou suporte, consulte a documentação técnica ou entre em contato com a TI.

---

**Versão do documento**: 1.0
**Data**: Dezembro 2025
**Autor**: Sistema NPT HUWC
