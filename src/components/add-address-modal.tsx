import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { getCookie } from "@/lib/utils";
import userDetailsStore from "@/store/userDetail";

const AddAddressModal = ({
  isNewAddressModalOpen,
  setIsNewAddressModalOpen,
}: {
  isNewAddressModalOpen: boolean;
  setIsNewAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { addresses, getUserAddress } = userDetailsStore();
  const handleNewAddressSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (
      !address.address ||
      !address.city ||
      !address.pincode ||
      !address.phone
    ) {
      return toast.error("Please fill all the fields");
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/address/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify(address),
        }
      );
      if (response.status === 201) {
        toast.success("Address added successfully");
        getUserAddress();
      } else {
        toast.error("Error adding address");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding address");
    }
    setIsNewAddressModalOpen(false);
  };
  const [address, setAddress] = useState<{
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes: string;
  }>({
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  });
  return (
    <Dialog
      open={isNewAddressModalOpen}
      onOpenChange={setIsNewAddressModalOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-4"
          disabled={addresses.length > 2}
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Address
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleNewAddressSubmit} className="space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter your address"
              onChange={(e) =>
                setAddress({ ...address, address: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              placeholder="Enter your pincode"
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes for delivery"
            />
          </div>
          <Button type="submit">Save Address</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
