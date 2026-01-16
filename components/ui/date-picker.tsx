"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  label: string;
  id?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  required?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

export function DatePicker({
  label,
  id,
  value,
  onChange,
  disabled = false,
  placeholder = "Select date",
  className = "",
  required = false,
  maxDate,
  minDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    if (onChange) {
      onChange(date);
    }
    setOpen(false);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span
            id={id}
            className="flbx cursor-pointer border dark:border-white/20 border-gray-200 py-2 px-3 rounded-lg"
          >
            {value ? value.toLocaleDateString() : placeholder}
            <CalendarIcon className="h-4 w-4" />
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            disabled={disabled}
            defaultMonth={value || new Date()}
            toDate={maxDate}
            fromDate={minDate}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
