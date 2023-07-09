
# DD Product

This is an ecommerce website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It includes various features such as an admin panel, payment gateway integration with Razorpay, add to cart functionality, single product page, and category-wise product listings. The project includes several models, including the user model, product model, category model, order model, and cart model.


## Models

1. User Model: The user model stores information about registered users, including their username, email address, password (encrypted), and any additional details required for user authentication and authorization.

2. Product Model: The product model represents individual products available for sale on the ecommerce site. It includes attributes such as title, description, price, images, category, and other relevant information.

3. Category Model: The category model represents the different categories or product groups available on the website. Each category has a name and may contain multiple products.

4. Order Model: The order model stores information about orders placed by users, including the user who placed the order, the products ordered, quantities, total price, and other relevant details.

5. Cart Model: The cart model represents the shopping cart functionality. It stores information about the products added by users, their quantities, and associated user details.
## API Reference

#### Auth routes


User Routes - prefix  : /api/v1/auth
- POST /register: Register a new user.
- POST /login: Authenticate and log in a user.
- GET /user-auth: Auhtenticate user using middleware.
- GET /admin-auth: Authenticate admin using admin middleware.
- GET /forget-password: forget password for user as well as admin.
- PUT /update-profile: update her own profile for the login user and admin.

Product Routes: - prefix : /api/v1/products
- POST /create-product: create product(admin only).
- GET /get-product: get all products.
- GET /get-product/:id: for fetching single product using product id.
- GET /product-photo/:pid: fetching single product image using image id.
- DELETE /delete-product/:pid : delete product (admin only).
- PUT /update-product/:pid : Update product (admin only).
- POST /product-filter : filter product.
- GET /product-count : count total product for specific page.
- GET /product-list/:page : fetching current page for load more product.
- GET /search/:keyword : search product using keyword.
- GET /similar-product/:pid/:cid : fetch similar product using same category.

Category Routes: - prefix : /api/v1/category
- POST /create-category: create a new category(admin only).
- PUT /update-category/:id : update existing category.
- GET /get-all-category: get all category.
- GET /get-single-category/:slug : fetching single category using category id.
- DELETE /delete-category/:id : delete existing category (admin only).

Cart Routes: - prefix : /api/v1/cart
- POST /add-to-cart : create a new cart item.
- GET /get-all-cart: get all cart of loged in user.
- POST /delete-single-cart : delete single cart item for user.

Payment Routes: - prefix : /api/v1/payment
- POST /checkout: payment checkout.
- POST /payment-verification : for verify payment is done or not.
- GET /all-order: fetch all order of single user.
- GET /all-admin-order : fetch all order of all user (admin user).
- PUT /order-status/:orderId : checkin the current status of specific order.
- POST /search-order : for searching single order.
- GET /get-key : for getting razorpay key for payment system.
## Tech Stack
- Front-end :
    - React.js: JavaScript library for building user interfaces
    - Context api: State management library for JavaScript apps
    - React Router: Declarative routing for React applications
    - HTML5 and CSS3: Markup and styling
- Back-end:
    - Node.js: JavaScript runtime environment
    - Express.js: Web application framework for Node.js
    - MongoDB: NoSQL database for storing product, user, and order data
    - Mongoose: Object Data Modeling (ODM) library for MongoDB
- Other tools and libraries:
    - Axios : Promise-based HTTP client for making API requests
    - JWT : JSON Web Tokens for user authentication
    - bcrypt : Password hashing library
    - Razorpay: Payment processing integration
## Installation

Install my-project with npm

```bash
git clone https://github.com/vickykrsingh/E-com.git
cd E-com
npm install
cd ../client
npm install
npm start
```
    ## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=your-port`

`MODE=mode`

`MONGO_URL=your-mongodb-atlas-connection-string`

`JWT_SECRET=your-jwt-secret`

`RAZORPAY_KEY_ID=your-razorpay-key`

`RAZORPAY_KEY_SECRET=your-razorpay-secret`

## Contributing
Contributions to the Ecommerce MERN Stack Website are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request. Make sure to follow the code style and guidelines defined in the repository.



## License

This project is licensed under the MIT License.


## Acknowledgements

This Ecommerce MERN Stack Website was inspired by various online tutorials and examples. Special thanks to the authors and contributors of the open-source libraries used in this project.

Feel free to reach out to the project maintainers with any questions or feedback. Happy coding!

