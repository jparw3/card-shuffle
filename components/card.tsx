import clsx from 'clsx'
import { TiltWrapper } from './tilt'
import React from 'react'

export const TRANSFORM_ANIMATION =
  'transition-all duration-[600ms] [transition-timing-function:ease] will-change-transform'
export const PARALLAX_STYLE = 'group-hover:[transform:translateZ(15px)]'

interface CardProps {
  value: string
}

const Card: React.FC<CardProps> = React.memo(({ value }) => {
  const [rank, suit] = value.split("")
  const color = suit === "♥" || suit === "♦" ? "text-red-500" : "text-black"
  
  return (
    <div
      className={clsx(
        'hover:scale-[1.03] mb-5 mr-5 hover:translate-x-1 hover:-translate-y-1 select-none',
        TRANSFORM_ANIMATION,
      )}
    >
      <TiltWrapper className="[transform-style:preserve-3d] w-[--tweet-width]">
        <div
          className={clsx(
            'group bg-white p-8 flex flex-col gap-5 rounded-[32px] font-inter shadow-md hover:shadow-xl [transform-style:preserve-3d] w-[--tweet-width]',
            TRANSFORM_ANIMATION,
          )}
        >
          {/* container start */}
          <div
            className={clsx(
              'flex gap-3 items-center relative py-20',
              PARALLAX_STYLE,
              TRANSFORM_ANIMATION,
              color
            )}
          >
             <span className='absolute top-0 left-0 font-bold text-lg'>
             {rank}
             </span>
             <span className='absolute bottom-0 right-0'>
             {suit}
             </span>
          </div>
          {/* container end */}
        </div>
      </TiltWrapper>
    </div>
  )
})

Card.displayName = "Card"

export {
  Card
}
