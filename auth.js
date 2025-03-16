// Auth.js - Complete rewrite with improved error handling and user experience

// User data structure
class User {
  constructor(username, email, password) {
    this.id = Date.now().toString()
    this.username = username
    this.email = email
    this.password = password // In a real app, this would be hashed
    this.createdAt = new Date().toISOString()
    this.booksRead = []
    this.booksReading = []
    this.booksWantToRead = []
    this.profilePicture = null
  }
}

// Auth controller
const AuthController = {
  // Check if user is logged in
  isAuthenticated() {
    try {
      const userData = localStorage.getItem("currentUser")
      if (userData) {
        // Set a flag in localStorage to make it easier to check login status
        localStorage.setItem("isLoggedIn", "true")
        return { isLoggedIn: true, user: JSON.parse(userData) }
      } else {
        localStorage.removeItem("isLoggedIn")
        return { isLoggedIn: false, user: null }
      }
    } catch (error) {
      console.error("Error checking authentication:", error)
      localStorage.removeItem("isLoggedIn")
      return { isLoggedIn: false, user: null }
    }
  },

  // Register a new user
  register(username, email, password) {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if username or email already exists
      const existingUser = users.find((u) => u.username === username || u.email === email)
      if (existingUser) {
        if (existingUser.username === username) {
          return { success: false, message: "Username already exists" }
        } else {
          return { success: false, message: "Email already exists" }
        }
      }

      // Create new user
      const newUser = new User(username, email, password)

      // Add to users array
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Log user in
      localStorage.setItem("currentUser", JSON.stringify(newUser))

      return { success: true, user: newUser }
    } catch (error) {
      console.error("Error during registration:", error)
      return { success: false, message: "Registration failed. Please try again." }
    }
  },

  // Login user
  login(username, password) {
    try {
      // For debugging
      console.log("Attempting login with:", username)
      console.log("Current users in storage:", localStorage.getItem("users"))

      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Log the users for debugging
      console.log("Parsed users:", users)

      // First try exact match
      let user = users.find((u) => u.username === username && u.password === password)

      if (!user) {
        // If no exact match, try case-insensitive username match
        user = users.find((u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password)
      }

      if (!user) {
        // For debugging, show what users we have
        console.log("No matching user found. Available users:")
        users.forEach((u) => console.log(`Username: ${u.username}`))

        return { success: false, message: "Invalid username or password" }
      }

      console.log("Login successful for user:", user.username)
      localStorage.setItem("currentUser", JSON.stringify(user))
      return { success: true, user }
    } catch (error) {
      console.error("Error during login:", error)
      return { success: false, message: "Login failed. Please try again." }
    }
  },

  // Logout user
  logout() {
    try {
      localStorage.removeItem("currentUser")
      return { success: true }
    } catch (error) {
      console.error("Error during logout:", error)
      return { success: false, message: "Logout failed" }
    }
  },

  // Update user profile
  updateProfile(userData) {
    try {
      const { isLoggedIn, user } = this.isAuthenticated()

      if (!isLoggedIn || !user) {
        return { success: false, message: "Not logged in" }
      }

      // Update user data
      const updatedUser = { ...user, ...userData }

      // Update in localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))

      // Update in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u))
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      return { success: true, user: updatedUser }
    } catch (error) {
      console.error("Error updating profile:", error)
      return { success: false, message: "Profile update failed" }
    }
  },

  // Debug helper
  debug() {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null")

      console.log("=== DEBUG INFO ===")
      console.log("Registered Users:", users)
      console.log("Current User:", currentUser)
      console.log("=================")

      return { users, currentUser }
    } catch (error) {
      console.error("Error in debug:", error)
      return { error: "Error retrieving debug info" }
    }
  },
}

