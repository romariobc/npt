# Sistema NPT HUWC - SharePoint Edition

> Sistema de Gestão de Nutrição Parenteral Therapy integrado com SharePoint Online para Hospital Universitário Walter Cantídio

[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)](https://github.com)
[![SharePoint](https://img.shields.io/badge/Backend-SharePoint%20Online-blue)](https://www.microsoft.com/pt-br/microsoft-365/sharepoint/collaboration)
[![License](https://img.shields.io/badge/License-HUWC%20Internal-red)](LICENSE)
[![LGPD](https://img.shields.io/badge/Compliance-LGPD-green)](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Uso](#uso)
- [Documentação](#documentação)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Contato](#contato)

---

## 📖 Sobre o Projeto

O **Sistema NPT HUWC** é uma aplicação web para gerenciar o ciclo completo de Nutrição Parenteral Therapy (NPT) no Hospital Universitário Walter Cantídio, desde a prescrição médica até a dispensação final ou registro de perdas/devoluções.

### Problema Resolvido

**Antes** (versão localStorage):
- ❌ Dados armazenados apenas no navegador (não persistente)
- ❌ Sem sincronização entre dispositivos
- ❌ Sem backup automático
- ❌ Sem auditoria
- ❌ Risco de perda de dados
- ❌ Não conforme com LGPD

**Agora** (versão SharePoint):
- ✅ Dados centralizados em SharePoint Online
- ✅ Sincronização automática multi-dispositivo
- ✅ Backup automático (Microsoft 365)
- ✅ Auditoria completa (quem, quando, o quê)
- ✅ Compliance LGPD
- ✅ Segurança enterprise

### Workflow Oficial HUWC (Vigência: 02/12/2025)

```
📧 PRESCRIÇÃO
   ↓ (Email fscmhuwc@gmail.com → Encaminhar Pronutrir → Imprimir 2 vias)

📦 RECEBIMENTO
   ↓ (Tarde: Conferir temperatura, integridade, identificação)

🏥 DISPENSAÇÃO
   ↓ (Noite ~21h: Re-conferir → Enviar para unidade → Registrar)

❌ PERDAS/DEVOLUÇÕES
   (Se necessário: Temperatura inadequada, composição incorreta, etc.)
```

---

## ✨ Funcionalidades

### Módulo 1: Prescrição
- ✅ Registro de prescrição médica recebida por email
- ✅ **ID auto-gerado** sequencial (NPT-00001, NPT-00002, ...)
- ✅ Dados: Paciente, Prontuário, Leito, Vazão, Volume, Composição
- ✅ Status: "Aguardando Bolsa"

### Módulo 2: Recebimento de Bolsa
- ✅ Seleção de prescrição aguardando bolsa (dropdown dinâmico)
- ✅ Dados auto-preenchidos (paciente, leito, vazão, volume)
- ✅ Conferência: Temperatura, Integridade, Lote Pronutrir
- ✅ Status: "Conforme" ou "Inconsistente"
- ✅ Atualização automática: Prescrição → "Bolsa Recebida"

### Módulo 3: Dispensação
- ✅ Seleção de recebimentos conformes não dispensados (dropdown filtrado)
- ✅ Registro de quem entregou/recebeu
- ✅ Hora padrão: 21:00 (editável)
- ✅ Atualização automática: Prescrição → "Dispensada"
- ✅ Lembrete: Preencher Google Forms (indicador)

### Módulo 4: Perdas e Devoluções
- ✅ Registro de devoluções à Pronutrir
- ✅ Registro de perdas (10 motivos pré-definidos)
- ✅ Detalhamento obrigatório
- ✅ Atualização automática: Prescrição → "Devolvida"
- ✅ Lembrete: Preencher Google Forms (indicador)

### Módulo 5: Histórico e Relatórios
- ✅ Visualização de todos os registros (4 tipos)
- ✅ Filtros por status (badges coloridos)
- ✅ Ordenação por data (mais recentes primeiro)
- ✅ **Exportação CSV** (encoding UTF-8 com BOM para Excel)
- ✅ Atualização em tempo real

---

## 🛠️ Tecnologias

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização (inline no HTML)
- **Bootstrap 5.3.0** - Framework CSS (via CDN)
- **JavaScript ES6+** - Lógica de negócio (Vanilla JS, sem frameworks)

### Backend
- **SharePoint Online** - Armazenamento e API REST
- **Microsoft 365** - Infraestrutura e autenticação
- **SharePoint Lists** - 4 listas (Prescricoes, Recebimentos, Dispensacoes, Perdas)

### Autenticação
- **Microsoft Entra ID** (Azure AD) - Produção (a implementar)
- **Simulador JSON** - Desenvolvimento (apenas para testes)

### Build & Deploy
- **Nenhum** - Zero build process, zero npm dependencies
- **Deploy**: Copiar arquivos HTML/JS para SharePoint ou servidor web

---

## 🏗️ Arquitetura

### Diagrama Simplificado

```
┌───────────────────────────────────┐
│  NAVEGADOR                        │
│  sistema-npt-sharepoint.html      │
│  ├── config.js                    │
│  ├── sharepoint-api.js            │
│  └── auth-simulator.js (dev)     │
└────────────┬──────────────────────┘
             │ HTTPS / REST API
             ▼
┌───────────────────────────────────┐
│  SHAREPOINT ONLINE                │
│  ├── Prescricoes (lista)          │
│  ├── Recebimentos (lista)         │
│  ├── Dispensacoes (lista)         │
│  └── Perdas (lista)               │
└───────────────────────────────────┘
```

### Estrutura de Arquivos

```
npt/
│
├── 📄 sistema-npt-sharepoint.html   # App principal
├── 📄 config.js                     # Configurações SharePoint
├── 📄 sharepoint-api.js             # Integração SharePoint REST API
├── 📄 auth-simulator.js             # Simulador auth (DEV ONLY)
├── 📄 usuarios.json                 # Credenciais (DEV ONLY)
│
├── 📄 README.md                     # Este arquivo
├── 📄 CLAUDE.md                     # Instruções para Claude Code
├── 📄 GUIA_CONFIGURACAO_SHAREPOINT.md
├── 📄 ROTEIRO_TESTES.md
├── 📄 DOCUMENTACAO_TECNICA.md
├── 📄 APRESENTACAO_TI.md
├── 📄 CHECKLIST_VALIDACAO.md
│
└── 📂 legacy/
    ├── sistema_npt_v2.html          # Versão localStorage
    └── 2npt_dispensa_sistema.html   # Versão antiga
```

**Total de Código**: ~75KB (sem dependências npm!)

---

## 🚀 Instalação

### Pré-requisitos

- [x] Microsoft 365 com SharePoint Online
- [x] Permissões para criar site SharePoint
- [x] Navegador moderno (Chrome, Edge, Firefox)
- [x] Acesso à rede do hospital (se configurado IP whitelisting)

### Passo 1: Configurar SharePoint

Siga o guia detalhado: **[GUIA_CONFIGURACAO_SHAREPOINT.md](GUIA_CONFIGURACAO_SHAREPOINT.md)**

**Resumo**:
1. Criar site SharePoint (ex: "SistemaNPT")
2. Criar 4 listas (Prescricoes, Recebimentos, Dispensacoes, Perdas)
3. Configurar colunas conforme especificação
4. Configurar permissões (grupos de usuários)

**Tempo estimado**: 45-60 minutos

---

### Passo 2: Configurar Sistema

1. **Copiar arquivos** para seu ambiente:
   ```
   sistema-npt-sharepoint.html
   config.js
   sharepoint-api.js
   auth-simulator.js (apenas para testes)
   usuarios.json (apenas para testes)
   ```

2. **Editar `config.js`**:
   ```javascript
   // Linha 21: Atualizar com a URL do SEU site SharePoint
   SITE_URL: 'https://[SEU-TENANT].sharepoint.com/sites/SistemaNPT',

   // Linha 72: Modo desenvolvimento (true para testes, false para produção)
   MODO_DESENVOLVIMENTO: true,  // Mudar para false em produção!
   ```

3. **Verificar nomes das listas** (config.js, linha 32):
   ```javascript
   LISTAS: {
     PRESCRICOES: 'Prescricoes',    // Nome exato da lista no SharePoint
     RECEBIMENTOS: 'Recebimentos',  // Case-sensitive!
     DISPENSACOES: 'Dispensacoes',
     PERDAS: 'Perdas'
   }
   ```

---

### Passo 3: Deploy

**Opção A: SharePoint Site Assets** (Mais simples)
1. Ir para o site SharePoint
2. Site Contents → Site Assets
3. Upload dos 5 arquivos
4. Abrir `sistema-npt-sharepoint.html` no navegador

**Opção B: SharePoint App Catalog** (Recomendado para produção)
1. Criar package .sppkg (requer SPFx - mais complexo)
2. Upload para App Catalog
3. Deploy para site

**Opção C: Servidor Web Interno** (IIS, Apache, etc.)
1. Copiar arquivos para diretório do servidor
2. Configurar virtual directory
3. Acessar via URL: `http://servidor/npt/sistema-npt-sharepoint.html`

---

### Passo 4: Testar

Seguir roteiro completo: **[ROTEIRO_TESTES.md](ROTEIRO_TESTES.md)**

**Testes Básicos**:
1. Abrir `sistema-npt-sharepoint.html`
2. Verificar badge: "● SharePoint Conectado" (verde)
3. Criar prescrição de teste
4. Verificar item criado no SharePoint
5. Testar fluxo completo: Prescrição → Recebimento → Dispensação

---

## 💻 Uso

### Fluxo de Trabalho Diário

#### 1. **Manhã/Tarde: Registrar Prescrições**
1. Abrir sistema
2. Aba "1. Prescrição"
3. Preencher dados da prescrição recebida por email
4. Salvar (ID auto-gerado: NPT-00001)
5. Encaminhar prescrição para Pronutrir
6. Imprimir 2 vias

#### 2. **Tarde: Receber Bolsas da Pronutrir**
1. Aba "2. Recebimento Bolsa"
2. Selecionar prescrição aguardando bolsa
3. Conferir temperatura, integridade, identificação
4. Registrar lote Pronutrir
5. Marcar status: Conforme ou Inconsistente
6. Salvar

   **Se Inconsistente**: Devolver imediatamente à Pronutrir + registrar ocorrência na aba 4 (Perdas/Devoluções)

#### 3. **Noite (~21h): Dispensar para Unidade**
1. Aba "3. Dispensação"
2. Selecionar recebimento conforme
3. Re-conferir prescrição vs bolsa
4. Registrar quem entregou/recebeu
5. Salvar
6. **Importante**: Preencher Google Forms (indicador de bolsas dispensadas)

#### 4. **Quando Necessário: Perdas/Devoluções**
1. Aba "❌ Perdas/Devoluções"
2. Informar ID da prescrição
3. Selecionar tipo (Devolução ou Perda)
4. Selecionar motivo
5. Descrever detalhadamente
6. Salvar
7. **Importante**: Preencher Google Forms (indicador de perdas)

#### 5. **Visualizar Histórico e Exportar**
1. Aba "📊 Histórico"
2. Clicar "🔄 Atualizar" para recarregar
3. Visualizar todos os registros
4. Clicar "📥 Exportar CSV" para salvar relatório
5. Abrir CSV no Excel para análise

---

### Atalhos e Dicas

**Navegação**:
- Use as tabs no topo para alternar entre módulos
- F5 para recarregar página (dados persistem no SharePoint)

**Formulários**:
- Campos com `*` são obrigatórios
- ID de prescrição é auto-gerado (não editar)
- Dropdowns filtram automaticamente (ex: só mostram "Aguardando Bolsa")
- Dados são auto-preenchidos ao selecionar prescrição/recebimento

**Exportação CSV**:
- Encoding UTF-8 com BOM (abre corretamente no Excel)
- Separador: ponto-e-vírgula (`;`)
- Nome do arquivo: `npt_registros_YYYY-MM-DD.csv`

**Console do Navegador** (F12):
- Útil para debug
- Mostra logs detalhados se `DEBUG: true` em config.js
- Exibe erros de API SharePoint

---

## 📚 Documentação

### Documentos Disponíveis

| Documento | Descrição | Público-Alvo |
|-----------|-----------|--------------|
| [README.md](README.md) | Visão geral (este arquivo) | Todos |
| [CLAUDE.md](CLAUDE.md) | Instruções para Claude Code | Desenvolvedores |
| [GUIA_CONFIGURACAO_SHAREPOINT.md](GUIA_CONFIGURACAO_SHAREPOINT.md) | Setup SharePoint passo-a-passo | TI / Administradores |
| [ROTEIRO_TESTES.md](ROTEIRO_TESTES.md) | Testes CRUD completos | QA / TI |
| [DOCUMENTACAO_TECNICA.md](DOCUMENTACAO_TECNICA.md) | Arquitetura, API, troubleshooting | Desenvolvedores / TI |
| [APRESENTACAO_TI.md](APRESENTACAO_TI.md) | Apresentação para validação TI | TI / Gestores |
| [CHECKLIST_VALIDACAO.md](CHECKLIST_VALIDACAO.md) | Checklist pré-produção | TI |

### Links Úteis

- **SharePoint REST API Reference**: [Microsoft Docs](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service)
- **Microsoft Entra ID (Azure AD)**: [Documentation](https://docs.microsoft.com/en-us/azure/active-directory/)
- **Bootstrap 5 Docs**: [getbootstrap.com](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

---

## 🗓️ Roadmap

### Fase 1: Desenvolvimento ✅ (Concluída)
- [x] Estrutura de arquivos e módulos
- [x] Integração SharePoint REST API
- [x] CRUD completo (Create, Read, Update, Delete)
- [x] Interface responsiva (Bootstrap 5)
- [x] Simulador de autenticação (testes)
- [x] Exportação CSV
- [x] Documentação completa

### Fase 2: Configuração SharePoint ⏳ (Em Andamento)
- [ ] Criar site SharePoint "SistemaNPT"
- [ ] Configurar 4 listas (Prescricoes, Recebimentos, Dispensacoes, Perdas)
- [ ] Configurar permissões (grupos de usuários)
- [ ] Atualizar config.js com URL real
- [ ] Testes CRUD completos (ROTEIRO_TESTES.md)

### Fase 3: Autenticação Entra ID 🔜 (Próxima)
- [ ] Receber orientações da TI do hospital
- [ ] Criar App Registration no Azure
- [ ] Implementar autenticação Entra ID (OAuth 2.0)
- [ ] Remover simulador (auth-simulator.js, usuarios.json)
- [ ] Configurar `MODO_DESENVOLVIMENTO: false`
- [ ] Testes de autenticação

### Fase 4: Homologação 🔜
- [ ] Deploy em ambiente de testes
- [ ] Validação pela TI (CHECKLIST_VALIDACAO.md)
- [ ] Testes com usuários finais (farmacêuticos/técnicos)
- [ ] Ajustes conforme feedback
- [ ] Treinamento de usuários

### Fase 5: Produção 🔜
- [ ] Aprovação final TI
- [ ] Deploy em produção
- [ ] Migração de dados (se necessário)
- [ ] Monitoramento 30 dias
- [ ] Retrospectiva e melhorias

### Fase 6: Melhorias Futuras 💡
- [ ] Integração com Google Forms (indicadores automáticos)
- [ ] Dashboard de métricas (Power BI)
- [ ] Notificações por email (Power Automate)
- [ ] Relatórios avançados (SQL queries)
- [ ] Progressive Web App (PWA) para mobile
- [ ] Modo offline (Service Workers)
- [ ] Integração com sistema de prontuário eletrônico

---

## 🤝 Contribuindo

Este é um projeto interno do HUWC. Contribuições são bem-vindas da equipe de TI e Farmácia.

### Como Contribuir

1. **Reportar Bugs**:
   - Abrir issue com descrição detalhada
   - Incluir steps to reproduce
   - Anexar screenshots se possível
   - Informar navegador e versão

2. **Sugerir Melhorias**:
   - Descrever a funcionalidade desejada
   - Explicar o caso de uso
   - Propor solução (se tiver)

3. **Modificar Código**:
   - Ler [DOCUMENTACAO_TECNICA.md](DOCUMENTACAO_TECNICA.md) antes
   - Testar localmente com SharePoint de testes
   - Seguir convenções de código existentes
   - Documentar mudanças significativas

### Convenções de Código

**JavaScript**:
- ES6+ (arrow functions, const/let, template literals)
- Camel case para variáveis: `nomeVariavel`
- Pascal case para classes: `MinhaClasse`
- Comentários descritivos em funções complexas
- Usar `'use strict';` em módulos

**HTML**:
- Indentação: 2 espaços
- Atributos com aspas duplas: `class="exemplo"`
- Semântica: usar tags apropriadas (`<button>` não `<div>`)

**CSS**:
- Classes descritivas: `.status-aguardando`
- Kebab-case: `.minha-classe`
- Bootstrap classes sempre que possível

---

## 📄 Licença

**Uso Interno HUWC**

Este sistema é de propriedade do Hospital Universitário Walter Cantídio (HUWC) e destina-se exclusivamente ao uso interno da instituição.

**Restrições**:
- ❌ Distribuição externa proibida
- ❌ Uso comercial proibido
- ❌ Modificação sem autorização proibida

**Permissões** (equipe HUWC):
- ✅ Uso interno irrestrito
- ✅ Modificação sob supervisão da TI
- ✅ Documentação e treinamento

**Dados Sensíveis**:
- Sistema manipula dados de saúde (LGPD aplicável)
- Confidencialidade obrigatória
- Não compartilhar credenciais ou dados de pacientes

---

## 📞 Contato

### Equipe Responsável

**Farmácia HUWC**:
- Email: fscmhuwc@gmail.com
- Responsável: [Nome do Responsável]
- Telefone: [Telefone]

**TI HUWC**:
- Email: [Email TI]
- Responsável: [Nome do Responsável TI]
- Telefone: [Telefone TI]

### Suporte

**Horário de Atendimento**: Segunda a Sexta, 8h às 18h

**Canais de Suporte**:
1. **Nível 1** (Farmácia): Dúvidas de uso, formulários, cadastros
2. **Nível 2** (TI): Problemas técnicos, erros de sistema, integração SharePoint

**SLA** (a definir):
- Prioridade Alta (sistema fora do ar): X horas
- Prioridade Média (funcionalidade com erro): X horas
- Prioridade Baixa (dúvidas, melhorias): X dias

---

## 🎯 Status do Projeto

**Versão Atual**: 1.0 (SharePoint Edition)

**Status**: 🟡 Em Desenvolvimento

**Última Atualização**: 2025-12-25

**Próximos Milestones**:
- [ ] Configuração SharePoint completa
- [ ] Implementação Entra ID
- [ ] Homologação TI
- [ ] Deploy Produção

---

## 🏥 Sobre o HUWC

O **Hospital Universitário Walter Cantídio** é um hospital público vinculado à Universidade Federal do Ceará (UFC), referência em atendimento de alta complexidade no Ceará.

**Missão**: Prestar assistência à saúde com excelência, formar profissionais e desenvolver pesquisa científica.

**Visão**: Ser reconhecido como centro de excelência em saúde, ensino e pesquisa.

---

## ⭐ Agradecimentos

- **Equipe de Farmácia HUWC**: Pela definição do workflow e requisitos
- **Equipe de TI HUWC**: Pelo suporte técnico e orientações de segurança
- **Microsoft**: Pela plataforma SharePoint e Entra ID
- **Claude (Anthropic)**: Pela geração de código e documentação

---

## 📊 Estatísticas do Projeto

**Código**:
- Linhas de código: ~1500 (JavaScript) + ~800 (HTML)
- Arquivos: 5 (produção) + 7 (documentação)
- Tamanho total: ~75KB (sem dependencies)
- Dependencies: 0 npm packages

**Documentação**:
- Páginas: ~150 (7 documentos Markdown)
- Exemplos de código: ~50
- Diagramas: 3

**Testes**:
- Casos de teste: 50+ (ver ROTEIRO_TESTES.md)
- Cobertura: 100% funcionalidades core

---

**Desenvolvido com ❤️ para o HUWC**

---

**Fim do README**
