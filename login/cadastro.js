const btnCadastro = document.getElementById("btnCadastro");
const btnLogin = document.getElementById("btnLogin");
const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formLogin");
const btnEnviarCadastro = document.getElementById("btnEnviarCadastro");
const cadastroInput = document.getElementById("cadastroInput");
const btnEnviarLogin = document.getElementById("btnEnviarLogin");
const loginInput = document.getElementById("loginInput");

// Função para alternar abas
function showTab(tab) {
  if (tab === "cadastro") {
    btnCadastro.classList.add("active");
    btnLogin.classList.remove("active");
    formCadastro.classList.add("active");
    formLogin.classList.remove("active");
  } else {
    btnLogin.classList.add("active");
    btnCadastro.classList.remove("active");
    formLogin.classList.add("active");
    formCadastro.classList.remove("active");
  }
}

// Eventos de clique nos botões
btnCadastro.addEventListener("click", () => showTab("cadastro"));
btnLogin.addEventListener("click", () => showTab("login"));

// Após cadastro, redirecionar automaticamente para Login
btnEnviarCadastro.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Cadastro realizado com sucesso!");
  showTab("login");
});

// Máscara dinâmica para Email ou Telefone
function applyContatoMask(e) {
  let value = e.target.value;

  if (/^\d/.test(value)) {
    value = value.replace(/\D/g, "");
    if (value.length > 2 && value.length <= 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
    e.target.value = value;
  } else {
    e.target.value = value.replace(/[^a-zA-Z0-9@._-]/g, "");
  }
}
cadastroInput.addEventListener("input", applyContatoMask);
loginInput.addEventListener("input", applyContatoMask);

// Ao clicar em 'Entrar', salva o contato e redireciona
btnEnviarLogin.addEventListener("click", () => {
  // Salva o contato no localStorage
  const contato = loginInput.value;
  const dadosExistentes = JSON.parse(localStorage.getItem('dadosUsuario')) || {};
  dadosExistentes.contato = contato;
  localStorage.setItem('dadosUsuario', JSON.stringify(dadosExistentes));

  window.location.href = "../formulario/formulario.html";
});