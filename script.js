// JavaScript Document

var json;
var getList;

$todoForm = $('#todo-form')
$newTask = $('#new-task');
$todoList = $('#todo-list');
$todoDone = $('#todo-done');
$clear = $('#clear-all');

function storeTask(id, item) {
	try {
		window.localStorage.setItem(id, item);
	} catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			console.log('Quota exceeded');
		}
	}
};

function getStoredTasks() {
	getList = JSON.parse(localStorage['todolist']);
	if (typeof getList == 'object') {
		return getList;
	}
};

function addListItem(item) {
	$todoList.append(
		'<li>'
		+ '<a href="#" id="' + item + '" title="Mark as done?" >' + item + '</a>'
		+ '</li>'
	);
}

function addDoneItem(item) {
	$todoDone.append(
		'<li>' + item	+ '</li>'
	);
}

$todoList.delegate('a', 'click', function(e) {
	e.preventDefault();
	var $this = $(this);
	var item = $this.context.innerHTML;
	
	$this.parent().remove();
	
	var temp = new Array();
	
	for (var i = 0; i < getList.todo.length; i++ ) {
		if (item != getList.todo[i]) {
			temp.push(getList.todo[i]);
		}
	}
	
	getList.todo = temp;
	
	getList.done.push(item);
	addDoneItem(item);
	storeTask('todolist', JSON.stringify(getList));
});


$clear.click(function(e) {
	e.preventDefault();
	localStorage.clear();

	$todoList.empty();
	$todoDone.empty();
	
	getList = {
		"todo":[],
		"done":[]
	};

});

$todoForm.submit(function(e) {
	e.preventDefault();
	
	var task = $newTask.val();
	if (task != "") {
		getList.todo.push(task);
		storeTask('todolist', JSON.stringify(getList));
		addListItem(task);
	}
	
	$newTask.val("");
	$newTask.focus();
});



$(document).ready(function() {
	
	$('#not-supported').hide();
	if (!window.localStorage) {
		$('#not-supported').show();
	} else {
		
		if(localStorage.length == 0) {
			json = {
				"todo":[],
				"done":[]
			};
			storeTask('todolist', JSON.stringify(json));
		}
		
		var tasks = new Array();
		tasks = getStoredTasks();
		
		for (var i = 0; i < tasks.todo.length; i++) {
			addListItem(tasks.todo[i]);
		}
		for (var i = 0; i < tasks.done.length; i++) {
			addDoneItem(tasks.done[i]);
		} 
		
		
	} //end else

	
	
});