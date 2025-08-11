const canvas = document.getElementById('fundo-interativo');
const ctx = canvas.getContext('2d');

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radius: 120 
};

class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouse.radius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (mouse.radius - distance) / mouse.radius;
      
      this.x += forceDirectionX * force * 1.5;
      this.y += forceDirectionY * force * 1.5;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width + this.size) this.x = -this.size;
    if (this.x < -this.size) this.x = canvas.width + this.size;
    if (this.y > canvas.height + this.size) this.y = -this.size;
    if (this.y < -this.size) this.y = canvas.height + this.size;

    this.draw();
  }
}

let particlesArray = [];

function init() {
  particlesArray = [];
  const numberOfParticles = (canvas.height * canvas.width) / 10000;
  const colors = ['#66ff00ff', '#0004ffff', '#ff0000ff', '#e5ff00ff'];

  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2.5 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(new Particle(x, y, size, color));
  }
}

function animate() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#2c0a4f');
  gradient.addColorStop(1, '#05040a');
  gradient.addColorStop(0.7, '#0f0c29');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  requestAnimationFrame(animate);
}

const handleMouseMove = (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

window.addEventListener('load', () => {
    if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
        animate();
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
    }
});