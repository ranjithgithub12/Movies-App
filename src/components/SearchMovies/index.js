import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SearchMovieItems from '../SearchMovieItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchMovies extends Component {
  state = {
    searchInput: '',
    searchMovieList: [],
    apiStatus: apiStatusConstants.initial,
  }

  changeSearchInput = value => {
    this.setState({searchInput: value})
  }

  getSearchMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiURL = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiURL, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(eachList => ({
        backdropPath: eachList.backdrop_path,
        id: eachList.id,
        title: eachList.title,
        posterPath: eachList.poster_path,
      }))
      this.setState({
        searchMovieList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    const lengthOfInput = searchInput.length
    if (lengthOfInput > 0) {
      this.getSearchMovies()
    } else {
      this.setState({searchMovieList: []})
    }
  }

  onEnterKeyDown = () => {
    const {searchInput} = this.state
    const lengthOfInput = searchInput.length
    if (lengthOfInput > 0) {
      this.getSearchMovies()
    } else {
      this.setState({searchMovieList: []})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getSearchMovies()
  }

  renderSuccessView = () => {
    const {searchMovieList, searchInput} = this.state
    const totalLengthMovie = searchMovieList.length === 0
    //* console.log(totalLengthMovie)
    return (
      <>
        {totalLengthMovie ? (
          <div className="no-search-movie-list">
            <img
              src="https://res.cloudinary.com/dl5cirycu/image/upload/v1715837488/siuliw147jihalpnbxqk.png"
              alt="no movies"
              className="no-search-image"
            />
            <p className="no-search-content">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        ) : (
          <div className="show-search-movies-contianer">
            <ul className="show-search-unorder-movies">
              {searchMovieList.map(eachList => (
                <SearchMovieItems eachList={eachList} key={eachList.id} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
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

  renderAllMovieList = () => {
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
    const {searchInput} = this.state

    return (
      <div className="total-search-container">
        <Header
          onClickSearch={this.onClickSearchIcon}
          changeSearchInput={this.changeSearchInput}
          searchInput={searchInput}
          onEnterKeyDown={this.onEnterKeyDown}
        />
        <div className="all-movie-list-container">
          {this.renderAllMovieList()}
        </div>
      </div>
    )
  }
}

export default SearchMovies
