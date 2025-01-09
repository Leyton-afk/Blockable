let blockedWords = [];

function updateWordList() {
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';
    blockedWords.forEach((word, index) => {
        const li = document.createElement('li');
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        li.appendChild(wordSpan);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeWord(index);
        li.appendChild(removeButton);
        wordList.appendChild(li);
    });
}

function addWord() {
    const newWord = document.getElementById('newWord').value.trim().toLowerCase();
    if (newWord && !blockedWords.includes(newWord)) {
        blockedWords.push(newWord);
        chrome.storage.sync.set({ blockedWords }, updateWordList);
        document.getElementById('newWord').value = '';
    }
}

function removeWord(index) {
    blockedWords.splice(index, 1);
    chrome.storage.sync.set({ blockedWords }, updateWordList);
}

document.getElementById('addWord').addEventListener('click', addWord);
document.getElementById('newWord').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addWord();
    }
});

chrome.storage.sync.get('blockedWords', (data) => {
    blockedWords = data.blockedWords || [];
    updateWordList();
});

