// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#name' ),
        json = { name: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const list = await response.json()
  console.log(list)
  buildTable(list)
}

window.onload = function() {
  const button = document.querySelector('#submit')
  button.onclick = submit
}


const getRecipes = async function(){
  const response = await fetch('/data', {method :'GET'})
  const list = await response.json()
  console.log(list)
  buildTable(list)
  
}
document.addEventListener("DOMContentLoaded", getRecipes)

function buildTable(list){
  const recipes = document.querySelector('section.box')
  // clear all the tables but keep "All Recipes" heading
  recipes.replaceChildren(document.getElementById('all-recipes'))

  for(let recipe of list) {
    //building table for the recipe
    const table = document.createElement('table')
    recipes.appendChild(table)

    for(let i = 0; i < 3; i++){
      table.appendChild(document.createElement('tr'))
    }
    rows = table.querySelectorAll('tr')
    
    //fill rows w/ data
    const nameTH = document.createElement('th')
    nameTH.colSpan = 2
    nameTH.innerText = recipe['recipeName']
    rows[0].appendChild(nameTH)

    const timeTD = document.createElement('td')
    timeTD.innerText = `Cook time: ${recipe['cookTime']}`
    const diffTD = document.createElement('td')
    diffTD.innerText = `Difficulty: ${recipe['difficulty']}`
    rows[1].appendChild(timeTD)
    rows[1].appendChild(diffTD)
    
    const ingredientList = document.createElement('ul')
    for (let ingredient of recipe['ingredients']){
      const item = document.createElement('li')
      item.innerText = ingredient
      ingredientList.appendChild(item)
    }

    const instructList = document.createElement('ol')
    for (let step of recipe['instructions']){
      const item = document.createElement('li')
      item.innerText = step
      instructList.appendChild(item)
    }

    const ingredientTD = document.createElement('td')
    ingredientTD.appendChild(ingredientList)
    rows[2].appendChild(ingredientTD)

    const instructTD = document.createElement('td')
    instructTD.appendChild(instructList)
    rows[2].appendChild(instructTD)
  }
}