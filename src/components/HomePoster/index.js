import './index.css'
import Header from '../Header'

const HomePoster = props => {
  const {homePageMovie} = props
  const {backdropPath, id, overview, title, posterPath} = homePageMovie
  console.log(id)
  return (
    <div
      alt={title}
      style={{
        backgroundImage: `url(${posterPath})`,
        backgroundSize: '100% 100%',
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <div className="home-page-content-container">
        <h1 className="home-poster-heading">{title}</h1>
        <p className="home-poster-overview">{overview}</p>
        <button type="button" className="home-poster-button">
          Play
        </button>
      </div>
    </div>
  )
}

export default HomePoster
