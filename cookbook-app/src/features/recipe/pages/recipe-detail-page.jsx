import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMealDetail } from '../hooks/use-meal-detail.js';
import { useIngredients } from '../hooks/use-ingredients.js';
import NavBar from "@/shared/components/navbar.jsx";
import ErrorMessage from '../components/error-message.jsx';
import BackToSearchButton from '../components/back-to-search-button.jsx';
import MealHeader from '../components/meal-header.jsx';
import IngredientsList from '../components/ingredients-list.jsx';
import InstructionsCard from '../components/instructions-card.jsx';
import ReviewsSection from '../components/reviews-section.jsx';

export default function RecipeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { meal, loading, error } = useMealDetail(id);
    const ingredients = useIngredients(meal);

    const handleBackToSearch = () => navigate('/search');

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
                <ErrorMessage error={error} onBackToSearch={handleBackToSearch} />
            </div>
        );
    }

    return (
        <div className="w-full">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                {/* Header con navigazione */}
                <div className="mb-6">
                    <BackToSearchButton onClick={handleBackToSearch} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Immagine e info base */}
                    <div>
                        <MealHeader meal={meal} />
                    </div>

                    {/* Ingredienti e istruzioni */}
                    <div className="space-y-6">
                        <IngredientsList ingredients={ingredients} />
                        <InstructionsCard instructions={meal.strInstructions} />
                    </div>
                </div>

                <ReviewsSection />
            </div>
        </div>
    );
}
