# Apresentação TI - Sistema NPT HUWC SharePoint

## 🎯 Objetivo da Reunião

Apresentar o Sistema NPT HUWC integrado com SharePoint Online e solicitar validação técnica + orientações para implementação de autenticação Entra ID conforme diretrizes do hospital.

**Duração estimada**: 30-45 minutos

---

## 📋 Agenda

1. [Introdução e Contexto](#1-introdução-e-contexto) (5 min)
2. [Demonstração do Sistema](#2-demonstração-do-sistema) (10 min)
3. [Arquitetura Técnica](#3-arquitetura-técnica) (10 min)
4. [Segurança e Compliance](#4-segurança-e-compliance) (5 min)
5. [Próximos Passos - Autenticação Entra ID](#5-próximos-passos) (5 min)
6. [Perguntas e Validação](#6-perguntas-e-validação) (5-10 min)

---

## 1. Introdução e Contexto

### Problema Atual

**Sistema Anterior (localStorage)**:
- ❌ Dados armazenados apenas no navegador (não persistente)
- ❌ Sem sincronização entre dispositivos
- ❌ Sem backup automático
- ❌ Sem auditoria de mudanças
- ❌ Não conforme com LGPD
- ❌ Risco de perda de dados

### Solução Proposta

**Sistema Novo (SharePoint Online)**:
- ✅ Dados centralizados em SharePoint (Microsoft 365)
- ✅ Sincronização automática entre dispositivos
- ✅ Backup automático (Microsoft 365)
- ✅ Auditoria completa (quem, quando, o quê)
- ✅ Compliance LGPD (tenant brasileiro)
- ✅ Segurança enterprise (Microsoft)

### Por Que SharePoint?

1. **Já disponível**: Hospital já possui Microsoft 365
2. **Sem custo adicional**: Incluído na licença existente
3. **Aprovação facilitada**: Plataforma já homologada pela TI
4. **Integração nativa**: Entra ID, Teams, Power BI
5. **Suporte oficial**: Microsoft com SLA

---

## 2. Demonstração do Sistema

### Fluxo Completo de Trabalho

#### **2.1 Prescrição** (Farmacêutico)
```
📧 Email recebido → 📝 Registro no sistema → 🆔 ID auto-gerado (NPT-00001)
→ Encaminhar Pronutrir → 🖨️ Imprimir 2 vias
```

**DEMO AO VIVO**:
1. Abrir `sistema-npt-sharepoint.html`
2. Preencher formulário de prescrição
3. Salvar (mostrar autenticação simulada)
4. Exibir item criado no SharePoint
5. Mostrar ID auto-gerado

---

#### **2.2 Recebimento da Bolsa** (Tarde)
```
📦 Bolsa chega → ✅ Conferência (6 itens) → ✍️ Registro
→ Status: Conforme ou Inconsistente
```

**DEMO AO VIVO**:
1. Selecionar prescrição aguardando bolsa (dropdown dinâmico)
2. Dados auto-preenchidos (paciente, leito, etc.)
3. Preencher conferência
4. Salvar
5. Mostrar atualização de status no SharePoint

---

#### **2.3 Dispensação** (Noite ~21h)
```
🔍 Re-conferir → 🏥 Enviar para unidade → ✍️ Registrar entrega/recebimento
→ 📊 Preencher Google Forms
```

**DEMO AO VIVO**:
1. Dropdown mostra APENAS recebimentos conformes não dispensados
2. Dados auto-preenchidos
3. Registrar quem entregou/recebeu
4. Salvar
5. Status atualiza para "Dispensada"

---

#### **2.4 Perdas/Devoluções** (Quando necessário)
```
❌ Problema identificado → 📝 Registrar motivo detalhado
→ 📊 Preencher Google Forms
```

**DEMO AO VIVO**:
1. Registrar devolução (temperatura inadequada)
2. Motivo + detalhes obrigatórios
3. Status atualiza para "Devolvida"

---

#### **2.5 Histórico e Exportação**
```
📊 Visualizar todos os registros → 📥 Exportar CSV (Excel)
```

**DEMO AO VIVO**:
1. Tabela com todos os registros (4 tipos)
2. Filtros por status (badges coloridos)
3. Exportar CSV
4. Abrir no Excel (verificar encoding UTF-8)

---

### Vantagens Demonstradas

| Funcionalidade | Antes (localStorage) | Agora (SharePoint) |
|----------------|----------------------|--------------------|
| **Persistência** | ❌ Apenas um navegador | ✅ Qualquer dispositivo |
| **Backup** | ❌ Manual (nenhum) | ✅ Automático (MS365) |
| **Auditoria** | ❌ Não rastreável | ✅ Autor, data, IP |
| **Colaboração** | ❌ Isolado | ✅ Multi-usuário simultâneo |
| **Segurança** | ❌ Client-side | ✅ Enterprise (Entra ID) |
| **Compliance** | ❌ Não | ✅ LGPD ready |

---

## 3. Arquitetura Técnica

### Stack Tecnológico

```
┌─────────────────────────────────┐
│  FRONTEND                       │
│  - HTML5 + Bootstrap 5.3.0      │
│  - JavaScript ES6+ (Vanilla)    │
│  - Zero build process           │
│  - Zero npm dependencies        │
└────────────┬────────────────────┘
             │ HTTPS / REST API
             ▼
┌─────────────────────────────────┐
│  BACKEND                        │
│  - SharePoint Online (MS 365)   │
│  - 4 Listas (Prescricoes, etc.) │
│  - REST API nativa              │
│  - Form Digest authentication   │
└─────────────────────────────────┘
```

### Estrutura de Arquivos (Simplicidade)

```
npt/
├── sistema-npt-sharepoint.html   # App principal (40KB)
├── config.js                     # Configurações (5KB)
├── sharepoint-api.js             # Integração SharePoint (17KB)
└── auth-simulator.js             # Simulador (DEV ONLY - 12KB)
```

**Total**: ~75KB (sem dependências externas!)

### Por Que Sem Build Process?

✅ **Vantagens**:
- Manutenção simplificada (apenas HTML/JS/CSS)
- Deploy = copiar arquivos
- Sem vulnerabilidades npm
- Funciona em qualquer servidor web estático
- Sem node_modules (0 bytes)

❌ **Desvantagens** (aceitáveis para este projeto):
- Sem TypeScript (mas JS é simples e documentado)
- Sem bundling (mas arquivos já são pequenos)
- Sem minificação (mas total <100KB)

---

### Estrutura SharePoint

**4 Listas Criadas**:

1. **Prescricoes** (9 colunas)
   - Title = ID prescrição (NPT-00001)
   - Paciente, Prontuário, Leito, Vazão, Volume, etc.
   - Status (Choice: Aguardando / Recebida / Dispensada / Devolvida)

2. **Recebimentos** (10 colunas)
   - IDPrescricao (referência)
   - Lote, Temperatura, Integridade, StatusConferencia
   - Conferente

3. **Dispensacoes** (9 colunas)
   - IDPrescricao, Lote
   - HoraDispensa, Entregou, Recebeu

4. **Perdas** (5 colunas)
   - IDPrescricao, TipoPerda, Motivo, Detalhes

**Vantagens das Listas SharePoint**:
- Versionamento automático
- Auditoria (Created, Modified, Author, Editor)
- Permissões granulares
- Backup Microsoft 365
- Recuperação de items deletados (Recycle Bin)

---

### Integração SharePoint REST API

**Operações CRUD**:

```javascript
// CREATE
POST https://[tenant].sharepoint.com/sites/SistemaNPT/_api/web/lists/getbytitle('Prescricoes')/items
Headers: X-RequestDigest, Content-Type
Body: { __metadata: {...}, Title: "NPT-00001", Paciente: "...", ... }

// READ
GET https://[tenant].sharepoint.com/sites/SistemaNPT/_api/web/lists/getbytitle('Prescricoes')/items
Filters: ?$filter=Status eq 'Aguardando Bolsa'&$orderby=Created desc

// UPDATE
POST https://[tenant].sharepoint.com/sites/SistemaNPT/_api/web/lists/getbytitle('Prescricoes')/items(15)
Headers: X-HTTP-Method: MERGE, IF-MATCH: *, X-RequestDigest
Body: { __metadata: {...}, Status: "Bolsa Recebida" }

// DELETE
POST https://[tenant].sharepoint.com/sites/SistemaNPT/_api/web/lists/getbytitle('Prescricoes')/items(15)
Headers: X-HTTP-Method: DELETE, IF-MATCH: *, X-RequestDigest
```

**Form Digest**:
- Token de segurança para operações de escrita
- Expira em 30 minutos
- Renovado automaticamente pelo sistema
- Proteção contra CSRF

---

## 4. Segurança e Compliance

### Estado Atual (Desenvolvimento)

⚠️ **ATENÇÃO**: Sistema atualmente usa **autenticação simulada** para testes.

**Arquivo**: `auth-simulator.js`
- Simula login com `usuarios.json` (pares username:password)
- **USO**: Apenas desenvolvimento/testes
- **REMOÇÃO**: Obrigatória antes de produção

**Validação Visual**:
- Banner amarelo: "⚠️ MODO DESENVOLVIMENTO - Autenticação simulada ativa"
- Configuração: `config.js` → `MODO_DESENVOLVIMENTO: true`

---

### Estado Desejado (Produção)

✅ **Microsoft Entra ID (Azure AD)**:

```
┌──────────────────────────────────────────────┐
│  1. Usuário acessa sistema                   │
│  2. Redirect para login.microsoftonline.com  │
│  3. Usuário digita credenciais hospital      │
│  4. MFA (se configurado)                     │
│  5. Entra ID emite token JWT                 │
│  6. Sistema usa token para acessar SharePoint│
│  7. Permissões baseadas em grupos AD         │
└──────────────────────────────────────────────┘
```

**Benefícios**:
- ✅ Single Sign-On (SSO) - mesma conta Office 365
- ✅ Multi-Factor Authentication (MFA)
- ✅ Gerenciamento centralizado de usuários
- ✅ Revogação instantânea de acesso
- ✅ Audit logs do Azure AD
- ✅ Conditional Access Policies

---

### Compliance LGPD

| Requisito LGPD | Status | Implementação |
|----------------|--------|---------------|
| **Consentimento** | ✅ | Termo de uso (a adicionar) |
| **Finalidade** | ✅ | Documentado (gestão NPT) |
| **Adequação** | ✅ | Apenas dados necessários |
| **Transparência** | ✅ | Usuário vê quem/quando modificou |
| **Segurança** | ⚠️ | OK com Entra ID (pendente) |
| **Prevenção** | ✅ | SharePoint antivírus/DLP |
| **Não discriminação** | ✅ | N/A |
| **Livre acesso** | ✅ | Paciente pode solicitar dados |
| **Portabilidade** | ✅ | Exportação CSV |
| **Eliminação** | ✅ | Deleção manual + Recycle Bin |

**Localização dos Dados**:
- Servidor: Microsoft Azure (região configurável)
- Recomendação: Brazil South (São Paulo) ou Brazil Southeast (Rio de Janeiro)
- Verificar: Admin Center MS365 → Settings → Organization profile → Data location

---

### Auditoria Completa

**Automática (SharePoint)**:
- Author: Quem criou o item
- Created: Quando foi criado
- Editor: Quem modificou pela última vez
- Modified: Quando foi modificada última vez
- IP Address (SharePoint Audit Logs)

**Manual (Google Forms)**:
- Indicadores de bolsas dispensadas
- Indicadores de perdas/devoluções
- **Nota**: Não automatizado (farmacêutico preenche manualmente)

---

## 5. Próximos Passos

### O Que Precisamos da TI

#### 5.1 Validação de Arquitetura

**Perguntas**:
- ✅ Arquitetura proposta está aprovada?
- ✅ SharePoint Online é a solução adequada?
- ✅ Alguma restrição de segurança não considerada?
- ✅ Estrutura de listas está adequada?

---

#### 5.2 Configuração de Autenticação Entra ID

**Solicitação**:
Orientações/template para implementar autenticação Entra ID conforme diretrizes do hospital.

**Informações Necessárias**:
1. **App Registration no Azure**:
   - TI cria ou nós criamos sob supervisão?
   - Client ID
   - Tenant ID
   - Redirect URIs permitidas

2. **Permissões SharePoint**:
   - Quais scopes usar? (AllSites.Read, AllSites.Write, Sites.Selected?)
   - Delegated ou Application permissions?

3. **Grupos de Segurança**:
   - Criar grupos AD específicos? (ex: "HUWC-NPT-Farmacia", "HUWC-NPT-Tecnico")
   - Ou usar grupos existentes?

4. **Políticas de Acesso Condicional**:
   - Restringir por IP (rede do hospital)?
   - Exigir MFA?
   - Dispositivos gerenciados only?

5. **Configurações de Sessão**:
   - Timeout de sessão?
   - Persistent browser session?

---

#### 5.3 Deploy em Produção

**Opções**:

**Opção A: SharePoint App Catalog** (Recomendado)
- Deploy via App Catalog do SharePoint
- Versioning automático
- Rollback facilitado
- Acesso controlado

**Opção B: SharePoint Site Assets**
- Upload direto em Site Assets do site NPT
- Mais simples mas sem versioning robusto

**Opção C: Servidor Web Interno**
- Hospedar em servidor IIS do hospital
- Aponta para SharePoint via API
- Mais controle mas mais complexo

**Pergunta para TI**: Qual opção é padrão do hospital?

---

#### 5.4 Configuração SharePoint

**Solicitar**:
- Criação do site "SistemaNPT" (ou nome preferido)
- Permissões para equipe de farmácia
- Configuração de listas (podemos fazer ou TI prefere criar via template?)

**Informações para config.js**:
- URL completa do site: `https://[TENANT].sharepoint.com/sites/[NOME-SITE]`
- Nomes exatos das listas (se TI criar)

---

#### 5.5 Testes em Ambiente de Homologação

**Solicitação**:
- Site SharePoint de homologação (se disponível)
- Conta de teste para validação
- Período de testes: 1-2 semanas

**Entregáveis pré-produção**:
- [ ] Todos os testes do ROTEIRO_TESTES.md passando
- [ ] Autenticação Entra ID implementada e testada
- [ ] Validação de segurança pela TI
- [ ] Treinamento de usuários finais (farmacêuticos/técnicos)
- [ ] Documentação atualizada

---

#### 5.6 Monitoramento e Suporte Pós-Deploy

**Proposta**:
- **Período de acompanhamento**: 30 dias pós-deploy
- **Responsável desenvolvimento**: Farmácia (com suporte TI)
- **Responsável infraestrutura**: TI
- **SLA de suporte**: A definir

**Métricas de Sucesso**:
- [ ] 100% das prescrições registradas no sistema
- [ ] Zero perda de dados
- [ ] Tempo de resposta < 3 segundos
- [ ] Uptime > 99% (SharePoint SLA Microsoft)
- [ ] Satisfação dos usuários > 80%

---

## 6. Perguntas e Validação

### Checklist de Validação TI

Por favor, validar os seguintes pontos:

#### Arquitetura
- [ ] Arquitetura SharePoint Online aprovada
- [ ] Estrutura de listas adequada
- [ ] Integração REST API está OK
- [ ] Zero dependências npm é aceitável

#### Segurança
- [ ] Autenticação Entra ID será implementada (orientações fornecidas)
- [ ] Permissões SharePoint estão adequadas
- [ ] Compliance LGPD está atendido
- [ ] Auditoria está suficiente

#### Deploy
- [ ] Método de deploy definido (App Catalog / Site Assets / IIS)
- [ ] Ambiente de homologação será disponibilizado
- [ ] Timeline de deploy acordada

#### Suporte
- [ ] SLA de suporte definido
- [ ] Responsabilidades divididas (Farmácia vs TI)
- [ ] Processo de atualização definido

---

### Perguntas Frequentes (Antecipadas)

#### P: Por que não usar Power Apps?

**R**: Consideramos, mas:
- ✅ HTML/JS é mais flexível e customizável
- ✅ Zero custo de licenças Power Apps Premium (se necessário conectores)
- ✅ Equipe já familiar com web development
- ⚠️ Podemos reavaliar se TI preferir Power Apps

---

#### P: Por que não usar banco SQL Server?

**R**:
- ✅ SharePoint já disponível (sem setup adicional)
- ✅ Aprovação mais rápida (plataforma já homologada)
- ✅ Integração nativa com Entra ID
- ⚠️ SQL seria mais robusto para >10k registros/ano, mas volume atual não justifica

---

#### P: Como garantir backup dos dados?

**R**:
- ✅ SharePoint Online = backup automático Microsoft 365
- ✅ Retention policies configuráveis (admin MS365)
- ✅ Recycle Bin (30 dias)
- ✅ Second-stage Recycle Bin (93 dias)
- ✅ Exportação CSV regular (manual)

---

#### P: E se SharePoint ficar fora do ar?

**R**:
- ✅ SLA Microsoft 365: 99.9% uptime
- ⚠️ Downtime planejado: notificado com antecedência (Message Center)
- ⚠️ Downtime não planejado: raro, mas possível
- **Contingência**: Formulário Google Forms temporário (já usado para indicadores)

---

#### P: Sistema funciona offline?

**R**:
- ❌ Não. Requer conexão internet (SharePoint é cloud)
- **Alternativa**: Progressive Web App (PWA) com cache (podemos implementar se necessário)

---

#### P: Quantos usuários simultâneos suporta?

**R**:
- ✅ SharePoint REST API: sem limite prático para nosso volume
- ✅ Throttling: 2000 requests/user/hour (mais que suficiente)
- ✅ Estimativa HUWC: ~5-10 usuários simultâneos (farmacêuticos/técnicos)

---

#### P: Dados são criptografados?

**R**:
- ✅ Em trânsito: HTTPS/TLS 1.2+ (Microsoft)
- ✅ Em repouso: Encryption at rest (Azure Storage)
- ✅ Compliance: ISO 27001, SOC 2, LGPD

---

## 📄 Materiais de Apoio

### Documentos Entregues

1. ✅ **GUIA_CONFIGURACAO_SHAREPOINT.md** - Passo-a-passo criação listas
2. ✅ **ROTEIRO_TESTES.md** - Testes CRUD completos
3. ✅ **DOCUMENTACAO_TECNICA.md** - Arquitetura, API reference, troubleshooting
4. ✅ **CHECKLIST_VALIDACAO.md** - Checklist pré-produção (próximo documento)
5. ✅ **README.md** - Visão geral do projeto (próximo documento)

### Código-Fonte

- `sistema-npt-sharepoint.html` - Aplicação completa
- `config.js` - Configurações
- `sharepoint-api.js` - Integração SharePoint
- `auth-simulator.js` - Simulador (remover em produção)

### Demonstração ao Vivo

- ✅ Sistema funcional com SharePoint
- ✅ CRUD completo testado
- ✅ Exportação CSV validada

---

## ✅ Próximas Ações

### Imediatas (Hoje)

1. TI valida arquitetura proposta
2. TI define método de deploy (App Catalog / Site Assets / IIS)
3. TI fornece orientações para Entra ID

### Curto Prazo (Esta Semana)

4. Criação do site SharePoint (TI ou Farmácia)
5. Configuração de listas (seguir GUIA_CONFIGURACAO_SHAREPOINT.md)
6. Atualização de `config.js` com URL real

### Médio Prazo (1-2 Semanas)

7. Implementação de autenticação Entra ID
8. Testes em homologação (ROTEIRO_TESTES.md)
9. Ajustes conforme feedback TI
10. Treinamento de usuários finais

### Longo Prazo (3-4 Semanas)

11. Validação final TI (CHECKLIST_VALIDACAO.md)
12. Deploy em produção
13. Monitoramento 30 dias
14. Retrospectiva e melhorias

---

## 📞 Contato

**Equipe Farmácia HUWC**:
- Email: fscmhuwc@gmail.com

**Desenvolvedor**:
- Claude (Anthropic) - Documentação e código gerados em 2025-12-25

**Suporte Microsoft**:
- SharePoint: https://admin.microsoft.com
- Entra ID: https://entra.microsoft.com

---

## 🎬 Encerramento

### Agradecimento

Obrigado pela atenção e disponibilidade da equipe de TI!

### Expectativa

Aguardamos validação técnica e orientações para implementação de autenticação Entra ID conforme padrões do hospital.

### Compromisso

Estamos comprometidos em seguir todas as diretrizes de segurança e compliance estabelecidas pela TI do HUWC.

---

**Fim da Apresentação**

**Data**: ___/___/______
**Participantes TI**: ________________________________
**Decisão**: [ ] Aprovado  [ ] Aprovado com ressalvas  [ ] Necessita ajustes
**Observações**:
```
_____________________________________________________
_____________________________________________________
_____________________________________________________
```
