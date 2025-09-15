
// Simple client-side "backend" using localStorage
const STORAGE_KEYS = {
  USERS: "hd_users",
  LOGGED: "hd_logged_user",
  PACIENTES: "hd_pacientes",
  CONSULTAS: "hd_consultas",
  FUNCIONARIOS: "hd_funcionarios"
};

function read(key){ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : []; }
function write(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

// Auth
function registerUser(name, email, password){
  const users = read(STORAGE_KEYS.USERS);
  if(users.find(u=>u.email===email)) return {ok:false, msg:"Email já cadastrado"};
  users.push({id:Date.now(), name, email, password});
  write(STORAGE_KEYS.USERS, users);
  return {ok:true};
}
function loginUser(email, password){
  const users = read(STORAGE_KEYS.USERS);
  const u = users.find(x=>x.email===email && x.password===password);
  if(!u) return {ok:false, msg:"Credenciais inválidas"};
  localStorage.setItem(STORAGE_KEYS.LOGGED, JSON.stringify(u));
  return {ok:true, user:u};
}
function logout(){
  localStorage.removeItem(STORAGE_KEYS.LOGGED);
  window.location = "index.html";
}
function requireAuth(redirectIfMissing=true){
  const raw = localStorage.getItem(STORAGE_KEYS.LOGGED);
  if(!raw){
    if(redirectIfMissing) window.location="index.html";
    return null;
  }
  return JSON.parse(raw);
}

// Init sample data if empty
function ensureSampleData(){
  if(read(STORAGE_KEYS.PACIENTES).length===0){
    write(STORAGE_KEYS.PACIENTES, [
      {id:1,nome:"João da Silva", nascimento:"1980-03-02", cpf:"111.111.111-11"},
      {id:2,nome:"Maria Santos", nascimento:"1990-07-12", cpf:"222.222.222-22"}
    ]);
  }
  if(read(STORAGE_KEYS.CONSULTAS).length===0){
    write(STORAGE_KEYS.CONSULTAS, [
      {id:1,pacienteId:1,data:"2024-04-12",hora:"10:00",medico:"Dr. Carlos Souza"},
      {id:2,pacienteId:2,data:"2024-04-13",hora:"11:00",medico:"Dr. Ana Oliveira"}
    ]);
  }
  if(read(STORAGE_KEYS.FUNCIONARIOS).length===0){
    write(STORAGE_KEYS.FUNCIONARIOS, [
      {id:1,nome:"Dr. Carlos Souza", cargo:"Médico"},
      {id:2,nome:"Ana Pereira", cargo:"Enfermeira"}
    ]);
  }
}

// Utility for element by id
function $id(id){ return document.getElementById(id); }

// Simple render functions used across pages
function countPacientes(){ return read(STORAGE_KEYS.PACIENTES).length; }
function countConsultas(){ return read(STORAGE_KEYS.CONSULTAS).length; }
function countFuncionarios(){ return read(STORAGE_KEYS.FUNCIONARIOS).length; }

// For dashboards
function formatDate(d){ return d; }

// Expose read/write with keys used in pages
function read(key){ return JSON.parse(localStorage.getItem(key) || '[]'); }
function write(key,val){ localStorage.setItem(key, JSON.stringify(val)); }
