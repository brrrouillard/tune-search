{   

    const createResultList = (results) => {
 
    }

    const search = value => {
        const url = `https://musicdemons.com/api/v1/artist/autocomplete`;

    };

    const handleKeyUpSearch = e => {
        const $input = e.currentTarget;
        search($input.value);
    };

    const init = () => {
        document.querySelector(`.search`).addEventListener(`keyup`, handleKeyUpSearch);
    };

    init();

}