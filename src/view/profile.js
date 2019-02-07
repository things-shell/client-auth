import { html, css } from 'lit-element'
import { PageView } from './pageview'

import { auth } from '../client-auth'

export class AuthProfile extends PageView {
  static get properties() {
    return {
      email: String,
      accessToken: String
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
      this.email = ''
      this.accessToken = accessToken
    })
    auth.on('signout', () => {
      this.email = ''
      this.accessToken = ''
    })
    auth.on('profile', credential => {
      this.email = credential.email
    })
  }

  render() {
    return html`
      <div>
        <h3>User Profile</h3>

        <div>
          <p>Email: <b>${this.email}</b></p>
        </div>
        <div>
          <p>Token:</p>
          <div id="token">${this.accessToken}</div>
        </div>

        <button @click="${() => auth.signout()}">Sign Out</button>
      </div>
    `
  }
}

customElements.define('auth-profile', AuthProfile)
