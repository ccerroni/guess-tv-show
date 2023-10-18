import {API_URL} from '../config'
import {Movie} from '../types/movie'

export const getRandomMovie = async (): Promise<Movie> => {
  return fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  })
    .then((res) => res.json() as Promise<{results: Movie[]}>)
    .then(({results: movies}) => movies[Math.floor(Math.random() * movies.length)])
}

export const getPartialMovieName = (movie: Movie): string => {
  // TODO: [cc] - it is no need to create a const for every action
  // convert the string in an array of index
  const indexes = Array.from({length: movie.name.length}, (_, index) => index)

  // disorder the array randomly
  const randomSortedIndex = indexes.sort(() => (Math.random() >= 0.5 ? 1 : -1))

  // get the movie name length / 2 element of the array
  const halfIndexes = randomSortedIndex.slice(0, Math.floor(movie.name.length / 2))

  // replace the movie name with "_" in the selected indexes
  const partialName = movie.name.split('').reduce((name, letter, index) => {
    name = name.concat(halfIndexes.includes(index) && movie.name[index] !== ' ' ? '_' : letter)

    return name
  }, '')

  return partialName
}
