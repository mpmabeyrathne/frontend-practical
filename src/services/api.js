const API_URL = 'http://13.206.33.87:5000/api/items';

export const fetchItems = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
};

export const createItem = async (itemData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
    });
    if (!res.ok) throw new Error('Failed to create item');
    return res.json();
};

export const updateItem = async (id, itemData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
    });
    if (!res.ok) throw new Error('Failed to update item');
    return res.json();
};

export const deleteItem = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete item');
    return res.json();
};
