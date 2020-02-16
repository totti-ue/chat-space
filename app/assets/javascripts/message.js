$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html = 
       `<div class="content">
          <div class="message-upper-info">
            <div class="message-upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message-upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="text-contents">
            <p class="text-contents__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="content">
          <div class="message-upper-info">
            <div class="message-upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message-upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="text-contents">
            <p class="text-contents__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
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
      $('.main-chat__contents').append(html);
      $('.main-chat__contents').animate({ scrollTop: $('.main-chat__contents')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  });
});