import Resource from './Resource';
import Utils from './Utils';

const doGet = (e) => {
  // admin
  const title = 'Home | Dashboard';
  const html = 'index.html';

  // editor
  const editorTitle = 'Home | Dashboard';
  const editorHtml = 'index-editor.html';

  // Access Denied
  const title403 = 'Access Denied';
  const html403 = '403.html';

  const currentUser = Utils.getCurrentUser();

  const users = Resource.getUsers();
  let userExists = false;
  let userRole = '';
  users.forEach((user) => {
    if (user.email === currentUser) {
      userExists = true;
      userRole = user.role;
    }
  });

  if (userExists) {
    if (userRole === 'admin') {
      return HtmlService.createTemplateFromFile(html)
        .evaluate()
        .setTitle(title)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    } else if (userRole === 'editor') {
      return HtmlService.createTemplateFromFile(editorHtml)
        .evaluate()
        .setTitle(editorTitle)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    } else {
      return HtmlService.createTemplateFromFile(html403)
        .evaluate()
        .setTitle(title403)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
  } else {
    return HtmlService.createTemplateFromFile(html403)
      .evaluate()
      .setTitle(title403)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
};
global.doGet = doGet;
