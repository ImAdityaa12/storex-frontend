import { useState, useEffect } from "react";
import { OrderTable } from "./order-table";
import { Order } from "./profile-page";

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch orders from your API here
    // For demonstration, we'll use a mock order
    const mockOrder: Order = {
      _id: "12345",
      items: [
        {
          productId: "prod1",
          title: "Sample Product",
          price: "19.99",
          image: "/placeholder.svg?height=100&width=100",
          salePrice: 15.99,
          quantity: 2,
        },
      ],
      total: 31.98,
      status: "Processing",
      date: "2023-05-01",
      address: "123 Main St, City, Country",
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
    };
    setOrders([mockOrder]);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Order Management</h1>
      <OrderTable orders={orders} />
    </div>
  );
}
