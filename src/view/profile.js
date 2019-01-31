import { LitElement, html, css } from 'lit-element'
import { auth } from '../client-auth'

export class UserProfile extends LitElement {
  static get properties() {
    return {}
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

  render() {
    return html`
      <div>
        <h3>User Profile</h3>

        <div>
          <p>Email: <b>${auth.credential && auth.credential.email}</b></p>
        </div>
        <div>
          <p>Token:</p>
          <div id="token">${auth.accessToken}</div>
        </div>

        <button @click="${() => auth.signout()}">Sign Out</button>
      </div>
    `
  }
}

customElements.define('user-profile', UserProfile)
