import cn from './style.module.scss'
import { useMemo } from 'react'
import { ChangeEvent } from 'react'
import EditIcon from '../../Icons/EditIcon'

interface AvatarProps {
  src?: string
  name?: string
  size?: string
  onChangeAvatar?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
}

const Avatar = ({
  src = './avatar.jpeg',
  name,
  size = 'small',
  onChangeAvatar,
}: AvatarProps) => {
  const userName = useMemo(() => {
    if (!name) {
      return null
    }
    return <div className={cn.Name}>{name}</div>
  }, [name])
  const editIcon = useMemo(() => {
    if (!onChangeAvatar) {
      return null
    }
    return (
      <>
        <div className={cn.edit}>
          <EditIcon />
        </div>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          autoComplete="false"
          style={{ display: 'none' }}
          onChange={onChangeAvatar}
        />
      </>
    )
  }, [onChangeAvatar])
  return (
    <form className={cn.User}>
      <label className={cn.inner}>
        <div
          className={`${cn.Avatar} ${cn[size]}`}
          style={{
            backgroundImage: `url(${src})`,
            cursor: onChangeAvatar ? 'pointer' : 'default',
          }}
        />
        {userName}
        {editIcon}
      </label>
    </form>
  )
}

export default Avatar
