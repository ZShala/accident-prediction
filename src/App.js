import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          {/* <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch> */}
        </Layout>
      </div>
    );
  }
}

export default App;
