//Constant
const GITHUB_API_BASE = "https://api.github.com";
const REPOS_PER_PAGE = 10; // Number of repos to fetch

/**
 * Fetches user or organization data from the GitHub API.
 * @param {string} query - The username or organization name.
 * @param {'users' | 'orgs'} type - The type of entity to fetch.
 * @returns {Promise<object|null>} - A promise resolving to the user/org data object or null if not found/error.
 */
async function fetchUserOrOrgDate(query, type) {
  const endPoint = `${GITHUB_API_BASE}/${type}/${encodeURIComponent(query)}`;
  const response = await fetch(endPoint, {
    headers: { Accept: "application/vnd.github.v3+json" }
  });
  try {
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`${type} "${query}" not found (404).`);
        return null;
      }
      throw new Error(
        `GitHub API error for ${type}: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`API fetching${type} Error for ${query}`, error);
    return null;
  }
}

/**
 * Fetches repositories for a given user or organization.
 * @param {string} query - The username or organization name.
 * @param {'users' | 'orgs'} type - The type of entity whose repos to fetch.
 * @returns {Promise<Array|null>} - A promise resolving to an array of repository objects or null on error.
 */
async function fetchRepositories(query, type) {
  const endPoint = `${GITHUB_API_BASE}/${type}/${encodeURIComponent(
    query
  )}/repos?sort=updated&per_page=${REPOS_PER_PAGE}`;
  try {
    const response = await fetch(endPoint, {
      headers: { Accept: "application/vnd.github.v3+json" }
    });
    if (!response.ok) {
      if (response.status === 404) {
        // Treat 404 as an error fetching repos.
        console.warn(
          `Could not find repos endpoint for ${type} "${query}" (404), user might be invalid or endpoint changed.`
        );
        return null; // Indicate failure to fetch repos
      }
      throw new Error(
        `GitHub API error for repos: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(
      `API fetching ${type} Error for ${query} repositories`,
      error
    );
    return null;
  }
}

//Export All Functions
export { fetchUserOrOrgDate, fetchRepositories };
