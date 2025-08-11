import { useEffect, useState } from 'react';
import BlockItem from '../BlockItem/BlockItem';

import s from './BlockGrid.module.css';

const defaultBlocks = [
    { id: 1, x: -320, y: 120, width: 300, height: 100, zIndex: 1, visible: true, color: '#ffb3ba' },
    { id: 2, x: 0, y: 120, width: 300, height: 100, zIndex: 1, visible: true, color: '#baffc9' },
    { id: 3, x: 320, y: 120, width: 300, height: 100, zIndex: 1, visible: true, color: '#bae1ff' },
    { id: 4, x: -320, y: 240, width: 300, height: 100, zIndex: 1, visible: true, color: '#ffffba' },
    { id: 5, x: 0, y: 240, width: 300, height: 100, zIndex: 1, visible: true, color: '#ffdfba' },
];

export default function BlockGrid() {
    
    const [positions, setPositions] = useState(() => {
        const dataFromStorage = localStorage.getItem('positions');
        return dataFromStorage ? JSON.parse(dataFromStorage) : defaultBlocks;
    });


    useEffect(() => {
        localStorage.setItem('positions', JSON.stringify(positions));
    }, [positions]);
    
    const handleUpdate = (id, newProps) => {
        setPositions(prev =>
            prev.map(block =>
                block.id === id ? { ...block, ...newProps } : block
            )
        );

        localStorage.setItem('positions', JSON.stringify(positions));
    }

    const handleClick = (id) => {
        setPositions(prev => {
            const maxZ = Math.max(...prev.map(b => b.zIndex || 0));
            return prev.map(block =>
                block.id === id ? { ...block, zIndex: maxZ + 1 } : block
            );
        });
    }

    const handleDelete = (id) => {
        const filteredItems = positions.filter(i => i.id !== id);

        setPositions(filteredItems);
    }

    const handleReset = () => {
        setPositions(defaultBlocks
        );
    }
    return (
        <div>
            <div className={s.btnContainer}>
                <button className={s.resetBtn} type='button' onClick={handleReset}>Reset</button>
            </div>
            
            {positions.map(item => (
                <div key={item.id} onClick={() => handleClick(item.id)}>
                    <BlockItem
                    key={item.id}
                    id={item.id}
                    text={`Block number ${item.id}`}
                    x={item.x}
                    y={item.y}
                    width={item.width}
                    height={item.height}
                    onUpdate={handleUpdate}
                        color={item.color}
                        zIndex={item.zIndex}
                        onDelete={handleDelete}
                    />
                </div>
            ))}
        </div>
    );
}
