import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";

export function FormField({
    id,
    name,
    type = "text",
    label,
    value,
    onChange,
    disabled = false,
    required = false,
    placeholder,
    autoFocus = false,
    className = ""
}) {
    return (
        <div className={`grid gap-2 ${className}`}>
            <Label htmlFor={id || name}>{label}</Label>
            <Input
                id={id || name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                placeholder={placeholder}
                autoFocus={autoFocus}
            />
        </div>
    );
}

export function TextAreaField({
    id,
    name,
    label,
    value,
    onChange,
    disabled = false,
    required = false,
    placeholder,
    rows = 4,
    className = ""
}) {
    return (
        <div className={`grid gap-2 ${className}`}>
            <Label htmlFor={id || name}>{label}</Label>
            <textarea
                id={id || name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                placeholder={placeholder}
                rows={rows}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
        </div>
    );
}
