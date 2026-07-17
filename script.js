document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // ✅ 0. UI/UX DESIGN 슬라이더 및 자동 전환 제어 핵심 변수 (Cirqa - 모바일)
  // ==========================================
  let uiuxTimer = null;
  let currentUiuxIndex = 0;
  const uiuxSlidesCount = 7;
  
  const uiuxScreens = [
    { img: 'images/Main.png', name: '홈 화면' },
    { img: 'images/Search.png', name: '검색 화면' },
    { img: 'images/Cart.png', name: '장바구니' },
    { img: 'images/Checkout.png', name: '결제 화면' },
    { img: 'images/Mypage.png', name: '마이페이지' },
    { img: 'images/Clip.png', name: 'Clip (커뮤니티)' },
    { img: 'images/Clip2.png', name: 'Clip (상세 보기)' }
  ];

  function startUiuxTimer() {
    stopUiuxTimer();
    uiuxTimer = setInterval(() => {
      currentUiuxIndex = (currentUiuxIndex + 1) % uiuxSlidesCount;
      updateUiuxSlide();
    }, 5000);
  }

  function stopUiuxTimer() {
    if (uiuxTimer) {
      clearInterval(uiuxTimer);
      uiuxTimer = null;
    }
  }

  function updateUiuxSlide() {
    const screen = uiuxScreens[currentUiuxIndex];
    
    const phoneImg = document.getElementById('uiuxPhoneImg');
    if (phoneImg) phoneImg.setAttribute('src', screen.img);
    
    const label = document.getElementById('uiuxIndicatorText');
    if (label) label.textContent = screen.name;
    
    const fill = document.getElementById('uiuxProgressBarFill');
    if (fill) {
      const percentage = ((currentUiuxIndex + 1) / uiuxSlidesCount) * 100;
      fill.style.width = `${percentage}%`;
    }
    
    const descs = document.querySelectorAll('.uiux-section:not(.jigu-section) .uiux-slide-desc');
    descs.forEach((desc, idx) => {
      if (idx === currentUiuxIndex) {
        desc.classList.add('active');
      } else {
        desc.classList.remove('active');
      }
    });
  }

  function goToUiuxSlide(index) {
    currentUiuxIndex = index;
    updateUiuxSlide();
    startUiuxTimer(); 
  }

  const progressBarBg = document.getElementById('uiuxProgressBarBg');
  if (progressBarBg) {
    progressBarBg.addEventListener('click', (e) => {
      const rect = progressBarBg.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickedIndex = Math.floor((clickX / width) * uiuxSlidesCount);
      
      if (clickedIndex >= 0 && clickedIndex < uiuxSlidesCount) {
        goToUiuxSlide(clickedIndex);
      }
    });
  }


  // ==========================================
  // ✅ 0-2. UI/UX DESIGN 슬라이더 및 자동 전환 제어 핵심 변수 (지구식탁 - 데스크톱)
  // ==========================================
  let jiguTimer = null;
  let currentJiguIndex = 0;
  const jiguSlidesCount = 5;

  const jiguScreens = [
    { img: 'images/c-main.png', name: '메인 화면' },
    { img: 'images/c-pickup.png', name: '픽업 화면' },
    { img: 'images/c-community.png', name: '커뮤니티 화면' },
    { img: 'images/c-like.png', name: '찜 화면' },
    { img: 'images/c-mypage.png', name: '마이페이지' }
  ];

  function startJiguTimer() {
    stopJiguTimer();
    jiguTimer = setInterval(() => {
      currentJiguIndex = (currentJiguIndex + 1) % jiguSlidesCount;
      updateJiguSlide();
    }, 5000);
  }

  function stopJiguTimer() {
    if (jiguTimer) {
      clearInterval(jiguTimer);
      jiguTimer = null;
    }
  }

  function updateJiguSlide() {
    const screen = jiguScreens[currentJiguIndex];
    
    const pcImg = document.getElementById('jiguPhoneImg');
    if (pcImg) pcImg.setAttribute('src', screen.img);
    
    const label = document.getElementById('jiguIndicatorText');
    if (label) label.textContent = screen.name;
    
    const fill = document.getElementById('jiguProgressBarFill');
    if (fill) {
      const percentage = ((currentJiguIndex + 1) / jiguSlidesCount) * 100;
      fill.style.width = `${percentage}%`;
    }
    
    const descs = document.querySelectorAll('.jigu-section .uiux-slide-desc');
    descs.forEach((desc, idx) => {
      if (idx === currentJiguIndex) {
        desc.classList.add('active');
      } else {
        desc.classList.remove('active');
      }
    });
  }

  function goToJiguSlide(index) {
    currentJiguIndex = index;
    updateJiguSlide();
    startJiguTimer();
  }

  const jiguProgressBarBg = document.getElementById('jiguProgressBarBg');
  if (jiguProgressBarBg) {
    jiguProgressBarBg.addEventListener('click', (e) => {
      const rect = jiguProgressBarBg.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickedIndex = Math.floor((clickX / width) * jiguSlidesCount);
      
      if (clickedIndex >= 0 && clickedIndex < jiguSlidesCount) {
        goToJiguSlide(clickedIndex);
      }
    });
  }


  // ==========================================
  // ✅ 1. 네비게이션 메뉴 클릭 - SPA 전환 로직
  // ==========================================
  const navItems = document.querySelectorAll('.nav-item');
  const mainSections = document.querySelectorAll('.intro-section, .resume-section, .project-section, .sns-section');
  const uiuxSections = document.querySelectorAll('.uiux-section'); 

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetText = item.getAttribute('data-text');

      if (targetText === 'PLANNING') {
        // PLANNING 메뉴는 외부 링크 이동이므로 기본 동작을 차단하지 않습니다.
        return;
      }

      e.preventDefault();

      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      if (targetText === 'UI/UX DESIGN') {
        activateUiuxPage();
        window.scrollTo(0, 0); 
      } 
      else {
        deactivateUiuxPage();

        let targetSection = null;
        if (targetText === 'INTRO') targetSection = document.querySelector('.intro-section');
        else if (targetText === 'RESUME') targetSection = document.querySelector('.resume-section');
        else if (targetText === 'PROJECT') targetSection = document.querySelector('.project-section');

        if (targetSection) {
          scrollToSection(targetSection);
        }
      }
    });
  });

  // SPA 전환 공통 헬퍼 함수
  function activateUiuxPage() {
    mainSections.forEach(sec => sec.classList.add('d-none'));
    uiuxSections.forEach(sec => sec.classList.remove('d-none'));
    goToUiuxSlide(0); 
    goToJiguSlide(0); 
  }

  function deactivateUiuxPage() {
    mainSections.forEach(sec => sec.classList.remove('d-none'));
    uiuxSections.forEach(sec => sec.classList.add('d-none'));
    stopUiuxTimer(); 
    stopJiguTimer(); 
  }

  function scrollToSection(targetSection) {
    const headerHeight = 130; 
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // ==========================================
  // ✅ 1-2. 교차 페이지 이동 전용 트리거 연동 로직
  // ==========================================
  
  // 1-2-A. 지구식탁 UI/UX 디자인 보기 트리거 (컴퓨터 화면)
  const jiguUiuxTriggers = document.querySelectorAll('.jigu-uiux-trigger');
  jiguUiuxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 네비게이션 액티브 상태 전환
      navItems.forEach(nav => nav.classList.remove('active'));
      const uiuxMenu = document.querySelector('.nav-item[data-text="UI/UX DESIGN"]');
      if (uiuxMenu) uiuxMenu.classList.add('active');

      activateUiuxPage();

      // 지구식탁 컴퓨터 영역(.jigu-section)으로 자연스러운 스크롤
      const jiguSection = document.querySelector('.jigu-section');
      if (jiguSection) {
        setTimeout(() => {
          scrollToSection(jiguSection);
        }, 50); // 화면이 가려진 상태에서 처리될 수 있도록 마이크로 딜레이 부여
      }
    });
  });

  // 1-2-B. CIRQA UI/UX 디자인 보기 트리거 (모바일 화면)
  const cirqaUiuxTriggers = document.querySelectorAll('.cirqa-uiux-trigger');
  cirqaUiuxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 네비게이션 액티브 상태 전환
      navItems.forEach(nav => nav.classList.remove('active'));
      const uiuxMenu = document.querySelector('.nav-item[data-text="UI/UX DESIGN"]');
      if (uiuxMenu) uiuxMenu.classList.add('active');

      activateUiuxPage();

      // CIRQA 모바일 영역으로 자연스러운 스크롤
      const cirqaSection = document.querySelector('.uiux-section:not(.jigu-section)');
      if (cirqaSection) {
        setTimeout(() => {
          scrollToSection(cirqaSection);
        }, 50);
      }
    });
  });

  // 1-2-C. INTRO 내 빠른 이동 버튼들 제어
  const quickBtnProject = document.getElementById('quickBtnProject');
  if (quickBtnProject) {
    quickBtnProject.addEventListener('click', () => {
      deactivateUiuxPage();
      navItems.forEach(nav => nav.classList.remove('active'));
      const projectNav = document.querySelector('.nav-item[data-text="PROJECT"]');
      if (projectNav) projectNav.classList.add('active');
      
      const projectSection = document.querySelector('.project-section');
      if (projectSection) scrollToSection(projectSection);
    });
  }

  const quickBtnSns = document.getElementById('quickBtnSns');
  if (quickBtnSns) {
    quickBtnSns.addEventListener('click', () => {
      deactivateUiuxPage();
      navItems.forEach(nav => nav.classList.remove('active'));
      
      const snsSection = document.querySelector('.sns-section');
      if (snsSection) scrollToSection(snsSection);
    });
  }

  const quickBtnUiux = document.getElementById('quickBtnUiux');
  if (quickBtnUiux) {
    quickBtnUiux.addEventListener('click', () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      const uiuxNav = document.querySelector('.nav-item[data-text="UI/UX DESIGN"]');
      if (uiuxNav) uiuxNav.classList.add('active');

      activateUiuxPage();
      window.scrollTo(0, 0);
    });
  }


  // 2. 헤더 및 푸터 로고 클릭 시 페이지 최상단(메인)으로 새로고침
  const logoElements = document.querySelectorAll('.logo-area img, .footer-logo img');
  logoElements.forEach(logo => {
    logo.addEventListener('click', (e) => {
      window.location.href = window.location.pathname; 
    });
  });

  // 3. 포트폴리오 구성 보기 모달 온/오프 인터랙션 로직
  const headerButton = document.querySelector('.button-area img');
  const portfolioModal = document.getElementById('portfolioModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (headerButton && portfolioModal) {
    headerButton.addEventListener('click', () => {
      portfolioModal.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    });
  }

  if (modalCloseBtn && portfolioModal) {
    modalCloseBtn.addEventListener('click', () => {
      portfolioModal.classList.remove('active');
      document.body.style.overflow = ''; 
    });
  }

  // 4. 프로젝트 카드 호버 및 클릭 제어 로직
  const projectImgBoxes = document.querySelectorAll('.project-img-box');
  let clickedBox = null; 

  projectImgBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
      projectImgBoxes.forEach(b => b.classList.remove('active'));
      box.classList.add('active');
    });

    box.addEventListener('mouseleave', () => {
      box.classList.remove('active');
      if (clickedBox) {
        clickedBox.classList.add('active');
      }
    });

    box.addEventListener('click', (e) => {
      if (e.target.closest('.overlay-btn')) return;

      if (clickedBox === box) {
        clickedBox = null;
        box.classList.remove('active');
      } else {
        if (clickedBox) {
          clickedBox.classList.remove('active');
        }
        clickedBox = box;
        box.classList.add('active');
      }
    });
  });

  const overlayButtons = document.querySelectorAll('.overlay-btn');
  overlayButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); 
    });
  });

  // 5. SNS 카드 뉴스 무한 루프 애니메이션 및 5초 게이지 연동 로직
  const gaugeFill = document.querySelector('.sns-gauge-fill');
  const cardTrack = document.querySelector('.sns-card-track');
  const cardWidthWithGap = 343.5; 

  function runSnsCarouselLoop() {
    if (!gaugeFill || !cardTrack) return; 
    gaugeFill.style.transition = 'none';
    gaugeFill.style.width = '0%';
    void gaugeFill.offsetWidth; 

    gaugeFill.style.transition = 'width 5s linear';
    gaugeFill.style.width = '100%';

    setTimeout(() => {
      const firstCard = cardTrack.firstElementChild;
      if (!firstCard) return;
      const clone = firstCard.cloneNode(true);
      cardTrack.appendChild(clone);

      cardTrack.style.transition = 'transform 0.5s ease';
      cardTrack.style.transform = `translateX(-${cardWidthWithGap}px)`;

      setTimeout(() => {
        cardTrack.removeChild(clone);
        cardTrack.appendChild(firstCard); 
        
        cardTrack.style.transition = 'none';
        cardTrack.style.transform = 'translateX(0)';
        
        void cardTrack.offsetWidth; 

        runSnsCarouselLoop();
      }, 500); 

    }, 5000);
  }

  if (gaugeFill && cardTrack) {
    runSnsCarouselLoop();
  }

  // 6. SNS 카드 클릭 시 모달창(오버레이) 라이트박스 구동 로직
  const snsCardModal = document.getElementById('snsCardModal');
  const snsModalImg = document.getElementById('snsModalImg');
  const snsModalTitle = document.getElementById('snsModalTitle');
  const snsCardModalCloseBtn = document.getElementById('snsCardModalCloseBtn');

  if (cardTrack && snsCardModal) {
    cardTrack.addEventListener('click', (e) => {
      if (e.target.classList.contains('sns-card')) {
        const imgSrc = e.target.getAttribute('src');
        const titleText = e.target.getAttribute('data-title');
        
        snsModalImg.setAttribute('src', imgSrc);
        snsModalTitle.textContent = titleText;
        
        snsCardModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (snsCardModalCloseBtn && snsCardModal) {
    snsCardModalCloseBtn.addEventListener('click', () => {
      snsCardModal.classList.remove('active');
      document.body.style.overflow = ''; 
    });
  }

  if (snsCardModal) {
    snsCardModal.addEventListener('click', (e) => {
      if (e.target === snsCardModal) {
        snsCardModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
