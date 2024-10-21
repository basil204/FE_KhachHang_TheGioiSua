$(document).on('click', '#cartformpage .qty-click .qtyplus', function (e) {
    e.preventDefault();
    var input = $(this).parent('.quantity-partent').find('input');
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        input.val(currentVal + 1);
    } else {
        input.val(1);
    }
    UpdateTotalProductChange();
});
$(document).on('click', "#cartformpage .qty-click .qtyminus", function (e) {
    e.preventDefault();
    var input = $(this).parent('.quantity-partent').find('input');
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal) && currentVal > 1) {
        input.val(currentVal - 1);
    } else {
        input.val(1);
    }
    UpdateTotalProductChange();
});
$(document).ready(function () {
    $('#cartformpage input.item-quantity').on('input',function(e){
        var input = $(this);
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal) && currentVal >= 1) {
            input.val(currentVal);
        } else {
            input.val(1);
        }
        UpdateTotalProductChange();
    });
})
function UpdateTotalProductChange() {
    $.ajax({
        type: 'POST',
        url: '/checkout/cart/getTotalProductInCart',
        data: $('#cartformpage').serialize(),
        dataType: 'json',
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
            $.each(data.items, function (i, item) {
                $('.table-cart tbody tr[data-variant-id="' + item.cart_id + '"] .line-item-total').html(item.total);
                $('.table-cart tbody tr[data-variant-id="' + item.cart_id + '"] .line-item-price').html(item.price);
            });
            $('.count-cart').html(data.count_cart);
            $('.sidebox-order_total .total-price').html(data.total_price);
            $('.icon-cart .count').html(data.number);
        },
        error: function (XMLHttpRequest, textStatus) {

        }
    });
}