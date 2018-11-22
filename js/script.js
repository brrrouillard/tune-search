{   

    const createResultList = (results) => {
        const list = document.querySelector(`.results`);
        for (let i = 0; i < results.length; i++){
            let node = document.createElement(`li`);
            node.classList.add(`result`);
            node.innerHTML = results[i].name;
            list.appendChild(node);
        }     
    }

    const search = value => {
        clearSearch();
        const url = `https://musicdemons.com/api/v1/artist/autocomplete`;
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              },
            body: `name=${value}`
        };

        fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            createResultList(data);
        });
    };

    const clearSearch = () => {
        const list = document.querySelector(`.results`);
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

    const handleKeyUpSearch = e => {
        const $input = e.currentTarget;
        search($input.value);
    };

    const init = () => {
        document.querySelector(`.search`).addEventListener(`keyup`, handleKeyUpSearch);
    };

    init();

}