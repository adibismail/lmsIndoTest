import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ user }) {
  const [stats, setStats] = useState({});
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetchStats();
    if (user.role === 'admin') {
      fetchAnalytics();
    }
  }, [user.role]);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://192.168.1.181:3001/api/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://192.168.1.181:3001/api/dashboard/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '24px', margin: '0' }}>{stats.users || 0}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Products</h3>
          <p style={{ fontSize: '24px', margin: '0' }}>{stats.products || 0}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Today's Events</h3>
          <p style={{ fontSize: '24px', margin: '0' }}>{stats.todayEvents || 0}</p>
        </div>
      </div>

      {user.role === 'admin' && (
        <div>
          <h2>Analytics (Last 7 Days)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Event Type</th>
                <th style={{ padding: '10px', border: '1px solid #ccc' }}>Count</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.date}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.event_type}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {user.role !== 'user' && (
        <div style={{ marginTop: '20px' }}>
          <a href="/products" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Manage Products
          </a>
        </div>
      )}
    </div>
  );
}

export default Dashboard;