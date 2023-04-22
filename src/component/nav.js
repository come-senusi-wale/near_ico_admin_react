import React, { useState, useEffect } from "react";

import { isLogging, logout, login, change_equivalent_near_token_reward, change_minimun_amount_to_invest, change_maximun_token,  add_member_to_role, mint_token, mint_token_for_others, change_ico_closing_date, add_expected_from_all_investor, query_ico_closing_date} from "./../near/utils";






export let Nav = () => {

    //for adding memmber
    let [memberAccount, setMemberAccount] = useState('');
    let [memberRole, setMemberRole] = useState('');
    
    // for minting token
    let [amount, setAmount] = useState('');

    // for minting for other member
    let [mintAccount, setMintAccount] = useState('');
    let [mintAmount, setMintAmount] = useState('');

    //for token reward equivalent
    let [tokenRewardAmount, setTokenRewardAmount] = useState('');

    //for minimun amout to invest
    let [minimunAmount, setMinimunAmount] = useState('');

    //for maximun token 
    let [maximunToken, setMaximunToken] = useState('');

    //for ico closing date
    let [icoClosingDate, setIcoClosingDate] = useState('');

    // for expected amount
    let [expectedAmount, setExpectedAmount] = useState('');

    //for ico closing date
    let [icoDayRemianing, setIcoDayRemianing] = useState('');

    // function for login 
    let userlogin = () => {

        login()
    }

    // function for user logout
    let userlogout = () => {

        logout()
    }


    // function to add member
    let addMember = async () => {
        if (memberAccount == '' || memberRole == '' ) {
            alert('fill all the inputs please');

            return; 
        }

        await add_member_to_role(memberAccount, memberRole);
    }

    // function to mint token 
    let mintToken = async () => {
        if (amount == ''  ) {
            alert('fill all the inputs please');

            return; 
        }

        await mint_token(parseInt(amount));
    }

    // function to mint token for others member
    let mintForOther = async () => {
        if (mintAccount == '' || mintAmount == '' ) {
            alert('fill all the inputs please');

            return; 
        }

        await mint_token_for_others(mintAccount, parseInt(mintAmount));
    }

    // function to change token reward
    let tokenReward = async () => {
        if (tokenRewardAmount == ''  ) {
            alert('fill all the inputs please');

            return; 
        }

        await change_equivalent_near_token_reward(parseInt(tokenRewardAmount));
        
    }

    // function to change minomun amount to invest
    let minimumAmountToInvet = async () => {
        if (minimunAmount == ''  ) {
            alert('fill all the inputs please');

            return; 
        }

        await change_minimun_amount_to_invest(parseInt(minimunAmount));

    }

    // function to change maximun token to buy
    let maximunTokenToBuy = async () => {
        if (maximunToken == ''  ) {
            alert('fill all the inputs please');

            return; 
        }

        await change_maximun_token(parseInt(maximunToken));

    }

    // function to change ico closing date
    let icocloseDate = async () => {
        if (icoClosingDate == ''  ) {
            alert('fill all the inputs please');

            return; 
        }

        await change_ico_closing_date(parseInt(icoClosingDate));

    }

    // function to change ico expected amount
    let icoExpectedAmount = async () => {
        if (expectedAmount == ''  ) {
            alert('fill all the inputs please');

            return; 
        }

        await add_expected_from_all_investor(parseInt(expectedAmount));
  
    }


    let ico_closing_date = async () => {

        let icoClosingDateRes = await query_ico_closing_date();
        let closing_date = icoClosingDateRes /1000000;

        let current_time = new Date().getTime();

        if (current_time > closing_date) {
            let closeRes = 0;
            setIcoDayRemianing(closeRes);
        } else {
            
            let current_day = current_time /86400000;
            let closing_day = closing_date /86400000;

            let remainingclosingDay = Math.round(closing_day - current_day);
            setIcoDayRemianing(remainingclosingDay);
        }

        
    }

    useEffect(() => {
        ico_closing_date();
        
    }, [])


   


    return (
        <>
       
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
                <div className="container-fluid">
                <a className="navbar-brand" href="{{route('collector.home')}}">Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Administrative</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#addMember">add member</a></li>
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#mint">mint</a></li>
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#mintOther">mint for members</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Changes</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#tokenReward">token reward</a></li>
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#minimunAmount">minimun amout to invest</a></li>
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#maximunToken">maximum token</a></li>
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#icoDate">ico date</a></li>
                                <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#expectedAmount">expected amount</a></li>
                            </ul>
                        </li>

                    </ul>
                    
                    <ul className="navbar-nav  navbar-right">
                    <li className="nav-item">
                    <p className="text-danger">{icoDayRemianing} days remaining</p>
                    </li>
                    <li className="nav-item">
                        {isLogging() ?
                         <a className="nav-link" href="#" onClick={() => userlogout()}>Disconnect Wallet</a> :
                         <a className="nav-link" href="#" onClick={() => userlogin()}>Connect Wallet</a>}
                       
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

            {/*!-- add member model -->*/}
            <div className="modal fade" id="addMember">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Add menber</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">
                    <input type="text" className="form-control mb-2" id="name" placeholder="account" name="name" required value={memberAccount} onChange={(e) => setMemberAccount(e.target.value)}/>

                    <input type="text" className="form-control mb-2" id="description" placeholder="role" name="description" 
                    required value={memberRole} onChange={(e) => setMemberRole(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => addMember()}>Add</button>
                </div>

                </div>
            </div>
            </div>


            {/*!-- mint token by self -->*/}
            <div className="modal fade" id="mint">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Mint Token </h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">
                    <input type="number" className="form-control mb-2" id="description" placeholder="amount" name="description" 
                    required value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => mintToken()}>mint</button>
                </div>

                </div>
            </div>
            </div>



            {/*!-- mint token for member -->*/}
            <div className="modal fade" id="mintOther">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Mint token for menber</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">
                    <input type="text" className="form-control mb-2" id="name" placeholder="account" name="name" required value={mintAccount} onChange={(e) => setMintAccount(e.target.value)}/>

                    <input type="number" className="form-control mb-2" id="description" placeholder="amount" name="description" 
                    required value={mintAmount} onChange={(e) => setMintAmount(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => mintForOther()}>mint</button>
                </div>

                </div>
            </div>
            </div>



             {/*!-- token reward calculation -->*/}
             <div className="modal fade" id="tokenReward">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Equivalent Token Reward</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">

                    <input type="number" className="form-control mb-2" id="description" placeholder="amount" name="description" 
                    required value={tokenRewardAmount} onChange={(e) => setTokenRewardAmount(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => tokenReward()}>change</button>
                </div>

                </div>
            </div>
            </div>


            {/*!-- minimun amount of token to invest -->*/}
            <div className="modal fade" id="minimunAmount">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Minimun amount to invest at particular time</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">

                    <input type="number" className="form-control mb-2" id="description" placeholder="amount" name="description" 
                    required value={minimunAmount} onChange={(e) => setMinimunAmount(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => minimumAmountToInvet()}>change</button>
                </div>

                </div>
            </div>
            </div>


            {/*!-- maximun token  -->*/}
            <div className="modal fade" id="maximunToken">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Minimun amount to invest at particular time</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">

                    <input type="number" className="form-control mb-2" id="description" placeholder="amount" name="description" 
                    required value={maximunToken} onChange={(e) => setMaximunToken(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => maximunTokenToBuy()}>change</button>
                </div>

                </div>
            </div>
            </div>


            {/*!-- ico date  -->*/}
            <div className="modal fade" id="icoDate">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">Change ICO closing date</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">

                    <input type="number" className="form-control mb-2" id="description" placeholder="day from now" name="description" 
                    required value={icoClosingDate} onChange={(e) => setIcoClosingDate(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => icocloseDate()}>change</button>
                </div>

                </div>
            </div>
            </div>



            {/*!-- expected amount -->*/}
            <div className="modal fade" id="expectedAmount">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">ICO expecting Amount</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">

                    <input type="number" className="form-control mb-2" id="description" placeholder="amount" name="description" 
                    required value={expectedAmount} onChange={(e) => setExpectedAmount(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => icoExpectedAmount()}>change</button>
                </div>

                </div>
            </div>
            </div>


    </>
     
    )
}