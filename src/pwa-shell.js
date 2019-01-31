import { LitElement, html, css } from 'lit-element'

import { installRouter } from 'pwa-helpers/router.js'

import './view/signin'
import './view/signup'
import './view/profile'
import './view/signout'

export default class PWAShell extends LitElement {
  static get properties() {
    return {
      page: String,
      id: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          font-size: 3em;
        }

        #container > * {
          display: none;
        }

        #container > *[active] {
          display: block;
        }
      `
    ]
  }

  render() {
    return html`
      <auth-router
        .authProvider=""
        .signinPath="signin"
        .signupPath="singup"
        .signoutPath="singout"
        .profilePath="profile"
        .contextPath=""
        .defaultRoutePath="/"
        .authRequiredEvent="auth-required"
      ></auth-router>

      <div id="container">
        <auth-signin ?active=${this.page == 'signin'}></auth-signin>
        <auth-signup ?active=${this.page == 'signup'}></auth-signup>
        <auth-profile ?active=${this.page == 'profile'}></auth-profile>
        <auth-signout ?active=${this.page == 'signout'}></auth-signout>

        <div ?active=${this.page == 'page1'}>
          <h1>PAGE 1 : ${this.id}</h1>
          <a href="/page1/id1">page1</a> <a href="/page2/id2">page2</a> <a href="/page3/id3">page3</a>
          <a href="/signin">singin</a>
        </div>

        <div ?active=${this.page == 'page2'}>
          <h1>PAGE 2 : ${this.id}</h1>
          <a href="/page1/id1">page1</a> <a href="/page2/id2">page2</a> <a href="/page3/id3">page3</a>
        </div>

        <div ?active=${this.page == 'page3'}>
          <h1>PAGE 3 : ${this.id}</h1>
          <a href="/page1/id1">page1</a> <a href="/page2/id2">page2</a> <a href="/page3/id3">page3</a>
        </div>
      </div>
    `
  }

  firstUpdated() {
    installRouter(location => {
      const path = decodeURIComponent(location.pathname)

      this.page = path === '/' ? 'page1' : path.split('/')[1]
      this.id = path.split('/')[2]
    })
  }
}

customElements.define('pwa-shell', PWAShell)
