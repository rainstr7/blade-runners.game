import cn from './style.module.scss'
import Avatar from '../../../components/UI/Avatar'
import getAvatarFullUrl from '../../../utils/getFullAvatarUrl'
import Time from './Time'
import React, { forwardRef, LegacyRef, useState } from 'react'
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
  date: Date
  content: string
  avatar?: string
  emoji: EmojiClickData[]
  addEmoji: (emoji: EmojiClickData, id: string) => void
  delEmoji: (emoji: EmojiClickData, id: string) => void
  isOpenEmojiList: boolean
  handleToggleEmoji: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  isOwnMessage: boolean
  handleDelOwnMessage: (id: string) => void
}

const Message = forwardRef(
  (
    {
      id,
      author,
      date,
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
    if (!date || !author || !emoji) {
      return <div>No messages</div>
    }
    return (
      <div className={cn.Msg} ref={ref}>
        <div className={cn.MsgHeader}>
          <Avatar src={getAvatarFullUrl(avatar)} name={author} />
          <div className={cn.DelButtonWrapper}>
            <Time date={date} />
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
              onClick={() => delEmoji(emoji, id)}
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
                onEmojiClick={emoji => addEmoji(emoji, id)}
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
