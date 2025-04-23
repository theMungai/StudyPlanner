// Function to fetch assignments from db.json
export const fetchAssignments = async () => {
    try {
      const response = await fetch("/db.json")
      const data = await response.json()
      return data.assignments
    } catch (error) {
      console.error("Error fetching assignments:", error)
      return []
    }
  }
  
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
  
  // Function to add a new assignment
  export const addAssignment = async (assignments, newAssignment) => {
    const assignmentWithId = {
      ...newAssignment,
      id: generateId(assignments),
    }
    return [...assignments, assignmentWithId]
  }
  
  // Function to update an existing assignment
  export const updateAssignment = async (assignments, updatedAssignment) => {
    return assignments.map((assignment) => (assignment.id === updatedAssignment.id ? updatedAssignment : assignment))
  }
  
  // Function to delete an assignment
  export const deleteAssignment = async (assignments, assignmentId) => {
    return assignments.filter((assignment) => assignment.id !== assignmentId)
  }
  
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
  
  // Function to add a new grade item
  export const addGradeItem = async (gradeItems, newGradeItem) => {
    const gradeItemWithId = {
      ...newGradeItem,
      id: generateId(gradeItems),
    }
    return [...gradeItems, gradeItemWithId]
  }
  
  // Function to update an existing grade item
  export const updateGradeItem = async (gradeItems, updatedGradeItem) => {
    return gradeItems.map((item) => (item.id === updatedGradeItem.id ? updatedGradeItem : item))
  }
  
  // Function to delete a grade item
  export const deleteGradeItem = async (gradeItems, gradeItemId) => {
    return gradeItems.filter((item) => item.id !== gradeItemId)
  }
  