const requestUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const sound = document.querySelector('#sound');

document.querySelector('.button')
    .addEventListener('click', () => {
        const word = document.querySelector('input').value;
        fetch(`${requestUrl}${word}`)
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(data);
                document.querySelector('.output-area')
                .innerHTML = `
                <div class="middle">
                    <div class="word-div">
                        <p>${data[0].word}</p>
                        <button onclick="playSound()" class="audio-btn">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                        </div>
                    <div class="details">
                        <p>${data[0].meanings[0].partOfSpeech}</p>
                        <p>${data[0].phonetic || ""}</p>
                    </div>
                </div>
                <p class="meaning">${data[0].meanings[0].definitions[0].definition}</p>
                <div class="sentence2">
                    <p>${data[0].meanings[0].definitions[0].example || ""}</p>
                </div>`;

                sound.setAttribute('src', `${data[0].phonetics[1].audio}`);
            })
            .catch( () => {
                document.querySelector('.output-area')
                .innerHTML = `<h1 class="error-msg">Couldn't Find Your Word</h1>`;
            })
    });

    function playSound(){
        sound.play();
    }