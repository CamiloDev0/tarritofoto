import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import { Data } from '../components/Data'

export const AppRouter = () => {
    console.log('render')
  return (
    <Routes>
        <Route path='/' Component={App}></Route>
        <Route path='/data' Component={Data}></Route>
    </Routes>
  )
}
