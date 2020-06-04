import React from 'react';
import './App.css';
import Header from './components/common/header.jsx'
import Footer from './components/common/footer.jsx'
import Middle from './components/common/middle.jsx'

function App() {
  return (
    <React.Fragment>
      <Header></Header>
        <Middle></Middle>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
