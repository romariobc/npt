# Planejamento: Backend Seguro para Sistema NPT HUWC

## ⚠️ SITUAÇÃO ATUAL - RISCO CRÍTICO

**Armazenamento Atual**: localStorage (navegador)

**Riscos Identificados**:
- ❌ Dados de pacientes em texto puro no navegador
- ❌ Sem criptografia
- ❌ Sem controle de acesso
- ❌ Sem auditoria
- ❌ Sem backup
- ❌ **NÃO CONFORME COM LGPD**
- ❌ **INADEQUADO PARA DADOS SENSÍVEIS DE SAÚDE**

**Status**: Sistema atual deve ser usado APENAS para desenvolvimento/testes, NUNCA em produção.

---

## 🎯 SOLUÇÃO RECOMENDADA

### SharePoint Online + REST API

**Justificativa**:
1. Já incluído no Microsoft 365 do hospital (sem custo adicional)
2. Compliance LGPD garantido pela Microsoft (ISO 27001/27018)
3. Aprovação TI facilitada (ambiente Microsoft aprovado)
4. Reaproveita 80% do código HTML/JS atual
5. Autenticação via Azure AD (usuários do domínio)
6. Backup automático
7. Auditoria completa

---

## 📐 ARQUITETURA

```
FRONTEND (navegador - HTML/JS)
    ↓ HTTPS/REST API
SHAREPOINT ONLINE (4 listas)
    - Prescricoes
    - Recebimentos
    - Dispensacoes
    - Perdas
    ↓
SEGURANÇA
    - Autenticação: Azure AD
    - Criptografia: TLS 1.2+ (trânsito) + AES-256 (repouso)
    - Auditoria: Log completo
    - Backup: Automático (90 dias)
    - LGPD: Conforme
```

---

## 🔐 RECURSOS DE SEGURANÇA

### Controle de Acesso
- Apenas farmacêuticos autorizados (grupo Active Directory)
- Permissões granulares (visualizar vs editar)
- Autenticação Windows (SSO - Single Sign-On)

### Auditoria
- Histórico completo: quem criou/editou cada registro
- Rastreamento de versões anteriores
- Logs de acesso

### Conformidade LGPD
- Dados hospedados em datacenter Microsoft Brasil
- Criptografia obrigatória
- Direito à exclusão (delete permanente)
- Termo de responsabilidade Microsoft assinado
- Anonimização possível para relatórios

---

## 🛠️ ESTRUTURA SHAREPOINT

### Lista 1: Prescricoes
```
Colunas:
- Title (texto) → NPT-00001
- Paciente (texto)
- Prontuario (texto)
- Leito (texto)
- Vazao (texto)
- Volume (texto)
- Composicao (texto multilinha)
- Observacoes (texto multilinha)
- Status (escolha): Aguardando Bolsa | Bolsa Recebida | Dispensada | Devolvida
- Created (data/hora) → automático
- Author (pessoa) → automático
- Modified (data/hora) → automático
- Editor (pessoa) → automático
```

### Lista 2: Recebimentos
```
Colunas:
- Title (texto) → ID do recebimento
- IDPrescricao (lookup → Prescricoes.Title)
- Lote (texto)
- Temperatura (escolha): Sim | Não
- Integridade (escolha): Íntegra | Violada
- StatusConferencia (escolha): Conforme | Inconsistente
- Conferente (texto)
- Observacoes (texto multilinha)
- Created, Author, Modified, Editor (automáticos)
```

### Lista 3: Dispensacoes
```
Colunas:
- Title (texto) → ID da dispensação
- IDPrescricao (lookup → Prescricoes.Title)
- HoraDispensa (texto)
- Entregou (texto)
- Recebeu (texto)
- Observacoes (texto multilinha)
- Created, Author, Modified, Editor (automáticos)
```

### Lista 4: Perdas
```
Colunas:
- Title (texto) → ID da perda
- IDPrescricao (texto)
- Tipo (escolha): Devolução | Perda
- Motivo (escolha):
  * Temperatura inadequada
  * Composição incorreta
  * Volume incorreto
  * Identificação incorreta
  * Integridade comprometida
  * Prescrição cancelada
  * Paciente em alta
  * Paciente foi a óbito
  * Vencimento
  * Outro
- Detalhes (texto multilinha)
- Created, Author, Modified, Editor (automáticos)
```

---

## 📋 PLANO DE IMPLEMENTAÇÃO

