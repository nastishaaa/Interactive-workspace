import { Rnd } from 'react-rnd';
import s from './BlockItem.module.css'

export default function BlockItem({ id, text, x, y, width, height, onUpdate, onDelete, color, zIndex }) {
    return (
        <Rnd
            size={{ width, height }}
            position={{ x, y }}
            onDragStop={(e, d) => {
                onUpdate(id, { x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                onUpdate(id, {
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    x: position.x,
                    y: position.y,
                });
            }}
            style={{
                backgroundColor: color,
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                zIndex
            }}  >
            {text}
            <button
                className={s.btn }
                onClick={(e) => {
                    e.stopPropagation(); 
                    onDelete(id);
                }}
            >
                Delete
            </button>
            
        </Rnd>

    );
}
