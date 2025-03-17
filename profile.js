// Import AuthController (assuming it's in a separate file)
// Remove or comment out this line:
// import AuthController from './authController.js';

// Profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile.js loaded")

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  console.log("Profile.js - Login status:", isLoggedIn)
  console.log("Profile.js - Current user:", currentUser)

  if (!isLoggedIn || !currentUser) {
    console.log("Not logged in, redirecting to login page")
    window.location.href = "login.html?redirect=profile.html"
    return
  }

  // Set profile initial
  const profileInitial = document.getElementById("profile-initial")
  const profilePictureInitial = document.getElementById("profile-picture-initial")

  if (profileInitial) {
    profileInitial.textContent = currentUser.username.charAt(0).toUpperCase()
  }

  if (profilePictureInitial) {
    profilePictureInitial.textContent = currentUser.username.charAt(0).toUpperCase()
  }

  // Update profile information
  const usernameEl = document.getElementById("profile-username")
  const emailEl = document.getElementById("profile-email")
  const joinDateEl = document.getElementById("join-date")
  const booksReadEl = document.getElementById("books-read-count")
  const booksReadingEl = document.getElementById("currently-reading-count")
  const booksWantToReadEl = document.getElementById("want-to-read-count")
  const friendsCountEl = document.getElementById("friends-count")
  const listsCountEl = document.getElementById("lists-count")
  const reviewsCountEl = document.getElementById("reviews-count")
  const followingCountEl = document.getElementById("following-count")
  const followersCountEl = document.getElementById("followers-count")
  const bioDisplayEl = document.getElementById("profile-bio-display")

  if (usernameEl) usernameEl.textContent = currentUser.username
  if (emailEl) emailEl.textContent = currentUser.email

  if (joinDateEl) {
    const joinDate = new Date(currentUser.createdAt)
    joinDateEl.textContent = joinDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Set counts with default values if not available
  if (booksReadEl) booksReadEl.textContent = currentUser.booksRead ? currentUser.booksRead.length : 0
  if (booksReadingEl) booksReadingEl.textContent = currentUser.booksReading ? currentUser.booksReading.length : 0
  if (booksWantToReadEl)
    booksWantToReadEl.textContent = currentUser.booksWantToRead ? currentUser.booksWantToRead.length : 0
  if (friendsCountEl) friendsCountEl.textContent = currentUser.friends ? currentUser.friends.length : 0
  if (listsCountEl) listsCountEl.textContent = currentUser.lists ? currentUser.lists.length : 0
  if (reviewsCountEl) reviewsCountEl.textContent = currentUser.reviews ? currentUser.reviews.length : 0
  if (followingCountEl) followingCountEl.textContent = currentUser.following ? currentUser.following.length : 0
  if (followersCountEl) followersCountEl.textContent = currentUser.followers ? currentUser.followers.length : 0

  // Display bio if available
  if (bioDisplayEl && currentUser.bio) {
    bioDisplayEl.innerHTML = `<p>${currentUser.bio}</p>`
  }

  // Initialize profile form
  const profileForm = document.getElementById("profile-form")
  const usernameInput = document.getElementById("profile-username-input")
  const emailInput = document.getElementById("profile-email-input")
  const bioInput = document.getElementById("profile-bio")

  if (profileForm && usernameInput && emailInput) {
    // Set initial values
    usernameInput.value = currentUser.username
    emailInput.value = currentUser.email

    if (bioInput && currentUser.bio) {
      bioInput.value = currentUser.bio
    }

    // Handle form submission
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const updatedData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        bio: bioInput ? bioInput.value.trim() : currentUser.bio,
      }

      // Validate data
      if (!updatedData.username) {
        alert("Username cannot be empty")
        return
      }

      if (!updatedData.email) {
        alert("Email cannot be empty")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(updatedData.email)) {
        alert("Please enter a valid email address")
        return
      }

      // Update profile
      // const result = AuthController.updateProfile(updatedData);
      const storedUsers = JSON.parse(localStorage.getItem("users")) || []
      const userIndex = storedUsers.findIndex((u) => u.email === currentUser.email)

      if (userIndex !== -1) {
        storedUsers[userIndex] = { ...storedUsers[userIndex], ...updatedData }
        localStorage.setItem("users", JSON.stringify(storedUsers))
        localStorage.setItem("currentUser", JSON.stringify(storedUsers[userIndex]))
        alert("Profile updated successfully")
        window.location.reload()
      } else {
        alert("Failed to update profile")
      }

      // if (result.success) {
      //   alert('Profile updated successfully');
      //   window.location.reload();
      // } else {
      //   alert(result.message || 'Failed to update profile');
      // }
    })
  }

  // Handle tab switching
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      const tabId = button.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Add functionality to empty state buttons
  const emptyStateButtons = document.querySelectorAll(".empty-state .button")

  emptyStateButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.getAttribute("href") === "#") {
        e.preventDefault()
        alert("This feature is coming soon!")
      }
    })
  })

  // Add functionality to action buttons
  const actionButtons = document.querySelectorAll(".section-actions .button, .create-list-button, .find-friends-button")

  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("This feature is coming soon!")
    })
  })

  // Sample data for demonstration (uncomment to show examples)
  // Uncomment the following lines to show sample data
  /*
  // Show sample list
  document.querySelector('.sample-list').style.display = 'block';
  document.querySelector('#lists .empty-state').style.display = 'none';
  
  // Show sample friend
  document.querySelector('.sample-friend').style.display = 'flex';
  document.querySelector('#friends .empty-state').style.display = 'none';
  */
})
// Profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile.js loaded")

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  console.log("Profile.js - Login status:", isLoggedIn)
  console.log("Profile.js - Current user:", currentUser)

  if (!isLoggedIn || !currentUser) {
    console.log("Not logged in, redirecting to login page")
    window.location.href = "login.html?redirect=profile.html"
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
  const booksReadEl = document.getElementById("books-read-count")
  const listsCountEl = document.getElementById("lists-count")
  const reviewsCountEl = document.getElementById("reviews-count")
  const followingCountEl = document.getElementById("following-count")
  const followersCountEl = document.getElementById("followers-count")
  const bioDisplayEl = document.getElementById("profile-bio-display")

  if (usernameEl) usernameEl.textContent = currentUser.username

  if (joinDateEl) {
    const joinDate = new Date(currentUser.createdAt)
    joinDateEl.textContent = joinDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Set counts with default values if not available
  if (booksReadEl) booksReadEl.textContent = currentUser.booksRead ? currentUser.booksRead.length : 0
  if (listsCountEl) listsCountEl.textContent = currentUser.lists ? currentUser.lists.length : 0
  if (reviewsCountEl) reviewsCountEl.textContent = currentUser.reviews ? currentUser.reviews.length : 0
  if (followingCountEl) followingCountEl.textContent = currentUser.following ? currentUser.following.length : 0
  if (followersCountEl) followersCountEl.textContent = currentUser.followers ? currentUser.followers.length : 0

  // Display bio if available
  if (bioDisplayEl && currentUser.bio) {
    bioDisplayEl.innerHTML = `<p>${currentUser.bio}</p>`
  }

  // Handle profile navigation
  const profileNavLinks = document.querySelectorAll(".profile-nav-link")

  profileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.classList.contains("active") || link.getAttribute("href") === "profile.html") {
        return // Allow normal navigation for the profile link and already active links
      }

      e.preventDefault()

      // Remove active class from all links
      profileNavLinks.forEach((navLink) => {
        navLink.classList.remove("active")
      })

      // Add active class to clicked link
      link.classList.add("active")

      // If it's a section link, navigate to it
      const href = link.getAttribute("href")
      if (href && href.startsWith("profile-sections.html")) {
        window.location.href = href
      } else {
        // Otherwise show a message that this feature is coming soon
        alert("This section is coming soon!")
      }
    })
  })

  // Handle edit bio button
  const editBioButton = document.querySelector(".edit-bio-button")

  if (editBioButton) {
    editBioButton.addEventListener("click", () => {
      const currentBio = currentUser.bio || ""
      const newBio = prompt("Edit your bio:", currentBio)

      if (newBio !== null) {
        // Update bio in localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = storedUsers.findIndex((u) => u.id === currentUser.id)

        if (userIndex !== -1) {
          storedUsers[userIndex].bio = newBio
          currentUser.bio = newBio

          localStorage.setItem("users", JSON.stringify(storedUsers))
          localStorage.setItem("currentUser", JSON.stringify(currentUser))

          // Update bio display
          if (bioDisplayEl) {
            bioDisplayEl.innerHTML = newBio
              ? `<p>${newBio}</p>`
              : `<p>No bio yet. Add one by clicking the edit button!</p>`
          }
        }
      }
    })
  }

  // Handle follow and message buttons
  const followButton = document.querySelector(".profile-actions button:first-child")
  const messageButton = document.querySelector(".profile-actions button:last-child")

  if (followButton) {
    followButton.addEventListener("click", () => {
      alert("Following feature coming soon!")
    })
  }

  if (messageButton) {
    messageButton.addEventListener("click", () => {
      alert("Messaging feature coming soon!")
    })
  }

  // Handle add book button
  const addBookButton = document.querySelector(".add-book-button")

  if (addBookButton) {
    addBookButton.addEventListener("click", () => {
      alert("Add book feature coming soon!")
    })
  }

  // Handle view all links
  const viewAllLinks = document.querySelectorAll(".view-all-link")

  viewAllLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Full list view coming soon!")
    })
  })
})



