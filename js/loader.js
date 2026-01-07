// Ler o parâmetro ?vinho=...
const params = new URLSearchParams(window.location.search);
const vinho = params.get("vinho");

const container = document.getElementById("conteudo-produto");

// Função para carregar qualquer HTML
function carregarArquivo(caminho) {
  fetch(caminho)
    .then(res => {
      if (!res.ok) {
        throw new Error("Arquivo não encontrado");
      }
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;

     // 👉 Reexecuta scripts internos (accordion, scroll-animations, etc)
      executarScriptsDoConteudo();
    })
    .catch(err => {
      console.error("Erro ao carregar:", err);

      fetch("partials/todos.html")
        .then(res => res.text())
        .then(html => {
          container.innerHTML = html;
          executarScriptsDoConteudo();
        });
    });
}

// Se não informar ?vinho=..., já carrega o fallback
if (!vinho) {
  carregarArquivo("partials/todos.html");
} else {
  // Monta caminho do HTML principal
  carregarArquivo(`partials/${vinho}.html`);
}


function executarScriptsDoConteudo() {
  // Localiza <script src="..."> dentro do HTML carregado
  const scripts = container.querySelectorAll("script[src]");

  scripts.forEach(oldScript => {
    const newScript = document.createElement("script");
    newScript.src = oldScript.src;
    document.body.appendChild(newScript);
  });

  // Localiza scripts inline <script> ... </script>
  const inlineScripts = container.querySelectorAll("script:not([src])");

  inlineScripts.forEach(oldScript => {
    const newScript = document.createElement("script");
    newScript.textContent = oldScript.textContent;
    document.body.appendChild(newScript);
  });
}
