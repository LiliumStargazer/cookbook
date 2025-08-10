import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import ReviewCard from './review-card.jsx';
import ReviewForm from './review-form.jsx';

export default function ReviewSection({
    reviews = [],
    onSubmitReview,
    loading = false,
    showForm = true,
    title = "Recensioni"
}) {
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : 0;

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <span className="text-yellow-400">
                {'★'.repeat(fullStars)}
                {hasHalfStar && '☆'}
                {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header con statistiche */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{title}</span>
                        <div className="flex items-center space-x-2 text-sm">
                            {reviews.length > 0 ? (
                                <>
                                    {renderStars(averageRating)}
                                    <span className="font-medium">{averageRating}</span>
                                    <span className="text-muted-foreground">
                                        ({reviews.length} recensioni)
                                    </span>
                                </>
                            ) : (
                                <span className="text-muted-foreground">
                                    Nessuna recensione
                                </span>
                            )}
                        </div>
                    </CardTitle>
                </CardHeader>
            </Card>

            {/* Form per aggiungere recensione */}
            {showForm && (
                <ReviewForm onSubmit={onSubmitReview} loading={loading} />
            )}

            {/* Lista recensioni */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <Card>
                        <CardContent className="py-8 text-center">
                            <p className="text-muted-foreground">
                                Non ci sono ancora recensioni per questa ricetta.
                                {showForm && " Sii il primo a lasciarne una!"}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    reviews.map((review) => (
                        <ReviewCard key={review._id || review.id} review={review} />
                    ))
                )}
            </div>
        </div>
    );
}
