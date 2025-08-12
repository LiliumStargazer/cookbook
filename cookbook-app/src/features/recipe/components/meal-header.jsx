import React from 'react';
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ExternalLink } from "lucide-react";
import AddToCookbookButton from './add-to-cookbook-button.jsx';

export default function MealHeader({ meal }) {
    return (
        <Card>
            <CardContent className="p-0">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {meal.strCategory && (
                            <Badge variant="secondary">
                                {meal.strCategory}
                            </Badge>
                        )}
                        {meal.strArea && (
                            <Badge variant="outline">
                                {meal.strArea}
                            </Badge>
                        )}
                        {meal.strTags && meal.strTags.split(',').map(tag => (
                            <Badge key={tag.trim()} variant="outline">
                                {tag.trim()}
                            </Badge>
                        ))}
                    </div>

                    {/* Azioni ricettario */}
                    <div className="mb-4">
                        <AddToCookbookButton meal={meal} />
                    </div>

                    {meal.strYoutube && (
                        <Button
                            variant="outline"
                            className="w-full mb-4"
                            onClick={() => window.open(meal.strYoutube, '_blank')}
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Guarda il video tutorial
                        </Button>
                    )}

                    {meal.strSource && (
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => window.open(meal.strSource, '_blank')}
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ricetta originale
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
