import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = Object.keys(cartItems).reduce((acc, itemId) => {
    const item = food_list.find(item => item._id === itemId);
    return item ? acc + (item.price * cartItems[itemId]) : acc;
  }, 0);

  const deliveryFee = 2; // Assuming a fixed delivery fee
  const total = subtotal + deliveryFee;

  return (
    <div className='cart'>
      <div className="cart-items-title">
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />

      {food_list && food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          return (
            <div key={item._id} className="cart-items-title cart-items-item">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <p>{cartItems[item._id]}</p>
              <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
              <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
              <hr />
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promocode' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
