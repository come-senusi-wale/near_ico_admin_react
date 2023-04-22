//import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
//import getConfig from './config'


import { CONTRACT_NAME, getConfig } from "./config";

const nearConfig = getConfig('development');

// Initialize contract & set global variables
export async function initContract () {
  // Initialize connection to the NEAR testnet
  //const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
    let near = await window.nearApi.connect(nearConfig);

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new window.nearApi.WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string

  window.account = await window.walletConnection.account()

  // Initializing our contract APIs by contract name and configuration

  window.contract =  new window.nearApi.Contract(
    window.account, 
    CONTRACT_NAME, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['query_mininum_amount_to_invest', 'query_equivalent_token_reward', 'query_maximum_token_ivestor_can_buy', 'query_ico_closing_date', 'query_expected_money', 'query_amoun_invested_so_far', 'member_details', 'investor_details'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['change_equivalent_near_token_reward', 'change_minimun_amount_to_invest', 'change_maximun_token', 'add_member_to_role', 'mint_token', 'mint_token_for_others', 'change_ico_closing_date', 'add_expected_from_all_investor'],
  })
}; 


// for checking if account is loging
export const isLogging = () => {
    return window.walletConnection.isSignedIn();
}


// for getting signer account
export const getAccount = () => {
    return window.walletConnection.getAccountId();
    
}


// for loging out user 
export function logout() {

    if (isLogging()) {

        window.walletConnection.signOut();
        window.location.reload();
        // reload page
        //window.location.replace(window.location.origin + window.location.pathname)
        
    } else {

        alert('already logout');
        
    }

}


// for logig in user
export async function login() {
  
  if (!isLogging()) {
    window.walletConnection.requestSignIn(CONTRACT_NAME);
  } else {
   
    alert(`already login please as ${getAccount()}`);
  }
  
}


// function for getting user near token balance
export async function balances () {
    if (isLogging()) {

        let nearConnection =await window.nearApi.connect(nearConfig);
        const account = await nearConnection.account(getAccount());
        let acc = await account.getAccountBalance();

        return acc;
        
    } else {
        
        return false;
    }

}


//function to change equivalent token reward
export async function change_equivalent_near_token_reward(amount){

  if (isLogging()) {

    let changing_equivalent_near_token_reward = await window.contract.change_equivalent_near_token_reward(
      
      {
        amount
      },
      "300000000000000", // attached GAS (optional)
      "600000"
    );

    return changing_equivalent_near_token_reward;
    
  } else {

      return false;

  }
}


//function to change minimunt amount to invest at particular time
export async function change_minimun_amount_to_invest(amount){

  if (isLogging()) {

    let changing_minimun_amount_to_invest = await window.contract.change_minimun_amount_to_invest(
      
      {
        amount
      },
      "300000000000000", // attached GAS (optional)
      "600000"
    );

    return changing_minimun_amount_to_invest;
    
  } else {

      return false;

  }
}


//function to change maximun amount you can invest
export async function change_maximun_token(amount){

  if (isLogging()) {

    let changing_maximun_token = await window.contract.change_maximun_token(
      
      {
        amount
      },
      "300000000000000", // attached GAS (optional)
      "600000"
    );

    return changing_maximun_token;
    
  } else {

      return false;

  }
}


//function to add member
export async function add_member_to_role(account, role){

  if (isLogging()) {

    let adding_member_to_role = await window.contract.add_member_to_role(
      
      {
        member_id: account,
       role
      },
      "300000000000000", // attached GAS (optional)
      "600000"
    );

    return adding_member_to_role;
    
  } else {

      return false;

  }
}


//function to mint token
export async function mint_token(amount){

  if (isLogging()) {

    let minting_token = await window.contract.mint_token(
      
      {
       amount
      },
      "300000000000000", // attached GAS (optional)
      "600000"
    );

    return minting_token;
    
  } else {

      return false;

  }
}


//function to to mint token for others members
export async function mint_token_for_others(account, amount){

  if (isLogging()) {

    let minting_token_for_others = await window.contract.mint_token_for_others(
      
      {
        amount,
        account
      },
      "300000000000000", // attached GAS (optional)
      "4000000000000000000000"
    );

    return minting_token_for_others;
    
  } else {

      return false;

  }
}


//function to change ico closing date
export async function change_ico_closing_date(duration){

  if (isLogging()) {

    let changing_ico_closing_date = await window.contract.change_ico_closing_date(
      
      {
        duration
      },
      "300000000000000", // attached GAS (optional)
      "600000"
    );

    return changing_ico_closing_date;
    
  } else {

      return false;

  }
}

//function to add ecpected money from ico
export async function add_expected_from_all_investor(amount){

  if (isLogging()) {

    let adding_expected_from_all_investor = await window.contract.add_expected_from_all_investor(
      
      {
        amount
      }
    );

    return adding_expected_from_all_investor;
    
  } else {

      return false;

  }
}


// function for query minimum amount to invest
export let query_mininum_amount_to_invest = async () => {

  if (isLogging()) {

    let response = await window.contract.query_mininum_amount_to_invest();

    return response;
  
  } else {

      return false;

  }

}


// function for query equivalent token reward
export let query_equivalent_token_reward = async () => {

  if (isLogging()) {

    let response = await window.contract.query_equivalent_token_reward();

    return response;
  
  } else {

      return false;

  }

}

// function for query maximun token investor can buy
export let query_maximum_token_ivestor_can_buy = async () => {

  if (isLogging()) {

    let response = await window.contract.query_maximum_token_ivestor_can_buy();

    return response;
  
  } else {

      return false;

  }

}


// function for query ico closing date
export let query_ico_closing_date = async () => {

  if (isLogging()) {

    let response = await window.contract.query_ico_closing_date();

    return response;
  
  } else {

      return false;

  }

}

// function for query expected money
export let query_expected_money = async () => {

  if (isLogging()) {

    let response = await window.contract.query_expected_money();

    return response;
  
  } else {

      return false;

  }

}


// function for amount invested so far
export let query_amoun_invested_so_far = async () => {

  if (isLogging()) {

    let response = await window.contract.query_amoun_invested_so_far();

    return response;
  
  } else {

      return false;

  }

}



// function for amount invested so far
export let member_details = async (account) => {

  if (isLogging()) {

    let response = await window.contract.member_details(
      {
        account
      }
    );

    return response;
  
  } else {

      return false;

  }

}

// function for amount invested so far
export let investor_details = async (account) => {

  if (isLogging()) {

    let response = await window.contract.investor_details(
      {
        account
      }
    );

    return response;
  
  } else {

      return false;

  }

}