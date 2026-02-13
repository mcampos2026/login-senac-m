class LoginPage {

  visitarPagina() {
    cy.visit('/login-unico/Login')
  }

  preencherEmail(email) {
  if (!email) return

  cy.get("input#email[name='email']")
    .should("be.visible")
    .and("be.enabled")
    .clear()
    .type(email)
}


  preencherSenha(senha) {
  if (!senha) return

  cy.get("input#senha[name='senha']")
    .should("be.visible")
    .and("be.enabled")
    .clear()
    .type(senha, { log: false })
}


  clicarBotaoLogin() {
  cy.get('button#formLoginButtonSubmit')
    .should('be.visible')
    .click()
}


  realizarLogin(email, senha) {
    this.visitarPagina()
    this.preencherEmail(email)
    this.preencherSenha(senha)
    this.clicarBotaoLogin()
  }

 lerTextoComOResultadoDepoisDeTentarLogin() {
  cy.log("INICIO lerResultadoLogin")

  const lerNome = (selector) => {
    return cy.get(selector, { timeout: 20000 })
      .should("be.visible")
      .invoke("text")
      .then(textoBruto => String(textoBruto).replace(/\s+/g, " ").trim())
  }

  return lerNome("#nomeUsuario")
    .then(nome1 => {
      if (nome1) return nome1
      return lerNome("#nome_apresentacao")
    })
    .then(nomeFinal => {
      cy.log("ETAPA texto limpo: " + nomeFinal)
      console.log("lerResultadoLogin nomeFinal:", nomeFinal)

      cy.log("FIM lerResultadoLogin")
      return cy.wrap(nomeFinal, { log: false })
    })

}


  validarLogin(textoLido) {
  cy.log("INICIO validarLogin")

  const textoTela = String(textoLido || "").replace(/\s+/g, " ").trim()
  cy.log("textoLido: " + textoTela)

  return cy.get("#txtUsuarioLogado", { timeout: 20000 })
    .should("be.visible")
    .then(() => {
      return cy.get("#nomeUsuario", { timeout: 20000 })
        .should("be.visible")
        .invoke("text")
        .then(nomeBruto => String(nomeBruto).replace(/\s+/g, " ").trim())
    })
    .then(nome => {
      cy.log("nomeUsuario: " + nome)

      const sucesso = Boolean(nome)

      cy.log("resultado: " + String(sucesso))
      cy.log("FIM validarLogin")

      expect(
        sucesso,
        "Login deveria exibir nome do usuario em #nomeUsuario"
      ).to.eq(true)

      return cy.wrap(sucesso, { log: false })
    })

  }

 validarMensagemErroGeral(mensagemEsperada) {
  return cy
    .get("#valid_geral", { timeout: 10000 })
    .should("be.visible")
    .invoke("text")
    .then(texto => {
      const textoLimpo = String(texto).replace(/\s+/g, " ").trim()
      expect(textoLimpo).to.contain(mensagemEsperada)
    })
}

}

export default new LoginPage()
