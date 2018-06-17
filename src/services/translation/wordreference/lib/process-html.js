const cheerio = require('cheerio');
/**
 * Process the html returned from the request and generates the JSON.
 * @param  {string} html html string to be parsed
 * @return {Object}      worldreference object
 */
export default function (html) {
  const $ = cheerio.load(html);
  const result = {};
  result.word = $('h3.headerWord').text();
  result.pronWR = $('span#pronWR').text();
  result.audio = $('div#listen_widget audio source').map(function (i, el) {
    return $(this).attr('src');
  }).get();
  const tables = $('table.WRD').map(function (i, el) {
    return $(this).html();
  }).get();
  result.translations = tables.map(WRDtableMap);

  return result;
};
/**
 * Parses the a table.WRD html element and return it as a json
 * @param {String} html table.WRD html
 * @return {Object} table parsed
 */
function WRDtableMap(html) {
  // read the html and set the object to be returned
  const $ = cheerio.load(html);
  let result = {};
  result.title = '';
  result.translations = [];

  //iterate for each tr element
  $('tr').each(function (i, el) {
    const element = $(this);
    const html = element.html();
    // set the title
    if (isHeaderItem(element)) {
      // Creates a header item
      result.title = element.text();
    } else if (isTranslationItem(element)) {
      // create a "translations element"
      result.translations.push(createTranslationItem(html));
    } else if (isExampleItem(element)) {
      // Adds the examples
      result = pushExample(result, html);
    }
  });
  return result;
}
/**
 * Creates a translation item from the tr provided as html
 * @param  {String} html 
 * @return {String}      
 */
function createTranslationItem(html) {
  const $ = cheerio.load(html);
  const from = $('strong').text();
  $('.ToWrd em span').remove();
  $('.FrWrd em span').remove();
  const fromType = $('.FrWrd em').text();
  const toType = $('.ToWrd em').text();
  $('.ToWrd em').remove();
  const to = $('.ToWrd').text();
  const definitionEl = $('.FrWrd').next();
  let definition = '';
  if (!definitionEl.hasClass('ToWrd')) {
    definition = definitionEl
      .text()
      .trim()
      .replace('(', '')
      .replace(')', '');
  }

  return {
    from: from,
    fromType: fromType,
    toType: toType,
    to: to,
    definition,
    example: {
      from: [],
      to: []
    }
  };
}
/**
 * push an example item contained in the html in the obj 
 * @param  {Object} obj
 * @param  {String} html
 * @return {Object}
 */
function pushExample(obj, html) {
  const $ = cheerio.load(html);

  if ($('.FrEx').text() !== '') {
    obj.translations[obj.translations.length - 1].example.from.push($('.FrEx').text());
  } else if ($('.ToEx').text() !== '') {
    obj.translations[obj.translations.length - 1].example.to.push($('.ToEx').text());
  }

  return obj;
}
function isHeaderItem(element) {
  return element.attr('class') === 'wrtopsection';
}

function isTranslationItem(element) {
  const id = element.attr('id');
  const clss = element.attr('class');
  return id !== undefined && (clss === 'even' || clss === 'odd');
}
function isExampleItem(element) {
  const id = element.attr('id');
  const clss = element.attr('class');
  return id === undefined && (clss === 'even' || clss === 'odd');
}
