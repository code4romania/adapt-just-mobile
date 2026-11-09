const test = require('node:test');
const assert = require('node:assert/strict');
const { assertApiRequestAllowed, resolveApiUrl } = require('../src/utils/api-config');

test('debug API requests accept local iOS and Android emulator addresses', () => {
  assert.equal(resolveApiUrl('http://localhost:8000/api', 'ios', true), 'http://localhost:8000/api');
  assert.equal(resolveApiUrl('http://localhost:8000/api', 'android', true), 'http://10.0.2.2:8000/api');
});

test('debug API requests reject production, staging, missing, and deceptive hosts', () => {
  for (const url of [undefined, 'https://api.cerajutor.ro/api', 'https://adapt-just.staging.heroesof.tech/api',
    'http://localhost.evil.test/api', '//localhost/api', 'http://user@localhost/api']) {
    assert.throws(() => resolveApiUrl(url, 'ios', true));
  }
});

test('release API configuration is preserved', () => {
  assert.equal(resolveApiUrl('https://api.cerajutor.ro/api', 'ios', false), 'https://api.cerajutor.ro/api');
});

test('TestFlight allows complaint writes to staging and rejects host overrides', () => {
  const staging = 'https://adapt-just.staging.heroesof.tech/api';
  assert.equal(resolveApiUrl(staging, 'ios', false, true), staging);
  assert.throws(() => resolveApiUrl('https://api.cerajutor.ro/api', 'ios', false, true));
  assert.doesNotThrow(() => assertApiRequestAllowed({ method: 'GET', url: '/public/articles' }, false, true));
  assert.doesNotThrow(() => assertApiRequestAllowed({ method: 'POST', url: '/complaints' }, false, true));
  assert.doesNotThrow(() => assertApiRequestAllowed({ method: 'POST', url: '/uploads' }, false, true));
  for (const options of [
    { url: 'https://api.cerajutor.ro/api/public/articles' },
    { url: '//api.cerajutor.ro/api/public/articles' },
    { url: '/public/articles', baseURL: 'https://api.cerajutor.ro/api' },
  ]) {
    assert.throws(() => assertApiRequestAllowed(options, false, true));
  }
  assert.doesNotThrow(() => assertApiRequestAllowed({ method: 'POST', url: '/complaints' }, false, false));
});

test('a queued draft can only be read, written, or cleared within its own environment', () => {
  const babel = require('@babel/core');
  const { runInNewContext } = require('node:vm');
  const draftKeys = {};
  for (const envName of ['development', 'staging', 'production']) {
    const { code } = babel.transformFileSync('src/utils/app-environment.js', { envName });
    const exports = {};
    runInNewContext(code, { exports });
    draftKeys[envName] = exports.complaintDraftKey;
  }

  // The local Debug app already has a separate bundle ID and data container.
  assert.equal(draftKeys.development, '@complaint');
  assert.equal(draftKeys.production, '@complaint');
  assert.equal(draftKeys.staging, '@staging:@complaint');
});
