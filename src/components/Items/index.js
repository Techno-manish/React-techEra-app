import {Link} from 'react-router-dom'
import './index.css'

const Items = props => {
  const {data} = props
  const {id, logoUrl, name} = data
  return (
    <Link to={`courses/${id}`} className="linkStyle">
      <li className="itemContainer">
        <img src={logoUrl} alt={name} className="itemImage" />
        <p>{name}</p>
      </li>
    </Link>
  )
}
export default Items
