# Guia de Configuração SharePoint - Sistema NPT HUWC

## 📋 Pré-requisitos

- [ ] Acesso ao SharePoint Online (Microsoft 365)
- [ ] Permissão para criar sites e listas
- [ ] Navegador moderno (Chrome, Edge, Firefox)
- [ ] Conexão com internet

---

## 🏗️ PARTE 1: Criar Site SharePoint

### Passo 1: Acessar SharePoint
1. Acesse: `https://[seu-tenant].sharepoint.com`
2. Ou pelo Microsoft 365: `https://www.office.com` → Ícone SharePoint

### Passo 2: Criar Novo Site
1. Clique em **"+ Criar site"** (canto superior)
2. Escolha **"Site de Equipe"** (Team Site)
3. Preencha:
   - **Nome**: `Sistema NPT` ou `Farmácia NPT`
   - **Descrição**: `Sistema de gerenciamento de Nutrição Parenteral Total - Fluxo HUWC`
   - **Classificação**: Conforme política interna (ex: "Confidencial")
   - **Idioma**: Português (Brasil)
4. Clique em **"Avançar"**

### Passo 3: Configurar Permissões Iniciais
1. **Proprietários**: Adicione você + responsável TI
2. **Membros**: Adicione grupo de farmacêuticos (se existir no AD)
3. **Visitantes**: Deixe vazio (sem leitura pública)
4. Clique em **"Concluir"**

### Passo 4: Anotar URL do Site
- Após criação, copie a URL completa
- Exemplo: `https://hospital.sharepoint.com/sites/SistemaNPT`
- **IMPORTANTE**: Você precisará desta URL no arquivo `config.js`

---

## 📊 PARTE 2: Criar Listas SharePoint

Você criará **4 listas**. Siga os passos para cada uma:

---

### LISTA 1: Prescricoes

#### Passo 1: Criar a Lista
1. No site criado, clique em **"+ Novo"** → **"Lista"**
2. Escolha **"Lista em branco"**
3. Nome: `Prescricoes`
4. Descrição: `Registro de prescrições médicas de NPT`
5. Clique em **"Criar"**

#### Passo 2: Adicionar Colunas

**IMPORTANTE**: A coluna "Title" já existe por padrão. Vamos renomear e adicionar outras.

1. Clique em **"+ Adicionar coluna"** no topo da lista

**Coluna 1: Title** (já existe - apenas renomear)
- Clique nas configurações da coluna "Title" → "Configurações da coluna"
- Altere o nome para: `IDPrescricao`
- Obrigatório: Sim
- Salvar

**Coluna 2: Paciente**
- Tipo: **Linha de texto única**
- Nome: `Paciente`
- Obrigatório: Sim

**Coluna 3: Prontuario**
- Tipo: **Linha de texto única**
- Nome: `Prontuario`
- Obrigatório: Sim

**Coluna 4: Leito**
- Tipo: **Linha de texto única**
- Nome: `Leito`
- Obrigatório: Sim

**Coluna 5: Vazao**
- Tipo: **Linha de texto única**
- Nome: `Vazao`
- Obrigatório: Sim
- Descrição: `Vazão em mL/h`

**Coluna 6: Volume**
- Tipo: **Linha de texto única**
- Nome: `Volume`
- Obrigatório: Sim
- Descrição: `Volume total em mL`

**Coluna 7: Composicao**
- Tipo: **Várias linhas de texto**
- Nome: `Composicao`
- Obrigatório: Não
- Número de linhas: 4

**Coluna 8: Observacoes**
- Tipo: **Várias linhas de texto**
- Nome: `Observacoes`
- Obrigatório: Não
- Número de linhas: 4

**Coluna 9: Status**
- Tipo: **Escolha**
- Nome: `Status`
- Opções (uma por linha):
  ```
  Aguardando Bolsa
  Bolsa Recebida
  Dispensada
  Devolvida
  ```
- Exibir opções usando: Menu suspenso
- Valor padrão: `Aguardando Bolsa`
- Obrigatório: Sim

#### Passo 3: Configurar Versionamento
1. Clique em **⚙️ Configurações** (engrenagem) → **Configurações da lista**
2. Em "Configurações gerais", clique em **"Configurações de versionamento"**
3. Habilite:
   - ✅ **Criar uma versão sempre que editar um item nesta lista**
   - ✅ **Histórico de versões de item**: Criar versões principais (1, 2, 3...)
4. Salvar

---

### LISTA 2: Recebimentos

