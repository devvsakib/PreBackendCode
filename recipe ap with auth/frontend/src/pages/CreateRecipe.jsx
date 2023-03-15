import React, { useState } from 'react'
import axios from "axios"
import useGetUserId from "../hooks/useGetUserId"
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const CreateRecipe = () => {
  const user = useGetUserId();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"])
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imageUrl: '',
    cookTime: 0,
    owner: user
  })
  const handleChange = e => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value })
  }
  const handleIngd = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value
    setRecipe({ ...recipe, ingredients })
  }

  const addIngedient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
  }

  const onCreateRecipe = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/recipes", recipe, {
        headers: { authorization: cookies.access_token }
      })
      console.log("Success!");
      navigate("/")
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <h1 className='text-3xl my-5'>Create Recipe</h1>
      <form className='flex flex-col my-5 gap-5 items-center justify-center w-7/12 mx-auto' onSubmit={onCreateRecipe} >
        <label htmlFor="username">Name
          <input type="text" name="name" className='ml-3 py-2 px-4 ' id="username"
            onChange={handleChange} />
        </label>

        <label htmlFor="ingredients">Ingredients

          <div className='flex flex-col gap-3'>
            {
              recipe.ingredients.map((itm, idx) => (
                <input type="text" name="ingredient" className='ml-3 py-2 px-4'
                  value={itm}
                  onChange={e => handleIngd(e, idx)}
                  key={idx}
                />
              ))
            }
          </div>
          <button type='button' className='ml-4 bg-white/20 px-4 py-2 my-4 rounded-sm' onClick={addIngedient}>Add Ingredient</button>
        </label>
        <label htmlFor="instructions">Instructions
          <input type="text" name="instructions" className='ml-3 py-2 px-4 ' id="password"
            onChange={handleChange} />
        </label>
        <label htmlFor="imageUrl">Image URL
          <input type="text" name="imageUrl" className='ml-3 py-2 px-4 ' id="password"
            onChange={handleChange} />
        </label>
        <label htmlFor="cookTime">Cooking time[Minute]
          <input type="text" name="cookTime" className='ml-3 py-2 px-4 ' id="password"
            onChange={handleChange} />
        </label>
        <button type="submit" className='bg-orange-500/80 w-1/12 mx-auto py-2 rounded-sm'>Create</button>
      </form>
    </div>
  )
}

export default CreateRecipe