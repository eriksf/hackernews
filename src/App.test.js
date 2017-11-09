import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App from './App'

describe('App', () => {
    function createNodeMock() {
        return {
            focus() {}
        }
    }

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<App />, div)
    })

    test('has a valid snapshot', () => {
        const component = renderer.create(<App />, {createNodeMock})
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
