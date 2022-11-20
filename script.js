// Original script by https://plungjan.name/SO/lslike/
var wishlistkey = "wishlist";
    // try and fetch an existing wishlist from the localStorage.
    var wish_list = localStorage.getItem(wishlistkey)
    console.log(wish_list,$.isEmptyObject(wish_list))
    if ($.isEmptyObject(wish_list)) { //nothing was saved previously
      wish_list = [];
    } else {
      wish_list = JSON.parse(wish_list);
      count_items_in_wishlist_update();
    }

$(document).ready(function() {
  count_items_in_wishlist_update();
  $(".wishlist").on("click", function() {
    const data_id = $(this).attr("data_id"),
    data_nama = $(this).attr("data_nama"),
	data_link = $(this).attr("data_link"),
    data_str = `<tr class="wishlist-item" id="list_id_${data_id}"><td class="w-pname"><a href="${data_link}">${data_nama}</a></td><td class="w-premove" wpid="${data_id}"><i class="fa-light fa-trash"></i></td></tr>`;
    //check if the element is in the array
    const found = $.inArray(data_id, wish_list) > -1
    if (found) {
      $(`#list_id_${data_id}`).remove()
      wish_list = wish_list.filter(id => id != data_id);
      $('#zpop').html('<i class="fa-solid fa-circle-check"></i> Removed wishlist').fadeIn(400).delay(2000).fadeOut(400);
    }
    else {
      $("#wish_list_item").append(data_str);
      wish_list.push(data_id);
      $('#zpop').html('<i class="fa-solid fa-circle-check"></i> Add to wishlist').fadeIn(400).delay(2000).fadeOut(400);
    }
    count_items_in_wishlist_update();
  });

  //adding toggle functionality to the wishlist pannel
  $(".wish_list_heading").on("click", function() {
    if (!$(this).hasClass("up")) {
      $("#wish_list").css("height", "390px");
      $(this).addClass("up");
      $("#wish_list").css("overflow", "auto");
    } else {
      $("#wish_list").css("height", "45px");
      $(this).removeClass("up");
      $("#wish_list").css("overflow", "hidden");
    }

  });
  // Remove function
  $("#wish_list_item").on("click", ".w-premove", function() {
    data_id = $(this).attr("wpid");
    $("#list_id_" + data_id).remove();
    wish_list = wish_list.filter(id => id != data_id);
    $('#zpop').html('<i class="fa-solid fa-circle-check"></i> Removed bookmark').fadeIn(400).delay(2000).fadeOut(400);
    count_items_in_wishlist_update();
  });
});

//Validation against the amount of product being added
function count_items_in_wishlist_update() {
$("#p_label").html(wish_list.length > 0 ? "Shortlist ("+wish_list.length+")" : "Shortlist");
$('#wish_list_item').empty();
$(".fa-star").each(function() { $(this).removeClass("fa-solid").addClass("fa-regular") }); //reset all hearts on page
wish_list.forEach(data_id => {  
  const $el = $(`[data_id=${data_id}]`)
  const $heart = $el.find(".fa-star");
  $heart.removeClass("fa-regular").addClass("fa-solid");
  console.log(data_id,"added");
  const data_nama = $el.attr("data_nama"),
	data_link = $el.attr("data_link"),
  data_str = `<tr class="wishlist-item" id="list_id_${data_id}"><td class="w-pname"><a href="${data_link}">${data_nama}</a></td><td class="w-premove" wpid="${data_id}"><i class="fa-light fa-trash"></i></td></tr>`;
      $('#wish_list_item').append(data_str);
});
localStorage.setItem(wishlistkey, JSON.stringify(wish_list))
}
