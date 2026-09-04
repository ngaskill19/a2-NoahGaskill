## Cookbook - A Recipe Manager
Link: https://a2-noahgaskill.onrender.com/

For this project, I decided to create a simple recipe manager website. Users can enter the recipe name and cooktime, and enter the ingredients and steps one-by-one. They have the option to delete ingredients and steps if they make a typo or mistake. All the currently stored recipes are shown on the home page to the right of the form to add recipes, and users have the option to delete recipes as well. Based on the info entered, the server will calculate a difficulty for the recipe. I used flexbox in order to position elements on the website.


## Technical Achievements
- **Tech Achievement 1 - Single Page App**: Using a GET request once the page loads, I use Javascript to build tables for each of the recipe on the server-side data as soon as the page loads. Both the form to input a new recipe as well as the stored recipe tables are displayed on index.html.html. When the user submits the form, it sends the new recipe to the server and then rebuilds the recipe display without changing or refreshing the page.

- **Tech Achievement 2 - Ingredient/Instruction submission**: I designed the ingredient and instruction fields to work so that users enter one item at a time, which then gets added to a list displayed on the screen. I did have to research some things to make this work, like learning that a button in a form has a default behavior of submitting the form, or how to access the parent element of something so the delete button could work. This design decision also complicated the process of obtaining the entered data. Instead of just using input.value, I had to get the li elements from inside each list, get the inner text, and then parse out the delete button's text. It makes sense that text from an object's children are included in the inner text of the parent, but this is behavior that I felt was not obvious.


### Design/Evaluation Achievements
- **Design Achievement 1 - UI/UX Test**: 
1. Karnik
2. The main problem he faced with my design was the submission of ingredients and instructions. He did not realize that they had to press a button to actually add the recipe, and thought leaving it in the input field was enough (which for the other inputs, it was, so I understand).
3. Again, the thing that surprised me was that he found it unclear how to save the ingredients and recipe steps properly. 
4. Based on his feedback and the results of this test, I plan to make the add ingredient and instruction buttons darker to make them stand out more, and I updated the placeholder text of the input boxes to mention hitting the button, and not just entering an ingredient or step.