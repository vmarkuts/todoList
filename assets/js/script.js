myStorage = window.localStorage;

let tasks;
let colorGray = 'rgb(128, 128, 128)';
let colorBlack = 'rgb(0, 0, 0)';
let input = $('input[type="text"]');
let toggleInput = $('#toggleInput');
let displayInput;
let h1 = $('h1');
let state;
let lastLi;

if (myStorage.length === 0) {
	tasks = ['Feed the dog','Buy a dog'];
	displayInput = true;
} else {
	tasks = JSON.parse(myStorage.getItem('tasks'));
	displayInput = JSON.parse(myStorage.getItem('displayInput'));
}



updateStorage();

generatePage();

function updateStorage() {
	myStorage.setItem('tasks', JSON.stringify(tasks));
	myStorage.setItem('displayInput', JSON.stringify(displayInput));
}

function generatePage() {
	renderInput();
	let array = JSON.parse(myStorage.getItem('tasks'));
	for (var i = 0; i<array.length; i++) {
    	$('ul').prepend('<li><span><i class="fa fa-trash"></i></span>' +  array[i] + '</li>');
    }
    updateLastLi();
	updateState();
}

$('ul').on('click', 'li', function(){
	$(this).toggleClass('completed');
	updateState();
});

function removeTask (task) {
	let index = tasks.indexOf(task);
	tasks.splice(index,1);
	updateStorage();
}

$('ul').on('click', 'span', function(event){
	$(this).parent().fadeOut(250, function() {
		removeTask($(this));
		$(this).remove();
		lastLiCorners();
		updateStorage();
	});
	//stop bubling
	event.stopPropagation();
});

function saveTodo (item) {
	tasks.push(item);
	updateStorage();
}

function createTodo() {
	let todoText = $(input).val();
	saveTodo(todoText);	
	$('ul').prepend('<li><span><i class="fa fa-trash"></i></span>' + todoText + '</li>');
	$(input).val('');
	updateState();
	lastLiCorners();
}

input.keypress(function(event){
	if(event.which === 13) {
		createTodo();
	}
});

toggleInput.click(function(){
	toggleInputFunc();
});

function lastLiCorners() {
	sharpBottomCorners(lastLi);
	updateLastLi();
	updateState();
}

function toggleInputFunc() {
	displayInput ? input.slideUp() : input.slideDown();
	displayInput = !displayInput;
	updateState();
}


function renderInput () {
	if (displayInput) {
		input.removeAttr('style');
	} else {
		input.attr('style', 'display: none;');
	}
}

function roundCorners(element) {
	element.addClass('cornersRounded');
}

function removeCorners(element) {
	element.removeClass('cornersRounded');
}

function roundBottomCorners(element) {
	element.addClass('bottomRounded');
}

function sharpBottomCorners(element) {
	element.removeClass('bottomRounded');
}


function updateState() {
	
	if (!displayInput && $('li').length === 0) {
		state = 1;
		roundCorners(h1);
	} 

	if (displayInput && $('li').length !== 0) {
		state = 2;
		removeCorners(h1);
		sharpBottomCorners(input);
		roundBottomCorners(lastLi);
	} 

	if (displayInput && $('li').length === 0) {
		state = 3;
		removeCorners(h1);
		roundBottomCorners(input);
	}

	if (!displayInput && $('li').length !== 0) {
		state = 4;
		removeCorners(h1);
		roundBottomCorners(lastLi);
	} 
	updateStorage();
}

function updateLastLi() {
	lastLi = $('li').last();
}