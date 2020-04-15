let colorGray = 'rgb(128, 128, 128)';
let colorBlack = 'rgb(0, 0, 0)';
let input = $('input[type="text"]');
let toggleInput = $('#toggleInput');
let displayInput = true;
let h1 = $('h1');

$('ul').on('click', 'li', function(){
	$(this).toggleClass('completed');
	checkState();
});

//click on X to delete todo item
$('ul').on('click', 'span', function(event){
	$(this).parent().fadeOut(250, function() {
		$(this).remove();
	});
	//stop bubling
	event.stopPropagation();
});


input.keypress(function(event){
	if(event.which === 13) {
		let todoText = $(this).val();
		$('ul').append('<li><span><i class="fa fa-trash"></i></span> ' + todoText + '</li>');
		$(this).val('');
	}
});

toggleInput.click(function(){
	displayInput ? input.fadeOut() : input.fadeIn();
	displayInput = !displayInput;
});
