// Import AuthController (assuming it's in a separate file)
// Remove or comment out this line:
// import AuthController from './authController.js';

// Profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  // const { isLoggedIn, user } = AuthController.isAuthenticated();
  // const isLoggedIn = localStorage.getItem("isLoggedIn")
  // const user = JSON.parse(localStorage.getItem("user"))

  // if (!isLoggedIn) {
  //   // And update:
  //   // window.location.href = '/login.html';
  //   window.location.href = "login.html"
  //   return
  // }
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const user = JSON.parse(localStorage.getItem("user"))

  if (!isLoggedIn || !user) {
    window.location.href = "login.html?redirect=profile.html"
    return
  }

  // Set profile initial
  const profileInitial = document.getElementById("profile-initial")
  const profilePictureInitial = document.getElementById("profile-picture-initial")

  if (profileInitial) {
    profileInitial.textContent = user.username.charAt(0).toUpperCase()
  }

  if (profilePictureInitial) {
    profilePictureInitial.textContent = user.username.charAt(0).toUpperCase()
  }

  // Update profile information
  const usernameEl = document.getElementById("profile-username")
  const emailEl = document.getElementById("profile-email")
  const joinDateEl = document.getElementById("join-date")
  const booksReadEl = document.getElementById("books-read-count")
  const booksReadingEl = document.getElementById("currently-reading-count")
  const booksWantToReadEl = document.getElementById("want-to-read-count")
  const friendsCountEl = document.getElementById("friends-count")
  const bioDisplayEl = document.getElementById("profile-bio-display")

  if (usernameEl) usernameEl.textContent = user.username
  if (emailEl) emailEl.textContent = user.email

  if (joinDateEl) {
    const joinDate = new Date(user.createdAt)
    joinDateEl.textContent = joinDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (booksReadEl) booksReadEl.textContent = user.booksRead ? user.booksRead.length : 0
  if (booksReadingEl) booksReadingEl.textContent = user.booksReading ? user.booksReading.length : 0
  if (booksWantToReadEl) booksWantToReadEl.textContent = user.booksWantToRead ? user.booksWantToRead.length : 0
  if (friendsCountEl) friendsCountEl.textContent = user.friends ? user.friends.length : 0

  // Display bio if available
  if (bioDisplayEl && user.bio) {
    bioDisplayEl.innerHTML = `<p>${user.bio}</p>`
  }

  // Initialize profile form
  const profileForm = document.getElementById("profile-form")
  const usernameInput = document.getElementById("profile-username-input")
  const emailInput = document.getElementById("profile-email-input")
  const bioInput = document.getElementById("profile-bio")

  if (profileForm && usernameInput && emailInput) {
    // Set initial values
    usernameInput.value = user.username
    emailInput.value = user.email

    if (bioInput && user.bio) {
      bioInput.value = user.bio
    }

    // Handle form submission
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const updatedData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        bio: bioInput ? bioInput.value.trim() : user.bio,
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
      const userIndex = storedUsers.findIndex((u) => u.email === user.email)

      if (userIndex !== -1) {
        storedUsers[userIndex] = { ...storedUsers[userIndex], ...updatedData }
        localStorage.setItem("users", JSON.stringify(storedUsers))
        localStorage.setItem("user", JSON.stringify(storedUsers[userIndex]))
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
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const user = JSON.parse(localStorage.getItem("user"))

  if (!isLoggedIn) {
    window.location.href = "login.html"
    return
  }

  // Set profile initial
  const profileInitial = document.getElementById("profile-initial")
  if (profileInitial) {
    profileInitial.textContent = user.username.charAt(0).toUpperCase()
  }

  // Update profile information
  const usernameEl = document.getElementById("profile-username")
  const emailEl = document.getElementById("profile-email")
  const joinDateEl = document.getElementById("join-date")
  const booksReadEl = document.getElementById("books-read-count")
  const listsCountEl = document.getElementById("lists-count")
  const reviewsCountEl = document.getElementById("reviews-count")
  const followingCountEl = document.getElementById("following-count")
  const followersCountEl = document.getElementById("followers-count")
  const bioDisplayEl = document.getElementById("profile-bio-display")

  if (usernameEl) usernameEl.textContent = user.username

  if (joinDateEl) {
    const joinDate = new Date(user.createdAt)
    joinDateEl.textContent = joinDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Set counts with default values if not available
  if (booksReadEl) booksReadEl.textContent = user.booksRead ? user.booksRead.length : 0
  if (listsCountEl) listsCountEl.textContent = user.lists ? user.lists.length : 0
  if (reviewsCountEl) reviewsCountEl.textContent = user.reviews ? user.reviews.length : 0
  if (followingCountEl) followingCountEl.textContent = user.following ? user.following.length : 0
  if (followersCountEl) followersCountEl.textContent = user.followers ? user.followers.length : 0

  // Display bio if available
  if (bioDisplayEl && user.bio) {
    bioDisplayEl.innerHTML = `<p>${user.bio}</p>`
  }

  // Handle profile navigation
  const profileNavLinks = document.querySelectorAll(".profile-nav-link")

  profileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      // Remove active class from all links
      profileNavLinks.forEach((navLink) => {
        navLink.classList.remove("active")
      })

      // Add active class to clicked link
      link.classList.add("active")

      // Show a message that this feature is coming soon
      if (link.getAttribute("href") !== "#profile") {
        alert("This section is coming soon!")
      }
    })
  })

  // Handle edit bio button
  const editBioButton = document.querySelector(".edit-bio-button")

  if (editBioButton) {
    editBioButton.addEventListener("click", () => {
      const currentBio = user.bio || ""
      const newBio = prompt("Edit your bio:", currentBio)

      if (newBio !== null) {
        // Update bio in localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || []
        const userIndex = storedUsers.findIndex((u) => u.email === user.email)

        if (userIndex !== -1) {
          storedUsers[userIndex].bio = newBio
          user.bio = newBio

          localStorage.setItem("users", JSON.stringify(storedUsers))
          localStorage.setItem("user", JSON.stringify(user))

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


