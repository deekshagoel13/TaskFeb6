import React from 'react';
import Form from './form'
class Modal extends React.Component{
    render(){
    return(
            <div className={'modal fade'} id={'myModal'}>
                <div className={'modal-dialog'}>
                    <div className={'modal-content'}>
                        <div className={'modal-body'}>
                            <Form add={this.props.add} edit={this.props.edit} editMethod={this.props.editMethod}/>
                        </div>
                    </div>
                </div>
            </div>
    )}
}
export default Modal;