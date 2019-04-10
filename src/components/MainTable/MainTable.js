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


const ADD_USER=gql`
    mutation addUser($input: UserInput!){
        createUser(input:$input){
            id
            name
            gender
            age
        }
    }
`;


const UPDATE_USER=gql`
    mutation UpdateUser($id: Int!,$input: UserInput!){
        updateUser(id: $id,input: $input){
            id
            name
            gender
            age
        }
    }
`;

const DELETE_USER=gql`
    mutation DeleteUser($id: Int!){
        deleteUser(id: $id){
           count
        }
    }
`;








class MainTable extends Component {

    state={
        isShowForm:false,
        users:null,
        loading:false,
        userEditing: null
    };


    componentDidMount(prevProps,prevState) {
        this.setState({loading:true});
            this.props.client.query({query:GET_ALL_USERS_QUERY}).then((res)=>{
                this.setState({users:res.data.getAllUsers,loading:false})
            })
    }

    onToggleForm=()=>{
        this.setState({
            isShowForm:!this.state.isShowForm,
            userEditing:null
        })
    };

    showForm=()=>{
      this.setState({
          isShowForm: true
      })
    };

    closeForm=()=>{
        this.setState({
            isShowForm: false,
            userEditing:null
        })
    };

    onUpdateUser=(user)=>{
       this.setState({
           userEditing:user,
           isShowForm:true
       });
    };

    updateUser=(user)=>{
        this.props.client.mutate({
            variables:{id:user.id,
                input:{
                    name:user.name,
                    age:user.age,
                    gender:user.gender
                }},
            mutation:UPDATE_USER

        }).then((res)=>{
            const {users}=this.state;
            users.map((user,i)=>{
               if(user.id===res.data.updateUser.id){
                   users[i].name=res.data.updateUser.name;
                   users[i].age=res.data.updateUser.age;
                   users[i].gender=res.data.updateUser.gender;
               }
                return user.id===res.data.updateUser.id;
            });
            this.setState({users});
            this.closeForm();
        }).catch((e)=>{
            console.log(e)
        })

    };


    onDeleteUser=(user)=>{
        if (window.confirm('Do you want to delete this user?')) {
            this.props.client.mutate({
                variables:{id:user.id},
                mutation:DELETE_USER

            }).then((res)=>{
                let {users}=this.state;
                users= users.filter((row,i)=>{
                    return row.id!==user.id;
                });
                this.setState({users});
                this.closeForm();
            }).catch((e)=>{
                console.log(e)
            })
        }

    };

    submitForm=(user)=>{
      this.props.client.mutate({
          variables:{input:{
                name:user.name,
                age:user.age,
                gender:user.gender
              }},
          mutation:ADD_USER

      }).then((res)=>{
          const {users}=this.state;
          users.push({
              id:res.data.createUser.id,
              name:res.data.createUser.name,
              age:res.data.createUser.age,
              gender:res.data.createUser.gender,
          });
          this.setState({users});
          this.closeForm();
      }).catch((e)=>{
          console.log(e)
      })
    };




    render() {
        const {users,loading,userEditing}=this.state;
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

                {this.state.isShowForm?<FormData user={userEditing} updateUser={this.updateUser} onSubmitForm={this.submitForm} />:''}

            </div>

            </Fragment>

        );
    }

    showUserList=(users)=>{
        if (users != null){
          return  users.map((user)=>(
                <UserListItem key={user.id}  onDeleteUser={this.onDeleteUser} onUpdateUser={this.onUpdateUser} user={user}/>
            ))
        }

    }

}

export default MainTable;
