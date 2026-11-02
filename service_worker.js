function collectBookmarkUrls(nodes, urls = []) {
  for (const node of nodes) {
    if (node.url) {
      urls.push(node.url);
    }

    if (node.children) {
      collectBookmarkUrls(node.children, urls);
    }
  }

  return urls;
}

chrome.action.onClicked.addListener(async () => {
  const tree = await chrome.bookmarks.getTree();
  const urls = collectBookmarkUrls(tree);

  if (urls.length === 0) {
    return;
  }

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];

  if (activeTab?.id !== undefined) {
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    await chrome.tabs.update(activeTab.id, { url: randomUrl });
  }
});