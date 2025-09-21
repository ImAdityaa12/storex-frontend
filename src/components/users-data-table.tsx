"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
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

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type UsersResponse = {
  users: UserDetails[];
  pagination: PaginationInfo;
};

type CreditAction = "add" | "minus" | undefined;

export default function UserDataTable() {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [, setDebouncedCreditChanges] = useState<{ [key: string]: number }>({});

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const searchUsers = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/users?search=${encodeURIComponent(searchQuery)}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data: UsersResponse = await response.json();
      if (response.status === 200) {
        setUsers(data.users || []);
        setTotalUsers(data.pagination?.totalUsers || 0);
        setTotalPages(data.pagination?.totalPages || 0);
        console.log('Search results:', data);
      } else {
        toast.error("Failed to search users");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to search users");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const getAllUsers = useCallback(async (page: number = 1, limit: number = 10) => {
    setIsLoadingData(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/users?page=${page}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data: UsersResponse = await response.json();
      if (response.status === 200) {
        setUsers(data.users || []);
        setTotalUsers(data.pagination?.totalUsers || 0);
        setTotalPages(data.pagination?.totalPages || 0);
        console.log('Pagination data:', data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  const handleCreditChange = useCallback(
    async (id: string, credit: number, action?: CreditAction) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL
          }admin/products/updateCredit/${id}${action ? `?action=${action}` : ""
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

          if (searchTerm) {
            searchUsers(searchTerm);
          } else {
            getAllUsers(currentPage, itemsPerPage);
          }
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
    [searchTerm, currentPage, itemsPerPage, searchUsers, getAllUsers]
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

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchUsers(searchTerm);
      } else {
        getAllUsers(currentPage, itemsPerPage);
      }
    }, 500); // 500ms delay for search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, currentPage, itemsPerPage, searchUsers, getAllUsers]);

  // Pagination effect (separate from search)
  useEffect(() => {
    if (!searchTerm) {
      getAllUsers(currentPage, itemsPerPage);
    }
  }, [currentPage, itemsPerPage, searchTerm, getAllUsers]);

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
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search users by name, email, or username..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 focus:border-blue-500 transition-colors"
              disabled={isLoadingData || isSearching}
            />
            {(isSearching) && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          {searchTerm && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Searching for: {searchTerm}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="h-6 px-2 text-xs"
              >
                Clear
              </Button>
            </div>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="pl-20">Credit</TableHead>
              <TableHead>Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(isLoadingData || isSearching) ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  {isSearching ? "Searching users..." : "Loading users..."}
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  {searchTerm
                    ? `No users found matching "${searchTerm}". Try a different search term.`
                    : "No users found."
                  }
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: UserDetails) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={user.image}
                          alt={user.name}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n: string) => n[0])
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
                      className="w-[100px] px-0 pl-2"
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
              ))
            )}
          </TableBody>
        </Table>

        {!isLoadingData && !isSearching && totalUsers > 0 && !searchTerm && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalUsers)} of{" "}
              {totalUsers} users
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoadingData}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current page
                    return (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    );
                  })
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        disabled={isLoadingData}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoadingData}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
