// ========================================
// 石川県モニターツアーサイト - JavaScript
// ========================================

// DOMContentLoaded イベント
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initFAQ();
    initSmoothScroll();
});

// ========================================
// ナビゲーションバーのスクロール効果
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// スクロールアニメーション
// ========================================
function initScrollAnimations() {
    // Intersection Observer の設定
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const fadeInElements = document.querySelectorAll('.fade-in-up');
    fadeInElements.forEach(element => {
        observer.observe(element);
    });
    
    // フローステップのアニメーション
    const flowSteps = document.querySelectorAll('.flow-step');
    flowSteps.forEach((step, index) => {
        setTimeout(() => {
            observer.observe(step);
        }, index * 100);
    });
}

// ========================================
// FAQアコーディオン
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 現在のアイテムがアクティブかどうかをチェック
            const isActive = item.classList.contains('active');
            
            // 全てのFAQアイテムを閉じる
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // クリックされたアイテムがアクティブでなければ開く
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// スムーススクロール
// ========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// パララックス効果（ヒーロー背景）
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.getElementById('hero-bg');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// ツアーカードのホバーエフェクト強化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const tourCards = document.querySelectorAll('.tour-card');
    
    tourCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ========================================
// 数字カウントアップアニメーション（オプション）
// ========================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ========================================
// ページロード時のフェードイン
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
