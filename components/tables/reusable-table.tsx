import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, FolderOpen, LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Select, SelectItem, SelectContent, SelectTrigger } from "../ui/select";
import Pagination from "./pagination";
import DeleteDialog from "../dialog/delete-dialog";
import { useState } from "react";

export type Column = {
  header: string;
  accessorKey: string;
};

export type TableOption = {
  label: string;
  type?: "delete";
  icon: LucideIcon;
  action?: (id: string) => void;
};

interface ReusableTableProps<T extends { id: string }> {
  data: T[];
  columns: Column[];

  /* Optional */
  table_options?: TableOption[];
  onDeleteConfirm?: (id: string) => Promise<void> | void;
  deleteLoading?: boolean;
  className?: string;

  /* Pagination */
  totalItems: number;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
}

function ReusableTable<T extends { id: string }>({
  data,
  columns,
  totalItems,
  page,
  setPage,
  pageSize,
  setPageSize,
  table_options,
  onDeleteConfirm,
  deleteLoading = false,
  className,
}: ReusableTableProps<T>) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openDeleteDialog = (id: string) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedId || !onDeleteConfirm) return;
    await onDeleteConfirm(selectedId);
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  return (
    <section className={className}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, i) => (
              <TableHead
                key={String(column.accessorKey)}
                className={i === columns.length - 1 ? "text-right" : ""}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {totalItems === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-40">
                <div className="flex flex-col items-center justify-center h-full gap-4 opacity-30">
                  <FolderOpen size={40} strokeWidth={1} />
                  <span>No Data Found!</span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, i) => (
              <TableRow key={i}>
                {columns.map((column, j) => (
                  <TableCell
                    key={j}
                    className={
                      j === columns.length - 1 ? "text-right py-4" : "py-4"
                    }
                  >
                    {column.accessorKey === "action" ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full">
                          <Ellipsis className="h-9 w-9 p-2.5 rounded-full dark:hover:bg-white/10 hover:bg-gray-200 tr" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {table_options?.map((option, idx) => (
                            <DropdownMenuItem
                              key={idx}
                              onClick={() =>
                                option.type === "delete"
                                  ? openDeleteDialog(item.id)
                                  : option.action?.(item.id)
                              }
                            >
                              <option.icon className="mr-0.5 !h-3.5 !w-3.5 opacity-60" />
                              {option.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      (item[column.accessorKey as keyof T] as React.ReactNode)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalItems > pageSize && (
        <div className="flbx mt-8">
          <div className="flx gap-4">
            <Select
              value={String(pageSize)}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger>{pageSize}</SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm px-2 text-muted-foreground">
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, totalItems)} of {totalItems} items
            </p>
          </div>

          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            total={totalItems}
          />
        </div>
      )}

      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={handleConfirm}
        isLoading={deleteLoading}
      />
    </section>
  );
}

export default ReusableTable;
