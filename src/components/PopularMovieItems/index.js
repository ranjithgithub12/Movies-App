import './index.css'
import {Link} from 'react-router-dom'

const PopularMovieItems = props => {
  const {eachMovie} = props
  const {title, posterPath, id} = eachMovie

  return (
    <Link to={`/movies/${id}`} className="popular-link-menu">
      <li className="list-of-popular-movies">
        <img src={posterPath} alt={title} className="popular-movie-image" />
      </li>
    </Link>
  )
}

export default PopularMovieItems
