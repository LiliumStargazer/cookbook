import { useState, useEffect } from "react";
import { getUserRecipes } from "@/features/cookbook/services/api-cookbook.js";
import { toast } from "sonner";

export function useCookbook() {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carica le ricette dell'utente
  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      const response = await getUserRecipes();
      if (response.success) {
        setUserRecipes(response.data);
      } else {
        toast.error(response.error);
      }
    } catch (err) {
      console.error("Errore nel caricamento delle ricette:", err);
      toast.error(err.response?.data || "Errore nel caricamento delle ricette");
    } finally {
      setLoading(false);
    }
  };

  // Verifica se una ricetta è già nel ricettario
  const isInCookbook = (mealId) => {
    return userRecipes.some((recipe) => recipe.idMeal === mealId);
  };

  useEffect(() => {
    fetchUserRecipes().catch((error) => {
      toast.error(error);
    });
  }, []);

  return {
    userRecipes,
    loading,
    fetchUserRecipes,
    isInCookbook,
    refetch: fetchUserRecipes,
  };
}
