import React from 'react'
import style from './index.module.scss'
import Image from 'next/image'

const CommiteePhoto = () => {


  return (
    <div className={style.commiteePhoto}>
      <Image
        className={style.commiteeImage}
        src={'/commitee.jpg'}
        layout='fill'
        objectFit='contain'
      />
    </div>
  )
}

export default CommiteePhoto