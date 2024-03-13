export default {
    methods: {
      get_token(login_user) {
        let token_name = 'CognitoIdentityServiceProvider.3qkehtptai6rnhe46lovm99r9u.' + login_user + '.idToken'
        let get_token = localStorage.getItem(token_name)
        return get_token
      }
  }
}