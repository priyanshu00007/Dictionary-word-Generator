const wordContainer = document.getElementById('word-container');
const refreshBtn = document.getElementById('refresh-btn');
const languageSelect = document.getElementById('language-select');
const loadingAnimation = document.getElementById('loading-animation');

let currentLanguage = 'en';

languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    refreshWord();
});

refreshBtn.addEventListener('click', refreshWord);

function refreshWord() {
    loadingAnimation.style.display = 'block';
    wordContainer.style.opacity = '0.5';

    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(response => response.json())
        .then(data => {
            const randomWord = data[0];
            fetchWordDefinition(randomWord);
        })
        .catch(error => {
            console.error('Error fetching random word:', error);
            loadingAnimation.style.display = 'none';
            wordContainer.style.opacity = '1';
        });
}

function fetchWordDefinition(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/${currentLanguage}/${word}`)
        .then(response => response.json())
        .then(data => {
            const meaning = data[0].meanings[0].definitions[0].definition;
            wordContainer.innerHTML = `
                <p id="word">${word}</p>
                <p id="meaning">${meaning}</p>
            `;
            loadingAnimation.style.display = 'none';
            wordContainer.style.opacity = '1';
        })
        .catch(error => {
            console.error('Error fetching word definition:', error);
            loadingAnimation.style.display = 'none';
            wordContainer.style.opacity = '1';
        });
}

refreshWord();