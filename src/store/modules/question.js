export default{
    namespaced:true,
    state: {
        questions:[5]
      },
      getters: {
      },
      mutations: {
        addQuestion(state,qes){
            state.questions[0]=qes
        }
      },
      actions: {
      }
}