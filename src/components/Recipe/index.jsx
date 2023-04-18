import { useState } from "react";
import PropTypes from "prop-types";
import RecipeDisplay from "./Display";
import RecipeForm from "./Form";

export default function Recipe({ recipe, startingDisplayType }) {
  const [displayType, setDisplayType] = useState(startingDisplayType);

  // recipe status can be inferred
  return displayType === "div" ? (
    <RecipeDisplay
      recipe={recipe}
      switchToForm={() => setDisplayType("form")}
    />
  ) : (
    <RecipeForm recipe={recipe} switchToDiv={() => setDisplayType("div")} />
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    cookTime: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    instructions: PropTypes.arrayOf(PropTypes.string),
    nutrients: PropTypes.object,
    prepTime: PropTypes.number,
    title: PropTypes.string,
    servings: PropTypes.number,
  }),
  startingDisplayType: PropTypes.oneOf(["form", "div"]).isRequired,
};

Recipe.defaultProps = {
  recipe: {
    cookTime: 0,
    ingredients: [],
    instructions: [""],
    nutrients: {},
    prepTime: 0,
    title: "",
    servings: 1,
  },
};
