"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export function PasswordInput({
  id,
  name,
  placeholder = "••••••••",
  required,
  className,
}: {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Lock className="size-4 text-gray-400" />
      </div>
      <input
        type={show ? "text" : "password"}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        className={className}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-0 pr-4 flex items-center"
        tabIndex={-1}
      >
        {show ? (
          <EyeOff className="size-4 text-gray-400 hover:text-gray-600 transition-colors" />
        ) : (
          <Eye className="size-4 text-gray-400 hover:text-gray-600 transition-colors" />
        )}
      </button>
    </div>
  );
}
