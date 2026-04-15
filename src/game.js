/ game.js — Terra Guesser
// Features: daily challenge, share results, score history, loading skeletons, tile animations

const Game = (() => {

  // --- State ---
  let currentRound = 0;
  let score = 0;
  let streak = 0;
  let answered = false;
  let shuffledTiles = [];
  let roundResults = [];
  let isDaily = false;
  let dailySeed = 0;

  // --- Helpers ---
  function el(id) { return document.getElementById(id); }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    el(id).classList.add('active');
  }

  // Seeded shuffle — same seed = same tile order every day
  function seededShuffle(arr, seed) {
    const a = [...arr];
    let s = seed;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const j = Math.abs(s) % (i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function randomShuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getTodaySeed() {
    const d = new Date();
    return parseInt(`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`);
  }

  function getTodayKey() {
    const d = new Date();
    return `tg_daily_${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}`;
  }

  // --- Storage ---
  function getDailyResult() {
    try { return JSON.parse(localStorage.getItem(getTodayKey())); } catch { return null; }
  }

  function saveDailyResult(data) {
    try { localStorage.setItem(getTodayKey(), JSON.stringify(data)); } catch {}
  }

  function saveScoreHistory(finalScore) {
    try {
      const history = JSON.parse(localStorage.getItem('tg_history') || '[]');
      history.unshift({ score: finalScore, date: new Date().toLocaleDateString(), daily: isDaily });
      localStorage.setItem('tg_history', JSON.stringify(history.slice(0, 10)));
    } catch {}
  }

  function getBestScore() {
    try {
      const history = JSON.parse(localStorage.getItem('tg_history') || '[]');
      return history.length ? Math.max(...history.map(h => h.score)) : 0;
    } catch { return 0; }
  }

  // --- Share ---
  function buildShareText() {
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const emoji = roundResults.map(r => r ? '🟩' : '🟥').join('');
    const label = isDaily ? `Terra Guesser — Daily ${today}` : 'Terra Guesser';
    return `${label}\n${emoji}\nScore: ${score} pts\nterraguesser.vercel.app`;
  }

  function shareResult() {
    const text = buildShareText();
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        el('shareBtn').textContent = 'Copied!';
        setTimeout(() => { el('shareBtn').textContent = 'Share result'; }, 2000);
      }).catch(() => {
        alert(text);
      });
    }
  }

  // --- Round rendering ---
  function renderRound() {
    answered = false;
    const round = ROUNDS[currentRound];

    shuffledTiles = isDaily
      ? seededShuffle(round.tiles, dailySeed + currentRound)
      : randomShuffle(round.tiles);

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
      div.className = 'tile tile--loading';

      const img = document.createElement('img');
      img.alt = tile.label;
      img.loading = 'lazy';
      img.onload  = () => { div.classList.remove('tile--loading'); div.classList.add('tile--loaded'); };
      img.onerror = () => { div.classList.remove('tile--loading'); div.classList.add('tile--error'); };
      img.src = tile.url;

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
    tiles.forEach(t => t.classList.add('tile--locked'));
    shuffledTiles.forEach((tile, i) => { if (tile.imp) tiles[i].classList.add('tile--reveal'); });

    const correct = shuffledTiles[index].imp;
    roundResults.push(correct);

    if (correct) {
      tiles[index].classList.add('tile--correct', 'tile--pulse');
      streak++;
      const pts = streak > 1 ? 150 : 100;
      score += pts;
      showFeedback(true, streak, pts);
    } else {
      tiles[index].classList.add('tile--wrong', 'tile--shake');
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
    el('fbLearn').textContent = round.learn;

    if (correct) {
      el('fbIcon').textContent = '✓';
      el('fbIcon').className = 'fb-icon fb-icon--correct';
      el('fbTitle').className = 'fb-title fb-title--correct';
      el('fbTitle').textContent = currentStreak > 1
        ? `Correct! +${pts} pts — ${currentStreak}x streak`
        : `Correct! +${pts} pts`;
      el('fbBody').textContent = 'You spotted the impostor.';
      if (currentStreak > 1) {
        el('comboBadge').textContent = `${currentStreak}x combo`;
        el('comboBadge').className = 'combo-badge combo-badge--show';
      }
    } else {
      el('fbIcon').textContent = '✕';
      el('fbIcon').className = 'fb-icon fb-icon--wrong';
      el('fbTitle').className = 'fb-title fb-title--wrong';
      el('fbTitle').textContent = 'Not quite — the green tile was the impostor';
      el('fbBody').textContent = 'Streak reset.';
    }

    el('feedbackCard').className = 'feedback-card feedback-card--show';
  }

  // --- Public: start practice ---
  function start() {
    isDaily = false;
    currentRound = 0; score = 0; streak = 0; roundResults = [];
    el('scoreVal').textContent = 0;
    el('streakVal').textContent = 0;
    el('dailyBadge').style.display = 'none';
    showScreen('screen-game');
    renderRound();
  }

  // --- Public: start daily ---
  function startDaily() {
    const existing = getDailyResult();
    if (existing) {
      score = existing.score;
      roundResults = existing.roundResults;
      isDaily = true;
      el('endScore').textContent = existing.score;
      el('endTitle').textContent = existing.title;
      el('endSub').textContent = `You already played today. Come back tomorrow!`;
      el('endEmoji').textContent = existing.emoji;
      el('shareBtn').style.display = 'inline-block';
      el('playAgainBtn').style.display = 'none';
      showScreen('screen-end');
      return;
    }
    isDaily = true;
    dailySeed = getTodaySeed();
    currentRound = 0; score = 0; streak = 0; roundResults = [];
    el('scoreVal').textContent = 0;
    el('streakVal').textContent = 0;
    el('dailyBadge').style.display = 'inline-block';
    showScreen('screen-game');
    renderRound();
  }

  // --- Public: next round ---
  function next() {
    currentRound++;
    if (currentRound >= ROUNDS.length) { end(); }
    else { renderRound(); }
  }

  // --- Public: end game ---
  function end() {
    el('progressFill').style.width = '100%';
    saveScoreHistory(score);

    const pct = score / (ROUNDS.length * 150);
    const title = pct > 0.8 ? 'Expert geographer' : pct > 0.5 ? 'Sharp eye' : 'Keep exploring';
    const emoji = roundResults.map(r => r ? '🟩' : '🟥').join('');
    const best = getBestScore();

    el('endScore').textContent = score;
    el('endTitle').textContent = title;
    el('endSub').textContent = `${score} pts across ${ROUNDS.length} rounds · Best: ${best} pts`;
    el('endEmoji').textContent = emoji;
    el('shareBtn').style.display = 'inline-block';
    el('playAgainBtn').style.display = isDaily ? 'none' : 'inline-block';

    if (isDaily) saveDailyResult({ score, title, emoji, roundResults });

    showScreen('screen-end');
  }

  // --- Public: restart ---
  function restart() { start(); }

  return { start, startDaily, next, restart, shareResult };

})();
