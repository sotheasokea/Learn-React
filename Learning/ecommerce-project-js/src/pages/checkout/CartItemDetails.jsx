import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";
export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  function inputNewQuantity(event){
    let newQuantity = event.target.value;
    if(newQuantity <= 0){
      newQuantity = null;
    }
    setQuantity(newQuantity);
  }

  const updateQuantity = async ()=> {
    setIsUpdated(isUpdated? false: true);
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity)
    });
  await loadCart();
  }

  const deleteCartItem = async () =>{
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {
              isUpdated && <input type="number" className="quantity-update-box" 
              value={quantity}
              onChange={inputNewQuantity}
              onKeyDown={(event)=>{if(event.key === "Enter") updateQuantity();}}
              />
            }
            <span className="quantity-label">{!isUpdated && cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >Update</span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >Delete</span>
        </div>
      </div>
    </>
  );
}
