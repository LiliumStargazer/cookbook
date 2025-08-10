import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ArrowLeft, ExternalLink, Clock, Users } from "lucide-react";
import { useMealDetail } from '../hooks/use-meal-detail.js';
import NavBar from "@/shared/components/navbar.jsx";

export default function MealDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { meal, loading, error } = useMealDetail(id);

    if (loading) {
        return (
            <div className="w-full">
                <NavBar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">Caricamento dettagli ricetta...</div>
                </div>
            </div>
        );
    }

    if (error || !meal) {
        return (
            <div className="w-full">
                <NavBar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-red-600">
                        {error || 'Ricetta non trovata'}
                    </div>
                    <div className="text-center mt-4">
                        <Button onClick={() => navigate('/search')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Torna alla ricerca
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Estrai gli ingredienti e le misure
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient: ingredient.trim(), measure: measure?.trim() || '' });
        }
    }

    return (
        <div className="w-full">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                {/* Header con navigazione */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/search')}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Torna alla ricerca
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Immagine e info base */}
                    <div>
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
                                            variant="ghost"
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
                    </div>

                    {/* Ingredienti e istruzioni */}
                    <div className="space-y-6">
                        {/* Ingredienti */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Users className="w-5 h-5 mr-2" />
                                    Ingredienti
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {ingredients.map((item, index) => (
                                        <li key={index} className="flex justify-between">
                                            <span>{item.ingredient}</span>
                                            <span className="text-muted-foreground">{item.measure}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Istruzioni */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2" />
                                    Istruzioni
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none">
                                    {meal.strInstructions?.split('\n').map((instruction, index) => {
                                        if (instruction.trim()) {
                                            return (
                                                <p key={index} className="mb-3 leading-relaxed">
                                                    {instruction.trim()}
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Sezione recensioni - da implementare */}
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
            </div>
        </div>
    );
}
