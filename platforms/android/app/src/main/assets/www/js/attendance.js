const url = 'https://lite.harigovind.org/';

var controller = {
    clearLogin: function () {
        localStorage.clear();
        window.location = 'index.html';
    },
    getAttendanceData: function () {
        return new Promise((resolve, reject) => {
            username = localStorage.username;
            password = localStorage.password;
            fetch(url + 'attendance', {
                method: 'POST',
                body: `username=${username}&password=${password}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
                .then(result => resolve(result));
        })
    },
    renderAttendance: function(attendance) {
        let username = attendance['Student']['Name'];
        let register_num = attendance['Student']['Branch']
        let overall = attendance['Overall']
        let subs = attendance['Summary']
        const name = document.getElementById("name");
        const details = document.getElementById("details");
        const overall_atten = document.getElementById("overall");
        const holder = document.getElementById("holder");
        const loading = document.getElementById("loading");
        name.innerText = username;
        details.innerText = register_num;
        overall_atten.innerText = 'Overall Attendance: ' + overall;
        //Append Subject Wise Attendance
        for(var i=0;i<subs.length;i++){
            elem = `
            <div class="tile tile-centered">
              <div class="tile-content">
                <div class="tile-title text-bold">${subs[i]['s']}</div>
                <div class="tile-subtitle">${subs[i]['c']}</div>
              </div>
              <div class="tile-action">
                <button class="btn btn-link btn-action btn-lg tooltip tooltip-left" data-tooltip="Attendance Percentage">${subs[i]['p']}</button>
              </div>
            </div><br>`;
            holder.innerHTML += elem;
        }
        loading.style.display = 'none';
    }
}
const login = document.getElementById("clear");
const refresh = document.getElementById("refresh");
login.addEventListener('click', controller.clearLogin);
refresh.addEventListener('click', () => {
    location.reload();
})
controller.getAttendanceData()
    .then(res => { return res.json() })
    .then(attendance => controller.renderAttendance(attendance))

