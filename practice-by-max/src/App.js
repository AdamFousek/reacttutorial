import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UserList from './components/Users/UserLists';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers(oldValue => {
      return [...oldValue, user]
    });
  }

  return (
    <div>
      <AddUser onAddUser={addUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
