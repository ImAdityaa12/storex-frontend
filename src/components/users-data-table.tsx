"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { getCookie } from "@/lib/utils";
import { toast } from "sonner";
import { ContentLayout } from "./admin-panel/content-layout";
import CreditChangeModal from "./user-credit-handler/addOrDecreaseCreditModal";

type UserDetails = {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "user";
  phoneNumber: string;
  userName: string;
  credit: number;
  approved: boolean;
};

type CreditAction = "add" | "minus" | undefined;

export default function UserDataTable() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setDebouncedCreditChanges] = useState<{ [key: string]: number }>({});

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleApprovedChange = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/updateApproval/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ approved }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating approval");
    }
    setUsers(
      users.map((user) => (user._id === id ? { ...user, approved } : user))
    );
  };

  const handleRoleChange = async (id: string, role: "admin" | "user") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/updateRole/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ role }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
      }
      setUsers(
        users.map((user) => (user._id === id ? { ...user, role } : user))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreditChange = useCallback(
    async (id: string, credit: number, action?: CreditAction) => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL
          }admin/products/updateCredit/${id}${
            action ? `?action=${action}` : ""
          }`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify({ credit }),
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          toast.success(data.message);
          getAllUsers();
        } else {
          toast.error(data.message);
        }
        setDebouncedCreditChanges((prev) => {
          const newChanges = { ...prev };
          delete newChanges[id];
          return newChanges;
        });
      } catch (error) {
        console.log(error);
        toast.error("Error updating credit");
      }
    },
    []
  );

  const debouncedUpdateCredit = useMemo(() => {
    const debounce = (
      func: (
        id: string,
        credit: number,
        action?: CreditAction
      ) => Promise<void>,
      delay: number
    ) => {
      let timeoutId: NodeJS.Timeout;
      return (id: string, credit: number, action?: CreditAction) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(id, credit, action), delay);
      };
    };

    return debounce(handleCreditChange, 1000);
  }, [handleCreditChange]);

  const getAllUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/users`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreditInput = useCallback(
    (id: string, value: number) => {
      // Update the users state immediately for UI responsiveness
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, credit: value } : user
        )
      );

      // Store the debounced credit change
      setDebouncedCreditChanges((prev) => ({
        ...prev,
        [id]: value,
      }));

      // Trigger debounced update
      debouncedUpdateCredit(id, value, undefined);
    },
    [debouncedUpdateCredit]
  );

  return (
    <ContentLayout title="Users">
      <div className="container mx-auto">
        <div className="mb-4 relative max-w-md ml-auto mr-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="pl-14">Credit</TableHead>
              <TableHead>Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(value: "admin" | "user") =>
                      handleRoleChange(user._id, value)
                    }
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <CreditChangeModal
                    id={user._id}
                    action="minus"
                    handleCreditChange={handleCreditChange}
                  />
                  <Input
                    type="number"
                    value={user.credit}
                    onChange={(e) =>
                      handleCreditInput(user._id, Number(e.target.value))
                    }
                    className="w-[50px] px-0 pl-2"
                  />
                  <CreditChangeModal
                    id={user._id}
                    action="add"
                    handleCreditChange={handleCreditChange}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.approved}
                    onCheckedChange={(checked) =>
                      handleApprovedChange(user._id, checked)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentLayout>
  );
}
