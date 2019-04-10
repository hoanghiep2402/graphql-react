import React from 'react';





class UserListItem extends React.Component{


    onUpdateUser=(user)=>{
       this.props.onUpdateUser(user)
    };

    onDeleteUser=(user)=>{
      this.props.onDeleteUser(user)
    };

    render() {
        const {id,name,age,gender}=this.props.user;
        return(
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{gender}</td>
                <td className="d-flex justify-content-around">
                    <button type="button" onClick={()=>this.onDeleteUser({id,name,age,gender})}  className="btn btn-danger"> Xóa</button>
                    <button type="button" onClick={()=>this.onUpdateUser({id,name,age,gender})}  className="btn btn-primary"> Sửa</button>
                </td>
            </tr>
        )
    }
}




export default UserListItem;
