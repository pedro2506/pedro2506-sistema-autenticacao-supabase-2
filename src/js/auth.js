// Debug: Verificar se a página carregou corretamente
console.log('Script auth.js carregado');
console.log('URL atual:', window.location.href);
console.log('Modo de desenvolvimento:', DEV_MODE || false);

// Verificar se o Supabase e config estão disponíveis
if (typeof supabase === 'undefined') {
    console.error('Supabase não está carregado!');
}
if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_KEY === 'undefined') {
    console.error('Config.js não foi carregado corretamente!');
}

// Base de dados simulada para modo desenvolvimento
const mockUsers = {
    'teste@email.com': {
        password: '123456',
        user: {
            id: 'user-123',
            email: 'teste@email.com',
            user_metadata: {
                name: 'Usuário Teste'
            }
        }
    }
};

// Inicialize o cliente Supabase com tratamento de erro
let supabaseClient;
try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Cliente Supabase inicializado com sucesso');
    
    // Teste de conexão
    supabaseClient.auth.getSession()
        .then(({ data, error }) => {
            if (error) {
                console.error('Supabase indisponível (possível: projeto pausado):', error.message);
                if (DEV_MODE) {
                    console.log('✅ Modo de desenvolvimento ativado - usando login simulado');
                }
            } else {
                console.log('✅ Supabase conectado com sucesso');
            }
        })
        .catch(err => {
            console.error('Erro de rede ao testar Supabase:', err.message);
            if (DEV_MODE) {
                console.log('✅ Modo de desenvolvimento ativado - usando login simulado');
            }
        });
} catch (error) {
    console.error('Erro ao inicializar Supabase:', error);
}

// Aguardar o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado completamente');
    
    // Elementos do DOM para login
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    console.log('Login form encontrado:', !!loginForm);
    console.log('Login error element encontrado:', !!loginError);
    
    // Event listener para formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            console.log('Tentando login com:', email);
            
            try {
                // Mostrar loading
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Entrando...';
                submitBtn.disabled = true;

                let loginError_el = document.getElementById('loginError');
                loginError_el.textContent = '';

                // Se estiver em modo desenvolvimento E Supabase não estiver disponível, usar mock
                if (DEV_MODE && mockUsers[email]) {
                    // Login simulado
                    if (mockUsers[email].password === password) {
                        console.log('✅ Login simulado bem-sucedido (modo desenvolvimento)');
                        if (loginError_el) {
                            loginError_el.textContent = '✅ Bem-vindo! Redirecionando... (MODO TESTE)';
                            loginError_el.style.color = '#81c784';
                        }
                        
                        // Armazenar sessão simulada no localStorage
                        localStorage.setItem('devMode_user', JSON.stringify(mockUsers[email].user));
                        
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 1500);
                        return;
                    } else {
                        if (loginError_el) {
                            loginError_el.textContent = '❌ Senha incorreta';
                            loginError_el.style.color = '#ff6b6b';
                        }
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        return;
                    }
                }

                // Tentar login real com Supabase
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    console.error('Erro completo:', JSON.stringify(error, null, 2));
                    console.error('Tipo do erro:', typeof error);
                    console.error('Código do erro:', error.status);
                    console.error('Mensagem do erro:', error.message);
                    
                    let errorMessage = '';
                    
                    // Verificar se é erro de rede (Supabase pausado)
                    if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
                        errorMessage = '⚠️ Servidor pausado. Use email: teste@email.com / senha: 123456 para testar (MODO DESENVOLVIMENTO)';
                    } else if (error.message.includes('Invalid login credentials')) {
                        errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
                    } else if (error.message.includes('Email not confirmed')) {
                        errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.';
                    } else if (error.message.includes('Too many requests')) {
                        errorMessage = 'Muitas tentativas. Tente novamente em alguns minutos.';
                    } else if (error.message.includes('Invalid email')) {
                        errorMessage = 'Email inválido. Verifique o formato do email.';
                    } else {
                        errorMessage = 'Erro no login: ' + error.message;
                    }
                    
                    if (loginError_el) {
                        loginError_el.textContent = errorMessage;
                        loginError_el.style.color = '#ff6b6b';
                    }
                } else {
                    console.log('Login bem-sucedido:', data);
                    if (loginError_el) loginError_el.textContent = '';
                    
                    if (loginError_el) {
                        loginError_el.textContent = 'Bem-vindo! Redirecionando...';
                        loginError_el.style.color = '#81c784';
                    }
                    
                    // Redirecionar para dashboard após login bem-sucedido
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                }
            } catch (error) {
                console.error('Erro no login:', error.message);
                let loginError_el = document.getElementById('loginError');
                if (loginError_el) {
                    loginError_el.textContent = 'Erro no login: ' + error.message;
                    loginError_el.style.color = '#ff6b6b';
                }
            } finally {
                // Restaurar botão
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Elemento de recuperação de senha
    const forgotPasswordLink = document.getElementById('forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', async (e) => {
            e.preventDefault(); 

            const email = prompt(
                "Por favor, digite seu e-mail para redefinir a senha:"
            );

            if (!email) {
                return; 
            }

            try {
                const { error } = await supabaseClient.auth.resetPasswordForEmail(
                    email,
                    {
                        redirectTo: window.location.origin + window.location.pathname.replace('login.html', 'reset-password.html')
                    }
                );

                if (error) {
                    alert("Erro ao enviar o e-mail: " + error.message);
                } else {
                    alert(
                        "E-mail de redefinição de senha enviado! Verifique sua caixa de entrada e spam."
                    );
                }
            } catch (error) {
                console.error('Erro ao resetar senha:', error);
                alert("Erro ao enviar o e-mail: " + error.message);
            }
        });
    }
});
