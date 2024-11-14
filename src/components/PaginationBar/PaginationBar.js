import React from 'react';
import './PaginationBar.css';

const PaginationBar = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    };

    const generatePageButtons = () => {
        const buttons = [];
        const maxButtonsToShow = 10;
        const middleButton = Math.ceil(maxButtonsToShow / 2);
        let startPage = Math.max(currentPage - middleButton + 1, 1);
        let endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

        if (endPage - startPage < maxButtonsToShow - 1) {
            startPage = Math.max(endPage - maxButtonsToShow + 1, 1);
        }

        if (startPage > 1) {
            buttons.push(<button key="start" disabled={true}>...</button>);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            buttons.push(<button key="end" disabled={true}>...</button>);
        }

        return buttons;
    };

    return (
        <div className="pagination-container">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>Primero</button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
            {generatePageButtons()}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Último</button>
        </div>
    );
};

export default PaginationBar;
