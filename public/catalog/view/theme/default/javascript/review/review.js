/*function readMore(t) {
    let totalPreview = t;
    if (!$('.pagination li a').length) {
        $("#review .view-more-button").hide();
    }
    $("#review .view-more-button").text('Xem thêm');
    $("#review .view-more-button").on("click",function(){
        totalPreview -= 1;
        $(this).text("Xem thêm");
        if(totalPreview <= 1){
           $(this).hide();
        }
    }); 
    
}*/

function openForm() {
    $('body').addClass('open-form');
    $('html').css('overflow', 'hidden');
    $('.opacity-bg').show();
}
function removeForm() {
    $('body').removeClass('open-form');
    $('html').css('overflow', 'unset');
    $('.opacity-bg').hide();
}

window.addEventListener('DOMContentLoaded', (event) => {
    initLike();
    clickLike();
    removeReply();

    /* handle review image */
        $('.review-image__item').each(function(){
            $('#wrapper-review__image').append($(this));
            $(this).show();
        });

        if ($('.review-image__item').length >= 8) {
            $('#wrapper-review__image').addClass('full-image');
            var el = $('#wrapper-review__image .review-image__item:nth-child(8)');
            el.addClass('last-review__image');
            el.append('<p class="review-image__more">Xem thêm ảnh từ KH</p>');
        }
    /* end handle review image */

    $(".lightgallery").lightGallery({
        thumbnail: true,
    });

    /* handle upload image */
    if (window.File && window.FileList && window.FileReader) {
        $(".image-file, .cmt-image-file").on("change", function(e) {
            var elClass = $(this).attr('class');
            var form_id;
            var select_image_id;
            if (elClass === 'image-file') {
                form_id = 'form-image';
                select_image_id = 'selected-images';
            } else {
                form_id = 'cmt-form-image';
                select_image_id = 'cmt-selected-images';
            }
            var file = e.target.files, imagefiles = $("." + elClass)[0].files, sizeKB = e.target.size / 1024, type = e.target.files[0].type;
            var i = 0;
            if (imagefiles.length > 3){
                alert('Bạn đã upload tối đa 3 ảnh');
                return false;
            }
            if (type == 'image/gif') {
                alert('Không hỗ trợ định dạng ảnh gif');
                return false;
            }
            if (imagefiles) {
                $.each(imagefiles, function(index, value) {
                    var f = file[i];
                    var fileReader = new FileReader();
                    if (value.size / 1024 > 3072) {
                        alert('Ảnh có dung lượng quá lớn, vui lòng thử lại');
                    } else {
                        $('#' + form_id).show();
                        fileReader.onload = (function(e) {
                            $('<div class="boxDiv upload-image">' +
                                '<img style="width: 60px; height: 60px;" src="' + e.target.result + '" class="prescriptions">' +
                                '<span class="cross-image upload-remove-text remove">Xóa</span>' +
                                '<input type="hidden" name="review_image_base64[]" value="' + e.target.result + '">' +
                                '<input type="hidden" name="review_image[]" value="' + value.name + '">' +
                                '<input type="hidden" name="type_image[]" value="' + value.type + '">' +
                                '</div>').insertAfter("#" + select_image_id);
                            $(".remove").click(function() {
                                $(this).parent(".upload-image").remove();
                                var imageDiv = $(".boxDiv").length;
                                if (imageDiv <= 0) {
                                    $('#' + form_id).hide();
                                }
                            });
                        });
                        fileReader.readAsDataURL(f);
                        i++;
                    }
                });
            }
        });
    } else {
        alert("Your browser doesn't support to File API")
    }

    $('.select-image').click(function() {
        var imageDiv = $(".boxDiv").length;
        if (imageDiv >= 3) {
            alert('Bạn đã upload tối đa 3 ảnh');
            return false;
        } else {
            $("#upload_image").submit();
        }
    });
    $('.upload-icon').click(function(e) {
        e.preventDefault();
    });
    /* end handle upload image */

    /* pagination review */
    $('#review').delegate('.pagination a', 'click', function(e) {
        e.preventDefault();
        $('#review').fadeOut('slow');
        $('#review').load(this.href);
        $('#review').fadeIn('slow');
        setTimeout(function(){
            initLike();
            clickLike();
            removeReply();
        }, 1000);
    });

    $('.open-review-form a').on('click', function(){
        $('.product-reviews-form').show();
        openForm();
    });

    $('.close-icon').on('click', function(){
        $('.product-reviews-form').hide();
        $('.popup_custom').hide();
        removeForm();
    });

    $('.btn-click__popup').on('click', function(){
        $('.popup_custom').show();
        openForm();
        if ($(this).hasClass('btn-detail')) {
            var attr = $(this).attr('data-tab');
            $('.popup_custom .tabs .tab-link').removeClass('current');
            $('.popup_custom .tab-content').removeClass('current');

            $('.popup_custom .tabs .tab-link').each(function(u,v){
                if ($(v).attr('data-tab') == attr) {
                    $(v).addClass('current');
                }
            });
            $('.popup_custom #' + $(this).attr('data-tab')).addClass('current');
        }
    });

    $('.opacity-bg').on('click', function(){
        $('.popup_custom').hide();
        $('.product-reviews-form').hide();
        $('.delivery-form').hide();
        removeForm();
    });
});

