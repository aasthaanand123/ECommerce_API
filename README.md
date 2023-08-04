## Ecommerce API endpoints

- **Category Listing**: `GET /categories`

- **Product Listing**: `POST /products`
  Input requires _category id_

- **Product Details**: `POST /product`
  Input requires _product id_
- **Cart Management**:

  1.  **_Update Cart_**: `POST /updateCart`
      Input requires _product Id_ and _quantity_
  2.  **_View Cart_**: `POST /viewCart`

  3.  **_Add to Cart_**: `POST /additems`
      Input requires _product Id_ and _quantity_
  4.  **_Delete from Cart_**: `DELETE /cart/:cartId/items/:itemId/remove`

- **Order Management**:

  1.  **_Order Placement_**:` POST /placeOrder`
      Input requires _cartId_
  2.  **_Order History_**: `POST /orderHistory`

  3.  **_Order Details_**: `POST /orderDetails`
      Input requires _orderid_

- **Authentication and signing up**
  1. **_Sign Up_**: `POST /signUp`
     Input requires _username_ and _password_
  2. **_Login_**: `POST /login`
     Input requires _username_ and _password_

_Certain other endpoints are added from an admin point of view to add new categories or products_
_Before testing this API, kindly install all the dependencies listed in the package json file through the npm install command. After this, it can be successfully tested on API testers like POSTMAN_
