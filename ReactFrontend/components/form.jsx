import React from 'react'

class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            fdata:{},
            edit:{},
            s:[],
            city:[],
            fnm:'',
            lnm:'',
            mail:'',
            state:'',
            c:'',
            btn:'Add Record',
            error:''
        }
    }

    addData=(e)=>{
         e.preventDefault();
         if(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.mail)) {
             var obj = {
                 "firstName": this.state.fnm,
                 "lastName": this.state.lnm,
                 "email": this.state.mail,
                 "state": this.state.state,
                 "city": this.state.c
             }
             this.setState({
                 fdata: obj,
                 fnm: '',
                 lnm: '',
                 mail: '',
                 state: '',
                 c: '',
                 city: [],
                 error:''
             }, () => {
                 if (this.state.btn === "Add Record") {
                     this.props.add(this.state.fdata);
                 }
                 else {
                     this.setState({
                         btn: 'Add Record'
                     })
                     this.props.editMethod(this.state.fdata);

                 }
             })
         }
         else {
             window.alert('you are not allowed to do this because of invalid email format.');
             this.setState({
                 error:''
             })
         }
        console.log(obj);
    }

    fetchState=()=>{
        var url='http://localhost:3000/state';
        fetch(url).then((response)=>{
            return response.json()
        }).then((s)=>{
            this.setState({
                s
            })
        }).catch(()=>{
            console.log('Error in fetch.');
        })
    }

    loadHandler=()=>{
        this.setState({
            fnm:'',
            lnm:'',
            mail:'',
            state:'',
            c:'',
            btn:"Add Record",
            city:[],
            error:''
        })
    }

    fetchCity=(e)=>{
        this.setState({
            state:e.target.selectedOptions[0].value
        })
        var url=`http://localhost:3000/city/${e.target.selectedOptions[0].id}`;
        fetch(url).then((response)=>{
            return response.json()
        }).then((city)=>{
            this.setState({
                city,
                c:''
            })
        }).catch(()=>{
            console.log('Error in fetch.');
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.edit.firstName !== undefined) {
            this.setState({
                edit: nextProps.edit,
                fnm:nextProps.edit.firstName,
                lnm:nextProps.edit.lastName,
                mail:nextProps.edit.email,
                state:nextProps.edit.state,
                c:nextProps.edit.city,
                btn:nextProps.edit.btn,
                city:[]
            })
        }

    }

    handlefnmChange=(e)=>{
        this.setState({
            fnm:e.target.value
        })
    }

    handlelnmChange=(e)=>{
        this.setState({
            lnm:e.target.value
        })
    }

    handlemailChange=(e)=>{
        this.setState({
            mail:e.target.value
        })
    }

    handlecityChange=(e)=>{
        this.setState({
            c:e.target.selectedOptions[0].value
        })
    }

    componentDidMount(){
        this.fetchState();
    }

    checkMail=()=>{
        if(!(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.mail))) {
            this.setState({
                error:'Enter a valid email address.',
                mail:''
            })
        }
        else{
            this.setState({
                error:''
            })
        }
    }

    checkName=()=>{
        if(!(/^[A-Za-z]\w+$/.test(this.state.fnm)) || !(/^[A-Za-z]\w+$/.test(this.state.lnm))){
            this.setState({
                error:(!(/^[A-Za-z]\w+$/.test(this.state.fnm)))?'Enter Valid First Name.':'Enter Valid Last Name.',
                fnm:(!(/^[A-Za-z]\w+$/.test(this.state.fnm)))?'':this.state.fnm,
                lnm:(!(/^[A-Za-z]\w+$/.test(this.state.lnm)))?'':this.state.lnm
            })
        }
        else{
            this.setState({
                error:''
            })

        }
    }


    render(){
        return(
            <div>
                <div className={'modal-header'}>
                    <h3>{(!this.state.edit.btn)?'Add Employee Details':'Edit Employee Details'}</h3>
                    <button className={'close'} data-dismiss={'modal'} onClick={this.loadHandler}>&times;</button>
                </div>
            <div className="container modal-body">
                <label className={'text-danger'}>{this.state.error}</label>
                <form onLoad={this.loadHandler}>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="First Name" value={this.state.fnm} onChange={this.handlefnmChange} onBlur={this.checkName} autoFocus={true}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Last Name" value={this.state.lnm} onChange={this.handlelnmChange} onBlur={this.checkName}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Email" value={this.state.mail} onChange={this.handlemailChange} onBlur={this.checkMail}/>
                    </div>
                    <div className="form-group">
                        <select className="form-control" onChange={this.fetchCity} value={this.state.state}>
                            <option id={0}>--Select State--</option>
                            {
                                this.state.s.map((state)=>{
                                    return(
                                        <option id={state._id} key={state._id} value={state.stateName}>{state.stateName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="form-control" value={this.state.c} onChange={this.handlecityChange}>
                            <option id={0} key={0}>{(!this.state.c)?'--Select City--':this.state.c}</option>
                            {
                                this.state.city.map((city)=>{
                                    if(city.cityName!==this.state.c) {
                                        return (
                                            <option id={city._id} key={city._id}
                                                    value={city.cityName}>{city.cityName}</option>
                                        )
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className={'modal-footer'}>
                    <button data-dismiss="modal" onClick={this.addData} className="btn btn-info">{this.state.btn}</button>
                    <button className="btn btn-info" data-dismiss="modal" onClick={this.loadHandler}>Close</button>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}
export default Form;