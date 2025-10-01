
(function () {
    'use strict';

    // Smooth scrolling for internal links
    function enableSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href').slice(1);
                if (!targetId) return; // skip anchors like '#'
                const target = document.getElementById(targetId);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // optionally update URL without jumping
                history.replaceState(null, '', `#${targetId}`);
            });
        });
    }

    // Simple typewriter effect for the main heading (profile h1)
    function enableTypewriter(selector, speed = 60) {
        const el = document.querySelector(selector);
        if (!el) return;
        const fullText = el.textContent.trim();
        el.textContent = '';
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        el.after(cursor);

        let i = 0;
        const timer = setInterval(() => {
            el.textContent += fullText.charAt(i);
            i += 1;
            if (i >= fullText.length) {
                clearInterval(timer);
                // remove cursor after a short delay
                setTimeout(() => cursor.remove(), 800);
            }
        }, speed);
    }

    // IntersectionObserver reveal animations
    function enableScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('section, .skill-card, .project-card, .achievement-card, .certificate-card, .avatar-img').forEach(node => {
            // add initial class for animation base
            node.classList.add('fade-up');
            observer.observe(node);
        });
    }

    // Project card tilt on mouse move
    function enableCardTilt() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            const rect = () => card.getBoundingClientRect();

            function onMove(e) {
                const r = rect();
                const x = (e.clientX - r.left) / r.width; // 0..1
                const y = (e.clientY - r.top) / r.height; // 0..1
                const rotateY = (x - 0.5) * 12; // degrees
                const rotateX = (0.5 - y) * 8; // degrees
                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                card.style.transition = 'transform 60ms linear';
            }

            function onLeave() {
                card.style.transition = 'transform 350ms cubic-bezier(.2,.9,.3,1)';
                card.style.transform = 'none';
            }

            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);
            card.addEventListener('touchstart', onMove);
            card.addEventListener('touchend', onLeave);
        });
    }

    // Scroll-to-top button
    function enableScrollTop() {
        const btn = document.createElement('button');
        btn.className = 'scroll-top';
        btn.setAttribute('aria-label', 'Scroll to top');
        btn.innerHTML = '⬆';
        document.body.appendChild(btn);

        function onScroll() {
            if (window.scrollY > 300) btn.classList.add('show');
            else btn.classList.remove('show');
        }

        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // initial check
    }

    // Simple modal for "View project" buttons: clones card content into modal
    function enableProjectModal() {
        const links = document.querySelectorAll('.view-project-btn');
        if (!links.length) return;

        function openModal(htmlContent) {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = htmlContent;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', () => overlay.remove());

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.remove();
            });

            modal.appendChild(closeBtn);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
        }

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // find the closest .project-card and clone its content
                const card = e.currentTarget.closest('.project-card');
                if (!card) return;
                e.preventDefault();
                // prepare a clean clone for the modal
                const clone = card.cloneNode(true);
                // remove the button inside the clone to avoid recursive modals
                clone.querySelectorAll('.view-project-btn').forEach(b => b.remove());
                openModal(clone.innerHTML);
            });
        });
    }

    // When window loads, remove preloader class if present
    function enablePreloaderReset() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }

    // Initialize everything
    function init() {
        enableSmoothScroll();
        enableTypewriter('.profile h1', 60);
        enableScrollReveal();
        enableCardTilt();
        enableScrollTop();
        enableProjectModal();
        enablePreloaderReset();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
