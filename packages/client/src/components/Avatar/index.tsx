import cn from './style.module.scss'
import DefaultAvatar from './DefaultAvatar'
import { ChangeEvent } from 'react'

interface AvatarProps {
  image?: string
  name?: string
  size?: string
  onChangeAvatar?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
}

const Avatar = ({
  image,
  name,
  size = 'small',
  onChangeAvatar,
}: AvatarProps) => {
  return (
    <form
      className={cn.User}
      style={{ cursor: onChangeAvatar ? 'pointer' : 'default' }}>
      <label className=''>
        {image ? (
          <div
            className={`${cn.Avatar} ${cn[size]}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <DefaultAvatar />
        )}

        {name ? <div className={cn.Name}>{name}</div> : null}
        {onChangeAvatar !== undefined ? (
          <>
            <div className={cn.edit}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_26484_8)">
                  <path
                    d="M3 17.46V20.5C3 20.78 3.22 21 3.5 21H6.54C6.67 21 6.8 20.95 6.89 20.85L17.81 9.94L14.06 6.19L3.15 17.1C3.05 17.2 3 17.32 3 17.46ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_26484_8">
                    <rect width="24" height="24" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
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
        ) : null}
      </label>
    </form>
  )
}

export default Avatar
