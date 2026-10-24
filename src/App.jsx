import ThemeToggle from './components/ThemeToggle'
import Badge from './components/ui/Badge'
import Button from './components/ui/Button'
import Card from './components/ui/Card'
import Input from './components/ui/Input'

function App() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="flex items-center justify-between border-b border-border pb-4 mb-8">
        <span className="font-display text-h3 text-primary">Frontend TP2</span>
        <ThemeToggle />
      </header>

      <main>
        {/* Muestra de los componentes base del tema */}
        <section className="grid gap-6 md:grid-cols-2">
          <Card hover>
            <Badge>✨ Nuevo</Badge>
            <h3 className="mt-3 text-fg">Card con hover</h3>
            <p className="mt-1 text-fg-muted">
              Usa los tokens semánticos, así el modo noche funciona solo.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button>Primario</Button>
              <Button variant="secondary">Secundario</Button>
            </div>
          </Card>
          <Card as="form" className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input label="Nombre" placeholder="Tu nombre" />
            <Input label="Correo" type="email" placeholder="tu@correo.cl" />
            <Button type="submit">Enviar</Button>
          </Card>
        </section>
      </main>
    </div>
  )
}

export default App
