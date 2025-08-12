import { useState } from "react";
import { toast } from "sonner";
import { useCookbook } from "@/features/cookbook/hooks/use-cookbook.js";
import {
  addToCookBook,
  removeFromCookbook,
} from "@/features/recipe/services/api-recipes.js";

export function useToggleCookbook(meal) {
  const [loading, setLoading] = useState(false);
  const { isInCookbook, refetch } = useCookbook();
  const isInUserCookbook = isInCookbook(meal.idMeal);

  const toggleCookbook = async () => {
    try {
      setLoading(true);

      let result;
      if (isInUserCookbook) {
        result = await removeFromCookbook(meal.idMeal);
      } else {
        result = await addToCookBook(meal);
      }
      console.warn("Toggle cookbook result:", result);

      if (result.success) {
        await refetch(); // Aggiorna le ricette dell'utente prima di rimuovere
        toast.success(
          isInUserCookbook
            ? "Ricetta rimossa dal ricettario"
            : "Ricetta aggiunta al ricettario",
        );
        console.log(
          isInUserCookbook
            ? "Ricetta rimossa dal ricettario"
            : "Ricetta aggiunta al ricettario",
        );
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.error("Errore nella gestione della ricetta:", err);
      toast.error(err.response?.data || "Errore nella gestione della ricetta");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    isInUserCookbook,
    toggleCookbook,
  };
}
