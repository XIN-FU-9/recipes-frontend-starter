import { useState, useEffect } from 'react'
import './App.css'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'

// This is your base URL for your API
const API_URL = 'http://localhost:8080'

export default function App() {
  // `recipes` is just a local snapshot — a successful request below won't show up
  // on screen until you also call setRecipes. The server and this state don't auto-sync.
  // AGAIN, the frontend UI state and the server data don't auto-sync - you must do this manually!
  // WHAT DOES THAT MEAN: Just becuase you were able to modify the state/data in the server with the fetch calls, doesn't mean the UI will reflect that automatically.
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    // TODO (Part 1): fetch `${API_URL}/api/recipes`, convert the response to JSON, and setRecipes with it
    fetch(`${API_URL}/api/recipes`)
    .then(response => response.json())
    .then(data => {
      setRecipes(data)
    })
  }, [])

  function handleAddRecipe(newRecipe) {
    // TODO (Part 2): POST newRecipe to `${API_URL}/api/recipes`, then add the created recipe to `recipes`
    fetch(`${API_URL}/api/recipes`,{
    method: "POST",
    headers : 
      {"Content-Type": "application/json"},
    body: JSON.stringify(newRecipe)})
    .then(response => response.json())
    .then(data => {
    setRecipes((currentRecipe) => [...currentRecipe, data])
    })
  }

  function handleDeleteRecipe(id) {
    // TODO (Part 3): DELETE `${API_URL}/api/recipes/${id}`, then remove that recipe from `recipes`

     //class note:
  const options = {
    method: 'DELETE'
  }

  fetch(API_URL + '/api/recipes' + id, options)
  .then(response => {
    // return response.text()
  })
  .then((data) => {
    //console.log(data)
    const filterRecipes = recipes.filter( rec => rec.id !== id)
    setRecipes(filterRecipes)
  }) 

  // end of the note

  //below it is wrong way.
    // fetch(`${API_URL}/api/recipes/${id}`,{
    // method: "DELETE",})
    // .then(response => response.json())
    
    // //added new, need to change the last part.
    // // .then(deleteRecipe => {
    // //   setRecipes((recipes.fliter((recipe)),recipe.id !== id))
    // // end added

    // .then(deleteRecipe => {
    //   setRecipes((deleteRecipe) => [...deleteRecipe ])
    // })
    // console.log(deleteRecipe)  
  }


 

  function handleToggleVegetarian(id) {
    // TODO (Stretch): PATCH `${API_URL}/api/recipes/${id}` to flip `vegetarian`, then update `recipes`

    //class note:
    const option = {
      method: 'PATCH',
      header: {
        'Content-Type:': "application/Json"
      },
      body: JSON.stringify({
      })
    }

    fetch(API_URL + '/api/recipes/' + id, option)
    .then(response => response.json)
    .then(data =>{
      console.log(data)
      const modifyRecArr = recipes.map(rec => {
        if(rec.id === id){
          return ([...data])
        }
      })
    })
    // end of the note but not finished , also need to modifd the recipes.js file 
    //located in the router.patch
    
  }

  return (
    <div id="app">
      <h1>Recipes</h1>
      <RecipeForm onAdd={handleAddRecipe} />
      <RecipeList
        recipes={recipes}
        onDelete={handleDeleteRecipe}
        onToggleVegetarian={handleToggleVegetarian}
      />
    </div>
  )
}
