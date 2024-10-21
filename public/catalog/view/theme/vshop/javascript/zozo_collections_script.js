$(window).on('popstate', function() {
    location.reload(true);
});

function toggleFilter(e) {
    _toggleFilter(e);
    renderFilterdItems();
    doSearch(1);
}

// function _toggleFilterdqdt(e) {
//     var $element = $(e);
//     var group = 'khoanggia';
//     var field = 'price_min';
//     var operator = 'OR';
//     var value = $element.attr("data-value");

//     filter.deleteValuedqdt(group, field, value, operator);
//     filter.addValue(group, field, value, operator);
//     renderFilterdItems();
//     doSearch(1);
// }

function _toggleFilter(e) {
    var $element = $(e);
    var group = $element.attr("data-group");
    var field = $element.attr("data-field");
    // var text = $element.attr("data-text");
    var value = $element.attr("value");
    var operator = $element.attr("data-operator");
    var filterItemId = $element.attr("id");

    $element.parents('ul').find(`input[data-group="${group}"]:not([value="${value}"])`).prop('checked', false)
    if (!$element.is(':checked')) {
        filter.deleteValue(group, field, value, operator);
    } else {
        filter.addValue(group, field, value, operator);
    }
    // $(".catalog_filters li[data-handle='" + filterItemId + "']").toggleClass("active");
}

function renderFilterdItems() {
    $(".filter-container__selected-filter ul").html("");

    if ($(".filter-container input[type=checkbox]:checked").length > 0){
      $(".filter-container input[type=checkbox]:checked").each(function(index) {
        var id = $(this).attr("id");
        var name = $(this).closest("label").text();
        addFilteredItem(name, id);
      });
      $(".filter-container__selected-filter").removeClass('d-none');
    } else $(".filter-container__selected-filter").addClass('d-none');
}

function addFilteredItem(name, id) {
    var filteredItemTemplate = `<li class="filter-container__selected-filter-item d-inline-flex align-items-center mr-2 mb-1" for="{3}"><a href="javascript:void(0)" class="p-1 pl-2 rounded" onclick="{0}">{1}<svg width="18" height="18"><use href="#svg-close"></use></svg></a></li>`;
    filteredItemTemplate = filteredItemTemplate.replace("{0}", "removeFilteredItem('" + id + "')");
    filteredItemTemplate = filteredItemTemplate.replace("{1}", name);
    filteredItemTemplate = filteredItemTemplate.replace("{3}", id);
    //filteredItemTemplate += `<li class="filter-container__selected-filter-item d-inline-flex align-items-center"><a href="javascript:void(0)" class="p-1 pl-2 pr-2 rounded" onclick="clearAllFiltered()">Xoá hết</a></li>`
    $(".filter-container__selected-filter ul").append(filteredItemTemplate);
}

function removeFilteredItem(id) {
    $(".filter-container #" + id).trigger("click");
}

// function clearAllFiltered() {
//     filter = new Haravan.SearchFilter();
//     if (colId > 0) {
//         filter.addValue("collection", "collections", '(collectionid:product=' + colId + ')', "AND");
//     } else {
//         filter.addValue("collection", "collections", '(collectionid:product>0)', "AND");
//     }
//     $(".filter-container__selected-filter ul").html("");
//     $(".filter-container input[type=checkbox]").attr('checked', false);
//     $(".filter-container__selected-filter").addClass('d-none');

//     doSearch(1);
// }

