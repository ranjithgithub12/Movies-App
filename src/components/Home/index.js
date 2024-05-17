import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import HomePoster from '../HomePoster'
import TrendingMovies from '../TrendingMovies'
import OriginalMovies from '../OriginalMovies'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, homePageMovie: []}

  componentDidMount() {
    this.getHomePageMovie()
  }

  getHomePageMovie = async () => {
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
      const lengthOfMovies = updatedData.length

      const randomNumber = Math.ceil(Math.random() * lengthOfMovies - 1)
      const singleHomeMovie = updatedData[randomNumber]

      this.setState({
        homePageMovie: singleHomeMovie,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingview = () => (
    <div>
      <Header />
      <div className="home-page-loader-failure-container">
        <div className="home-loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {homePageMovie} = this.state
    return (
      <>
        <HomePoster homePageMovie={homePageMovie} />
      </>
    )
  }

  onClickRetry = () => {
    this.getHomePageMovie()
  }

  renderFailureView = () => (
    <div>
      <Header />
      <div className="home-page-loader-failure-container">
        <div className="home-page-failure">
          <img
            src="https://res.cloudinary.com/dl5cirycu/image/upload/v1715853966/uerlyizxuzzpuoqz9f4k.png"
            alt="failure view"
            className="home-view-failure"
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
      </div>
    </div>
  )

  renderHomepageList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingview()
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
      <div className="home-total-background-container">
        {this.renderHomepageList()}
        <h1 className="trending-original-heading">Trending Now</h1>
        <div className="trending-original-container">
          <TrendingMovies />
        </div>
        <h1 className="trending-original-heading">Originals</h1>
        <div className="trending-original-container">
          <OriginalMovies />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
