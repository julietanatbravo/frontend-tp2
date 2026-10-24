function Card({ as = 'div', hover = false, className = '', ...props }) {
  const Tag = as

  return (
    <Tag
      className={`card ${hover ? 'card-hover' : ''} ${className}`.trim()}
      {...props}
    />
  )
}

export default Card
