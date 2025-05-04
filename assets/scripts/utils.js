//DOM Elements
const loader = document.querySelector(".loader"); // Loading indicator
const messageElement = document.querySelector(".message"); // Element for user messages
const resultsContainer = document.querySelector(".results");

//--------------------------------Functions--------------------------------
/**
 * Handles keydown events on radio button labels for accessibility.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
function handleRadioLabelKeydown(e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const radioId = e.currentTarget.getAttribute("for");
    const radioElement = document.querySelector(`#${radioId}`);
    radioElement?.click();
    radioElement?.focus();
  }
}

/**
 * Escapes HTML special characters to prevent XSS.
 * Handles non-string inputs gracefully.
 * @param {*} unsafe - The potentially unsafe text to escape.
 * @returns {string} - The escaped HTML string.
 */
function escapeHtml(unsafe) {
  if (typeof unsafe !== "string") {
    // Return non-strings as is, or convert common types safely
    if (unsafe === null || unsafe === undefined) return "";
    if (typeof unsafe === "number" || typeof unsafe === "boolean")
      return String(unsafe);
    // For other types, log a warning and return an empty string
    console.warn("escapeHtml called with non-string value:", unsafe);
    return "";
  }
  const map = {
    "&": "&",
    "<": "<",
    ">": ">",
    '"': '"',
    "'": "''"
  };
  return unsafe.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Shows the loading indicator.
 */
function showLoader() {
  if (loader) loader.classList.remove("hidden");
}

/**
 * Hides the loading indicator.
 */
function hideLoader() {
  if (loader) loader.classList.add("hidden");
}

function showMessage(msg, type = "info") {
  if (messageElement) {
    messageElement.textContent = msg;
    messageElement.className = `message ${type}`; // Reset classes and add type
    messageElement.classList.remove("hidden");
  }
}

/**
 * Hides the user message area.
 */
function hideMessage() {
  if (messageElement) {
    messageElement.classList.add("hidden");
    messageElement.textContent = "";
    messageElement.className = "message hidden"; // Reset classes
  }
}
/**
 * Clears the main results container.
 */
function clearResults() {
  if (resultsContainer) {
    resultsContainer.innerHTML = ""; // Clear previous results
  }
}

//Export All functions
export {
  handleRadioLabelKeydown,
  escapeHtml,
  showLoader,
  hideLoader,
  showMessage,
  hideMessage,
  clearResults
};
