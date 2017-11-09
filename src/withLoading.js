import React, { Component } from 'react'
import Loading from './Loading'

const withLoading = (Component) => ({ isLoading, ...rest }) =>
    isLoading
        ? <Loading />
        : <Component { ...rest } />

export default withLoading
