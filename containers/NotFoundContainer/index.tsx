import style from './index.module.scss'
import WithNavFooter from '../../Layout/front-layout/WithNavFooter'

const NotFoundContainer = () => {
  return (
    <main className={style.main}>
      <div
        className={style.bgContainer}
      >
        <span>頁面建設中</span>
      </div>
    </main>
  )
}

export default WithNavFooter(NotFoundContainer) 
