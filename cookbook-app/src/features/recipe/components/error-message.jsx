import React from 'react';
import { Button } from "@/components/ui/button.jsx";
import { ArrowLeft } from "lucide-react";

export default function ErrorMessage({ error, onBackToSearch }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center text-red-600">
                {error || 'Ricetta non trovata'}
            </div>
            <div className="text-center mt-4">
                <Button onClick={onBackToSearch}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Torna alla ricerca
                </Button>
            </div>
        </div>
    );
}
