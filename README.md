# ConectFit 💪

> **Conectando você ao seu melhor desempenho fitness!**

Uma aplicação fullstack completa para fitness que combina um app móvel desenvolvido com React Native/Expo e uma API robusta em Node.js, oferecendo uma experiência completa para acompanhamento de treinos, comunidade fitness e gestão de objetivos pessoais.

## 📱 Sobre o Projeto

ConectFit é uma plataforma completa de fitness que inclui:
- **📱 App Mobile** (React Native/Expo) - Interface intuitiva para usuários
- **🚀 API REST** (Node.js/Express) - Backend robusto com autenticação e dados
- **💾 Banco de Dados** - Armazenamento seguro de informações
- **👥 Sistema Social** - Comunidade integrada para motivação

## 🏗️ Arquitetura do Sistema

```
ConectFit/
├── 📱 Frontend (Mobile App)
│   ├── React Native + Expo
│   ├── TypeScript
│   └── Expo Router
│
├── 🚀 Backend (API)
│   ├── Node.js + Express
│   ├── JWT Authentication
│   ├── Database Integration
│   └── RESTful Endpoints
│
└── 💾 Database
    ├── User Management
    ├── Workout Data
    └── Social Features
```

## 🚀 Tecnologias Utilizadas

### Frontend (Mobile)
- **React Native** - Framework mobile multiplataforma
- **Expo** - Plataforma de desenvolvimento universal
- **TypeScript** - Tipagem estática
- **Expo Router** - Navegação baseada em arquivos
- **Axios** - Cliente HTTP para API
- **AsyncStorage** - Armazenamento local

### Backend (API)
- **Node.js** - Runtime JavaScript server-side
- **Express.js** - Framework web minimalista
- **JWT** - Autenticação via tokens
- **bcrypt** - Criptografia de senhas
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

### Database & Tools
- **MySQL/PostgreSQL** - Banco de dados relacional
- **Prisma/Sequelize** - ORM para Node.js
- **Nodemon** - Auto-reload durante desenvolvimento

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js (versão 16+)
- npm ou yarn
- Expo CLI
- Banco de dados (MySQL/PostgreSQL)
- Android Studio ou Xcode (para emuladores)

### 1. Clone o Repositório
```bash
git clone https://github.com/KledsonV/ConectFit.git
cd ConectFit
```

### 2. Configuração do Backend

```bash
# Navegue para o diretório do backend (se separado)
cd backend  # ou mantenha na raiz se o backend estiver na raiz

# Instale as dependências do backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

**Exemplo de .env para o Backend:**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=conectfit_db
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
JWT_SECRET=sua_chave_jwt_super_secreta
NODE_ENV=development
```

### 3. Configuração do Database
```bash
# Execute as migrations (se usando Prisma)
npx prisma migrate dev

# Ou execute o script SQL fornecido
# mysql -u usuario -p conectfit_db < database/schema.sql
```

### 4. Inicie o Backend
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Ou produção
npm start
```

O backend estará rodando em `http://localhost:3000`

### 5. Configuração do Frontend (Mobile)

```bash
# Se o frontend estiver em pasta separada
cd frontend  # ou volte para a raiz

# Instale as dependências do mobile
npm install

# Configure a URL da API
# Edite o arquivo de configuração da API (ex: src/config/api.js)
```

### 6. Inicie o App Mobile
```bash
# Inicie o servidor Expo
npx expo start

# Opções de execução:
# - Pressione 'a' para Android emulator
# - Pressione 'i' para iOS simulator  
# - Escaneie o QR code com Expo Go no seu dispositivo
```

## 📂 Estrutura do Projeto

### Frontend (Mobile App)
```
app/                     # Screens principais (Expo Router)
├── (tabs)/             # Navegação por tabs
├── auth/               # Telas de autenticação
├── profile/            # Perfil do usuário
├── workout/            # Telas de treino
└── _layout.tsx         # Layout raiz

components/             # Componentes reutilizáveis
├── ui/                # Componentes de interface
├── forms/             # Formulários
└── charts/            # Gráficos

services/              # Integração com API
├── api.js            # Cliente HTTP
├── auth.js           # Serviços de autenticação
└── workout.js        # Serviços de treino

utils/                # Funções utilitárias
constants/            # Constantes da aplicação
types/                # Definições TypeScript
```

### Backend (API)
```
src/                   # Código fonte do backend
├── controllers/       # Controladores das rotas
├── models/           # Modelos do banco de dados
├── routes/           # Definição das rotas
├── middleware/       # Middlewares (auth, validation, etc)
├── services/         # Lógica de negócio
├── utils/            # Funções utilitárias
└── config/           # Configurações (DB, JWT, etc)

database/             # Scripts e migrations
├── migrations/       # Migrations do banco
├── seeds/           # Dados iniciais
└── schema.sql       # Schema SQL
```

## 🔧 Scripts Disponíveis

### Backend
```bash
npm start          # Inicia o servidor em produção
npm run dev        # Inicia com nodemon (desenvolvimento)
npm test           # Executa os testes
npm run migrate    # Executa migrations do banco
npm run seed       # Popula o banco com dados iniciais
```

