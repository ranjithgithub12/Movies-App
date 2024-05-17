import './index.css'

import Header from '../Header'
import SimilarMovies from '../SimilarMovies'
import Footer from '../Footer'

const FullMovieDetails = props => {
  const {movieDetails} = props
  const {
    adult,
    backdropPath,
    budget,
    genres,
    overview,
    releaseDate,
    runtime,
    similarMovies,
    spokenLanguages,
    title,
    voteAverage,
    voteCount,
  } = movieDetails

  const updatedLanguage = spokenLanguages.map(each => ({
    id: each.id,
    englishName: each.english_name,
  }))

  const updatedSimilarData = similarMovies.map(eachList => ({
    backdropPath: eachList.backdrop_path,
    id: eachList.id,
    overview: eachList.overview,
    posterPath: eachList.poster_path,
    title: eachList.title,
  }))

  const getDates = new Date(releaseDate)
  const date = getDates.getDate()
  const month = getDates.toLocaleString('default', {month: 'long'})
  const year = getDates.getFullYear()

  const ordinalSuffix = day => {
    if (day > 3 && day < 21) return 'th' // 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const hour = Math.floor(runtime / 60)
  const minutes = runtime % 60

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundSize: '100% 100%',
          minHeight: '60vh',
        }}
      >
        <Header />
        <div className="movie-details-content-container">
          <h1 className="movie-details-heading">{title}</h1>
          <div className="movie-time-year-container">
            <p>
              {hour}h {minutes}m
            </p>
            <p className="adult-content">{adult ? 'A' : 'U/A'}</p>
            <p>{year}</p>
          </div>
          <p className="movie-details-overview">{overview}</p>
          <button type="button" className="movie-details-play-button">
            {' '}
            Play{' '}
          </button>
        </div>
      </div>

      <div className="movie-details-below-container">
        <div className="gener-language-budget-container">
          <div className="movie-details-movie-hilights">
            <h1 className="gener-heading">Genres</h1>
            <div className="unorder-list-hilights">
              {genres.map(each => (
                <p className="list-of-geners" key={each.id}>
                  {each.name}
                </p>
              ))}
            </div>
          </div>
          <div className="movie-details-movie-hilights">
            <h1 className="gener-heading">Audio Available</h1>
            <div className="unorder-list-hilights">
              {updatedLanguage.map(each => (
                <p className="list-of-geners" key={each.id}>
                  {each.englishName}
                </p>
              ))}
            </div>
          </div>
          <div className="movie-details-movie-hilights">
            <h1 className="gener-heading">Rating Count</h1>
            <p className="list-of-geners">{voteCount}</p>
            <h1 className="gener-heading">Rating Average</h1>
            <p className="list-of-geners">{voteAverage}</p>
          </div>
          <div>
            <h1 className="gener-heading">Budget</h1>
            <p className="list-of-geners">{budget}</p>
            <h1 className="gener-heading">Release Date</h1>
            <p className="list-of-geners">
              {date}
              {ordinalSuffix(date)} {month} {year}
            </p>
          </div>
        </div>

        <div className="similar-product-container">
          <h1 className="similar-product-heaing">More like this</h1>
          <ul className="unorder-similar-product">
            {updatedSimilarData.map(eachMovie => (
              <SimilarMovies eachMovie={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default FullMovieDetails
