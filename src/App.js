import React, {Component, Fragment} from 'react';
import './App.css';
import MainTable from "./components/MainTable/MainTable";
import {ApolloConsumer} from 'react-apollo';

class App extends Component {
    render() {
        return (

                <ApolloConsumer>
                    {client=>(
                        <Fragment>
                            <h3 className="text-center">Apollo React</h3>
                            <MainTable client={client}/>
                        </Fragment>
                    )}

                </ApolloConsumer>

        );
    }
}

export default App;