### Frontend (Mobile)
```bash
npx expo start     # Inicia o servidor de desenvolvimento
npm run android    # Executa no emulador Android
npm run ios        # Executa no simulador iOS
npm run web        # Executa no navegador
npm test           # Executa os testes
```

## 🛡️ API Endpoints

### Autenticação
```
POST /api/auth/register    # Registro de usuário
POST /api/auth/login       # Login
POST /api/auth/refresh     # Refresh token
GET  /api/auth/profile     # Perfil do usuário logado
```

### Usuários
```
GET    /api/users          # Lista usuários
GET    /api/users/:id      # Busca usuário específico
PUT    /api/users/:id      # Atualiza usuário
DELETE /api/users/:id      # Remove usuário
```

### Treinos
```
GET    /api/workouts       # Lista treinos do usuário
POST   /api/workouts       # Cria novo treino
PUT    /api/workouts/:id   # Atualiza treino
DELETE /api/workouts/:id   # Remove treino
```

### Exercícios
```
GET    /api/exercises      # Lista exercícios disponíveis
POST   /api/exercises      # Cria novo exercício
GET    /api/exercises/:id  # Busca exercício específico
```

## ✨ Funcionalidades

### 🏋️ Gestão de Treinos
- ✅ Biblioteca completa de exercícios
- ✅ Criação de treinos personalizados
- ✅ Timer integrado para descanso
- ✅ Registro de séries, repetições e carga
- ✅ Histórico detalhado de performance

### 📊 Analytics & Progresso
- ✅ Dashboard com métricas pessoais
- ✅ Gráficos de evolução
- ✅ Estatísticas de desempenho
- ✅ Acompanhamento de medidas corporais
- ✅ Relatórios de consistência

### 👥 Rede Social Fitness
- ✅ Perfis personalizados
- ✅ Feed de atividades
- ✅ Sistema de seguir/seguidores
- ✅ Compartilhamento de conquistas
- ✅ Desafios entre amigos

### 🎯 Metas & Gamificação
- ✅ Definição de objetivos
- ✅ Sistema de conquistas
- ✅ Notificações motivacionais
- ✅ Streaks de consistência
- ✅ Ranking da comunidade

## 🔒 Segurança

- **JWT Authentication** - Tokens seguros para autenticação
- **Bcrypt** - Hash seguro de senhas
- **CORS** - Controle de origem de requisições  
- **Rate Limiting** - Proteção contra spam
- **Input Validation** - Validação de dados de entrada
- **SQL Injection Protection** - Queries parametrizadas

## 🧪 Testes

```bash
# Backend
cd backend
npm test                 # Testes unitários
npm run test:integration # Testes de integração
npm run test:coverage    # Coverage dos testes

# Frontend
cd frontend  
npm test                 # Testes do React Native
npm run test:e2e        # Testes end-to-end
```

## 🚀 Deploy

### Backend (API)
```bash
# Build para produção
npm run build

# Deploy em serviços como:
# - Heroku: git push heroku main
# - Railway: railway deploy
# - DigitalOcean App Platform
```

### Frontend (Mobile)
```bash
# Build para stores
eas build --platform all

# Preview build
eas build --platform android --profile preview

# Submeter para as lojas
eas submit --platform all
```

## 📱 Screenshots

| Login | Dashboard | Treinos | Comunidade |
|-------|-----------|---------|------------|
| <img src="assets/screenshots/login.png" width="200"> | <img src="assets/screenshots/dashboard.png" width="200"> | <img src="assets/screenshots/workout.png" width="200"> | <img src="assets/screenshots/social.png" width="200"> |

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📋 Roadmap

### v2.0 - IA & Machine Learning
- [ ] Sugestões inteligentes de treinos
- [ ] Análise de performance com IA
- [ ] Predição de lesões

### v2.1 - Integração Wearables
- [ ] Apple Health & Google Fit
- [ ] Smartwatches (Apple Watch, Galaxy Watch)
- [ ] Monitores cardíacos

### v2.2 - Nutrição
- [ ] Contador de calorias
- [ ] Planejamento de refeições
- [ ] Integração com apps de nutrição

### v2.3 - Personal Trainers
- [ ] Marketplace de profissionais
- [ ] Consultas online
- [ ] Planos personalizados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Kledson Vinícius**

- 🌐 GitHub: [@KledsonV](https://github.com/KledsonV)
- 💼 LinkedIn: [Kledson Vinícius](https://www.linkedin.com/in/kledson-vinicius-009b66228/)

## 🆘 Suporte

- 🐛 [Reportar Bug](https://github.com/KledsonV/ConectFit/issues)
- 💡 [Sugerir Feature](https://github.com/KledsonV/ConectFit/discussions)
- 📖 [Documentação da API](https://api.conectfit.com/docs)

---

⭐ **Se o ConectFit está te ajudando na jornada fitness, deixe uma estrela!**

*Desenvolvido com 💚 para conectar pessoas aos seus objetivos de saúde e bem-estar*
