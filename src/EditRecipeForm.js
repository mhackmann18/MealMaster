import NumberInput from "./common/NumberInput";
import "./EditRecipeForm.css";

export default function EditRecipeForm({
  servingsDefaultValue,
  servingsInputValue,
  setServingsInputValue,
  caloriesDefaultValue,
  caloriesInputValue,
  setCaloriesInputValue,
}) {
  const servingsInputMaxValue = 99;
  const servingsInputMinValue = 1;
  const caloriesInputMaxValue = 9999;
  const caloriesInputMinValue = 1;

  // If the input's value is no longer the starting value, display the reset button
  const resetBtnActive =
    servingsDefaultValue !== servingsInputValue ||
    caloriesDefaultValue !== caloriesInputValue;

  function handleResetBtnClick(e) {
    e.preventDefault();
    setServingsInputValue(servingsDefaultValue);
    caloriesDefaultValue && setCaloriesInputValue(caloriesDefaultValue);
  }

  return (
    <form id="edit-recipe-form">
      <div className="left">
        <label htmlFor="">Servings</label>
        <NumberInput
          value={servingsInputValue}
          setValue={setServingsInputValue}
          maxValue={servingsInputMaxValue}
          minValue={servingsInputMinValue}
        />
        {caloriesDefaultValue && (
          <>
            <label htmlFor="">Calories per serving</label>
            <NumberInput
              value={caloriesInputValue}
              setValue={setCaloriesInputValue}
              maxValue={caloriesInputMaxValue}
              minValue={caloriesInputMinValue}
              className="no-spinner"
            />
          </>
        )}
        {resetBtnActive && <button onClick={handleResetBtnClick}>Reset</button>}
      </div>
      <div className="right">
        <button onClick={(e) => e.preventDefault()}>Print</button>
        <button onClick={(e) => e.preventDefault()}>Save</button>
      </div>
    </form>
  );
}
