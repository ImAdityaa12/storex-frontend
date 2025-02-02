"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState } from "react";
import { CartProduct } from "@/cartProduct";
import { getCookie } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, QrCode, Smartphone } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import userDetailsStore from "@/store/userDetail";
import AddAddressModal from "@/components/add-address-modal";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function CheckoutPage() {
  const [products, setProducts] = useState<{
    items: CartProduct[];
    total: number;
  }>({ items: [], total: 0 });
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "credit" | "upi" | "bank" | "qr"
  >("qr");
  const { userDetails, setUserDetails, addresses, getUserAddress } =
    userDetailsStore();
  const [loading, setLoading] = useState(false);
  const { cartId } = useCartStore();
  const router = useRouter();
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };
  const getProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}user/cart/`,
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
      const data = await response.json();
      setProducts({
        items: data.items,
        total: data.total,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const createOrder = async () => {
    const toastId = toast.loading("Placing order...");
    try {
      setLoading(true);
      const address = addresses.find(
        (address) => address._id === selectedAddress
      );
      if (!address) {
        throw new Error("Selected address not found");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}user/order/addOrder`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({
            cartId,
            address: {
              ...address,
              addressId: address._id,
            },
            orderStatus: "In Process",
            paymentMethod,
            paymentStatus: paymentMethod === "credit" ? "Paid" : "In Process",
            totalAmount: products.total,
            cartItems: products.items,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setLoading(false);
        toast.success(
          "Order Placed Successfully, Check Your Orders on Account Page",
          { id: toastId }
        );
        if (paymentMethod === "credit") {
          setUserDetails({
            ...userDetails,
            credit: data.credit,
          });
        }
        router.push("/shop");
      } else if (data.success === false) {
        toast.error(data.message, { id: toastId });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!userDetails.approved) {
      router.push("/shop");
    } else {
      getProducts();
      getUserAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ContentLayout title="Place Order">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Items</h2>
            {products?.items?.map((product) => (
              <div
                key={product.productId}
                className="flex items-center space-x-4 mb-4 border-b pb-4"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-600">
                    Quantity: {product.quantity}
                  </p>
                  <p className="text-sm font-semibold">
                    Price: ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
            <div className="text-xl font-bold mt-4">
              Total: ₹{products.total}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAddress || ""}
                onValueChange={handleAddressSelect}
              >
                <ScrollArea className="h-[200px] rounded-md p-4">
                  {addresses.map((address) => (
                    <div
                      key={address._id}
                      className="flex items-center space-x-2 mb-4"
                    >
                      <RadioGroupItem
                        value={address._id}
                        id={`address-${address._id}`}
                      />
                      <Label
                        htmlFor={`address-${address._id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="w-full flex flex-col gap-1">
                          <p>{address.address}</p>
                          <p>
                            {address.city}, {address.pincode}
                          </p>
                          <p>{address.phone}</p>
                          <p className="text-sm text-gray-500">
                            {address.notes}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </ScrollArea>
              </RadioGroup>
              <AddAddressModal
                isNewAddressModalOpen={isNewAddressModalOpen}
                setIsNewAddressModalOpen={setIsNewAddressModalOpen}
              />
            </CardContent>
          </Card>
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
            <Tabs
              defaultValue="qr"
              className="w-full"
              onValueChange={(value) => {
                setPaymentMethod(value as "credit" | "upi" | "bank" | "qr");
              }}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger
                  value="qr"
                  className="flex items-center justify-center"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  <p className="block max-sm:hidden">QR Code</p>
                  <p className="hidden max-sm:block">QR</p>
                </TabsTrigger>
                <TabsTrigger
                  value="bank"
                  className="flex items-center justify-center"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  <p className="block max-sm:hidden">Bank Transfer</p>
                  <p className="hidden max-sm:block">Bank</p>
                </TabsTrigger>
                <TabsTrigger
                  value="upi"
                  className="flex items-center justify-center"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  UPI
                </TabsTrigger>
                <TabsTrigger
                  value="credit"
                  className="flex items-center justify-center max-sm:text-xs"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Credit
                </TabsTrigger>
              </TabsList>
              <TabsContent value="qr" className="mt-4">
                <div className="p-4 rounded-md text-center">
                  <p className="mb-2">Scan the QR code to pay</p>
                  <div className="relative min-h-[20rem] mx-autoflex items-center justify-center">
                    <Image
                      src={"/qr-scan.png"}
                      alt="QR Code"
                      fill
                      className="object-contain"
                      quality={100}
                    />
                    {/* <QrCode className="w-32 h-32 text-gray-400" /> */}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="bank" className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    placeholder="Enter account name"
                    value={"AJIT AGENCIES"}
                    disabled
                    className="disabled:text-white disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={"39726111095"}
                    disabled
                    className="disabled:text-white disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">IFSC Code</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={"SBIN0012476"}
                    disabled
                    className="disabled:text-white disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    placeholder="Enter bank name"
                    value={"State Bank of India"}
                    disabled
                    className="disabled:text-white disabled:opacity-100"
                  />
                </div>
              </TabsContent>
              <TabsContent value="upi" className="mt-4">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="Enter your UPI ID"
                    value={"manojgupta129@upi"}
                    disabled
                    className="disabled:text-white disabled:opacity-100"
                  />
                </div>
              </TabsContent>
              <TabsContent value="credit" className="mt-4">
                <div>
                  <Label htmlFor="credit">Use Credits</Label>
                  <h1 className="text-lg font-semibold" id="credit">
                    Your balance: {userDetails.credit}
                  </h1>
                </div>
              </TabsContent>
            </Tabs>
            <Button
              className="w-full mt-6"
              disabled={!selectedAddress || loading}
              onClick={createOrder}
            >
              Complete Purchase
            </Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
