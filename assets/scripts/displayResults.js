// Imported Functions
import { clearResults, escapeHtml } from "./utils";

// DOM Elements
const resultsContainer = document.querySelector(".results");

/**
 * Displays the main search results (user/org header and repositories).
 * Applies HTML escaping to all dynamic data.
 * @param {Array} repos - Array of repository objects.
 * @param {object} userData - The user or organization data object.
 */

function displayResults(repos, userData) {
  clearResults(); // Ensure container is empty first

  // --- User/Org Header ---
  // Use template literals with rigorous escaping
  const userHeaderHTML = `
    <div class="user-header">
      <div class="user-info">
        <img src="${escapeHtml(userData.avatar_url || "")}"
             alt="Avatar for ${escapeHtml(userData.login || "user")}"
             width="50" height="50" class="user-avatar">
        <div>
          <h3>${escapeHtml(userData.name || userData.login || "N/A")}</h3>
          ${userData.bio ? `<p>${escapeHtml(userData.bio)}</p>` : ""}
          <a href="${escapeHtml(userData.html_url || "#")}"
             target="_blank" rel="noopener noreferrer">View Profile on GitHub</a>
        </div>
      </div>
    </div>
  `;
  resultsContainer.insertAdjacentHTML("beforeend", userHeaderHTML);

  // --- Repositories Section ---
  if (repos && repos.length > 0) {
    const reposHeaderHTML = `<h3 class="repos-heading">Repositories (${repos.length})</h3>`;
    resultsContainer.insertAdjacentHTML("beforeend", reposHeaderHTML);

    let allReposHTML = "";
    repos.forEach((repo) => {
      allReposHTML += `
        <div class="repo-card">
          <h3>
            <a href="${escapeHtml(
              repo.html_url || "#"
            )}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(repo.name || "Unnamed Repository")}
            </a>
          </h3>
          ${
            repo.description
              ? `<p>${escapeHtml(repo.description)}</p>`
              : "<p><em>No description provided.</em></p>"
          }
          <div class="repo-stats">
            <span>⭐ ${repo.stargazers_count ?? 0}</span>
            <span>🍴 ${repo.forks_count ?? 0}</span>
            <span>👀 ${repo.watchers_count ?? 0}</span>
            ${repo.language ? `<span>${escapeHtml(repo.language)}</span>` : ""}
          </div>
        </div>
      `;
    });
    resultsContainer.insertAdjacentHTML("beforeend", allReposHTML);
  }
  // No need for an explicit 'else' for repos, the header won't show and the message area handles the "no repos" case if needed.
}

export default displayResults;
