/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const url = 'http://localhost:8080/';

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var controller = {
    saveLogin: function (username, password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location = 'attendance.html';
    },
    verifyLogin: function (username, password) {
        return new Promise((resolve, reject) => {
            fetch(url + 'login', {
                method: 'POST',
                body: `username=${username}&password=${password}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(result => resolve(result))
        })
    },
    login: function () {
        controller.toggleLoading()
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        controller.verifyLogin(username, password)
            .then(res => {
                return res.text();
            })
            .then((result) => {
                controller.toggleLoading();
                if (result === 'true') {
                    controller.saveLogin(username, password);
                }
                else {
                    const status = document.getElementById("login-status");
                    status.style.display = 'block';
                }
            })
    },
    toggleLoading: function () {
        const login = document.getElementById("login");
        login.classList.toggle("loading");
    }

}
const login = document.getElementById("login");
login.addEventListener('click', controller.login);
const close = document.getElementById("close-button");
close.addEventListener('click', () => {
    const status = document.getElementById("login-status");
    status.style.display = 'none';
})

app.initialize();