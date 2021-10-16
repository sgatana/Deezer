import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PageWrapper from './components/common/PageWrapper'
import ArstistDetails from './pages/Artist/Detail'
import ArtistList from './pages/Artist/List'

const App =  ( ) => {
  return (
    <PageWrapper>
   <Switch>
     <Route exact path={'/'} component={ArtistList} />
     <Route exact path={'/artist/:id'} component={ArstistDetails} />
   </Switch>
    </PageWrapper>
  )
}

export default App