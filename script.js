// Função para alternar entre modo claro e escuro
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        icon.textContent = '🌙';
    } else {
        html.classList.add('dark');
        icon.textContent = '☀️';
    }
}

// Variáveis para controlar os acertos por página
let correctPage1 = 0;
const totalPage1 = 3;
let correctPage2 = 0;
const totalPage2 = 5;

// Função para checar respostas em texto
function checkAnswer(inputId, correctAnswer, feedbackId, pageNum) {
    const input = document.getElementById(inputId);
    const feedback = document.getElementById(feedbackId);

    // Previne contar pontos a mais se já acertou (input desabilitado)
    if (input.disabled) return;

    // Pega o valor, remove espaços extras e converte para minúsculo
    const userAnswer = input.value.trim().toLowerCase();

    feedback.classList.remove('hidden');

    if (userAnswer === correctAnswer) {
        feedback.textContent = 'Acertou, meu amor! 😍';
        feedback.className = 'mt-3 text-sm font-semibold text-green-500 dark:text-green-400';
        input.disabled = true;
        countScore(pageNum);
    } else {
        feedback.textContent = 'Errou! Tente de novo 😅';
        feedback.className = 'mt-3 text-sm font-semibold text-red-500 dark:text-red-400';
    }
}

// Função para checar respostas de múltipla escolha
function checkAnswerSelect(selectId, correctAnswer, feedbackId, pageNum, successMessage = 'Acertou, meu amor! 😍') {
    const select = document.getElementById(selectId);
    const feedback = document.getElementById(feedbackId);

    // Previne contar pontos a mais se já acertou (select desabilitado)
    if (select.disabled) return;

    const userAnswer = select.value;

    if (!userAnswer) return;

    feedback.classList.remove('hidden');

    if (userAnswer === correctAnswer) {
        feedback.textContent = successMessage;
        feedback.className = 'mt-3 text-sm font-semibold text-green-500 dark:text-green-400';
        select.disabled = true;
        countScore(pageNum);
    } else {
        feedback.textContent = 'Tem certeza? Pense melhor... 🤔';
        feedback.className = 'mt-3 text-sm font-semibold text-red-500 dark:text-red-400';
    }
}

// Função para contabilizar acertos e liberar a próxima página
function countScore(pageNum) {
    if (pageNum === 1) {
        correctPage1++;
        if (correctPage1 === totalPage1) {
            const btnNext = document.getElementById('btn-next-1');
            btnNext.classList.remove('hidden');
            setTimeout(() => {
                btnNext.classList.remove('scale-95', 'opacity-0');
                btnNext.classList.add('scale-100', 'opacity-100');
            }, 100);
        }
    } else if (pageNum === 2) {
        correctPage2++;
        if (correctPage2 === totalPage2) {
            const btnNext = document.getElementById('btn-next-2');
            btnNext.classList.remove('hidden');
            setTimeout(() => {
                btnNext.classList.remove('scale-95', 'opacity-0');
                btnNext.classList.add('scale-100', 'opacity-100');
            }, 100);
        }
    }
}

// Função para navegar entre as páginas (esconder a atual e mostrar a nova)
function goToPage(hidePageId, showPageId) {
    document.getElementById(hidePageId).classList.add('hidden');
    document.getElementById(showPageId).classList.remove('hidden');
    // Rola para o topo da página suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Verifica ao carregar a página se deve ir direto para a Fase 3 (após voltar da declaração)
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#page-3') {
        document.getElementById('page-1').classList.add('hidden');
        document.getElementById('page-3').classList.remove('hidden');
    }

    // Configura o Lightbox para as imagens da galeria
    const galleryImages = document.querySelectorAll('#page-3 section .grid img');
    galleryImages.forEach(img => {
        img.classList.add('cursor-pointer');
        img.addEventListener('click', () => {
            openLightbox(img.src);
        });
    });
});

// Funções do Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    
    // Pequeno delay para a animação de fade-in funcionar corretamente
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightboxImg.classList.remove('scale-95');
        lightboxImg.classList.add('scale-100');
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxImg.src = ''; // Limpa a imagem após fechar
    }, 300);
}