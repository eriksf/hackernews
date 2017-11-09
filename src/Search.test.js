import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Search from './Search'

describe('Search', () => {
    const props = {
        value: '',
        onChange: () => {},
        onSubmit: () => {},
    }

    function createNodeMock() {
        return {
            focus() {}
        }
    }

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Search {...props}>Search</Search>, div)
    })

    test('has a valid snapshot', () => {
        const component = renderer.create(<Search {...props}>Search</Search>, {createNodeMock})
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