function doSearch(page, options) {

    //Fixharavan filter
    if (!filter.fields.khoanggia && !filter.fields.vendor && !filter.fields.tag1 && !filter.fields.type && !filter.fields.tag2) {
        var url = new URL(window.location.href);
        var xsb = selectedSortby;
        var xpage = page;
        var psb = url.searchParams.get("sort_by");
        var ppage = url.searchParams.get("page");
        var checktt1 = 0;
        var usb;

        if (!xsb && !psb) {
            checktt1 = checktt1 + 1;
        } else {
            if (!xsb) {
                usb = psb;
            } else {
                switch (selectedSortby) {
                    case "(price:product=asc)":
                    case "price-ascending":
                    case "price_min:asc":
                        usb = "price-ascending";
                        break;
                    case "(price:product=des)":
                    case "price-descending":
                    case "price_min:desc":
                        usb = "price-descending";
                        break;
                    case "(title:product=asc)":
                    case "name:asc":
                    case "title-ascending":
                        usb = "title-ascending";
                        break;
                    case "(title:product=des)":
                    case "name:desc":
                    case "title-descending":
                        usb = "title-descending";
                        break;
                    case "created_on:asc":
                    case "(updated_at:product=asc)":
                        usb = "created-ascending";
                        break;
                    case "(updated_at:product=desc)":
                    case "created_on:desc":
                        usb = "created-descending";
                        break;
                    default:
                        usb = "default";
                        break;
                }
            }
        }
        var upage;
        if (!xpage && !ppage) {
            checktt1 = checktt1 + 1;
        } else {
            if (!xpage) {
                upage = ppage;
            } else {
                upage = xpage;
            }
        }

        if (checktt1 < 2) {
            url = window.location.origin + window.location.pathname;

            if ((usb != null && usb != "default") || (upage != null && upage != 1)) {
                url = url + "?";
            }
            console.log(usb);
            if (usb != null && usb != "default") {
                url = url + "sort_by=" + usb;
            }

            if (upage != null && upage != 1) {
                if (usb != null && usb != 'default') {
                    url = url + "&page=" + upage;
                } else {
                    url = url + "page=" + upage;
                }
            }
            console.log(url);
            window.location.href = url;
            var checkfilter = 1;
        }

    } else {

    }

    if (!options) options = {};
    $('.aside.aside-mini-products-list.filter').removeClass('active');

    if (checkfilter != 1) {
      filter.search({view: selectedViewData, page: page, sortby: selectedSortby}).then(res => {
        $(".category-products").html(res);
        let arrImg = document.querySelector('.category-products').querySelectorAll('.lazy');
        arrImg.forEach((v) => { io.observe(v);})
        //$('html, body').animate({
        //  scrollTop: $('.category-products').offset().top - 50
        //}, 0);
        pushCurrentFilterState({
          sortby: selectedSortby,
          page: page
        });
        resortby(selectedSortby);
      });
        // filter.search({
        //     view: selectedViewData,
        //     page: page,
        //     sortby: selectedSortby,
        //     success: function(html) {

        //         var $html = $(html);
        //         var $categoryProducts = $($html[0]);
        //         $(".category-products").html(html);
        //         pushCurrentFilterState({
        //             sortby: selectedSortby,
        //             page: page
        //         });
                //awe_hidePopup('.loading');
                //awe_lazyloadImage();
               // let arrImg = document.querySelector('.category-products > .slider-items').querySelectorAll('.lazy');
               //  arrImg.forEach((v) => { io.observe(v);})
                // $('.add_to_cart').click(function(e) {
                //     e.preventDefault();
                //     var $this = $(this);
                //     var form = $this.parents('form');
                //     $.ajax({
                //         type: 'POST',
                //         url: '/cart/add.js',
                //         async: false,
                //         data: form.serialize(),
                //         dataType: 'json',
                //         error: addToCartFail,
                //         beforeSend: function() {
                //             if (window.theme_load == "icon") {
                //                 awe_showLoading('.btn-addToCart');
                //             } else {
                //                 //awe_showPopup('.loading');
                //             }
                //         },
                //         success: addToCartSuccess,
                //         cache: false
                //     });
                // });

        //         //$('.collection .box-heading .title-head').text(colName);
        //         $('html, body').animate({
        //             scrollTop: $('.category-products').offset().top - 50
        //         }, 0);
        //         resortby(selectedSortby);
        //     }
        // });
    } else {
        console.log('buggg');
    }
}

function sortby(sort) {
    switch (sort) {
        case "price-asc":
            selectedSortby = "(price:product=asc)";
            break;
        case "price-desc":
            selectedSortby = "(price:product=des)";
            break;
        case "alpha-asc":
            selectedSortby = "(title:product=asc)";
            break;
        case "alpha-desc":
            selectedSortby = "(title:product=desc)";
            break;
        case "created-desc":
            selectedSortby = "(updated_at:product=desc)";
            break;
        case "created-asc":
            selectedSortby = "(updated_at:product=asc)";
            break;
        default:
            selectedSortby = "default";
            break;
    }
    doSearch(1);
}

