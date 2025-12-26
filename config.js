/**
 * Configuração SharePoint - Sistema NPT HUWC
 *
 * INSTRUÇÕES:
 * 1. Após criar o site SharePoint, atualize a variável SITE_URL
 * 2. Certifique-se que os nomes das listas correspondem ao criado no SharePoint
 * 3. Não compartilhe este arquivo com credenciais (se adicionar)
 */

const SharePointConfig = {
  // ============================================================================
  // CONFIGURAÇÃO PRINCIPAL
  // ============================================================================

  /**
   * URL completa do site SharePoint
   * Exemplo: 'https://hospital.sharepoint.com/sites/SistemaNPT'
   *
   * IMPORTANTE: Atualize com a URL do SEU site após criação
   */
  SITE_URL: 'https://[SEU-TENANT].sharepoint.com/sites/SistemaNPT',


  // ============================================================================
  // NOMES DAS LISTAS
  // ============================================================================

  /**
   * Nomes exatos das listas no SharePoint
   * DEVEM corresponder aos nomes criados (case-sensitive)
   */
  LISTAS: {
    PRESCRICOES: 'Prescricoes',
    RECEBIMENTOS: 'Recebimentos',
    DISPENSACOES: 'Dispensacoes',
    PERDAS: 'Perdas'
  },


  // ============================================================================
  // CONFIGURAÇÕES DE API
  // ============================================================================

  /**
   * Versão da API REST do SharePoint
   */
  API_VERSION: '_api/web',

  /**
   * Headers padrão para requisições
   */
  HEADERS: {
    'Accept': 'application/json;odata=verbose',
    'Content-Type': 'application/json;odata=verbose'
  },

  /**
   * Timeout para requisições (ms)
   */
  REQUEST_TIMEOUT: 30000, // 30 segundos


  // ============================================================================
  // CONFIGURAÇÕES DE SEGURANÇA
  // ============================================================================

  /**
   * Modo de desenvolvimento (true) ou produção (false)
   * Em desenvolvimento: usa auth-simulator.js
   * Em produção: usa Entra ID real
   */
  MODO_DESENVOLVIMENTO: true,

  /**
   * Habilitar logs detalhados no console
   */
  DEBUG: true,


  // ============================================================================
  // CONFIGURAÇÕES DO SISTEMA
  // ============================================================================

  /**
   * Prefixo para IDs de prescrição
   */
  PREFIXO_ID_PRESCRICAO: 'NPT-',

  /**
   * Número de dígitos para ID (ex: 00001)
   */
  DIGITOS_ID: 5,

  /**
   * Limite de itens por requisição (paginação)
   */
  PAGE_SIZE: 100,


  // ============================================================================
  // FUNÇÕES AUXILIARES
  // ============================================================================

  /**
   * Retorna a URL completa para uma lista específica
   * @param {string} nomeLista - Nome da lista (usar LISTAS.*)
   * @returns {string} URL completa da lista
   */
  getListaUrl: function(nomeLista) {
    return `${this.SITE_URL}/${this.API_VERSION}/lists/getbytitle('${nomeLista}')`;
  },

  /**
   * Retorna a URL para items de uma lista
   * @param {string} nomeLista - Nome da lista
   * @returns {string} URL dos items
   */
  getItemsUrl: function(nomeLista) {
    return `${this.getListaUrl(nomeLista)}/items`;
  },

  /**
   * Retorna a URL para um item específico
   * @param {string} nomeLista - Nome da lista
   * @param {number} itemId - ID do item
   * @returns {string} URL do item
   */
  getItemUrl: function(nomeLista, itemId) {
    return `${this.getItemsUrl(nomeLista)}(${itemId})`;
  },

  /**
   * Valida se a configuração está completa
   * @returns {Object} { valido: boolean, erros: string[] }
   */
  validar: function() {
    const erros = [];

    // Verificar URL do site
    if (this.SITE_URL.includes('[SEU-TENANT]')) {
      erros.push('SITE_URL não foi configurada. Atualize com a URL real do SharePoint.');
    }

    if (!this.SITE_URL.startsWith('https://')) {
      erros.push('SITE_URL deve começar com https://');
    }

    // Verificar nomes das listas
    const listas = Object.values(this.LISTAS);
    if (listas.some(lista => !lista || lista.trim() === '')) {
      erros.push('Todos os nomes de listas devem estar preenchidos.');
    }

    return {
      valido: erros.length === 0,
      erros: erros
    };
  },

  /**
   * Log de debug (apenas se DEBUG = true)
   */
  log: function(...args) {
    if (this.DEBUG) {
      console.log('[SharePoint Config]', ...args);
    }
  }
};

// Validar configuração ao carregar
document.addEventListener('DOMContentLoaded', function() {
  const validacao = SharePointConfig.validar();

  if (!validacao.valido) {
    console.error('❌ Configuração SharePoint inválida:');
    validacao.erros.forEach(erro => console.error('  -', erro));

    if (!SharePointConfig.MODO_DESENVOLVIMENTO) {
      alert('Erro de configuração SharePoint. Verifique o console.');
    }
  } else {
    SharePointConfig.log('✅ Configuração SharePoint válida');
    SharePointConfig.log('Site:', SharePointConfig.SITE_URL);
    SharePointConfig.log('Modo:', SharePointConfig.MODO_DESENVOLVIMENTO ? 'Desenvolvimento' : 'Produção');
  }
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SharePointConfig;
}
