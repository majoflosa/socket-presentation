import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { setNickname, addUser } from '../redux/reducer';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: '',
            onlineUsers: []
        };
    }

    render() {
        // console.log( this.props.nickname )
        return (
            <div className="home-wrap">
            
                <div className="main-content">
                    <h1>Enter your nickname</h1>
                    <input 
                        type="text"
                        onChange={(e) => this.props.setNickname(e.target.value)}
                        value={this.props.nickname}
                    />
                    <Link to="/mainroom">
                        <button
                            className="enter-button"
                            onClick={() => this.props.addUser( this.props.nickname )}
                        >Start Chatting
                        </button>
                    </Link>
                </div>

            </div>
        );
    }
}
 
const mapStateToProps = state => {
    return {
        nickname: state.nickname,
        onlineUsers: state.onlineUsers
    };
};

const mapDispatchToProps = {
    setNickname,
    addUser
};

export default connect( mapStateToProps, mapDispatchToProps )(Home);