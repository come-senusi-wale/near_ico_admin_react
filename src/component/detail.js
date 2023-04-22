import React, { useState, useEffect } from "react";

import {query_mininum_amount_to_invest, query_equivalent_token_reward, query_maximum_token_ivestor_can_buy, query_expected_money, query_amoun_invested_so_far, member_details} from "./../near/utils";


export let Detail = () => {


    let [minimunAmount, setMinimunAmount] = useState([]);
    let [tokenReward, setTokenReward] = useState('')
    let [maximunToken, setMaximunToken] = useState('');
    let [expectedMoney, setExpectedMoney] = useState('');
    let [amountInvested, setAmountInvested] = useState('');

    let [memberRole, setMmberRole] = useState('');
    let [memberAccount, setMemberAccount] = useState('');
    let [memberTokenReward, setMemberTokenReward] = useState('');
    let [loadMember, setLoadMember] = useState(false);

    let loacQuery = async () => {
        let miniRes = await query_mininum_amount_to_invest();
        setMinimunAmount(miniRes);

        let tokenRewardRes = await query_equivalent_token_reward();
        setTokenReward(tokenRewardRes);

        let maxRes = await query_maximum_token_ivestor_can_buy();
        setMaximunToken(maxRes);

        let expecRes = await query_expected_money();
        setExpectedMoney(expecRes);

        let investedRes = await query_amoun_invested_so_far();
        setAmountInvested(investedRes);


    }

    let load_member = async () => {
        if (memberAccount == ''  ) {
            alert('fill all the inputs please');

            return; 
        }

        let res = await member_details(memberAccount)

        setMmberRole(res.role);
        setMemberTokenReward(res.amount_of_token_rewarded);
        setLoadMember(true);
    }
    
    useEffect(() => {
        loacQuery();
        
    }, [])

    return(
        <>

        <div className="container mt-3">
        
        <div className="card border-primary">
            <div className="card-header bg-primary">
                <h6 className="text-white">ICO Details</h6>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                   
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Min amount inveted at particular time</th>
                            <th>Max token investor can buy</th>
                            <th>RewardEq</th>
                            <th>ICO taget</th>
                            <th>Money Generated</th>
                           
                        </tr>
                        </thead>
                        <tbody>

                            <tr >
                                <td>{minimunAmount}</td>
                                <td>{maximunToken}</td>
                                <td>{tokenReward}</td>
                                <td>{expectedMoney}</td>
                                <td>{amountInvested}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    
            </div> 

            
        </div>
        </div>

        <div className="container mt-3">
        
        <div className="card border-primary">
            <div className="card-header bg-primary d-flex justify-content-between">
                <h6 className="text-white">Member Details</h6>
                <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#memberDetail">view member detail</button>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                   
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Account</th>
                            <th>Role</th>
                            <th>Token Reward</th>
                            
                           
                        </tr>
                        </thead>
                        <tbody>
                        {loadMember ?
                            <tr >
                            <td>{memberAccount}</td>
                            <td>{memberRole}</td>
                            <td>{memberTokenReward}</td>
                            
                        </tr>
                          :
                         ''}

                            
                        </tbody>
                    </table>
                </div>
    
            </div> 

            
        </div>
        </div>


        {/*!-- member detail  -->*/}
        <div className="modal fade" id="memberDetail">
            <div className="modal-dialog">
                <div className="modal-content">

                {/*<!-- Modal Header -->*/}
                <div className="modal-header">
                    <h4 className="modal-title">view member detail</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                {/*<!-- Modal body -->*/}
                <div className="modal-body">

                    <input type="test" className="form-control mb-2" id="description" placeholder="account" name="description" 
                    required value={memberAccount} onChange={(e) => setMemberAccount(e.target.value)}/>
                </div>

                {/*<!-- Modal footer -->*/}
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => load_member()} data-bs-dismiss="modal">view</button>
                </div>

                </div>
            </div>
            </div>
        </>
    )
}