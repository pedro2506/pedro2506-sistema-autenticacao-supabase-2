# 🔐 Sistema de Autenticação com Supabase

Um sistema moderno de autenticação web construído com HTML, CSS, JavaScript e Supabase, oferecendo uma experiência de usuário elegante e responsiva.

## ✨ Características

- 🎨 **Design Moderno**: Interface elegante com gradientes e efeitos glassmorphism
- 📱 **Totalmente Responsivo**: Adaptado para desktop, tablet e mobile
- 🔐 **Autenticação Completa**: Login, cadastro e logout
- 🎯 **Animações Suaves**: Transições e efeitos visuais interativos
- ⚡ **Performance Otimizada**: Carregamento rápido e experiência fluida
- 🛡️ **Seguro**: Integração com Supabase para autenticação segura

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (BaaS)
- **Autenticação**: Supabase Auth
- **Design**: CSS Grid, Flexbox, Animações CSS
- **Responsividade**: Media Queries

## 📁 Estrutura do Projeto

```
projeto01/
├── index.html                 # Página principal (redirecionamento)
├── src/
│   ├── pages/
│   │   ├── login.html         # Página de login
│   │   ├── register.html      # Página de cadastro
│   │   └── dashboard.html     # Dashboard (futuro)
│   ├── styles/
│   │   └── main.css          # Estilos principais
│   └── js/
│       └── auth.js           # Lógica de autenticação
├── test-*.html               # Arquivos de teste
└── README.md                 # Documentação
```

## 🎨 Design Features

### Visual
- Gradiente de fundo animado
- Efeito glassmorphism nos containers
- Bordas arredondadas e sombras suaves
- Paleta de cores moderna (roxo/azul)

### Interações
- Animações de hover nos botões
- Efeitos de foco nos inputs
- Transições suaves
- Feedback visual para erros e sucessos

### Responsividade
- Breakpoints para mobile (480px), tablet (768px) e desktop
- Layout adaptativo
- Tipografia escalável

## 🛠️ Configuração

### Pré-requisitos
- Navegador web moderno
- Conta no Supabase (gratuita)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/projeto01.git
   cd projeto01
   ```

2. **Configure o Supabase**
   - Crie uma conta em [supabase.com](https://supabase.com)
   - Crie um novo projeto
   - Copie a URL e chave anônima do seu projeto

3. **Atualize as credenciais**
   - Edite `src/js/auth.js`
   - Substitua `supabaseUrl` e `supabaseKey` pelas suas credenciais

4. **Execute o projeto**
   - Abra `index.html` no navegador
   - Ou use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js
   npx serve .
   ```

## 📱 Como Usar

1. **Acesse a aplicação**
   - Abra `index.html` no navegador
   - Será redirecionado automaticamente para a página de login

2. **Cadastro**
   - Clique em "Cadastre-se"
   - Preencha nome, email e senha
   - Confirme o email recebido

3. **Login**
   - Digite email e senha
   - Clique em "Entrar"

4. **Logout**
   - Clique em "Sair" para desconectar

## 🎯 Funcionalidades

### Autenticação
- ✅ Cadastro de usuários
- ✅ Login com email/senha
- ✅ Logout
- ✅ Validação de formulários
- ✅ Mensagens de erro/sucesso

### Interface
- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Feedback visual
- ✅ Estados de loading

## 🔧 Personalização

### Cores
Edite as variáveis CSS em `src/styles/main.css`:
```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cores dos botões */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Animações
Ajuste as durações em `src/styles/main.css`:
```css
transition: all 0.3s ease; /* Duração padrão */
```

## 🐛 Solução de Problemas

### Página preta/cinza
- Verifique se o Supabase está carregado (console F12)
- Confirme as credenciais no `auth.js`
- Teste a conexão com internet

### Erros de autenticação
- Verifique se o email foi confirmado
- Confirme se as credenciais estão corretas
- Verifique os logs no console do navegador

## 📈 Próximos Passos

- [ ] Dashboard do usuário
- [ ] Perfil do usuário
- [ ] Recuperação de senha
- [ ] Autenticação social (Google, GitHub)
- [ ] PWA (Progressive Web App)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

<div align="center">
  <img src="https://github.com/SEU-USERNAME.png" width="150px" style="border-radius: 50%;" alt="Pedro"/>
  <br><br>
  
  **Desenvolvido por [Pedro](https://github.com/SEU-USERNAME)**<br>
   [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pedro2506)<br>
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pedro-miranda-510471b4/)<br>
📧 Email: t3pedropaulo@gmail.com<br>
💬 Projeto criado com fins educacionais e para portfólio.<br>
📅 Criado em **Novembro de 2025**  

---
---

⭐ Se este projeto foi útil, considere dar uma estrela no repositório!
