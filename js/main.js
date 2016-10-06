var remaining = 0;

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

    // Toggle edit box
    $(window).click(function() {
      $('article p').show().val(searchValue);
      $('.edit-todo').hide();
      $('.delete').show();
    });

    $('#items').on('click', 'p', function() {
      event.stopPropagation();
      $(this).hide();
      $(this).siblings('.edit-todo').show().val(searchValue);
      $('.delete').hide();
    });
  };

  $('form').submit(function(event) {
    event.preventDefault();
    var searchValue = $('.new-todo').val();
    $('.new-todo').val('');
    return new createListItem(searchValue);
  });

  // Delete item if user presses 'x'
  $('#items').on('click', '.delete', function() {
    $(this).parents('li').slideUp(function() {
      $(this).remove();
    });
    $('.incomplete-items').html(remaining--);
  });

  // Check item if user presses 'check' button
  $('#items').on('click', '.check', function() {
    $(this).parents('article').attr('class', 'completed');
    $(this).children('.fa').toggle(function() {
      $(this).css('visibility', 'visible');
    });
    $(this).siblings('p').css('textDecoration', 'line-through');
    $('.incomplete-items').html(remaining--);
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

  // show remaining items

}
toDoList();
