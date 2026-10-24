import { useParams } from 'react-router'
import PageHeader from '../components/PageHeader'
import ComingSoon from '../components/ComingSoon'
import integrantes from '../data/integrantes.json'
import NotFound from './NotFound'

function Profile() {
  const { id } = useParams()
  const integrante = integrantes.find((i) => i.id === id)

  if (!integrante) return <NotFound />

  return (
    <>
      <PageHeader eyebrow="Perfil" title={integrante.nombre} />
      <ComingSoon />
    </>
  )
}

export default Profile
