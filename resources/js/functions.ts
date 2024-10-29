export const generateImageUrl = (imageUrl:string, size = 'w1280') => {
    return `https://image.tmdb.org/t/p/${size}/${imageUrl}`;
};
