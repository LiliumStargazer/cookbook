import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Badge } from "@/components/ui/badge.jsx";

export default function ReviewCard({ review }) {
    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Card className="mb-4">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.username}`} />
                            <AvatarFallback>
                                {review.username?.[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-sm">{review.username}</p>
                            <p className="text-xs text-muted-foreground">
                                {formatDate(review.createdAt)}
                            </p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        {renderStars(review.rating)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-sm">{review.comment}</p>
            </CardContent>
        </Card>
    );
}
