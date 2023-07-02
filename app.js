const searchBtn = document.querySelector('.searchBtn');
const searchInput = document.getElementById('searching');
const searchedItemsArea = document.querySelector(".searchItemsArea");
const itemRecipeArea = document.querySelector(".itemRecipeArea");

searchBtn.addEventListener('click', searchItem);

function searchItem() {
    const searchUserItem = searchInput.value.toLowerCase();

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchUserItem}`)
        .then(resp => {
            // console.log(resp);

            return resp.json();
        })
        .then(result => {
            console.log(result);

            if (result.data.recipes.length === 0)
                throw new Error(`Sorry! didn't found recipe of ${searchInput.value}`);

            showSearchRelatedItems(result)
        })
        .catch(err => {
            console.error(err);

            unfoundRecipeItem(err);
        })

}

const errorMessage = document.querySelector(".errorMsg");
const error = document.querySelector(".error");

function unfoundRecipeItem(errorMsg) {
    console.log(errorMsg);

    errorMessage.style.display = "block";
    error.innerHTML = errorMsg;
}

const showSearchRelatedItems = (getItems) => {

    searchedItemsArea.innerHTML = "";

    for (let recipeItem of getItems.data.recipes) {
        const srchItem = document.createElement('div');
        srchItem.setAttribute("class", "srchItem");

        const itemContent = `<div class="item" id="${recipeItem.id}" onclick="getItemRecipe(this)">
                                <div class="itemImage">
                                    <img src="${recipeItem.image_url}" alt="" class="img-fluid">
                                </div>
                                <div class="itemName p-0">
                                    <h2 class="m-0">${recipeItem.title}</h2>
                                    <h5 class="m-0">${recipeItem.publisher}</h5>
                                </div>
                            </div>`;

        srchItem.innerHTML = itemContent;
        searchedItemsArea.appendChild(srchItem);
    }
}



function getItemRecipe(rcpItem) {
    // console.log(rcpItem)
    const selectedRecipeItemID = rcpItem.getAttribute("id");

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${selectedRecipeItemID}`)
        .then(resp => {
            // console.log(resp);

            return resp.json();
        })
        .then(result => {
            // console.log(result);

            if (result.results === 0)
                throw new Error(`Sorry your Item is not Found`);

            showSelectedItemRecipe(result);

        })
        .catch(err => console.error(err))

    itemRecipeArea.innerHTML = "";
}

let recipeIngredients;

function getIngredients() {

    let recipeItemIngredients = [];

    for (let ingredient of recipeIngredients) {

        const ingredientContent = `<div class="ingredient">
                                        <i class="fa-solid fa-check"></i>
                                        <p class="m-0">${ingredient.quantity ?? ""} ${ingredient.unit ?? ""} ${ingredient.description}</p>
                                    </div>`

        recipeItemIngredients.push(ingredientContent);
    }

    // console.log(recipeItemIngredients)
    return recipeItemIngredients;
}



const showSelectedItemRecipe = (getRecipe) => {
    console.log(getRecipe)


    recipeIngredients = getRecipe.data.recipe.ingredients;
    const recipeItemImage = getRecipe.data.recipe.image_url;
    const recipeItemTitle = getRecipe.data.recipe.title;
    const recipeItemCookingTime = getRecipe.data.recipe.cooking_time;
    const recipeItemServings = getRecipe.data.recipe.servings;
    const recipeItemPublisher = getRecipe.data.recipe.publisher;


    const itemRecipe = document.createElement("div");
    itemRecipe.setAttribute("class", "itemRecipe row g-0");

    itemRecipeContent = `<div class="itemRecipeAbout col-12">
                            <div class="itemRecipeImage">
                                <img src="${recipeItemImage}" alt="pasta" class="img-fluid">
                            </div>
                            <div class="itemRecipeTitle">
                                <h2 class="m-0">${recipeItemTitle}</h2>
                            </div>
                            <div class="itemRecipeAbt">
                                <div class="rcpAbt">
                                    <div class="time">
                                        <i class="fa-regular fa-clock"></i>
                                        <h5 class="m-0"><span>${recipeItemCookingTime}</span> Minutes</h5>
                                    </div>
                                    <div class="serve">
                                        <i class='bx bx-group'></i>
                                        <h5 class="m-0"><span>${recipeItemServings}</span> Servings</h5>
                                    </div>
                                </div>
                                <button type="button" class="rcpSavedBtn">
                                    <i class="fa-regular fa-bookmark"></i>
                                </button>
                            </div>
                        </div>

                        <div class="itemRecipeIngredients col-12">
                            <div class="rcpIngredientHd">
                                <h4 class="m-0">Recipe Ingredients</h4>
                            </div>

                            <div class="rcpIngredients">
                                ${getIngredients().join('')}
                            </div>
                        </div>

                        <div class="itemRecipeDescription col-12">
                            <h4 class="m-0">How to cook it</h4>
                            <p>This recipe was carefully designed and tested by <span>${recipeItemPublisher}</span>. Please check out directions at their website.</p>
                        </div>`

    itemRecipe.innerHTML = itemRecipeContent;
    itemRecipeArea.appendChild(itemRecipe);

}