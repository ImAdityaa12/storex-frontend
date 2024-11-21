"use client";
export interface OrderItem {
  productId: string;
  title: string;
  price: string;
  image: string;
  salePrice: number;
  quantity: number;
}
export interface Address {
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
  _id: string;
}
export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  date: string;
  address: {
    addressId: string;
    address: string;
    city: string;
    notes: string;
    phone: string;
    pincode: string;
  };
  paymentMethod: string;
  paymentStatus: string;
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCookie } from "@/lib/utils";
import userDetailsStore from "@/store/userDetail";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useStore } from "zustand";
import AddAddressModal from "./add-address-modal";
import { OrderTable } from "./order-table";

export default function ProfilePage() {
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const { userDetails, addresses, getUserAddress } = useStore(userDetailsStore);
  const [orders, setOrders] = useState<Order[]>([]);
  const getUserOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}user/order/getUserOrder`,
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 200) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Fetch orders from your API here
    // For demonstration, we'll use a mock order
    // const mockOrder: Order = {
    //   _id: "12345",
    //   items: [
    //     {
    //       productId: "prod1",
    //       title: "Sample Product",
    //       price: "19.99",
    //       image: "/placeholder.svg?height=100&width=100",
    //       salePrice: 15.99,
    //       quantity: 2,
    //     },
    //   ],
    //   total: 31.98,
    //   status: "Processing",
    //   date: "2023-05-01",
    //   address: {
    //     addressId: "12345",
    //     address: "123 Main St",
    //     city: "Anytown",
    //     notes: "Special instructions",
    //     phone: "555-1234",
    //     pincode: "12345",
    //   },
    //   paymentMethod: "Credit Card",
    //   paymentStatus: "Paid",
    // };
    // setOrders([mockOrder]);
    getUserOrders();
  }, []);
  useEffect(() => {
    getUserAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={userDetails.image} alt={userDetails.name} />
          <AvatarFallback>
            {userDetails.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-3xl">{userDetails.name}</CardTitle>
          <p className="text-muted-foreground">@{userDetails.userName}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Username
                </dt>
                <dd className="text-sm">{userDetails.userName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Email
                </dt>
                <dd className="text-sm">{userDetails.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Phone Number
                </dt>
                <dd className="text-sm">{userDetails.phoneNumber}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Addresses</h3>
            {addresses.map((address, index) => (
              <AddressCard key={index} address={address} />
            ))}
            <AddAddressModal
              isNewAddressModalOpen={isNewAddressModalOpen}
              setIsNewAddressModalOpen={setIsNewAddressModalOpen}
            />
          </div>
        </div>
        <OrderTable orders={orders} />
      </CardContent>
    </Card>
  );
}

function AddressCard({ address }: { address: Address }) {
  const { getUserAddress } = useStore(userDetailsStore);
  const deleteAddress = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/address/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 200) {
        toast.success("Address deleted successfully");
      }
      getUserAddress();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="mb-4">
      <CardContent className="relative pt-6">
        <X
          className="absolute right-2 top-2 cursor-pointer text-red-400 hover:bg-red-600 rounded-full hover:text-white p-1 transition-all"
          onClick={() => deleteAddress(address._id)}
        />
        <p className="font-medium">{address.address}</p>
        <p>
          {address.city}, {address.pincode}
        </p>
        <p>Phone: {address.phone}</p>
        {address.notes && (
          <p className="text-sm text-muted-foreground mt-2">{address.notes}</p>
        )}
      </CardContent>
    </Card>
  );
}
