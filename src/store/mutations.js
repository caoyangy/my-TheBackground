let mutations = {
	increment(state,n){
		state.tabCut = n;
		sessionStorage.setItem('tabMsg', n);
	},
	changeNav(state,n){
		state.tabMsges = n;
		sessionStorage.setItem('tabMsges', n);
	}
}

export default mutations;