import "./Features.css";
import logo from "../assets/reaper-color.png";

export default function Features() {
  return (
    <div id="features-page">
      <div id="fp-intro-container">
        <img src={logo} alt="" />
        <h2>Make meal prepping your favorite recipes a breeze</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error cum
          nisi tempore numquam vel, consequatur odit exercitationem fugiat
          quaerat! Deleniti.
        </p>
        {/* Make this a link */}
        <button className="btn-main" type="button">
          Get Started
        </button>
      </div>
    </div>
  );
}
