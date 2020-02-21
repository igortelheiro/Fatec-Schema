import $ from 'jquery'


$(document).ready(function() {
    // Hide Register Field
    $('#registerField').hide()

    // Show Register Field
    $('#openRegisterButton').on('click', function(){
        $('#openRegisterButton').html("Agora você pode ter uma!"); 
        $('#registerField').show(300);
    })
});