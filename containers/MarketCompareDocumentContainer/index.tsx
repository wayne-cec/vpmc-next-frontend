import MarketCompareDocument from '../../components/Document/MarketCompareDocument'
import style from './index.module.scss'
import Image from 'next/image'

const MarketCompareDocumentContainer = () => {

  return (
    <div className={style.MarketCompareDocumentContainer}>

      <div className={style.Container}>
        <div className={style.PaperContainer}>
          <MarketCompareDocument pid={'aaa'} />
        </div>

        <div className={style.ActionContainer}>
          <div className={style.Action}>
            <Image src={'/document/pdf.png'} width='48px' height='48px' />
          </div>
          <div className={style.Action}>
            <Image src={'/document/line.png'} width='48px' height='48px' />
          </div>
        </div>
      </div>



    </div>
  )
}

export default MarketCompareDocumentContainer
