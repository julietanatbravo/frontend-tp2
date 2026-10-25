function FavoriteList({ title, items }) {
  return (
    <section>
      <h3 className="text-lg text-fg">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.titulo} className="rounded-card bg-surface px-4 py-3">
            <p className="font-bold text-fg">{item.titulo}</p>
            <p className="text-small text-fg-muted">{item.dato}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FavoriteList
