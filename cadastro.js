document.addEventListener('DOMContentLoaded', function () {
    function showMessage(message) {
        console.log(message);
        alert(message);
    }

    const page = window.location.pathname;

    function getUsers() {
        return JSON.parse(localStorage.getItem('usuarios') || '[]');
    }

    function saveUsers(users) {
        localStorage.setItem('usuarios', JSON.stringify(users));
    }

    if (page.includes('index.html')) {
        const nome = document.getElementById('nome');
        const sobrenome = document.getElementById('sobrenome');
        const email = document.getElementById('email');
        const senha = document.getElementById('senha');
        const btn = document.getElementById('cadastrar');

        btn.addEventListener('click', () => {
            if (!nome.value || !sobrenome.value || !email.value || !senha.value) {
                showMessage('Preencha todos os campos.');
                return;
            }

            const users = getUsers();
            if (users.find(u => u.email === email.value)) {
                showMessage('Email já cadastrado.');
                return;
            }

            users.push({
                nome: nome.value,
                sobrenome: sobrenome.value,
                email: email.value,
                senha: senha.value
            });

            saveUsers(users);
            showMessage('Cadastro realizado com sucesso!');
            window.location.href = 'login.html';
        });
    }

    if (page.includes('login.html')) {
        const email = document.getElementById('email');
        const senha = document.getElementById('senha');
        const btn = document.getElementById('entrar');

        btn.addEventListener('click', () => {
            const users = getUsers();
            const user = users.find(u => u.email === email.value && u.senha === senha.value);

            if (user) {
                showMessage(`Bem-vindo, ${user.nome}!`);
                localStorage.setItem('usuarioLogado', JSON.stringify(user)); 
                window.location.href = 'home.html';
            } else {
                showMessage('Email ou senha incorretos.');
            }
        });
    }

    if (page.includes('home.html')) {
        const user = JSON.parse(localStorage.getItem('usuarioLogado'));
        
        if (!user) {
            showMessage('Você precisa estar logado!');
            window.location.href = 'login.html'; 
        } else {
            showMessage(`Bem-vindo de volta, ${user.nome}!`);

           
            const logoutButton = document.createElement('button');
            logoutButton.textContent = 'Deslogar';
            document.body.appendChild(logoutButton);

            
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('usuarioLogado'); 
                showMessage('Você foi deslogado com sucesso!');
                window.location.href = 'index.html'; 
            });
        }
    }
});
