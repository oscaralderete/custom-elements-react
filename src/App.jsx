import {useRef} from "react";
import logo from "./logo.svg";
import "./App.css";
import "./css/code.css";
import "./css/OALoader.1.0.0.css";
import "./css/OAToast.1.0.0.css";
import "./css/OADialogs.1.0.0.css";
import "./js/OALoader.1.0.0.js";
import "./js/OAToast.1.0.0.js";
import "./js/OADialogs.1.0.0.js";
import "./js/scripts.js";

// custom components
import Compo from "./components/Compo";
import Table from "./components/Table";

function App(props) {

  const myCompo = useRef()

  const showLoader = () => {
    /* here the loader is invoked through the global declaration window.app = {...} */
    window.app.loader.show();
    /* we can access to the child component data property: count, via this.$refs */
    myCompo.current.increaseCount()
    setTimeout(() => {
      window.app.loader.hide();
    }, 1000);
  };

  const callLoaderFromComponent = () => {
    /* here the loader is invoked through the same component HelloWorld inner method and data property */
    myCompo.current.triggerShowLoader()
  };

  // to update 'count' from Table component
  const updateCount = () => {
    myCompo.current.increaseCount();
  }

  const showCode = () => {
    window.app.viewCode()
  }


  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Custom Web Elements</h1>

        <Compo ref={myCompo} />

        <div>
          <button className="reactBtn" type='button' onClick={showLoader}>
          Call loader from root app using global declaration
          </button>
          <br />
          <button className="reactBtn" type='button' onClick={callLoaderFromComponent}>
          Call loader using hook method from root app
          </button>
        </div>

        <Table updateCount={updateCount}/>

        <div className='right'>
          <button data-id='app' onClick={showCode}>
            View code (I'm inside React root app)
          </button>
        </div>

        <p>&nbsp;</p>
      </header>
    </div>
  );
}

export default App;
