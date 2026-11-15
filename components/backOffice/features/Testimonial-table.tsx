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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { TestimonialSchema } from "@/schemas";

export default function TestimonialsDashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingList, setLoadingList] = useState(true);

  const form = useForm({
    resolver: zodResolver(TestimonialSchema),
    defaultValues: { name: "", role: "", image: "", quote: "" },
  });

  const fetchTestimonials = async () => {
    try {
      setLoadingList(true);
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to load testimonials.");
      setTestimonials(await res.json());
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      if (editingId) {
        const response = await fetch(`/api/testimonials/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Unable to update testimonial.");
        Swal.fire("Updated!", "Testimonial updated successfully", "success");
      } else {
        const response = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Unable to create testimonial.");
        Swal.fire("Created!", "Testimonial created successfully", "success");
      }
      setEditingId(null);
      form.reset({
        name: "",
        role: "",
        image: "",
        quote: "",
      });

      fetchTestimonials();
    } catch (err) {
      Swal.fire(
        "Error",
        err instanceof Error ? err.message : "Something went wrong",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id, isArchived) => {
    Swal.fire({
      title: isArchived ? "Unarchive testimonial?" : "Archive testimonial?",
      text: isArchived
        ? "This will make it visible again"
        : "This will hide it from display",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`/api/testimonials/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isArchived: !isArchived }),
        });
        if (!response.ok) throw new Error("Unable to update testimonial.");
        fetchTestimonials();
        Swal.fire(
          "Done!",
          isArchived ? "Unarchived successfully" : "Archived successfully",
          "success"
        );
      }
    });
  };

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && !t.isArchived) ||
      (filterStatus === "archived" && t.isArchived);
    const matchesSearch = t.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <Card className="rounded-none border-border bg-card text-card-foreground shadow-none">
        <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
          <CardTitle>
            {editingId ? "Edit Testimonial" : "Create Testimonial"}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-5 py-6 sm:px-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}

            <Input placeholder="Role" {...form.register("role")} />
            {form.formState.errors.role && (
              <p className="text-red-500">
                {form.formState.errors.role.message}
              </p>
            )}

            <Input placeholder="Image URL" {...form.register("image")} />
            {form.formState.errors.image && (
              <p className="text-red-500">
                {form.formState.errors.image.message}
              </p>
            )}

            <Textarea placeholder="Quote" {...form.register("quote")} />
            {form.formState.errors.quote && (
              <p className="text-red-500">
                {form.formState.errors.quote.message}
              </p>
            )}

            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingId ? "Update" : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Filter & Search */}
      <div className="flex flex-col gap-3 border-y border-border bg-muted/35 py-4 sm:flex-row sm:items-center">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[280px]"
        />
      </div>

      {/* Table Card */}
      <Card className="rounded-none border-border bg-card text-card-foreground shadow-none">
        <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
          <CardTitle>Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="px-5 py-6 sm:px-6">
          {loadingList ? (
            <Skeleton className="h-10 w-full" />
          ) : filteredTestimonials.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No testimonials found.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Quote</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.role}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {t.quote}
                    </TableCell>
                    <TableCell>
                      <Badge variant={t.isArchived ? "secondary" : "default"}>
                        {t.isArchived ? "Archived" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          form.reset(t);
                          setEditingId(t.id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleArchive(t.id, t.isArchived)}
                      >
                        {t.isArchived ? "Unarchive" : "Archive"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
