import './RecipeScrapingForm.css';
import { useState } from "react";
import ErrMsg from './ErrMsg';
import ButtonMain from './ButtonMain';
import formatScrapedRecipe from './utils/formatScrapedRecipe';
import isValidHttpURL from './utils/isValidHttpURL';

export default function ScrapeRecipeForm({ handleResponse }) {
  const [urlInputErr, setURLInputErr] = useState({ isShowing: false, msg: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    let inputString = e.target.querySelector('input').value;
    
    if(!isValidHttpURL(inputString)){
      setURLInputErr({ isShowing: true, msg: 'Please paste a valid recipe URL' });
      return false;
    } 
    
    // Add error handling here
    let res = await fetch(`http://localhost:8000/recipe-data?url=${inputString}`);

    if(res.status === 200){
      setURLInputErr({ isShowing: false, msg: ' '});
      let data = await res.json();
      handleResponse(formatScrapedRecipe(data));
      e.target.querySelector('input').value = "";
    } else {
      setURLInputErr({ isShowing: true, msg: 'Something went wrong. Please try a different url' });
    }
  }

  return ( 
    <form id="recipe-scraping-form" onSubmit={handleSubmit}>
      <input type="text" id="url-input" placeholder="Paste a recipe's URL"/>
      <ErrMsg isShowing={urlInputErr.isShowing} msg={urlInputErr.msg} />
      <ButtonMain text='Get Recipe' />
    </form>
  );
}
