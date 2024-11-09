<h2>Authentication System</h2>

<p>The authentication system of this project is designed with a strong emphasis on security, leveraging industry-standard practices to ensure both user privacy and the integrity of their sessions.</p>

<h3>Key Features:</h3>
<ol>
  <li><strong>JWT-based Authentication:</strong>  
    At the core of the authentication system is the use of <strong>JSON Web Tokens (JWT)</strong>. This stateless mechanism allows the server to securely verify user identities while maintaining scalability. Once logged in, users are issued a JWT that contains the necessary claims to validate their session without needing to store any session data on the server side.
  </li>
  <li><strong>HttpOnly Cookies for Enhanced Security:</strong>  
    To mitigate the risk of <strong>Cross-Site Scripting (XSS)</strong> attacks, the system uses <strong>HttpOnly cookies</strong> for storing the authentication token. These cookies are <strong>inaccessible to JavaScript</strong> running in the browser, making them less susceptible to malicious scripts attempting to steal sensitive information.  
    This secure storage mechanism is complemented by the use of <strong>Secure</strong> and <strong>SameSite</strong> cookie attributes to enforce stricter security measures. With the <strong>Secure</strong> flag enabled, cookies are only sent over <strong>HTTPS</strong> connections, ensuring data is encrypted in transit. The <strong>SameSite</strong> attribute prevents cookies from being sent with cross-site requests, protecting the system from <strong>Cross-Site Request Forgery (CSRF)</strong> attacks.
  </li>
  <li><strong>Refresh Tokens for Extended Sessions:</strong>  
    To provide users with an optimal experience while maintaining security, the system implements a <strong>refresh token</strong> mechanism. This ensures that users stay logged in for extended periods without having to frequently reauthenticate. Once the <strong>access token</strong> expires, the system automatically issues a new one using the stored refresh token, reducing the likelihood of users being logged out unexpectedly.
  </li>
  <li><strong>JWT Expiry and Token Revocation:</strong>  
    JWTs have a built-in expiration time, ensuring that authentication tokens are automatically invalidated after a predefined period. Additionally, the system supports token revocation if needed, allowing administrators to invalidate any active tokens in case of suspicious activity or a security breach.
  </li>
</ol>

<h3>How It Works:</h3>
<ul>
  <li><strong>User Login:</strong>  
    When users provide valid credentials (username and password), the system authenticates them and issues an access token and refresh token. The access token is sent back to the client in an HttpOnly cookie, and the refresh token can be stored securely on the client or sent to the server for further processing.
  </li>
  <li><strong>User Session:</strong>  
    During the user's session, the access token is automatically included in the request headers for API calls to authenticate the user. The system checks the validity of the token before allowing any operations to be performed.
  </li>
  <li><strong>Token Renewal:</strong>  
    When the access token expires, the refresh token is used to request a new access token from the server. The server checks the validity of the refresh token and issues a new access token, extending the session without requiring the user to log in again.
  </li>
</ul>

<h3>Security Benefits:</h3>
<ul>
  <li><strong>Protection Against XSS:</strong>  
    Storing the JWT token in HttpOnly cookies ensures that it is not accessible by client-side JavaScript, making it less vulnerable to attacks like <strong>Cross-Site Scripting (XSS)</strong>.
  </li>
  <li><strong>Protection Against CSRF:</strong>  
    By using the <strong>SameSite</strong> cookie attribute, the system mitigates the risk of <strong>Cross-Site Request Forgery (CSRF)</strong> attacks, which attempt to exploit a user's authenticated session.
  </li>
  <li><strong>Efficient Token Handling:</strong>  
    The use of <strong>JWTs</strong> allows for <strong>stateless authentication</strong>, reducing the risk of server-side session hijacking and improving system scalability. Furthermore, by using short-lived access tokens and refresh tokens for long-term session maintenance, the system ensures that tokens remain valid only for the necessary period.
  </li>
</ul>

<p>With this secure and scalable authentication system, users can have peace of mind knowing that their data is protected while enjoying a seamless, long-lasting session experience.</p>
<h2>Blog API Documentation</h2>

<p>This API allows users to interact with a blog platform by providing routes for authentication, user management, post management, and comments. The system uses <strong>JWT-based authentication</strong> with <strong>HttpOnly cookies</strong> to ensure high security against <strong>XSS</strong> and <strong>CSRF attacks</strong>.</p>

