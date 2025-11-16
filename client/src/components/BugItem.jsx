import React, { useState } from 'react';
import Button from './Button';

const BugItem = ({ bug, onUpdate, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await onUpdate(bug._id, { status: newStatus });
    } catch (error) {
      console.error('Failed to update bug status:', error);
    }
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      setIsUpdating(true);
      try {
        await onDelete(bug._id);
      } catch (error) {
        console.error('Failed to delete bug:', error);
      }
      setIsUpdating(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in-progress': return 'status-in-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-open';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className={`bug-item ${bug.status} ${bug.priority === 'high' ? 'critical' : ''}`}>
      <div className="bug-header">
        <h3 className="bug-title">{bug.title}</h3>
        <div className="bug-meta">
          <span className={`status-badge ${getStatusClass(bug.status)}`}>
            {bug.status}
          </span>
          <span className={`status-badge ${getPriorityClass(bug.priority)}`}>
            {bug.priority}
          </span>
        </div>
      </div>
      
      <p className="bug-description">{bug.description}</p>
      
      <div className="bug-actions">
        {bug.status !== 'resolved' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleStatusChange('resolved')}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Mark Resolved'}
          </Button>
        )}
        
        {bug.status === 'open' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleStatusChange('in-progress')}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Start Progress'}
          </Button>
        )}
        
        <Button
          size="sm"
          variant="danger"
          onClick={handleDelete}
          disabled={isUpdating}
        >
          {isUpdating ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
};

export default BugItem;