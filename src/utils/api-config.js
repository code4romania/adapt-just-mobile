// Keep all debug API traffic local, including uploads and automatic complaint retries.
const resolveApiUrl = (apiUrl, platform, isDevelopment, isStaging = false) => {
  if (isStaging && apiUrl !== 'https://adapt-just.staging.heroesof.tech/api') {
    throw new Error('Staging builds require the staging API URL.');
  }

  if (!isDevelopment) {
    return apiUrl;
  }

  if (!/^http:\/\/(localhost|127\.0\.0\.1|10\.0\.2\.2)(:\d+)?\/api\/?$/.test(apiUrl || '')) {
    throw new Error('Debug builds require a local API URL. Production/staging API access is blocked.');
  }

  if (platform === 'android') {
    return apiUrl.replace(/^http:\/\/(localhost|127\.0\.0\.1)(?=:|\/)/, 'http://10.0.2.2');
  }

  return apiUrl;
};

const assertApiRequestAllowed = (options, isDevelopment, isStaging) => {
  if ((isDevelopment || isStaging) &&
    (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(options.url || '') || options.baseURL !== undefined)) {
    throw new Error('Local and staging API requests must use relative paths without a base URL override.');
  }
};

module.exports = { assertApiRequestAllowed, resolveApiUrl };
