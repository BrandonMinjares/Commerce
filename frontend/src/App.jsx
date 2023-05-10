import React from 'react';

import Dummy from './components/Dummy';
import Emoji from './components/Emoji';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <div>
      <Dummy />
      <Emoji />
    </div>
  );
}

export default App;
