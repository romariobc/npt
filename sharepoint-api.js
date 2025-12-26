/**
 * SharePoint API - Módulo de Integração
 * Sistema NPT HUWC
 *
 * Este módulo fornece funções para interagir com as listas SharePoint
 * usando a API REST do SharePoint Online
 */

const SharePointAPI = (function() {
  'use strict';

  // ============================================================================
  // VARIÁVEIS PRIVADAS
  // ============================================================================

  let formDigestValue = null;
  let formDigestExpires = null;


  // ============================================================================
  // FUNÇÕES DE AUTENTICAÇÃO E DIGEST
  // ============================================================================

  /**
   * Obtém o Form Digest Value (necessário para operações POST/UPDATE/DELETE)
   * O digest expira após 30 minutos
   */
  async function getFormDigest() {
    // Se já temos um digest válido, retorna ele
    if (formDigestValue && formDigestExpires && new Date() < formDigestExpires) {
      return formDigestValue;
    }

    try {
      const url = `${SharePointConfig.SITE_URL}/${SharePointConfig.API_VERSION}/contextinfo`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose'
        },
        credentials: 'include' // Importante para autenticação
      });

      if (!response.ok) {
        throw new Error(`Erro ao obter digest: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      formDigestValue = data.d.GetContextWebInformation.FormDigestValue;

      // Digest expira em 30 minutos - vamos renovar após 25 minutos
      formDigestExpires = new Date(new Date().getTime() + (25 * 60 * 1000));

      SharePointConfig.log('✅ Form Digest obtido com sucesso');
      return formDigestValue;

    } catch (error) {
      console.error('❌ Erro ao obter Form Digest:', error);
      throw new Error('Falha na autenticação com SharePoint. Verifique se está logado.');
    }
  }


  // ============================================================================
  // FUNÇÕES AUXILIARES
  // ============================================================================

  /**
   * Trata erros de resposta SharePoint
   */
  async function handleResponse(response) {
    if (!response.ok) {
      let errorMessage = `Erro HTTP: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();
        if (errorData.error && errorData.error.message) {
          errorMessage = errorData.error.message.value || errorMessage;
        }
      } catch (e) {
        // Não conseguiu parsear JSON do erro
      }

      throw new Error(errorMessage);
    }

    // Verificar se há conteúdo na resposta
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return null;
  }

  /**
   * Converte objeto JavaScript para formato SharePoint
   */
  function toSharePointItem(data) {
    const spItem = {
      __metadata: { type: 'SP.Data.PrescricoesListItem' } // Será ajustado por lista
    };

    // Copiar propriedades
    for (const key in data) {
      if (data.hasOwnProperty(key) && key !== '__metadata') {
        spItem[key] = data[key];
      }
    }

    return spItem;
  }

  /**
   * Extrai dados relevantes do item SharePoint
   */
  function fromSharePointItem(spItem) {
    if (!spItem || !spItem.d) return null;

    const item = spItem.d;
    const result = {
      Id: item.ID || item.Id,
      Created: item.Created,
      Modified: item.Modified,
      Author: item.Author ? item.Author.Title : null,
      Editor: item.Editor ? item.Editor.Title : null
    };

    // Copiar todas as outras propriedades exceto metadados
    for (const key in item) {
      if (item.hasOwnProperty(key) &&
          !['__metadata', 'ID', 'Id', 'Created', 'Modified', 'Author', 'Editor'].includes(key)) {
        result[key] = item[key];
      }
    }

    return result;
  }


  // ============================================================================
  // OPERAÇÕES CRUD GENÉRICAS
  // ============================================================================

  /**
   * CREATE - Criar novo item em uma lista
   *
   * @param {string} nomeLista - Nome da lista SharePoint
   * @param {object} dados - Dados do item a criar
   * @returns {Promise<object>} Item criado
   */
  async function criarItem(nomeLista, dados) {
    try {
      SharePointConfig.log(`Criando item em ${nomeLista}...`, dados);

      const digest = await getFormDigest();
      const url = SharePointConfig.getItemsUrl(nomeLista);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...SharePointConfig.HEADERS,
          'X-RequestDigest': digest
        },
        credentials: 'include',
        body: JSON.stringify(dados)
      });

      const result = await handleResponse(response);
      const item = fromSharePointItem(result);

      SharePointConfig.log(`✅ Item criado com sucesso. ID: ${item.Id}`);
      return item;

    } catch (error) {
      console.error(`❌ Erro ao criar item em ${nomeLista}:`, error);
      throw error;
    }
  }

  /**
   * READ - Buscar itens de uma lista
   *
   * @param {string} nomeLista - Nome da lista
   * @param {object} options - Opções de busca
   *   - filter: string OData (ex: "Status eq 'Ativo'")
   *   - select: array de campos (ex: ['Title', 'Status'])
   *   - orderBy: string (ex: 'Created desc')
   *   - top: número de itens (default: 100)
   * @returns {Promise<array>} Array de itens
   */
  async function buscarItens(nomeLista, options = {}) {
    try {
      SharePointConfig.log(`Buscando itens em ${nomeLista}...`, options);

      let url = SharePointConfig.getItemsUrl(nomeLista);

      // Construir query string
      const params = [];

      if (options.select && options.select.length > 0) {
        params.push(`$select=${options.select.join(',')}`);
      }

      if (options.filter) {
        params.push(`$filter=${options.filter}`);
      }

      if (options.orderBy) {
        params.push(`$orderby=${options.orderBy}`);
      }

      params.push(`$top=${options.top || SharePointConfig.PAGE_SIZE}`);

      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: SharePointConfig.HEADERS,
        credentials: 'include'
      });

      const result = await handleResponse(response);

      if (!result || !result.d || !result.d.results) {
        return [];
      }

      const items = result.d.results.map(item => fromSharePointItem({ d: item }));

      SharePointConfig.log(`✅ ${items.length} itens encontrados`);
      return items;

    } catch (error) {
      console.error(`❌ Erro ao buscar itens em ${nomeLista}:`, error);
      throw error;
    }
  }

  /**
   * READ - Buscar um item específico por ID
   *
   * @param {string} nomeLista - Nome da lista
   * @param {number} itemId - ID do item
   * @returns {Promise<object>} Item encontrado
   */
  async function buscarItemPorId(nomeLista, itemId) {
    try {
      SharePointConfig.log(`Buscando item ${itemId} em ${nomeLista}...`);

      const url = SharePointConfig.getItemUrl(nomeLista, itemId);

      const response = await fetch(url, {
        method: 'GET',
        headers: SharePointConfig.HEADERS,
        credentials: 'include'
      });

      const result = await handleResponse(response);
      const item = fromSharePointItem(result);

      SharePointConfig.log(`✅ Item encontrado`);
      return item;

    } catch (error) {
      console.error(`❌ Erro ao buscar item ${itemId}:`, error);
      throw error;
    }
  }

  /**
   * UPDATE - Atualizar um item existente
   *
   * @param {string} nomeLista - Nome da lista
   * @param {number} itemId - ID do item
   * @param {object} dados - Dados a atualizar
   * @returns {Promise<void>}
   */
  async function atualizarItem(nomeLista, itemId, dados) {
    try {
      SharePointConfig.log(`Atualizando item ${itemId} em ${nomeLista}...`, dados);

      const digest = await getFormDigest();
      const url = SharePointConfig.getItemUrl(nomeLista, itemId);

      const response = await fetch(url, {
        method: 'POST', // SharePoint usa POST com header especial para UPDATE
        headers: {
          ...SharePointConfig.HEADERS,
          'X-RequestDigest': digest,
          'X-HTTP-Method': 'MERGE',
          'IF-MATCH': '*' // Permite atualizar sem validar versão
        },
        credentials: 'include',
        body: JSON.stringify(dados)
      });

      await handleResponse(response);

      SharePointConfig.log(`✅ Item atualizado com sucesso`);

    } catch (error) {
      console.error(`❌ Erro ao atualizar item ${itemId}:`, error);
      throw error;
    }
  }

  /**
   * DELETE - Excluir um item
   *
   * @param {string} nomeLista - Nome da lista
   * @param {number} itemId - ID do item
   * @returns {Promise<void>}
   */
  async function excluirItem(nomeLista, itemId) {
    try {
      SharePointConfig.log(`Excluindo item ${itemId} de ${nomeLista}...`);

      const digest = await getFormDigest();
      const url = SharePointConfig.getItemUrl(nomeLista, itemId);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...SharePointConfig.HEADERS,
          'X-RequestDigest': digest,
          'X-HTTP-Method': 'DELETE',
          'IF-MATCH': '*'
        },
        credentials: 'include'
      });

      await handleResponse(response);

      SharePointConfig.log(`✅ Item excluído com sucesso`);

    } catch (error) {
      console.error(`❌ Erro ao excluir item ${itemId}:`, error);
      throw error;
    }
  }


  // ============================================================================
  // FUNÇÕES ESPECÍFICAS DO SISTEMA NPT
  // ============================================================================

  /**
   * PRESCRIÇÕES
   */
  const Prescricoes = {
    /**
     * Criar nova prescrição
     */
    async criar(dados) {
      const item = {
        Title: dados.idPrescricao,
        Paciente: dados.paciente,
        Prontuario: dados.prontuario,
        Leito: dados.leito,
        Vazao: dados.vazao,
        Volume: dados.volume,
        Composicao: dados.composicao || '',
        Observacoes: dados.observacoes || '',
        Status: dados.status || 'Aguardando Bolsa'
      };

      return await criarItem(SharePointConfig.LISTAS.PRESCRICOES, item);
    },

    /**
     * Buscar prescrições aguardando bolsa
     */
    async buscarAguardandoBolsa() {
      return await buscarItens(SharePointConfig.LISTAS.PRESCRICOES, {
        filter: "Status eq 'Aguardando Bolsa'",
        orderBy: 'Created desc'
      });
    },

    /**
     * Buscar todas as prescrições
     */
    async buscarTodas() {
      return await buscarItens(SharePointConfig.LISTAS.PRESCRICOES, {
        orderBy: 'Created desc'
      });
    },

    /**
     * Buscar prescrição por ID (Title)
     */
    async buscarPorIdPrescricao(idPrescricao) {
      const items = await buscarItens(SharePointConfig.LISTAS.PRESCRICOES, {
        filter: `Title eq '${idPrescricao}'`,
        top: 1
      });
      return items.length > 0 ? items[0] : null;
    },

    /**
     * Atualizar status da prescrição
     */
    async atualizarStatus(itemId, novoStatus) {
      return await atualizarItem(SharePointConfig.LISTAS.PRESCRICOES, itemId, {
        Status: novoStatus
      });
    }
  };

  /**
   * RECEBIMENTOS
   */
  const Recebimentos = {
    /**
     * Criar novo recebimento
     */
    async criar(dados) {
      const item = {
        Title: `REC-${Date.now()}`, // ID único do recebimento
        IDPrescricao: dados.idPrescricao,
        Lote: dados.lote,
        Paciente: dados.paciente,
        Leito: dados.leito,
        Temperatura: dados.temperatura,
        Integridade: dados.integridade,
        StatusConferencia: dados.status,
        Conferente: dados.conferente,
        Observacoes: dados.observacoes || ''
      };

      return await criarItem(SharePointConfig.LISTAS.RECEBIMENTOS, item);
    },

    /**
     * Buscar recebimentos conformes (não dispensados)
     */
    async buscarConformes() {
      return await buscarItens(SharePointConfig.LISTAS.RECEBIMENTOS, {
        filter: "StatusConferencia eq 'Conforme'",
        orderBy: 'Created desc'
      });
    },

    /**
     * Buscar recebimento por ID de prescrição
     */
    async buscarPorIdPrescricao(idPrescricao) {
      const items = await buscarItens(SharePointConfig.LISTAS.RECEBIMENTOS, {
        filter: `IDPrescricao eq '${idPrescricao}'`,
        top: 1,
        orderBy: 'Created desc'
      });
      return items.length > 0 ? items[0] : null;
    },

    /**
     * Buscar todos os recebimentos
     */
    async buscarTodos() {
      return await buscarItens(SharePointConfig.LISTAS.RECEBIMENTOS, {
        orderBy: 'Created desc'
      });
    }
  };

  /**
   * DISPENSAÇÕES
   */
  const Dispensacoes = {
    /**
     * Criar nova dispensação
     */
    async criar(dados) {
      const item = {
        Title: `DISP-${Date.now()}`, // ID único da dispensação
        IDPrescricao: dados.idPrescricao,
        Lote: dados.lote,
        Paciente: dados.paciente,
        Leito: dados.leito,
        HoraDispensa: dados.horaDispensa,
        Entregou: dados.entregou,
        Recebeu: dados.recebeu,
        Observacoes: dados.observacoes || ''
      };

      return await criarItem(SharePointConfig.LISTAS.DISPENSACOES, item);
    },

    /**
     * Verificar se prescrição já foi dispensada
     */
    async jaDispensada(idPrescricao) {
      const items = await buscarItens(SharePointConfig.LISTAS.DISPENSACOES, {
        filter: `IDPrescricao eq '${idPrescricao}'`,
        top: 1
      });
      return items.length > 0;
    },

    /**
     * Buscar todas as dispensações
     */
    async buscarTodas() {
      return await buscarItens(SharePointConfig.LISTAS.DISPENSACOES, {
        orderBy: 'Created desc'
      });
    }
  };

  /**
   * PERDAS/DEVOLUÇÕES
   */
  const Perdas = {
    /**
     * Criar nova perda/devolução
     */
    async criar(dados) {
      const item = {
        Title: `PERDA-${Date.now()}`, // ID único da perda
        IDPrescricao: dados.idPrescricao,
        TipoPerda: dados.tipoPerdaString,
        Motivo: dados.motivo,
        Detalhes: dados.detalhes
      };

      return await criarItem(SharePointConfig.LISTAS.PERDAS, item);
    },

    /**
     * Buscar todas as perdas
     */
    async buscarTodas() {
      return await buscarItens(SharePointConfig.LISTAS.PERDAS, {
        orderBy: 'Created desc'
      });
    },

    /**
     * Buscar perdas por motivo
     */
    async buscarPorMotivo(motivo) {
      return await buscarItens(SharePointConfig.LISTAS.PERDAS, {
        filter: `Motivo eq '${motivo}'`,
        orderBy: 'Created desc'
      });
    }
  };


  // ============================================================================
  // API PÚBLICA
  // ============================================================================

  return {
    // Funções genéricas
    criarItem,
    buscarItens,
    buscarItemPorId,
    atualizarItem,
    excluirItem,

    // Módulos específicos
    Prescricoes,
    Recebimentos,
    Dispensacoes,
    Perdas,

    // Utilitários
    getFormDigest,

    /**
     * Testa conexão com SharePoint
     */
    async testarConexao() {
      try {
        SharePointConfig.log('Testando conexão com SharePoint...');

        const url = `${SharePointConfig.SITE_URL}/${SharePointConfig.API_VERSION}/web`;

        const response = await fetch(url, {
          method: 'GET',
          headers: SharePointConfig.HEADERS,
          credentials: 'include'
        });

        const data = await handleResponse(response);

        SharePointConfig.log('✅ Conexão com SharePoint OK');
        SharePointConfig.log('Site:', data.d.Title);

        return {
          sucesso: true,
          site: data.d.Title,
          url: data.d.Url
        };

      } catch (error) {
        console.error('❌ Erro ao testar conexão:', error);
        return {
          sucesso: false,
          erro: error.message
        };
      }
    }
  };

})();

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SharePointAPI;
}
