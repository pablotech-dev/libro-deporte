document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Menú Hamburguesa (Mobile)
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
        
        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // 2. Animaciones al Scrollear (Intersection Observer)
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Dejar de observar una vez que ya se animó
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 3. Funcionalidad Extra Interactiva: Temporizador de Urgencia en Checkout
    const countdownElement = document.getElementById("countdown");
    
    if (countdownElement) {
        // Tiempo inicial en segundos (10 minutos)
        let time = 10 * 60; 

        const updateCountdown = () => {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;
            countdownElement.innerHTML = `${minutes}:${seconds}`;

            if (time > 0) {
                time--;
            } else {
                // Qué hacer cuando termina el tiempo (ej. resetear u ocultar oferta)
                countdownElement.innerHTML = "00:00";
                countdownElement.style.color = "red";
                document.querySelector('.urgency-box p').innerHTML = "La oferta ha expirado. Refresca para intentar de nuevo.";
            }
        };

        // Ejecutar cada segundo
        setInterval(updateCountdown, 1000);
    }
});