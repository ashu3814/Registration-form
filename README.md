# Registration-form

This is a registration form application built with Node.js and Express.js. It allows users to sign up, log in, and access a protected service page. User data is stored in a MongoDB database using Mongoose. Passwords are hashed using bcrypt for security.

## Prerequisites

Make sure you have the following installed before running the application:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/ashu3814/Registration-form.git
   ```

2. Navigate to the project directory:

   ```shell
   cd Registration-form
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the project's root directory and provide the following variables:

   ```plaintext
   DB_CONNECTION=<your_mongodb_connection_string>
   ```

## Usage

1. Start the server:

   ```shell
   npm start
   ```

   The server will start running on port 3000.

2. Open your web browser and navigate to `http://localhost:3000`.

3. Sign up with a new account by providing your name, email, phone number, password, and confirm password.

4. Log in with your email and password to access the service page.

5. Click on the "Logout" link to log out and clear your session.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

```