function submitForm(product_id) {
    $('#button-review, #button-comment').on('click', function() {
        var btn = $(this).attr('id');
        var form_id;
        if (btn === 'button-review') {
            form_id = 'form-review';
        } else {
            form_id = 'form-comment';
        }
        $.ajax({
            url: '/product/product/write?product_id=' + product_id,
            type: 'post',
            dataType: 'json',
            data: $("#" + form_id).serialize(),
            beforeSend: function() {
                $('#' + btn).button('loading');
            },
            complete: function() {
                $('#' + btn).button('reset');
            },
            success: function(json) {
                $('.alert-success, .alert-danger').remove();

                if (json['error']) {
                    $('#' + form_id).after('<div class="alert alert-danger alert-dismissible role="alert" style="margin-top:10px;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></i> ' + json['error'] + '</div>');
                }
                if (json['success']) {
                    $('#' + form_id).after('<div class="alert alert-success" style="margin-top:10px;"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></i> ' + json['success'] + '</div>');
                    $('#' + form_id).trigger('reset');
                    if (btn === 'button-review') {
                        $('#form-image').hide();
                        $('#form-image .upload-image').remove();
                    } else {
                        $('#cmt-form-image').hide();
                        $('#cmt-form-image .upload-image').remove();
                        $('#form-comment').hide();
                        $('#txtComment').show();
                    }
                }
            }
        });
    });
}

function handleLikeIcon(el) {
    el.addClass('isLike'); 
    el.find('.yotpo-icon.nonLike').hide();   
    el.find('.yotpo-icon.isLike').show();   
    el.css('pointer-events','none');
}

function initLike(){
    var data = JSON.parse(localStorage.getItem('check_like'));
    $('.review-vote').each(function(){
        $(this).css('cursor', 'pointer');
        if ($.inArray($(this).data('review-id'), data) !== -1) {
            handleLikeIcon($(this));
        }
    });
}

function clickLike(){
    $('.review-item .review-vote:not(".isLike")').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var vote = new Object();
        var type = $this.data('type');

        if (Number.isInteger($this.data('review-id'))) {
            var review_id = $this.data('review-id');
        } else if (Number.isInteger($this.closest('.review-item').data('review-id'))) {
            var review_id = $this.closest('.review-item').data('review-id');
        } else {
            var review_id = 0;
        }
        
        if (typeof type === undefined) {
            type = 'none';
        }

        handleLikeIcon($this);

        vote.product_id = "522";
        vote.review_id = review_id;
        vote.type = type;

        $.ajax({
            url       : '/product/product/vote',
            type      : 'post',
            dataType  : 'json',
            data      : vote,
            beforeSend: function () {
            },
            complete  : function () {
            },
            success   : function (json) {
                $this.find(".vote-sum[data-type=\"up\"]").html(json['data_review']['voteup']  + ' Like');
                $this.find(".vote-sum[data-type=\"down\"]").html(json['data_review']['votedown']);

                /* set storage like */
                var old_data = ["default"];
                if (!localStorage.getItem('check_like')) {
                    localStorage.setItem("check_like", JSON.stringify(old_data))
                }
                var data = JSON.parse(localStorage.getItem('check_like'));
                if ($.inArray(review_id, data) === -1) {
                    data.unshift(review_id);
                }
                localStorage.setItem("check_like", JSON.stringify(data));
                /* end set storage like */
            }
        });
    });
}

function showFormComment(el) {
    el.after($('#form-comment'));
    $('#form-comment').show();
    var parent_id = el.find('.review-reply').attr('data-review');
    var reply_name = el.closest('.list-comment').find('.cmt-name').html();
    if (el.attr('id') == undefined) {
        $('#form-comment input[name=\'parent_id\']').val(parent_id);
        $('#form-comment #input-review').html('@' + reply_name + ':');
    }
}

function removeReply() {
    $(".remove_reply").on('click', function(e) {
        e.preventDefault();
        /* var $this = $(this).closest("#form-review"); */
        $("#form-review .reply-target .author").html('');
        $("#form-review .reply-target .subject").html('');
        $("#form-review .reply-target .text").html('');
        $("#form-review [name='parent_id']").val(0);
        $('#form-review').removeClass('reply');
    });
}

/*$('.view-more-button').on('click', function(){
    setTimeout(function() { 
        clickLike();
        initLike();
        removeReply();
    }, 500);
});*/

/*if ($('.pagination li a').length) {
    $("#review-new .review_lists").infiniteScroll({
        path: ".pagination li a",
        append: "#review-new .review_lists > .review-item",
        status: ".page-load-status",
        button: ".view-more-button",
        scrollThreshold: !1,
        history: !1
    });
}*/