// ==UserScript==
// @name         Github Issue Blog
// @namespace    https://github.com
// @version      0.1
// @description  try to take over the world!
// @author       Xiaotian
// @match        https://github.com/*/blog/issues/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require      file://\/Users/xiaotian/Code/Github-Issue-Blog/index.js
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...
  console.log('hi~ 2')
  try {
    console.log('hi~ Jquery', $)
  } catch (e) {
    console.log('e', e.toString())
  }

  const getDom = (ele) =>  document.querySelector(ele)
  const debounce = (func, wait) => {
    let timeout
    return () => {
      let context = this
      let args = arguments
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
  // init
  const init = () => {
    let style = document.createElement('style')
    style.innerHTML = `
      .github-issue-panel {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        padding-left: 0 !important;
        width: 50vw;
        display: flex;
        flex-direction: column;
      }
      .github-issue-panel .timeline-comment {
        flex: 1;
      }
      .github-issue-preview-panel {
        border-left: 1px solid #333;
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 50vw;
        z-index: 10;
        background-color: var(--color-bg-canvas)!important;
        margin: 0 !important;
      }
      .github-issue-preview-panel .comment.js-suggested-changes-container,
      .github-issue-preview-panel .comment-body.markdown-body.js-preview-body {
        height: 100%:
      }
      .github-issue-preview-panel[hidden] {
        display: block !important;
      }
      .github-issue-markdown-panel {
        display: block !important;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 50vw;
        z-index: 10;
      }
      .github-tabnav {
        position: fixed;
        left: -100%;
        top: 0;
      }
      .github-footer {
        display: none;
      }
      .github-none {
        display: none !important;
      }

      .github-toggle {
        margin-right: 10px;
      }
    `
    getDom('head').append(style)

    let toggleBtn = document.createElement('button')
    toggleBtn.innerText = "Toggle Edit"
    toggleBtn.classList.add('btn')
    toggleBtn.classList.add('btn-primary')
    toggleBtn.classList.add('github-toggle')

    toggleBtn.setAttribute('type', 'button')

    let container = getDom('.js-slash-command-surface .flex-items-center.flex-justify-end')
    let containerBtn = getDom('.js-slash-command-surface .flex-items-center.flex-justify-end .btn')
    container.insertBefore(toggleBtn, containerBtn)

    toggleBtn.addEventListener('click', e => {
      e.stopPropagation()
      toggle()
    }, false)
  }

  const render = () => {
    getDom('.js-previewable-comment-form button.tabnav-tab.js-preview-tab').click()
    getDom('.js-previewable-comment-form button.tabnav-tab.js-write-tab').click()
  }

  let issueBody = getDom('#issue_body')
  let renderEvent = debounce(() => {
    console.log(11111)
    render()
  }, 500)
  issueBody.addEventListener('input', renderEvent, false)

  const toggle = () => {
    // avatar
    getDom('.timeline-comment-avatar').classList.toggle('github-none')

    // set style
    getDom('.js-preview-panel').classList.toggle('github-issue-preview-panel')
    // getDom('.js-upload-markdown-image.is-default').classList.add('github-issue-markdown-panel')
    getDom('.timeline-comment-wrapper.composer.composer-responsive').classList.toggle('github-issue-panel')

    getDom('.tabnav-tabs').classList.toggle('github-tabnav')
    getDom('.footer.p-responsive').classList.toggle('github-none')
    getDom('.gutter-condensed .flex-shrink-0.col-12.col-md-3 .position-relative').classList.toggle('github-none')
    getDom('.Header').classList.toggle('github-none')
    getDom('#js-repo-pjax-container .color-bg-secondary').classList.toggle('github-none')
  }

  init()
  toggle()

})()