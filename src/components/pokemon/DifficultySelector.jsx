import levels from '../../data/difficultyLevels.json'
import SegmentedControl from '../ui/SegmentedControl'

const options = levels.map((level) => ({ value: level.id, label: level.label }))

function DifficultySelector({ value, onChange }) {
  const current = levels.find((level) => level.id === value)

  return (
    <SegmentedControl legend="Dificultad" name="difficulty" options={options} value={value} onChange={onChange}>
      <p className="mt-2 text-small text-fg-muted">{current.description}</p>
    </SegmentedControl>
  )
}

export default DifficultySelector
