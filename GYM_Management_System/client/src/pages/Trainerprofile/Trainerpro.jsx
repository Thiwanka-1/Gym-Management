import { useState } from 'react';

const ImageSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPeople, setFilteredPeople] = useState([]);
    // const [ setSelectedPerson] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const people = [
        { name: 'John', age: 30, phone: '123-456-7890', category: 'Trainer', imageSrc: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: 'Alice', age: 25, phone: '987-654-3210', category: 'Trainer', imageSrc: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: 'Bob', age: 35, phone: '456-789-0123', category: 'Trainer', imageSrc: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { name: 'Eve', age: 28, phone: '321-654-0987', category: 'Trainer', imageSrc: 'https://images.pexels.com/photos/997489/pexels-photo-997489.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' },
        { name: 'Mike', age: 40, phone: '789-012-3456', category: 'Trainer', imageSrc: 'https://images.pexels.com/photos/3228916/pexels-photo-3228916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
    ];

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filteredPeople = people.filter(person =>
            person.name.toLowerCase().includes(searchTerm)
        );
        setFilteredPeople(filteredPeople);
        setSelectedPerson(null);
    };

    const handleClick = (person) => {
        setSelectedPerson(person);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 style={{ marginBottom: '20px', color: '#333' }}>Trainer Search</h1>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '20px', width: '300px' }}
            />
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {(searchTerm ? filteredPeople : people).map((person, index) => (
                    <div key={index} style={{ position: 'relative', margin: '10px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 0 5px rgba(0,0,0,0.3)', cursor: 'pointer', backgroundColor: '#f9f9f9', transition: 'background-color 0.3s' }} onClick={() => handleClick(person)}>
                        <img src={person.imageSrc} alt={person.name} style={{ width: '500px', height: '500px', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', padding: '20px 0', textAlign: 'center' }}>
                            <p style={{ margin: '0', fontSize: '28px' }}>{person.name}</p>
                            <p style={{ margin: '0', fontSize: '20px' }}>Age: {person.age}</p>
                            <p style={{ margin: '0', fontSize: '20px' }}>Phone: {person.phone}</p>
                            <p style={{ margin: '0', fontSize: '20px' }}>Category: {person.category}</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default ImageSearch;
