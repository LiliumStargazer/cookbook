import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";

export default function ReviewsSection() {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Recensioni</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Le recensioni saranno disponibili presto...
                </p>
            </CardContent>
        </Card>
    );
}
