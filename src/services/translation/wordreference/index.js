import request from 'request-promise-native';
import validateLanguage from './lib/validate-language';
import processHtml from './lib/process-html';

/**
 * Gets the result for the given word
 * @param  {String} word Word to be searched
 * @param  {String} from from language, default en
 * @param  {String} to   to language, default es
 * @return {Object}      Object with the word data
 */

export default async function (word, from, to) {
  validateLanguage(from)
  validateLanguage(to)
  // Set the url
  const url = `https://www.wordreference.com/${from}${to}/${word}`
  // Make the request
  const html = await request({
    method: 'GET',
    uri: url,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    }
  })
  // Process the HTML
  return processHtml(html)
}
