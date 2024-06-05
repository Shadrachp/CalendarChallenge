import { useRef, useState } from 'react';

import './styles.css';

const Popover = ({ action, btnClass, label, children }) => {
    const [currentState, setCurrentState] = useState('hide');
    const [canToggle, setCanToggle] = useState(true);
    const popoverRef = useRef(null);

    const togglePopover = () => {
        const shouldShowPopover = currentState === 'hide';
        if (canToggle) {
            setCurrentState(shouldShowPopover ? 'show' : 'hide');
            setCanToggle(false);
            if (shouldShowPopover) {
                document.addEventListener('mousedown', handleOutsideClick, false);
            } else {
                document.removeEventListener('mousedown', handleOutsideClick, false);
            }
            if (action) {
                action(shouldShowPopover);
            }
            // setTimeout(() => {
            //     setCanToggle(true);
            // }, 250);
            setCanToggle(true);
        }
    };

    const handleClick = () => {
        togglePopover();
    };

    const handleOutsideClick = (e) => {
        // TODO: Fix bug with outside click
        // if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        //     togglePopover();
        // }
    };

    return (
        <div className="popover-container">
            <a
                href="#"
                className={btnClass}
                onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                }}
            >
                {label}
            </a>
            <div
                className={`popover popover--${currentState}`}
                ref={(node) => {
                    popoverRef.current = node;
                }}
            >
                {currentState !== 'hide' ? children : ''}
            </div>
        </div>
    );
}

export default Popover;
