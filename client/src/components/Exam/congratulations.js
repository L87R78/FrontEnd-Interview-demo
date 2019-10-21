import React, { Component } from 'react';
import axios from 'axios';

class Congratulations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sendFeedBackEmail: '',
            sendFeedBackMessage: '',
            clickedSendFeedBak: false,
            emptyFeedBack: 'hide',
        }
    }
    handleFeedBackEmail = (e) => {
        this.setState({
            sendFeedBackEmail: e.target.value,
        })
    }
    handleFeedBackMessage = (e) => {
        this.setState({
            sendFeedBackMessage: e.target.value,
        })
    }
    sendFeedBack = () => {
        if (this.state.sendFeedBackEmail !== '' || this.state.sendFeedBackMessage !== '') {
            let feedback = {
                email: this.state.sendFeedBackEmail,
                feedback: this.state.sendFeedBackMessage,
            }
            this.setState({
                clickedSendFeedBak: true
            })

            axios.post('https://frontend-intervieww.herokuapp.com/feedback/add', feedback)
                .then(res => {
                    console.log(res.status)
                })
                .catch(err => console.log('error feedback ' + err))
            this.handleSorry();
        } else {
            this.setState({
                emptyFeedBack: 'show'
            })
        }
    }
    handleSorry = () => {
        setTimeout(
            function () {
                localStorage.clear();
                this.props.history.push("/");
            }
                .bind(this),
            3000
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.emptyFeedBack === 'show') {
            this.setState({

                emptyFeedBack: 'hide'
            })
        }
    }

    render() {
        return (
            <div className="congratulatios_page">
                <br />
                {
                    this.state.emptyFeedBack === 'show'
                        ? <div className="clicked_feedback_empty">
                            <span>You must fill in all of the fields!</span>
                        </div>
                        : null
                }
                {
                    this.state.clickedSendFeedBak
                        ? <div className="clicked_feedback_message">
                            <span>Thank you for your feedback :)</span>
                        </div>
                        : null
                }
                <div className="congratulations">
                    <div className="img_box">
                        <img src={require('../../Images/congratulations_02.jpg')} alt="" />
                    </div>

                    <div className="form_box">
                        <div className="name_input">
                            <i className="fas fa-envelope"></i>
                            <textarea
                                className="first_input"
                                onChange={this.handleFeedBackEmail}
                                type="text"
                                name="comment[body]"
                                rows="1"
                                cols="50"
                                wrap="physical"
                                placeholder='Your e-mail'
                            />
                        </div>
                        <div className="write_text">
                            <i className="fas fa-pen"></i>
                            <textarea
                                className="second_input"
                                onChange={this.handleFeedBackMessage}
                                type="text"
                                placeholder="Please write your feedback here"
                            />
                        </div>
                        <div className="btn_box">
                            <button onClick={this.sendFeedBack}><span>Send<i className="fas fa-chevron-right"></i></span></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Congratulations;
