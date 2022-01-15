import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

export const Lenna = ({appId = '', children}) => {
  const [iframePathname, setIframePathname] = useState(`/apps/${appId}`)
  const router = useRouter()

  useEffect(() => {
    const handlePostMessage = (e) => {
      if (e.data === 'toggleView') {
        const lennaElement = document.getElementById('__lenna')
        lennaElement.classList.toggle('full-view')
      }

      if (e.data.message === 'pageAccess') {
        if (e.data.existingPage) {
          router.replace(e.data.pagePath)
        }
      }
    }
    window.addEventListener('message', handlePostMessage)

    return () => {
      window.removeEventListener('message', handlePostMessage)
    }
  }, [])

  const lennaApiCommunication = () => {
    const contentElement = document.getElementById('__lenna-content')
    const pageHTML = contentElement?.innerHTML
    if (window.pageHtml !== pageHTML) {
      window.pageHtml = pageHTML
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'http://localhost:3050/api/sendHtml', true)
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
      xhr.send(
        JSON.stringify({
          appId,
          pathname: window.location.pathname,
          html: pageHTML,
        }),
      )
      xhr.onloadend = function () {
        // done
        console.log('dataSent')
      }

      xhr.open('POST', 'http://localhost:3050/api/getCss', true)
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
      xhr.send(
        JSON.stringify({
          appId,
        }),
      )
      xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          var jsonResponse = JSON.parse(xhr.responseText)
          var css = jsonResponse.css,
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style')

          head.appendChild(style)

          style.type = 'text/css'
          if (style.styleSheet) {
            style.styleSheet.cssText = css
          } else {
            style.appendChild(document.createTextNode(css))
          }
          contentElement.style.opacity = 1
          contentElement.style.pointerEvents = 'auto'
        }
      }
    }
  }

  const sendHtmlAndLoadCss = () => {
    lennaApiCommunication()
    setInterval(() => {
      lennaApiCommunication()
    }, 1000)
  }

  return (
    <>
      <style jsx>{`
        #__lenna > div {
          pointer-events: none;
          transition: opacity 0.2s linear;
          position: fixed;
          right: 320px;
          left: 0;
          height: 100vh;
        }

        #__lenna > iframe {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 320px;
          height: 100vh;
          border: none;
          z-index: 10;
        }

        #__lenna.full-view > iframe {
          width: 100vw;
        }
      `}</style>
      <div id="__lenna" onLoad={sendHtmlAndLoadCss}>
        <iframe id="__lenna-app" src={`http://localhost:3050${iframePathname}`} allow="clipboard-write" />
        <div id="__lenna-content" style={{opacity: 0}}>
          {children}
        </div>
      </div>
    </>
  )
}
