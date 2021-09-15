import {Component} from 'react'
import {v4} from 'uuid'
import PasswordLists from '../PasswordLists'
import './index.css'

const colors = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: [],
    search: '',
    isShowing: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = event => {
    const {website, username, password} = this.state
    event.preventDefault()

    const random = colors[Math.ceil(Math.random() * colors.length - 1)]

    const newPassword = {
      id: v4(),
      website,
      username,
      password,
      bgColor: random,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  deleteItem = id => {
    const {passwordList} = this.state

    const filterList = passwordList.filter(eachItem => eachItem.id !== id)

    this.setState({passwordList: filterList})
  }

  searchInput = event => {
    this.setState({search: event.target.value})
  }

  onSearchElement = () => {
    const {passwordList, search} = this.state

    const searching = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(search.toLowerCase()),
    )
    return searching
  }

  renderNoPasswords = () => (
    <div className="noPasswords">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="failureView"
      />
      <p className="noPass">No Passwords</p>
    </div>
  )

  tikCheckbox = () => {
    this.setState(prevState => ({
      isShowing: !prevState.isShowing,
    }))
  }

  render() {
    const {website, username, password, search, isShowing} = this.state
    const updatedList = this.onSearchElement()
    const count = updatedList.length

    console.log(isShowing)

    let result = ''

    if (count > 0) {
      result = (
        <ul className="unOrder">
          {updatedList.map(eachItem => (
            <PasswordLists
              details={eachItem}
              key={eachItem.id}
              deleteItem={this.deleteItem}
              isShowing={isShowing}
            />
          ))}
        </ul>
      )
    } else {
      result = this.renderNoPasswords()
    }

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="image-logo"
        />

        <div className="upper-container">
          <img
            src=" https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="image-key"
          />
          <div className="form-container">
            <form className="form" onSubmit={this.submitForm}>
              <h1 className="addPassword">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
                <hr className="line" />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website"
                />
                <hr className="line" />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website"
                />
                <hr className="line" />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="large-image"
            />
          </div>
        </div>
        <div className="unOrder-list">
          <div className="upper">
            <div className="large-count">
              <h1 className="password">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <hr className="hr-line" />
              <input
                type="search"
                className="search-box"
                placeholder="search"
                onChange={this.searchInput}
                value={search}
              />
            </div>
          </div>
          <hr className="end-line" />
          <div className="checkbox">
            <input id="check" type="checkbox" onClick={this.tikCheckbox} />
            <label htmlFor="check" className="show">
              Show Passwords
            </label>
          </div>

          {result}
        </div>
      </div>
    )
  }
}

export default PasswordManager
