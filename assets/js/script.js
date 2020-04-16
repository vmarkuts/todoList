let colorGray = 'rgb(128, 128, 128)';
let colorBlack = 'rgb(0, 0, 0)';
let input = $('input[type="text"]');
let toggleInput = $('#toggleInput');
let displayInput = true;
let h1 = $('h1');
let state = 1;
let lastLi;

updateLastLi();

updateState();

$('ul').on('click', 'li', function(){
	$(this).toggleClass('completed');
	updateState();
});

$('ul').on('click', 'span', function(event){
	$(this).parent().fadeOut(250, function() {
		$(this).remove();
		lastLiCorners();
	});
	//stop bubling
	event.stopPropagation();
});


input.keypress(function(event){
	if(event.which === 13) {
		let todoText = $(this).val();
		$('ul').append('<li><span><i class="fa fa-trash"></i></span>' + todoText + '</li>');
		$(this).val('');
		updateState();
		lastLiCorners();
	}
});

function lastLiCorners() {
	sharpBottomCorners(lastLi);
	updateLastLi();
	updateState();
}

toggleInput.click(function(){
	displayInput ? input.fadeOut() : input.fadeIn();
	displayInput = !displayInput;
	updateState();
});


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
}

function updateLastLi() {
	lastLi = $('li').last();
}