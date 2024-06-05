import { useRef, useState } from 'react';

import './styles.css';

const Popover = ({ action, btnClass, label, shouldShowPopover = false, onShowPopover, children }) => {
    const [canToggle, setCanToggle] = useState(true);
    const popoverRef = useRef(null);

    const togglePopover = () => {
        if (canToggle) {
            onShowPopover(!shouldShowPopover);
            setCanToggle(false);
            if (shouldShowPopover) {
                document.addEventListener('mousedown', handleOutsideClick, false);
            } else {
                document.removeEventListener('mousedown', handleOutsideClick, false);
            }
            if (action) {
                action(shouldShowPopover);
            }
            setTimeout(() => {
                setCanToggle(true);
            }, 250);
        }
    };

    const handleClick = () => {
        togglePopover();
    };

    const handleOutsideClick = (e) => {
        if (popoverRef.current && !popoverRef.current.contains(e.target)) {
            togglePopover();
        }
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
            {shouldShowPopover && (
                <div
                    className={`popover popover--show`}
                    ref={(node) => {
                        popoverRef.current = node;
                    }}
                >
                    {{...children}}
                </div>
            )}
        </div>
    );
}

export default Popover;
