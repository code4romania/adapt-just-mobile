export const getHtmlToArray = (html = '') => {
  if (!html) {
    return [];
  }

  // add a period after every closing tag to split the html text
  let text = html.replace(/<\/[^>]+>/g, '$&.');

  // remove all html tags and spaces &nbsp;
  text = text.replace(/(<([^>]+)>)/ig, '').replace(/&nbsp;/g, '');
  
  // split the text by period and remove empty strings
  return text.split('.').filter((c) => c !== '');
};
