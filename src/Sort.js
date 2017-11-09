import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from './Button'

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey }
    )

    return (
        <Button onClick={() => onSort(sortKey)} className={sortClass}>{children}</Button>
    )
}

Sort.propTypes = {
    sortKey: PropTypes.string.isRequired,
    activeSortKey: PropTypes.string,
    onSort: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Sort
