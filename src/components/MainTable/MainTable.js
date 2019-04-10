import React, {Component, Fragment} from 'react';
import UserListItem from "./UserListItem/UserListItem";
import FormData from "./FormData/FormData";
import gql from "graphql-tag";




const GET_ALL_USERS_QUERY=gql(`
    {
        getAllUsers{
            id,
            name
            age
            gender
        }
    }
`);



class MainTable extends Component {

    state={
        isShowForm:false,
        users:null,
        loading:false,
    };


    componentDidMount(prevProps,prevState) {
        this.setState({loading:true});
            this.props.client.query({query:GET_ALL_USERS_QUERY}).then((res)=>{
                this.setState({users:res.data.getAllUsers,loading:false})
            })
    }

    onToggleForm=()=>{
        this.setState({
            isShowForm:!this.state.isShowForm
        })
    };



    onUpdateUser=(user)=>{
        console.log(user);
    };


    onDeleteUser=(user)=>{
        console.log(user);
    };






    render() {
        const {users,loading}=this.state;
        return (
            <Fragment>
            <div className="d-flex justify-content-end">

                <button onClick={this.onToggleForm} type="button" className=" btn btn-primary  mb-3 mt-3 mr-3">
                    Add User
                </button>

            </div>
            <div className="row ml-3">

                    <table  className={this.state.isShowForm?"col-8 table":"col-12 table"}  >
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Tools</th>
                        </tr>

                        </thead>

                           <tbody>
                            {!loading?this.showUserList(users):<tr><td>Loading...</td></tr> }
                           </tbody>
                    </table>

                {this.state.isShowForm?<FormData user={} />:''}

            </div>

            </Fragment>

        );
    }

    showUserList=(users)=>{
        if (users != null){
          return  users.map((user)=>(
                <UserListItem onDeleteUser={this.onDeleteUser} onUpdateUser={this.onUpdateUser} user={user}/>
            ))
        }

    }

}

export default MainTable;
