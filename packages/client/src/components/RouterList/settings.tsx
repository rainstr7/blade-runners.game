import Main from '../../views/Main'
import SignUp from '../../views/SignUp'
import Auth from '../../views/Auth'
import Errors from '../../views/Errors'
import React from 'react'
import { Navigate } from 'react-router-dom'
import Start from '../../views/Start'
import GameOver from '../../views/GameOver'
import Game from '../../views/Game'
import Profile from '../../views/Profile'
import LeaderBoard from '../../views/Leaderboard'
import Forum from '../../views/Forum'

export const routerListBeforeAuth = {
  '/signup': {
    component: <SignUp />,
    header: 'BLADE RUNNER',
    type: 'Default',
  },
  '/signin': {
    component: <Auth />,
    header: 'BLADE RUNNER',
    type: 'Default',
  },
  '/start': {
    component: <Navigate to="/signin" replace />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
  '/gameover': {
    component: <Navigate to="/signin" replace />,
    header: 'Game Over',
    type: 'GameOver',
  },
  '/game': {
    component: <Navigate to="/signin" replace />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
  '/settings': {
    component: <Navigate to="/signin" replace />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
  '/rating': {
    component: <Navigate to="/signin" replace />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
  '/forum': {
    component: <Navigate to="/signin" replace />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
}

export const forError = {
  '/500': {
    component: <Errors />,
    header: '500',
    type: 'Error',
  },
  '/404': {
    component: <Errors />,
    header: '404',
    type: 'Error',
  },
  '*': {
    component: <Navigate to="/404" replace />,
    header: '',
    type: '',
  },
}

export const routerListForGame = {
  '/start': {
    component: <Start />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
  '/gameover': {
    component: <GameOver />,
    header: 'Game Over',
    type: 'GameOver',
  },
  '/game': {
    component: <Game />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
  '/settings': {
    component: <Profile />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
  '/rating': {
    component: <LeaderBoard />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
  '/forum': {
    component: <Forum />,
    header: 'BLADE RUNNERS',
    type: 'Default',
  },
}

export const routerListAfterAuth = {
  '/signup': {
    component: <Navigate to="/start" replace />,
    header: 'BLADE RUNNER',
    type: 'Default',
  },
  '/signin': {
    component: <Navigate to="/start" replace />,
    header: 'BLADE RUNNER',
    type: 'Default',
  },
  ...routerListForGame,
}
export const routerList = {
  '/': {
    component: <Main />,
    header: '',
    type: 'Landing',
  },
  ...routerListBeforeAuth,
  ...forError,
}
