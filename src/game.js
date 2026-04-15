// game.js — all game logic
// Reads from ROUNDS (rounds.js) and manipulates the DOM (index.html)

const Game = (() => {

  // --- State ---
  let currentRound = 0;
  let score = 0;
  let streak = 0;
  let answered = false;
  let shuffledTiles = [];

  // --- Helpers ---
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function el(id) {
    return document.getElementById(id);
  }

  // --- Round rendering ---
  function renderRound() {
    answered = false;
    const round = ROUNDS[currentRound];
    shuffledTiles = shuffle(round.tiles);

    el('roundTag').textContent = `Round ${currentRound + 1} of ${ROUNDS.length}`;
    el('roundHint').textContent = round.hint;
    el('progressFill').style.width = `${(currentRound / ROUNDS.length) * 100}%`;
    el('nextBtn').disabled = true;
    el('feedbackCard').className = 'feedback-card';
    el('comboBadge').className = 'combo-badge';

    const grid = el('grid');
    grid.innerHTML = '';

    shuffledTiles.forEach((tile, i) => {
      const div = document.createElement('div');
      div.className = 'tile';

      const img = document.createElement('img');
      img.src = tile.url;
      img.alt = tile.label;
      img.loading = 'lazy';
      img.onerror = () => { div.classList.add('tile--error'); };

      const num = document.createElement('span');
      num.className = 'tile__num';
      num.textContent = i + 1;

      const badge = document.createElement('span');
      badge.className = 'tile__badge';
      badge.textContent = tile.label;

      div.appendChild(img);
      div.appendChild(num);
      div.appendChild(badge);
      div.addEventListener('click', () => handleGuess(i));
      grid.appendChild(div);
    });
  }

  // --- Guess handling ---
  function handleGuess(index) {
    if (answered) return;
    answered = true;

    const tiles = document.querySelectorAll('.tile');

    // Lock all tiles
    tiles.forEach(t => t.classList.add('tile--locked'));

    // Reveal impostor
    shuffledTiles.forEach((tile, i) => {
      if (tile.imp) tiles[i].classList.add('tile--reveal');
    });

    const correct = shuffledTiles[index].imp;

    if (correct) {
      tiles[index].classList.add('tile--correct');
      streak++;
      const pts = streak > 1 ? 150 : 100;
      score += pts;
      showFeedback(true, streak, pts);
    } else {
      tiles[index].classList.add('tile--wrong');
      streak = 0;
      showFeedback(false, 0, 0);
    }

    el('scoreVal').textContent = score;
    el('streakVal').textContent = streak;
    el('nextBtn').disabled = false;
  }

  // --- Feedback panel ---
  function showFeedback(correct, currentStreak, pts) {
    const round = ROUNDS[currentRound];
    const card = el('feedbackCard');
    const icon = el('fbIcon');
    const title = el('fbTitle');
    const body = el('fbBody');

    el('fbLearn').textContent = round.learn;

    if (correct) {
      icon.textContent = '✓';
      icon.className = 'fb-icon fb-icon--correct';
      title.className = 'fb-title fb-title--correct';
      title.textContent = currentStreak > 1
        ? `Correct! +${pts} pts — ${currentStreak}x streak`
        : `Correct! +${pts} pts`;
      body.textContent = 'You spotted the impostor.';

      if (currentStreak > 1) {
        const cb = el('comboBadge');
        cb.textContent = `${currentStreak}x combo`;
        cb.className = 'combo-badge combo-badge--show';
      }
    } else {
      icon.textContent = '✕';
      icon.className = 'fb-icon fb-icon--wrong';
      title.className = 'fb-title fb-title--wrong';
      title.textContent = 'Not quite — the green tile was the impostor';
      body.textContent = 'Streak reset.';
    }

    card.className = 'feedback-card feedback-card--show';
  }

  // --- Public methods ---
  function start() {
    currentRound = 0;
    score = 0;
    streak = 0;
    showScreen('screen-game');
    renderRound();
  }

  function next() {
    currentRound++;
    if (currentRound >= ROUNDS.length) {
      end();
    } else {
      renderRound();
    }
  }

  function end() {
    el('progressFill').style.width = '100%';
    el('endScore').textContent = score;
    const pct = score / (ROUNDS.length * 150);
    el('endTitle').textContent = pct > 0.8
      ? 'Expert geographer'
      : pct > 0.5 ? 'Sharp eye' : 'Keep exploring';
    el('endSub').textContent = `${score} points across ${ROUNDS.length} rounds.${streak > 2 ? ' Impressive streak!' : ''}`;
    showScreen('screen-end');
  }

  function restart() {
    start();
  }

  return { start, next, restart };

})();
