const inappropriateKeywords = [
    "spam",
    "scam",
    "offensiveWord1",
    "offensiveWord2",
    "offensiveWord3"
];

/**
 * Function to check if content contains inappropriate keywords
 * @param {string} content - The user-generated content to be checked
 * @returns {boolean} - Returns true if inappropriate content is found, otherwise false
 */
function isInappropriateContent(content) {
    // Convert content to lowercase for case-insensitive comparison
    const lowerCaseContent = content.toLowerCase();

    // Check if any inappropriate keyword is present in the content
    for (let keyword of inappropriateKeywords) {
        if (lowerCaseContent.includes(keyword.toLowerCase())) {
            return true; // Inappropriate content detected
        }
    }

    return false; // No inappropriate content detected
}

/**
 * Function to handle user content submission
 * @param {string} userContent - The content submitted by the user
 */
function handleUserContentSubmission(userContent) {
    if (isInappropriateContent(userContent)) {
        // Action to take when inappropriate content is detected
        alert("Your post contains inappropriate content and cannot be submitted.");
        // Optionally, log the incident for admin review
        logInappropriateContent(userContent);
    } else {
        // Proceed with normal content submission
        submitContent(userContent);
    }
}
/**
 * Function to log inappropriate content for admin review
 * @param {string} content - The inappropriate content to be logged
 */
function logInappropriateContent(content) {
    // Log the inappropriate content (this could be a call to a backend server or database)
    console.log(Inappropriate content detected: ${content});
    // Here you could also send the data to a backend for storage or further action
}

/**
 * Placeholder function to simulate content submission
 * @param {string} content - The content to be submitted
 */
function submitContent(content) {
    console.log(Content submitted successfully: ${content});
    // Actual implementation would involve sending the content to a server or database
}

// Example usage
const userContent = "This is a test post with spam content.";
handleUserContentSubmission(userContent);
