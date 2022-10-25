import style from '../../styles/Home.module.scss'
import PageHeader from '../../components/PageHeader'
import classNames from 'classnames'
import WithNavFooter from '../../Layout/front-layout/WithNavFooter'
import 'animate.css'

const HomeContainer = () => {
  return (
    <main className={classNames({
      [style.main]: true,
      'animate__animated': true
    })}>
      <PageHeader
        title={'VPMC | 實價登錄資訊平台'}
      />
    </main>
  )
}

export default WithNavFooter(HomeContainer)
