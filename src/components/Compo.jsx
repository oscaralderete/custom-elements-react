import { useState, forwardRef, useImperativeHandle } from 'react';

function Compo(props, ref) {
  /* set 'count' variable and its initial state */
  const [count, setCount] = useState(0);

  useImperativeHandle(ref, () => ({
    increaseCount() {
      setCount(count + 1)
    },
    triggerShowLoader(){
      showLoader()
    }
  }), [count])

  const showLoader = () => {
    const loader = document.querySelector("oa-loader");
    loader.show();
    setCount(count + 1);
    setTimeout(() => {
      loader.hide();
    }, 2000);
  };

  const showGlobalLoader = () => {
    /* and here the loader is invoked through the global declaration window.app = {...} */
    window.app.loader.show();
    setCount(count + 1);
    setTimeout(() => {
      window.app.loader.hide();
    }, 2000);
  };

  const showCode = () => {
    window.app.viewCode()
  }

  return (
    <section className='compo'>
      <h3>Times the loader has been called from React: {count}</h3>
      <button className='compoBtn' onClick={showLoader}>
        Call loader from hook
      </button>
      <br />
      <button className='compoBtn' onClick={showGlobalLoader}>
        Call loader using hook method from global function
      </button>
      <p>&nbsp;</p>
      <div className='right'>
        <button data-id='component' onClick={showCode}>
          View code (I'm inside React hook)
        </button>
      </div>
    </section>
  );
}

export default forwardRef(Compo);
