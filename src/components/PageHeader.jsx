function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="text-small font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
      )}
      <h1 className="mt-1">{title}</h1>
      {children && <p className="mt-2 max-w-2xl text-fg-muted">{children}</p>}
    </header>
  )
}

export default PageHeader
