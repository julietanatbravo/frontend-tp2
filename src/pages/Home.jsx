import PageHeader from '../components/PageHeader'
import ComingSoon from '../components/ComingSoon'
import equipo from '../data/equipo.json'

function Home() {
  return (
    <>
      <PageHeader eyebrow="Portada" title={equipo.nombre} />
      <ComingSoon />
    </>
  )
}

export default Home
