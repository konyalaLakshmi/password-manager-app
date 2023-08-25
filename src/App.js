import './App.css'

import {v4} from 'uuid'

import {Component} from 'react'

const colorList = ['yellow', 'orange', 'green', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUsername = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  onAddContent = e => {
    e.preventDefault()
    const {website, username, password} = this.state
    const classColor = colorList[Math.floor(Math.random() * 5)]
    const initial = website.slice(0, 1).toUpperCase()

    const newItem = {
      id: v4(),
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classColor,
      initialName: initial,
    }

    this.setState(prev => ({
      latestList: [...prev.latestList, newItem],
      username: '',
      password: '',
      website: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onDelete = id => {
    const {latestList} = this.state
    const newList = latestList.filter(each => each.id !== id)
    const isTest = newList.length !== 0
    this.setState({latestList: newList, isTrue: isTest})
  }

  render() {
    const {
      latestList,
      website,
      username,
      password,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const filteredList = latestList.map(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (filteredList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg">
        <img
          className="img1"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="c1">
          <div className="inner-c1">
            <h1 className="h1">Add New Contact</h1>
            <form onSubmit={this.onAddContent}>
              <div className="container1">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="i"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.listenWebsite}
                  value={website}
                />
              </div>
              <div className="container1">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="i"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.listenUsername}
                  value={username}
                />
              </div>
              <div className="container1">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="i"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  onChange={this.listenPassword}
                  value={password}
                />
              </div>
              <button type="submit" className="b">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="pm"
          />
        </div>
        <div className="c2">
          <div className="lower-inner">
            <div className="count-container">
              <h1 className="h1">Your Passwords</h1>
              <div className="count">{filteredList.length}</div>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                alt="search"
                className="search-input"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="hr" />
          <br />
          <div className="check-container">
            <input
              type="checkbox"
              className="check-input"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty-image"
              />
              <p className="p">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <div className="ul">
              {filteredList.map(each => (
                <li className="li" id={each.id} key={each.id}>
                  <div className={`initial-container ${each.classAdd}`}>
                    <p className="initial">{each.initial}</p>
                  </div>
                  <div className="li-items">
                    <p className="website">{each.websiteName}</p>
                    <p className="userName">{each.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}
                    {isShow && <p className="password">{each.Password}</p>}
                  </div>
                  <button
                    className="dButton"
                    type="button"
                    data-testid="delete"
                    onClick={() => this.onDelete(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="delete-img"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
