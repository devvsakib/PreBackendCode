import React, { useState } from 'react';
import { searchRecipes } from '../API/API';
import Gallary from '../Cards/Gallary';

const SearchInput = ({ recipes, setRecipes }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    async function handleInputChange(event) {
        const query = event.target.value;
        setSearchQuery(query);
        try {
            const response = await searchRecipes(query);
            setRecipes(response.meals || []);
            setError(null);
        } catch (error) {
            console.error(error);
            setRecipes([]);
            setError('Error searching for recipes');
        }
    }

    return (
        <div>
            <input
                type="text"
                className="input input-bordered w-full max-w-lg placeholder:text-black py-6  my-5"
                placeholder="Search for a recipe"
                value={searchQuery}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchInput;
