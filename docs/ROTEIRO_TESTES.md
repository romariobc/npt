# Roteiro de Testes - Sistema NPT SharePoint

## 📋 Informações Gerais

**Objetivo**: Validar todas as funcionalidades CRUD do sistema NPT integrado com SharePoint

**Pré-requisitos**:
- [x] Site SharePoint configurado
- [x] Listas criadas (Prescricoes, Recebimentos, Dispensacoes, Perdas)
- [x] Arquivo `config.js` atualizado com URL correta
- [x] Navegador moderno (Chrome, Edge, Firefox)
- [x] Acesso ao console do navegador (F12)

**Duração estimada**: 30-45 minutos

---

## 🔧 FASE 1: Preparação e Validação Inicial

### Teste 1.1: Validação de Configuração

**Passos**:
1. Abrir `config.js` em um editor de texto
2. Verificar se `SITE_URL` está preenchida corretamente (sem `[SEU-TENANT]`)
3. Confirmar que `MODO_DESENVOLVIMENTO` está como `true`

**Resultado Esperado**:
- ✅ URL válida do SharePoint configurada
- ✅ Modo desenvolvimento ativo

---

### Teste 1.2: Abertura do Sistema

**Passos**:
1. Abrir `sistema-npt-sharepoint.html` no navegador
2. Abrir Console do navegador (F12 → Aba Console)
3. Observar mensagens de inicialização

**Resultado Esperado**:
- ✅ Página carrega sem erros JavaScript
- ✅ Console mostra: "🚀 Inicializando Sistema NPT SharePoint..."
- ✅ Console mostra: "✅ Conectado ao SharePoint: [nome do site]"
- ✅ Badge de status mostra "● SharePoint Conectado" (verde)
- ✅ Alerta amarelo "⚠️ MODO DESENVOLVIMENTO" aparece no topo

**Se der erro**:
- ❌ Verificar URL em `config.js`
- ❌ Verificar se as listas foram criadas no SharePoint
- ❌ Verificar se você está logado no SharePoint no navegador

---

### Teste 1.3: Validação de Listas SharePoint

**Passos**:
1. Ir para o SharePoint (navegador)
2. Acessar o site configurado
3. Verificar se existem as 4 listas:
   - Prescricoes
   - Recebimentos
   - Dispensacoes
   - Perdas
4. Clicar em cada lista e verificar colunas

**Resultado Esperado**:
- ✅ Todas as 4 listas existem
- ✅ Colunas correspondem ao guia de configuração
- ✅ Permissões de edição habilitadas

---

## 📝 FASE 2: Testes CRUD - Prescrição

### Teste 2.1: CREATE - Criar Prescrição

**Passos**:
1. No sistema, ir para aba "1. Prescrição"
2. Verificar campo "ID Prescrição" (deve estar preenchido automaticamente: NPT-00001)
3. Preencher formulário:
   - Paciente: `João da Silva` (TESTE)
   - Prontuário: `123456`
   - Leito: `102`
   - Vazão: `50 mL/h`
   - Volume: `1200 mL`
   - Composição: `Glicose 50% + AA 10%`
   - Observações: `Teste inicial do sistema`
4. Clicar em "💾 Salvar Prescrição"
5. No modal de login, digitar:
   - Usuário: `admin`
   - Senha: `12345`
6. Clicar em "Entrar"

**Resultado Esperado**:
- ✅ Loading aparece brevemente
- ✅ Alert: "✅ Prescrição NPT-00001 registrada com sucesso!"
- ✅ Formulário é limpo automaticamente
- ✅ Campo ID atualiza para NPT-00002
- ✅ Aba "📊 Histórico" mostra a prescrição criada
- ✅ Console sem erros

**Verificação no SharePoint**:
1. Ir para SharePoint → Lista "Prescricoes"
2. Verificar se aparece um item novo
3. Abrir o item e conferir dados

**Resultado Esperado SharePoint**:
- ✅ Item criado com todos os campos preenchidos
- ✅ Title = NPT-00001
- ✅ Status = "Aguardando Bolsa"

---

### Teste 2.2: CREATE - Segunda Prescrição (para testes futuros)

**Passos**:
1. Criar mais uma prescrição:
   - Paciente: `Maria Santos` (TESTE)
   - Prontuário: `789012`
   - Leito: `205`
   - Vazão: `40 mL/h`
   - Volume: `1000 mL`
   - Composição: `Lipídeos 20%`
