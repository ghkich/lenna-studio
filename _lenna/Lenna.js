import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

export const Lenna = ({appId = '', children}) => {
  const [iframePathname, setIframePathname] = useState(appId ? `/apps/${appId}` : ``)
  const [sidebarMinimized, setSidebarMinimized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    sendHtmlAndLoadCss()
    const handlePostMessage = (e) => {
      const lennaElement = document.getElementById('__lenna')
      if (e.data.message === 'toggleView') {
        if (e.data.value === 'full') {
          lennaElement.classList.add('full-view')
        } else {
          sendHtmlAndLoadCss()
          lennaElement.classList.remove('full-view')
        }
      }

      if (e.data.message === 'pageAccess') {
        sendHtmlAndLoadCss()
        router.replace(e.data.pagePath)
      }
    }
    window.addEventListener('message', handlePostMessage)

    return () => {
      window.removeEventListener('message', handlePostMessage)
    }
  }, [])

  const lennaApiCommunication = () => {
    const contentElement = document.querySelector('#__lenna .lenna-content')
    const pageHTML = contentElement?.innerHTML
    const stringifiedPageHTML = JSON.stringify(pageHTML)
    if (window.pageHtml !== stringifiedPageHTML) {
      window.pageHtml = stringifiedPageHTML
      const xhr = new XMLHttpRequest()
      console.log('sending-data')
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
        console.log('data-sent')
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
  }

  const toggleSidebar = () => {
    setSidebarMinimized((prev) => !prev)
  }

  return (
    <>
      <style jsx>{`
        #__lenna .lenna-content {
          transition: opacity 0.2s linear;
          position: fixed;
          right: 327px;
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
          transition: transform 0.15s linear;
          background-color: #f9f9f9;
          border-left: 1px solid rgb(228, 228, 231);
        }

        #__lenna.full-view > iframe {
          width: 100vw;
        }

        #__lenna .lenna-sidebar-toggle {
          width: 6px;
          height: 100vh;
          background-color: rgb(244, 244, 245);
          border-left: 1px solid rgb(228, 228, 231);
          position: fixed;
          top: 0;
          right: 320px;
          bottom: 0;
          z-index: 15;
          cursor: pointer;
          transition: right 0.15s linear;
        }

        #__lenna .lenna-sidebar-toggle:hover {
          background-color: rgb(235, 235, 236);
        }

        #__lenna.sidebar-minimized .lenna-content {
          right: 0;
        }

        #__lenna.sidebar-minimized > iframe {
          transform: translateX(320px);
        }

        #__lenna.sidebar-minimized .lenna-sidebar-toggle {
          right: 0;
        }
      `}</style>
      <div id="__lenna" className={sidebarMinimized ? 'sidebar-minimized' : ''}>
        <iframe src={`http://localhost:3050${iframePathname}`} allow="clipboard-write" />
        <div className="lenna-sidebar-toggle" onClick={toggleSidebar} />
        <div className="lenna-content" style={{opacity: 0}}>
          {children}
        </div>
      </div>
    </>
  )
}
