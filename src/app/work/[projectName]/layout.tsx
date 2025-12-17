import React from 'react';

const ProjectLayout: React.FC = ({ children }) => {
    return (
        <div className="work-layout">
            <header>
                <h1>My Work</h1>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; {new Date().getFullYear()} My Portfolio</p>
            </footer>
        </div>
    );
};

export default ProjectLayout;