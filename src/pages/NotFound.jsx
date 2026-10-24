import { Link } from 'react-router'
import PageHeader from '../components/PageHeader'

function NotFound() {
  return (
    <>
      <PageHeader eyebrow="Error 404" title="Esta página no existe">
        Puede que el enlace esté mal escrito o que la sección se haya movido.
      </PageHeader>
      <Link to="/" className="btn btn-primary">
        Volver a la portada
      </Link>
    </>
  )
}

export default NotFound
