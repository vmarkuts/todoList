let colorGray = 'rgb(128, 128, 128)';
let colorBlack = 'rgb(0, 0, 0)';
let input = $('input[type="text"]');
let plus = $('.fa-plus');


$('ul').on('click', 'li', function(){
	$(this).toggleClass('completed');
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
		//grabb new todo from imput
		let todoText = $(this).val();
		//create new li
		$('ul').append('<li><span><i class="fa fa-trash"></i></span> ' + todoText + '</li>');
		//clear input
		$(this).val('');
	}
});

plus.click(function(){
	input.fadeToggle();
});

if (input.val().length > 25) {
	input.slice(input.val().length-1);
}