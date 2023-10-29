export default{
    namespaced:true,
    state: {
        data:[]
      },
      getters: {
      },
      mutations: {
        addData(state,list){
          console.log( state.data);
            state.data=list
            console.log( state.data);
            
        }
      },
      actions: {
      }
}