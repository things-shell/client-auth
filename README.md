# client-auth

## how to build

```shell
yarn build
```

## how to test

```shell
yarn serve
```

## auth process

### signup

[ signout 상태 ]

- signup page로 갔다. (signin으로 리디렉션되지 않아야 한다.)
- signup 실패했다. (signin으로 리디렉션되지 않아야 한다.)
- signup 성공했다.
  (서버에서 인증이 내려오지 않으면, signup 페이지에 머무르거나 등록 성공 페이지로 이동해야한다.)
  (서버에서 인증이 내려오면, 디폴트 페이지로 이동해야 한다.)

[ signin 상태 ]

- (원천적으로) singin 상태에서 signup은 갈 수 없도록 해야한다.
- signup page로 갔다. (디폴트 페이지로 이동되지 않아야 한다.)
- signup 실패했다. (사용자 중복, 패스워드 규칙 오류 등 - signup으로 리디렉션되지 않아야 한다. 기존 로그인 상태는 폐기되야한다.)
- signup 성공했다.
  (서버에서 인증이 내려오지 않으면, signup 페이지에 머무르거나 등록 성공 페이지로 이동해야한다.)
  (서버에서 인증이 내려오면, 디폴트 페이지로 이동해야 한다.)

[ signout 상태 ]

- signin 페이지로 명시적으로 갔다.
- signin 성공했다. => 디폴트페이지로 가야한다.
- signin 실패했다. => 머물러야 한다.

- 다른 페이지를 갔다가 리디렉션되서 signin 페이지로 갔다.(리로딩되지 않아야 한다.)
- signin 성공했다. => 원래 페이지로 가야한다.
- signin 실패했다. => 머물러야 한다.
- signin 실패 후 성공했다. => 원래 페이지로 가야한다.

[ signin 상태 ]

- (원천적으로) singin 상태에서 signup은 갈 수 없도록 해야한다.
- signin page로 명시적으로 갔다. (디폴트 페이지로 이동되지 않아야 한다.)
- signin page에 redirection 방법으로 가서는 안된다. (로그인 상태이므로)
- signin 실패했다. (패스워드 오류 등 - 페이지에 머물러야 한다. 기존 로그인 상태는 폐기되야한다.)
- signup 성공했다. (디폴트 페이지로 이동해야 한다.)
