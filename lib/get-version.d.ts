declare module "get-version" {
  /**
   * Retrieves the version number from a package JSON located at the specified URL.
   *
   * @param {string} url - The URL where the package JSON is located.
   * @returns {Promise<string>} - A promise that resolves to the version string of the package.
   */
  function getPackageVersion(url: string): Promise<string>;

  export = getPackageVersion;
}
