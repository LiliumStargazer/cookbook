import React from 'react';
import { Button } from "@/components/ui/button.jsx";
import { ArrowLeft } from "lucide-react";

export default function BackToSearchButton({ onClick, className = "" }) {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            className={`mb-4 ${className}`}
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna alla ricerca
        </Button>
    );
}
