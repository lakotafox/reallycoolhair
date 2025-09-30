// Sparkle cursor trail
document.addEventListener('DOMContentLoaded', function() {

    // Typewriter effect for LUCKY YOU
    setTimeout(function() {
        const heroTitle = document.querySelector('#home .hero-content h2');
        if (heroTitle) {
            const text = 'LUCKY YOU';
            heroTitle.innerHTML = '<span class="typewriter-text"></span><span class="typewriter-cursor">_</span>';
            const typewriterText = heroTitle.querySelector('.typewriter-text');
            const cursor = heroTitle.querySelector('.typewriter-cursor');

            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    typewriterText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 150);
                } else {
                    // Start blinking cursor after typing is done
                    cursor.style.animation = 'blink 1s infinite';
                }
            }

            // Start typing
            typeWriter();
        } else {
            console.log('Hero title not found');
        }
    }, 100);

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

    // Fake scrollbar for mobile - only on actual mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        const scrollbarContainer = document.createElement('div');
        scrollbarContainer.id = 'fake-mobile-scrollbar';
        scrollbarContainer.innerHTML = `
            <div style="
                position: fixed;
                right: 0;
                top: 0;
                width: 17px;
                height: 100%;
                background: #c0c0c0;
                border-left: 1px solid #808080;
                z-index: 999999;
            ">
                <div id="fake-thumb" style="
                    position: absolute;
                    width: 15px;
                    height: 60px;
                    left: 1px;
                    background: linear-gradient(to bottom, #ffffff, #c0c0c0, #808080);
                    border: 1px solid #808080;
                    box-shadow: inset 1px 1px 0 #dfdfdf;
                    top: 0;
                "></div>
            </div>
        `;

        // Add to body after everything loads
        window.addEventListener('load', function() {
            document.body.appendChild(scrollbarContainer);

            const thumb = document.getElementById('fake-thumb');

            function updateScrollbar() {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = window.pageYOffset / scrollHeight;
                const trackHeight = window.innerHeight;
                const thumbHeight = 60;
                const maxTop = trackHeight - thumbHeight;

                thumb.style.top = (scrollPercent * maxTop) + 'px';
            }

            window.addEventListener('scroll', updateScrollbar);
            updateScrollbar();
        });
    }

    // DVD-style floating GIFs in footer
    setTimeout(function() {
        const floatingGifs = document.querySelectorAll('.floating-gif');
        const footerContainer = document.querySelector('.footer-gifs');

        if (floatingGifs.length > 0 && footerContainer) {
            floatingGifs.forEach((gif, index) => {
                // Random starting position
                let x = Math.random() * (footerContainer.offsetWidth - 60);
                let y = Math.random() * (footerContainer.offsetHeight - 60);

                // Random velocity between 1-2 pixels per frame in each direction
                let vx = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
                let vy = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);

                gif.style.position = 'absolute';

                function moveGif() {
                    const containerWidth = footerContainer.offsetWidth;
                    const containerHeight = footerContainer.offsetHeight;
                    const gifWidth = gif.offsetWidth || 60;
                    const gifHeight = gif.offsetHeight || 60;

                    // Update position
                    x += vx;
                    y += vy;

                    // Wrap around edges (go out and come back opposite side)
                    if (x > containerWidth) {
                        x = -gifWidth;
                    } else if (x < -gifWidth) {
                        x = containerWidth;
                    }

                    if (y > containerHeight) {
                        y = -gifHeight;
                    } else if (y < -gifHeight) {
                        y = containerHeight;
                    }

                    gif.style.left = x + 'px';
                    gif.style.top = y + 'px';

                    requestAnimationFrame(moveGif);
                }

                // Start animation
                moveGif();
            });
        }
    }, 500); // Wait for page to fully load

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