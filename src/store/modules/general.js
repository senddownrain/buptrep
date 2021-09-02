export default{
    state: {
        error: ""
    },
    mutations: {
        setError(state, error){
            state.error = error
            console.log(error)
        },
        clearError(state){
            state.error = ""
        }
    },
    actions: {
    },
    getters: {

    }
}

