document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const introSection = document.getElementById('intro');
    const registration = document.getElementById('registration');
    const typingTest = document.getElementById('typingTest');
    const testArea = document.getElementById('testArea');
    const sourceText = document.getElementById('sourceText').textContent.trim();
    const timerDisplay = document.getElementById('timer');
    const wordCountDisplay = document.getElementById('wordCount');
    const accuracyDisplay = document.getElementById('accuracy');
    let timer = 120; // Timer set for 2 minutes (120 seconds)
    let interval;

    startButton.addEventListener('click', function() {
        startTest();
    });

    function startTest() {
        introSection.style.display = 'none';
        registration.style.display = 'none';
        typingTest.style.display = 'block';
        testArea.disabled = false;
        testArea.value = '';
        testArea.focus();
        timer = 120;
        updateDisplay();

        interval = setInterval(function() {
            updateTimer();
        }, 1000);

        testArea.addEventListener('input', updateMetrics);
    }

    function updateDisplay() {
        wordCountDisplay.textContent = 'Words typed: 0';
        accuracyDisplay.textContent = 'Accuracy: 0%';
    }

    function updateTimer() {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerDisplay.textContent = `Time left: ${minutes}:${seconds}`;
        if (timer > 0) {
            timer--;
        } else {
            clearInterval(interval);
            endTest();
        }
    }

    function updateMetrics() {
        const typedText = testArea.value.trim();
        const wordsTyped = typedText.split(/\s+/).filter(Boolean).length;
        const accuracy = calculateAccuracy(sourceText, typedText);
        wordCountDisplay.textContent = `Words typed: ${wordsTyped}`;
        accuracyDisplay.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
    }

    function calculateAccuracy(original, typed) {
        let originalWords = original.split(/\s+/);
        let typedWords = typed.split(/\s+/);
        let correctWords = 0;
        typedWords.forEach((word, index) => {
            if (index < originalWords.length && word === originalWords[index]) correctWords++;
        });
        let accuracy = (correctWords / originalWords.length) * 100;
        return accuracy || 0; // Return 0 if NaN
    }

    function endTest() {
        typingTest.style.display = 'none';
        introSection.style.display = 'block';
        registration.style.display = 'block';
        testArea.disabled = true;
        alert(`Time's up! Your results: ${wordCountDisplay.textContent} with ${accuracyDisplay.textContent}.`);
        clearInterval(interval);
        testArea.removeEventListener('input', updateMetrics);
    }
});
