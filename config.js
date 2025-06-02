function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imgData = e.target.result;

            // Atualiza a imagem visível
            const largeImg = document.getElementById('profile-image-large');
            if (largeImg) largeImg.src = imgData;

            const smallImg = document.getElementById('profile-image-small');
            if (smallImg) smallImg.src = imgData;

            // Salva a imagem no localStorage
            localStorage.setItem('profileImage', imgData);

            // Atualiza outras imagens com a classe "profile-image"
            const allProfileImages = document.querySelectorAll('.profile-image');
            allProfileImages.forEach(img => img.src = imgData);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function loadProfileImage() {
    const imgData = localStorage.getItem('profileImage');
    if (imgData) {
        const largeImg = document.getElementById('profile-image-large');
        if (largeImg) largeImg.src = imgData;

        const smallImg = document.getElementById('profile-image-small');
        if (smallImg) smallImg.src = imgData;

        const allProfileImages = document.querySelectorAll('.profile-image');
        allProfileImages.forEach(img => img.src = imgData);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadProfileImage();
});

// Aqui adicionamos o trecho que você pediu para mostrar o nome do usuário logado
document.addEventListener('DOMContentLoaded', function() {
    const userGreeting = document.getElementById('user-greeting');
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (usuarioLogado && userGreeting) {
        userGreeting.textContent = `Olá, ${usuarioLogado.nome}!`;
    }
});

document.getElementById('new-password').addEventListener('input', function() {
    const password = this.value;
    let strength = 0;

    if (password.length > 6) strength += 20;
    if (password.length > 10) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;

    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');

    strengthFill.style.width = strength + '%';

    if (strength < 40) {
        strengthFill.style.backgroundColor = "#f00";
        strengthText.textContent = "Fraca";
    } else if (strength < 80) {
        strengthFill.style.backgroundColor = "#ff0";
        strengthText.textContent = "Média";
    } else {
        strengthFill.style.backgroundColor = "#0f0";
        strengthText.textContent = "Forte";
    }
});
function saveSettings() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validação básica
    if (!firstName || !lastName || !email) {
        showNotification("Preencha todos os campos obrigatórios.", "error");
        return;
    }

    if (newPassword && newPassword !== confirmPassword) {
        showNotification("As senhas não coincidem.", "error");
        return;
    }

    // Atualiza o usuário logado no localStorage
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')) || {};

    // Atualiza os dados do usuário no objeto
    usuarioLogado.nome = firstName;
    usuarioLogado.sobrenome = lastName;
    usuarioLogado.email = email;

    // Se quiser salvar senha, faça aqui, mas cuidado com segurança!

    // Salva no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

    // Atualiza o nome exibido na página
    const nameDisplay = document.getElementById('user-name-display');
    if (nameDisplay) {
        nameDisplay.textContent = firstName + " " + lastName;
    }

    // Feedback para usuário
    showNotification("Configurações salvas com sucesso!", "success");

    // Limpa campos de senha e reset força da senha
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('strength-fill').style.width = '0%';
    document.getElementById('strength-text').textContent = "Força da senha";
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    notificationMessage.textContent = message;
    notification.className = 'notification ' + type;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 3000);
}

window.onload = function() {
    if (window.location.hash === '#calculation') {
        showScreen('calculation-screen');
    } else if (window.location.hash === '#settings') {
        showScreen('settings-screen');
    }
};
