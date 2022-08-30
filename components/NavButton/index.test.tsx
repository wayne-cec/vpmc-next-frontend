import { render } from '@testing-library/react'
import NavButton from '.'

describe('NavButton', () => {
  it('does NavButton has text', () => {
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