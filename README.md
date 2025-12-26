# 📦 Sistema NPT HUWC

Sistema de Gestão de Nutrição Parenteral Total (NPT) desenvolvido para o Hospital Universitário Walter Cantídio (HUWC).

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2025.12-green.svg)]()
[![SharePoint](https://img.shields.io/badge/SharePoint-Online-orange.svg)]()

## 📋 Visão Geral

Aplicação web de página única para gerenciar o ciclo completo de prescrições NPT, desde a prescrição médica até a dispensação final ou registro de perdas/devoluções. Implementa o fluxo de trabalho oficial do HUWC em vigor desde 02/12/2025.

### ✨ Características Principais

- ✅ **Fluxo Completo**: Prescrição → Recebimento → Dispensação → Perdas/Devoluções
- 📊 **Relatórios e Dashboards**: KPIs, gráficos interativos e análises detalhadas
- 🔐 **Autenticação**: Suporte para modo desenvolvimento e Microsoft Entra ID
- 💾 **Armazenamento**: Versões com localStorage (standalone) e SharePoint (enterprise)
- 📱 **Responsivo**: Interface adaptável para desktop, tablet e mobile
- 🎨 **UI Moderna**: Bootstrap 5.3.0 com componentes personalizados

## 🚀 Início Rápido

### Versão Standalone (localStorage)

```bash
# Clone o repositório
git clone https://github.com/romariobc/npt.git

# Navegue até o diretório
cd npt

# Abra o arquivo no navegador
# Windows
start sistema-npt-2025-12.html

# Linux/Mac
open sistema-npt-2025-12.html
```

Não requer servidor ou instalação. Funciona diretamente no navegador!

### Versão SharePoint (Enterprise)

Consulte o [Guia de Implantação SharePoint](docs/SHAREPOINT-DEPLOYMENT.md) para instruções completas.

## 📁 Estrutura do Projeto

```
npt/
├── 📄 sistema-npt-2025-12.html           # Versão atual (localStorage)
├── 📄 sistema-npt-sharepoint-2025-12.html # Versão SharePoint com relatórios
├── 📄 sistema-npt-2025-08-legacy.html    # Versão legada (deprecated)
│
├── 🔧 config.js                          # Configuração SharePoint
├── 🔧 sharepoint-api.js                  # API REST SharePoint
├── 🔧 auth-simulator.js                  # Autenticação dev (não usar em produção)
│
├── 📋 usuarios.json                      # Credenciais (localStorage version)
├── 📋 CLAUDE.md                          # Instruções para Claude Code
├── 📋 README.md                          # Este arquivo
│
└── 📂 docs/                              # Documentação técnica
    ├── SHAREPOINT-DEPLOYMENT.md          # Guia de implantação SharePoint
    ├── DOCUMENTACAO_TECNICA.md           # Documentação técnica completa
    ├── ROTEIRO_TESTES.md                 # Casos de teste
    ├── CHECKLIST_VALIDACAO.md            # Checklist de validação
    ├── APRESENTACAO_TI.md                # Apresentação para TI
    ├── GUIA_CONFIGURACAO_SHAREPOINT.md   # Configuração SharePoint
    ├── ESTRUTURA_PROJETO.md              # Estrutura do projeto
    └── PLANEJAMENTO_BACKEND_SEGURO.md    # Planejamento backend
```

## 🎯 Funcionalidades

### Fluxo de Trabalho (4 Etapas)

#### 1. 📝 Prescrição
- Recebimento de prescrição médica via email
- Registro com ID automático (NPT-00001, NPT-00002, etc.)
- Encaminhamento para fornecedor Pronutrir
- Status: **Aguardando Bolsa**

#### 2. 📦 Recebimento da Bolsa
- Verificação obrigatória (tarde)
- Conferência: etiqueta, paciente, leito, vazão, temperatura, integridade
- Pode ser realizada por farmacêutico ou técnico treinado
- Status: **Conforme** ou **Inconsistente**

#### 3. 🏥 Dispensação
- Re-verificação (noite ~21h)
- Envio para unidade com prescrição
- Registro de quem entregou/recebeu
- Status: **Dispensada**

#### 4. ❌ Perdas/Devoluções
- Registro de devoluções ou perdas
- Motivos rastreados e analisados
- Status: **Devolvida**

### 📊 Relatórios e Dashboards (Versão SharePoint)

**KPIs Principais:**
- Total de Prescrições
- Bolsas Dispensadas
- Aguardando Bolsa
- Perdas/Devoluções

**Indicadores de Performance:**
- Taxa de Aproveitamento
- Taxa de Conformidade
- Recebimentos Conformes

**Gráficos Interativos:**
- 🥧 Pizza: Distribuição de status
- 📊 Barras: Top motivos de perdas
- 📈 Linha: Evolução temporal (7 dias)

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Bootstrap 5.3.0
- **Gráficos**: Chart.js 4.4.0
- **Armazenamento**: localStorage / SharePoint Online
- **API**: SharePoint REST API
- **Autenticação**: JSON / Microsoft Entra ID

## 📖 Documentação

### Para Desenvolvedores

- [📘 Documentação Técnica](docs/DOCUMENTACAO_TECNICA.md)
- [📋 Estrutura do Projeto](docs/ESTRUTURA_PROJETO.md)
- [🔧 Planejamento Backend](docs/PLANEJAMENTO_BACKEND_SEGURO.md)

### Para Implantação

- [🚀 Guia de Implantação SharePoint](docs/SHAREPOINT-DEPLOYMENT.md)
- [⚙️ Guia de Configuração](docs/GUIA_CONFIGURACAO_SHAREPOINT.md)
- [🎤 Apresentação TI](docs/APRESENTACAO_TI.md)

### Para Testes

- [✅ Roteiro de Testes](docs/ROTEIRO_TESTES.md)
- [☑️ Checklist de Validação](docs/CHECKLIST_VALIDACAO.md)

## 🔐 Segurança

### Versão localStorage
- Autenticação via JSON (desenvolvimento/testes)
- Senhas em texto plano (apenas para ambiente controlado)
- Dados armazenados localmente no navegador

### Versão SharePoint
- **Desenvolvimento**: Autenticação simulada
- **Produção**: Microsoft Entra ID (Azure AD)
- Permissões granulares por grupo
- Auditoria completa de ações
- Backup automático (SharePoint)

⚠️ **IMPORTANTE**: Nunca use `auth-simulator.js` em ambiente de produção!

## 🎨 Interface

### Telas Principais

1. **Prescrição** - Registro de prescrições médicas
2. **Recebimento** - Conferência de bolsas recebidas
3. **Dispensação** - Envio para unidades
4. **Perdas/Devoluções** - Registro de ocorrências
5. **Histórico** - Visualização de todos os registros
6. **Relatórios** - Dashboards e análises (SharePoint)

## ⚙️ Configuração

### localStorage Version

1. Edite `usuarios.json` para adicionar usuários:
```json
{
  "usuario1": "senha1",
  "usuario2": "senha2"
}
```

2. Abra `sistema-npt-2025-12.html` no navegador

### SharePoint Version

1. Configure `config.js`:
```javascript
SITE_URL: 'https://[SEU-TENANT].sharepoint.com/sites/SistemaNPT',
MODO_DESENVOLVIMENTO: false, // true para dev, false para produção
```

2. Siga o [Guia de Implantação](docs/SHAREPOINT-DEPLOYMENT.md)

## 🧪 Testes

### Usuários de Teste (Desenvolvimento)

| Usuário | Senha | Perfil |
|---------|-------|--------|
| admin | 12345 | Administrador |
| farmacia | farm123 | Farmacêutico |
| tecnico1 | senha1 | Técnico |
| tecnico2 | senha2 | Técnico |
| supervisor | super456 | Supervisor |

### Executar Testes

Consulte o [Roteiro de Testes](docs/ROTEIRO_TESTES.md) para casos de teste detalhados.

## 📊 Roadmap

### ✅ Concluído (v2025.12)
- [x] Fluxo completo de prescrição até dispensação
- [x] Integração SharePoint
- [x] Relatórios e dashboards
- [x] Autenticação simulada
- [x] Exportação CSV
- [x] Documentação completa

### 🔄 Em Planejamento
- [ ] Autenticação Entra ID implementada
- [ ] Exportação de relatórios em PDF
- [ ] Notificações automáticas (Power Automate)
- [ ] Integração com Power BI
- [ ] API REST própria
- [ ] App mobile (PWA)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Equipe de Desenvolvimento HUWC**
- **Farmácia Clínica HUWC**

## 📧 Contato

Para dúvidas ou suporte:
- 📧 Email: fscmhuwc@gmail.com
- 🏥 Hospital Universitário Walter Cantídio

## 🙏 Agradecimentos

- Equipe de Farmácia Clínica do HUWC
- Pronutrir (fornecedor de NPT)
- Equipe de TI do hospital

---

**Versão**: 2025.12
**Última atualização**: Dezembro 2025
**Status**: ✅ Produção

Desenvolvido com ❤️ para o HUWC
