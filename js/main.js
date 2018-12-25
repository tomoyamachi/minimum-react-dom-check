import React from "react";
import {render} from 'react-dom';
import {whyDidYouUpdate} from "why-did-you-update/es";
whyDidYouUpdate(React);

const initialState = {keys: [0]};
class ButtonWithBind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initialState}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(message) {
        console.log(message, this.props.count)
        this.props.countUp();
    }

    render() {
        return <div>{this.state.keys.map(key => (
            <Button type='WithBind' key={key} index={key} handleClick={this.handleClick}/>))}</div>;
    }
}

class ButtonWithoutBind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initialState}
    }

    handleClick(message) {
        console.log(message, this.props.count)
        this.props.countUp();
    }

    render() {
        return <div>{this.state.keys.map(key => (
            <Button type='WithoutBind' key={key} index={key} handleClick={this.handleClick.bind(this)}/>))}</div>;
    }
}


class ButtonClassState extends React.Component {
    state = {...initialState}

    handleClick = (message) => {
        this.callAnother(message)
    }

    handleClick = (message) => {
        console.log(message, this.props.count)
        this.props.countUp();
    }

    render() {
        return <div>{this.state.keys.map(key => (
            <Button type='ClassState' key={key} index={key} handleClick={this.handleClick}/>))}</div>;
    }
}


class Button extends React.PureComponent {
    state = {toggle: false}
    handleClick = () => {
        this.setState(prevState => {
            toggle: !prevState.toggle
        })
        this.props.handleClick(this.props.type)
    }

    render() {
        const {type, index} = this.props;
        return (
            <button key={index} onClick={() => this.handleClick(type)}>
                {`${type}-${index} is ${this.state.toggle ? 'ON' : 'OFF'}`}
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
                <ButtonClassState count={this.state.count} countUp={this.countUp}/>
            </div>
        )
    }
}

render(
    <div><OnlyChangeState/></div>,
    document.getElementById('root')
);