function resortby(sort) {
    switch (sort) {
        case "(price:product=asc)":
        case "price-ascending":
            tt = "Giá tăng dần";
            $('.sortPagiBar .sortby-price-asc').attr('checked', true);
            break;
        case "(price:product=des)":
        case "price-descending":
            tt = "Giá giảm dần";
            $('.sortPagiBar .sortby-price-desc').attr('checked', true);
            break;
        case "(title:product=asc)":
        case "title-ascending":
            tt = "Tên A → Z";
            $('.sortPagiBar .sortby-alpha-asc').attr('checked', true);
            break;
        case "(title:product=des)":
        case "title-descending":
            tt = "Tên Z → A";
            $('.sortPagiBar .sortby-alpha-desc').attr('checked', true);
            break;
        case "(updated_at:product=desc)":
        case "created-descending":
            tt = "Hàng mới nhất";
            $('.sortPagiBar .sortby-created-desc').attr('checked', true);
            break;
        case "(updated_at:product=asc)":
        case "created-ascending":
            tt = "Hàng cũ nhất";
           $('.sortPagiBar .sortby-created-asc').attr('checked', true);
            break;
        default:
            tt = "Mặc định";
            break;
    }
    //$('#sort-by .val').text(tt);
    //$('#sort-by > ul > li span').text(tt);
}


function _selectSortby(sort) {
    resortby(sort);
    switch (sort) {
        case "price-asc":
        case "price-ascending":
            selectedSortby = "(price:product=asc)";
            break;
        case "price-desc":
        case "price-descending":
            selectedSortby = "(price:product=desc)";
            break;
        case "alpha-asc":
        case "title-ascending":
            selectedSortby = "(title:product=asc)";
            break;
        case "alpha-desc":
        case "title-descending":
            selectedSortby = "(title:product=desc)";
            break;
        case "created-asc":
        case "created-ascending":
            selectedSortby = "(updated_at:product=asc)";
            break;
        case "created-desc":
        case "created-descending":
            selectedSortby = "(updated_at:product=desc)";
            break;
        default:
            selectedSortby = sort;
            break;
    }
}

function toggleCheckbox(id) {
    $(id).click();
}

function pushCurrentFilterState(options) {
    if (!options) options = {};
    var url = filter.buildSearchUrl(options);
    var queryString = url.slice(url.indexOf('?'));
    //pushState(queryString);
}

function pushState(url) {
    window.history.pushState({
        turbolinks: true,
        url: url
    }, null, url)
}

// function switchView(view) {
//     switch (view) {
//         case "list":
//             selectedViewData = "data_list";
//             break;
//         default:
//             selectedViewData = "data";
//             break;
//     }
//     var url = window.location.href;
//     var page = getParameter(url, "page");
//     if (page != '' && page != null) {
//         doSearch(page);
//     } else {
//         doSearch(1);
//     }
// }