2. Salvar (usar mesmo login: admin/12345)

**Resultado Esperado**:
- ✅ ID gerado: NPT-00002
- ✅ Salva com sucesso
- ✅ Histórico mostra 2 prescrições

---

### Teste 2.3: READ - Visualizar Prescrições

**Passos**:
1. Ir para aba "📊 Histórico"
2. Clicar em "🔄 Atualizar"
3. Observar tabela

**Resultado Esperado**:
- ✅ Tabela mostra as 2 prescrições criadas
- ✅ Colunas preenchidas corretamente
- ✅ Badge de status amarelo: "Aguardando Bolsa"
- ✅ Data/hora preenchidas
- ✅ Usuário: "admin" (ou nome do usuário SharePoint)

---

### Teste 2.4: READ - Select de Recebimento

**Passos**:
1. Ir para aba "2. Recebimento Bolsa"
2. Clicar no dropdown "Selecionar Prescrição"

**Resultado Esperado**:
- ✅ Dropdown mostra as 2 prescrições:
  - NPT-00001 - João da Silva (TESTE) (Leito 102)
  - NPT-00002 - Maria Santos (TESTE) (Leito 205)

---

## 📦 FASE 3: Testes CRUD - Recebimento

### Teste 3.1: CREATE - Recebimento Conforme

**Passos**:
1. Na aba "2. Recebimento Bolsa"
2. Selecionar prescrição: `NPT-00001 - João da Silva`
3. Verificar se os dados da prescrição aparecem automaticamente
4. Preencher:
   - Lote: `LOTE-2025-001`
   - Temperatura Adequada: `Sim`
   - Integridade: `Íntegra`
   - Status Conferência: `Conforme`
   - Conferente: `Farmacêutico Teste`
   - Observações: `Recebimento OK`
5. Clicar em "✅ Registrar Recebimento"
6. Login: admin/12345

**Resultado Esperado**:
- ✅ Alert: "✅ Recebimento registrado! Status: Conforme"
- ✅ Formulário limpo
- ✅ Histórico atualiza automaticamente
- ✅ No histórico, a prescrição NPT-00001 agora mostra status "Bolsa Recebida"

**Verificação SharePoint**:
1. Lista "Recebimentos" → Item criado
2. Lista "Prescricoes" → NPT-00001 com Status = "Bolsa Recebida"

---

### Teste 3.2: CREATE - Recebimento Inconsistente

**Passos**:
1. Selecionar prescrição: `NPT-00002 - Maria Santos`
2. Preencher:
   - Lote: `LOTE-2025-002`
   - Temperatura Adequada: `Não`
   - Integridade: `Íntegra`
   - Status Conferência: `Inconsistente`
   - Conferente: `Técnico Teste`
   - Observações: `Temperatura fora do padrão - devolver`
3. Salvar (admin/12345)

**Resultado Esperado**:
- ✅ Recebimento registrado
- ✅ Status: Inconsistente
- ✅ NPT-00002 agora com status "Bolsa Recebida"

---

### Teste 3.3: READ - Select de Dispensação

**Passos**:
1. Ir para aba "3. Dispensação"
2. Abrir dropdown "Selecionar Recebimento"

**Resultado Esperado**:
- ✅ Mostra APENAS o recebimento CONFORME:
  - NPT-00001 - Lote LOTE-2025-001 - João da Silva
- ✅ NÃO mostra NPT-00002 (porque foi inconsistente)

---

## 📤 FASE 4: Testes CRUD - Dispensação

### Teste 4.1: CREATE - Dispensar Bolsa

**Passos**:
1. Na aba "3. Dispensação"
2. Selecionar: `NPT-00001 - Lote LOTE-2025-001`
3. Verificar se dados aparecem automaticamente
4. Preencher:
   - Hora: `21:00` (já pré-preenchida)
   - Quem Entregou: `Farmacêutico João`
   - Quem Recebeu: `Enfermeiro Maria`
   - Observações: `Dispensado conforme protocolo`
5. Clicar em "📤 Registrar Dispensação"
6. Login: admin/12345

**Resultado Esperado**:
- ✅ Alert: "✅ Dispensação registrada! ⚠️ Não esqueça de preencher o Google Forms..."
- ✅ Formulário limpo
- ✅ Histórico mostra dispensação
- ✅ NPT-00001 agora com status "Dispensada"

