/**
 * Simulador de Autenticação - Modo Desenvolvimento
 * Sistema NPT HUWC
 *
 * Este módulo simula autenticação para permitir testes sem Entra ID configurado.
 * USO: APENAS EM DESENVOLVIMENTO - NUNCA EM PRODUÇÃO
 *
 * Em produção, este arquivo será substituído pela autenticação real do Entra ID
 * conforme orientação da TI do hospital.
 */

const AuthSimulator = (function() {
  'use strict';

  // ============================================================================
  // USUÁRIOS DE TESTE
  // ============================================================================

  /**
   * Base de usuários para simulação
   * Em produção, virá do Entra ID
   */
  const usuariosTeste = {
    'admin': {
      nome: 'Administrador do Sistema',
      email: 'admin@hospital.local',
      cargo: 'Administrador',
      senha: '12345' // APENAS PARA TESTES
    },
    'farmacia': {
      nome: 'João Farmacêutico',
      email: 'joao.farm@hospital.local',
      cargo: 'Farmacêutico',
      senha: 'farm123'
    },
    'tecnico1': {
      nome: 'Maria Técnica',
      email: 'maria.tec@hospital.local',
      cargo: 'Técnico de Farmácia',
      senha: 'senha1'
    },
    'tecnico2': {
      nome: 'Pedro Técnico',
      email: 'pedro.tec@hospital.local',
      cargo: 'Técnico de Farmácia',
      senha: 'senha2'
    },
    'supervisor': {
      nome: 'Ana Supervisora',
      email: 'ana.super@hospital.local',
      cargo: 'Supervisora de Farmácia',
      senha: 'super456'
    }
  };


  // ============================================================================
  // ESTADO DA AUTENTICAÇÃO
  // ============================================================================

  let usuarioAtual = null;
  let modalLoginElement = null;
  let callbackLoginSucesso = null;


  // ============================================================================
  // FUNÇÕES DE AUTENTICAÇÃO
  // ============================================================================

  /**
   * Verifica se usuário está autenticado
   */
  function estaAutenticado() {
    return usuarioAtual !== null;
  }

  /**
   * Retorna dados do usuário atual
   */
  function getUsuarioAtual() {
    return usuarioAtual;
  }

  /**
   * Tenta fazer login com credenciais
   */
  function tentarLogin(username, senha) {
    console.log('[AuthSimulator] Tentando login:', username);

    const usuario = usuariosTeste[username.toLowerCase()];

    if (!usuario) {
      console.warn('[AuthSimulator] Usuário não encontrado');
      return {
        sucesso: false,
        erro: 'Usuário não encontrado'
      };
    }

    if (usuario.senha !== senha) {
      console.warn('[AuthSimulator] Senha incorreta');
      return {
        sucesso: false,
        erro: 'Senha incorreta'
      };
    }

    // Login bem-sucedido
    usuarioAtual = {
      username: username,
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
      dataLogin: new Date()
    };

    console.log('[AuthSimulator] ✅ Login bem-sucedido:', usuarioAtual.nome);

    // Salvar em sessionStorage (apenas para simulação)
    sessionStorage.setItem('authSimulator_usuario', JSON.stringify(usuarioAtual));

    return {
      sucesso: true,
      usuario: usuarioAtual
    };
  }

  /**
   * Fazer logout
   */
  function logout() {
    console.log('[AuthSimulator] Fazendo logout...');

    usuarioAtual = null;
    sessionStorage.removeItem('authSimulator_usuario');

    console.log('[AuthSimulator] ✅ Logout realizado');
  }

  /**
   * Restaurar sessão (se existir)
   */
  function restaurarSessao() {
    const usuarioSalvo = sessionStorage.getItem('authSimulator_usuario');

    if (usuarioSalvo) {
      try {
        usuarioAtual = JSON.parse(usuarioSalvo);
        console.log('[AuthSimulator] ✅ Sessão restaurada:', usuarioAtual.nome);
        return true;
      } catch (e) {
        console.error('[AuthSimulator] Erro ao restaurar sessão:', e);
        sessionStorage.removeItem('authSimulator_usuario');
      }
    }

    return false;
  }


  // ============================================================================
  // INTERFACE DE LOGIN (MODAL)
  // ============================================================================

  /**
   * Solicita login ao usuário
   */
  function solicitarLogin(callback) {
    console.log('[AuthSimulator] Solicitando login...');

    callbackLoginSucesso = callback;

    if (!modalLoginElement) {
      criarModalLogin();
    }

    // Resetar campos
    document.getElementById('authSimUsername').value = '';
    document.getElementById('authSimPassword').value = '';
    document.getElementById('authSimErro').style.display = 'none';

    // Mostrar modal
    const modal = bootstrap.Modal.getInstance(modalLoginElement) ||
                   new bootstrap.Modal(modalLoginElement);
    modal.show();
  }

  /**
   * Criar HTML do modal de login
   */
  function criarModalLogin() {
    const modalHtml = `
      <div class="modal fade" id="authSimulatorModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-warning text-dark">
              <h5 class="modal-title">
                🔐 Login - Modo Desenvolvimento
              </h5>
            </div>
            <div class="modal-body">
              <div class="alert alert-warning">
                <strong>⚠️ MODO SIMULAÇÃO</strong><br>
                Esta é uma autenticação simulada para testes.<br>
                Em produção, usará Entra ID do hospital.
              </div>

              <div class="mb-3">
                <label class="form-label">Usuário</label>
                <input type="text" id="authSimUsername" class="form-control"
                       placeholder="Usuário de teste" autocomplete="username">
                <small class="text-muted">
                  Teste: admin, farmacia, tecnico1, tecnico2, supervisor
                </small>
              </div>

              <div class="mb-3">
                <label class="form-label">Senha</label>
                <input type="password" id="authSimPassword" class="form-control"
                       placeholder="Senha" autocomplete="current-password">
              </div>

              <div id="authSimErro" class="alert alert-danger" style="display:none;"></div>

              <div class="card bg-light">
                <div class="card-body">
                  <p class="card-text small mb-0">
                    <strong>Credenciais de teste:</strong><br>
                    • admin / 12345<br>
                    • farmacia / farm123<br>
                    • tecnico1 / senha1
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="button" id="authSimBtnLogin" class="btn btn-primary">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Adicionar modal ao DOM
    const container = document.createElement('div');
    container.innerHTML = modalHtml;
    document.body.appendChild(container.firstElementChild);

    modalLoginElement = document.getElementById('authSimulatorModal');

    // Event listeners
    document.getElementById('authSimBtnLogin').addEventListener('click', function() {
      processarLogin();
    });

    // Enter no campo senha
    document.getElementById('authSimPassword').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        processarLogin();
      }
    });
  }

  /**
   * Processar tentativa de login
   */
  function processarLogin() {
    const username = document.getElementById('authSimUsername').value.trim();
    const senha = document.getElementById('authSimPassword').value;

    if (!username || !senha) {
      mostrarErro('Preencha usuário e senha');
      return;
    }

    const resultado = tentarLogin(username, senha);

    if (resultado.sucesso) {
      // Fechar modal
      const modal = bootstrap.Modal.getInstance(modalLoginElement);
      modal.hide();

      // Executar callback
      if (callbackLoginSucesso) {
        callbackLoginSucesso(resultado.usuario);
        callbackLoginSucesso = null;
      }

    } else {
      mostrarErro(resultado.erro);
    }
  }

  /**
   * Mostrar erro no modal
   */
  function mostrarErro(mensagem) {
    const divErro = document.getElementById('authSimErro');
    divErro.textContent = mensagem;
    divErro.style.display = 'block';
  }


  // ============================================================================
  // BANNER DE DESENVOLVIMENTO
  // ============================================================================

  /**
   * Exibe banner indicando modo desenvolvimento
   */
  function exibirBannerDesenvolvimento() {
    const banner = document.createElement('div');
    banner.id = 'authSimDevBanner';
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #ff9800, #ff5722);
      color: white;
      padding: 8px 20px;
      text-align: center;
      font-weight: bold;
      z-index: 9999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      font-size: 14px;
    `;

    const nomeUsuario = usuarioAtual ? usuarioAtual.nome : 'Não autenticado';

    banner.innerHTML = `
      🔧 MODO DESENVOLVIMENTO | Autenticação Simulada | Usuário: ${nomeUsuario}
      <button onclick="AuthSimulator.logout(); window.location.reload();"
              style="margin-left: 15px; padding: 3px 12px; border: 1px solid white;
                     background: rgba(255,255,255,0.2); color: white; border-radius: 4px;
                     cursor: pointer; font-size: 12px;">
        Logout
      </button>
    `;

    // Ajustar body para não ficar atrás do banner
    document.body.style.paddingTop = '45px';

    document.body.insertBefore(banner, document.body.firstChild);
  }


  // ============================================================================
  // INICIALIZAÇÃO
  // ============================================================================

  /**
   * Inicializa o simulador
   */
  function inicializar() {
    console.log('[AuthSimulator] 🔧 Iniciando simulador de autenticação...');

    if (!SharePointConfig.MODO_DESENVOLVIMENTO) {
      console.error('[AuthSimulator] ❌ AuthSimulator só deve ser usado em modo desenvolvimento!');
      return;
    }

    // Tentar restaurar sessão
    restaurarSessao();

    // Exibir banner
    exibirBannerDesenvolvimento();

    console.log('[AuthSimulator] ✅ Simulador inicializado');
    console.log('[AuthSimulator] Usuários disponíveis:', Object.keys(usuariosTeste));
  }


  // ============================================================================
  // API PÚBLICA
  // ============================================================================

  return {
    inicializar,
    solicitarLogin,
    tentarLogin,
    logout,
    estaAutenticado,
    getUsuarioAtual,
    restaurarSessao,

    /**
     * Lista usuários disponíveis (apenas dev)
     */
    listarUsuarios: function() {
      return Object.keys(usuariosTeste).map(key => ({
        username: key,
        nome: usuariosTeste[key].nome,
        cargo: usuariosTeste[key].cargo
      }));
    }
  };

})();

// Auto-inicializar quando página carregar
document.addEventListener('DOMContentLoaded', function() {
  if (SharePointConfig.MODO_DESENVOLVIMENTO) {
    AuthSimulator.inicializar();
  }
});

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthSimulator;
}
