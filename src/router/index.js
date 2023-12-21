import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "../views/AboutView.vue";
import AllCourses from "../views/Courses.vue";
import SemesterDetailView from '@/views/SemesterDetailView.vue';


const routes = [{
    path: "/",
    name: "AllCourses",
    component: AllCourses,
}, {
    path: '/aboutView',
    name: 'AboutView',
    component: AboutView,
},
{
    path: '/semesters/:semester',
    name: 'SemesterDetail',
    component: SemesterDetailView,
    props: true,
},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router