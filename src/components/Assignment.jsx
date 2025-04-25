import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout';
import { fetchAssignments, fetchCourses, addAssignment, updateAssignment, deleteAssignment } from './dataService';

function Assignment() {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  const [ setFile] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    courseId: 1,
    status: 'Pending',
    notes: '',
    fileUrl: null
  });

  // Filters
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    // Fetch both assignments and courses
    const fetchData = async () => {
      try {
        const [assignmentsData, coursesData] = await Promise.all([
          fetchAssignments(),
          fetchCourses()
        ]);
        setTasks(assignmentsData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to get course name by ID
  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  };

  function getStatusClass(status) {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Pending": return "bg-red-100 text-red-700";
      case "In Progress": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Handle file selection
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setFormData(prev => ({ ...prev, fileUrl }));
    }
  };

  // Handle form input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset form to default state
  function resetForm() {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      courseId: 1,
      status: 'Pending',
      notes: '',
      fileUrl: null
    });
    setFile(null);
    setEditingTask(null);
  };

  // Save or update task
  async function handleSave() {
    if (!formData.title || !formData.dueDate) {
      alert('Title and Due Date are required!');
      return;
    }

    try {
      const taskToSave = {
        ...formData,
        id: editingTask ? editingTask.id : Date.now(),
      };

      let updatedTasks;
      if (editingTask) {
        updatedTasks = await updateAssignment(tasks, taskToSave);
      } else {
        updatedTasks = await addAssignment(tasks, taskToSave);
      }

      setTasks(updatedTasks);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save the assignment. Please try again.');
    }
  }

  // Delete task
  async function handleDelete(taskId) {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        const updatedTasks = await deleteAssignment(tasks, taskId);
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete the assignment. Please try again.');
      }
    }
  }

  // Edit task - populate form with existing data
  function handleEdit(task) {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      courseId: task.courseId,
      status: task.status,
      notes: task.notes,
      fileUrl: task.fileUrl
    });
    setShowModal(true);
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    const courseMatch = selectedCourse ? task.courseId === Number(selectedCourse) : true;
    const statusMatch = selectedStatus ? task.status === selectedStatus : true;
    return courseMatch && statusMatch;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="assignments-header flex items-center justify-between mb-14">
          <div>
            <h1 className="text-[#121212] text-2xl font-bold">Assignments</h1>
            <p className="text-[14px] text-[#71717A]">Manage your assignments</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer flex items-center gap-x-4 bg-[#0F766E] text-white py-2.5 px-4 rounded-[6px] hover:bg-[#0D635C] transition-colors"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            Add New Assignment
          </button>
        </div>

        {/* Assignment Body */}
        <div className="assignment-body p-6 bg-white rounded-lg shadow-sm">
          {/* Filters */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center p-4 mb-6 border-b">
            <h1 className="font-medium text-lg mb-4 sm:mb-0">All Assignments</h1>
            <div className="flex flex-col sm:flex-row items-center gap-x-8 sm:gap-x-4">
              <div className="flex flex-col sm:flex-row gap-x-4 items-center">
                <select
                  name="course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Courses</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-4 sm:mt-0 border rounded px-3 py-1 text-sm"
              >
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
              </select>
              <button className="bg-[#0F766E] text-white p-2 rounded-[6px] hover:bg-[#0D635C] mt-4 sm:mt-0">
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>

          {/* Assignments Table */}
          {filteredTasks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{task.title}</div>
                        {task.description && (
                          <div className="text-sm text-gray-500 mt-1">{task.description.substring(0, 50)}...</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getCourseName(task.courseId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block text-center px-3 py-1 text-xs rounded-full ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-3">
                        <button onClick={() => handleEdit(task)} className="text-blue-400 " title="Edit">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button onClick={() => handleDelete(task.id)} className="text-red-400 " title="Delete">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No assignments found. Create your first assignment!
            </div>
          )}
        </div>

        {/* Add Assignment Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-[#222222]/50 backdrop-blur-md flex items-center justify-center">
            <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{editingTask ? 'Edit' : 'Add'} Assignment</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-600 text-2xl">×</button>
              </div>
              <form>
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 mt-1"/>
                </div>
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 mt-1"/>
                </div>
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 mt-1"/>
                </div>
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <select name="courseId" value={formData.courseId} onChange={handleInputChange} className="w-full border rounded-md px-3 py-2 mt-1">
                    <option value="1">Introduction to Psychology</option>
                    <option value="2">Business Ethics</option>
                    <option value="3">Calculus II</option>
                    <option value="4">Computer Science Fundamentals</option>
                    <option value="5">World Literature</option>
                  </select>
                </div>
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 mt-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </div>
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 mt-1"
                  />
                </div>
                <div className="my-4">
                  <label className="block text-sm font-medium text-gray-700">Attach File</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full mt-1"
                  />
                </div>

                <div className="mt-6 text-right">
                  <button
                    type="button"
                    onClick={handleSave}
                    className=" text-gray-700 py-2 px-6 rounded-lg "
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="mt-6 text-right">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-[#0F766E] text-white py-2 px-6 rounded-lg hover:bg-[#0D635C]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Assignment;
