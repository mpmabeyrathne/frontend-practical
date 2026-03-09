import { useState, useEffect } from 'react';

function ResourceForm({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({ name: initialData.name, description: initialData.description });
        } else {
            setFormData({ name: '', description: '' });
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.description.trim()) return;

        setIsSubmitting(true);
        await onSubmit(formData);
        setIsSubmitting(false);

        if (!initialData) {
            setFormData({ name: '', description: '' });
        }
    };

    return (
        <div className="glass-panel">
            <h2>{initialData ? 'Edit Resource' : 'Register Resource'}</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div className="form-group">
                    <label>Resource Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., EC2 Instance Auth"
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description & Notes</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Details about this AWS resource..."
                        className="form-input"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : (initialData ? 'Update Resource' : 'Add Resource')}
                </button>
                {initialData && (
                    <button
                        type="button"
                        onClick={() => onSubmit(null)} // passing null acts as a cancel
                        style={{
                            width: '100%',
                            padding: '1rem',
                            marginTop: '0.5rem',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--surface-border)',
                            color: 'var(--text-main)',
                            borderRadius: '12px'
                        }}
                    >
                        Cancel Edit
                    </button>
                )}
            </form>
        </div>
    );
}

export default ResourceForm;
