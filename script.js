const button = document.getElementById('revealBtn');
const message = document.getElementById('message');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiCount = 150;
const confetti = [];

function randomColor() {
  const colors = ['#ff69b4', '#ffb6c1', '#fffacd', '#ffa07a', '#ffd700'];
  return colors[Math.floor(Math.random() * colors.length)];
}

for (let i = 0; i < confettiCount; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * confettiCount,
    color: randomColor(),
    tilt: Math.random() * 10 - 10
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((p) => {
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
    ctx.stroke();
  });
  updateConfetti();
}

let angle = 0;
function updateConfetti() {
  angle += 0.01;
  confetti.forEach((p) => {
    p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
    p.x += Math.sin(angle);
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}

function animateConfetti() {
  drawConfetti();
  requestAnimationFrame(animateConfetti);
}

button.addEventListener('click', () => {
  message.classList.add('show');
  button.disabled = true;
  animateConfetti();
});
