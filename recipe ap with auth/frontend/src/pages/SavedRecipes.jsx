import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useGetUserId from '../hooks/useGetUserId';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipes/savedRecipes/${userId}`)
        setSavedRecipes(res.data.savedRecipes)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchSavedRecipes()
  }, [])


  return (
    <div>
      <h2 className='font-bold text-3xl my-8'>Saved Recipes</h2>
      <div className='my-10 grid grid-cols-1 md:grid-cols-3 gap-10'>
        {
          !savedRecipes ? "Noting is here..." :
            savedRecipes?.map(({ imageUrl, cookTime, name, instructions, ingredients, _id }, unique) => (
              <div key={unique} className=" w-96 bg-base-100 shadow-orange-300/40 rounded-t-md overflow-hidden shadow-xl">
                <figure><img className='h-[250px] w-full' src={imageUrl} /></figure>
                <div className="text-left p-4 ">
                  <h2 className=""><b>Name:</b>{name}</h2>
                  <div><b>Ingredients:</b>{ingredients.map((e, id) => (
                    <p key={id}>{e}</p>
                  ))}</div>
                  <p><b>Instructions:</b>{instructions.length > 100 ? instructions.slice(0, 70) + "..." : instructions}</p>
                  <p><b>Cookign Time:</b>{cookTime}</p>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default SavedRecipes