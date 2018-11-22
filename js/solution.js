{   

    const createResultList = (results) => {
        const $results = document.querySelector(`.results`);
        $results.innerHTML = results.map(createResultListItem).join(``);

        document.querySelector(`.results`).addEventListener(`mouseup`, handleClick);
    }

    const createResultListItem = result => `<li class="result" id="${result.id}">${result.name}</li>`;

    const createSongList = songs => {
        const $songs = document.querySelector(`.songs`);
        songs.forEach(song => {
            $songs.appendChild(createSongListItem(song));
        });

    }

    const createSongListItem = result => {
        const $title = document.createElement('h3');
        const $video = document.createElement('iframe');

        $title.innerText = result.title;

        $video.setAttribute('min-width', '420');
        $video.setAttribute('min-height', '315');
        $video.setAttribute('src', `https://www.youtube.com/embed/${result.youtube_id}`)

        const $songListItem = document.createElement('li');

        $songListItem.appendChild($title);
        $songListItem.appendChild($video);

        return $songListItem;
    };

    const createArtistInfo = artist => {
        const $title = document.querySelector('.artist');
        $title.innerText = artist.name;
    };

    const search = value => {
        const url = `https://musicdemons.com/api/v1/artist/autocomplete`;
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              },
            body: `name=${value}`
        };

        fetch(url, options)
        .then(response => response.json())
        .then(jsonData => createResultList(jsonData));
    };

    const findArtistById = id => {
        const url = `https://musicdemons.com/api/v1/artist/${id}`;

        fetch(url)
        .then(response => response.json())
        .then(jsonData => createArtistInfo(jsonData));
    };

    const findSongsById = id => {
        const url = `https://musicdemons.com/api/v1/artist/${id}/songs`;

        fetch(url)
        .then(response => response.json())
        .then(jsonData => createSongList(jsonData));
    }

    const handleKeyUpSearch = e => {
        const $songs = document.querySelector(`.songs`);
        $songs.innerHTML = "";
        const $input = e.currentTarget;
        if($input.value == ""){
            const $results = document.querySelector(`.results`);
            $results.innerHTML = "";
        }else {
            search($input.value);
        }
    };

    const handleClick = e => {
        const $results = document.querySelector(`.results`);
        const $search = document.querySelector('.search');
        $results.innerHTML = "";
        $search.innerText = "";

        const $input = e.target;
        findArtistById($input.id);
        findSongsById($input.id);
    }

    const init = () => {
        document.querySelector(`.search`).addEventListener(`keyup`, handleKeyUpSearch);
    };

    init();

}