"use strict";
document.addEventListener('click', function (event) {
    let target = event.target;

    while (target && target.tagName !== 'A') {
        target = target.parentNode;
    }

    if (target && target.tagName === 'A' && target.href) {

        chrome.runtime.sendMessage({ href: target.href });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const tabsContainer = document.getElementById('tabs');
    const taskListContainer = document.getElementById('task-list');
    const tasks = INITIAL_LIST;

    function renderTabs() {
        tabsContainer.innerHTML = '';
        Object.keys(tasks).forEach((listId, index) => {
            const tab = document.createElement('div');
            tab.classList.add('tab');
            tab.textContent = `${listId}`;
            // tab.addEventListener('click', () => showTaskList(listId));
            tab.addEventListener('click', () => showTaskList(index + 1));
            tabsContainer.appendChild(tab);
        });
    }

    function renderTaskList(listId) {
        const taskList = tasks[listId];
        taskListContainer.innerHTML = '';
        if (taskList && taskList.length > 0) {
            taskList.forEach((task, index) => {
                const taskItem = document.createElement('div');
                const anc = document.createElement('a');
                anc.href = `https://in.tradingview.com/chart/?symbol=NSE%3A${task}`;
                // anc.target = '_selft';
                anc.innerHTML = task;
                // anc.addEventListener('click', function (event) {
                //     event.preventDefault();
                //     window.location.replace(event.target.href);
                //     console.log(window.location.href, event.target.href);
                // });
                taskItem.appendChild(anc);
                // const deleteButton = document.createElement('button');
                // deleteButton.textContent = 'Delete';
                // deleteButton.innerHTML = `<svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                // <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                //   </svg>`
                // deleteButton.addEventListener('click', () => deleteTask(listId, index));
                // taskItem.appendChild(deleteButton);
                taskListContainer.appendChild(taskItem);
            });
        } else {
            taskListContainer.textContent = 'No tasks in this list.';
        }
    }

    function showTaskList(listId) {
        renderTabs();
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            activeTab.classList.remove('active');
        }
        const selectedTab = document.querySelector(`.tab:nth-child(${listId})`);
        selectedTab.classList.add('active');
        localStorage.setItem('activatedTab', listId)
        renderTaskList(selectedTab.textContent);
    }

    function addTask(listId, task) {
        if (!tasks[listId]) {
            tasks[listId] = [];
        }
        tasks[listId].push(task);
        renderTabs();
        showTaskList(listId);
    }

    // function deleteTask(listId, index) {
    //     if (tasks[listId] && tasks[listId][index]) {
    //         tasks[listId].splice(index, 1);
    //         renderTabs();
    //         showTaskList(listId);
    //     }
    // }

    function createNewList() {
        renderTabs();
        showTaskList(localStorage.getItem('activatedTab') || 1); // show first list
    }

    createNewList();

    // document.getElementById('new-list-button').addEventListener('click', createNewList);
    // document.getElementById('add-task-button').addEventListener('click', function () {
    //     const listId = document.querySelector('.tab.active').textContent.replace('List ', '');
    //     const taskInput = document.getElementById('task-input');
    //     const task = taskInput.value.trim();
    //     if (task !== '') {
    //         addTask(listId, task);
    //         taskInput.value = '';
    //     }
    // });

});

window.addEventListener('unload', function () {
    console.log()
})