import LoginPage from '../../pages/LoginPage'

describe('login-unico/Login', () => {

  beforeEach(() => {
    cy.fixture('loginData').as('login')
  })

  // cenário de senha válida
  it("Login valido caminho feliz", function () {

    cy.log("ETAPA 1 iniciar login")

    const email = Cypress.env("E2E_EMAIL")
    const senha = Cypress.env("E2E_SENHA")

    expect(email, "E2E_EMAIL deve estar definido").to.exist
    expect(senha, "E2E_SENHA deve estar definido").to.exist

    // ETAPA 1 executar login
    LoginPage.realizarLogin(email, senha)

    cy.log("ETAPA 2 ler texto da tela apos login")

    // ETAPA 2 ler texto exibido apos login
    LoginPage.lerTextoComOResultadoDepoisDeTentarLogin().then(textoLidoDaTela => {

      cy.log("ETAPA 3 guardar texto lido em variavel")
      cy.log("Texto lido da tela: " + textoLidoDaTela)

      cy.log("ETAPA 4 validar resultado do login")

      // ETAPA 4 validar login
      LoginPage.validarLogin(textoLidoDaTela)

    })

    cy.log("ETAPA FINAL fim do teste de login valido")
  })


  it("Email inválido", function () {

    cy.log("ETAPA 1 tentar login com email inválido")

    LoginPage.realizarLogin(
      this.login.emailInvalido.email,
      this.login.emailInvalido.senha
    )

    cy.log("ETAPA 2 validar mensagem de erro exibida")

    LoginPage.validarMensagemErroGeral(
      this.login.emailInvalido.mensagemErro
    )
  })


  it('Campos obrigatórios não preenchidos', function () {

    LoginPage.realizarLogin(
      this.login.camposVazios.email,
      this.login.camposVazios.senha
    )

    LoginPage.validarMensagemErro('obrigatório')
  })

})
