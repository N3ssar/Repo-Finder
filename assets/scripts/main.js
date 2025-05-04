//----------------------Utils----------------------
import { handleRadioLabelKeydown } from "./utils.js";
import handleSearch from "./handleSearch.js";
// ------------------------------------------------

//DOM Elements
const searchForm = document.querySelector(".search-form");
const messageElement = document.querySelector(".message");
const loader = document.querySelector(".loader");

//Constants
const REPOS_PER_PAGE = 10;

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  if (searchForm) {
    searchForm.addEventListener("submit", handleSearch);
  } else {
    console.error("Search form not found!");
  }
  // Accessibility: Keyboard navigation for radio button labels
  const radioLabels = document.querySelectorAll(".choices label");
  radioLabels.forEach((label) => {
    label.addEventListener("keydown", handleRadioLabelKeydown);
  });
});
