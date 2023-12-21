<!--<template>
    <div>
        <h3>{{semester}}</h3>
        <div class = "container">
            <table>
                <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Semester</th>
                    <th>Credits</th>
                    <th>Description</th>
                </tr>
                <tr class="item" v-for="course in courses" :key = "course.id">
                  <td>{{  course.code }}</td>
                  <td>{{  course.title }}</td>
                  <td>{{  course.semester }}</td>
                  <td>{{  course.credits }}</td>
                  <td v-if="course.description !== null" >{{  course.description }}</td>
                  <td v-else>No course description is provided</td>
                </tr>
            </table>
        </div>
    </div>
  </template>

<script>
export default {
  name: "SemesterView",
  data() {
      return {
          courses: [],
          semester: null,
      };
  },
  methods: {
        fetchCourses() {
        const semester = this.$route.params.semester;
        fetch(`http://localhost:3000/api/courses/${semester}`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.semester = this.$route.params.semester;
    this.fetchCourses();
    console.log("mounted");
  },
};
</script>

<style scoped>
h3 {
    font-size: larger;
}
th {
    background-color: darkcyan;
}
td {
    background-color: cyan;
}
th, td {
  font-size: 15px;
  margin-bottom: 5px;
  padding: 8px 10px;
}
.container {
    background: #d5d7d8;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    margin: auto;
    width: 40%;
    display: flex;
    justify-content: center;
}
</style>-->
<template>
  <h3>{{ semester }}</h3>
  <div class="container">
    <table>
    <tr>
      <th>Code</th>
      <th>Title</th>
      <th>Semester</th>
      <th>Credits</th>
      <th>Description</th>
    </tr>
    <tr class="item" v-for="course in courses" :key="course.id">
      <td>{{ course.code }} </td>
      <td>{{ course.title }} </td>
      <td>{{ course.semester }}</td>
      <td> {{ course.credits }}</td>
      <td v-if="course.description"> {{ course.description }}</td>
      <td v-else>No course description is provided </td>
    </tr>
  </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courses: [],
      semester: null
    }
  },
  methods: {
    async fetchCourses() {
      const semester = this.$route.params.semester
      fetch(`http://localhost:3000/api/courses/${semester}`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.semester = this.$route.params.semester;
    this.fetchCourses();
    console.log("mounted");
  },
}
</script>
<style scoped>
  h3 {
    font-size: 20px;
  }
  th {
    background: rgb(100, 151, 122); 
  }
  td {
    background: rgb(186, 228, 204); 
  }
  th, td {
    font-size: 15px;
    margin-bottom: 5px;
    padding: 8px 10px;
  }
  .container {
    background: #d5d7d8;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    margin: auto;
    width: 40%;
    display: flex;
    justify-content: center;
  }
  </style>