import axios from "axios";
import { useState, useEffect} from "react";
import { Header } from "../../components/Header";
import "./Orders.css";
import { OrdersGrid } from "./OrdersGrid";

export function Orders({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchProducts = async () =>{
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return <OrdersGrid key ={order.id} order={order} loadCart={loadCart}/>
          })}
        </div>
      </div>
    </>
  );
}
