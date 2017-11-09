import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import withLoading from './withLoading'
import Button from './Button'

const ButtonWithLoading = withLoading(Button)

describe('withLoading', () => {
    const props = {
        isLoading: false,
        onClick: () => {},
    }

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ButtonWithLoading {...props}>More</ButtonWithLoading>, div)
    })

    test('has a valid snapshot', () => {
        const component = renderer.create(<ButtonWithLoading {...props}>More</ButtonWithLoading>)
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
