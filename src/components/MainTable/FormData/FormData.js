import React, {Component} from 'react';


class FormData extends Component {


    state={
        name:'',
        age:null,
        gender:1
    };


    handleChange=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
      this.setState({
            [name]:value
      })
    };

    onSubmit=(event)=>{
        event.preventDefault();

    };

    render() {
        return (

            <div className="card col-3 ml-4  ">
                <div className="card-header text-center">
                    Form
                </div>
                <form>
                <div className="card-body">

                        <div className="form-group">
                            <label>Name</label>
                            <input onChange={this.handleChange} value={this.state.name} type="text" className="form-control" name="name"
                                   placeholder="Your Name..."/>

                        </div>


                        <div className="form-group">

                            <label>Age</label>
                            <input min={0} max={150} value={this.state.age} type="number" onChange={this.handleChange} className="form-control" name="age"
                                   placeholder="Your Age"/> <label>Name</label>
                        </div>
                        <div className="form-group">
                            <select value={this.state.gender}>
                                <option value={0}>Male</option>
                                <option value={1}>Female</option>
                            </select>
                        </div>


                    </div>
                    <div className="card-footer d-flex justify-content-around">
                        <button type="button" className="btn btn-alert  ">Cancel</button>

                        <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Create</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FormData;
