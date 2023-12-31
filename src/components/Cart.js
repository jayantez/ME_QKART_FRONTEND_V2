import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */

const shippingCharges = 0;

//  const cartData = [
//   {
//       "productId": "KCRwjF7lN97HnEaY",
//       "qty": 3
//   },
//   {
//     "productId": "v4sLtEcMpzabRyfx",
//     "qty": 3
// },
//   // More such objects
// ]

// const productsData = [
//   {
//     "name": "iPhone XR",
//     "category": "Phones",
//     "cost": 100,
//     "rating": 4,
//     "image": "https://i.imgur.com/lulqWzW.jpg",
//     "_id": "v4sLtEcMpzabRyfx"
// }, {
//   "name": "iPhone XRs",
//   "category": "Phones",
//   "cost": 100,
//   "rating": 4,
//   "image": "https://i.imgur.com/lulqWzW.jpg",
//   "_id": "KCRwjF7lN97HnEaY"
// }, {
//   "name": "iPhone XR",
//   "category": "Phones",
//   "cost": 100,
//   "rating": 4,
//   "image": "https://i.imgur.com/lulqWzW.jpg",
//   "_id": "KCRwjF7lN97HnEaYc"
// },
// ]
export const generateCartItemsFrom = (cartData, productsData) => {
  let cartItems = [];
  for (let i = 0; i < cartData.length; i++) {
    for (let j = 0; j < productsData.length; j++) {
      if (cartData[i].productId === productsData[j]._id) {
        const cartItem = {
          ...productsData[j],
          ...cartData[i],
        };
        cartItems.push(cartItem);
      }
    }
  }
  //console.log(cartItems)
  return cartItems;
  //  const filterProductList = productsData.filter(product => uniqueProductId.includes(product._id));
  //  return filterProductList;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let totalCost = 0;
  items.forEach((item) => {
    totalCost += item.cost * item.qty;
  });
  return totalCost;
};

const getTotalItems = (items = []) => {
  return items.length;
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 *
 */
const ItemQuantity = ({ value, handleAdd, handleDelete, isReadOnly }) => {
  if(isReadOnly){
    return <Box>Qty: {value}</Box>
  }
  return (
    <Stack direction="row" alignItems="center">
      {!isReadOnly && (
        <IconButton size="small" color="primary" onClick={handleDelete}>
          <RemoveOutlined />
        </IconButton>
      )}
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      {!isReadOnly && (
        <IconButton size="small" color="primary" onClick={handleAdd}>
          <AddOutlined />
        </IconButton>
      )}
    </Stack>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 *
 */
const Cart = ({ products, items = [], handleQuantity, isReadOnly }) => {
  console.log("boolean", isReadOnly);
  const history = useHistory();

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }
  //console.log(items,"222222")
  let itemsInfo = generateCartItemsFrom(items, products);
  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {/* items.map(item => ( */}
        {itemsInfo.map((item) => (
          <Box
            display="flex"
            alignItems="flex-start"
            padding="1rem"
            key={item._id}
          >
            <Box className="image-container">
              <img
                // Add product image
                src={item.image}
                // Add product name as alt eext
                alt={item.name}
                width="100%"
                height="100%"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="6rem"
              paddingX="1rem"
            >
              <div>{item.name}</div>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ItemQuantity
                  // Add required props by checking implementation
                  handleAdd={() => handleQuantity("ADD", item._id, item.qty)}
                  handleDelete={() => handleQuantity("SUB", item._id, item.qty)}
                  value={item.qty}
                  isReadOnly = {isReadOnly}
                />
                <Box padding="0.5rem" fontWeight="700">
                  ${item.cost}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
        {/* )) */}
        {/* ---------------- */}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(itemsInfo)}
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          {!isReadOnly && (
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => {
                history.push("/checkout");
              }}
            >
              Checkout
            </Button>
          )}
        </Box>
      </Box>

    { isReadOnly && <Box className="cart">
        <Box
          color="#3C3C3C"
          display="flex"
          alignItems="flex-start"
          padding="1rem"
          fontSize="2rem"
          fontWeight="700"
        >
          Order Details
        </Box>
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center" fontSize="1.3rem">
            Products
          </Box>
          <Box
            color="#3C3C3C"
            fontSize="1.3rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            {getTotalItems(itemsInfo)}
          </Box>
        </Box>

        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center" fontSize="1.3rem">
            Subtotal
          </Box>
          <Box
            color="#3C3C3C"
            fontSize="1.3rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(itemsInfo)}
          </Box>
        </Box>

        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center" fontSize="1.3rem">
            Shipping Charges
          </Box>
          <Box
            color="#3C3C3C"
            fontSize="1.3rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${shippingCharges}
          </Box>
        </Box>

        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            color="#3C3C3C"
            alignSelf="center"
            fontSize="1.3rem"
            fontWeight="700"
          >
            Total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.3rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(itemsInfo)}
          </Box>
        </Box>
      </Box>}
    </>
  );
};

export default Cart;