// UI Controller
const UIController = {
  // Update header based on authentication status
  updateHeader() {
    const { isLoggedIn, user } = AuthController.isAuthenticated()
    const authContainer = document.getElementById("auth-buttons-container")

    if (!authContainer) return

    if (isLoggedIn && user) {
      // User is logged in, show user menu
      authContainer.innerHTML = `
        <div class="user-menu">
          <button id="user-menu-button" class="user-menu-button">
            <div class="user-avatar">
              <span>${user.username.charAt(0).toUpperCase()}</span>
            </div>
            <span class="username-display">${user.username}</span>
          </button>
          <div id="user-dropdown" class="user-dropdown hidden">
            <a href="profile.html" class="dropdown-item" id="profile-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>My Profile</span>
            </a>
            <a href="#" class="dropdown-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>My Books</span>
            </a>
            <a href="#" class="dropdown-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span>Settings</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" id="logout-button" class="dropdown-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Log Out</span>
            </a>
          </div>
        </div>
      `

      // Add event listeners for user menu
      const menuButton = document.getElementById("user-menu-button")
      const dropdown = document.getElementById("user-dropdown")
      const logoutButton = document.getElementById("logout-button")

      if (menuButton && dropdown) {
        // Toggle dropdown on button click
        menuButton.addEventListener("click", (e) => {
          e.stopPropagation()
          dropdown.classList.toggle("hidden")
        })

        // Close dropdown when clicking elsewhere
        document.addEventListener("click", () => {
          dropdown.classList.add("hidden")
        })

        // Prevent dropdown from closing when clicking inside it
        dropdown.addEventListener("click", (e) => {
          e.stopPropagation()
        })
      }

      // Handle logout
      if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
          e.preventDefault()
          AuthController.logout()
          window.location.href = "index.html"
        })
      }
    } else {
      // User is not logged in, show login/register buttons
      authContainer.innerHTML = `
        <a href="login.html" class="button button-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          Log In
        </a>
        <a href="register.html" class="button button-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Sign Up
        </a>
      `
    }
  },

  // Initialize login form
  initLoginForm() {
    const loginForm = document.getElementById("login-form")
    const messageEl = document.getElementById("message")

    if (!loginForm) return

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value.trim()
      const password = document.getElementById("password").value

      if (!username || !password) {
        this.showMessage(messageEl, "Please fill in all fields", "error")
        return
      }

      const result = AuthController.login(username, password)

      if (result.success) {
        this.showMessage(messageEl, "Login successful! Redirecting...", "success")
        setTimeout(() => {
          window.location.href = "index.html"
        }, 1500)
      } else {
        this.showMessage(messageEl, result.message, "error")
      }
    })
  },

  // Initialize registration form
  initRegisterForm() {
    const registerForm = document.getElementById("register-form")
    const messageEl = document.getElementById("message")

    if (!registerForm) return

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value.trim()
      const email = document.getElementById("email").value.trim()
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value

      // Validate form
      if (!username || !email || !password || !confirmPassword) {
        this.showMessage(messageEl, "Please fill in all fields", "error")
        return
      }

      if (password !== confirmPassword) {
        this.showMessage(messageEl, "Passwords do not match", "error")
        return
      }

      if (password.length < 6) {
        this.showMessage(messageEl, "Password must be at least 6 characters", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        this.showMessage(messageEl, "Please enter a valid email address", "error")
        return
      }

      const result = AuthController.register(username, email, password)

      if (result.success) {
        this.showMessage(messageEl, "Registration successful! Redirecting...", "success")
        setTimeout(() => {
          window.location.href = "index.html"
        }, 1500)
      } else {
        this.showMessage(messageEl, result.message, "error")
      }
    })
  },

  // Initialize profile page
  initProfilePage() {
    const profilePage = document.querySelector(".profile-page")

    if (!profilePage) return

    const { isLoggedIn, user } = AuthController.isAuthenticated()

    if (!isLoggedIn) {
      window.location.href = "profile.html"
      return
    }

    // Update profile information
    const usernameEl = document.getElementById("profile-username")
    const emailEl = document.getElementById("profile-email")
    const joinDateEl = document.getElementById("join-date")
    const booksReadEl = document.getElementById("books-read-count")
    const booksReadingEl = document.getElementById("currently-reading-count")
    const booksWantToReadEl = document.getElementById("want-to-read-count")

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

    if (booksReadEl) booksReadEl.textContent = user.booksRead.length
    if (booksReadingEl) booksReadingEl.textContent = user.booksReading.length
    if (booksWantToReadEl) booksWantToReadEl.textContent = user.booksWantToRead.length
  },

  // Show message helper
  showMessage(element, message, type) {
    if (!element) return

    element.textContent = message
    element.className = `message ${type}`
    element.style.display = "block"

    // Auto hide success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        element.style.display = "none"
      }, 5000)
    }
  },

  // Check if route is protected and redirect if needed
  checkProtectedRoute() {
    const protectedRoutes = ["profile.html"]
    const currentPath = window.location.pathname.split("/").pop() // Get just the filename

    if (protectedRoutes.includes(currentPath)) {
      const { isLoggedIn } = AuthController.isAuthenticated()

      if (!isLoggedIn) {
        window.location.href = "login.html?redirect=" + encodeURIComponent(currentPath)
      }
    }
  },
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if route is protected
  UIController.checkProtectedRoute()

  // Update header based on auth status
  UIController.updateHeader()

  // Initialize forms
  UIController.initLoginForm()
  UIController.initRegisterForm()

  // Initialize profile page if on profile page
  UIController.initProfilePage()

  // Make all auth-related buttons functional
  const loginButtons = document.querySelectorAll('a[href="/login.html"]')
  const registerButtons = document.querySelectorAll('a[href="/register.html"]')

  loginButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      window.location.href = "/login.html"
    })
  })

  registerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      window.location.href = "/register.html"
    })
  })

  // Add debug button for testing
  const debugButton = document.createElement("button")
  debugButton.textContent = "Debug Auth"
  debugButton.style.position = "fixed"
  debugButton.style.bottom = "10px"
  debugButton.style.right = "10px"
  debugButton.style.zIndex = "9999"
  debugButton.style.padding = "5px 10px"
  debugButton.style.backgroundColor = "#f0f0f0"
  debugButton.style.border = "1px solid #ccc"
  debugButton.style.borderRadius = "4px"
  debugButton.style.cursor = "pointer"
  debugButton.style.fontSize = "12px"
  debugButton.style.opacity = "0.7"

  debugButton.addEventListener("click", () => {
    const debug = AuthController.debug()
    console.log("Debug info:", debug)
    alert("Debug info logged to console. Press F12 to view.")
  })

  document.body.appendChild(debugButton)

  // Create a test user if none exists
  if (JSON.parse(localStorage.getItem("users") || "[]").length === 0) {
    console.log("Creating test user...")
    AuthController.register("test", "test@example.com", "password")
    console.log("Test user created. Username: test, Password: password")
  }

  // Make profile link work correctly
  document.addEventListener("click", (e) => {
    if (e.target && (e.target.id === "profile-link" || e.target.closest("#profile-link"))) {
      e.preventDefault()
      const { isLoggedIn } = AuthController.isAuthenticated()
      if (isLoggedIn) {
        window.location.href = "profile.html"
      } else {
        window.location.href = "login.html?redirect=profile.html"
      }
    }
  })
})