**Verificação SharePoint**:
1. Lista "Dispensacoes" → Item criado
2. Lista "Prescricoes" → NPT-00001 com Status = "Dispensada"

---

### Teste 4.2: READ - Verificar Filtro de Já Dispensada

**Passos**:
1. Na aba "3. Dispensação"
2. Abrir dropdown "Selecionar Recebimento"

**Resultado Esperado**:
- ✅ Dropdown VAZIO (porque NPT-00001 já foi dispensada)
- ✅ Mensagem: "-- Escolha um recebimento conforme --"

---

## ❌ FASE 5: Testes CRUD - Perdas/Devoluções

### Teste 5.1: CREATE - Registrar Devolução

**Passos**:
1. Na aba "❌ Perdas/Devoluções"
2. Preencher:
   - ID Prescrição: `NPT-00002`
   - Tipo: `Devolução à Pronutrir`
   - Motivo: `Temperatura inadequada`
   - Detalhes: `Bolsa recebida com temperatura acima do permitido. Devolvida imediatamente à Pronutrir conforme protocolo.`
3. Clicar em "❌ Registrar Perda/Devolução"
4. Login: admin/12345

**Resultado Esperado**:
- ✅ Alert: "✅ Devolução registrada! ⚠️ Não esqueça de preencher o Google Forms..."
- ✅ Formulário limpo
- ✅ Histórico atualizado
- ✅ NPT-00002 com status "Devolvida"

**Verificação SharePoint**:
1. Lista "Perdas" → Item criado
2. Lista "Prescricoes" → NPT-00002 com Status = "Devolvida"

---

### Teste 5.2: CREATE - Registrar Perda

**Passos**:
1. Criar nova prescrição:
   - Paciente: `Carlos Teste`
   - Prontuário: `111222`
   - Leito: `301`
   - Vazão: `60 mL/h`
   - Volume: `1500 mL`
2. Salvar (vai gerar NPT-00003)

3. Registrar perda:
   - ID Prescrição: `NPT-00003`
   - Tipo: `Perda`
   - Motivo: `Alta do paciente`
   - Detalhes: `Paciente recebeu alta antes da dispensação da bolsa.`
4. Salvar

**Resultado Esperado**:
- ✅ Perda registrada
- ✅ NPT-00003 com status "Devolvida"

---

## 📊 FASE 6: Testes de Histórico e Exportação

### Teste 6.1: READ - Visualizar Histórico Completo

**Passos**:
1. Ir para aba "📊 Histórico"
2. Clicar em "🔄 Atualizar"

**Resultado Esperado**:
- ✅ Tabela mostra TODOS os registros (prescrições, recebimentos, dispensações, perdas)
- ✅ Ordenação: mais recentes primeiro
- ✅ Badges coloridos corretos:
  - Amarelo: Aguardando Bolsa
  - Azul: Bolsa Recebida
  - Verde: Dispensada, Conforme
  - Vermelho: Devolvida, Inconsistente
- ✅ Dados corretos em todas as colunas

---

### Teste 6.2: Exportar CSV

**Passos**:
1. Na aba "📊 Histórico"
2. Clicar em "📥 Exportar CSV"
3. Salvar arquivo

**Resultado Esperado**:
- ✅ Loading aparece brevemente
- ✅ Alert: "✅ CSV exportado com sucesso!"
- ✅ Arquivo baixado: `npt_registros_YYYY-MM-DD.csv`

**Verificação do CSV**:
1. Abrir CSV no Excel ou LibreOffice
2. Verificar:
   - ✅ Encoding correto (acentuação preservada)
   - ✅ Colunas corretas
   - ✅ Dados completos
   - ✅ Separador: ponto-e-vírgula (;)

---

## 🔄 FASE 7: Testes de Atualização (UPDATE)

**Nota**: Atualmente, o sistema não possui interface para UPDATE via UI. As atualizações de status acontecem automaticamente durante o workflow.

### Teste 7.1: UPDATE Automático de Status

**Verificação**:
1. Revisar o histórico e confirmar que os status foram atualizados automaticamente:
   - NPT-00001: Aguardando Bolsa → Bolsa Recebida → Dispensada ✅
   - NPT-00002: Aguardando Bolsa → Bolsa Recebida → Devolvida ✅
   - NPT-00003: Aguardando Bolsa → Devolvida ✅

