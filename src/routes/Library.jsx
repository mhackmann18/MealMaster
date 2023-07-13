import { useState, useEffect } from "react";
import LibraryItem from "../components/LibraryItem";
import Recipe from "../utils/Recipe";
import User from "../utils/UserController";
import Toast from "../components/common/Toast";
import useToast from "../hooks/useToast";
import Spinner from "../components/common/Spinner";
import NoContentMessage from "../components/common/NoContentMessage";
import "./Library.css";

export default function Library() {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addErrorToastMessage, addSuccessToastMessage, closeToast, toast } =
    useToast();

  // Load recipes
  useEffect(() => {
    User.getRecipes().then((data) => {
      if (data.length) {
        const userRecipes = data.map((r) => new Recipe({ ...r }));
        setRecipes(userRecipes);
      } else if (data.message) {
        addErrorToastMessage(
          `Unable to load recipes. ${
            data.message || "An unexpected error occurred"
          }`
        );
        setError(true);
      }

      setIsLoading(false);
    });
  }, []);

  const onRecipeDeletion = (recipeId) => {
    setRecipes(recipes.filter((r) => r.id !== recipeId));
    addSuccessToastMessage("Recipe deleted");
  };

  const onRecipeDuplication = () => {
    // Refresh recipes
    User.getRecipes().then((data) => {
      if (data.length) {
        setRecipes(data.map((r) => new Recipe({ ...r })));
        addSuccessToastMessage("Recipe duplicated");
      } else if (data.message) {
        addErrorToastMessage(
          `Unable to refresh recipe list. ${
            data.message || "An unexpected error occurred"
          }`
        );
      }
    });
  };

  const content = recipes ? (
    recipes.map((recipe) => (
      <LibraryItem
        key={recipe.id}
        recipe={recipe}
        recipeTitle={recipe.title}
        recipeServings={recipe.servings}
        caloriesPerRecipeServing={
          recipe.nutrients &&
          recipe.nutrients.calories &&
          recipe.nutrients.calories.quantity
        }
        recipeId={recipe.id}
        addErrorToastMessage={addErrorToastMessage}
        onDelete={onRecipeDeletion}
        onDuplicate={onRecipeDuplication}
      />
    ))
  ) : (
    <NoContentMessage
      headerText={
        error
          ? "There was a problem loading your recipes."
          : "You haven't added any recipes yet."
      }
      subText={
        error
          ? "Please try refreshing the page."
          : "Recipes that you import or create will show up here"
      }
    />
  );

  return (
    <>
      <div id="library-page">
        {isLoading ? (
          <div className="center-content">
            <Spinner />
          </div>
        ) : (
          content
        )}
      </div>
      <Toast state={toast} onClose={closeToast} />
    </>
  );
}
