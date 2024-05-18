import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import FullMovieDetails from '../FullMovieDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movieDetails: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {id},
      },
    } = this.props
    if (id !== prevProps.match.params.id) {
      this.getMovieDetails()
    }
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiURL = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiURL, options)
    const data = await response.json()

    if (response.ok === true) {
      const details = data.movie_details
      const updatedData = {
        adult: details.adult,
        backdropPath: details.backdrop_path,
        budget: details.budget,
        genres: details.genres,
        id: details.id,
        overview: details.overview,
        posterPath: details.poster_path,
        releaseDate: details.release_date,
        runtime: details.runtime,
        similarMovies: details.similar_movies,
        spokenLanguages: details.spoken_languages,
        title: details.title,
        voteAverage: details.vote_average,
        voteCount: details.vote_count,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div>
      <Header />
      <div className="home-page-loader-failure-container">
        <div className="movie-detail-loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails} = this.state
    return <FullMovieDetails movieDetails={movieDetails} />
  }

  onClickTryAgain = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => (
    <div>
      <Header />
      <div className="search-failure-view-container">
        <img
          src="https://res.cloudinary.com/dl5cirycu/image/upload/v1715838330/pvdxfuo18qy1ty1wukt2.png"
          alt="failure view" 
          className="failure-view-image"
        />
        <p className="failure-view-content">
           Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="search-try-again-button"
          onClick={this.onClickTryAgain}
        >
          Try again
        </button>
      </div>
    </div>
  )

  renderMovieDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="movie-details-view">{this.renderMovieDetails()}</div>
  }
}

export default MovieItemDetails