### FASE 1: Preparação (1-2 dias)
- [ ] Reunião com TI do hospital
- [ ] Apresentar arquitetura SharePoint
- [ ] Solicitar permissões necessárias
- [ ] Definir grupo AD de farmacêuticos autorizados
- [ ] Criar site SharePoint: `/sites/NPT` ou `/sites/Farmacia-NPT`
- [ ] Configurar permissões (somente grupo farmácia)
- [ ] Criar as 4 listas com colunas especificadas
- [ ] Configurar versionamento e auditoria

### FASE 2: Desenvolvimento (3-5 dias)
- [ ] Adicionar biblioteca PnPjs ao frontend
- [ ] Implementar autenticação Azure AD
- [ ] Substituir `localStorage` por chamadas REST API
- [ ] Criar funções CRUD para cada lista
- [ ] Implementar tratamento de erros
- [ ] Testar em ambiente de desenvolvimento

### FASE 3: Testes (2-3 dias)
- [ ] Testar permissões (usuários não autorizados bloqueados)
- [ ] Testar auditoria (verificar logs)
- [ ] Simular cenários de erro
- [ ] Testar fluxo completo: Prescrição → Recebimento → Dispensação
- [ ] Testar perdas/devoluções
- [ ] Testar com múltiplos usuários simultâneos

### FASE 4: Homologação (1 semana)
- [ ] Capacitar farmacêuticos no novo sistema
- [ ] Criar manual de uso simplificado
- [ ] Rodar em paralelo com processo manual
- [ ] Coletar feedback
- [ ] Ajustar conforme necessário

### FASE 5: Produção
- [ ] Liberar para uso oficial
- [ ] Monitorar primeiros dias
- [ ] Documentar lições aprendidas

**Tempo Total Estimado**: 2-3 semanas

---

## 💰 ANÁLISE DE CUSTOS

| Item | localStorage | SharePoint Online |
|------|--------------|-------------------|
| Licença | Grátis | Incluído no MS 365* |
| Infraestrutura | Nenhuma | Microsoft gerencia |
| Backup | Manual (se houver) | Incluído |
| Segurança | DIY | Enterprise-grade incluída |
| Manutenção | N/A | Incluída |
| Suporte | Nenhum | Microsoft Support |

*Verificar se MS 365 do hospital já inclui SharePoint Online (geralmente sim).

---

## 🆚 ALTERNATIVAS AVALIADAS

### Power Apps + Dataverse
- ✅ Low-code, desenvolvimento rápido
- ⚠️ Pode requerer licença Premium (custo extra)
- ⚠️ Menos controle sobre interface

### Azure SQL Database
- ✅ Banco SQL completo, alta performance
- ❌ Custo mensal (~R$ 200-500/mês)
- ❌ Requer backend (Node.js, ASP.NET)

### Supabase/Firebase
- ✅ Fácil implementação
- ❌ Dados fora da infraestrutura hospitalar
- ❌ Difícil aprovação TI/compliance

### Servidor Próprio (On-premises)
- ✅ Controle total
- ❌ Requer servidor dedicado
- ❌ Manutenção constante
- ❌ Backup manual

**Conclusão**: SharePoint Online oferece melhor custo-benefício considerando segurança, compliance e recursos já disponíveis.

---

## 🚨 ALERTAS IMPORTANTES

1. **NÃO USAR localStorage EM PRODUÇÃO**
   - Adequado apenas para desenvolvimento/testes
   - Viola LGPD para dados de saúde

2. **APROVAÇÃO TI É OBRIGATÓRIA**
   - Qualquer solução precisa aval da TI hospitalar
   - Verificar políticas de segurança da informação

3. **TREINAMENTO É CRÍTICO**
   - Usuários precisam entender novo sistema
   - Documentar processo de uso

4. **BACKUP DE TRANSIÇÃO**
   - Se houver dados no localStorage, exportar antes
   - Não descartar até confirmar migração

---

## 📞 PRÓXIMOS PASSOS

### Decisão Necessária
1. Validar com TI do hospital disponibilidade de SharePoint
2. Reunir com responsável LGPD/privacidade para aprovar arquitetura
3. Decidir cronograma de implementação

### Opções de Suporte
- Implementação completa com integração SharePoint
- Apresentação técnica para TI
- Documentação de conformidade LGPD
- Exploração de alternativas (se SharePoint não disponível)

---

## 📚 REFERÊNCIAS

- [Microsoft 365 Compliance](https://docs.microsoft.com/compliance/)
- [SharePoint REST API](https://docs.microsoft.com/sharepoint/dev/sp-add-ins/get-to-know-the-sharepoint-rest-service)
- [PnPjs Library](https://pnp.github.io/pnpjs/)
- [LGPD - Lei Geral de Proteção de Dados](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)

---

**Documento criado**: 2025-12-25
**Versão**: 1.0
**Responsável**: Equipe Farmácia HUWC + TI