#### Passo 1: Criar a Lista
1. Volte à página inicial do site (clique no nome do site)
2. **"+ Novo"** → **"Lista"**
3. Nome: `Recebimentos`
4. Descrição: `Conferência de recebimento das bolsas de NPT`
5. Criar

#### Passo 2: Adicionar Colunas

**Coluna: Title** (renomear)
- Renomear para: `IDRecebimento`
- Obrigatório: Sim

**Coluna: IDPrescricao**
- Tipo: **Linha de texto única**
- Nome: `IDPrescricao`
- Obrigatório: Sim
- Descrição: `ID da prescrição vinculada (ex: NPT-00001)`

**Coluna: Lote**
- Tipo: **Linha de texto única**
- Nome: `Lote`
- Obrigatório: Sim
- Descrição: `Número do lote da Pronutrir`

**Coluna: Paciente**
- Tipo: **Linha de texto única**
- Nome: `Paciente`
- Obrigatório: Sim

**Coluna: Leito**
- Tipo: **Linha de texto única**
- Nome: `Leito`
- Obrigatório: Sim

**Coluna: Temperatura**
- Tipo: **Escolha**
- Nome: `Temperatura`
- Opções:
  ```
  Sim
  Não
  ```
- Obrigatório: Sim

**Coluna: Integridade**
- Tipo: **Escolha**
- Nome: `Integridade`
- Opções:
  ```
  Íntegra
  Violada
  ```
- Obrigatório: Sim

**Coluna: StatusConferencia**
- Tipo: **Escolha**
- Nome: `StatusConferencia`
- Opções:
  ```
  Conforme
  Inconsistente
  ```
- Obrigatório: Sim

**Coluna: Conferente**
- Tipo: **Linha de texto única**
- Nome: `Conferente`
- Obrigatório: Sim
- Descrição: `Nome do farmacêutico ou técnico que conferiu`

**Coluna: Observacoes**
- Tipo: **Várias linhas de texto**
- Nome: `Observacoes`
- Obrigatório: Não
- Número de linhas: 4

#### Passo 3: Configurar Versionamento
(Mesmo processo da Lista 1)

---

### LISTA 3: Dispensacoes

#### Passo 1: Criar a Lista
1. Volte à página inicial do site
2. **"+ Novo"** → **"Lista"**
3. Nome: `Dispensacoes`
4. Descrição: `Registro de dispensação de bolsas para unidades`
5. Criar

#### Passo 2: Adicionar Colunas

**Coluna: Title** (renomear)
- Renomear para: `IDDispensacao`
- Obrigatório: Sim

**Coluna: IDPrescricao**
- Tipo: **Linha de texto única**
- Nome: `IDPrescricao`
- Obrigatório: Sim

**Coluna: Lote**
- Tipo: **Linha de texto única**
- Nome: `Lote`
- Obrigatório: Sim

**Coluna: Paciente**
- Tipo: **Linha de texto única**
- Nome: `Paciente`
- Obrigatório: Sim

**Coluna: Leito**
- Tipo: **Linha de texto única**
- Nome: `Leito`
- Obrigatório: Sim

**Coluna: HoraDispensa**
- Tipo: **Linha de texto única**
- Nome: `HoraDispensa`
- Obrigatório: Sim
- Descrição: `Hora da dispensação (ex: 21:00)`

**Coluna: Entregou**
- Tipo: **Linha de texto única**
- Nome: `Entregou`
- Obrigatório: Sim
- Descrição: `Nome de quem entregou (farmácia)`

**Coluna: Recebeu**
- Tipo: **Linha de texto única**
- Nome: `Recebeu`
- Obrigatório: Sim
- Descrição: `Nome de quem recebeu (unidade)`

**Coluna: Observacoes**
- Tipo: **Várias linhas de texto**
- Nome: `Observacoes`
- Obrigatório: Não
- Número de linhas: 4

#### Passo 3: Configurar Versionamento
(Mesmo processo das listas anteriores)

---

### LISTA 4: Perdas

#### Passo 1: Criar a Lista
1. Volte à página inicial do site
2. **"+ Novo"** → **"Lista"**
3. Nome: `Perdas`
4. Descrição: `Registro de perdas e devoluções de bolsas NPT`
5. Criar

#### Passo 2: Adicionar Colunas

**Coluna: Title** (renomear)
- Renomear para: `IDPerda`
- Obrigatório: Sim

**Coluna: IDPrescricao**
- Tipo: **Linha de texto única**
- Nome: `IDPrescricao`
- Obrigatório: Sim

