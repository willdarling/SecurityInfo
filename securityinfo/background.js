function openPage() {
  browser.tabs.create({
    url: "/my_page.html"
  });
}

browser.browserAction.onClicked.addListener(openPage);