// ===== SLIDE ENGINE =====
const slides = document.querySelectorAll('.slide');
const totalSlidesEl = document.getElementById('totalSlides');
const currentSlideEl = document.getElementById('currentSlide');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const chapterList = document.getElementById('chapterList');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const keyboardHelp = document.getElementById('keyboardHelp');

let currentIndex = 0;
const total = slides.length;
totalSlidesEl.textContent = total;

function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= total) index = total - 1;
    
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    currentIndex = index;
    
    // Update counter & progress
    currentSlideEl.textContent = index + 1;
    progressFill.style.width = ((index + 1) / total * 100) + '%';
    
    // Update chapter sidebar active state
    const currentChapter = slides[index].dataset.chapter;
    chapterList.querySelectorAll('li').forEach(li => {
        li.classList.toggle('active', li.dataset.chapter === currentChapter);
    });
    
    // Scroll slide to top
    slides[index].scrollTop = 0;
}

// Navigation buttons
prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

// Chapter navigation
chapterList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
        const chapter = li.dataset.chapter;
        const targetIndex = [...slides].findIndex(s => s.dataset.chapter === chapter);
        if (targetIndex >= 0) {
            showSlide(targetIndex);
            sidebar.classList.remove('open');
        }
    });
});

// Sidebar toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.textContent = '⛶';
    } else {
        document.exitFullscreen();
        fullscreenBtn.textContent = '⛶';
    }
});

// ===== TIMER =====
const timerEl = document.getElementById('timer');
const timerBtn = document.getElementById('timerBtn');
let timerRunning = false;
let timerSeconds = 0;
let timerInterval = null;

function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function toggleTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerBtn.textContent = '▶';
    } else {
        timerInterval = setInterval(() => {
            timerSeconds++;
            timerEl.textContent = formatTime(timerSeconds);
        }, 1000);
        timerBtn.textContent = '⏸';
    }
    timerRunning = !timerRunning;
}

timerBtn.addEventListener('click', toggleTimer);

// Double-click timer to reset
timerEl.addEventListener('dblclick', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 0;
    timerEl.textContent = '00:00';
    timerBtn.textContent = '▶';
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
            e.preventDefault();
            showSlide(currentIndex + 1);
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
            e.preventDefault();
            showSlide(currentIndex - 1);
            break;
        case 'Home':
            e.preventDefault();
            showSlide(0);
            break;
        case 'End':
            e.preventDefault();
            showSlide(total - 1);
            break;
        case 'f':
        case 'F':
            fullscreenBtn.click();
            break;
        case 't':
        case 'T':
            toggleTimer();
            break;
        case 's':
        case 'S':
            sidebar.classList.toggle('open');
            break;
        case 'Escape':
            sidebar.classList.remove('open');
            break;
    }
});

// ===== TOUCH / SWIPE =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 60) {
        if (diff > 0) showSlide(currentIndex + 1);
        else showSlide(currentIndex - 1);
    }
}, { passive: true });

// ===== KEYBOARD HELP AUTO-SHOW =====
let helpTimeout;
function showKeyboardHelp() {
    keyboardHelp.classList.add('visible');
    clearTimeout(helpTimeout);
    helpTimeout = setTimeout(() => {
        keyboardHelp.classList.remove('visible');
    }, 4000);
}

// Show help briefly on load
setTimeout(showKeyboardHelp, 1500);

// Show help on any key press
document.addEventListener('keydown', showKeyboardHelp);

// ===== INIT =====
showSlide(0);

console.log('🎓 Suport de Curs — loaded! (' + total + ' slide-uri)');
