/**
 * Data Service for StudyPlanner
 * 
 * This service handles all data operations for the application.
 * For development purposes, we're using a mock JSON file (db.json) and localStorage
 * to simulate a backend database. In a production environment, this would be replaced
 * with actual API calls to a backend server.
 */

// Function to fetch assignments from localStorage or db.json
export const fetchAssignments = async () => {
  try {
    // First try to get from localStorage
    const storedAssignments = localStorage.getItem('assignments');
    if (storedAssignments) {
      return JSON.parse(storedAssignments);
    }
    
    // If not in localStorage, fetch from db.json
    const response = await fetch("/db.json");
    const data = await response.json();
    // Store in localStorage for future use
    localStorage.setItem('assignments', JSON.stringify(data.assignments));
    return data.assignments;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return [];
  }
};

// Function to fetch courses from db.json
export const fetchCourses = async () => {
  try {
    const response = await fetch("/db.json")
    const data = await response.json()
    return data.courses
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

// Function to fetch users from db.json
export const fetchUsers = async () => {
  try {
    const response = await fetch("/db.json")
    const data = await response.json()
    return data.users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

// In a real application, these would be API calls to a backend server
// For this demo, we'll simulate CRUD operations by manipulating the data in memory

// Helper function to generate a new ID
const generateId = (items) => {
  return Math.max(...items.map((item) => item.id), 0) + 1
}

/**
 * Simulates saving assignments to a backend
 * In a production environment, this would be an API call to:
 * POST /api/assignments
 */
export const saveAssignments = async (assignments) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return assignments;
  } catch (error) {
    console.error('Error saving assignments:', error);
    throw error;
  }
};

/**
 * Simulates adding a new assignment
 * In a production environment, this would be an API call to:
 * POST /api/assignments
 */
export const addAssignment = async (assignments, newAssignment) => {
  try {
    const assignmentWithId = {
      ...newAssignment,
      id: generateId(assignments),
    };
    const updatedAssignments = [...assignments, assignmentWithId];
    await saveAssignments(updatedAssignments);
    return updatedAssignments;
  } catch (error) {
    console.error('Error adding assignment:', error);
    throw error;
  }
};

/**
 * Simulates updating an existing assignment
 * In a production environment, this would be an API call to:
 * PUT /api/assignments/:id
 */
export const updateAssignment = async (assignments, updatedAssignment) => {
  try {
    const updatedAssignments = assignments.map((assignment) => 
      assignment.id === updatedAssignment.id ? updatedAssignment : assignment
    );
    await saveAssignments(updatedAssignments);
    return updatedAssignments;
  } catch (error) {
    console.error('Error updating assignment:', error);
    throw error;
  }
};

/**
 * Simulates deleting an assignment
 * In a production environment, this would be an API call to:
 * DELETE /api/assignments/:id
 */
export const deleteAssignment = async (assignments, assignmentId) => {
  try {
    const updatedAssignments = assignments.filter((assignment) => assignment.id !== assignmentId);
    await saveAssignments(updatedAssignments);
    return updatedAssignments;
  } catch (error) {
    console.error('Error deleting assignment:', error);
    throw error;
  }
};

// Function to fetch grade items from db.json
export const fetchGradeItems = async () => {
  try {
    const response = await fetch("/db.json")
    const data = await response.json()
    return data.gradeItems || []
  } catch (error) {
    console.error("Error fetching grade items:", error)
    return []
  }
}

/**
 * Simulates adding a new grade item
 * In a production environment, this would be an API call to:
 * POST /api/grade-items
 */
export const addGradeItem = async (gradeItems, newGradeItem) => {
  const gradeItemWithId = {
    ...newGradeItem,
    id: generateId(gradeItems),
  }
  return [...gradeItems, gradeItemWithId]
}

/**
 * Simulates updating a grade item
 * In a production environment, this would be an API call to:
 * PUT /api/grade-items/:id
 */
export const updateGradeItem = async (gradeItems, updatedGradeItem) => {
  return gradeItems.map((item) => (item.id === updatedGradeItem.id ? updatedGradeItem : item))
}

/**
 * Simulates deleting a grade item
 * In a production environment, this would be an API call to:
 * DELETE /api/grade-items/:id
 */
export const deleteGradeItem = async (gradeItems, gradeItemId) => {
  return gradeItems.filter((item) => item.id !== gradeItemId)
}
  