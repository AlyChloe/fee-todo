

function toDoList() {
  this.createListItem = function(searchValue) {
    var listItem = $('<li>').appendTo('#items');
    var article = $('<article>').attr('class', 'pending').appendTo(listItem);
    var checkButton = $('<button>').attr('class', 'check').appendTo(article);
    var checkIcon = $('<i>').attr('class', 'fa fa-check').appendTo(checkButton);
    var p = $('<p>').text(searchValue).appendTo(article);
    var input = $('<input>').attr({
      type: 'text',
      class: 'edit-todo',
      value: 'learn html'
    }).appendTo(article);
    var deleteButton = $('<button>').attr('class', 'delete').text('x').appendTo(article);
    $(".edit-todo").attr('value', searchValue);
  };

  var remaining = 0;
  $('form').submit(function(event) {
    remaining++;
    $('.incomplete-items').html(remaining);

    event.preventDefault();
    var searchValue = $('.new-todo').val();
    $('.new-todo').val('');
    return new createListItem(searchValue);
  });

  // Delete item if user presses 'x'
  $('#items').on('click', '.delete', function() {
    if($(this).parents('article').hasClass('pending')) {
      remaining--;
      $('.incomplete-items').html(remaining);
    }

    $(this).parents('li').slideUp(function() {
      $(this).remove();
    });
  });

  // Toggle edit box
  $('#items').on('click', 'p', function() {
    var self = this;
    $(this).hide();
    $(this).siblings('.edit-todo').show();
    $('.delete').hide();
    $('.edit-todo').keyup(function(e) {
      var value = this.value;
      $(self).html(value);

      if (e.keyCode == 13) {
        $(self).show();
        $(self).siblings('.edit-todo').hide();
        $('.delete').show();
      }
    });
  });

  // Clear completed
  $('footer').on('click', '.clear', function() {
    $('.completed').slideUp(function() {
      $(this).parent('li').remove();
    });
  });

  // Check item if user presses 'check' button
  $('#items').on('click', '.check', function() {
    if($(this).parents('article').hasClass('completed') === true) {
      $(this).parents('article').attr('class', 'pending');
      $(this).children('.fa').css('visibility', 'hidden');
      $(this).siblings('p').css('textDecoration', 'none');
      remaining++;
      $('.incomplete-items').html(remaining);
    } else {
      $(this).parents('article').attr('class', 'completed');
      $(this).children('.fa').css('visibility', 'visible');
      $(this).siblings('p').css('textDecoration', 'line-through');
      remaining--;
      $('.incomplete-items').html(remaining);
    }

  });

  // Check completed items
  $('nav').on('click', '.show-completed', function() {
    $('.check').parents('li').show();
    $('.pending').parents('li').hide();
  });

  // Check active items
  $('nav').on('click', '.show-active', function() {
    $('.check').parents('li').hide();
    $('.pending').parents('li').show();
  });

  // Check all items
  $('nav').on('click', '.show-all', function() {
    $('.check').parents('li').show();
    $('.pending').parents('li').show();
  });

  // toggle active class
  $('nav li').on('click', 'button', function() {
    $('button.active').removeClass('active');
    $(this).addClass('active');
  });

}
toDoList();
