import React from 'react';

class CheckBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isChecked:false
        }
    }

    toggle=()=>{
        const {handleCheckChange,val}=this.props;
        this.setState({
            isChecked:!this.state.isChecked
        })
        handleCheckChange(val);
    }

    render(){
        const {isChecked}=this.state;
        const {val}=this.props;
        return(
            <div>
                <input type={'checkbox'} checked={isChecked} value={val} onChange={this.toggle}/>
            </div>
        )
    }
}
export default CheckBox;