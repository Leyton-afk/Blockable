let blockedWords = [];

function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    blockedWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      text = text.replace(regex, '*'.repeat(word.length));
    });
    node.textContent = text;
  } else {
    node.childNodes.forEach(replaceText);
  }
}

/**
 * Replace all occurrences of blocked words in the text nodes of the given DOM node.
 * @param {Node} node The DOM node to traverse.
 */
function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    blockedWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      text = text.replace(regex, '*'.repeat(word.length));
    });
    node.textContent = text;
  } else {
    node.childNodes.forEach(replaceText);
  }
}

/**
 * Update the list of blocked words by retrieving it from the extension's storage
 * and calling replaceText on the document body.
 */
function updateBlockedWords() {
  chrome.storage.sync.get('blockedWords', (data) => {
    blockedWords = data.blockedWords || [];
    replaceText(document.body);
  });
}

updateBlockedWords();

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach(replaceText);
  });
});

observer.observe(document.body, { childList: true, subtree: true });

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.blockedWords) {
    updateBlockedWords();
  }
});
