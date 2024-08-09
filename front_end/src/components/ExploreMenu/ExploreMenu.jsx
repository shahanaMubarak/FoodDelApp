import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ setCategory }) => {
    const handleCategoryClick = (category) => {
        setCategory(category);
    };

    return (
        <section className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Discover the variety of our delicious offerings.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => (
                    <div 
                        key={index}
                        className="explore-menu-list-item"
                        onClick={() => handleCategoryClick(item.menu_name)}
                        role="button" // Adding role for accessibility
                        tabIndex={0} // Making the div focusable
                        onKeyPress={(e) => e.key === 'Enter' && handleCategoryClick(item.menu_name)} // Handling keyboard navigation
                    >
                        <img src={item.menu_image} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </section>
    );
};

export default ExploreMenu;
