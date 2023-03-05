

export default function Gallary({ recipes }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {recipes && recipes.map((recipe) =>
                <div className="card w-auto bg-base-100 shadow-xl">
                    <figure><img className="w-full h-[250px]" src={recipe.strMealThumb} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {recipe.strMeal}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Favorite</div>
                            <div className="badge badge-outline">Reciepe</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
