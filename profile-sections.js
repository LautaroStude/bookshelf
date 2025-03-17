// Profile Sections JavaScript
document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile-sections.js loaded")

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  console.log("Profile-sections.js - Login status:", isLoggedIn)
  console.log("Profile-sections.js - Current user:", currentUser)

  if (!isLoggedIn || !currentUser) {
    console.log("Not logged in, redirecting to login page")
    window.location.href = "login.html?redirect=profile-sections.html"
    return
  }

  // Set profile initial
  const profileInitial = document.getElementById("profile-initial")
  if (profileInitial) {
    profileInitial.textContent = currentUser.username.charAt(0).toUpperCase()
  }

  // Update profile information
  const usernameEl = document.getElementById("profile-username")
  const joinDateEl = document.getElementById("join-date")

  if (usernameEl) usernameEl.textContent = currentUser.username

  if (joinDateEl) {
    const joinDate = new Date(currentUser.createdAt)
    joinDateEl.textContent = joinDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get the section from URL parameter
  const urlParams = new URLSearchParams(window.location.search)
  const section = urlParams.get("section") || "books"

  // Show the active section
  showSection(section)

  // Set active navigation link
  const navLinks = document.querySelectorAll(".profile-nav-link")
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.id === `nav-${section}`) {
      link.classList.add("active")
    }
  })

  // Handle section tab switching
  const sectionTabs = document.querySelectorAll(".section-tab")
  sectionTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Get the parent section
      const parentSection = tab.closest(".profile-section")

      // Remove active class from all tabs in this section
      const tabs = parentSection.querySelectorAll(".section-tab")
      tabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Show the corresponding tab content
      const tabId = tab.getAttribute("data-tab")
      const tabContents = parentSection.querySelectorAll(".section-tab-content")
      tabContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === `tab-${tabId}`) {
          content.classList.add("active")
        }
      })
    })
  })

  // Handle add book buttons
  const addBookButtons = document.querySelectorAll(".add-book-button")
  addBookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Add book feature coming soon!")
    })
  })

  // Handle add review button
  const addReviewButton = document.querySelector(".add-review-button")
  if (addReviewButton) {
    addReviewButton.addEventListener("click", () => {
      alert("Write review feature coming soon!")
    })
  }

  // Handle add list button
  const addListButton = document.querySelector(".add-list-button")
  if (addListButton) {
    addListButton.addEventListener("click", () => {
      alert("Create list feature coming soon!")
    })
  }

  // Handle add favorite button
  const addFavoriteButton = document.querySelector(".add-favorite-button")
  if (addFavoriteButton) {
    addFavoriteButton.addEventListener("click", () => {
      alert("Add favorite feature coming soon!")
    })
  }

  // Handle add friend button
  const addFriendButton = document.querySelector(".add-friend-button")
  if (addFriendButton) {
    addFriendButton.addEventListener("click", () => {
      alert("Find friends feature coming soon!")
    })
  }

  // Handle view profile buttons
  const viewProfileButtons = document.querySelectorAll(".friend-actions .button")
  viewProfileButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("View friend profile feature coming soon!")
    })
  })

  // Make profile avatar clickable
  const profileAvatar = document.querySelector(".profile-avatar-link")
  if (profileAvatar) {
    profileAvatar.addEventListener("click", () => {
      window.location.href = "profile.html"
    })
  }
})

// Function to show the selected section
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".profile-section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show the selected section
  const selectedSection = document.getElementById(`section-${sectionName}`)
  if (selectedSection) {
    selectedSection.classList.add("active")
  } else {
    // Default to books section if the requested section doesn't exist
    const booksSection = document.getElementById("section-books")
    if (booksSection) {
      booksSection.classList.add("active")
    }
  }
}
  
  
