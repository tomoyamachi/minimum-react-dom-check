import React from "react";
import {render} from 'react-dom';
import {whyDidYouUpdate} from "why-did-you-update/es";

whyDidYouUpdate(React);

class ButtonWithBind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: "WithBind"}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(message) {
        console.log(message, this.props.count)
        this.props.countUp();
    }

    render() {
        const {type} = this.state;
        return <Button type={type} key={type} handleClick={this.handleClick}/>;
    }
}

class ButtonWithoutBind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: "WithoutBind"}
    }

    handleClick(message) {
        console.log(message, this.props.count)
        this.props.countUp();
    }

    render() {
        const {type} = this.state;
        return <Button type={type} key={type} handleClick={this.handleClick.bind(this)}/>;
    }
}

class ButtonDirectCall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: "DirectCall"}
    }

    handleClick(message) {
        console.log(message, this.props.count)
        this.props.countUp();
    }

    render() {
        const {type} = this.state;
        return <Button type={type} key={type} handleClick={(message) => this.handleClick(message)}/>;
    }
}

class ButtonCondition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: "Condition"}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(message) {
        console.log(message, this.props.count)
        this.props.countUp();
    }

    render() {
        const {type} = this.state;
        return <Button type={type} key={type} handleClick={true && this.handleClick}/>;
    }
}

class ButtonClassState extends React.Component {
    state = {type: "ClassState"}
    handleClick = (message) => {
        console.log(message, this.props.count)
        this.props.countUp();
    }

    render() {
        const {type} = this.state;
        return <Button type={type} key={type} handleClick={this.handleClick}/>;
    }
}

class Button extends React.PureComponent {
    state = {type: this.props.type}

    render() {
        const {type, handleClick} = this.props;
        return (
            <button onClick={() => handleClick(type)}>
                {type}
            </button>)
    }
};


// This class returns simple DOM, there is no dom change if update state
class OnlyChangeState extends React.Component {
    constructor(props) {
        super(props)
        this.state = {count: 0}
        this.countUp = this.countUp.bind(this)
    }

    countUp() {
        this.setState(prev => ({count: prev.count + 1}))
    }

    render() {
        return (<div id={this.state.count}>
                <ButtonWithBind count={this.state.count} countUp={this.countUp}/>
                <ButtonWithoutBind count={this.state.count} countUp={this.countUp}/>
                <ButtonDirectCall count={this.state.count} countUp={this.countUp}/>
                <ButtonCondition count={this.state.count} countUp={this.countUp}/>
                <ButtonClassState count={this.state.count} countUp={this.countUp}/>
            </div>
        )
    }
}

render(
    <div><OnlyChangeState/></div>,
    document.getElementById('root')
);
