// import { useState } from 'react';
// import { runArchive, viewArchivedData } from './services/api';
//
// function App() {
//   const [message, setMessage] = useState('');
//   const [archivedData, setArchivedData] = useState([]);
//
//   const handleArchive = async () => {
//     const res = await runArchive();
//     setMessage(res.message);
//   };
//
//   const handleView = async () => {
//     const data = await viewArchived();
//     setArchivedData(data);
//   };
//
//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Data Archival Service</h1>
//       <button onClick={handleArchive}>Run Archive</button>
//       <button onClick={handleView}>View Archived</button>
//       <p>{message}</p>
//       <pre>{JSON.stringify(archivedData, null, 2)}</pre>
//     </div>
//   );
// }
//
// export default App;
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  login,
  runArchive,
  runDelete,
  viewArchivedData,
  saveConfig,
  getConfigs,
} from './services/api';

function App() {
  const [token, setToken] = useState('');
  const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
  const [archivedData, setArchivedData] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [message, setMessage] = useState('');


const API_BASE = 'http://44.211.192.140:8080'; // Replace with your backend IP if it changes

function App() {
  const [healthStatus, setHealthStatus] = useState('Checking...');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [token, setToken] = useState('');

  // Health Check
  useEffect(() => {
    axios.get(`${API_BASE}/actuator/health`)
      .then(res => {
        if (res.data.status === 'UP') setHealthStatus('✅ UP');
        else setHealthStatus('⚠️ Not Healthy');
      })
      .catch(() => setHealthStatus('❌ DOWN'));
  }, []);

  // Login
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        username,
        password
      });
      setLoginStatus('✅ Login Success');
      setToken(res.data.token);
    } catch (err) {
      setLoginStatus('❌ Login Failed');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#111', color: 'white' }}>
      <h1>Data Archival Dashboard</h1>

      <p><strong>Health Check:</strong> {healthStatus}</p>

      <hr style={{ margin: '1rem 0' }} />

      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button onClick={handleLogin}>Login</button>
        <p><strong>Status:</strong> {loginStatus}</p>
      </div>

      {token && (
        <div>
          <h3>JWT Token</h3>
          <textarea value={token} readOnly rows={5} style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}

  const handleLogin = async () => {
    try {
      const data = await login(loginDetails.username, loginDetails.password);
      setToken(data.token);
      setMessage('Login successful');
    } catch (err) {
      setMessage('Login failed');
    }
  };

  const handleRunArchive = async () => {
    const res = await runArchive(token);
    setMessage(res.message || 'Archive completed');
  };

  const handleRunDelete = async () => {
    const res = await runDelete(token);
    setMessage(res.message || 'Delete completed');
  };

  const handleViewArchived = async () => {
    const data = await viewArchived(token);
    setArchivedData(data);
  };

  const handleSaveConfig = async () => {
    const res = await saveConfig(token);
    setMessage(res.message || 'Config saved');
  };

  const handleGetConfigs = async () => {
    const data = await getConfigs(token);
    setConfigs(data);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Data Archival Dashboard</h1>

      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={loginDetails.username}
        onChange={(e) => setLoginDetails({ ...loginDetails, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginDetails.password}
        onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>

      <hr />

      <h3>Actions</h3>
      <button onClick={handleRunArchive}>Run Archive</button>
      <button onClick={handleRunDelete}>Run Delete</button>
      <button onClick={handleViewArchived}>View Archived Data</button>
      <button onClick={handleSaveConfig}>Save Config</button>
      <button onClick={handleGetConfigs}>Get Configs</button>

      <p><b>Status:</b> {message}</p>

      <hr />

      <h3>Archived Data</h3>
      <pre style={{ backgroundColor: '#eee', padding: '1rem' }}>
        {JSON.stringify(archivedData, null, 2)}
      </pre>

      <h3>Configs</h3>
      <pre style={{ backgroundColor: '#eef', padding: '1rem' }}>
        {JSON.stringify(configs, null, 2)}
      </pre>
    </div>
  );
}

export default App;
