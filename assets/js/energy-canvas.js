class EnergyNetwork {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId);
		if (!this.canvas) return;

		this.ctx = this.canvas.getContext('2d');
		this.particles = [];
		this.numberOfParticles = 45; // Sparse, elegant amount
		this.connectionDistance = 250; // Allow further connections for broader web

		this.resize();
		this.init();

		window.addEventListener('resize', () => this.resize());
		this.animate();
	}

	resize() {
		const parent = this.canvas.parentElement;
		this.canvas.width = parent.clientWidth;
		this.canvas.height = parent.clientHeight;
	}

	init() {
		this.particles = [];
		for (let i = 0; i < this.numberOfParticles; i++) {
			this.particles.push(new Particle(this.canvas));
		}
	}

	animate() {
		requestAnimationFrame(() => this.animate());
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Update and draw particles
		this.particles.forEach(p => p.update());

		// Draw connections
		this.drawConnections();

		// Draw particles over connections
		this.particles.forEach(p => p.draw(this.ctx));
	}

	drawConnections() {
		for (let a = 0; a < this.particles.length; a++) {
			for (let b = a; b < this.particles.length; b++) {
				let dx = this.particles[a].x - this.particles[b].x;
				let dy = this.particles[a].y - this.particles[b].y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < this.connectionDistance) {
					// Distance fade
					let distOpacity = 1 - (distance / this.connectionDistance);
					
					// Core logic for appearing/disappearing
					// We multiply distance fade by the inherent opacity of both particles
					let combinedOpacity = distOpacity * this.particles[a].opacity * this.particles[b].opacity;
					
					// Deep blue connections (base)
					this.ctx.strokeStyle = `rgba(1, 10, 60, ${combinedOpacity})`; 
					this.ctx.lineWidth = 1;
					this.ctx.beginPath();
					this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
					this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
					this.ctx.stroke();

					// Give the strongest connections a soft deep blue center overlay
					if (combinedOpacity > 0.4) {
						this.ctx.strokeStyle = `rgba(0, 68, 204, ${combinedOpacity * 0.4})`;
						this.ctx.lineWidth = 1.5;
						this.ctx.stroke();
					}
				}
			}
		}
	}
}

class Particle {
	constructor(canvas) {
		this.canvas = canvas;
		// Spawn mostly on the right side
		this.x = (this.canvas.width * 0.3) + (Math.random() * this.canvas.width * 0.7);
		this.y = Math.random() * this.canvas.height;
		
		// Very slow drift
		this.vx = (Math.random() - 0.5) * 0.2;
		this.vy = (Math.random() - 0.5) * 0.2;

		this.baseSize = Math.random() * 1.5 + 0.5;
		
		// Pulsating variables for slow appearing and disappearing
		this.pulseAngle = Math.random() * Math.PI * 2;
		this.pulseSpeed = 0.003 + Math.random() * 0.005; // extremely slow cycle
		this.opacity = 0;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;

		// Gentle bounce, keeping it mostly on the right 75% of the screen
		if (this.x < this.canvas.width * 0.25) this.vx = Math.abs(this.vx); 
		if (this.x > this.canvas.width) this.vx = -Math.abs(this.vx);
		if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;

		// Slow oscillation between 0 and 1
		this.pulseAngle += this.pulseSpeed;
		this.opacity = (Math.sin(this.pulseAngle) + 1) / 2; // maps -1..1 to 0..1
	}

	draw(ctx) {
		let size = this.baseSize + (this.opacity * 1.5);

		ctx.beginPath();
		ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
		
		ctx.fillStyle = `rgba(0, 68, 204, ${this.opacity * 0.7})`;
		
		// Subtle glow when fully opaque
		if (this.opacity > 0.5) {
			ctx.shadowBlur = 12 * this.opacity;
			ctx.shadowColor = '#0044CC';
		} else {
			ctx.shadowBlur = 0;
		}
		
		ctx.fill();
		ctx.shadowBlur = 0; // reset

	}
}

// Video Yoyo Playback Handler
function initHeroVideoYoyo(vId) {
	const video = document.getElementById(vId);
	if (!video) return;

	// 'Speed, but slow' - setting playback rate to 0.5x
	video.playbackRate = 0.5;
	let isReversing = false;

	// Monitor time to catch the 'about to finish' moment
	// Using a high-frequency interval for smooth manual reverse
	setInterval(() => {
		if (!isReversing) {
			// If about to reach the end (within 0.2s), switch to reverse
			if (video.currentTime >= video.duration - 0.2) {
				isReversing = true;
				video.pause();
			}
		} else {
			// Manual reverse: decrement currentTime
			// Subtracting roughly 0.033s each 33ms (30fps) * playbackRate
			video.currentTime -= 0.02; 
			
			// If back at the start, switch to forward
			if (video.currentTime <= 0.1) {
				isReversing = false;
				video.play();
			}
		}
	}, 33); 
}

document.addEventListener('DOMContentLoaded', () => {
	new EnergyNetwork('hero-energy-canvas');
	initHeroVideoYoyo('hero-bg-video');
});
