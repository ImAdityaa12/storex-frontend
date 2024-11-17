"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getCookie } from "@/lib/utils";

// Define the types based on the provided data structure
type Address = {
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
};

type CartItem = {
  productId: string;
  title: string;
  price: string;
  image: string;
  salePrice: number;
  quantity: number;
  _id: string;
};

type Order = {
  address?: Address;
  _id: string;
  userId: string;
  cartItems: CartItem[];
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: string;
  cartId: string;
};

// Sample data
const sampleOrders: Order[] = [
  {
    address: {
      address: "Delhi2",
      city: "Delhi2",
      pincode: "274001",
      phone: "9517111597",
      notes: "Real",
    },
    _id: "673379657df4507279333786",
    userId: "6727a38632657c5e7651d8ab",
    cartItems: [
      {
        productId: "6719db8a8f55aad7bcc065a9",
        title: "SADdsfasd",
        price: "400",
        image: "asdfadsf",
        salePrice: 200,
        quantity: 2,
        _id: "673379657df4507279333787",
      },
    ],
    orderStatus: "In Process",
    paymentMethod: "upi",
    paymentStatus: "In Process",
    totalAmount: 500,
    orderDate: "2024-11-12T15:51:01.691Z",
    cartId: "6732437d90df61d621d537a9",
  },
  {
    _id: "67337bc17df45072793337a1",
    userId: "6727a38632657c5e7651d8ab",
    cartItems: [
      {
        productId: "6727a4bd32657c5e7651d8c4",
        title: "Urban Blaze: Latte",
        price: "35",
        image:
          "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1730651304/adjq96vtquydv1zpicvi.png",
        salePrice: 43124312,
        quantity: 4,
        _id: "67337bc17df45072793337a2",
      },
      {
        productId: "6719dd088f55aad7bcc065ac",
        title: "Inside Out: Boredom",
        price: "799",
        image:
          "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1729748008/l4maljoebrc477lap76t.webp",
        salePrice: 1000,
        quantity: 1,
        _id: "67337bc17df45072793337a3",
      },
    ],
    orderStatus: "In Process",
    paymentMethod: "upi",
    paymentStatus: "In Process",
    totalAmount: 172498248,
    orderDate: "2024-11-12T16:01:05.288Z",
    cartId: "6732437d90df61d621d537a9",
  },
  {
    _id: "67337bfc7df45072793337a5",
    userId: "6727a38632657c5e7651d8ab",
    cartItems: [
      {
        productId: "6727a4bd32657c5e7651d8c4",
        title: "Urban Blaze: Latte",
        price: "35",
        image:
          "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1730651304/adjq96vtquydv1zpicvi.png",
        salePrice: 43124312,
        quantity: 4,
        _id: "67337bfc7df45072793337a6",
      },
      {
        productId: "6719dd088f55aad7bcc065ac",
        title: "Inside Out: Boredom",
        price: "799",
        image:
          "http://res.cloudinary.com/dx1kkvs4z/image/upload/v1729748008/l4maljoebrc477lap76t.webp",
        salePrice: 1000,
        quantity: 1,
        _id: "67337bfc7df45072793337a7",
      },
    ],
    orderStatus: "In Process",
    paymentMethod: "bank",
    paymentStatus: "In Process",
    totalAmount: 172498248,
    orderDate: "2024-11-12T16:02:04.726Z",
    cartId: "6732437d90df61d621d537a9",
  },
];

export default function Component() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  //   const [orders, setOrders] = useState<Order[]>([]);
  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setEditedOrder(order);
    setIsModalOpen(true);
    setIsSubmitEnabled(false);
  };

  const handleStatusChange = (
    value: string,
    field: "paymentStatus" | "orderStatus"
  ) => {
    if (editedOrder) {
      const updatedOrder = { ...editedOrder, [field]: value };
      setEditedOrder(updatedOrder);
      setIsSubmitEnabled(true);
    }
  };

  const handleSubmit = () => {
    if (editedOrder) {
      const updatedOrders = orders.map((order) =>
        order._id === editedOrder._id ? editedOrder : order
      );
      setOrders(updatedOrders);
      setIsModalOpen(false);
      setIsSubmitEnabled(false);
    }
  };

  const getOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/orders`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <ContentLayout title="Orders">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Card
              key={order._id}
              className="cursor-pointer"
              onClick={() => handleOrderClick(order)}
            >
              <CardHeader>
                <CardTitle>Order #{order._id.slice(-6)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total: ${order.totalAmount.toFixed(2)}</p>
                <p>Status: {order.orderStatus}</p>
                <p>Payment: {order.paymentStatus}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(order.orderDate), "PPP")}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold">Order Status</label>
                      <Select
                        value={editedOrder?.orderStatus}
                        onValueChange={(value) =>
                          handleStatusChange(value, "orderStatus")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select order status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In Process">In Process</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="font-semibold">Payment Status</label>
                      <Select
                        value={editedOrder?.paymentStatus}
                        onValueChange={(value) =>
                          handleStatusChange(value, "paymentStatus")
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In Process">In Process</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.cartItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              ${Number(item.price).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <p className="text-lg font-semibold mt-4">
                      Total Amount: ${selectedOrder.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  {selectedOrder.address && (
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p>{selectedOrder.address.address}</p>
                      <p>
                        {selectedOrder.address.city},{" "}
                        {selectedOrder.address.pincode}
                      </p>
                      <p>Phone: {selectedOrder.address.phone}</p>
                      {selectedOrder.address.notes && (
                        <p>Notes: {selectedOrder.address.notes}</p>
                      )}
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={!isSubmitEnabled}>
                    <Edit className="mr-2 h-4 w-4" /> Update Order
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ContentLayout>
  );
}
