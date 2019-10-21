import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Exam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            stepQuastion: 1,
            currentChoise: 0,
            correctAnswers: 0,
            incorrentAnswers: 2,
            showCorrectNotifications: 'hide',
            showNoCorrectNotifications: 'hide',
            showSelectOneNotifications: 'hide',
        }
    }

    handleSorry = () => {
        setTimeout(
            function () {
                localStorage.clear();
                this.props.history.push("/");
            }
                .bind(this),
            2000
        );
    }
    onCheckChange = (e) => {
        this.setState({
            currentChoise: e.target.value
        })
    }
    handleClickAnswers = () => {
        if (this.state.currentChoise > 0) {
            this.state.currentUser.exam.map(el => {
                if (el.index === this.state.stepQuastion) {
                    let tempStep = this.state.stepQuastion;
                    let tempCorrectAnswer = this.state.correctAnswers
                    if (Number(this.state.currentChoise) === Number(el.answer)) {
                        tempStep++;
                        tempCorrectAnswer++;
                        this.setState({
                            stepQuastion: tempStep,
                            correctAnswers: tempCorrectAnswer,
                            showCorrectNotifications: 'show',
                            showSelectOneNotifications: 'hide',
                            currentChoise: 0
                        })
                    } else {
                        tempStep++;
                        if (this.state.correctAnswers === 0) {
                            tempCorrectAnswer = 0
                        }
                        this.setState({
                            stepQuastion: tempStep,
                            correctAnswers: tempCorrectAnswer,
                            showNoCorrectNotifications: 'show',
                            showSelectOneNotifications: 'hide',
                            incorrentAnswers: this.state.incorrentAnswers - 1,
                            currentChoise: 0
                        })
                        if (this.state.correctAnswers === 5 || this.state.stepQuastion === 6) {
                            this.setState({
                                showNoCorrectNotifications: 'hide',
                            })
                        }
                    }
                }
            })
        } else {
            this.setState({
                showSelectOneNotifications: 'show',
            })
        }
    }
    logOut = () => {
        localStorage.clear();
    }
    componentDidMount() {
        axios.get('https://frontend-intervieww.herokuapp.com/users')
            .then(res => {
                res.data.map(el => {
                    if (el.username === window.localStorage.currentUser) {
                        this.setState({
                            currentUser: el,
                            correctAnswers: el.countCorrectAnswers,
                            stepQuastion: el.stepQuastion
                        })
                    }
                })
            })
            .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.showCorrectNotifications === 'show' || prevState.showNoCorrectNotifications === 'show' || prevState.showSelectOneNotifications === 'show') {
            this.setState({
                showCorrectNotifications: 'hide',
                showNoCorrectNotifications: 'hide',
                showSelectOneNotifications: 'hide'
            })
        }
        let curUser = this.state.currentUser;
        curUser.countCorrectAnswers = this.state.correctAnswers
        curUser.stepQuastion = this.state.stepQuastion

        axios.post('https://frontend-intervieww.herokuapp.com/users/update/' + curUser._id, curUser)
            .then(res => {
                // console.log(res.status)
            })
            .catch(err => console.log('Error on Update User ' + err))
    }
    handleCongratulations = () => {
        setTimeout(() => {
            this.props.history.push("/congratulations");
        }, 2000)
    }

    render() {
        let listQuastionsExam = this.state.currentUser.exam;
        return (
            <div className="exam_page">
                <br />
                {
                    this.state.correctAnswers === 5 || this.state.stepQuastion === 6 && this.state.incorrentAnswers > 0
                        ? <div className="correct_answer">
                            {
                                this.handleCongratulations()
                            }
                        </div>
                        : null
                }

                <div className="exam_box">
                    <div className="senior_img">
                        <div className="image"></div>
                        {
                            this.state.showCorrectNotifications === 'show' || this.state.showNoCorrectNotifications === 'show'
                                ? <div className="correct_answer">
                                    {
                                        this.state.correctAnswers === 5 || this.state.stepQuastion === 6
                                            ? <h4>Congratulations</h4>
                                            : <h4>Correct :)</h4>
                                    }
                                </div>
                                : null
                        }
                        {
                            this.state.showNoCorrectNotifications === 'show'
                                ? <div className="NoCorrect_answer">
                                    {
                                        this.state.incorrentAnswers === 0
                                            ? <div>
                                                <h4>Sorry :(</h4>
                                                {
                                                    this.handleSorry()
                                                }
                                            </div>
                                            : <div>
                                                {
                                                    this.state.correctAnswers === 5 || this.state.stepQuastion === 6
                                                        ? null
                                                        : <h4>BE CAREFUL!</h4>
                                                }
                                            </div>
                                    }
                                </div>
                                : null
                        }
                        {
                            this.state.showSelectOneNotifications === 'show'
                                ? <div className="select_one">
                                    <h4>Are you serious? Please select one!</h4>
                                </div>
                                : null
                        }
                        <span>Senior</span>
                    </div>

                    <div className="questions_box">
                        <Link to="/home">Back to Home</Link>
                        <div className="countCorrentAnswers">
                            <span>Correct Answers - {this.state.correctAnswers}</span>
                        </div>
                        {
                            listQuastionsExam !== undefined
                                ? listQuastionsExam.map((el, key) => {
                                    if (this.state.stepQuastion === el.index) {
                                        let arr = el.answers;
                                        return (
                                            <div key={key}>
                                                <span className="questions_text">{el.question}</span>
                                                <span>Select one:</span>
                                                <div>
                                                    {
                                                        arr.map((e, index) => {
                                                            return (
                                                                <div key={index} className="questions" >
                                                                    <div className="radio_type">
                                                                        <input type="radio" onChange={this.onCheckChange} name="gender" value={index + 1} />
                                                                    </div>
                                                                    <h4>{e}</h4>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                                : null
                        }
                        <button className="pulse" onClick={this.handleClickAnswers}>Answer</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Exam;


















