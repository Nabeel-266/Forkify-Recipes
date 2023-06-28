const searchBtn = document.querySelector('.searchBtn');
const searchInput = document.getElementById('searching');


searchBtn.addEventListener('click', searchItem);

function searchItem() {
    const searchUserItem = searchInput.value.toLowerCase();

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchUserItem}`)
        .then(resp => {
            console.log(resp);

            return resp.json();
        })
        .then(result => {
            console.log(result);

            if (result.results === 0)
                throw new Error(`Sorry your Item is not Found`);

            displayItems(result)
        })
        .catch(err => console.error(err))



    console.log(searchUserItem)
}

const searchItemsArea = document.querySelector(".searchItems");

const displayItems = (getItems) => {

    for (let recipeItem of getItems.data.recipes) {
        const item = document.createElement('div');
        item.setAttribute("class", "item");

        const itemContent = `<div class="itemImage">
                                <img src="${recipeItem.image_url}" alt="" class="img-fluid">
                            </div>
                            <div class="itemName p-0">
                                <h2 class="m-0">${recipeItem.title}</h2>
                                <h5 class="m-0">${recipeItem.publisher}</h5>
                            </div>`;

        item.innerHTML = itemContent;
        searchItemsArea.appendChild(item);
    }
}