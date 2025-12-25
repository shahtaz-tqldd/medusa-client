import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "../ui/icon-button";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
  limit?: number;
}

const Pagination = ({
  page,
  setPage,
  totalCount,
  limit = 10,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / limit);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  const handlePrevious = () => {
    if (hasPrevious) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setPage(page + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flx gap-4 justify-center py-6">
      <IconButton icon={ChevronLeft} onClick={handlePrevious} />
      <div className="text-sm text-muted-foreground">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>
      <IconButton icon={ChevronRight} onClick={handleNext} />
    </div>
  );
};

export default Pagination;
