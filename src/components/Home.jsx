import React, { Component } from "react";
import axios from 'axios';
import "./Home.css"
 
export default class Home extends Component{
     constructor(){
         super();
         this.state={
             //  to store or get the data we will create a empty data
             data:[],


             //post the data when we are posting data 1st we have to get data from user

             name:'',
             job:'',

             //put method which is update the data 
             put_id:'',
             new_name:'',
             new_job:''
             ,
             //for deletig data we need user id 
             delete_id:''
            


            }

     }
     //post method
     onNameHnadler=(e)=>{
         this.setState({name:e.target.value})

     }
     onJobHandler=(e)=>{
        this.setState({job:e.target.value})
     }
     onSubmithandler=(e)=>{
         let user={
             name:this.state.name,
            job:this.state.job
         }
         axios.post("https://reqres.in/api/users/",{user})
         .then(res=>{
            console.log(res)
            
        }).catch(err=>console.log(err))
        e.preventDefault();

     }
     //put method
     onidHnadler=(e)=>{
        this.setState({put_id:e.target.value})
     }
     onNewNameHnadler=(e)=>{
        this.setState({new_name:e.target.value})

    }
    onNewJobHandler=(e)=>{
       this.setState({new_job:e.target.value})
    }
    onPutSubmithandler=(e)=>{
        let user={
            
            name:this.state.new_name,
           job:this.state.new_job
        }
        axios.put("https://reqres.in/api/users/"+this.state.put_id,{user})
        .then(res=>{
           console.log(res)
           
       }).catch(err=>console.log(err))
       e.preventDefault();

    }

  //detele method
  ondeleteidHnadler=(e)=>{
      this.setState({delete_id:e.target.value})
  }
ondeletehandler=(e)=>{
    
    axios.delete("https://reqres.in/api/users/"+this.state.delete_id)
    .then(res=>{
       console.log(res)
       
   }).catch(err=>console.log(err))
   e.preventDefault();

}




     // componentdimount to load the data and access the api
     componentDidMount(){
         axios.get("https://reqres.in/api/users/").then(res=>{
             console.log(res)
             this.setState({data:res.data.data})
         }).catch(err=>console.log(err))
     }
     //display the data 
     render(){
         return(
             <React.Fragment>
             <h1>using get method</h1>

             <div className="home_container">
             {this.state.data.length>0 &&
             this.state.data.map(data=>(
                 <span key={data.id}>
                     <img src={data.avatar} alt={data.first_name} />
                     <p>Name:{data.first_name}</p>
                     <p>Email:{data.email}</p>
                 </span>
             ))}
             </div>
             <h2>Using post method</h2>
            <div>
                <form onSubmit={this.onSubmithandler}>
                    Name:<input type='text' onChange={this.onNameHnadler}/>
                    Job:<input type='text' onChange={this.onJobHandler}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>            <h1>useing put method</h1>
            <form onSubmit={this.onPutSubmithandler}>
            ID:<input type='number' onChange={this.onidHnadler}/>
                    Name:<input type='text' onChange={this.onNewNameHnadler}/>
                    Job:<input type='text' onChange={this.onNewJobHandler}/>
                    <button type="submit">Submit</button>
                </form></div>

<div>
    <h1>delete the id</h1>
    <form onSubmit={this.ondeletehandler}>
    ID:<input type='number' onChange={this.ondeleteidHnadler}/>
    <button type="submit">Submit</button>

    </form>
</div>
             </React.Fragment>
         )
     }
 }