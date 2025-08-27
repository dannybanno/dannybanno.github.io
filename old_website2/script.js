document.addEventListener('DOMContentLoaded', () => {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Track cursor position
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });

    // Handle icon scaling
    const icons = document.querySelectorAll('.icon');
    const centerImage = document.querySelector('.center-image img');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    function updateIconScales() {
        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const iconX = rect.left + rect.width / 2;
            const iconY = rect.top + rect.height / 2;
            
            // Calculate distance from cursor
            const distance = Math.sqrt(
                Math.pow(mouseX - iconX, 2) + 
                Math.pow(mouseY - iconY, 2)
            );
            
            // Calculate scale based on distance (max 1.2, min 0.8)
            const maxDistance = 300;
            const scale = Math.max(0.8, Math.min(1.2, 1 + (maxDistance - distance) / maxDistance));
            
            // Apply scale while maintaining rotation
            const currentRotation = icon.style.transform.split('rotate(')[1].split('deg)')[0];
            icon.style.transform = `rotate(${currentRotation}) scale(${scale})`;
        });
    }

    // Update icon scales on mouse move
    document.addEventListener('mousemove', updateIconScales);

    // Matrix rain effect
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
