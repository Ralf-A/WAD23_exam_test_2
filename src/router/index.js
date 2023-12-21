import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "../views/AboutView.vue";
import AllCourses from "../views/Courses.vue";
import SemesterView from "../views/Semester.vue";


const routes = [{
        path: "/",
        name: "AllCourses",
        component: AllCourses,
    }, {
        path: '/aboutView',
        name: 'AboutView',
        component: AboutView,
    },
    { //will route to AllPosts view if none of the previous routes apply
        path: "/:catchAll(.*)",
        name: "AllCourses",
        component: AllCourses,
    },
    {
        path: "/semesters/:semester",
        name: "SemesterView",
        component: SemesterView,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router