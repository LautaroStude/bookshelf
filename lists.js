// Lists page functionality using localStorage
document.addEventListener("DOMContentLoaded", () => {
    console.log("Lists.js loaded");
    
    // References to DOM elements
    const listsGrid = document.getElementById("lists-grid");
    const listsLoading = document.getElementById("lists-loading");
    const noLists = document.getElementById("no-lists");
    const createListModal = document.getElementById("create-list-modal");
    const createListForm = document.getElementById("create-list-form");
    const createListButtons = document.querySelectorAll("#create-list-button, .create-list-button");
    const closeModalButtons = document.querySelectorAll(".close-modal, .cancel-modal");
    const viewOptions = document.querySelectorAll(".view-option");
    const categoryFilters = document.querySelectorAll(".filter-option input[data-category]");
    const sortOptions = document.querySelectorAll("input[name='sort']");
    
    // Show loading state initially
    showLoading();
    
    // Initialize lists if they don't exist
    if (!localStorage.getItem("bookLists")) {
      // Create sample lists
      const sampleLists = [
        {
          id: "list1",
          title: "Classic Literature",
          description: "The most influential works of literature throughout history",
          category: "fiction",
          privacy: "public",
          userId: "user1",
          username: "German Beder",
          createdAt: "2023-03-15T10:30:00Z",
          updatedAt: "2023-03-15T10:30:00Z",
          books: [
            { id: "book1", title: "Pride and Prejudice", author: "Jane Austen" },
            { id: "book2", title: "To Kill a Mockingbird", author: "Harper Lee" },
            { id: "book3", title: "1984", author: "George Orwell" },
            { id: "book4", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
            { id: "book5", title: "Moby Dick", author: "Herman Melville" }
          ],
          likes: 24,
          views: 128
        },
        {
          id: "list2",
          title: "Science Fiction Essentials",
          description: "Must-read science fiction novels for any fan of the genre",
          category: "science-fiction",
          privacy: "public",
          userId: "user2",
          username: "Joaquin Cavanna",
          createdAt: "2023-04-20T14:15:00Z",
          updatedAt: "2023-04-20T14:15:00Z",
          books: [
            { id: "book6", title: "Dune", author: "Frank Herbert" },
            { id: "book7", title: "Foundation", author: "Isaac Asimov" },
            { id: "book8", title: "Neuromancer", author: "William Gibson" }
          ],
          likes: 18,
          views: 95
        },
        {
          id: "list3",
          title: "Modern Fantasy",
          description: "Contemporary fantasy novels that have defined the genre",
          category: "fantasy",
          privacy: "public",
          userId: "user3",
          username: "Alfredo Montes de Oca",
          createdAt: "2023-05-10T09:45:00Z",
          updatedAt: "2023-05-10T09:45:00Z",
          books: [
            { id: "book9", title: "The Name of the Wind", author: "Patrick Rothfuss" },
            { id: "book10", title: "A Game of Thrones", author: "George R.R. Martin" },
            { id: "book11", title: "The Way of Kings", author: "Brandon Sanderson" },
            { id: "book12", title: "American Gods", author: "Neil Gaiman" }
          ],
          likes: 32,
          views: 147
        },
        {
          id: "list4",
          title: "Essential Biographies",
          description: "Compelling life stories of influential figures",
          category: "biography",
          privacy: "public",
          userId: "user4",
          username: "Lucas Rodriguez",
          createdAt: "2023-06-05T16:20:00Z",
          updatedAt: "2023-06-05T16:20:00Z",
          books: [
            { id: "book13", title: "Steve Jobs", author: "Walter Isaacson" },
            { id: "book14", title: "Becoming", author: "Michelle Obama" },
            { id: "book15", title: "The Diary of a Young Girl", author: "Anne Frank" }
          ],
          likes: 15,
          views: 82
        },
        {
          id: "list5",
          title: "Mystery Thrillers",
          description: "Page-turning mysteries that will keep you guessing",
          category: "mystery",
          privacy: "public",
          userId: "user5",
          username: "Roberto Galati",
          createdAt: "2023-07-12T11:10:00Z",
          updatedAt: "2023-07-12T11:10:00Z",
          books: [
            { id: "book16", title: "Gone Girl", author: "Gillian Flynn" },
            { id: "book17", title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson" },
            { id: "book18", title: "The Silent Patient", author: "Alex Michaelides" }
          ],
          likes: 27,
          views: 113
        }
      ];
      
      localStorage.setItem("bookLists", JSON.stringify(sampleLists));
    }
    
    // Load lists
    loadLists();
    
    // Handle view options (grid/list)
    viewOptions.forEach(option => {
      option.addEventListener("click", () => {
        // Remove active class from all options
        viewOptions.forEach(opt => opt.classList.remove("active"));
        
        // Add active class to clicked option
        option.classList.add("active");
        
        // Set view mode
        const viewMode = option.getAttribute("data-view");
        if (viewMode === "list") {
          listsGrid.classList.add("list-view");
        } else {
          listsGrid.classList.remove("list-view");
        }
      });
    });
    
    // Handle category filters
    categoryFilters.forEach(filter => {
      filter.addEventListener("change", () => {
        if (filter.dataset.category === "all") {
          // If "All Categories" is checked, uncheck others
          if (filter.checked) {
            categoryFilters.forEach(f => {
              if (f.dataset.category !== "all") {
                f.checked = false;
              }
            });
          } else {
            // Don't allow unchecking "All Categories" without selecting another
            filter.checked = true;
          }
        } else {
          // If a specific category is checked, uncheck "All Categories"
          const allCategoriesFilter = document.querySelector("input[data-category='all']");
          allCategoriesFilter.checked = false;
        }
        
        // Reload lists with filters
        showLoading();
        loadLists();
      });
    });
    
    // Handle sort options
    sortOptions.forEach(option => {
      option.addEventListener("change", () => {
        showLoading();
        loadLists();
      });
    });
    
    // Handle create list button clicks
    createListButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
          alert("Please log in to create a list");
          window.location.href = "login.html?redirect=lists.html";
          return;
        }
        
        // Show create list modal
        createListModal.classList.add("active");
      });
    });
    
    // Handle close modal buttons
    closeModalButtons.forEach(button => {
      button.addEventListener("click", () => {
        createListModal.classList.remove("active");
      });
    });
    
    // Close modal when clicking outside
    createListModal.addEventListener("click", (e) => {
      if (e.target === createListModal) {
        createListModal.classList.remove("active");
      }
    });
    
    // Handle create list form submission
    createListForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      
      if (!isLoggedIn || !currentUser) {
        alert("Please log in to create a list");
        return;
      }
      
      const title = document.getElementById("list-title").value.trim();
      const description = document.getElementById("list-description").value.trim();
      const category = document.getElementById("list-category").value;
      const privacy = document.querySelector('input[name="privacy"]:checked').value;
      
      // Create new list
      const newList = {
        id: "list" + Date.now(),
        title: title,
        description: description,
        category: category,
        privacy: privacy,
        userId: currentUser.id,
        username: currentUser.username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        books: [],
        likes: 0,
        views: 0
      };
      
      // Add to lists in localStorage
      const lists = JSON.parse(localStorage.getItem("bookLists") || "[]");
      lists.push(newList);
      localStorage.setItem("bookLists", JSON.stringify(lists));
      
      // Update user's lists
      if (!currentUser.lists) {
        currentUser.lists = [];
      }
      currentUser.lists.push(newList.id);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
      // Update users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        if (!users[userIndex].lists) {
          users[userIndex].lists = [];
        }
        users[userIndex].lists.push(newList.id);
        localStorage.setItem("users", JSON.stringify(users));
      }
      
      alert("List created successfully!");
      createListModal.classList.remove("active");
      createListForm.reset();
      
      // Reload lists
      showLoading();
      loadLists();
    });
    
    // Function to load lists from localStorage
    function loadLists() {
      // Get all lists
      let lists = JSON.parse(localStorage.getItem("bookLists") || "[]");
      
      // Apply category filters
      const selectedCategories = [];
      categoryFilters.forEach(filter => {
        if (filter.checked && filter.dataset.category !== "all") {
          selectedCategories.push(filter.dataset.category);
        }
      });
      
      if (selectedCategories.length > 0) {
        lists = lists.filter(list => selectedCategories.includes(list.category));
      }
      
      // Only show public lists
      lists = lists.filter(list => list.privacy === "public");
      
      // Apply sorting
      const sortValue = document.querySelector("input[name='sort']:checked").value;
      
      if (sortValue === "popular") {
        lists.sort((a, b) => b.likes - a.likes);
      } else if (sortValue === "recent") {
        lists.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortValue === "books") {
        lists.sort((a, b) => (b.books ? b.books.length : 0) - (a.books ? a.books.length : 0));
      }
      
      // Check if there are any lists
      if (lists.length === 0) {
        showNoLists();
        return;
      }
      
      // Clear lists grid
      listsGrid.innerHTML = "";
      
      // Add lists to grid
      lists.forEach(list => {
        const listCard = createListCard(list);
        listsGrid.appendChild(listCard);
      });
      
      hideLoading();
    }
    
    // Function to create a list card element
    function createListCard(list) {
      const listCard = document.createElement("div");
      listCard.className = "list-card";
      listCard.setAttribute("data-id", list.id);
      
      // Format date
      const createdDate = new Date(list.createdAt);
      const formattedDate = createdDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      
      // Get book count
      const bookCount = list.books ? list.books.length : 0;
      
      // Create HTML for list card
      listCard.innerHTML = `
        <div class="list-header">
          <h3 class="list-title">${list.title}</h3>
          <div class="list-meta">
            <div class="list-creator">
              <div class="creator-avatar">${list.username.charAt(0).toUpperCase()}</div>
              <span>${list.username}</span>
            </div>
            <span>${formattedDate}</span>
          </div>
        </div>
        
        <div class="list-preview">
          ${bookCount > 0 ? generateBookCovers(list.books) : '<div class="list-book-cover-more">Empty</div>'}
        </div>
        
        <div class="list-footer">
          <div class="list-stats">
            <div class="list-stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>${bookCount} books</span>
            </div>
            <div class="list-stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span>${list.likes || 0} likes</span>
            </div>
          </div>
          <div class="list-actions">
            <button class="list-action view-list" data-id="${list.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View
            </button>
            <button class="list-action like-list" data-id="${list.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              Like
            </button>
          </div>
        </div>
      `;
      
      // Add event listeners to the list card
      const viewButton = listCard.querySelector(".view-list");
      const likeButton = listCard.querySelector(".like-list");
      
      viewButton.addEventListener("click", () => {
        alert("View list feature coming soon!");
        // In a real implementation, you would redirect to a list detail page
        // window.location.href = `list-detail.html?id=${list.id}`;
      });
      
      likeButton.addEventListener("click", () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
          alert("Please log in to like lists");
          return;
        }
        
        // Toggle like
        const lists = JSON.parse(localStorage.getItem("bookLists") || "[]");
        const listIndex = lists.findIndex(l => l.id === list.id);
        
        if (listIndex !== -1) {
          lists[listIndex].likes = (lists[listIndex].likes || 0) + 1;
          localStorage.setItem("bookLists", JSON.stringify(lists));
          
          // Update like count in UI
          const likeCount = listCard.querySelector(".list-stat:nth-child(2) span");
          likeCount.textContent = `${lists[listIndex].likes} likes`;
          
          // Disable like button
          likeButton.disabled = true;
          likeButton.style.opacity = "0.5";
        }
      });
      
      return listCard;
    }
    
    // Function to generate book covers HTML
    function generateBookCovers(books) {
      if (!books || books.length === 0) {
        return '<div class="list-book-cover-more">Empty</div>';
      }
      
      let coversHTML = '';
      
      // Show up to 4 book covers
      const maxCovers = Math.min(books.length, 4);
      for (let i = 0; i < maxCovers; i++) {
        coversHTML += `<div class="list-book-cover" style="background-image: url('/placeholder.svg?height=150&width=100');"></div>`;
      }
      
      // If there are more books, show a "more" indicator
      if (books.length > 4) {
        coversHTML += `<div class="list-book-cover-more">+${books.length - 4}</div>`;
      }
      
      return coversHTML;
    }
    
    // Function to show loading state
    function showLoading() {
      listsLoading.style.display = "flex";
      listsGrid.style.display = "none";
      noLists.style.display = "none";
    }
    
    // Function to hide loading state
    function hideLoading() {
      listsLoading.style.display = "none";
      listsGrid.style.display = "grid";
      noLists.style.display = "none";
    }
    
    // Function to show no lists state
    function showNoLists() {
      listsLoading.style.display = "none";
      listsGrid.style.display = "none";
      noLists.style.display = "flex";
    }
    
    // Handle pagination (simplified for demo)
    const paginationButtons = document.querySelectorAll(".pagination-button, .pagination-page");
    paginationButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (button.disabled) return;
        
        // Remove active class from all pages
        document.querySelectorAll(".pagination-page").forEach(page => {
          page.classList.remove("active");
        });
        
        // If it's a page button, make it active
        if (button.classList.contains("pagination-page")) {
          button.classList.add("active");
        }
        
        // Scroll to top of lists
        window.scrollTo({
          top: listsGrid.offsetTop - 100,
          behavior: "smooth"
        });
      });
    });
  });