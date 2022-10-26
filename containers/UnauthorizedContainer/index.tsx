import style from './index.module.scss'
import WithNavFooter from '../../layout/front-layout/WithNavFooter'

const UnauthorizedContainer = () => {
  return (
    <main className={style.main}>
      <div
        className={style.bgContainer}
      >
        <span>未經授權</span>
      </div>
    </main>
  )
}

export default WithNavFooter(UnauthorizedContainer) 
