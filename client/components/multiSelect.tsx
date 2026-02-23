"use client";

import { useState, KeyboardEvent } from "react";
import { Check, ChevronsUpDown, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  createLabel?: string; // e.g. "Add software"
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select or type to add...",
  createLabel = "Add",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const trimmed = search.trim();

  // Options not yet selected
  const filtered = options.filter(
    (o) => !value.includes(o) && o.toLowerCase().includes(trimmed.toLowerCase())
  );

  // Show "create" option only if typed value isn't already an option or selected
  const canCreate =
    trimmed.length > 0 &&
    !options.some((o) => o.toLowerCase() === trimmed.toLowerCase()) &&
    !value.some((v) => v.toLowerCase() === trimmed.toLowerCase());

  function select(item: string) {
    onChange([...value, item]);
    setSearch("");
  }

  function remove(item: string) {
    onChange(value.filter((v) => v !== item));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    // Allow creating by pressing Enter when canCreate
    if (e.key === "Enter" && canCreate) {
      e.preventDefault();
      select(trimmed);
    }
    // Remove last tag on Backspace when input is empty
    if (e.key === "Backspace" && trimmed === "" && value.length > 0) {
      remove(value[value.length - 1]);
    }
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal h-auto min-h-9 py-1.5 px-3"
          >
            <span className="text-muted-foreground text-sm">{placeholder}</span>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search or type to create..."
              value={search}
              onValueChange={setSearch}
              onKeyDown={handleKeyDown}
            />
            <CommandList>
              {/* Create option */}
              {canCreate && (
                <CommandGroup heading="Create new">
                  <CommandItem
                    value={trimmed}
                    onSelect={() => select(trimmed)}
                    className="gap-2"
                  >
                    <Plus className="size-3.5 text-primary" />
                    {createLabel} &ldquo;{trimmed}&rdquo;
                  </CommandItem>
                </CommandGroup>
              )}

              {/* Preset options */}
              {filtered.length > 0 && (
                <CommandGroup heading="Suggestions">
                  {filtered.map((option) => (
                    <CommandItem
                      key={option}
                      value={option}
                      onSelect={() => select(option)}
                      className="gap-2"
                    >
                      <Check
                        className={cn(
                          "size-3.5",
                          value.includes(option) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!canCreate && filtered.length === 0 && (
                <CommandEmpty>No options found.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="gap-1 pr-1 font-normal"
            >
              {item}
              <button
                type="button"
                onClick={() => remove(item)}
                className="rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                aria-label={`Remove ${item}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}