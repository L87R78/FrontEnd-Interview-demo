import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionDrink: false,
            showBtnStartExam: false
        }
    }
    question = () => {
        setTimeout(
            function () {
                this.setState({
                    questionDrink: false,

                });
            }
                .bind(this),
            3000
        );

    }

    logOut = () => {
        localStorage.clear();
    }
    componentDidMount() {
        setTimeout(
            function () {
                this.setState({ questionDrink: true });
            }
                .bind(this),
            2000
        );
        setTimeout(
            function () {
                this.setState({ showBtnStartExam: true });
            }
                .bind(this),
            5000
        );
    }

    render() {
        let getCurrentUser = localStorage.getItem('currentUser');
        return (
            <div className="home">
                {
                    this.state.showBtnStartExam
                        ? <div className="btn_start_exam">
                            <Link to="/exam" className="start_exam_btn" >START EXAM</Link>
                        </div>
                        : null
                }

                {
                    this.state.questionDrink
                        ? <div className="question_something">
                            <h3>Do you want something to drink?</h3>
                            {
                                this.question()
                            }
                        </div>
                        : null
                }
                <div className="home_image">
                    <div className="userName_logOut">
                        <span className="company">Welcome To Our Company <span className="userName">{getCurrentUser}</span></span>
                        <Link to="/" onClick={this.logOut}>LogOut</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;
