import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function EditFab() {
  const location = useLocation()
  if (location.pathname === '/edit') return null

  return (
    <Link className="fab" to="/edit" aria-label="编辑内容" title="编辑内容">
      <Icon name="pencil" />
      编辑内容
    </Link>
  )
}