function selectFilterByCurrentQuery() {
    var isFilter = false;
    var url = window.location.href;
    var queryString = decodeURI(window.location.search);
    var filters = queryString.match(/\(.*?\)/g);
    if (queryString) {
        isFilter = true;
    }
    if (filters && filters.length > 0) {
        filters.forEach(function(item) {
            item = item.replace(/\(\(/g, "(");
            if (item.lastIndexOf(">") >= 0) {
                var $element = $('.filter-value');
                var group = 'khoanggia';
                var field = 'price_min';
                var operator = 'OR';
                var value = item;
                filter.deleteValuedqdt(group, field, value, operator);
                renderFilterdItems();
            } else {
                $(".filter-container input[type=checkbox]['"+item+"']").attr("checked", "checked");
                // var element = $(".aside-item input[value='" + item + "']");
                // element.attr("checked", "checked");
                _toggleFilter(element);
            }
        });
        isFilter = true;
    }
    var sortOrder = getParameter(url, "sort_by");
    if (!sortOrder) {
        sortOrder = getParameter(url, "sort_by");
    }
    if (sortOrder) {
        _selectSortby(sortOrder);
    }
    if (isFilter) {
        //fixharavanfilter
        if (!filter.fields.khoanggia && !filter.fields.vendor && !filter.fields.tag1 && !filter.fields.type && !filter.fields.tag2) {} else {
            doSearch(1);
            renderFilterdItems();
        }
    }
}

function getParameter(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(function() {
  $(".filter-container input[type=checkbox]").prop('checked', false);
	selectFilterByCurrentQuery();
	// let page = new URL(window.location.href).searchParams.get('page');
	// $(window).on('popstate', function(){
	// 	const pages = page--;
	// 	console.log(pages);
	// 	//doSearch(pages);

	// });
});
$(".open_mnu").on('click', function(){
	$(this).toggleClass('cls_mn').next().toggle();
});
$(".filter-item").on('click', 'label', function(){
	$('.sidebar_mobi').removeClass('openf');
	$('.open-filters').removeClass('active');
	$('#body_overlay').addClass('d-none');
	$('body').removeClass('modal-open');
});
$('.open-filters').on('click', function(e){
	e.stopPropagation();
	$(this).toggleClass('active');
	$('.sidebar_mobi').toggleClass('openf');
	if ($('.sidebar_mobi').hasClass('openf')){
		$('#body_overlay').removeClass('d-none');
		colLeft.classList.remove("active");
    menuButton.forEach(menu => menu.classList.remove("active"));
		$('body').addClass('modal-open');
	}else {
		$('#body_overlay').addClass('d-none');
		$('body').removeClass('modal-open');
	}
});
$('.view_mores').on('click', 'a', function() {
	if( $(this).hasClass('one') ){
		$(this).addClass('d-none');
		$('.view_mores .two').removeClass('d-none');
	} else {
		$(this).addClass('d-none');
		$('.view_mores .one').removeClass('d-none');
	}
	$('.content_coll').toggleClass('active');
	$('.bg_cl').toggleClass('d-none');
});

var swiperBannerC = new Swiper('.banner_collection', {
	spaceBetween: 10,
	loop: true,
	speed:1000,
	slidesPerView: 1,
	autoplay: {
		delay: 5000,
		disableOnInteraction: true,
	},
	navigation: {
		nextEl: '.mbc_next',
		prevEl: '.mbc_prev',
	},
	breakpoints: {
		0: {
			slidesPerView: 1
		},
		375: {
			slidesPerView: 1.5
		},
		576: {
			slidesPerView: 1.8
		},
		768: {
			slidesPerView: 2
		},
		992: {
			slidesPerView: 2
		},
		1200: {
			slidesPerView: 2
		}
	}
});
// $(document).ready(function() {
//     selectFilterByCurrentQuery();
//     $('.filter-group .filter-group-title').on('click', function(e) {
//         $(this).parent().toggleClass('active');
//     });

//     $('.filter-mobile').on('click', function(e) {
//         $('.aside.aside-mini-products-list.filter').toggleClass('active');
//     });

//     $('#show-admin-bar').on('click', function(e) {
//         $('.aside.aside-mini-products-list.filter').toggleClass('active');
//     });

//     $('.filter-container__selected-filter-header-title').on('click', function(e) {
//         $('.aside.aside-mini-products-list.filter').toggleClass('active');
//     });
// });




//$('.filter-item--check-box input').change(function(e) {
//    var $this = $(this);
//    toggleFilter($this);
//})
// $('a#filter-value').click(function(e) {
//     var $this = $(this);
//     _toggleFilterdqdt($this);
// })
// $('.dosearch').click(function(e) {
//     var $data = $(this).attr('data-onclick');
//     doSearch($data);
// })
// $('.dl_sortby').on('click', function(e) {
//     var $data = $(this).attr('data-onclick');
//     sortby($data);

// })

// function filterItemInList(object) {
//     q = dl_convertVietnamese(object.val().toLowerCase());
//     object.parent().next().find('li').show();
//     if (q.length > 0) {
//         object.parent().next().find('li').each(function() {
//             var dataFor = dl_convertVietnamese($(this).find('label').attr("data-for").toLowerCase());

//             if (dataFor.indexOf(q) == -1)
//                 $(this).hide();
//         })
//     }
// }
