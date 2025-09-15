
Nexus Hospital - Frontend (static)
=================================

Conteúdo:
- index.html (login)
- dashboard.html
- pacientes.html
- consultas.html
- funcionarios.html
- style.css
- app.js
- assets/logo.svg

Como funciona:
- Projeto é frontend puro. Usa localStorage para simular usuários, pacientes, consultas e funcionários.
- Crie uma conta (registro) em index.html e faça login. Após login, você será redirecionado ao dashboard.
- Os dados são armazenados localmente no navegador.

Deploy rápido (Vercel ou Netlify):
1) Descompacte o .zip
2) Faça login no Vercel ou Netlify
3) Crie um novo projeto/site apontando para a pasta com os arquivos (ou arraste a pasta)
4) O site será publicado imediatamente (é estático, sem build necessário).

Observações:
- Para resetar os dados, abra o console do navegador e execute:
  localStorage.clear();
