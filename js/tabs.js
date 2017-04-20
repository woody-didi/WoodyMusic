(function () {
    route('home', $('#tabs-container'));


    $('nav').find('li').on('click', function () {
        console.log(1)
        $(this).addClass('ac').siblings().removeClass('ac');
    })

})()

