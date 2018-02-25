import React from 'react';
import Headline from '../container/Headline';
import OrderButton from '../container/OrderButton';
import FridgeEntry from '../container/FridgeEntry';


const App = ({ fridgeContent }) => (
  <div>
    <Headline />

    <div className="fridge"> 
    { 
      fridgeContent.map(entry => (<div>
        {entry.name}
      </div>))
    }
    </div>
    hello world
    <OrderButton />
  </div>
);

export default App;
