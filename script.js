// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    // Fix: Show sun icon in dark mode
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
  } else {
    // Fix: Show moon icon in light mode
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
    moonIcon.classList.toggle('hidden');
    sunIcon.classList.toggle('hidden');
    
    // Save preference to localStorage
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  
  // Horizontal scrolling functionality
  const scrollSections = document.querySelectorAll('.book-scroll-section');
  
  scrollSections.forEach(section => {
    const scrollContainer = section.querySelector('.book-scroll-container');
    const leftButton = section.querySelector('.scroll-left');
    const rightButton = section.querySelector('.scroll-right');
    
    if (scrollContainer && leftButton && rightButton) {
      // Initially hide left button since we're at the start
      leftButton.style.display = 'none';
      
      // Scroll left
      leftButton.addEventListener('click', () => {
        scrollContainer.scrollBy({
          left: -300,
          behavior: 'smooth'
        });
      });
      
      // Scroll right
      rightButton.addEventListener('click', () => {
        scrollContainer.scrollBy({
          left: 300,
          behavior: 'smooth'
        });
      });
      
      // Show/hide scroll buttons based on scroll position
      const toggleScrollButtons = () => {
        leftButton.style.display = scrollContainer.scrollLeft > 0 ? 'flex' : 'none';
        rightButton.style.display = 
          scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 10 
            ? 'flex' 
            : 'none';
      };
      
      // Initial check
      toggleScrollButtons();
      
      // Check on scroll
      scrollContainer.addEventListener('scroll', toggleScrollButtons);
      
      // Check on window resize
      window.addEventListener('resize', toggleScrollButtons);
    }
  });
  
  // Tabs functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Mobile search toggle
  const searchButton = document.querySelector('.search-button-mobile');
  const searchForm = document.querySelector('.search-form');
  
  if (searchButton && searchForm) {
    searchButton.addEventListener('click', () => {
      searchForm.classList.toggle('active');
      if (searchForm.classList.contains('active')) {
        searchForm.style.display = 'flex';
        searchForm.querySelector('input').focus();
      } else {
        searchForm.style.display = 'none';
      }
    });
  }
  
  // Make navigation links functional
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      link.classList.add('active');
      
      // Prevent default only if href is #
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        // Show a message that this feature is coming soon
        alert('This feature is coming soon!');
      }
    });
  });
  
  // Make footer links functional
  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('This feature is coming soon!');
      });
    }
  });
  
  // Make social links functional
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Social media integration coming soon!');
      });
    }
  });
});

