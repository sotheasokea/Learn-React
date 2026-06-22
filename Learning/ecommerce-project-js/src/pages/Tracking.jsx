import { Header } from '../components/Header';
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Tracking.css'
import dayjs from 'dayjs';

export function Tracking({ cart }){
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  // console.log(params);
  useEffect(() => {
    const fetchOrder = async () =>{
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    fetchOrder();
  }, [orderId]);

  if(!order){
    return null;
  }
  const orderProduct = order.products.find((product) => {
    return product.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassMs/totalDeliveryTimeMs)*100;
  let isPreparing = false;
  let isShipped   = false;
  let isDelivered = false;
  if(deliveryPercent >= 100){
    deliveryPercent = 100;
    isDelivered = true;
  }else if (deliveryPercent >= 33){
    isShipped = true;
  }else{
    isPreparing = true;
  }
  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <Header cart={cart}/>
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {
              deliveryPercent >= 100
              ? "Delivered on "
              : "Arriving on "
            }
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progrss-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progrss-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progrss-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}