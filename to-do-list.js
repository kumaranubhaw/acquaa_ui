var list;
var initialize = function() {
	if(localStorage.getItem("toDoList") == null) {
   		localStorage.setItem("toDoList", JSON.stringify(new Array()));
   	}
   	setTimeout(() => {
   		getList();
   		var filter_select = document.getElementById('filter');
	   	filter_select.addEventListener("change", function() {
	   		displayFilteredRec(filter_select.value);
	   	});
   	}, 100);
}();

function getList() {
	fetch("http://localhost:3000/api/tasks", {method: 'get'})
		.then((res) => res.json())
		.then((josonRes) => {
			displayList(josonRes['tasks']);
			list = josonRes['tasks']
		});
}

function displayList(toDoList) {
	var checkbox_checked = false;
	var list_div = document.getElementById("list");
	var list = "<table class='box-shadow'>" +
				"<tr>" + 
				"<th class='center-align'>Task</th>" +
				"<th class='center-align'>Status</th>" +
				"<th class='center-align'>Update Status</th>" +
				"<th class='center-align'>Delete</th>" +
				"</tr>";
	if(toDoList) {
		toDoList.forEach(function(item) {
			var status = item.complete? 'completed' : 'pending'
			list += "<tr>" +
						"<td>" + item.description + "</td>" +
						"<td class='capitalize center-align'>" + status + "</td>" +
						"<td class='center-align'><input type='checkbox' id='update-checkbox' onclick=updateTask('" + item.id + "',this) ";

			if(item.complete == true){
				list += " checked";
			}

			list += " /></td>" +
						"<td class='center-align'><button type='submit' class='delete-btn box-shadow' onclick=deleteTask('" + item.id + "')>Delete</button></td>" +
					"</tr>"
		});
	}
	list += "</table>";
	list_div.innerHTML = list;
}

function displayFilteredRec(condition) {
	var updated_list = ""
	switch(condition) {
		case 'all':
			getList();
			break;
		case 'pending':
			updated_list = getFilteredRec('pending');
			displayList(updated_list);
			break;
		case 'completed':
			updated_list = getFilteredRec('done');
			displayList(updated_list);
			break;
		default:
			displayList(toDoList);
	}

}

getFilteredRec = (status = null) => {
	var updatedList = new Array();
	list.forEach(function(item, i) {
		if(status == "pending" && item.complete == false) {
			updatedList.push(item);
		} else if(status == 'done' && item.complete == true) {
			updatedList.push(item);
		}
	});
	return updatedList;
}

function addTask() {
	var taskInput = document.getElementById("task");
	if(taskInput.value != '') {
		var payload = {task: {complete: false, description: taskInput.value}};
		fetch("http://localhost:3000/api/tasks/", {
				method: 'post', 
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(payload)
		})
		.then((res) => {
			if(res.status == 201) {
				getList();	
			} else {
				alert("something went wrong");
			}
			
		});
		taskInput.value =  "";
	}
}

function deleteTask(id) {
	fetch("http://localhost:3000/api/tasks/" + id, {
		method: 'delete'
	})
	.then((res) => {
		if(res.status == 200) {
			getList();	
		} else {
			alert("something went wrong");
		}
		
	});
}

function updateTask(id, el) {
	var payload = {task: {complete: el.checked }};
	fetch("http://localhost:3000/api/tasks/" + id, {
			method: 'put', 
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(payload)
	})
	.then((res) => {
		if(res.status == 200) {
			getList();	
		} else {
			alert("something went wrong");
		}
		
	});
}