**Coluna: TipoPerda**
- Tipo: **Escolha**
- Nome: `TipoPerda`
- Opções:
  ```
  Devolução
  Perda
  ```
- Obrigatório: Sim

**Coluna: Motivo**
- Tipo: **Escolha**
- Nome: `Motivo`
- Opções (uma por linha):
  ```
  Temperatura inadequada
  Composição incorreta
  Volume incorreto
  Identificação incorreta
  Integridade comprometida
  Prescrição cancelada
  Paciente em alta
  Paciente foi a óbito
  Vencimento
  Outro
  ```
- Obrigatório: Sim

**Coluna: Detalhes**
- Tipo: **Várias linhas de texto**
- Nome: `Detalhes`
- Obrigatório: Sim
- Número de linhas: 6
- Descrição: `Descrição detalhada do ocorrido`

#### Passo 3: Configurar Versionamento
(Mesmo processo das listas anteriores)

---

## 🔒 PARTE 3: Configurar Permissões

### Permissões Recomendadas

**Nível 1: Proprietários do Site**
- Quem: TI + Responsável Farmácia
- Pode: Tudo (criar/editar/excluir listas, gerenciar permissões)

**Nível 2: Membros (Farmacêuticos)**
- Quem: Grupo "Farmacêuticos" ou usuários individuais
- Pode: Criar e editar itens nas 4 listas

**Nível 3: Visitantes**
- Quem: Ninguém (manter vazio)
- Pode: N/A

### Como Configurar

1. Clique em **⚙️ Configurações** → **Permissões do site**
2. Remova "Todos exceto usuários externos" se existir
3. Adicione grupo do Active Directory:
   - Clique em **"Conceder permissões"**
   - Digite nome do grupo (ex: "GRP-Farmaceuticos")
   - Selecione nível: **"Editar"** (permite criar/editar)
   - Compartilhar

### Permissões por Lista (Opcional - Mais Restritivo)

Se precisar restringir acesso diferente por lista:

1. Vá para a lista específica
2. **⚙️ Configurações** → **Permissões desta lista**
3. Clique em **"Parar de herdar permissões"**
4. Configure conforme necessário

**Recomendação**: Manter herança (mais simples) a menos que TI exija separação.

---

## ✅ PARTE 4: Validação da Configuração

### Checklist Final

- [ ] Site SharePoint criado
- [ ] URL do site anotada
- [ ] 4 listas criadas: Prescricoes, Recebimentos, Dispensacoes, Perdas
- [ ] Todas as colunas adicionadas corretamente
- [ ] Versionamento habilitado em todas as listas
- [ ] Permissões configuradas
- [ ] Teste manual: criar 1 item em cada lista para validar

### Teste Rápido

**Prescricoes**:
1. Clique em **"+ Novo"**
2. Preencha:
   - IDPrescricao: `NPT-00001`
   - Paciente: `Teste Paciente`
   - Prontuario: `12345`
   - Leito: `101-A`
   - Vazao: `50 mL/h`
   - Volume: `1200 mL`
   - Status: `Aguardando Bolsa`
3. Salvar
4. ✅ Se salvou = configuração OK
5. Excluir item de teste

Repetir para as outras 3 listas.

---

## 📝 PARTE 5: Anotar Informações para config.js

Após concluir a configuração, anote:

```javascript
// Copie estas informações:
Site URL: https://[seu-tenant].sharepoint.com/sites/SistemaNPT
Lista Prescricoes: Prescricoes
Lista Recebimentos: Recebimentos
Lista Dispensacoes: Dispensacoes
Lista Perdas: Perdas
```

Você usará essas informações no arquivo `src/config.js`.

---

## 🆘 Problemas Comuns

### "Não consigo criar site"
- **Solução**: Fale com TI para liberar permissão de criação de sites

### "Não vejo opção '+ Novo'"
- **Solução**: Verifique se tem permissão de edição no site

### "Erro ao criar coluna"
- **Solução**: Verifique se não existe coluna com nome duplicado

### "Como apagar uma lista?"
- Vá na lista → ⚙️ Configurações → Configurações da lista → Permissões e gerenciamento → Excluir esta lista

---

## 🎯 Próximos Passos

Após concluir este guia:
1. ✅ Vá para `src/config.js` e configure a URL do site
2. ✅ Execute testes com `ROTEIRO_TESTES.md`
3. ✅ Apresente para TI usando `apresentacao-ti/APRESENTACAO_TI.md`

---

**Criado**: 2025-12-25
**Versão**: 1.0
**Tempo estimado**: 45-60 minutos
