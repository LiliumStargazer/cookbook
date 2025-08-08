import React from "react";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function AuthForm({
  fields = [],
  onSubmit,
  loading = false,
  buttonText,
  extraButtons = null,
  children,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full rounded-lg shadow-lg bg-white p-8">
      {fields.map((field) => (
        <div key={field.id || field.name} className="flex flex-col">
          <Label
            htmlFor={field.id || field.name}
            className="text-sm font-medium text-gray-700 mb-2"
          >
            {field.label}
          </Label>
          {field.id === 'favoriteDishes' ? (
            <textarea
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              className="w-full rounded-lg border border-gray-300 p-4 text-lg min-h-[80px] resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              style={{ resize: 'none' }}
              rows={4}
            />
          ) : (
            <Input
              id={field.id || field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              autoFocus={field.autoFocus}
              className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          )}
        </div>
      ))}
      {children}
      <Button type="submit" className="w-full rounded-lg" variant="destructive" disabled={loading}>
        {loading ? "..." : buttonText}
      </Button>
      {extraButtons}
    </form>
  );
}
