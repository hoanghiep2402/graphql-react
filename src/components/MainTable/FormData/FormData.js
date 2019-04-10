import React, {Component} from 'react';


class FormData extends Component {


    state={
        id:0,
        name:'',
        age:0,
        gender:"Male",
        isEditing:false
    };

    componentDidMount() {
        if(this.props.user){
            const {user}=this.props;
            this.setState({
                id: user.id,
                name: user.name,
                age: user.age,
                gender: user.gender,
                isEditing:true
            })
        }
    }

    handleChange=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
      this.setState({
            [name]:value
      })
    };

    onSubmit=(event)=>{
        const {id,name,age,gender}=this.state;

        event.preventDefault();
        this.props.onSubmitForm({ name, gender, age:parseInt(age)});
    };

    onUpdateUser=(event)=>{
        event.preventDefault();

        const {id,name,age,gender}=this.state;

        this.props.updateUser({id,name,age,gender})
    };

    render() {
        const {isEditing,name,age,gender}=this.state;

        return (

            <div className="card col-3 ml-4  ">
                <div className="card-header text-center">
                    Form
                </div>
                <form>
                <div className="card-body">

                        <div className="form-group">
                            <label>Name</label>
                            <input onChange={this.handleChange} value={name} type="text" className="form-control" name="name"
                                   placeholder="Your Name..."/>

                        </div>


                        <div className="form-group">

                            <label>Age</label>
                            <input min={0} max={150} value={age} type="number" onChange={this.handleChange} className="form-control" name="age"
                                   placeholder="Your Age"/> <label>Name</label>
                        </div>
                        <div className="form-group">
                            <select name="gender" onChange={this.handleChange} value={gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>


                    </div>
                    <div className="card-footer d-flex justify-content-around">
                        <button type="button" className="btn btn-alert  ">Cancel</button>

                        {!isEditing? <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Create</button>:<button type="submit" className="btn btn-primary" onClick={this.onUpdateUser}>Update</button>}
                    </div>
                </form>
            </div>
        );
    }
}

export default FormData;
