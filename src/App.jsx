import { useState, useEffect } from 'react';
import ResourceForm from './components/ResourceForm';
import ResourceList from './components/ResourceList';
import * as api from './services/api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const loadItems = async () => {
    try {
      const data = await api.fetchItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      if (items.length === 0) {
        setItems([
          { id: 'offline-1', name: 'Backend Offline', description: 'Start the Node.js backend on port 5000' }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleFormSubmit = async (formData) => {
    if (formData === null) {
      // Cancel edit was clicked
      setEditingItem(null);
      return;
    }

    try {
      if (editingItem) {
        await api.updateItem(editingItem.id, formData);
        setEditingItem(null);
      } else {
        await api.createItem(formData);
      }
      loadItems();
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (String(id).startsWith('offline-')) return;
    try {
      await api.deleteItem(id);
      loadItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>AWS Explorer</h1>
        <p>A sleek, dynamic CRUD application for your AWS learning journey.</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <ResourceForm
            initialData={editingItem}
            onSubmit={handleFormSubmit}
          />
        </section>

        <section className="list-section">
          <div className="glass-panel" style={{ height: '100%' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Your AWS Resources</h2>
            <ResourceList
              items={items}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
