// JavaScript Custom Logic for Al Morè Website

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY NAVBAR EFFECT
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('py-3', 'shadow-xl');
                navbar.classList.remove('py-0');
            } else {
                navbar.classList.remove('py-3', 'shadow-xl');
                navbar.classList.add('py-0');
            }
        });
    }

    // 2. MOBILE MENU TOGGLE
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenuBtn && mobileMenu && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // 3. INTERACTIVE MENU TABS FILTERING
    const menuTabs = document.querySelectorAll('.menu-tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => {
                t.classList.remove('active', 'bg-white', 'text-brand-dark', 'border-white');
                t.classList.add('border-zinc-800', 'text-zinc-400');
            });

            tab.classList.add('active', 'bg-white', 'text-brand-dark', 'border-white');
            tab.classList.remove('border-zinc-800', 'text-zinc-400');

            const category = tab.getAttribute('data-category');

            menuItems.forEach(item => {
                const itemCat = item.getAttribute('data-cat');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    if (category === 'tutti' || itemCat === category) {
                        item.style.display = 'flex';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 150);
            });
        });
    });

    menuItems.forEach(item => {
        item.style.transition = 'all 0.3s ease-out';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });

    // 4. PREVENT PAST DATES IN RESERVATION CALENDAR
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;

        const formattedToday = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', formattedToday);
        dateInput.value = formattedToday;
    }

    // 5. RESERVATION FORM HANDLING -> THEFORK REDIRECT
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const guests = document.getElementById('guests').value;
            const rawDate = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            if (!name || !rawDate || !time) {
                alert('Si prega di compilare tutti i campi obbligatori.');
                return;
            }

            // Reindirizza direttamente alla pagina ufficiale di TheFork del ristorante Al Morè
            const theForkUrl = 'https://www.thefork.it/ristorante/al-more-r813932#booking';

            window.location.href = theForkUrl;
        });
    }
});

// 6. EVENTI SLIDER LOGIC PER TUTTE LE LOCATION (MORE, TENNIS, PALAZZO)
const sliderIndices = {
    more: 0,
    tennis: 0,
    palazzo: 0
};

function updateSlider(type) {
    const slides = document.querySelectorAll(`.slider-slide-${type}`);
    const dots = document.querySelectorAll(`.dot-${type}`);
    const index = sliderIndices[type];

    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('hidden');
            slide.classList.add('block');
        } else {
            slide.classList.remove('block');
            slide.classList.add('hidden');
        }
    });

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.remove('bg-zinc-700');
            dot.classList.add('bg-brand-mint');
        } else {
            dot.classList.remove('bg-brand-mint');
            dot.classList.add('bg-zinc-700');
        }
    });
}

function moveSlider(type, step) {
    const slides = document.querySelectorAll(`.slider-slide-${type}`);
    const total = slides.length;
    if (total === 0) return;

    sliderIndices[type] = (sliderIndices[type] + step + total) % total;
    updateSlider(type);
}

function setSlider(type, index) {
    sliderIndices[type] = index;
    updateSlider(type);
}

// 7. SCROLL REVEAL ANIMATION (Fade-in & Slide-up on scroll)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Fa partire l'animazione quando l'elemento è visibile al 15%
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target); // Anima una sola volta per ogni elemento
        }
    });
}, observerOptions);

// Seleziona tutte le sezioni o i blocchi principali che vuoi far comparire con la transizione
const revealElements = document.querySelectorAll('section > div, header .relative.z-10');
revealElements.forEach(el => {
    el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
    observer.observe(el);
});
