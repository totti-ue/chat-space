$(function(){

  var buildHTML = function(message) {
    var image = ( message.image ) ? `<img src= "${message.image}" class="lower-info__image" >`: "";
    if (message.content && message.image) {
      var html =  `<div class="message" data-message-id="${message.id}" >
                    <div class="upper-info">
                      <div class="upper-info__talker">
                        $${message.user_name}
                      </div>
                      <div class="upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-info">
                      <p class="lower-info__content">
                        ${message.content}
                      </p>
                        ${image}
                    </div>
                  </div>`
    } else if (message.content) {
      var html =  `<div class="message" data-message-id= "${message.id}" > 
                    <div class="upper-info">
                      <div class="upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-info">
                      <p class="lower-info__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image) {
      var html =  `<div class="message" data-message-id= ${message.id} >
                    <div class="upper-info">
                      <div class="upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-info">
                      ${image}
                    </div>
                  </div>`
    };
    return html;
  };

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});