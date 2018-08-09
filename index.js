Eos = require('eosjs')

let addr = 'api-kylin.eosasia.one';
let port = 443;
let proto = 'https'
let fulladdr = 'https://api-kylin.eosasia.one:443';
let chainid = '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191';

var btn=document.getElementById('login');
//添加测试网网络
const network = {
  blockchain:'eos',
  host:addr,
  port: port,
  protocol:proto,
  chainId:chainid
};

btn.onclick=function(){
  const requiredFields = {
  accounts:[ { blockchain:'eos', chainId:chainid,
  host:addr,port:port } ]};
  scatter.getIdentity(requiredFields).then(identity => {
      // This would give back an object with the required fields such as `firstname` and `lastname`
      // as well as add a permission for your domain or origin to the user's Scatter to allow deeper
      // requests such as requesting blockchain signatures, or authentication of identities.
      console.log(identity);
      checkiden=document.getElementById("checkident");
      checkiden.innerHTML="登录成功"+identity.accounts[0].name;

  }).catch(error => {
      //...
      console.log("获取身份失败");
  });

};
document.getElementById("getbalance").onclick=function(){
  EosApi = require('eosjs-api') // Or EosApi = require('./src')

  // everything is optional
  options = {
    httpEndpoint: fulladdr, // default, null for cold-storage
    verbose: false, // API logging
    logger: { // Default logging functions
      log: console.log ,
      error:  console.error 
    },
    fetchConfiguration: {}
  }

  eos = EosApi(options)
  accountname = scatter.identity.accounts[0].name;
  eos.getTableRows(true, "wafyarttoken", accountname, "accounts").then(result => {
    console.log(result.rows[0].balance);
    console.log(result.rows.length);
    balance=document.getElementById("balance");
    balance.innerHTML="代币余额:"+result.rows[0].balance;
  });

}
document.getElementById("send").onclick=function(){
  //认证身份
  scatter.authenticate().then(signedOrigin => {
    console.log("身份认证通过");
    console.log(signedOrigin);
    //签署交易
  }).catch(failedAuthentication => {
    console.log("身份认证失败");
  })

  const account=scatter.identity.accounts[0];
  const eosOptions={
    logger: { // Default logging functions
      log: console.log ,
      error:  console.error 
    },
    fetchConfiguration: {}
  };
  const eos = scatter.eos( network, Eos, eosOptions);

  eos.contract('wafyarttoken').then(contract => {
      contract.transfer(account.name,"moon11112222","1.0000 MZ","api test",{
        authorization:[{
          actor:account.name,
          permission:account.authority
        }],
        broadcast:true,
        sign:true
      });
  });

}
document.addEventListener('scatterLoaded', scatterExtension => {
	scatter = window.scatter;
	// 发现scatter插件
	findlog=document.getElementById("findscatter");
	findlog.innerHTML="发现scatter插件";
 	
  // 判断是否登录过身份
  if(scatter.identity){
    checkiden=document.getElementById("checkident");
    checkiden.innerHTML="已经登录过了"+scatter.identity.accounts[0].name;
    console.log(scatter.identity);
  }

  //const eos = scatter.eos( network, Eos.Localnet, eosOptions )
  scatter.suggestNetwork(network).then(added => {
    console.log("添加网络成功");
  })

})