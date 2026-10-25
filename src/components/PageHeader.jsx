// illustration: dibujo opcional a la derecha del título (se oculta en pantallas chicas)
function PageHeader({ eyebrow, title, illustration, children }) {
  return (
    <header className="mb-8 flex items-center justify-between gap-6">
      <div>
        {eyebrow && (
          <p className="text-small font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-1">{title}</h1>
        {children && <p className="mt-2 max-w-2xl text-fg-muted">{children}</p>}
      </div>
      {illustration && <div className="hidden shrink-0 sm:block">{illustration}</div>}
    </header>
  )
}

export default PageHeader
