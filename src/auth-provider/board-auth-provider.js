import { sleep, delete_cookie } from '@things-shell/client-utils'

export default {
  signinPath: 'signin',
  signupPath: 'signup',
  profilePath: 'authcheck',
  signoutPath: '',

  async signup(formProps) {
    var { email, password } = formProps

    let body = new FormData()
    body.append('email', email)
    body.append('password', crypto.subtle.digest('SHA-256', password))

    try {
      const response = await fetch(this.fullpath(this.signupPath), {
        method: 'POST',
        credentials: 'include',
        headers: {
          // 'Content-Type': 'application/json'
        },
        body
      })

      if (response.ok) {
        const data = await response.json()

        if (data && data.error) {
          this.onAuthError(data.error)
          return
        }
        if (data && data.token) {
          /*
           data.token 이 전달되면, 서버는 특별한 확인과정없이 사용자 승인한 것으로 이해하고, 바로 자동 로그인 절차에 들어간다.
           즉, 사용자 auth dispatch 후에 바로 사용자 정보를 서버에 요청한다.
          */
          this.onSignedIn(data.token)
          this.profile()
          return
        } else {
          throw new Error(response.status)
        }
      }
    } catch (e) {
      this.onAuthError(e)
    }
  },

  async signin(formProps) {
    var { email, password } = formProps

    let body = new FormData()
    body.append('email', email)
    body.append('password', crypto.subtle.digest('SHA-256', password))

    try {
      const response = await fetch(this.fullpath(this.signinPath), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })

      if (response.ok) {
        const data = await response.json()

        // localStorage.setItem('access_token', data.token)

        /* 사용자 auth dispatch 후에 바로 사용자 정보를 서버에 요청함. */
        this.onSignedIn(data.token)
        this.profile()

        return
      } else {
        throw new Error(response.status)
      }
    } catch (e) {
      this.onAuthError(e)
    }
  },

  async profile() {
    try {
      const response = await fetch(this.fullpath(this.profilePath), {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()

        this.onProfileFetched(data.user, data.token)

        return
      } else {
        let status = Number(response.status)
        if (status == 401) {
          this.onAuthRequired(response.status)
          return
        }
        throw new Error(response)
      }
    } catch (e) {
      this.onAuthError(e)
    }
  },

  async signout() {
    delete_cookie('access_token')
    await sleep(1000)
    this.onSignedOut('signed out')
  }
}