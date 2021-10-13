import React from 'react'

function MyModal({children, visible, setVisible}) {

    const rootClasses = ['myModal']

    if (visible) {
        rootClasses.push('active');
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={'myModalContent'} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal
