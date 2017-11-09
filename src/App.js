import React, { Component } from 'react'
import Search from './Search'
import Table from './Table'
import Button from './Button'
import Loading from './Loading'
import withLoading from './withLoading'
import fetch from 'isomorphic-fetch'
import './App.css'

const DEFAULT_QUERY = 'redux'
const DEFAULT_HPP = '100'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

const ButtonWithLoading = withLoading(Button)

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
    const { searchKey, results } = prevState
    const oldHits = results && results[searchKey] ? results[searchKey].hits : []
    const updatedHits = [...oldHits, ...hits]
    return {
        results: {
            ...results,
            [searchKey]: { hits: updatedHits, page }
        },
        isLoading: false
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        }
    }

    needToSearchTopStories = (searchTerm) => !this.state.results[searchTerm]

    setSearchTopStories = (result) => {
        const { hits, page } = result
        this.setState(updateSearchTopStoriesState(hits, page))
    }

    fetchSearchTopStories = (searchTerm, page = 0) => {
        this.setState({ isLoading: true })
        const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
        fetch(url)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => this.setState({ error: e }))
    }

    onDismiss = (id) => {
        const { searchKey, results } = this.state
        const { hits, page } = results[searchKey]
        const updatedHits = hits.filter(item => item.objectID !== id)
        this.setState({ results: {...results, [searchKey]: { hits: updatedHits, page } } })
    }

    onSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value })
    }

    onSearchSubmit = (event) => {
        const { searchTerm } = this.state
        this.setState({ searchKey: searchTerm, sortKey: 'NONE' })
        if (this.needToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm)
        }
        event.preventDefault()
    }

    componentDidMount() {
        const { searchTerm } = this.state
        this.setState({ searchKey: searchTerm })
        this.fetchSearchTopStories(searchTerm)
    }

    render() {
        const { searchTerm, results, searchKey, error, isLoading } = this.state
        const page = (results && results[searchKey] && results[searchKey].page) || 0
        const list = (results && results[searchKey] && results[searchKey].hits) || []

        return (
            <div className="page">
                <div className="interactions">
                    <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Search</Search>
                </div>
                    { error
                        ? <div className="interactions"><p>Something went wrong.</p></div>
                        : <Table list={list} onDismiss={this.onDismiss} />
                    }
                <div className="interactions">
                    <ButtonWithLoading
                        isLoading={isLoading}
                        onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        More
                    </ButtonWithLoading>
                </div>
            </div>
        )
    }
}

export default App
