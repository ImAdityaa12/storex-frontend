"use client";

import { useState, useMemo, useEffect } from "react";
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

// const initialUsers: UserDetails[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     image: "/placeholder.svg?height=40&width=40",
//     role: "user",
//     phoneNumber: "123-456-7890",
//     userName: "johnd",
//     credit: 0,
//     approved: false,
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "jane@example.com",
//     role: "admin",
//     phoneNumber: "098-765-4321",
//     userName: "janes",
//     credit: 100,
//     approved: true,
//   },
//   {
//     id: "3",
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     role: "user",
//     phoneNumber: "555-123-4567",
//     userName: "alicej",
//     credit: 50,
//     approved: true,
//   },
// ];

export default function UserDataTable() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleApprovedChange = (id: string, approved: boolean) => {
    setUsers(
      users.map((user) => (user._id === id ? { ...user, approved } : user))
    );
  };

  const handleRoleChange = (id: string, role: "admin" | "user") => {
    setUsers(users.map((user) => (user._id === id ? { ...user, role } : user)));
  };

  const handleCreditChange = (id: string, credit: number) => {
    setUsers(
      users.map((user) => (user._id === id ? { ...user, credit } : user))
    );
  };
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
      console.log(users);
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
  return (
    <div className="container mx-auto py-10">
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
            <TableHead>Credit</TableHead>
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
              <TableCell>
                <Input
                  type="number"
                  value={user.credit}
                  onChange={(e) =>
                    handleCreditChange(user._id, Number(e.target.value))
                  }
                  className="w-[100px]"
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
  );
}
