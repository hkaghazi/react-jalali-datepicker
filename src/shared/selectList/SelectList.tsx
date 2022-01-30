import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

import "./SelectList.scss"

type SelectListProps = {
  list: { id: string | number; name: string }[]
  defaultValue: string | number
  onChange?: (value: string | number) => void
}

export const SelectList: React.FC<SelectListProps> = ({ list, defaultValue, onChange }) => {
  const UlRef = useRef<HTMLUListElement>(null)
  const [selected, setSelected] = useState<string>(String(defaultValue))

  useEffect(() => {
    setSelected(String(defaultValue))
  }, [defaultValue])

  useLayoutEffect(() => {
    if (UlRef.current) {
      const children = UlRef.current.querySelector(".active") as HTMLElement | null
      if (children != null) {
        var selectTop = children.offsetTop
        UlRef.current.style.transform = "translatey(" + (80 - selectTop) + "px)"
      }
    }
  }, [selected])

  const onSelect = (ev: React.MouseEvent<HTMLLIElement, MouseEvent>, item: string) => {
    setSelected(item)
    if (onChange) {
      onChange(item)
    }
    if (UlRef.current) {
      var selectTop = ev.currentTarget.offsetTop
      UlRef.current.style.transform = "translatey(" + (80 - selectTop) + "px)"
    }
  }

  return (
    <div className="rjd__select-list-container">
      <ul ref={UlRef}>
        {list.map((item) => (
          <li key={item.id} className={selected == String(item.id) ? "active" : ""} onClick={(ev) => onSelect(ev, item.id.toString())}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
