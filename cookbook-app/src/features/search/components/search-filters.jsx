import React from 'react';
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { SearchIcon, Shuffle, FilterIcon } from "lucide-react";

export default function SearchFilters({
    searchQuery,
    loading,
    categories,
    areas,
    selectedCategory,
    selectedArea,
    showFilters,
    onSearchQueryChange,
    onSearch,
    onRandomMeal,
    onCategoryFilter,
    onAreaFilter,
    onClearFilters,
    onToggleFilters
}) {
    return (
        <Card className="mb-6">
            <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                    {/* Ricerca per parola chiave */}
                    <div className="flex space-x-2">
                        <div className="flex-1">
                            <Input
                                placeholder="Cerca ricette per nome... (es: pasta, chicken, pizza)"
                                value={searchQuery}
                                onChange={(e) => onSearchQueryChange(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                            />
                        </div>
                        <Button onClick={onSearch} disabled={loading}>
                            <SearchIcon className="w-4 h-4 mr-2" />
                            Cerca
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onRandomMeal}
                            disabled={loading}
                        >
                            <Shuffle className="w-4 h-4 mr-2" />
                            Casuale
                        </Button>
                    </div>

                    {/* Toggle filtri */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onToggleFilters}
                        >
                            <FilterIcon className="w-4 h-4 mr-2" />
                            {showFilters ? 'Nascondi' : 'Mostra'} Filtri
                        </Button>

                        {(selectedCategory || selectedArea) && (
                            <Button variant="ghost" size="sm" onClick={onClearFilters}>
                                Cancella Filtri
                            </Button>
                        )}
                    </div>

                    {/* Filtri espandibili */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Categoria</label>
                                <Select value={selectedCategory} onValueChange={onCategoryFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleziona categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.idCategory} value={category.strCategory}>
                                                {category.strCategory}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Origine</label>
                                <Select value={selectedArea} onValueChange={onAreaFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleziona origine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areas.map((area) => (
                                            <SelectItem key={area.strArea} value={area.strArea}>
                                                {area.strArea}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* Filtri attivi */}
                    {(selectedCategory || selectedArea) && (
                        <div className="flex flex-wrap gap-2">
                            {selectedCategory && (
                                <Badge variant="secondary">
                                    Categoria: {selectedCategory}
                                </Badge>
                            )}
                            {selectedArea && (
                                <Badge variant="secondary">
                                    Origine: {selectedArea}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
