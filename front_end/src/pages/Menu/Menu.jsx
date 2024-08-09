// Menu.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Menu = () => {
    const { category } = useParams(); // Get category from URL parameters

    return (
        <div className='menu'>
            <h2>Menu Items: {category}</h2>
            <FoodDisplay category={category}/>
        </div>
    );
}

export default Menu;
