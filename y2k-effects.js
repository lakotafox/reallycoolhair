// Sparkle cursor trail
document.addEventListener('DOMContentLoaded', function() {

    // Hamburger Menu Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Create sparkle stars background
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    // Butterfly flies across the hero section
    const butterfly = document.getElementById('butterfly');
    if (butterfly) {
        // Position butterfly in hero section
        const heroSection = document.getElementById('home');
        if (heroSection) {
            const heroRect = heroSection.getBoundingClientRect();
            let position = -100;
            let direction = 1;
            let verticalOffset = 0;

            butterfly.style.position = 'absolute';
            butterfly.style.top = (heroRect.top + window.scrollY + heroRect.height / 2) + 'px';

            setInterval(function() {
                // Move horizontally
                position += 3 * direction;

                // Add floating motion
                verticalOffset = Math.sin(Date.now() / 500) * 20;

                // Check bounds and reverse direction
                if (position > window.innerWidth) {
                    direction = -1;
                    butterfly.style.transform = 'scaleX(-1)';
                } else if (position < -100) {
                    direction = 1;
                    butterfly.style.transform = 'scaleX(1)';
                }

                butterfly.style.left = position + 'px';
                butterfly.style.top = (heroRect.top + window.scrollY + heroRect.height / 2 + verticalOffset) + 'px';
            }, 30);
        }
    }

    // Animated visitor counter
    const counter = document.getElementById('visitor-counter');
    if (counter) {
        let currentCount = 420;
        setInterval(function() {
            currentCount += Math.floor(Math.random() * 3);
            counter.textContent = String(currentCount).padStart(6, '0');
        }, 10000);
    }

    // Random alert messages (90s style)
    const messages = [
        "Welcome to Lucky You! You're the coolest visitor today!",
        "⭐ Don't forget to sign our guestbook! ⭐",
        "This site is UNDER CONSTRUCTION but still AWESOME!",
        "You've been selected for a FREE HAIRCUT!!! (just kidding lol)",
        "☆ CONGRATULATIONS! You're visitor #" + Math.floor(Math.random() * 9999) + "! ☆"
    ];

    // Show random popup after 5 seconds (disabled by default - uncomment to enable)
    /*
    setTimeout(function() {
        if (Math.random() > 0.7) {
            alert(messages[Math.floor(Math.random() * messages.length)]);
        }
    }, 5000);
    */

    // Rainbow text effect for headings
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        const text = heading.textContent;
        heading.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.animationDelay = `${i * 0.1}s`;
            heading.appendChild(span);
        }
    });

    // Add random GIF decorations
    const decorativeGifs = [
        'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==',
    ];

    // Scrolling rainbow border effect
    let hue = 0;
    setInterval(function() {
        hue = (hue + 1) % 360;
        document.body.style.borderTop = `5px solid hsl(${hue}, 100%, 50%)`;
        document.body.style.borderBottom = `5px solid hsl(${hue + 180}, 100%, 50%)`;
    }, 50);

    // Under construction gif removed - was causing broken image on mobile

    // Console ASCII art
    console.log('%c' + `
    ╔══════════════════════════════════════╗
    ║  LUCKY YOU HAIR SALON - EST. 1999   ║
    ║  ----------------------------------- ║
    ║  Welcome to the COOLEST site on the  ║
    ║  World Wide Web! Don't forget to     ║
    ║  bookmark us and come back soon!     ║
    ╚══════════════════════════════════════╝
    `, 'color: #00ff00; background: #000; font-family: monospace; font-size: 14px;');

    // Music control removed per user request
});

// Matrix rain effect (optional - can be toggled)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-3';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "LUCKYYOUHAIRSALON♥☆★♪♫✨🦋";
    const matrixArray = matrix.split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Uncomment to enable matrix rain
// createMatrixRain();