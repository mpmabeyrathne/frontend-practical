function ResourceList({ items, loading, onEdit, onDelete }) {
    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Connecting to backend...</p>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.5 }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>No resources found. Add your first AWS resource!</p>
            </div>
        );
    }

    return (
        <div className="items-grid">
            {items.map(item => (
                <div key={item.id} className="item-card">
                    <div className="item-header">
                        <h3 className="item-title">{item.name}</h3>
                    </div>
                    <p className="item-desc">{item.description}</p>
                    <div className="item-actions">
                        <button
                            onClick={() => onEdit(item)}
                            className="action-btn edit"
                            aria-label="Edit"
                            disabled={String(item.id).startsWith('offline-')}
                        >
                            ✎
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="action-btn delete"
                            aria-label="Delete"
                            disabled={String(item.id).startsWith('offline-')}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ResourceList;
