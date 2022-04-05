import logo from './logo.svg';
import './App.css';
import web3 from "./web3";
import lottery from './lottery';
import {useEffect, useState} from "react";

const initialState = {
    manager:'',
    players:[],
    balance:'',
    value: 0,
    message:''
}

function App() {
  const [state, setState] = useState(initialState);

  async function _handleEnter  (e) {
      e.preventDefault();
      const value = state.value;
      if(value > 0.001) {
          try{
              setState({...state, message: 'Waiting on transaction success...'});
              // get user account
              const accounts = await web3.eth.getAccounts();
              console.log(accounts);

              const res = await lottery.methods.enter().send({
                  from: accounts[0],
                  value: web3.utils.toWei(value.toString(), 'ether')
              });
              console.log(res);
              setState({...state, message: 'You have been entered!'});
              callMethods()
          }catch (e) {
              setState({...state, message: e.message});
              console.log(e.message);
          }
      }else{
          setState({...state, message: 'Please enter an amount greater than 0.001 eth'});
      }
  }

  async function _pickWinner(){
      try {
          const isSure = window.confirm('Are you sure you want to pick a winner?');
          const accounts = await web3.eth.getAccounts();
          if (!isSure){
              return;
          }
          if (accounts[0] !== state.manager) {
              setState({...state, message: 'Only manager can pick a winner!'});
              return;
          }

          setState({...state, message: 'Waiting on transaction success...'});
          const res = await lottery.methods.pickWinner().send({
              from: accounts[0]
          });
          console.log(res);
          setState({...state, message: 'A winner has been picked!'});
          callMethods()
      }catch (e) {
          setState({...state, message: e.message});
          console.log(e.message);
      }
  }

    async function callMethods(){
        try{
            const manager = await lottery.methods.manager().call()
            const players = await lottery.methods.getPlayers().call()
            const balance = await web3.eth.getBalance(lottery.options.address)

            setState({...state, manager, players, balance})
        }catch (e) {
            console.log(e.message)
        }
    }

  useEffect(()=>{
      callMethods()
  },[])

  return (
    <div style={{margin:"5px 10px"}}>
        <h2>Lottery Contact</h2>
        <p>Before clicking enter, make sure you are got Metamask extention installed in your PC & it is connected to this site</p>
        <p>This contact is managed by {state.manager}</p>
        <p>There are currently {state.players.length} people entered & completing to win {web3.utils.fromWei(state.balance,"ether")} ether</p>

        <hr/>

        <form>
            <h4>Want to try your luck?</h4>
            <div>
                <label style={{marginRight:"5px"}}>Amount of ether to enter</label><br/>
                <input type="number"
                       placeholder="0.011"
                       style={{margin:'7px 0'}}
                       value={state.value}
                       onChange={(e)=> setState({...state, value:e.target.value})}
                />
            </div>
            <button onClick={_handleEnter}>Enter</button>
        </form>

        <hr/>

        <div>
            <h4>Time to pick a winner?</h4>
            <button onClick={_pickWinner}>Enter</button>
        </div>

        <hr/>

        <h4>{state.message}</h4>
    </div>
  );
}

export default App;
