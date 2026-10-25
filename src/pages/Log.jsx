import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { LogIllustration } from '../components/illustrations/SectionIllustrations'
import LogEntry from '../components/log/LogEntry'
import Button from '../components/ui/Button'
import SegmentedControl from '../components/ui/SegmentedControl'
import entries from '../data/bitacora.json'
import { formatDate } from '../utils/text'

const ALL = 'todas'

// Los tags del filtro salen de las entradas, ordenados por cantidad de usos
const tagCounts = entries.flatMap((entry) => entry.tags).reduce((counts, tag) => {
  counts[tag] = (counts[tag] ?? 0) + 1
  return counts
}, {})
const tagOptions = [
  { value: ALL, label: 'Todas' },
  ...Object.keys(tagCounts)
    .sort((a, b) => tagCounts[b] - tagCounts[a])
    .map((tag) => ({ value: tag, label: `${tag} (${tagCounts[tag]})` })),
]

// Agrupa las entradas por fecha, respetando el orden del JSON
function groupByDate(list) {
  const groups = new Map()
  for (const entry of list) {
    if (!groups.has(entry.fecha)) groups.set(entry.fecha, [])
    groups.get(entry.fecha).push(entry)
  }
  return [...groups.entries()]
}

function Log() {
  const [tag, setTag] = useState(ALL)
  const [openIds, setOpenIds] = useState(() => new Set())

  const visible = tag === ALL ? entries : entries.filter((entry) => entry.tags.includes(tag))

  const setEntryOpen = (id, isOpen) => {
    setOpenIds((current) => {
      if (current.has(id) === isOpen) return current
      const next = new Set(current)
      if (isOpen) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const expandAll = () => setOpenIds(new Set(visible.map((entry) => entry.id)))
  const collapseAll = () => setOpenIds(new Set())

  return (
    <>
      <PageHeader eyebrow="Proceso" title="Bitácora" illustration={<LogIllustration />}>
        Qué hice, qué decidí y qué dificultades resolví en cada etapa. Tocá una entrada para verla
        completa.
      </PageHeader>

      <div className="grid gap-6">
        <SegmentedControl
          legend="Filtrar por tag"
          name="log-tag"
          options={tagOptions}
          value={tag}
          onChange={setTag}
          variant="chips"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-small font-semibold text-fg-muted" aria-live="polite">
            Mostrando {visible.length} de {entries.length} entradas
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={expandAll} className="px-4! py-2!">
              Expandir todo
            </Button>
            <Button variant="secondary" onClick={collapseAll} className="px-4! py-2!">
              Contraer todo
            </Button>
          </div>
        </div>

        {groupByDate(visible).map(([fecha, list]) => (
          <section key={fecha} className="grid gap-4">
            <h2 className="text-small font-bold uppercase tracking-widest text-primary">
              {formatDate(fecha)}
            </h2>
            <ol className="grid gap-4">
              {list.map((entry) => (
                <li key={entry.id}>
                  <LogEntry entry={entry} open={openIds.has(entry.id)} onToggle={setEntryOpen} />
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  )
}

export default Log
