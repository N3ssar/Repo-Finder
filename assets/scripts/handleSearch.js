// Imported Functions
import {
  showMessage,
  clearResults,
  hideMessage,
  showLoader,
  hideLoader,
  escapeHtml
} from "./utils.js";
import { fetchUserOrOrgDate, fetchRepositories } from "./fetchDate.js";
import displayResults from "./displayResults.js";

// DOM Elements
const queryInput = document.querySelector("#query");

/**
 * Handles the main search form submission.
 * @param {Event} e - The submit event object.
 */
async function handleSearch(e) {
  e.preventDefault(); // Prevent page reload
  const query = queryInput.value.trim();

  if (!query) {
    showMessage(
      "Please enter a GitHub username or organization name.",
      "error"
    );
    return;
  }

  const searchTypeInput = document.querySelector(
    'input[name="choice"]:checked'
  );
  if (!searchTypeInput) {
    // This case should be rare if HTML is correct, but good to handle
    showMessage("Please select search type (Users or Orgs).", "error");
    return;
  }
  const searchType = searchTypeInput.value; // 'users' or 'orgs'

  clearResults();
  hideMessage();
  showLoader();

  try {
    const userOrOrgData = await fetchUserOrOrgDate(query, searchType);

    if (!userOrOrgData) {
      // If nothing found based on the API endpoint, throw the 'not found' error.
      throw new Error(
        `No ${
          searchType === "users" ? "user" : "organization"
        } found with the name "${escapeHtml(query)}".`
      );
    }

    const expectedApiType = searchType === "users" ? "User" : "Organization";
    if (userOrOrgData.type !== expectedApiType) {
      // If the actual type doesn't match the search type, throw a specific error.
      throw new Error(
        `Found a ${userOrOrgData.type.toLowerCase()} named "${escapeHtml(
          query
        )}", but you searched for ${
          searchType === "users" ? "a user" : "an organization"
        }. Please select the correct search type.`
      );
    }

    const repos = await fetchRepositories(query, searchType);

    if (repos === null) {
      throw new Error(
        `Successfully found the ${userOrOrgData.type.toLowerCase()} "${escapeHtml(
          query
        )}", but could not fetch repositories. Please try again.`
      );
    }

    displayResults(repos, userOrOrgData);

    if (repos.length === 0) {
      showMessage(
        `${userOrOrgData.type} "${escapeHtml(
          userOrOrgData.login
        )}" found, but has no public repositories.`,
        "info"
      );
    }
  } catch (error) {
    console.error("Search error:", error);
    showMessage(
      error.message || "An error occurred during the search. Please try again.",
      "error"
    );
  } finally {
    hideLoader();
  }
}

export default handleSearch;
