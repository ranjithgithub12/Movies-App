import './index.css'
import {Link} from 'react-router-dom'

const SearchMovieItems = props => {
  const {eachList} = props
  const {id, title, posterPath} = eachList
  //* console.log(eachList)

  return (
    <Link to={`/movies/${id}`} className="show-search-link-menu">
      <li className="show-list-of-search-movies">
        <img src={posterPath} alt={title} className="show-search-image" />
      </li>
    </Link>
  )
}

export default SearchMovieItems
