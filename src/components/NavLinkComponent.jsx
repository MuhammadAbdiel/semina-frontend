import { Link, useLocation } from 'react-router-dom'

export default function NavLinkComponent({ navigate, role, roles, children }) {
  const location = useLocation()
  let isHas = roles.indexOf(role)
  return (
    <>
      {isHas >= 0 && (
        <Link
          to={navigate}
          className={`${location.pathname === navigate && 'mx-[-0.65rem]'} flex items-center gap-3 rounded-lg ${location.pathname === navigate && 'bg-muted'} px-3 py-2 ${location.pathname === navigate ? 'text-primary' : 'text-muted-foreground'} transition-all hover:text-primary`}
        >
          {children}
        </Link>
      )}
    </>
  )
}
