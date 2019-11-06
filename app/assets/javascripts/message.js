$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
      if ( message.image ){
        var html 
          = `<div class="message" data-id="${message.id}">
               <div class="upper-message">
                 <div class="upper-message__user-name">
                   ${message.user_name}
                 </div>
                 <div class="upper-message__date">
                   ${message.created_at}
                 </div>
               </div>
               <div class="lower-message">
                 <p class="lower-message__content">
                   ${content}
                 </p>
                 ${image}
               </div>`
        return html;
      } else {
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.date}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${content}
              </p>
            </div>
          </div>`
        return html;
      };
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.field__text').append(html);
      $('#new_message')[0].reset();
      $('.field__text').animate({scrollTop: $('.field__text')[0].scrollHeight}, 'fast');
      })
    .fail(function(){
      alert('送信できませんでした')
    })  
    .always(function(data){
      $('.submit-btn').prop('disabled', false);　
    });
  });

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var href = 'api/messages#index {:format=>"json"}'  
      var last_message_id =  $(".message:last").data('id');
      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id},
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.field__text').append(insertHTML);
          $('.field__text').animate({scrollTop: $('.field__text')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function(){
        alert('更新できませんでした')
      });
    };
  };
  setInterval(reloadMessages, 5000);
});