import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SlickMovieList from '../SlickMovieList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class OriginalMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, originalMovies: []}

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const apiURL = 'https://apis.ccbp.in/movies-app/originals'
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
        originalMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="original-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {originalMovies} = this.state
    return (
      <>
        <SlickMovieList listOfMovies={originalMovies} />
      </>
    )
  }

  onClickRetry = () => {
    this.getTrendingMovies()
  }

  renderFailureView = () => (
    <div className="original-page-failure">
      <img
        src="https://res.cloudinary.com/dl5cirycu/image/upload/v1715853966/uerlyizxuzzpuoqz9f4k.png"
        alt="failure view"
      />
      <p className="failure-view-result">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="all-try-again-button"
        onClick={this.onClickRetry}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingMovies = () => {
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
      <div className="original-movie-container">
        {this.renderTrendingMovies()}
      </div>
    )
  }
}

export default OriginalMovies
