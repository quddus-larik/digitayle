"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@libs/utils"
import { Button } from "@components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover"

interface Options {
  label: string
  value: string
}

interface ComboboxProps {
  data: Options[]
  title: string
  value?: string                // controlled value
  defaultValue?: string         // uncontrolled fallback
  onChange?: (val: string) => void
  className?: string
  placeholder?: string
}

export function Combobox({
  data,
  title,
  value: controlledValue,
  defaultValue,
  onChange,
  className,
  placeholder,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  // Internal state only if not controlled
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val)
    }
    onChange?.(val)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? data.find((item) => item.value === value)?.label
            : placeholder || `Select ${title}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${title}`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {title} found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleSelect}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
