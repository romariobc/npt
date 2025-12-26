# Estrutura do Projeto - Sistema NPT SharePoint

## 📁 Organização de Arquivos

```
npt/
│
├── 📄 README.md                           # Visão geral do projeto
├── 📄 CLAUDE.md                           # Guia para Claude Code
├── 📄 PLANEJAMENTO_BACKEND_SEGURO.md     # Análise de segurança
├── 📄 ESTRUTURA_PROJETO.md               # Este arquivo
│
├── 📂 sharepoint/
│   ├── 📄 GUIA_CONFIGURACAO_SHAREPOINT.md    # Passo-a-passo configuração
│   ├── 📄 estrutura-listas.json              # Definição das 4 listas
│   └── 📄 permissoes-recomendadas.md         # Configuração de permissões
│
├── 📂 src/
│   ├── 📄 config.js                       # Configurações SharePoint
│   ├── 📄 sharepoint-api.js              # Módulo de integração SharePoint
│   ├── 📄 auth-simulator.js              # Simulador de autenticação (testes)
│   └── 📄 sistema-npt-sharepoint.html    # Sistema principal integrado
│
├── 📂 docs/
│   ├── 📄 DOCUMENTACAO_TECNICA.md        # Documentação técnica completa
│   ├── 📄 MANUAL_USUARIO.md              # Manual para farmacêuticos
│   └── 📄 ROTEIRO_TESTES.md              # Roteiro de testes CRUD
│
├── 📂 apresentacao-ti/
│   ├── 📄 APRESENTACAO_TI.md             # Apresentação em Markdown
│   └── 📄 CHECKLIST_VALIDACAO.md         # Checklist para TI validar
│
├── 📂 legacy/ (manter como referência)
│   ├── 📄 2npt_dispensa_sistema.html     # Versão antiga
│   └── 📄 sistema_npt_v2.html            # Versão localStorage
│
└── 📄 usuarios.json                       # Credenciais (manter para testes)
```

## 🎯 Fases do Projeto

### FASE 1: Estruturação ✓ (ATUAL)
- [x] Criar estrutura de pastas
- [ ] Criar todos os arquivos base

### FASE 2: Configuração SharePoint
- [ ] Documentar criação de listas
- [ ] Criar guia passo-a-passo
- [ ] Definir estrutura JSON das listas

### FASE 3: Desenvolvimento
- [ ] Criar módulo de integração SharePoint
- [ ] Adaptar interface HTML
- [ ] Implementar simulador de autenticação

### FASE 4: Documentação
- [ ] Documentação técnica
- [ ] Manual do usuário
- [ ] Roteiro de testes

### FASE 5: Apresentação TI
- [ ] Criar apresentação
- [ ] Criar checklist de validação
- [ ] Preparar demo ao vivo

### FASE 6: Autenticação (PÓS-APROVAÇÃO TI)
- [ ] Receber diretrizes TI
- [ ] Implementar Entra ID conforme especificado
- [ ] Testes finais
- [ ] Go-live

## 📝 Convenções

**Nomenclatura de arquivos**:
- Maiúsculas: Documentação (`.md`)
- Minúsculas: Código (`.js`, `.html`, `.json`)
- Hífen: separador de palavras

**Commits Git** (quando configurar):
- `feat:` nova funcionalidade
- `docs:` documentação
- `fix:` correção
- `config:` configuração SharePoint

## 🚀 Como Usar Este Projeto

1. **Configurar SharePoint** (seguir `sharepoint/GUIA_CONFIGURACAO_SHAREPOINT.md`)
2. **Atualizar** `src/config.js` com URL do site SharePoint
3. **Testar** com `src/auth-simulator.js` (sem autenticação real)
4. **Apresentar** à TI usando `apresentacao-ti/APRESENTACAO_TI.md`
5. **Implementar** autenticação Entra ID conforme orientação TI
6. **Deploy** em produção

---

**Criado**: 2025-12-25
**Versão**: 1.0
**Próximo passo**: Configuração SharePoint
