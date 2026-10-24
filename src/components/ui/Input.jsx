function Input({ label, className = '', ...props }) {
  const input = <input className={`input ${className}`.trim()} {...props} />

  if (!label) return input

  return (
    <label className="grid gap-1.5">
      <span className="text-small font-bold">{label}</span>
      {input}
    </label>
  )
}

export default Input
