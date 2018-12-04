(function () {

    function track(event, data) {
        if (typeof fbq !== 'undefined') {
            fbq('track', event, data)
            console.log('Pixel polyfill:', {event: event, data: data})
        }
    }

    $('body').on('click', 'a, button, input[type="submit"]', function () {
        if ($(this).is('a') && $(this).attr('href') && $(this).attr('href').indexOf('product') !== -1) {
            // to do: get products info
            track('ViewContent', {})
        }
        else if (($(this).is('button') || $(this).is('input[type="submit"]')) && /add|to|cart|char/.test($(this).attr('onclick'))) {
            // to do: get products info
            track('AddToCart', {})
        }
        return true
    })

    $(window).on('load', function () {
        if (location.pathname.indexOf('checkout/success') !== -1) {
            // to do: get purchase info
            track('Purchase', {})
        }
    })
})()
