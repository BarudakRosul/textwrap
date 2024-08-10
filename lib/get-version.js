const axios = require("axios");

/**
 * Retrieves the version number from a package JSON located at the specified URL.
 *
 * @param {string} url - The URL where the package JSON is located.
 * @returns {Promise<string>} - A promise that resolves to the version string of the package.
 */
async function getPackageVersion(url) {
  const response = await axios.get(url);
  const packageJson = response.data;
  const version = packageJson.version;

  return version;
}

module.exports = getPackageVersion;
