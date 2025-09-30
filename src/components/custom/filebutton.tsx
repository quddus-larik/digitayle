import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import React from "react"

interface InputFileProps {
  id?: string
  children: React.ReactNode
  className?: string
  accept?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputFile({
  id = "file-input",
  children,
  className = "",
  accept,
  onChange,
}: InputFileProps) {
  return (
    <div className={`grid w-full items-center gap-2 ${className}`}>
      <Label htmlFor={id}>{children}</Label>
      <Input id={id} type="file" accept={accept} onChange={onChange}/>
    </div>
  )
}
