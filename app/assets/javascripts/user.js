$(function() {
  $(document).on('turbolinks:load', function () {

    var search_list = $("#user-search-result");
    var selected_list = $(".chat-group-users");

    function appendList( user ) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                  </a>`
                  search_list.append(html)
    }

    function appendUser( name,id ) {
      var html = `<div class="chat-group-user">
                    <input name='group[user_ids][]' type='hidden' value=${id} id="group_user_ids">
                    <p class='chat-group-user__name'>${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
                  selected_list.append(html)
    }

    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input},
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty() 
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendList(user);
          });
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
    });

    $('.chat-group-form').on("click", ".chat-group-user__btn--add", function() {
      const userName = $(this).data('user-name');
      const userId   = $(this).data('user-id');
      $(this).parent().remove();
      appendUser(userName,userId);
    });

    $('.chat-group-form').on("click", ".chat-group-user__btn--remove", function() {
      const userName = $(this).data('user-name');
      const userId   = $(this).data('user-id');
      $(this).parent().remove();
    });

  });
});