<h3>Authentication Routes</h3>
<p><strong>File:</strong> <code>authRoute.js</code></p>
<ul>
  <li><code>POST /api/register</code> - Register a new user.</li>
  <li><code>POST /api/login</code> - Authenticate a user and issue JWT tokens.</li>
  <li><code>POST /api/logout</code> - Log out the user by clearing cookies.</li>
  <li><code>POST /api/refreshtoken</code> - Refresh the access token using a refresh token.</li>
  <li><code>GET /api/auth/verify</code> - Verify the JWT token and provide user information if authenticated.</li>
</ul>

<h4>Security</h4>
<p>All authentication routes use <strong>JWTs stored in HttpOnly cookies</strong> for enhanced security. This prevents the tokens from being accessible to JavaScript, reducing the risk of token theft through XSS attacks.</p>

<hr>

<h3>User Routes</h3>
<p><strong>File:</strong> <code>userRoute.js</code></p>
<ul>
  <li><code>PUT /api/user/profile/:id</code> - Update a user’s profile information.</li>
  <li><code>GET /api/user/profile/:id</code> - Retrieve information for a specific user profile.</li>
  <li><code>GET /api/user/profile</code> - Get a list of all user profiles (Admin access only).</li>
  <li><code>POST /api/user/profile/upload-photo</code> - Upload a user’s profile photo.</li>
</ul>

<h4>Security</h4>
<p>Each user route is protected with <strong>role-based access control</strong> to restrict certain actions based on user roles. Admins have additional permissions to access or modify all user profiles, whereas regular users can only access and update their own profiles.</p>

<hr>

<h3>Post Routes</h3>
<p><strong>File:</strong> <code>postRoute.js</code></p>
<ul>
  <li><code>GET /api/post/</code> - Retrieve a list of posts.</li>
  <li><code>GET /api/post/:id</code> - Retrieve details for a specific post.</li>
  <li><code>GET /api/post/count</code> - Get the total count of posts.</li>
  <li><code>DELETE /api/post/:id</code> - Delete a post.</li>
  <li><code>PUT /api/post/:id</code> - Update a post.</li>
  <li><code>PUT /api/post/like/:id</code> - Toggle like on a post.</li>
  <li><code>PUT /api/post/image/:id</code> - Update the image associated with a post.</li>
  <li><code>POST /api/post/</code> - Create a new post with an optional image.</li>
</ul>

<h4>Security</h4>
<p>All post-related routes are protected by <strong>JWT authentication</strong>. Only authenticated users can create, like, update, or delete posts. Each action is verified through token validation, ensuring that only authorized users can access or modify posts.</p>

<hr>

<h3>Comment Routes</h3>
<p><strong>File:</strong> <code>commentRoute.js</code></p>
<ul>
  <li><code>POST /api/comment/</code> - Create a new comment on a post.</li>
  <li><code>GET /api/comment/</code> - Retrieve all comments (Admin access only).</li>
</ul>

<h4>Security</h4>
<p>Comments are protected by <strong>JWT authentication</strong>. Only authenticated users can post comments, and only admins can retrieve all comments.</p>

<hr>

<h3>Middleware</h3>
<p>This API includes several middleware functions to enhance security, ensure data integrity, and manage error handling:</p>
<ul>
  <li><code>helmet</code> - Adds security headers to responses.</li>
  <li><code>cors</code> - Configured to allow requests from the specified frontend URL.</li>
  <li><code>express.json</code> - Parses incoming JSON payloads.</li>
  <li><code>xss</code> - Prevents XSS attacks by sanitizing input data.</li>
  <li><code>cookieParser</code> - Parses cookies from incoming requests.</li>
</ul>

<h3>Error Handling</h3>
<p>The API has custom error-handling middleware to handle different errors effectively:</p>
<ul>
  <li><code>errorNotFoundHandler</code> - Returns a 404 error for any unknown route.</li>
  <li><code>errorHandler</code> - Manages all other server errors, sending appropriate HTTP status codes and messages.</li>
</ul>

<h3>How to Start the API</h3>
<p>To start the API, simply run the following command:</p>
<pre><code>node index.js</code></pre>
<p>The server will be running on <strong>localhost:4000</strong>.</p>
<p>Make sure to set up the required <strong>MongoDB connection string</strong> and <strong>JWT_SECRET</strong> in your <code>.env</code> file.</p>

