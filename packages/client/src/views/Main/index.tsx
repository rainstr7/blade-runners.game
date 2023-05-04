import React from 'react'
import cn from './style.module.scss';

const Main = () => {


  return (
      <main className={cn.Container}>

        <header className={cn.Header}>
          <div>
            By Blade Runners
          </div>
          <div>Go To Game</div>
        </header>

        <div className={cn.Main}>
          <h2 className='title'>Blade Runner</h2>

        </div>

        <div className={cn.Galery}>galery</div>

        <footer className={cn.Footer}>footer</footer>
      </main>
  )
}

export default Main
