import { useMemo } from 'react'

interface TimeInterface {
  date: Date
}

const Time = ({ date }: TimeInterface) => {
  const normalizedTime = useMemo(() => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`
  }, [date])
  return <span>{normalizedTime}</span>
}

export default Time
