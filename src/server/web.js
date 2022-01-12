const include = (File) => {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
};
global.include = include;

const doGet = (e) => {
  const title = 'Home | Dashboard';
  const html = 'index.html';

  return HtmlService.createTemplateFromFile(html)
    .evaluate()
    .setTitle(title)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
};
global.doGet = doGet;
