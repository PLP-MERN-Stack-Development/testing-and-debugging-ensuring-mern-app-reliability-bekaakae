import React from 'react';
import BugItem from './BugItem';

const BugList = ({ bugs, onUpdate, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="loading">Loading bugs...</div>;
  }

  // Handle cases where bugs might not be an array
  if (!bugs || !Array.isArray(bugs)) {
    console.error('Bugs is not an array:', bugs);
    return (
      <div className="error-state">
        <h3>Error loading bugs</h3>
        <p>Unable to load bug data. Please try again later.</p>
      </div>
    );
  }

  if (bugs.length === 0) {
    return (
      <div className="empty-state">
        <h3>No bugs reported yet</h3>
        <p>Be the first to report a bug!</p>
      </div>
    );
  }

  return (
    <div className="bug-list">
      {bugs.map(bug => (
        <BugItem
          key={bug._id}
          bug={bug}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BugList;