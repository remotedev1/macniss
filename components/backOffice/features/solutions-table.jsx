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
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SolutionsSchema } from "@/schemas";
import { Loader } from "@/components/common/Loader";
import { ImageUpload } from "./Image-upload";

export default function SolutionsDashboard() {
  const [solutions, setSolutions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingList, setLoadingList] = useState(true);

  const form = useForm({
    resolver: zodResolver(SolutionsSchema),
    defaultValues: { title: "", description: "", image: "" },
  });

  const fetchSolutions = async () => {
    try {
      setLoadingList(true);
      const res = await fetch("/api/solutions");
      if (!res.ok) throw new Error("Failed to fetch solutions");
      const data = await res.json();
      setSolutions(data);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(values).forEach(([key, val]) => {
        if (key === "image") {
          val.forEach((file) => formData.append("image", file));
        } else {
          formData.append(
            key,
            typeof val === "string" ? val : JSON.stringify(val)
          );
        }
      });

      const url = editingId ? `/api/solutions/${editingId}` : "/api/solutions";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Failed to save solution");

      setEditingId(null);
      form.reset({
        title: "",
        description: "",
        image: "",
      });

      fetchSolutions();

      Swal.fire(
        editingId ? "Updated!" : "Created!",
        `Solution ${editingId ? "updated" : "created"} successfully.`,
        "success"
      );
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id, isArchived) => {
    Swal.fire({
      title: isArchived ? "Unarchive solution?" : "Archive solution?",
      text: isArchived
        ? "This will make it visible again"
        : "This will hide it from display",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/solutions/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isArchived: !isArchived }),
          });
          if (!res.ok) throw new Error("Failed to update archive status");
          fetchSolutions();
          Swal.fire(
            "Done!",
            isArchived ? "Unarchived successfully" : "Archived successfully",
            "success"
          );
        } catch (err) {
          Swal.fire("Error", err.message || "Something went wrong", "error");
        }
      }
    });
  };

  const filteredSolutions = solutions.filter((t) => {
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && !t.isArchived) ||
      (filterStatus === "archived" && t.isArchived);
    const matchesSearch = t.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? "Edit Solution" : "Create Solution"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Input placeholder="Title" {...form.register("title")} />
              {form.formState.errors.title && (
                <p className="text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
              <Input
                placeholder="Description"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}

              {/* Image */}
              <div className="col-span-2">
                <ImageUpload name="image" multiple={false} />
              </div>

              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {form.formState.isSubmitting ? (
                <Loader />
              ) : (
                <Button type="submit" className="flex-1">
                  {editingId ? "Update" : "Create"}
                </Button>
              )}
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {/* Filter & Search */}
      <div className="flex items-center gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search Solutions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[250px]"
        />
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>Solutions</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingList ? (
            <Skeleton className="h-10 w-full" />
          ) : filteredSolutions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No Solutions found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Desc</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSolutions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.title}</TableCell>
                    <TableCell>
                      {t.description.length > 5
                        ? `${t.description.slice(0, 5)}...`
                        : t.description}
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
