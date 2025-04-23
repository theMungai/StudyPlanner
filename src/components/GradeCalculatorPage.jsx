"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2 } from "react-feather"
import { fetchCourses, fetchGradeItems, addGradeItem, deleteGradeItem } from "./dataService.jsx"
import Layout from './Layout'

function GradeCalculatorPage() {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [gradeItems, setGradeItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [newItem, setNewItem] = useState({
    name: "",
    score: 0,
    weight: 0,
    courseId: 1,
  })

  const [weightTotal, setWeightTotal] = useState(0)
  const [weightedAverage, setWeightedAverage] = useState(0)
  const [letterGrade, setLetterGrade] = useState("")

  // Fetch courses and grade items on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const coursesData = await fetchCourses()
        const gradeItemsData = await fetchGradeItems()

        setCourses(coursesData)
        setGradeItems(gradeItemsData)

        // Set default courseId for new items based on first course
        if (coursesData.length > 0) {
          setNewItem((prev) => ({
            ...prev,
            courseId: coursesData[0].id,
          }))
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Update calculations when grade items change
  useEffect(() => {
    const filteredItems =
      selectedCourse === "all"
        ? gradeItems
        : gradeItems.filter((item) => item.courseId === Number.parseInt(selectedCourse))

    const totalWeight = filteredItems.reduce((sum, item) => sum + item.weight, 0)
    setWeightTotal(totalWeight)

    if (totalWeight > 0) {
      const weightedSum = filteredItems.reduce((sum, item) => sum + item.score * item.weight, 0)
      const average = weightedSum / totalWeight
      setWeightedAverage(average)
      setLetterGrade(getLetterGrade(average))
    } else {
      setWeightedAverage(0)
      setLetterGrade("")
    }
  }, [gradeItems, selectedCourse])

  // Update new item course ID when selected course changes
  useEffect(() => {
    if (selectedCourse !== "all" && courses.length > 0) {
      setNewItem((prev) => ({ ...prev, courseId: Number.parseInt(selectedCourse) }))
    }
  }, [selectedCourse, courses])

  const handleAddItem = async () => {
    if (newItem.name && newItem.weight > 0) {
      try {
        const updatedGradeItems = await addGradeItem(gradeItems, newItem)
        setGradeItems(updatedGradeItems)
        setNewItem({
          name: "",
          score: 0,
          weight: 0,
          courseId: Number.parseInt(selectedCourse === "all" ? "1" : selectedCourse),
        })
      } catch (error) {
        console.error("Error adding grade item:", error)
      }
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      const updatedGradeItems = await deleteGradeItem(gradeItems, id)
      setGradeItems(updatedGradeItems)
    } catch (error) {
      console.error("Error deleting grade item:", error)
    }
  }

  const handleInputChange = (field, value) => {
    setNewItem({
      ...newItem,
      [field]: field === "name" ? value : Number(value),
    })
  }

  const getLetterGrade = (score) => {
    if (score >= 90) return "A"
    if (score >= 80) return "B"
    if (score >= 70) return "C"
    if (score >= 60) return "D"
    return "F"
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "text-green-600"
      case "B":
        return "text-teal-600"
      case "C":
        return "text-amber-600"
      case "D":
        return "text-orange-600"
      case "F":
        return "text-red-600"
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grade Calculator</h1>
          <p className="text-gray-500 mt-1">Calculate your weighted average grade</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Grade Items Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-1">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Grade Items</h2>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Courses</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id.toString()}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500 mt-1">Enter your assignments, exams, and their weights</p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assignment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score (%)
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weight (%)
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(selectedCourse === "all"
                      ? gradeItems
                      : gradeItems.filter((item) => item.courseId === Number.parseInt(selectedCourse))
                    ).map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {courses.find((c) => c.id === item.courseId)?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.score.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.weight}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Add new item row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          placeholder="Assignment name"
                          value={newItem.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={newItem.courseId.toString()}
                          onChange={(e) => handleInputChange("courseId", Number.parseInt(e.target.value))}
                          disabled={selectedCourse !== "all"}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          {courses.map((course) => (
                            <option key={course.id} value={course.id.toString()}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Score"
                          value={newItem.score || ""}
                          onChange={(e) => handleInputChange("score", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-right"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Weight"
                          value={newItem.weight || ""}
                          onChange={(e) => handleInputChange("weight", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-right"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button onClick={handleAddItem} className="text-teal-600 hover:text-teal-900">
                          <PlusCircle className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Total Weight:{" "}
                <span className={weightTotal === 100 ? "text-green-600" : "text-amber-600"}>{weightTotal}%</span>
                {weightTotal !== 100 && (
                  <span className="text-amber-600 ml-2">
                    {weightTotal < 100 ? `(${100 - weightTotal}% remaining)` : `(${weightTotal - 100}% over)`}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Grade Summary Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden w-full md:w-80">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium">Grade Summary</h2>
              <p className="text-sm text-gray-500 mt-1">Your calculated grade</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Weighted Average</label>
                <div className="text-4xl font-bold">{weightedAverage.toFixed(2)}%</div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Letter Grade</label>
                <div className={`text-5xl font-bold ${getGradeColor(letterGrade)}`}>{letterGrade || "-"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default GradeCalculatorPage
