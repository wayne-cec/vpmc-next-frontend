import WithNavProtected from "../../layout/front-layout/WithNavProtected"
import style from './index.module.scss'

const SurveySheetContainer = () => {
  return (
    <div className={style.main}></div>
  )
}

export default WithNavProtected(SurveySheetContainer)
