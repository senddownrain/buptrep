export default{
    state: {
        error: ""
    },
    mutations: {
        setError(state, error){
            state.error = error
            console.error("There was an error!", error)
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

