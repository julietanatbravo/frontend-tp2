import PageHeader from '../components/PageHeader'
import TreeLegend from '../components/tree/TreeLegend'
import TreeNode from '../components/tree/TreeNode'
import Card from '../components/ui/Card'
import Disclosure from '../components/ui/Disclosure'
import tree from '../data/componentTree.json'

function ComponentTree() {
  return (
    <>
      <PageHeader eyebrow="Estructura" title="Árbol de componentes">
        Cómo se arma la aplicación: qué componentes renderiza cada uno, desde App hasta las
        tarjetas. Tocá un componente para abrir o cerrar sus hijos.
      </PageHeader>

      <div className="grid gap-6">
        <Card>
          <TreeLegend />
        </Card>

        <Card className="overflow-x-auto">
          <ul>
            <TreeNode node={tree} />
          </ul>
        </Card>

        <Disclosure summary="Sobre el árbol: ¿cómo se genera?">
          <p>
            El árbol no está escrito a mano: lo arma el script{' '}
            <span className="code">scripts/component-tree.js</span> cada vez que se ejecuta{' '}
            <span className="code">npm run dev</span> o <span className="code">npm run build</span>, así
            que siempre coincide con el código entregado.
          </p>
          <ul className="grid list-disc gap-2 pl-5">
            <li>
              Lee cada archivo <span className="code">.jsx</span> con{' '}
              <span className="code">@babel/parser</span>, empezando por{' '}
              <span className="code">App.jsx</span>.
            </li>
            <li>
              Busca en el JSX los componentes propios que renderiza y sigue sus imports. Deja afuera
              las etiquetas HTML y los componentes de librerías, como los de React Router.
            </li>
            <li>
              Las páginas cuelgan de <span className="code">Layout</span>, porque se muestran en su{' '}
              <span className="code">&lt;Outlet /&gt;</span> según la ruta.
            </li>
            <li>
              Marca como condicional lo que está dentro de un <span className="code">if</span>, un{' '}
              <span className="code">&&</span> o un ternario, y como lista lo que sale de un{' '}
              <span className="code">.map()</span>.
            </li>
          </ul>
        </Disclosure>
      </div>
    </>
  )
}

export default ComponentTree
