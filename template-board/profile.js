import { html, css } from 'lit-element'
import { PageView } from './pageview'

import { auth } from '@things-shell/client-auth'

export class AuthProfile extends PageView {
  static get properties() {
    return {
      credential: Object,
      email: String,
      login: String,
      name: String,
      locale: String,
      stomp_url: String,
      exclusive_role: String,
      super_user: Boolean,
      admin_flag: Boolean
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          text-align: center;
        }

        div {
          text-align: center;
        }

        #token {
          display: inline-block;
          width: 50%;
          overflow-wrap: break-word;
          text-align: left;
          border: 1px solid tomato;
          padding: 2px;
        }
      `
    ]
  }

  firstUpdated() {
    auth.on('signin', accessToken => {
      this.credential = null
    })
    auth.on('signout', () => {
      this.credential = null
    })
    auth.on('profile', credential => {
      this.credential = credential
    })

    this.credential = auth.credential
  }

  updated(change) {
    if (change.has('credential')) {
      this.email = this.credential.email
      this.login = this.credential.login
      this.name = this.credential.name
      this.locale = this.credential.locale
      this.stomp_url = this.credential.stomp_url
      this.exclusive_role = this.credential.exclusive_role
      this.super_user = this.credential.super_user
      this.admin_flag = this.credential.admin_flag
    }
  }

  render() {
    return html`
      <div>
        <h3>Auth Profile</h3>

        <div>
          <p>Login: <b>${this.login}</b></p>
        </div>

        <div>
          <p>Name: <b>${this.name}</b></p>
        </div>

        <div>
          <p>Email: <b>${this.email}</b></p>
        </div>

        <div>
          <p>Locale: <b>${this.locale}</b></p>
        </div>

        <div>
          <p>Stomp URL: <b>${this.stomp_url}</b></p>
        </div>

        <div>
          <p>Exclusive Role: <b>${this.exclusive_role}</b></p>
        </div>

        <div>
          Super User
          <input type="checkbox" ?checked=${this.super_user} disabled></p>
        </div>

        <div>
          Admin Flag
          <input type="checkbox" ?checked=${this.admin_flag} disabled></p>
        </div>

        <button @click="${() => auth.signout()}">Sign Out</button>
      </div>
    `
  }
}

customElements.define('auth-profile', AuthProfile)
