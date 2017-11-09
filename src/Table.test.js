import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { sortBy } from 'lodash'
import Table from './Table'

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
}

Enzyme.configure({ adapter: new Adapter() })

describe('Table', () => {
    const props = {
        list: [
            { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
            { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
        ],
        onDismiss: () => {},
    }

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Table {...props} />, div)
    })

    test('has a valid snapshot', () => {
        const component = renderer.create(<Table {...props} />)
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('shows two items in list', () => {
        const element = shallow(<Table {...props} />)
        expect(element.find('.table-row').length).toBe(2)
    })
})
