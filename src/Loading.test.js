import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Loading from './Loading'

describe('Loading', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Loading />, div)
    })

    test('has a valid snapshot', () => {
        const component = renderer.create(<Loading />)
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
