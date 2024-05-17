import './index.css'
import {Link} from 'react-router-dom'

const SimilarMovies = props => {
  const {eachMovie} = props
  const {id, title, posterPath} = eachMovie

  return (
    <Link to={`/movies/${id}`} className="similar-link-menu">
      <li className="list-of-similar-movies">
        <img src={posterPath} alt={title} className="similar-image" />
      </li>
    </Link>
  )
}

export default SimilarMovies
