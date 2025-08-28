"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";

export default function ConsultationsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [loadingList, setLoadingList] = useState(true);

  const fetchConsultations = () => {
         setLoadingList(true);

    let url = "/api/consultations";
    if (filterStatus !== "ALL") {
      url += `?status=${filterStatus}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      .finally(() =>  setLoadingList(false));
  };

  useEffect(() => {
    fetchConsultations();
  }, [filterStatus]);

  const markAsContacted = async (id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to change the status to "CONTACTED"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: `Yes, change it!`,
    });

    if (!result.isConfirmed) return;

    await fetch(`/api/consultations/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "CONTACTED" }),
      headers: { "Content-Type": "application/json" },
    });
    fetchConsultations();
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Consultations</CardTitle>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {loadingList ? (
          <Skeleton className="h-10 w-full" />
        ) : data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No consultations found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    <Badge>{item.state || "N/A"}</Badge>
                  </TableCell>
                  <TableCell>{item.details || "—"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "CONTACTED" ? "success" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {item.status === "PENDING" && (
                      <Button
                        size="sm"
                        onClick={() => markAsContacted(item.id)}
                      >
                        Mark Contacted
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
