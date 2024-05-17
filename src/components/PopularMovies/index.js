import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import PopularMovieItems from '../PopularMovieItems'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class PopularMovies extends Component {
  state = {popularMovies: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiURL = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiURL, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.results.map(eachList => ({
        backdropPath: eachList.backdrop_path,
        id: eachList.id,
        overview: eachList.overview,
        posterPath: eachList.poster_path,
        title: eachList.title,
      }))
      //* console.log(updatedData)
      this.setState({
        popularMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {popularMovies} = this.state
    return (
      <div className="popular-movie-list-container">
        <ul className="unorder-list-popular-movies">
          {popularMovies.map(eachMovie => (
            <PopularMovieItems eachMovie={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </div>
    )
  }

  onClickTryAgain = () => {
    this.getPopularMovies()
  }

  renderFailureView = () => (
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
        Try Again
      </button>
    </div>
  )

  renderPopularMovies = () => {
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
    return (
      <div className="total-popular-movie-container">
        <Header />
        <div className="popular-movie-container">
          {this.renderPopularMovies()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default PopularMovies
