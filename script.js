
function register() {
    var playerId = document.getElementById('playerId').value.trim();
    if (playerId.length < 8) {
        alert("ID должен содержать минимум 8 символов!");
    } else {
        document.getElementById('register').classList.add('hidden');
        document.getElementById('game').classList.remove('hidden');
    }
}

let phrases = [
    "Анализируем шансы...",
    "Расчёт траектории удара...",
    "Поиск оптимальной точки попадания..."
];

function getPrediction() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('loadingText').classList.remove('hidden');
    document.querySelectorAll('.target').forEach(t => t.classList.remove('glow'));
    document.getElementById('predictButton').disabled = true;

    let phraseIndex = 0;
    let phraseInterval = setInterval(() => {
        document.getElementById('loadingText').innerText = phrases[phraseIndex];
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 1500);

    setTimeout(() => {
        clearInterval(phraseInterval);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('loadingText').classList.add('hidden');
        const targets = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-right'];
        const randomTarget = targets[Math.floor(Math.random() * targets.length)];
        document.getElementById(randomTarget).classList.add('glow');
        document.getElementById('predictButton').disabled = false;
    }, 5000);
}



// Подтверждение ставки
document.getElementById('confirm_bet').addEventListener('click', function() {
    const betInput = document.getElementById('bet_amount');
    const betValue = betInput.value.trim();
    if (betValue === '') {
        alert('Введите сумму ставки перед подтверждением!');
    } else {
        betInput.disabled = true;
        this.innerText = '✅';
        alert('Ставка подтверждена: ' + betValue);
    }
});



// Состояние подтверждения ставки
let isBetConfirmed = false;

// Обработка нажатия на галочку
document.getElementById('confirm_bet').addEventListener('click', function() {
    const betInput = document.getElementById('bet_amount');
    const betValue = betInput.value.trim();
    if (betValue === '' || parseFloat(betValue) <= 0) {
        alert('Введите корректную сумму ставки перед подтверждением!');
    } else {
        betInput.disabled = true;
        this.innerText = '✅';
        isBetConfirmed = true;
        alert('Ставка подтверждена: ' + betValue);
    }
});

// Блокируем получение прогноза без подтвержденной ставки
const getPredictionButton = document.querySelector('button'); // Предполагаем, что кнопка "Получить прогноз" - это первая кнопка

if (getPredictionButton) {
    getPredictionButton.addEventListener('click', function(event) {
        if (!isBetConfirmed) {
            event.preventDefault();
            alert('Пожалуйста, введите и подтвердите сумму ставки перед получением прогноза!');
        }
    });
}
