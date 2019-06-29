import React, {Fragment} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

class App extends React.Component {
    state = {
        msg: "",
        messageList: []
    };

    componentWillMount() {
        socket.on("connect", () => {
        });

        socket.on("SEND_DATA_TO_CLIENT", (msg) => {
            this.setState(prevState => {
                let newMessageList = prevState.messageList;
                newMessageList.push(msg);
                return {
                    messageList: newMessageList
                }
            })
        })

    }

    _onHandleClick = () => {
        socket.emit("SEND_DATA_TO_SERVER", this.state.msg);
    };

    _onHandleChange = (value) => {
        this.setState(value);
    };

    render() {
        const {messageList, msg} = this.state;
        return (
            <Fragment>
                <h1>Chat Application</h1>
                <ul>
                    {messageList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <input type="text"
                       placeholder="Type message here..."
                       value={msg}
                       onChange={e => this._onHandleChange({msg: e.target.value})}/>
                <button onClick={this._onHandleClick}>Send</button>
            </Fragment>
        )
    }

}

export default App;
