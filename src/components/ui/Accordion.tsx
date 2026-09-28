import { useEffect, useState } from 'react'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import './Accordion.css'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  filter?: string
  defaultOpenId?: string
  variant?: 'default' | 'faq'
}

export function Accordion({
  items,
  filter = '',
  defaultOpenId,
  variant = 'default',
}: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)
  const q = filter.toLowerCase()

  useEffect(() => {
    if (defaultOpenId) setOpenId(defaultOpenId)
  }, [defaultOpenId])

  const visible = items.filter(
    (item) =>
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q),
  )

  if (!visible.length) {
    return <p className="accordion__empty">No matching questions. Try a different search term.</p>
  }

  const isFaq = variant === 'faq'

  return (
    <div className={`accordion ${isFaq ? 'accordion--faq' : ''}`}>
      {visible.map((item) => {
        const open = openId === item.id
        return (
          <div
            key={item.id}
            className={`accordion__item ${open ? 'accordion__item--open' : ''}`}
          >
            <h3>
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={open}
                aria-controls={`panel-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                {item.question}
                {isFaq ? (
                  open ? (
                    <Minus size={20} className="accordion__toggle" aria-hidden />
                  ) : (
                    <Plus size={20} className="accordion__toggle" aria-hidden />
                  )
                ) : (
                  <ChevronDown
                    size={20}
                    className={`accordion__icon ${open ? 'is-open' : ''}`}
                    aria-hidden
                  />
                )}
              </button>
            </h3>
            <div
              className="accordion__panel"
              hidden={!open}
              id={`panel-${item.id}`}
              role="region"
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
