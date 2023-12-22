<template>
    <div>
        <h3>Courses</h3>
        <div class="container">
            <table>
                <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Semester</th>
                    <th>Homeworks</th>
                    <th>Exam</th>
                    <th>Total</th>
                    <th>Note</th>

                </tr>
                <tr class="item" v-for="mycourse in mycourses" :key="mycourse.id">
                    <td class='codebutton' @click="fetchDescription(mycourse.code)">{{ mycourse.code }} </td>
                    <td>{{ mycourse.title }} </td>
                    <td>{{ mycourse.semester }}</td>
                    <td> {{ mycourse.homeworks }}</td>
                    <td class='red' v-if="mycourse.exam < 21"> {{ mycourse.exam }} </td>
                    <td class='blue' v-if="mycourse.exam > 20"> {{ mycourse.exam }} </td>
                    <td class='red' v-if="mycourse.exam < 21 || mycourse.homeworks + mycourse.exam < 52">{{
                        mycourse.homeworks + mycourse.exam }} </td>
                    <td class='blue' v-if="mycourse.homeworks + mycourse.exam > 51"> {{ mycourse.homeworks + mycourse.exam}} </td>
                    <td><input class = "noteinput" name="note" type="text" id="note" v-model="mycourse.note"></td>
                    <td><button class = "noteupdate" name="update" @click="updatenote(mycourse.code, mycourse.note)"></button></td>

                </tr>
            </table>
        </div>
        <a class="description"> Course description: {{ this.description }}</a>
    </div>
</template>

<script>

export default {
    name: "MyCourses",
    data() {
        return {
            mycourses: [],
            description: null,
        };
    },
    methods: {
        fetchCourses() {
            fetch(`http://localhost:3000/api/mycourses/`)
                .then((response) => response.json())
                .then((data) => (this.mycourses = data))
                .catch((err) => console.log(err.message));
        },
        fetchDescription(code) {
            fetch(`http://localhost:3000/api/mycoursesDesc/${code}`)
                .then((response) => response.json())
                .then((data) => (this.description = data[0].description))
                .catch((err) => console.log(err.message));

        },
        async updatenote(code, note) {
            const response = await fetch(`http://localhost:3000/api/mycoursesNote/${code}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note }),
            });
            console.log(note, code);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const updatedNote = await response.json();
            console.log('Note updated successfully:', updatedNote);
        }

    },
    mounted() {
        this.fetchCourses();
        console.log("mounted");
    }
};
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

th,
td {
    font-size: 15px;
    margin-bottom: 5px;
    padding: 8px 10px;
}

.codebutton:hover {
    background-color: aqua;
}

a {
    background-color: aqua;
}

.red {
    color: rgb(255, 255, 255);
    background-color: red;
}

.blue {
    color: rgb(255, 255, 255);
    background-color: blue;
}

.container {
    background: #d5d7d8;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    margin: auto;
    width: auto;
    display: flex;
    justify-content: center;
}
</style>