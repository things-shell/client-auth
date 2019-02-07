import { html, css } from 'lit-element'
import { PageView } from './pageview'

import { auth } from '../client-auth'

export class AuthSignOut extends PageView {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      `
    ]
  }

  render() {
    return html`
      <h3>Sign Out</h3>
      <a href=${auth.fullpath(auth.signinPath)}>Sign In</a>
    `
  }
}

customElements.define('auth-signout', AuthSignOut)
