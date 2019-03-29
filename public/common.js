$(function () {
  $('.del-book').click(function (e) {
    var target = $(e.target);
		var id = target.data('id');
    console.log(id);
    $.post("/books/delete", {
      bookId: id
    }, function (data, status) {
      console.log("数据: \n" + data + "\n状态: " + status);
      if (status) {
        window.location.reload()
      }
    });
  })
})
