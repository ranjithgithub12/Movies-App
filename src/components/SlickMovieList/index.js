import './index.css'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

const SlickMovieList = props => {
  const {listOfMovies} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="main-container">
      <div className="slick-container">
        <Slider {...settings}>
          {listOfMovies.map(eachList => (
            <Link to={`/movies/${eachList.id}`} key={eachList.id}>
              <li className="list-of-movies">
                <img
                  src={eachList.posterPath}
                  alt={eachList.title}
                  className="list-of-movie-image"
                />
              </li>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default SlickMovieList
