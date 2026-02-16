const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let heart = {
    x: 200,
    y: 200,
    size: 30
};

let score = 0;


// backend score artır
async function increaseScoreBackend() {

    const response = await fetch('/api/increase_score');
    const data = await response.json();

    score = data.score;

    document.getElementById("score").innerText =
        "Score: " + score + " 💖";
}


// kalp çiz
function drawHeart(x, y, size) {

    ctx.fillStyle = "#ff66cc";

    ctx.beginPath();

    ctx.arc(x - size/4, y - size/4, size/4, 0, Math.PI * 2);
    ctx.arc(x + size/4, y - size/4, size/4, 0, Math.PI * 2);

    ctx.lineTo(x, y + size/2);

    ctx.fill();
}


// rastgele konum
function randomizeHeart() {

    heart.x = Math.random() * (canvas.width - 50) + 25;
    heart.y = Math.random() * (canvas.height - 50) + 25;
}


// oyun çizim döngüsü
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawHeart(heart.x, heart.y, heart.size);

    requestAnimationFrame(draw);
}


// mouse click kontrol
canvas.addEventListener("click", function(event) {

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const dx = mouseX - heart.x;
    const dy = mouseY - heart.y;

    const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < heart.size) {

        increaseScoreBackend();

        randomizeHeart();
    }

});


// başlat
draw();
