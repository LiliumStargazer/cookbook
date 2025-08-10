import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";

export default function MealCard({ meal }) {
    const navigate = useNavigate();

    const handleViewRecipe = () => {
        navigate(`/meal/${meal.idMeal}`);
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover"
                />
            </div>
            <CardHeader>
                <CardTitle className="text-lg">{meal.strMeal}</CardTitle>
                {meal.strCategory && (
                    <Badge variant="outline" className="w-fit">
                        {meal.strCategory}
                    </Badge>
                )}
            </CardHeader>
            <CardContent>
                <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleViewRecipe}
                >
                    Vedi Ricetta
                </Button>
            </CardContent>
        </Card>
    );
}
