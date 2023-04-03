import "./RecipeScrapingForm.css";
import { useState } from "react";
import ErrBubble from "./common/ErrBubble";
import ErrMsg from "./common/ErrMsg";
import ButtonMain from "./common/ButtonMain";
import formatScrapedRecipe from "./utils/formatScrapedRecipe";
import isValidHttpURL from "./utils/isValidHttpURL";

export default function ScrapeRecipeForm({ handleResponse }) {
  const [urlInputErr, setURLInputErr] = useState({ isShowing: false, msg: "" });
  const [urlSubmitErr, setUrlSubmitErr] = useState({
    isShowing: false,
    msg: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setUrlSubmitErr({ isShowing: false, msg: "" });
    document.activeElement.blur();
    let inputString = e.target.querySelector("input").value;

    if (!isValidHttpURL(inputString)) {
      setURLInputErr({
        isShowing: true,
        msg: "Please paste a valid recipe URL",
      });
      return false;
    }

    try {
      setIsLoading(true);
      let res = await fetch(
        `http://localhost:8000/recipe-data?url=${inputString}`
      );

      if (res.status === 200) {
        let data = await res.json();
        let formattedData = formatScrapedRecipe(data);
        if (!formattedData) {
          setUrlSubmitErr({
            isShowing: true,
            msg: "The site did not provide the required recipe data. Please paste a different URL",
          });
          return false;
        } else {
          handleResponse(formattedData);
        }
      } else if (res.status === 400) {
        let errText = await res.text();
        setURLInputErr({ isShowing: true, msg: errText });
      } else {
        let errText = await res.text();
        setUrlSubmitErr({ isShowing: true, msg: errText });
      }
    } catch {
      setUrlSubmitErr({
        isShowing: true,
        msg: "Failed to connect to recipe API. Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form id="recipe-scraping-form" onSubmit={handleSubmit}>
      <div id="rsf-input-wrapper">
        <input
          type="text"
          id="url-input"
          placeholder="Paste a recipe's URL"
          onFocus={() => {
            setURLInputErr({ isShowing: false, msg: "" });
            setUrlSubmitErr({ isShowing: false, msg: "" });
          }}
        />
        {urlInputErr.isShowing && <ErrBubble msg={urlInputErr.msg} />}
      </div>
      <ButtonMain text="Get Recipe" />
      {isLoading && (
        <img id="rsf-spinner" src="loading-gif.gif" alt="spinner-gif" />
      )}
      <ErrMsg isShowing={urlSubmitErr.isShowing} msg={urlSubmitErr.msg} />
    </form>
  );
}
