let editingIndex = null; 

let recipes = [
    {
      name: "Classic Hamburger",
      category: "Main Course",
      time: "25 mins",
      ingredients: ["1 lb ground beef", "2 buns", "lettuce", "tomato", "cheddar cheese", "ketchup"],
      steps: "1. Form beef into patties.\n2. Grill on medium heat for 4-5 mins each side.\n3. Toast buns.\n4. Assemble with toppings.",
      image: "RedDot_Burger.jpg"
    },
    {
      name: "Homemade Waffles",
      category: "Dessert",
      time: "20 mins",
      ingredients: ["2 cups flour", "2 eggs", "1.5 cups milk", "1/4 cup butter", "1 tbsp sugar", "1 tsp vanilla"],
      steps: "1. Mix dry ingredients.\n2. Add wet ingredients and whisk.\n3. Pour into waffle iron.\n4. Cook until golden brown.",
      image: "waffle.jpg"
    },
    {
      name: "Grilled Steak",
      category: "Main Course",
      time: "30 mins",
      ingredients: ["1 ribeye steak", "salt", "pepper", "olive oil", "garlic"],
      steps: "1. Season steak.\n2. Heat grill to high.\n3. Cook 4-5 mins per side.\n4. Let rest before slicing.",
      image: "steak.jpg"
    }
  ];

  document.getElementById("recipeForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("recipeName").value;
    const category = document.getElementById("recipeCategory").value;
    const time = document.getElementById("recipeTime").value;
    const ingredients = document.getElementById("recipeIngredients").value.split(",");
    const steps = document.getElementById("recipeSteps").value;
    const imageInput = document.getElementById("recipeImageUpload");
  
    let image = "";
    if (imageInput.files && imageInput.files[0]) {
      image = URL.createObjectURL(imageInput.files[0]);
    } else if (editingIndex !== null) {
      image = recipes[editingIndex].image;
    }
  
    const newRecipe = {
      name,
      category,
      time,
      ingredients,
      steps,
      image,
      favorite: recipes[editingIndex]?.favorite || false,
    };
  
    if (editingIndex !== null) {
      recipes[editingIndex] = newRecipe;
      editingIndex = null; 
    } else {
      recipes.push({ ...newRecipe, favorite: false });
    }
  
    displayRecipes(recipes);
    this.reset();
  });

  function startEdit(index) {
    const recipe = recipes[index];
    document.getElementById("recipeName").value = recipe.name;
    document.getElementById("recipeCategory").value = recipe.category;
    document.getElementById("recipeTime").value = recipe.time;
    document.getElementById("recipeIngredients").value = recipe.ingredients.join(", ");
    document.getElementById("recipeSteps").value = recipe.steps;
    editingIndex = index;
    window.scrollTo(0, document.body.scrollHeight); 
  }
    

function toggleFavorite(index) {
  recipes[index].favorite = !recipes[index].favorite;
  displayRecipes(recipes);
}

function showFavorites() {
  const favoriteRecipes = recipes.filter(r => r.favorite);
  displayRecipes(favoriteRecipes);
}

  

function displayRecipes(recipeArray) {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  recipeArray.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <p><strong>Category:</strong> ${recipe.category}</p>
      <p><strong>Time:</strong> ${recipe.time}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
      <p><strong>Steps:</strong> ${recipe.steps}</p>
      <button onclick="startEdit(${index})">Edit</button>
      <button onclick="toggleFavorite(${index})">${recipe.favorite ? "❤️" : "🤍"}</button>
      <button onclick="deleteRecipe(${index})">Delete</button>
    `;

    recipeList.appendChild(recipeCard);
  });
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    displayRecipes(recipes);
}

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.ingredients.some(i => i.toLowerCase().includes(query))
  );
  displayRecipes(filtered);
});

document.getElementById("categoryFilter").addEventListener("change", function () {
  const selectedCategory = this.value;
  const filtered = selectedCategory
    ? recipes.filter(r => r.category === selectedCategory)
    : recipes;
  displayRecipes(filtered);
});

displayRecipes(recipes);
