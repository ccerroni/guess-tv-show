import {useEffect, useMemo, useState} from 'react'
import confetti from 'canvas-confetti'

import {Movie} from './types/movie'
import {getPartialMovieName, getRandomMovie} from './helpers/movieHelper'

function App() {
  const [points, setPoints] = useState<number>(0)
  const [lives, setLives] = useState<number>(3)
  const [movie, setMovie] = useState<null | Movie>(null)
  const [hintsCount, setHintsCount] = useState<number>(3)
  const [showHint, setShowHint] = useState<boolean>(false)
  const partial = useMemo(() => {
    if (!movie) {
      return ''
    }
    if (movie) {
      return getPartialMovieName(movie)
    }
  }, [movie])

  useEffect(() => {
    setShowHint(false)
    getRandomMovie().then(setMovie)
  }, [lives, points])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // console.log(formData.get('partial')?.toString())
    const guess = formData.get('partial')?.toString()

    if (guess) {
      if (guess?.toLocaleLowerCase() === movie!.name.toLocaleLowerCase()) {
        confetti({particleCount: 300, spread: 150})
        setPoints((points) => points + 1)
      } else {
        setLives((lives) => lives - 1)
      }
      event.currentTarget.partial.value = ''
    }
  }

  function handleReset() {
    setLives(3)
    setPoints(0)
    setHintsCount(3)
    setShowHint(false)
  }

  function handleShowHint() {
    if (hintsCount) {
      setHintsCount((hintCount) => hintCount - 1)
      setShowHint(true)
    }
  }

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
      <header className="text-xl font-bold leading-[3rem]">Guess the TV show</header>
      <section>
        <div className="text-xl">
          Lives: {lives} - Available hints: {hintsCount} - Points: {points}
        </div>
        {!movie && <div className="text-center py-8">Loading</div>}
        {movie && lives ? (
          <form className="py-8 font-mono flex flex-col gap-4" onSubmit={handleSubmit}>
            <input readOnly className="p-4 text-xl tracking-widest" type="text" value={partial} />
            <input autoFocus className="p-4 text-xl" name="partial" type="text" />
            <button type="submit">Guess</button>
            {hintsCount > 0 && (
              <button type="button" onClick={() => handleShowHint()}>
                Show hint
              </button>
            )}
            {showHint && <p>{movie.overview}</p>}
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl my-6">Game Over!</p>
            <button onClick={() => handleReset()}>Play Again</button>
          </div>
        )}
      </section>
      <footer className="text-center leading-[3rem] opacity-70">
        © {new Date().getFullYear()} guess-tv-show
      </footer>
    </main>
  )
}

export default App
