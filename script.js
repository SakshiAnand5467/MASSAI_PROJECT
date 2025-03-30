document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("recipe-form");
    const recipesContainer = document.getElementById("recipes-container");
    const filterCategory = document.getElementById("filter-category");

    function saveRecipes(recipes) {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    function getRecipes() {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    }

    function renderRecipes(filter = "All") {
        recipesContainer.innerHTML = "";
        const recipes = getRecipes();
        recipes.filter(recipe => filter === "All" || recipe.category === filter)
            .forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.classList.add("recipe-card");
                recipeCard.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <p><strong>Category:</strong> ${recipe.category}</p>
                    <h4>Ingredients</h4>
                    <p>${recipe.ingredients}</p>
                    <h4>Preparation Steps</h4>
                    <p>${recipe.preparation}</p>
                `;
                recipesContainer.appendChild(recipeCard);
            });
    }

    recipeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const recipe = {
            name: document.getElementById("recipe-name").value,
            ingredients: document.getElementById("ingredients").value,
            category: document.getElementById("category").value,
            preparation: document.getElementById("preparation").value
        };
        const recipes = getRecipes();
        recipes.push(recipe);
        saveRecipes(recipes);
        renderRecipes();
        recipeForm.reset();
    });

    filterCategory.addEventListener("change", (event) => {
        renderRecipes(event.target.value);
    });

    renderRecipes();
});
