document.addEventListener('scatterLoaded', scatterExtension => {
  scatter = window.scatter;
  console.log("aaaaa");
  console.log(scatter);
  const account = scatter.identity.accounts.filter(account => account.blockchain === 'eos')
  console.log("bbbbbb");
  console.log(account);
  console.log("cccccc");
  const requiredFields = {
    accounts:[ { blockchain:'eos', chainId:'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191' } ]};
  scatter.getIdentity(requiredFields).then(identity => {
	    // This would give back an object with the required fields such as `firstname` and `lastname`
	    // as well as add a permission for your domain or origin to the user's Scatter to allow deeper
	    // requests such as requesting blockchain signatures, or authentication of identities.
	    console.log(identity);

	}).catch(error => {
	    //...
	    console.log("dddddd");
	});
})