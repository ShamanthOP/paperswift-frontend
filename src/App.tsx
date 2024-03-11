import { Route, Routes } from "react-router-dom";
import RootLayout from "./components/layouts/root";
import HomePage from "./components/pages/home";
import LoginPage from "./components/pages/login";
import ExamsPage from "./components/pages/exams";
import ExamPage from "./components/pages/exam";
import CoursePage from "./components/pages/course";
import CoursesPage from "./components/pages/courses";
import DepartmentsPage from "./components/pages/departments";
import DepartmentPage from "./components/pages/department";
import TeachersPage from "./components/pages/teachers";
import TeacherPage from "./components/pages/teacher";
import DegreesPage from "./components/pages/degrees";
import DegreePage from "./components/pages/degree";
import SchemesPage from "./components/pages/schemes";
import SchemePage from "./components/pages/scheme";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="exams" element={<ExamsPage />} />
                <Route path="exams/:eid" element={<ExamPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/:code" element={<CoursePage />} />
                <Route path="departments" element={<DepartmentsPage />} />
                <Route path="departments/:code" element={<DepartmentPage />} />
                <Route path="degrees" element={<DegreesPage />} />
                <Route path="degrees/:code" element={<DegreePage />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="teachers/:id" element={<TeacherPage />} />
                <Route path="schemes" element={<SchemesPage />} />
                <Route path="schemes/:sid" element={<SchemePage />} />
            </Route>
        </Routes>
    );
};

export default App;
