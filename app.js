const searchBtn = document.querySelector('.searchBtn');
const searchInput = document.getElementById('searching');
const searchItemsArea = document.querySelector(".searchItems");

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


    searchItemsArea.innerHTML = "";
    console.log(searchUserItem)
}

const displayItems = (getItems) => {

    for (let recipeItem of getItems.data.recipes) {
        const srchItem = document.createElement('div');
        srchItem.setAttribute("class", "srchItem");

        const itemContent = `<div class="item" id="${recipeItem.id}">
                                <div class="itemImage">
                                    <img src="${recipeItem.image_url}" alt="" class="img-fluid">
                                </div>
                                <div class="itemName p-0">
                                    <h2 class="m-0">${recipeItem.title}</h2>
                                    <h5 class="m-0">${recipeItem.publisher}</h5>
                                </div>
                            </div>`;

        srchItem.innerHTML = itemContent;
        searchItemsArea.appendChild(srchItem);
    }
}