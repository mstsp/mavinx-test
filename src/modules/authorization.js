export default {
    actions: {
        async saveToken(ctx, token) {
            
            ctx.commit('saveTokenMutation', token)
        }, 

        async saveUserRole(ctx, userRole) {
            
            ctx.commit('saveUserRoleMutation', userRole)
        }
    },
    mutations:{
        saveTokenMutation(state, token) {
            state.token = token;
        }, 
        saveUserRoleMutation(state, userRole) {
            state.userRole = userRole;
        }
    },
    state: {
        token: localStorage.getItem('token'),
        userRole: localStorage.getItem('userRole')
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getUserRole(state) {
            return state.userRole;
        }
    }
}
