const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,

  token: state => state.user.token,
  roles: state => state.user.roles,
  userForm: state => state.user.userForm,
  permission_routes: state => state.permission.routes
}

export default getters
