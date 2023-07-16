import { useMemo } from 'react'

interface TimeInterface {
  createdAt: Date
}

const Time = ({ createdAt }: TimeInterface) => {
  const normalizedTime = useMemo(() => {
    const createdAtDate = new Date(createdAt)
    return `${String(createdAtDate.getHours()).padStart(2, '0')}:${String(
      createdAtDate.getMinutes()
    ).padStart(2, '0')}`
  }, [createdAt])
  return <span>{normalizedTime}</span>
}

export default Time
