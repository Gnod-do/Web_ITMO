import React, { useState } from 'react';
import NavLink from './NavLink';
import Link from 'next/link';

export interface Option {
    label: string;
    value: string;
}

interface DropdownMenuProps {
    options: Option[];
    onSelect: (option: Option) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-menu">
            <button
                className="dropdown-menu__toggle"
                onClick={() => setIsOpen(!isOpen)}>
                {/* {selectedOption ? selectedOption.label : 'Select an option'} */}
                Select an option
            </button>
            {isOpen && (
                <ul className="dropdown-menu__options">
                    {options.map((option) => (
                        <Link href={`${option.value}`}>
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}>
                                {option.label}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
