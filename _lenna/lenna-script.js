;(function () {
  const appId = document.getElementById('__lenna-script').getAttribute('data-app-id')
  const styleEl = document.createElement('style')
  styleEl.innerHTML = `
        #__lenna .lenna-content {
          transition: opacity 0.2s linear;
          position: fixed;
          top: 0;
          right: 327px;
          left: 0;
          height: 100vh;
          background-color: #FFF;
        }
        
        body {
            padding-right: 327px;
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

        body.sidebar-minimized #__lenna .lenna-content {
          padding-right: 0;
        }

        body.sidebar-minimized #__lenna > iframe {
          transform: translateX(320px);
        }

        body.sidebar-minimized #__lenna .lenna-sidebar-toggle {
          right: 0;
        }
      `
  document.head.appendChild(styleEl)

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

    if (e.data.message === 'forceNavigation') {
      sendHtmlAndLoadCss()
      window.location.href = e.data.pagePath
    }
  }
  window.addEventListener('message', handlePostMessage)

  const lennaApiCommunication = () => {
    const contentElement = document.querySelector('#__lenna .lenna-content')
    const pageHTML = contentElement?.innerHTML
    const stringifiedPageHTML = JSON.stringify(pageHTML)
    if (window.pageHtml !== stringifiedPageHTML) {
      window.pageHtml = stringifiedPageHTML
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
        console.log('data-sent')
      }
      const xhr2 = new XMLHttpRequest()
      xhr2.open('POST', 'http://localhost:3050/api/getCss', true)
      xhr2.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
      xhr2.send(
        JSON.stringify({
          appId,
        }),
      )
      xhr2.onreadystatechange = function () {
        if (xhr2.readyState === XMLHttpRequest.DONE) {
          var jsonResponse = JSON.parse(xhr2.responseText)
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
          contentElement.style.opacity = '1'
          contentElement.style.pointerEvents = 'auto'
        }
      }
    }
  }

  const sendHtmlAndLoadCss = () => {
    lennaApiCommunication()
  }

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-minimized')
  }

  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      document.body.style.opacity = '0'
      window.setTimeout(() => {
        const lennaWrap = document.createElement('div')
        lennaWrap.id = '__lenna'
        const lennaToggleBar = document.createElement('div')
        lennaToggleBar.addEventListener('click', toggleSidebar)
        lennaToggleBar.classList.add('lenna-sidebar-toggle')
        const lennaContent = document.createElement('div')
        lennaContent.classList.add('lenna-content')
        lennaContent.style.opacity = '0'
        const iframe = document.createElement('iframe')
        const pagePath = window.location.pathname
        iframe.src = `http://localhost:3050/apps/${appId}?pagePath=${pagePath}`
        lennaWrap.appendChild(lennaContent)
        lennaWrap.appendChild(iframe)
        lennaWrap.appendChild(lennaToggleBar)
        lennaWrap.appendChild(lennaContent)
        document.querySelectorAll('body *').forEach((node) => {
          lennaContent.append(node)
        })
        document.body.appendChild(lennaWrap)
        document.body.style.opacity = '1'
        sendHtmlAndLoadCss()
      }, 100)
    }
  }
})()
