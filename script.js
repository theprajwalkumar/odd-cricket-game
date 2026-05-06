let totalRuns = 0;
let isOut = false;

const totalRunsEl = document.getElementById('totalRuns');
const statusEl = document.getElementById('status');
const bowlerChoiceEl = document.getElementById('bowlerChoice');
const battingOptions = document.querySelectorAll('.bat-btn');
const outMessage = document.getElementById('outMessage');
const finalScoreEl = document.getElementById('finalScore');
const resetBtn = document.getElementById('resetBtn');

function playTurn(batterChoice) {
    if (isOut) return;

    const bowlerChoice = Math.floor(Math.random() * 6) + 1;
    bowlerChoiceEl.textContent = bowlerChoice;

    if (batterChoice === bowlerChoice) {
        isOut = true;
        statusEl.textContent = 'You are out!';
        finalScoreEl.textContent = totalRuns;
        outMessage.style.display = 'block';
        battingOptions.forEach(btn => btn.disabled = true);
    } else {
        totalRuns += batterChoice;
        totalRunsEl.textContent = totalRuns;
        statusEl.textContent = `You scored ${batterChoice} runs!`;
    }
}

battingOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        const run = parseInt(btn.dataset.run);
        playTurn(run);
    });
});

resetBtn.addEventListener('click', () => {
    totalRuns = 0;
    isOut = false;
    totalRunsEl.textContent = '0';
    statusEl.textContent = 'Pick a number (1-6) to bat!';
    bowlerChoiceEl.textContent = '-';
    outMessage.style.display = 'none';
    battingOptions.forEach(btn => btn.disabled = false);
});
