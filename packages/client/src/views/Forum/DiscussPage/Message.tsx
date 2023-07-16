import cn from './style.module.scss'
import Avatar from '../../../components/UI/Avatar'
import getAvatarFullUrl from '../../../utils/getFullAvatarUrl'
import Time from './Time'
import React, { forwardRef, LegacyRef } from 'react'
import EmojiPicker, {
  Categories,
  Emoji,
  EmojiClickData,
  EmojiStyle,
} from 'emoji-picker-react'
import DeleteButton from '../../../components/UI/DeleteButton'

interface MessageProps {
  id: string
  author: string
  createdAt: Date
  content: string
  avatar?: string
  emoji: EmojiClickData[]

  addEmoji(id: number, emoji: EmojiClickData): void

  delEmoji(id: number, emoji: EmojiClickData): void

  isOpenEmojiList: boolean

  handleToggleEmoji(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void

  isOwnMessage: boolean

  handleDelOwnMessage(id: string): void
}

const Message = forwardRef(
  (
    {
      id,
      author,
      createdAt,
      content,
      avatar,
      emoji,
      isOpenEmojiList,
      addEmoji,
      delEmoji,
      handleToggleEmoji,
      isOwnMessage,
      handleDelOwnMessage,
    }: MessageProps,
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    if (!createdAt || !author) {
      return <div>No messages</div>
    }
    return (
      <div className={cn.Msg} ref={ref}>
        <div className={cn.MsgHeader}>
          <Avatar src={getAvatarFullUrl(avatar)} name={author} />
          <div className={cn.DelButtonWrapper}>
            <Time createdAt={createdAt} />
            {isOwnMessage && (
              <DeleteButton onClick={() => handleDelOwnMessage(id)} />
            )}
          </div>
        </div>
        <div className={cn.MsgBody}>{content}</div>
        <div className={cn.EmojiContainer}>
          {emoji.map(emoji => (
            <div
              className={cn.EmojiWrapper}
              onClick={() => delEmoji(+id, emoji)}
              key={emoji.unified}>
              <Emoji
                unified={emoji.unified}
                emojiStyle={EmojiStyle.APPLE}
                size={20}
              />
            </div>
          ))}
          <div className={cn.AddEmoji} onClick={handleToggleEmoji} id={id}>
            <Emoji unified="2795" emojiStyle={EmojiStyle.APPLE} size={20} />
          </div>
          {isOpenEmojiList && (
            <div className={cn.EmojiPickerWrapper}>
              <EmojiPicker
                onEmojiClick={emoji => addEmoji(+id, emoji)}
                autoFocusSearch={false}
                emojiStyle={EmojiStyle.APPLE}
                searchDisabled
                skinTonesDisabled
                categories={[{ name: '', category: Categories.SMILEYS_PEOPLE }]}
                height={300}
                lazyLoadEmojis={true}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default Message
