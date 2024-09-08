document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context not supported');
        return;
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 15;  
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: Math.floor(columns) }, () => Math.random() * canvas.height);
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fallSpeed = 6.5;  
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'green';
        ctx.font = `${fontSize}px monospace`;
        
        drops.forEach((y, index) => {
            const char = charSet[Math.floor(Math.random() * charSet.length)];
            ctx.fillText(char, index * fontSize, y);
            drops[index] = y > canvas.height ? Math.random() * -canvas.height : y + fallSpeed;
        });
        
        requestAnimationFrame(draw);
    }

    draw();
});
