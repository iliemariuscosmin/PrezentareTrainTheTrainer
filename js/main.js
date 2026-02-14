/* ============================================
   DE LA BULGĂRE LA BIJUTERIE
   Main JavaScript — Animations, Quiz, Navigation
   ============================================ */

// =============================================
// 1. AOS INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
    });

    initProgressBar();
    initNavigation();
    initSideDots();
    initMaterialTabs();
    initHeroParticles();
    initQuiz();
    initGallerySwiper();
});

// =============================================
// 2. PROGRESS BAR
// =============================================
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// =============================================
// 3. NAVIGATION
// =============================================
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links a');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close menu on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// =============================================
// 4. SIDE DOTS
// =============================================
function initSideDots() {
    const dots = document.querySelectorAll('.side-dots .dot');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });
}

// =============================================
// 5. MATERIAL TABS
// =============================================
function initMaterialTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active
            btn.classList.add('active');
            document.getElementById('tab-' + tabId).classList.add('active');
        });
    });
}

// =============================================
// 6. HERO PARTICLES
// =============================================
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const colors = ['#FF6B6B', '#A29BFE', '#00CEC9', '#FDCB6E', '#FD79A8', '#00B894', '#74B9FF'];
    const shapes = ['●', '■', '▲', '◆', '★'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 16 + 8}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: ${Math.random() * 0.4 + 0.1};
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(particle);
    }
}

// =============================================
// 7. QUIZ
// =============================================
function initQuiz() {
    const questions = [
        {
            q: "La ce temperatură se coace lutul polimeric?",
            options: ["200-250°C", "110-130°C", "50-80°C", "300-350°C"],
            correct: 1,
            explanation: "Corect! 110-130°C — temperaturi joase, direct în cuptorul de acasă."
        },
        {
            q: "Ce face rășina UV epoxidică pe bijuterie?",
            options: [
                "O face mai grea",
                "O colorează",
                "Oferă un finisaj strălucitor ca sticla",
                "O face flexibilă"
            ],
            correct: 2,
            explanation: "Exact! Rășina UV dă un finisaj cristalin, ca sticla, premium."
        },
        {
            q: "Ce este primul pas în lucrul cu lut polimeric?",
            options: [
                "Coacerea",
                "Tăierea formelor",
                "Condiționarea (frământarea)",
                "Aplicarea rășinii"
            ],
            correct: 2,
            explanation: "Corect! Condiționarea activează plastifianții și face lutul maleabil."
        },
        {
            q: "Cât durează întărirea rășinii UV sub lampă?",
            options: ["30 de minute", "2-3 ore", "2-3 minute", "24 de ore"],
            correct: 2,
            explanation: "Da! Doar 2-3 minute sub lampa UV — super rapid!"
        },
        {
            q: "Care brand de lut polimeric este cel mai potrivit pentru începători?",
            options: [
                "Cernit (tehnici avansate)",
                "Sculpey (foarte moale, ușor de lucrat)",
                "Metal (greu de modelat)",
                "Niciun fel de lut"
            ],
            correct: 1,
            explanation: "Corect! Sculpey e foarte moale și perfect pentru începători."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const quizCard = document.getElementById('quizCard');
    const quizResult = document.getElementById('quizResult');
    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.getElementById('quizOptions');
    const feedbackEl = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('quizNextBtn');
    const progressBar = document.getElementById('quizProgressBar');
    const progressText = document.getElementById('quizProgressText');
    const resultEmoji = document.getElementById('resultEmoji');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    const restartBtn = document.getElementById('quizRestartBtn');

    function loadQuestion() {
        answered = false;
        const q = questions[currentQuestion];
        questionEl.textContent = q.q;
        feedbackEl.textContent = '';
        feedbackEl.className = 'quiz-feedback';
        nextBtn.style.display = 'none';
        optionsEl.innerHTML = '';

        progressBar.style.width = ((currentQuestion + 1) / questions.length) * 100 + '%';
        progressText.textContent = `Întrebarea ${currentQuestion + 1} / ${questions.length}`;

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleAnswer(idx));
            optionsEl.appendChild(btn);
        });
    }

    function handleAnswer(idx) {
        if (answered) return;
        answered = true;

        const q = questions[currentQuestion];
        const options = optionsEl.querySelectorAll('.quiz-option');

        options.forEach((opt, i) => {
            if (i === q.correct) {
                opt.classList.add('correct');
            } else if (i === idx && idx !== q.correct) {
                opt.classList.add('wrong');
            } else {
                opt.classList.add('disabled');
            }
        });

        if (idx === q.correct) {
            score++;
            feedbackEl.textContent = '✅ ' + q.explanation;
            feedbackEl.className = 'quiz-feedback correct-text';
        } else {
            feedbackEl.textContent = '❌ Răspuns greșit. ' + q.explanation;
            feedbackEl.className = 'quiz-feedback wrong-text';
        }

        if (currentQuestion < questions.length - 1) {
            nextBtn.textContent = 'Următoarea →';
            nextBtn.style.display = 'block';
        } else {
            nextBtn.textContent = 'Vezi rezultatul 🎉';
            nextBtn.style.display = 'block';
        }
    }

    nextBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    });

    function showResult() {
        quizCard.style.display = 'none';
        quizResult.style.display = 'block';

        const percent = (score / questions.length) * 100;

        if (percent === 100) {
            resultEmoji.textContent = '🏆';
            resultTitle.textContent = 'Perfecțiune!';
            resultText.textContent = `Ai răspuns corect la toate ${questions.length} întrebări! Ești gata să faci bijuterii!`;
        } else if (percent >= 60) {
            resultEmoji.textContent = '🎉';
            resultTitle.textContent = 'Foarte bine!';
            resultText.textContent = `Ai răspuns corect la ${score} din ${questions.length} întrebări. Bază solidă!`;
        } else {
            resultEmoji.textContent = '💪';
            resultTitle.textContent = 'Mai exersăm!';
            resultText.textContent = `Ai răspuns corect la ${score} din ${questions.length} întrebări. Revizuiește materialul și încearcă din nou!`;
        }
    }

    restartBtn.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        quizCard.style.display = 'block';
        quizResult.style.display = 'none';
        loadQuestion();
    });

    // Init first question
    loadQuestion();
}

// =============================================
// 8. GALLERY SWIPER
// =============================================
function initGallerySwiper() {
    new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

// =============================================
// 9. SMOOTH REVEAL ON SCROLL (extra)
// =============================================
// Checklist strikethrough animation
document.querySelectorAll('.cta-check input').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const label = this.closest('.cta-check');
        if (this.checked) {
            label.style.transform = 'scale(0.98)';
            label.style.opacity = '0.7';
        } else {
            label.style.transform = 'scale(1)';
            label.style.opacity = '1';
        }
    });
});
