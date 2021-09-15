import './index.css'

const passwordLists = props => {
  const {details, deleteItem, isShowing} = props
  const {username, website, bgColor, id, password} = details

  const initial = website.slice(0, 1).toUpperCase()

  const onDelete = () => {
    deleteItem(id)
  }

  return (
    <li className="list-item">
      <div className="list-container">
        <div className={`initial ${bgColor}`}>
          <h1>{initial}</h1>
        </div>

        <div className="details">
          <p className="list">{website}</p>
          <p className="list">{username}</p>
          {isShowing ? (
            <p className="list">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </div>
      </div>

      <div className="delete-container">
        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default passwordLists
