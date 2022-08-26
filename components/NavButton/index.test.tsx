import { render } from '@testing-library/react'
import NavButton from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(
      <NavButton
        onMouseOver={() => { }}
        onMouseLeave={() => { }}
        onClick={() => { }}
      >測試按鈕</NavButton>
    )

    expect(container).toHaveTextContent('測試按鈕')
  })
})