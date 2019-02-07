import { LitElement } from 'lit-element'

import { auth } from './client-auth'

export default class AuthRouter extends LitElement {
  static get properties() {
    return {
      authenticated: Boolean,
      credential: Object,
      error: Object,

      authProvider: Object,

      signinPath: String,
      signupPath: String,
      signoutPath: String,
      profilePath: String,

      contextPath: String,
      defaultRoutePath: String,

      authRequiredEvent: String,
      endpoint: String
    }
  }

  async firstUpdated() {
    auth.on('signin', accessToken => {
      this.accessToken = accessToken
      this.dispatchEvent(
        new CustomEvent('authenticated-changed', {
          bubbles: true,
          composed: true,
          detail: { authenticated: true, accessToken }
        })
      )
    })

    auth.on('signout', () => {
      this.accessToken = null
      this.dispatchEvent(
        new CustomEvent('authenticated-changed', { bubbles: true, composed: true, detail: { authenticated: false } })
      )
    })

    auth.on('profile', profile => {
      this.dispatchEvent(new CustomEvent('profile-changed', { bubbles: true, composed: true, detail: { profile } }))
    })

    auth.on('error', error => {
      console.error(error)

      this.dispatchEvent(new CustomEvent('error-changed', { bubbles: true, composed: true, detail: { error } }))
    })
  }

  updated(change) {
    change.has('endpoint') && (auth.endpoint = this.endpoint)
    change.has('authProvider') && (auth.authProvider = this.authProvider)

    change.has('signinPath') && (auth.signinPath = this.signinPath)
    change.has('signupPath') && (auth.signupPath = this.signupPath)
    change.has('signoutPath') && (auth.signoutPath = this.signoutPath)
    change.has('profilePath') && (auth.profilePath = this.profilePath)

    change.has('contextPath') && (auth.contextPath = this.contextPath)
    change.has('defaultRoutePath') && (auth.defaultRoutePath = this.defaultRoutePath)

    change.has('authRequiredEvent') && (auth.authRequiredEvent = this.authRequiredEvent)

    /*
      profile을 요청하면서, 인증 여부를 판단하고, 사용자 정보를 획득한다.
    */
    auth.profile()
  }

  isSignedIn() {
    return !!this.credential
  }
}

customElements.define('auth-router', AuthRouter)