**Resultado Esperado**:
- ✅ Todos os status atualizaram corretamente conforme o fluxo

---

## 🗑️ FASE 8: Testes de Exclusão (DELETE)

**Nota**: O sistema não possui funcionalidade de DELETE na interface por segurança (auditoria). Deleções devem ser feitas manualmente no SharePoint se necessário.

### Teste 8.1: Limpeza de Dados de Teste (Opcional)

**Passos**:
1. Ir para SharePoint
2. Em cada lista (Prescricoes, Recebimentos, Dispensacoes, Perdas):
   - Selecionar itens de teste
   - Clicar em "..." → "Delete"
3. Voltar ao sistema e atualizar histórico

**Resultado Esperado**:
- ✅ Itens deletados no SharePoint
- ✅ Sistema não mostra mais os itens deletados
- ✅ Nenhum erro de JavaScript

---

## 🧪 FASE 9: Testes de Erro e Validação

### Teste 9.1: Formulário Vazio

**Passos**:
1. Na aba "1. Prescrição"
2. Clicar em "💾 Salvar Prescrição" SEM preencher nada

**Resultado Esperado**:
- ✅ Navegador impede submit
- ✅ Campos obrigatórios destacados em vermelho
- ✅ Mensagem do navegador: "Preencha este campo"

---

### Teste 9.2: Seleção Vazia em Dropdowns

**Passos**:
1. Na aba "2. Recebimento"
2. NÃO selecionar prescrição
3. Preencher outros campos
4. Tentar salvar

**Resultado Esperado**:
- ✅ Alert: "Selecione uma prescrição!"
- ✅ Não envia para login

---

### Teste 9.3: Login Inválido

**Passos**:
1. Tentar criar prescrição
2. No modal de login, digitar:
   - Usuário: `invalido`
   - Senha: `errado`
3. Clicar em "Entrar"

**Resultado Esperado**:
- ✅ Alert: "❌ Usuário ou senha inválidos"
- ✅ Modal permanece aberta
- ✅ Não salva a prescrição

---

### Teste 9.4: Erro de Conexão SharePoint

**Passos**:
1. Editar `config.js`
2. Alterar `SITE_URL` para URL inválida
3. Recarregar página

**Resultado Esperado**:
- ✅ Badge de status fica vermelho: "● Erro de Conexão"
- ✅ Alert com erro detalhado
- ✅ Console mostra erro de rede

**Recuperação**:
1. Corrigir URL em `config.js`
2. Recarregar página
3. ✅ Sistema volta a funcionar

---

## ✅ FASE 10: Checklist Final

### Resumo de Funcionalidades Testadas

**CRUD Completo**:
- [x] CREATE - Prescrição
- [x] CREATE - Recebimento
- [x] CREATE - Dispensação
- [x] CREATE - Perda/Devolução
- [x] READ - Histórico
- [x] READ - Selects dinâmicos
- [x] UPDATE - Status automático
- [x] DELETE - Manual via SharePoint

**Integrações**:
- [x] SharePoint REST API
- [x] Autenticação simulada
- [x] Exportação CSV
- [x] Validação de formulários

**Regras de Negócio**:
- [x] ID auto-gerado sequencial
- [x] Filtros de status (aguardando bolsa, conforme, etc.)
- [x] Workflow: Prescrição → Recebimento → Dispensação
- [x] Devoluções/perdas bloqueiam dispensação
- [x] Dados auto-preenchidos entre etapas

**Performance e UX**:
- [x] Loading feedback
- [x] Mensagens de sucesso/erro
- [x] Limpeza automática de formulários
- [x] Atualização automática de selects
- [x] Console sem erros

---

## 📝 Registro de Testes

**Data do Teste**: ___/___/______

**Testador**: _________________________

**Resultado Geral**:
- [ ] ✅ Todos os testes passaram
- [ ] ⚠️ Alguns testes falharam (listar abaixo)
- [ ] ❌ Sistema com erros críticos

**Problemas Encontrados**:
```
1. ___________________________________
2. ___________________________________
3. ___________________________________
```

**Observações**:
```
___________________________________
___________________________________
___________________________________
```

**Aprovação para Apresentação à TI**:
- [ ] Sistema aprovado para apresentar à TI
- [ ] Necessita correções antes de apresentar

---

**Próximo Passo**: Após todos os testes passarem, seguir para `APRESENTACAO_TI.md` e preparar demo ao vivo.
