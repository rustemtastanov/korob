
//# sourceMappingURL=forms.js.map

// number_format(price, 2, ".", " ")
function number_format(number, decimals, dec_point, thousands_sep) {
  var i, j, kw, kd, km;
  if (isNaN(decimals=Math.abs(decimals))) decimals = 2;
  if (dec_point==undefined) dec_point = ",";
  if (thousands_sep==undefined) thousands_sep = ".";
  i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
  if ((j = i.length)>3) j = j % 3; else j = 0;
  km = (j ? i.substr(0, j) + thousands_sep : "");
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
  kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
  if (kd==".00") kd="";
  return km + kw + kd;
}
//# sourceMappingURL=_number-format.js.map

/*
	форма Поиска
	------------------------------------------
	использованные библиотеки:
 	------------------------------------------ */
(function() {

	var $form = $("[data-form=\"search\"]");

	if (!$form["length"]) return false;

	var $inp = $form.find(".form-control");
	var placeholder = {
		"desktop": 	$inp.data("placeholder-desktop"),
		"phone": 		$inp.data("placeholder-phone")
	};

	var check = function() {
		$inp.attr("placeholder", typeof DEVICE!="undefined" ? placeholder[DEVICE] : placeholder["desktop"]);
	};

	check();

	$(document).bind("eventDevice", function() {
		check();
	});

})();
//------------------------------------------




/*
	форма Авторизации
	------------------------------------------
	использованные библиотеки:
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

})();
//------------------------------------------




/*
	форма Купить в 1 клик
	------------------------------------------
	использованные библиотеки:
	- http://robinherbots.github.io/Inputmask/
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

	var $form = $("[data-form=\"order\"]");

	if (!$form["length"]) return false;

	//маски
	$form.find("[data-inputmask]").inputmask({
		showMaskOnHover: false,
		placeholder: "_"
	});

})();
//------------------------------------------




/*
	форма Фильтрации
	------------------------------------------
	использованные библиотеки:
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

	var $form = $("[data-form=\"filters\"]");

	if (!$form["length"]) return false;

	var $modal 	= $(".modal--filters");
	var $sort 	= $form.find("[name=\"sort\"]");

	$form
		.find("[data-button=\"sort\"]").on("click", function(e) {
			var $btn = $(this);
			var sort = $sort.val();
			if (sort=="desc") {
				$sort.val("asc");
				$btn
					.removeClass("sort--desc")
					.addClass("sort--asc");
			} else {
				$sort.val("desc");
				$btn
					.removeClass("sort--asc")
					.addClass("sort--desc");
			}
			e.preventDefault();
		});


	$modal
		.on("shown.bs.modal", function() {
			//модалка открылась
		})
		.on("hidden.bs.modal", function() {
			//модалка закрылась
		});

	$form
		.find("[data-button=\"apply\"]").on("click", function() {
			alert("видимо должна страница перезагрузиться с новыми параметрами");
		}).end()
		.find("[data-button=\"reset\"]").on("click", function() {
			$(this).parents(".modal").find("[type=\"checkbox\"]").prop("checked", false);
		});
})();
//------------------------------------------




/*
	форма Сменить телефон
	------------------------------------------
	использованные библиотеки:
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

	var $form = $("[data-form=\"phone\"]");

	if (!$form["length"]) return false;

	//маски
	$form.find("[data-inputmask]").inputmask({
		showMaskOnHover: false,
		placeholder: "_"
	});

})();
//------------------------------------------




/*
	форма Сменить email
	------------------------------------------
	использованные библиотеки:
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

})();
//------------------------------------------




/*
	форма Сменить пароль
	------------------------------------------
	использованные библиотеки:
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

})();
//------------------------------------------




/*
	форма Сменить адрес
	------------------------------------------
	использованные библиотеки:
	- https://getbootstrap.com/docs/3.3/javascript/#modals
 	------------------------------------------ */
(function() {

})();
//------------------------------------------




/*
	форма Корзина
	------------------------------------------
	использованные библиотеки:
 	------------------------------------------ */
(function() {

	var $form = $("[data-role=\"cart\"]");

	if (!$form["length"]) return false;

	var $items 	= $form.find("[data-role=\"item\"]");
	var $result = $form.find("[data-output=\"result\"]");
	var $code 	= $form.find("[name=\"code\"]");

	var calc = function() {
		var result = 0;

		$items.each(function() {
			var $item 	= $(this);
			var $count 	= $item.find("[name=\"count\"]");
			var price 	= parseInt($item.find("[name=\"price\"]").val(), 10);
			var count 	= parseInt($count.val(), 10);
			var amount 	= price*count;

			result = result + amount;
			$item.find("[data-output=\"amount\"]").text(number_format(amount, 2, ".", " "));
		});

		$result.text(number_format(result, 2, ".", " "));
	};

	calc();

	$items.each(function() {
		var $item 		= $(this);
		var $count 		= $item.find("[name=\"count\"]");
		var $btnMin 	= $item.find("[data-button=\"minus\"]");
		var $btnPlu 	= $item.find("[data-button=\"plus\"]");
		var $counter	= $item.find("[data-output=\"count\"]");
		var price 		= parseInt($item.find("[name=\"price\"]").val(), 10);
		var count 		= parseInt($count.val(), 10);
		var min 			= parseInt($count.data("min"), 10);
		var max 			= parseInt($count.data("max"), 10);

		var checkButtons = function() {
			$btnMin.attr("disabled", count==min);
			$btnPlu.attr("disabled", count==max);
		};

		$btnMin.on("click", function() {
			count--;
			if (count<=min) count = min;
			$count.val(count);
			$counter.text(count);
			checkButtons();
			calc();
		});

		$btnPlu.on("click", function() {
			count++;
			if (count>=max) count = max;
			$count.val(count);
			$counter.text(count);
			checkButtons();
			calc();
		});

		checkButtons();
	});

})();
//------------------------------------------




/*
	форма Оформление заказа
	------------------------------------------
	использованные библиотеки:
	- http://robinherbots.github.io/Inputmask/
 	------------------------------------------ */
(function() {

	var $form = $("[data-role=\"checkout\"]");

	if (!$form["length"]) return false;

	//маски
	$form.find("[data-inputmask]").inputmask({
		showMaskOnHover: false,
		placeholder: "_"
	});

})();
//------------------------------------------



