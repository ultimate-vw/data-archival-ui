import { useState, useEffect } from 'react';
import {
  login,
  register,
  runArchive,
  runDelete,
  saveConfig,
  getConfigs,
  viewArchived
} from './services/api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [archivedData, setArchivedData] = useState([]);
  const [configs, setConfigs] = useState([]);

  const [deleteInput, setDeleteInput] = useState({ sourceTable: '', cutoffDate: '', pageSize: 50 });
  const [configInput, setConfigInput] = useState({
    archiveAfterMonths: 6,
    deleteAfterMonths: 12,
    pageSize: 50,
    tableName: '',
    criteriaColumn: ''
  });
  const [tableToView, setTableToView] = useState('');

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      setToken(res.token);
      setStatus('✅ Login Successful');
    } catch (err) {
      setStatus('❌ Login Failed');
    }
  };

  const handleRegister = async () => {
    try {
      await register(username, password, role);
      setStatus('✅ Registered Successfully');
    } catch (err) {
      setStatus('❌ Registration Failed');
    }
  };

  const handleArchive = async () => {
    try {
      const res = await runArchive(token);
      setMessage(res);
    } catch (err) {
      setMessage('❌ Archive Failed');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await runDelete(token, deleteInput);
      setMessage(res);
    } catch (err) {
      setMessage('❌ Delete Failed');
    }
  };

  const handleSaveConfig = async () => {
    try {
      const res = await saveConfig(token, configInput);
      setMessage(res);
    } catch (err) {
      setMessage('❌ Save Config Failed');
    }
  };

  const handleGetConfigs = async () => {
    try {
      const data = await getConfigs(token);
      setConfigs(data);
    } catch (err) {
      setMessage('❌ Get Configs Failed');
    }
  };

  const handleViewArchived = async () => {
    try {
      const data = await viewArchived(token, tableToView);
      setArchivedData(data);
    } catch (err) {
      setMessage('❌ View Archived Data Failed');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff' }}>
      <h1>📦 Data Archival Dashboard</h1>
      <p><strong>Status:</strong> {status}</p>

      <h2>🔐 Auth</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
      </select>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>

      {token && (
        <>
          <hr />
          <h2>📤 Archive & Delete</h2>
          <button onClick={handleArchive}>Run Archive</button>

          <div>
            <h3>Delete</h3>
            <input placeholder="Source Table" value={deleteInput.sourceTable} onChange={e => setDeleteInput({ ...deleteInput, sourceTable: e.target.value })} />
            <input type="date" value={deleteInput.cutoffDate} onChange={e => setDeleteInput({ ...deleteInput, cutoffDate: e.target.value })} />
            <input type="number" placeholder="Page Size" value={deleteInput.pageSize} onChange={e => setDeleteInput({ ...deleteInput, pageSize: parseInt(e.target.value) })} />
            <button onClick={handleDelete}>Run Delete</button>
          </div>

          <hr />
          <h2>⚙️ Config Management</h2>
          <input placeholder="Table Name" value={configInput.tableName} onChange={e => setConfigInput({ ...configInput, tableName: e.target.value })} />
          <input placeholder="Criteria Column" value={configInput.criteriaColumn} onChange={e => setConfigInput({ ...configInput, criteriaColumn: e.target.value })} />
          <input type="number" placeholder="Archive After Months" value={configInput.archiveAfterMonths} onChange={e => setConfigInput({ ...configInput, archiveAfterMonths: parseInt(e.target.value) })} />
          <input type="number" placeholder="Delete After Months" value={configInput.deleteAfterMonths} onChange={e => setConfigInput({ ...configInput, deleteAfterMonths: parseInt(e.target.value) })} />
          <input type="number" placeholder="Page Size" value={configInput.pageSize} onChange={e => setConfigInput({ ...configInput, pageSize: parseInt(e.target.value) })} />
          <div>
            <button onClick={handleSaveConfig}>Save Config</button>
            <button onClick={handleGetConfigs}>Get Configs</button>
          </div>

          <pre style={{ background: '#222', padding: '1rem', marginTop: '1rem' }}>
            {JSON.stringify(configs, null, 2)}
          </pre>

          <hr />
          <h2>📄 View Archived</h2>
          <input placeholder="Table Name" value={tableToView} onChange={e => setTableToView(e.target.value)} />
          <button onClick={handleViewArchived}>View Archived Data</button>

          <pre style={{ background: '#222', padding: '1rem', marginTop: '1rem' }}>
            {JSON.stringify(archivedData, null, 2)}
          </pre>

          <p style={{ color: 'lightgreen' }}>{message}</p>
        </>
      )}
    </div>
  );
}

export default App;
