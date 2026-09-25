import { useState, useEffect } from 'react';
import api from './api';

export default function Profile({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get('/users/me').then((res) => setEmail(res.data.email));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = { email };
      if (password) body.password = password;

      await api.put('/users/me', body);
      setMsg('Profile updated successfully!');
      setPassword('');
    } catch {
      setMsg('Failed to update profile.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <button onClick={onBack}>&larr; Back to Tasks</button>
      <h2>Profile Settings</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>New Password (leave blank to keep current):</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Update Profile</button>
      </form>
    </div>
  );
}