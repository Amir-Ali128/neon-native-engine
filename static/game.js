async function increaseScore() {
    const response = await fetch('/api/increase_score');
    const data = await response.json();
    document.getElementById('score').innerText = "Score: " + data.score;
}
