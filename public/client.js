(() => {
  window.addEventListener("load", async (event) => {
    // create the feathers application object
    const app = feathers();
   

    // create the feathers REST client
    const restClient = feathers.rest();
    
    // configure the feathers application to use the REST client
    // and the browser's fetch() method
    app.configure(restClient.fetch(window.fetch.bind(window)));

    // Configure authentication - if needed
    app.configure(feathers.authentication());

    // Signup form template with form submission and a link to the login form
    const signupFormTemplate = () => `<div class="login flex min-h-screen bg-neutral justify-center items-center">
      <div class="card w-full max-w-sm bg-base-100 px-4 py-8 shadow-xl">
        <div class="px-4">
          <h1 class="text-2xl font-bold text-center my-5 bg-clip-text bg-gradient-to-br">
            Film Critique Explorer SignUp
          </h1>
          <p class="text-center">Register your account here!</p>
        </div>
        <form class="card-body pt-2" id="signupForm">
          <div class="form-control">
            <label for="email" class="label"><span class="label-text">Email</span></label>
            <input type="text" id="email" name="email" placeholder="enter email" class="input input-bordered">
          </div>
          <div class="form-control mt-0">
            <label for="password" class="label"><span class="label-text">Password</span></label>
            <input type="password" id="password" name="password" placeholder="enter password" class="input input-bordered">
          </div>
          <div class="form-control mt-6"><button id="signup" type="submit" class="btn"> Signup</button></div>
          <!-- Link to the login form -->
          <div class="text-center mt-4">
            Already have an account? <a href="#" id="showLoginForm">Login here</a>.
          </div>
        </form>
        <div id="signupSuccess" class="text-green-600 hidden mt-4">Signup Successful! Redirecting to login...</div>
      </div>
    </div>`;

    // Function to display the signup form
    const showSignupForm = () => {
      document.getElementById('app').innerHTML = signupFormTemplate();

      // Event listener for form submission and signup link
      document.getElementById('signupForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Retrieve the form data
        const userData = {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        };

        try {
          // Use Feathers service to create a new user
          const createdUser = await app.service('users').create(userData);
          console.log('User created successfully:', createdUser);
          
          // Display success message
          document.getElementById('signupSuccess').classList.remove('hidden');
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            document.getElementById('signupSuccess').classList.add('hidden');
            
            // After signup, show the login form
            showLoginForm(); // Call the function to display login form
          }, 3000);
          
        } catch (error) {
          console.error('Error creating user:', error.message);
          // Handle error scenarios here (e.g., display error message to the user)
        }
        
      });

      // Event listener for the "Login here" link
      document.getElementById('showLoginForm').addEventListener('click', function(event) {
        event.preventDefault();
        showLoginForm();
      });
    };

    // Login form template with form submission
    const loginFormTemplate = () => `<div class="login flex min-h-screen bg-neutral justify-center items-center">
    <div class="card w-full max-w-sm bg-base-100 px-4 py-8 shadow-xl">
      <div class="px-4">
        <h1 class="text-2xl font-bold text-center my-5 bg-clip-text bg-gradient-to-br">
          Film Critique Explorer Login
        </h1>
        <p class="text-center">Login your account here!</p>
      </div>
      <form class="card-body pt-2" id="loginForm">
        <div class="form-control">
          <label for="email" class="label"><span class="label-text">Email</span></label>
          <input type="text" id="loginEmail" name="email" placeholder="enter email" class="input input-bordered">
        </div>
        <div class="form-control mt-0">
          <label for="password" class="label"><span class="label-text">Password</span></label>
          <input type="password" id="loginPassword" name="password" placeholder="enter password" class="input input-bordered">
        </div>
        <div class="form-control mt-6"><button id="login" type="submit" class="btn">Login</button></div>
      </form>
      <div class="text-center mt-4">
        Don't have an account? <a href="#" id="showSignupForm">Sign up here</a>.
      </div>
    </div>
  </div>`;

    // Function to display the login form
    const showLoginForm = () => {
      document.getElementById('app').innerHTML = loginFormTemplate();

      // Event listener for form submission
      document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Retrieve the form data
        const loginData = {
          email: document.getElementById('loginEmail').value,
          password: document.getElementById('loginPassword').value
        };

        try {
          // Use Feathers service to authenticate the user
          const authenticatedUser = await app.authenticate({
            strategy: 'local',
            ...loginData
          });
          
          console.log('User authenticated:', authenticatedUser);
          
          // Display success message
          alert('Login Successful!');
          
          // Redirect to another page after success
          window.location.href = '/moview_review.html';
          
        } catch (error) {
          console.error('Error logging in:', error.message);
          // Handle error scenarios here (e.g., display error message to the user)
        }
      });

      // Event listener for the "Back to Signup" link
      document.getElementById('showSignupForm').addEventListener('click', function(event) {
        event.preventDefault();
        showSignupForm();
      });
    };

    // Call the showSignupForm function to display the signup form initially
    showSignupForm();
  });
})();
