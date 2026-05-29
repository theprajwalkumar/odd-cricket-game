const teams = [
    { name: 'CSK', fullName: 'Chennai Super Kings', color: '#FFCC00', textColor: '#1a1a2e' },
    { name: 'MI', fullName: 'Mumbai Indians', color: '#004B93', textColor: '#fff' },
    { name: 'RCB', fullName: 'Royal Challengers Bangalore', color: '#EC1C24', textColor: '#fff' },
    { name: 'KKR', fullName: 'Kolkata Knight Riders', color: '#3A225D', textColor: '#fff' },
    { name: 'DC', fullName: 'Delhi Capitals', color: '#004C93', textColor: '#fff' },
    { name: 'RR', fullName: 'Rajasthan Royals', color: '#EA1A85', textColor: '#fff' },
    { name: 'SRH', fullName: 'Sunrisers Hyderabad', color: '#FF822A', textColor: '#fff' },
    { name: 'PBKS', fullName: 'Punjab Kings', color: '#DD1F2D', textColor: '#fff' },
    { name: 'LSG', fullName: 'Lucknow Super Giants', color: '#A4D9E7', textColor: '#1a1a2e' },
    { name: 'GT', fullName: 'Gujarat Titans', color: '#0B4EA2', textColor: '#fff' }
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

function createTeamLogo(team, size) {
    const div = document.createElement('div');
    div.className = 'team-logo-initials';
    div.textContent = team.name;
    div.style.width = size + 'px';
    div.style.height = size + 'px';
    div.style.background = team.color;
    div.style.color = team.textColor;
    div.style.fontSize = (size * 0.32) + 'px';
    return div;
}

function initTeamSelection() {
    teamsGrid.innerHTML = '';
    teams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        const logo = createTeamLogo(team, 55);
        card.appendChild(logo);
        const span = document.createElement('span');
        span.textContent = team.name;
        card.appendChild(span);
        card.addEventListener('click', () => selectTeam(team));
        teamsGrid.appendChild(card);
    });
}

function selectTeam(team) {
    playerTeam = team;
    let availableTeams = teams.filter(t => t.name !== team.name);
    opponentTeam = availableTeams[Math.floor(Math.random() * availableTeams.length)];

    const pLogo = createTeamLogo(playerTeam, 65);
    playerTeamLogo.innerHTML = '';
    playerTeamLogo.appendChild(pLogo);
    playerTeamName.textContent = playerTeam.fullName;

    const oLogo = createTeamLogo(opponentTeam, 65);
    opponentTeamLogo.innerHTML = '';
    opponentTeamLogo.appendChild(oLogo);
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
