// Debug: Verificar se a página carregou corretamente
console.log('Script auth.js carregado');
console.log('URL atual:', window.location.href);

// Verificar se o Supabase e config estão disponíveis
if (typeof supabase === 'undefined') {
    console.error('Supabase não está carregado!');
}
if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_KEY === 'undefined') {
    console.error('Config.js não foi carregado corretamente!');
}

// Inicialize o cliente Supabase
let supabaseClient;
try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Cliente Supabase inicializado com sucesso');
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

                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) {
                    console.error('Erro no login:', error);
                    console.log('Tipo do erro:', typeof error);
                    console.log('Código do erro:', error.status);
                    console.log('Mensagem do erro:', error.message);
                    
                    let errorMessage = 'Erro no login: ';
                    
                    // Mensagens de erro mais específicas
                    if (error.message.includes('Invalid login credentials')) {
                        errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
                    } else if (error.message.includes('Email not confirmed')) {
                        errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.';
                    } else if (error.message.includes('Too many requests')) {
                        errorMessage = 'Muitas tentativas. Tente novamente em alguns minutos.';
                    } else if (error.message.includes('Invalid email')) {
                        errorMessage = 'Email inválido. Verifique o formato do email.';
                    } else {
                        errorMessage += error.message;
                    }
                    
                    if (loginError) {
                        loginError.textContent = errorMessage;
                        loginError.style.color = '#ff6b6b';
                    }
                } else {
                    console.log('Login bem-sucedido:', data);
                    if (loginError) loginError.textContent = '';
                    
                    if (loginError) {
                        loginError.textContent = 'Bem-vindo! Redirecionando...';
                        loginError.style.color = '#81c784';
                    }
                    
                    // Redirecionar para dashboard após login bem-sucedido
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                }
            } catch (error) {
                console.error('Erro no login:', error.message);
                if (loginError) {
                    loginError.textContent = 'Erro no login: ' + error.message;
                    loginError.style.color = '#ff6b6b';
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
