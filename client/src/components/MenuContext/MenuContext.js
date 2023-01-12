import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './menuContext.scss';

const MenuContext = ({ menuItems, data }) => {
    
    return data.show ? (
        <div className='menuContext' style={{top: data.y, left: data.x}} >
            {menuItems.map((item, itemIndex) => (
                <Row key={`menu-context-item-${itemIndex}`} className='menu-context-item'>
                    <Col>
                        {item.name} {` `} {item.icon}
                    </Col>
                </Row>
            ))}
        </div>
    ) : (<></>)
}

export default MenuContext;