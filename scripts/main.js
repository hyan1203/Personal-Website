function displayResume() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $.ajax({
            url: 'resume/hanbing_resume.md',
            type: 'get',
            success: function(text) {
                marked(text, function (err, text) {
                    if (err) throw err;
                    $('#resume-content').html(text);
                });
            }
        });
    } else {
        alert('The File APIs are not fully supported by your browser.');
    }
}

var score = null;
$(document).ready(function() {
    // Display first page.

    $('section').hide().filter(':first').show();


    // Show standard resume.
    displayResume();

    /** Click Handlers - because clicks must be handled. **/

    /*Show the rose number*/
    var posting = $.post('php/rose.php', 'case=getscore');
    posting.success(function(data) {
                score=data;
                $('.rosescore').html("Score: "+score);
    });
    // Updates address bar hash when tab is clicked on.
    $('.navbar-nav li').click(function() {
        $(".navbar-nav li").filter(".active").removeClass("active");
        $(this).addClass("active");
        id = "#"+$(this).attr('id');
        $('section').hide().filter(id).show();
    })

    $('.rose').draggable({
      stack: '.card'
    });
    $('.basket').droppable({
      accept:'.rose',
      greedy:true,
      hoverClass:'baskethighlight',
      tolerance:'pointer',
      drop: function(event, ui){
            var drop = $(this);
            var drag = $(ui.helper);
            var dropoffset = drop.offset();
            var dragoffset = drag.offset();
            drag.draggable('disable');
            var posting = $.post('php/rose.php','case=addscore');
            /*Change the rose number*/
            var posting = $.post('php/rose.php', 'case=getscore');
            posting.success(function(data) {
                        score=data;
                        $('.rosescore').html("Score: "+score);
            });
      }
    });
});
