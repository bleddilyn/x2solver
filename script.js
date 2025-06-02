document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawGraph();
    }
 
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawGraph() {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        drawGrid();

        drawAxes();

        drawFunction();
    }
    
    function drawGrid() {
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.beginPath();
        ctx.strokeStyle = '#2a864c'; 

        const cellSize = Math.min(width, height) / 10;
        
        for (let y = 0; y < height; y += cellSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }

        for (let x = 0; x < width; x += cellSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        
        ctx.stroke();
    }
    
    function drawAxes() {
        const width = canvas.width;
        const height = canvas.height;
        
        const centerX = width / 2;
        const centerY = height / 2;
            
        const unitSize = Math.min(width, height) / 10;
        
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        
      
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        
        
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        
        
        ctx.font = '14px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
       
        for (let i = -4; i <= 4; i++) {
            if (i === 0) continue; 
            
            const x = centerX + i * unitSize;
            
            
            if (x >= 0 && x <= width) {
              
                ctx.moveTo(x, centerY - 5);
                ctx.lineTo(x, centerY + 5);
     
                ctx.fillText(i.toString(), x, centerY + 20);
            }
        }

        for (let i = -4; i <= 4; i++) {
            if (i === 0) continue; 
            
            const y = centerY - i * unitSize;
            
            
            if (y >= 0 && y <= height) {
              
                ctx.moveTo(centerX - 5, y);
                ctx.lineTo(centerX + 5, y);
 
                ctx.fillText(i.toString(), centerX - 20, y);
            }
        }

        ctx.fillText('x', width - 10, centerY - 10);
        ctx.fillText('y', centerX + 10, 10);
        
        ctx.stroke();
    }
    
    function drawFunction() {
        const width = canvas.width;
        const height = canvas.height;
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        const unitSize = Math.min(width, height) / 10;
        
        function f(x) {
            return Math.pow(x, 2) - 1;
        }
        
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        
       
        const step = 0.1; 
        let first = true;
        
        for (let px = -width / 2; px <= width / 2; px += step) {
            
            const x = px / unitSize;
            const y = f(x);
        
            const canvasX = centerX + x * unitSize;
            const canvasY = centerY - y * unitSize;
            
            if (first) {
                ctx.moveTo(canvasX, canvasY);
                first = false;
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        
        ctx.stroke();
    }

    const nameInput = document.querySelector('input[placeholder="Nome"]');
    const surnameInput = document.querySelector('input[placeholder="Sobrenome"]');
    const emailInput = document.querySelector('input[placeholder="Email"]');
    const passwordInput = document.querySelector('input[placeholder="Criar senha"]');
    const registerBtn = document.querySelector('.register-btn');
    const loginLink = document.querySelector('.login-link');
    const googleBtn = document.querySelector('.google-btn');
    const appleBtn = document.querySelector('.apple-btn');
    
 
    function showMessage(message, isError = false) {
      
        let messageElement = document.querySelector('.message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.style.padding = '10px';
            messageElement.style.marginTop = '10px';
            messageElement.style.borderRadius = '4px';
            messageElement.style.textAlign = 'center';
            messageElement.style.fontWeight = '500';
            
          
            const separator = document.querySelector('.separator');
            separator.parentNode.insertBefore(messageElement, separator);
        }
        
        if (isError) {
            messageElement.style.backgroundColor = '#ffebee';
            messageElement.style.color = '#c62828';
            messageElement.style.border = '1px solid #ef9a9a';
        } else {
            messageElement.style.backgroundColor = '#e8f5e9';
            messageElement.style.color = '#2e7d32';
            messageElement.style.border = '1px solid #a5d6a7';
        }
        
        messageElement.textContent = message;
        
        
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    
    function isValidPassword(password) {
        return password.length >= 6;
    }
    
    
    function validateForm() {
        let isValid = true;
        
        
        const inputs = [nameInput, surnameInput, emailInput, passwordInput];
        inputs.forEach(input => {
            input.style.borderColor = '#ccc';
        });
        
        
        if (!nameInput.value.trim()) {
            nameInput.style.borderColor = '#e63946';
            isValid = false;
        }
        
        
        if (!surnameInput.value.trim()) {
            surnameInput.style.borderColor = '#e63946';
            isValid = false;
        }
        
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            emailInput.style.borderColor = '#e63946';
            isValid = false;
        }
        
        
        if (!passwordInput.value.trim() || !isValidPassword(passwordInput.value)) {
            passwordInput.style.borderColor = '#e63946';
            isValid = false;
        }
        
        return isValid;
    }
    
    
    function registerUser() {
        if (!validateForm()) {
            showMessage('Por favor, preencha todos os campos corretamente. A senha deve ter pelo menos 6 caracteres.', true);
            return;
        }
        
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(user => user.email === emailInput.value);
        
        if (existingUser) {
            showMessage('Este email já está cadastrado. Tente fazer login.', true);
            return;
        }
        
        const newUser = {
            id: Date.now(),
            name: nameInput.value,
            surname: surnameInput.value,
            email: emailInput.value,
            password: passwordInput.value 
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        nameInput.value = '';
        surnameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        showMessage('Conta criada com sucesso! Você já pode fazer login.');
    }

    function simulateLogin(email, method = 'form') {
        let message;
        
        if (method === 'form') {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(user => user.email === email);
            
            if (user) {
                message = `Bem-vindo de volta, ${user.name}!`;
            } else {
                message = 'Usuário não encontrado.';
            }
        } else if (method === 'google') {
            message = 'Login realizado com sucesso via Google!';
        } else if (method === 'apple') {
            message = 'Login realizado com sucesso via Apple!';
        }
        
        showMessage(message);
    }

    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerUser();
    });

    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Digite seu email:');
        const password = prompt('Digite sua senha:');
        
        if (email && password) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                simulateLogin(email);
            } else {
                showMessage('Email ou senha incorretos.', true);
            }
        }
    });
    
    googleBtn.addEventListener('click', function() {
        const email = prompt('Digite seu email para login com Google:');
        if (email) {
            simulateLogin(email, 'google');
        }
    });
    
    appleBtn.addEventListener('click', function() {
        const email = prompt('Digite seu email para login com Apple:');
        if (email) {
            simulateLogin(email, 'apple');
        }
    });
    
    document.querySelectorAll('.input-field').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                registerUser();
            }
        });
    });
});