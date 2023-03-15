import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useGetUserId from '../hooks/useGetUserId';
import { useCookies } from 'react-cookie'

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();
  const [cookies, _] = useCookies(["access_token"])

  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/recipes")
        setRecipes(res.data)
      } catch (error) {
        console.log(error.message);
      }
    }
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipes/savedRecipes/id/${userId}`)
        setSavedRecipes(res.data.savedRecipes)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchRecipes();
    fetchSavedRecipes()
  }, [])

  const saveRecipe = async (recipeId) => {
    try {
      const res = await axios.put("http://localhost:5000/recipes", {
        recipeId,
        userId
      }, {
        headers: { authorization: cookies.access_token }
      })
      setSavedRecipes(res.data.savedRecipes)
    } catch (error) {
      console.log(error.message);
    }
  }


  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <div className='my-10 grid grid-cols-1 md:grid-cols-3 gap-10'>
        {
          recipes?.map(({ imageUrl, cookTime, name, instructions, ingredients, _id }, unique) => (
            <div key={unique} className=" w-96 bg-base-100 shadow-orange-300/40 rounded-t-md overflow-hidden shadow-xl">
              <figure><img className='h-[250px] w-full' src={imageUrl} /></figure>
              <div className="text-left p-4 ">
                <h2 className=""><b>Name:</b>{name}</h2>
                <div><b>Ingredients:</b>{ingredients.map((e, id) => (
                  <p key={id}>{e}</p>
                ))}</div>
                <p><b>Instructions:</b>{instructions.length > 100 ? instructions.slice(0, 70) + "..." : instructions}</p>
                <p><b>Cookign Time:</b>{cookTime}</p>
                {
                  userId ?
                    (
                      <button onClick={() => saveRecipe(_id)}>
                        {savedRecipes && isRecipeSaved(_id) ? "Saved" : "Save"}
                      </button>
                    ) : "Login To Save"
                }

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home