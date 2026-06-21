import { OrderHeader } from "./OrderHeader";
import { OrderDetailsGrid } from "./OrderDetailsGrid";

export function OrdersGrid({ order, loadCart }) {
  return (
    <>
      <div className="order-container">
        <OrderHeader order={order} />

        <OrderDetailsGrid order={order} loadCart={loadCart}/>
      </div>
    </>
  );
}
