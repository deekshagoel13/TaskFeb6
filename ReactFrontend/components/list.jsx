import React from 'react';
import Modal from './modal';
import Checkbox from './checkbox';

class List extends React.Component {

    //---CONSTRUCTOR
    constructor() {
        super();
        this.state = {
            data: [],
            edit:{},
            currentpage:1,
            limit:2,
            searchArray:[],
            searchtext:'',
            found:false,
            check:false
        }
    }

    componentWillMount(){
        this.selectedCheckboxes=new Set();
    }

    toggleCheckbox=(val)=>{
        if(this.selectedCheckboxes.has(val)){
            this.selectedCheckboxes.delete(val)
        }
        else{
            this.selectedCheckboxes.add(val);
        }
        //console.log(this.selectedCheckboxes);
    }

    //---ADD RECORD
    addData=(obj)=>{
        var url='http://localhost:3000/p';
        console.log(url);
        var data={
            method:'post',
            mode:'cors',
            body:JSON.stringify(obj),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data).then((response)=>{
            console.log(obj);
            return response.json();
        }).then((res)=>{
            console.log(res);
            if(!res.error){
                var d=this.state.data;
                d.splice(0,0,res.record);
                this.setState({
                    data:d
                },()=>{
                    console.log(this.state.data);
                })
            }
            else{
                alert('Error in Your record.');
            }

        }).catch((err)=>{
            console.log('error',err);
        })
    }

    //---FETCH ALL RECORDS
    fetchData=()=>{
        var url='http://localhost:3000/person';
        fetch(url).then((response)=>{
            return response.json()
        }).then((data)=>{
            this.setState({
                data
            })
        }).catch(()=>{
            console.log('Error in fetch.');
        })
    }

