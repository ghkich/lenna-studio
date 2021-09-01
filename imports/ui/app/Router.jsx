import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export const PageLayout = ({children}) => <div className="page">{children}</div>

export const Home = () => (
  <PageLayout>
    <div className="loading">Loading...</div>
  </PageLayout>
)

export const Welcome = () => {
  const [slideActiveIndex, setSlideActiveIndex] = useState(0)

  const slides = [1, 2, 3, 4]

  return (
    <PageLayout>
      <div className="slides">
        {slides.map((slide, idx) => (
          <div key={idx} className={`slide ${slideActiveIndex === idx ? 'active' : ''}`}>
            Slide {slide}
          </div>
        ))}
      </div>
      <div className="controls">
        {slideActiveIndex + 1 < slides.length && (
          <button
            onClick={() => {
              setSlideActiveIndex((prev) => prev + 1)
            }}
          >
            Next slide
          </button>
        )}
      </div>
    </PageLayout>
  )
}
