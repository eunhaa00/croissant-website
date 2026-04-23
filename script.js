// ============================================================
// CROISSANT — 오리가미 자세교정 쿠션 인터랙션 스크립트
// ============================================================

/* ---- 네비게이션 스크롤 효과 ---- */
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ---- 모바일 메뉴 ---- */
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// 모바일 메뉴 링크 클릭 시 닫기
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* ---- 스크롤 시 reveal 애니메이션 ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// 타겟 요소들에 reveal 클래스 추가 & 옵저버 등록
const revealSelectors = [
  { selector: '#story .story-text',    cls: 'reveal-left' },
  { selector: '#story .story-visual',  cls: 'reveal-right' },
  { selector: '.feature-card',         cls: 'reveal' },
  { selector: '.step',                 cls: 'reveal' },
  { selector: '.ba-card',              cls: 'reveal' },
  { selector: '.storage-visual',       cls: 'reveal-left' },
  { selector: '.storage-text',         cls: 'reveal-right' },
  { selector: '.color-item',           cls: 'reveal' },
  { selector: '.cta-text',             cls: 'reveal' },
  { selector: '.section-eyebrow',      cls: 'reveal' },
  { selector: '.section-title',        cls: 'reveal' },
];

revealSelectors.forEach(({ selector, cls }) => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add(cls);
    if (cls === 'reveal') {
      el.style.transitionDelay = `${i * 0.08}s`;
    }
    revealObserver.observe(el);
  });
});

/* ---- Before / After 탭 전환 ---- */
const baTabs   = document.querySelectorAll('.ba-tab');
const baPanels = document.querySelectorAll('.ba-panel');

baTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;

    baTabs.forEach(t => t.classList.remove('active'));
    baPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(`panel-${target}`).classList.add('active');
  });
});

/* ---- 컬러 갤러리 인터랙션 ---- */
const colorItems = document.querySelectorAll('.color-item');
const cpName     = document.getElementById('cp-name');
const cpDesc     = document.getElementById('cp-desc');

colorItems.forEach(item => {
  item.addEventListener('click', () => {
    colorItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // 미리보기 텍스트 업데이트
    cpName.textContent = item.dataset.name;
    cpDesc.textContent = item.dataset.desc;

    // 애니메이션 리셋
    const preview = document.getElementById('color-preview');
    preview.style.animation = 'none';
    requestAnimationFrame(() => {
      preview.style.animation = '';
    });
  });

  // 마우스 오버 시 임시 정보 표시
  item.addEventListener('mouseenter', () => {
    cpName.textContent = item.dataset.name;
    cpDesc.textContent = item.dataset.desc;
  });

  // 마우스 아웃 시 현재 선택된 아이템 정보 복원
  item.addEventListener('mouseleave', () => {
    const activeItem = document.querySelector('.color-item.active');
    if (activeItem) {
      cpName.textContent = activeItem.dataset.name;
      cpDesc.textContent = activeItem.dataset.desc;
    }
  });
});

/* ---- 스무스 스크롤 (내비게이션 오프셋 보정) ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const offset = 80; // 네비게이션 높이
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- 히어로 패럴랙스 ---- */
const heroImg = document.querySelector('.hero-img');

window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroImg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
  }
}, { passive: true });

/* ---- 페이지 로드 완료 시 패럴랙스 초기화 ---- */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