    //---FETCH THE RECORD FOR EDIT
    editData=(e)=>{
        e.preventDefault();
        var url=`http://localhost:3000/person/${e.target.id}`;
        fetch(url).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log("editData : ",data);
            var obj={
                "id":data._id,
                "firstName":data.firstName,
                "lastName":data.lastName,
                "email":data.email,
                "state":data.state,
                "city":data.city,
                "btn":'Edit record'
            }
            this.setState({
                edit:obj
            });
        })


    }

    //---UPDATE RECORD
    updatedata=(obj)=>{
        var url=`http://localhost:3000/person/${this.state.edit.id}`;

        var data={
            method:'put',
            mode:'cors',
            body:JSON.stringify(obj),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data).then((response)=>{
            return response.json();
        }).then((res)=>{
            var ind=this.state.data.findIndex(x=>x._id===this.state.edit.id);
            var dt=this.state.data.filter((d)=>this.state.edit.id!==d._id);
            dt.splice(ind,0,res.record);
            this.setState({
                data:dt
            },()=>{
                console.log(this.state.data);
            })
        }).catch((err)=>{
            console.log('error',err);
        })

    }

    //---DELETE RECORD
    deleteData=(e)=>{
        if(window.confirm('Are you sure you want to delete this record?')) {
            var url = `http://localhost:3000/person/${e.target.id}`;
            var data = {
                method: 'delete',
                mode: 'cors',
            }
            fetch(url, data).then((response) => {
                return response.json();
            }).then((res) => {
                console.log(res);
                var dt = this.state.data.filter((d) => res._id !== d._id);
                console.log(dt);
                this.setState({
                    data: dt
                })
            }).catch((err) => {
                console.log('Error in deletion', err);
            })
        }
}

    //---DELETE MULTIPLE SELECTED RECORDS
    deleteAll=()=>{
        let arr=[...this.selectedCheckboxes];
        var obj={
            "arr":arr
        }
        var url='http://localhost:3000/deleteall';
        var data={
            method:'post',
            mode:'cors',
            body:JSON.stringify(obj),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data).then((response)=>{
            return response.json();
        }).then((res)=>{
            console.log(res);
            if(!res.error) {
                var dt = this.state.data;
                this.selectedCheckboxes.forEach((val) => {
                    var ind = dt.findIndex(x => x._id === val);
                    dt.splice(ind, 1);
                })
                this.setState({
                    data: dt
                })
            }
            else{
                alert('Error in Your record.');
            }

        }).catch((err)=>{
            console.log('error',err);
        })
    }

    //---SORT DATA
    sortData=(e)=>{
        e.preventDefault();
        console.log(e.target.innerHTML);
        var url='http://localhost:3000/sort';
        var obj={
            "attr":e.target.innerHTML
        }
        var data={
            method:'post',
            body:JSON.stringify(obj),
            mode:'cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,data).then((response)=>{
            return response.json()
        }).then((data)=>{
            this.setState({
                data
            })
        }).catch(()=>{
            console.log('Error in sort.');
        })
    }

    //---SEARCH
    searchData=(key,arr)=>()=>{
        //---SEARCH FROM API----
        // var url='http://localhost:3000/search';
        // var obj={
        //     "txt":this.state.searchtext
        // }
        // var data={
        //     method:'post',
        //     body:JSON.stringify(obj),
        //     mode:'cors',
        //     headers:{
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // }
        // fetch(url,data).then((response)=>{
        //     return response.json()
        // }).then((data)=>{
        //     this.setState({
        //         data
        //     })
        // }).catch(()=>{
        //     console.log('Error in search.');
        // })

        //---SEARCH FROM LOCAL ARRAY----
        var isFiltered=false;
        if (key !== '') {
            isFiltered = true;
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {

                if (arr[i].firstName.indexOf(key) >= 0 || arr[i].lastName.indexOf(key) >= 0 || arr[i].state.indexOf(key) >= 0 || arr[i].city.indexOf(key) >= 0) {
                    newArr.push(arr[i]);
                }
            }
        }
        this.setState({
            searchArray:newArr,
            found:isFiltered
        })
    }

    //---CHANGE THE VALUE OF SEARCH TEXT BOX
    handleSearchText=(arr)=>(e)=>{
        this.setState({
            searchtext:e.target.value
        },()=>{
            this.searchData(this.state.searchtext,arr)(e);
        })

    }

    //---CALL THE FETCH API
    componentDidMount(){
        this.fetchData();

    }

    //---CHANGE THE CURRENT PAGE NUMBER
    handleClick=(e)=>{
        console.log(e.target.id);
        this.setState({
            currentpage:Number(e.target.id)
        })
    }

    //---CHANGE NO. OF RECORDS DISPLAYED PER PAGE
    changelimit=(e)=>{
        this.setState({
            limit:Number(e.target.selectedOptions[0].value),
            currentpage:1
        })
    }

    render(){
        var arr=(this.state.found)?this.state.searchArray:this.state.data;
        var end=this.state.currentpage*this.state.limit;
        var start=end-this.state.limit;
        var currentRec=(this.state.found)?arr.slice(0,this.state.limit):arr.slice(start,end);
        var pages=[];
        //debugger;
        for(var i=1;i<=Math.ceil(this.state.data.length/this.state.limit);i++){
            pages.push(i);
        }
        {/*MAP FUNCTION TO PUSH PAGE NUMBERS IN AN ARRAY*/}
        var pagesList=pages.map((p,index)=>{
            return(
                <a href={'#'} className="list" key={index} id={index+1} onClick={this.handleClick}>{p}</a>
            )
        })

        return(
            <div>
                {/*SEARCH CONTROLS*/}
                <div className="form-inline navbar navbar-expand-sm bg-dark navbar-dark float-right">
                        <input className="form-control" type="text" placeholder="Search" value={this.state.searchtext} onChange={this.handleSearchText(this.state.data)}/>
                        <button className="btn btn-info" type="submit" onClick={this.searchData(this.state.searchtext,currentRec)}>Search</button>
                </div>
                {/*DROPDOWN ASKING RECORDS PER PAGE LIMIT*/}
                <div className={'form-group col-md-2 offset-5'}>
                <label>Records Per Page :</label>
                <select onChange={this.changelimit} className={'form-control'}>
                    <option value={1}>{1}</option>
                    <option value={2}>{2}</option>
                    <option value={3}>{3}</option>
                    <option value={4}>{4}</option>
                    <option value={5}>{5}</option>
                </select>
                </div>
                <table className="table table-bordered table-hover">

                    {/*TABLE HEADER INCLUDING ADD BUTTON*/}
                    <thead>
                    <tr >
                        <td colSpan={8} >
                            <button className="btn btn-info" data-toggle='modal' data-target='#myModal'>Add New</button>
                            <div>
                                <Modal add={this.addData} edit={this.state.edit} editMethod={this.updatedata}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th onClick={this.sortData}>firstName</th>
                        <th onClick={this.sortData}>lastName</th>
                        <th onClick={this.sortData}>email</th>
                        <th onClick={this.sortData}>state</th>
                        <th onClick={this.sortData}>city</th>
                        <th colSpan={3}>Action</th>
                    </tr>
                    </thead>
                    {/*RENDER TABLE BODY*/}
                    <tbody>
                    {
                        currentRec.map((person)=>{
                            return (<tr key={person._id}>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.email}</td>
                                <td>{person.state}</td>
                                <td>{person.city}</td>
                                <td><button data-toggle='modal' data-target='#myModal' id={person._id} onClick={this.editData} className="btn btn-info">Edit</button></td>
                                <td><button id={person._id} onClick={this.deleteData} className="btn btn-info">Delete</button></td>
                                <td><Checkbox val={person._id} handleCheckChange={this.toggleCheckbox}/></td>
                                </tr>
                            )
                        })

                    }
                    <tr>
                        <td colSpan={8} >
                            <button className="btn btn-info float-right" onClick={this.deleteAll}>Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                {/*RENDER PAGE NUMBERS*/}
                <div>
                    <ul>
                        {pagesList}
                    </ul>
                </div>
            </div>
        )
    }
}
export default List