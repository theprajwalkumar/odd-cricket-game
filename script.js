const teams = [
    { name: 'CSK', fullName: 'Chennai Super Kings', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/120px-Chennai_Super_Kings_Logo.svg.png' },
    { name: 'MI', fullName: 'Mumbai Indians', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Mumbai_Indians_Logo.svg/120px-Mumbai_Indians_Logo.svg.png' },
    { name: 'RCB', fullName: 'Royal Challengers Bangalore', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Royal_Challengers_Bangalore_Logo.svg/120px-Royal_Challengers_Bangalore_Logo.svg.png' },
    { name: 'KKR', fullName: 'Kolkata Knight Riders', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Kolkata_Knight_Riders_Logo.svg/120px-Kolkata_Knight_Riders_Logo.svg.png' },
    { name: 'DC', fullName: 'Delhi Capitals', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Delhi_Capitals_Logo.svg/120px-Delhi_Capitals_Logo.svg.png' },
    { name: 'RR', fullName: 'Rajasthan Royals', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Rajasthan_Royals_Logo.svg/120px-Rajasthan_Royals_Logo.svg.png' },
    { name: 'SRH', fullName: 'Sunrisers Hyderabad', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Sunrisers_Hyderabad_Logo.svg/120px-Sunrisers_Hyderabad_Logo.svg.png' },
    { name: 'PBKS', fullName: 'Punjab Kings', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Punjab_Kings_Logo.svg/120px-Punjab_Kings_Logo.svg.png' },
    { name: 'LSG', fullName: 'Lucknow Super Giants', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Lucknow_Super_Giants_Logo.svg/120px-Lucknow_Super_Giants_Logo.svg.png' },
    { name: 'GT', fullName: 'Gujarat Titans', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Gujarat_Titans_Logo.svg/120px-Gujarat_Titans_Logo.svg.png' }
];

let totalRuns = 0;
let opponentRuns = 0;
let isOut = false;
let playerTeam = null;
let opponentTeam = null;
let isBatting = true;
let target = 0;
let gameOver = false;
let isFirstInnings = true;

const teamSelection = document.getElementById('teamSelection');
const gameArea = document.getElementById('gameArea');
const teamsGrid = document.getElementById('teamsGrid');
const playerTeamLogo = document.getElementById('playerTeamLogo');
const playerTeamName = document.getElementById('playerTeamName');
const opponentTeamLogo = document.getElementById('opponentTeamLogo');
const opponentTeamName = document.getElementById('opponentTeamName');
const totalRunsEl = document.getElementById('totalRuns');
const runsLabel = document.getElementById('runsLabel');
const statusEl = document.getElementById('status');
const batBall = document.getElementById('batBall');
const battingOptions = document.querySelectorAll('.bat-btn');
const outMessage = document.getElementById('outMessage');
const finalScoreEl = document.getElementById('finalScore');
const resetBtn = document.getElementById('resetBtn');


function initTeamSelection() {
    teamsGrid.innerHTML = '';
    teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `<img src="${team.logo}" alt="${team.name}"><span>${team.name}</span>`;
        card.addEventListener('click', () => selectTeam(team));
        teamsGrid.appendChild(card);
    });
}

function selectTeam(team) {
    playerTeam = team;
    let availableTeams = teams.filter(t => t.name !== team.name);
    opponentTeam = availableTeams[Math.floor(Math.random() * availableTeams.length)];

    playerTeamLogo.src = playerTeam.logo;
    playerTeamName.textContent = playerTeam.fullName;
    opponentTeamLogo.src = opponentTeam.logo;
    opponentTeamName.textContent = opponentTeam.fullName;

    teamSelection.style.display = 'none';
    gameArea.style.display = 'block';

    isBatting = Math.random() < 0.5;
    isFirstInnings = true;
    gameOver = false;
    totalRuns = 0;
    opponentRuns = 0;
    target = 0;
    isOut = false;

    totalRunsEl.textContent = '0';
    outMessage.style.display = 'none';
    battingOptions.forEach(btn => btn.disabled = false);

    if (isBatting) {
        statusEl.textContent = 'You won the toss! You are batting first.';
        runsLabel.textContent = 'Your Score';
        batBall.classList.add('active');
        batBall.classList.remove('bowling');
    } else {
        statusEl.textContent = 'You lost the toss! You are bowling first.';
        runsLabel.textContent = 'Opponent Score';
        batBall.classList.add('active', 'bowling');
    }
}

function playTurn(playerChoice) {
    if (gameOver) return;

    const opponentChoice = Math.floor(Math.random() * 6) + 1;

    if (isBatting) {
        if (playerChoice === opponentChoice) {
            isOut = true;
            if (isFirstInnings) {
                target = totalRuns;
                statusEl.textContent = `OUT! All out for ${totalRuns} runs! Now bowl. Target: ${target + 1}`;
                isFirstInnings = false;
                isBatting = false;
                isOut = false;
                opponentRuns = 0;
                totalRunsEl.textContent = '0';
                runsLabel.textContent = 'Opponent Score';
                batBall.classList.add('bowling');
            } else {
                gameOver = true;
                if (totalRuns > target) {
                    statusEl.textContent = `You Win! ${playerTeam.fullName}: ${totalRuns} vs ${opponentTeam.fullName}: ${target}`;
                } else {
                    statusEl.textContent = `You Lose! ${playerTeam.fullName}: ${totalRuns} vs ${opponentTeam.fullName}: ${target}`;
                }
                showGameOver();
            }
        } else {
            totalRuns += playerChoice;
            totalRunsEl.textContent = totalRuns;
            statusEl.textContent = `You scored ${playerChoice}! Total: ${totalRuns}`;

            if (!isFirstInnings && totalRuns > target) {
                gameOver = true;
                statusEl.textContent = `You Win! Chased ${target + 1} runs!`;
                showGameOver();
            }
        }
    } else {
        if (playerChoice === opponentChoice) {
            isOut = true;
            if (isFirstInnings) {
                target = opponentRuns;
                statusEl.textContent = `OUT! Opponent all out for ${opponentRuns}! You need ${opponentRuns + 1} to win.`;
                isFirstInnings = false;
                isBatting = true;
                isOut = false;
                totalRuns = 0;
                totalRunsEl.textContent = '0';
                runsLabel.textContent = 'Your Score';
                batBall.classList.remove('bowling');
            } else {
                gameOver = true;
                if (opponentRuns > target) {
                    statusEl.textContent = `You Lose! ${opponentTeam.fullName}: ${opponentRuns} vs ${playerTeam.fullName}: ${target}`;
                } else {
                    statusEl.textContent = `You Win! ${opponentTeam.fullName}: ${opponentRuns} vs ${playerTeam.fullName}: ${target}`;
                }
                showGameOver();
            }
        } else {
            opponentRuns += opponentChoice;
            totalRunsEl.textContent = opponentRuns;
            statusEl.textContent = `Opponent scored ${opponentChoice}! Total: ${opponentRuns}`;

            if (!isFirstInnings && opponentRuns > target) {
                gameOver = true;
                statusEl.textContent = `You Lose! Opponent chased ${target + 1} runs!`;
                showGameOver();
            }
        }
    }
}

function showGameOver() {
    batBall.classList.remove('active');
    finalScoreEl.textContent = `${playerTeam.fullName}: ${totalRuns}  |  ${opponentTeam.fullName}: ${opponentRuns}`;
    outMessage.style.display = 'block';
    battingOptions.forEach(btn => btn.disabled = true);
}

battingOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        const run = parseInt(btn.dataset.run);
        playTurn(run);
    });
});

resetBtn.addEventListener('click', () => {
    totalRuns = 0;
    opponentRuns = 0;
    isOut = false;
    isBatting = true;
    target = 0;
    gameOver = false;
    isFirstInnings = true;
    totalRunsEl.textContent = '0';
    statusEl.textContent = 'Select your team to play again!';
    outMessage.style.display = 'none';
    gameArea.style.display = 'none';
    teamSelection.style.display = 'block';
    battingOptions.forEach(btn => btn.disabled = false);
    batBall.classList.remove('active', 'bowling');
});

initTeamSelection();
