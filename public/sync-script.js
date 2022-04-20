;(function () {
  const lennaScriptEl = document.getElementById('__lenna-script')
  const appId = lennaScriptEl.getAttribute('data-app-id')
  const rootContainerId = lennaScriptEl.getAttribute('data-root-container-id')
  const devDomain = lennaScriptEl.getAttribute('data-dev-domain')
  const domainPath = devDomain ? devDomain : 'https://lenna.studio'

  // Communication between Lenna Studio iframe
  // and the project where it was embedded3
  const handlePostMessage = (e) => {
    const lennaElement = document.getElementById('__lenna')
    if (e.data.message === 'showLennaContent') {
      lennaElement.classList.add('show-content')
    }

    if (e.data.message === 'hideLennaContent') {
      sendHtmlAndGetCss()
      lennaElement.classList.remove('show-content')
    }

    if (e.data.message === 'forceNavigation') {
      sendHtmlAndGetCss()
      window.location.href = e.data.pagePath || window.location.pathname
    }
  }

  window.addEventListener('message', handlePostMessage)

  const sendHtmlAndGetCss = () => {
    const PAGE_HTML_STORAGE_KEY = `${appId}-${window.location.pathname}`
    const defaultLennaContent = document.querySelector('#__lenna .lenna-content')
    let contentElement = defaultLennaContent
    if (document.querySelector('#__next')) {
      contentElement = document.querySelector('#__next')
    }
    if (rootContainerId) {
      contentElement = document.querySelector(`#${rootContainerId}`)
    }
    const pageHTML = contentElement?.innerHTML
    const stringifiedPageHTML = JSON.stringify(pageHTML)

    // Only send html if the page content has changed
    if (localStorage.getItem(PAGE_HTML_STORAGE_KEY) !== stringifiedPageHTML) {
      localStorage.setItem(PAGE_HTML_STORAGE_KEY, stringifiedPageHTML)
      const sendHtml = new XMLHttpRequest()
      sendHtml.open('POST', `${domainPath}/api/sendHtml`, true)
      sendHtml.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
      sendHtml.send(
        JSON.stringify({
          appId,
          pathname: window.location.pathname,
          html: pageHTML,
        }),
      )
      sendHtml.onloadend = function () {
        console.log('html-sent')
      }
    }
    const getCss = new XMLHttpRequest()
    getCss.open('POST', `${domainPath}/api/getCss`, true)
    getCss.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    getCss.send(
      JSON.stringify({
        appId,
      }),
    )
    getCss.onreadystatechange = function () {
      if (getCss.readyState === XMLHttpRequest.DONE) {
        console.log('css-received')
        const jsonResponse = JSON.parse(getCss.responseText)
        const css = jsonResponse.css,
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style')

        head.appendChild(style)

        style.type = 'text/css'
        if (style.styleSheet) {
          style.styleSheet.cssText = css
        } else {
          style.appendChild(document.createTextNode(css))
        }
        defaultLennaContent.style.opacity = '1'
        defaultLennaContent.style.pointerEvents = 'auto'
      }
    }
  }

  const toggleLennaSidebar = () => {
    document.getElementById('__lenna').classList.toggle('sidebar-minimized')
  }

  // Add Lenna Studio iframe to the project
  document.onreadystatechange = function () {
    // hide document.body while loading Lenna Studio
    document.body.style.opacity = '0'
    if (document.readyState === 'complete') {
      window.setTimeout(() => {
        const lennaWrap = document.createElement('div')
        lennaWrap.id = '__lenna'
        const lennaToggleBar = document.createElement('div')
        lennaToggleBar.addEventListener('click', toggleLennaSidebar)
        lennaToggleBar.classList.add('lenna-sidebar-toggle')
        const lennaContent = document.createElement('div')
        lennaContent.classList.add('lenna-content')
        lennaContent.style.opacity = '0'
        const iframe = document.createElement('iframe')
        iframe.setAttribute('allow', 'clipboard-write')
        const pagePath = window.location.pathname
        iframe.src = `${domainPath}/apps/${appId}?pagePath=${pagePath}`
        lennaWrap.appendChild(lennaContent)
        lennaWrap.appendChild(iframe)
        lennaWrap.appendChild(lennaToggleBar)
        lennaWrap.appendChild(lennaContent)
        const pageElements = document.querySelectorAll('body > *')
        pageElements.forEach((node) => {
          lennaContent.append(node)
        })
        document.body.appendChild(lennaWrap)
        document.body.style.opacity = '1'
        sendHtmlAndGetCss()
      }, 100)

      // Lenna Studio embedded content CSS
      const styleEl = document.createElement('style')
      styleEl.innerHTML = `
        #__lenna .lenna-content {
          transition: all 0.15s linear;
          position: fixed;
          top: 0;
          right: 326px;
          left: 0;
          height: 100vh;
          background-color: #FFF;
          z-index: 20;
          opacity: 0;
        }
        
        #__lenna > iframe {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          border: none;
          z-index: 10;
          transition: transform 0.15s linear;
          background-color: #f9f9f9;
          border-left: 1px solid rgb(228, 228, 231);
        }

        #__lenna.show-content .lenna-content {
          opacity: 100;
          z-index: 5;
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
        
        #__lenna.show-content .lenna-sidebar-toggle {
          display: none;
        }

        #__lenna .lenna-sidebar-toggle:hover {
          background-color: rgb(235, 235, 236);
        }

        #__lenna.sidebar-minimized .lenna-content {
          right: 6px;
        }

        #__lenna.sidebar-minimized > iframe {
          transform: translateX(320px);
        }

        #__lenna.sidebar-minimized .lenna-sidebar-toggle {
          right: 0;
        }
      `
      document.head.appendChild(styleEl)
    }
  }
})()
