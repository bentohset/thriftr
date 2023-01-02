// flattens clothingArticle object in db into a single layer array (or object idek)

const flattenclothes = (clothingArticle) =>{
    const newClothes = {...clothingArticle};
  

    const [id, article] = Object.entries(newClothes).flat();

    return {id, ...article}
}


export default flattenclothes;