document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar Solid-on-Scroll & Mobile Drawer Logic
  const navbar = document.querySelector('.navbar');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbar) {
    const handleScroll = () => {
      const isMobileOpen = navbarCollapse && navbarCollapse.classList.contains('show');
      if (window.scrollY > 50 || isMobileOpen) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (navbarCollapse) {
      navbarCollapse.addEventListener('shown.bs.collapse', handleScroll);
      navbarCollapse.addEventListener('hidden.bs.collapse', handleScroll);
    }

    handleScroll();
  }

  // 2. Category Filter Logic for Editing & Film Page
  const filterBtns = document.querySelectorAll('#portfolio-filters button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 3. Photography Lightbox (GLightbox Initialization)
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true,
      openEffect: 'fade',
      closeEffect: 'fade'
    });
  }

  // 4. Smooth Scroll for Anchor Links (#hashes)
  document.body.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href*="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#' || !href.startsWith('#')) return;

    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();
      
      const navbarOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });

  // 5. Dynamic Copyright Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});